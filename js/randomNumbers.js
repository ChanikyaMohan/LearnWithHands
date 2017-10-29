(function($) {
  "use strict";

$(".page-alert").hide();

var total=0,correct = 0,a=0,b=0,op = null;
var ask = function () {
     a = Math.floor(Math.random() * 10) + 1;
     b = Math.floor(Math.random() * 10) + 1;
     op = ["*", "+", "/", "-"][Math.floor(Math.random()*4)];

     if(op == "-" && a < b){
       var temp = a;
       a = b;
       b = temp;
     } else if(op == "/" && a>b && a%b != 0 ){
       a = a - (a%b);
     } if(op == "/" && b>a && a%b != 0){
       var temp = a;
       a = b;
       b = temp;
       a = a - (a%b);
     }
    //set values to num1 and num2
    $("#num1").text(a);
    $("#num_operator").text(op);
    $("#num2").text(b);
}

var waitForInput = function (){
  console.log(arguments);
    while(true){
        if($("#math_answer").val() == ""){
          console.log("waiting for answer");
          setTimeout(function(){},1000);
        } else {
          break;
        }
      }
    return $('#math_answer').val() == eval( arguments[0] + arguments[1] + arguments[2]);
}


var startAskingQuestions = function (){
  total = 0,correct = 0;
    ask();
}

$("#math_answer").on('input',function(){
  $( "#sendMathAnswer" ).trigger('click');
});

$( "#sendMathAnswer" ).click(function( event ) {
  event.preventDefault();
  console.log("submitted answer");

  //evaluate answer and trigger ask again()
   if($('#math_answer').val() == eval( a + op + b)){
     correct++;
      $('.page-alert').slideUp();
     $(".correct-answer").slideDown();
     setTimeout(function(){   $('.correct-answer').slideUp(); }, 2000);
   } else {
      $('.page-alert').slideUp();
      $(".wrong-answer").slideDown();
      setTimeout(function(){   $('.wrong-answer').slideUp(); }, 2000);
   }
   total++;
   //clear input fieldset
   $("#math_answer").val("");
   ask();
});

$("#trigger-asking-questions").click(function(){
  console.log("trigger questions");
  startAskingQuestions();
});

var closeModal = function(){
  $('.page-alert').slideUp();
}
$("#close-modal-button").click(function(){
    closeModal();
});

})(jQuery); // End of use strict
