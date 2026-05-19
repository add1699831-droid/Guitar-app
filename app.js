
const el = {
  select: document.getElementById('chordSelect'),
  name: document.getElementById('chordName'),
  info: document.getElementById('chordInfo'),
  status: document.getElementById('statusBadge'),
  notes: document.getElementById('notes'),
  intervals: document.getElementById('intervals'),
  fingering: document.getElementById('fingering'),
  tip: document.getElementById('tip'),
  diagram: document.getElementById('diagramArea')
};

function getNotes(root, intervals) {
  const i = NOTE_INDEX[root];
  return intervals.map(n => NOTE_NAMES[(i + n) % 12]);
}

function validateVoicing(chordNotes, frets, chordName) {
  const pcs = new Set(chordNotes.map(n => NOTE_INDEX[n]));
  let valid = true;
  frets.forEach((fret, idx) => {
    if (fret === 'X') return;
    const pc = (TUNING[idx] + fret) % 12;
    if (!pcs.has(pc)) {
      valid = false;
      console.warn(`[validateVoicing] ${chordName} has wrong note ${NOTE_NAMES[pc]} @ string ${6 - idx} fret ${fret}`);
    }
  });
  return valid;
}

function chipList(target, arr) {
  target.replaceChildren();
  arr.forEach(v => {
    const li = document.createElement('li');
    li.textContent = v;
    target.appendChild(li);
  });
}

function statusCell(v) {
  const td = document.createElement('td');
  if (v === 'X') { const m = document.createElement('span'); m.className = 'mute'; m.textContent = 'X'; td.appendChild(m); }
  if (v === 0) { const o = document.createElement('span'); o.className = 'open'; o.textContent = 'O'; td.appendChild(o); }
  return td;
}

function renderTable(frets, fingers) {
  const table = document.createElement('table');
  const head = document.createElement('tr');
  frets.forEach(v => head.appendChild(statusCell(v)));
  table.appendChild(head);
  for (let fret = 1; fret <= 4; fret += 1) {
    const tr = document.createElement('tr');
    frets.forEach((v, i) => {
      const td = document.createElement('td');
      if (v === fret) { const d = document.createElement('span'); d.className = 'dot'; d.textContent = fingers[i] || ''; td.appendChild(d); }
      tr.appendChild(td);
    });
    table.appendChild(tr);
  }
  return table;
}

function allChords() {
  const list = [];
  QUALITY_GROUPS[0].qualities.forEach(q => ROOTS.forEach(root => list.push({ ...q, root, name: `${root}${q.suffix}` })));
  return list;
}

const CHORDS = allChords();

function render(name) {
  const chord = CHORDS.find(c => c.name === name) || CHORDS[0];
  const notes = getNotes(chord.root, chord.intervals);
  const voicing = VOICINGS[chord.name];

  el.name.textContent = `${chord.name} 和弦`;
  el.info.textContent = `${chord.en}｜${chord.zh}｜${chord.emotion}`;
  chipList(el.notes, notes);
  chipList(el.intervals, chord.intervalLabels);
  el.tip.textContent = chord.tip;
  el.diagram.replaceChildren();

  if (!voicing || voicing.status !== 'verified') {
    el.status.textContent = voicing?.status || 'formulaOnly';
    el.fingering.textContent = '-';
    el.diagram.textContent = '此和弦按法整理中';
    return;
  }

  if (!validateVoicing(notes, voicing.frets, chord.name)) {
    el.status.textContent = 'formulaOnly';
    el.fingering.textContent = '-';
    el.diagram.textContent = '此和弦按法整理中';
    return;
  }

  el.status.textContent = 'verified';
  el.fingering.textContent = voicing.frets.map(f => (f === 'X' ? 'X' : String(f))).join('');
  el.diagram.appendChild(renderTable(voicing.frets, voicing.fingers));
}

function init() {
  QUALITY_GROUPS[0].qualities.forEach(q => {
    const og = document.createElement('optgroup');
    og.label = `${q.en} / ${q.zh}`;
    ROOTS.forEach(root => {
      const op = document.createElement('option');
      op.value = `${root}${q.suffix}`;
      op.textContent = `${root}${q.suffix}`;
      og.appendChild(op);
    });
    el.select.appendChild(og);
  });
  el.select.value = 'C';
  el.select.addEventListener('change', () => render(el.select.value));
  render('C');
}

init();
