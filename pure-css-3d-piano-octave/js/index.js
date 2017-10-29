function turn(direction) {
  var piano = document.getElementById('piano');
  piano.className === 'piano ' + direction ? piano.className = 'piano' : piano.className = 'piano ' + direction;
}