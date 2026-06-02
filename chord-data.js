const NOTE_INDEX = { C:0, 'C#':1, Db:1, D:2, 'D#':3, Eb:3, E:4, F:5, 'F#':6, Gb:6, G:7, 'G#':8, Ab:8, A:9, 'A#':10, Bb:10, B:11 };
const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const TUNING = [4, 9, 2, 7, 11, 4];
const ROOTS = ['C','D','E','F','G','A','B'];

const QUALITY_GROUPS = [{
  label: '基礎和弦',
  qualities: [
    { suffix:'', en:'Major', zh:'大三和弦', intervals:[0,4,7], intervalLabels:['1','3','5'], emotion:'明亮穩定。', tip:'先分解確認每條弦。' },
    { suffix:'m', en:'Minor', zh:'小三和弦', intervals:[0,3,7], intervalLabels:['1','b3','5'], emotion:'內斂溫暖。', tip:'對照 Major 聽 b3 差異。' },
    { suffix:'7', en:'Dominant 7', zh:'屬七和弦', intervals:[0,4,7,10], intervalLabels:['1','3','5','b7'], emotion:'有張力。', tip:'練 7 回到主和弦。' },
    { suffix:'m7', en:'Minor 7', zh:'小七和弦', intervals:[0,3,7,10], intervalLabels:['1','b3','5','b7'], emotion:'柔和慵懶。', tip:'小橫按靠近琴衍。' },
    { suffix:'sus2', en:'Suspended 2', zh:'掛二和弦', intervals:[0,2,7], intervalLabels:['1','2','5'], emotion:'清新開闊。', tip:'練 sus2 回 Major。' },
    { suffix:'sus4', en:'Suspended 4', zh:'掛四和弦', intervals:[0,5,7], intervalLabels:['1','4','5'], emotion:'懸浮期待。', tip:'練 sus4 解決回 Major。' }
  ]
}];

// 僅 verified 會顯示
const VOICINGS = {
  C: { status:'verified', frets:['X',3,2,0,1,0], fingers:['',3,2,'',1,''] },
  G: { status:'verified', frets:[3,2,0,0,0,3], fingers:[2,1,'','','',3] },
  D: { status:'verified', frets:['X','X',0,2,3,2], fingers:['','','',1,3,2] },
  A: { status:'verified', frets:['X',0,2,2,2,0], fingers:['','',1,2,3,''] },
  E: { status:'verified', frets:[0,2,2,1,0,0], fingers:['',2,3,1,'',''] },

  Am: { status:'verified', frets:['X',0,2,2,1,0], fingers:['','',2,3,1,''] },
  Em: { status:'verified', frets:[0,2,2,0,0,0], fingers:['',2,3,'','',''] },
  Dm: { status:'verified', frets:['X','X',0,2,3,1], fingers:['','','',2,3,1] },

  A7: { status:'verified', frets:['X',0,2,0,2,0], fingers:['','',1,'',2,''] },
  E7: { status:'verified', frets:[0,2,0,1,0,0], fingers:['',2,'',1,'',''] },
  D7: { status:'verified', frets:['X','X',0,2,1,2], fingers:['','','',2,1,3] },

  Am7: { status:'verified', frets:['X',0,2,0,1,0], fingers:['','',2,'',1,''] },
  Em7: { status:'verified', frets:[0,2,2,0,3,0], fingers:['',1,2,'',3,''] },
  Dm7: { status:'verified', frets:['X','X',0,2,1,1], fingers:['','','',2,1,1] },

  Asus2: { status:'verified', frets:['X',0,2,2,0,0], fingers:['','',1,2,'',''] },
  Dsus2: { status:'verified', frets:['X','X',0,2,3,0], fingers:['','','',1,3,''] },
  Asus4: { status:'verified', frets:['X',0,2,2,3,0], fingers:['','',1,2,3,''] },
  Dsus4: { status:'verified', frets:['X','X',0,2,3,3], fingers:['','','',1,2,3] },

  Fsus2: { status:'formulaOnly' }
};
