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

    //peace sign is enter LUL BAD CODING STYLE BUT WHATEVER
    var translatedNumber = -1;
    if (hand.fingers[0].extended && !hand.fingers[1].extended && !hand.fingers[2].extended && !hand.fingers[3].extended && !hand.fingers[4].extended) {
      translatedNumber = 1;
    } else if (hand.fingers[0].extended && hand.fingers[1].extended && !hand.fingers[2].extended && !hand.fingers[3].extended && !hand.fingers[4].extended) {
      translatedNumber = 2;
    } else if (hand.fingers[0].extended && hand.fingers[1].extended && hand.fingers[2].extended && !hand.fingers[3].extended && !hand.fingers[4].extended) {
      translatedNumber = 3;
    } else if (hand.fingers[0].extended && hand.fingers[1].extended && hand.fingers[2].extended && hand.fingers[3].extended && !hand.fingers[4].extended) {
      translatedNumber = 4;
    } else if (hand.fingers[0].extended && hand.fingers[1].extended && hand.fingers[2].extended && hand.fingers[3].extended && hand.fingers[4].extended) {
      translatedNumber = 5;
    } else if (!hand.fingers[0].extended && !hand.fingers[1].extended && !hand.fingers[2].extended && !hand.fingers[3].extended && hand.fingers[4].extended) {
      translatedNumber = 6;
    } else if (!hand.fingers[0].extended && !hand.fingers[1].extended && !hand.fingers[2].extended && hand.fingers[3].extended && hand.fingers[4].extended) {
      translatedNumber = 7;
    } else if (!hand.fingers[0].extended && !hand.fingers[1].extended && hand.fingers[2].extended && hand.fingers[3].extended && hand.fingers[4].extended) {
      translatedNumber = 8;
    } else if (!hand.fingers[0].extended && hand.fingers[1].extended && hand.fingers[2].extended && hand.fingers[3].extended && hand.fingers[4].extended) {
      translatedNumber = 9;
    } else if (!hand.fingers[0].extended && !hand.fingers[1].extended && !hand.fingers[2].extended && !hand.fingers[3].extended && !hand.fingers[4].extended) {
      translatedNumber = 0;
    } else if (hand.fingers[0].extended && !hand.fingers[1].extended && !hand.fingers[2].extended && !hand.fingers[3].extended && hand.fingers[4].extended) {
      translatedNumber = 10;
    }
    //leave anything e;se to do nothing, and let them try again

    //add to number
    if (!send) {

      if (reset && numIterations >= frame.currentFrameRate * 3 && translatedNumber >= 0) {

        //enter
        if (translatedNumber > 9) {
          console.log(fingerTot.innerHTML);
          fingerTot.innerHTML = 0;

          reset = true;
        } else {
          fingerTot.innerHTML = fingerTot.innerHTML * 10 + translatedNumber;
          numIterations = 0;

          reset = false;
        }
      }
    }
  } else {
    reset = true;
  }
});
controller.connect();
