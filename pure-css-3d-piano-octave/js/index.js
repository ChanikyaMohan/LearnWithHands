function turn(direction) {
  var piano = document.getElementById('piano');
  piano.className === 'piano ' + direction ? piano.className = 'piano' : piano.className = 'piano ' + direction;
}

var a = new Audio('audio/A.mp3');
var b = new Audio('audio/B.mp3');
var c = new Audio('audio/C.mp3');
var d = new Audio('audio/D.mp3');
var e = new Audio('audio/E.mp3');
var f = new Audio('audio/F.mp3');
var g = new Audio('audio/G.mp3');
var ab = new Audio('audio/Ab.mp3');
var bb = new Audio('audio/Bb.mp3');
var db = new Audio('audio/Db.mp3');
var eb = new Audio('audio/Eb.mp3');
var gb = new Audio('audio/Gb.mp3');

var playAudio = function(type){
  switch (type) {
    case 'c': c.play(); break;
    case 'db': db.play(); break;
    case 'd': d.play(); break;
    case 'eb': eb.play(); break;
    case 'e': e.play(); break;
    case 'f': f.play(); break;
    case 'gb': gb.play(); break;
    case 'g': g.play(); break;
    case 'ab': ab.play(); break;
    case 'a': a.play(); break;
    case 'bb': bb.play(); break;
    case 'b': b.play(); break;
    default:break;
  }
}
