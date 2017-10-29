var controller = new Leap.Controller({
  enableGestures: true,
  frameEventName: 'animationFrame'
});

var fpsDisplay = document.getElementById('leapFPS');
var handCountDisplay = document.getElementById('handCount');
var pointableCountDisplay = document.getElementById('pointableCount');
var fingerCountDisplay = document.getElementById('fingerCount');
var toolCountDisplay = document.getElementById('toolCount');
var gestureCountDisplay = document.getElementById('gestureCount');

var extendFingDisplay = document.getElementById('fingerNumber');
var extendedFingers = 0;

var fingerTot = document.getElementById('fingerTotal');
var reset = true;
var temp = 0;
var numIterations = 0;

controller.on('frame', function(frame) {
  fpsDisplay.innerText = frame.currentFrameRate;
  handCountDisplay.innerText = frame.hands.length;
  pointableCountDisplay.innerText = frame.pointables.length;
  fingerCountDisplay.innerText = frame.fingers.length;
  toolCountDisplay.innerText = frame.tools.length;
  gestureCountDisplay.innerText = frame.gestures.length;

  var hand = frame.hands[0];
  var handTwo = frame.hands[1];

  //if there is a hand detected
  if (hand != undefined) {

    var send = false;
    extendedFingers = 0;

    //count total number of fingers on hand one
    for (var f = 0; f < hand.fingers.length; f++) {
      var finger = hand.fingers[f];
      if (finger.extended) {
        extendedFingers++;
      }

      numIterations++;
    }

    //count total number of fingers on hand two
    if (handTwo != undefined) {
      for (var f = 0; f < handTwo.fingers.length; f++) {
        var finger = handTwo.fingers[f];
        if (finger.extended) {
          extendedFingers++;
        }
      }

      //two empty fists means enter a number
      if (reset && extendedFingers == 0) {
        send = true;
        console.log(fingerTot.innerHTML);
        fingerTot.innerHTML = 0;

        reset = false;
      }
    }

    //add to number
    if (!send) {

      if (reset && numIterations >= frame.currentFrameRate * 3) {
        fingerTot.innerHTML =  fingerTot.innerHTML* 10 + extendedFingers;
        numIterations = 0;

        reset = false;
      }
    }
  } else {
    reset = true;
  }
});
controller.connect();
