var colorArr=["red","blue","green","yellow"];
// var soundArr=["sounds/blue.mp3","sounds/green.mp3","sounds/red.mp3","sounds/yellow.mp3"];
var userClickedPattern=[];
var gamePattern=[];
var level=0;
var started=false;
//keyPress event mentioned here.
$(document).keypress(function()
{
      if(!started)
      {
          $("#level-title").text("Level "+ level);
            newSequence();
            started=true;
      }
});
//Button is pressed then it will call the following fucntion described below.
$(".btn").click(function(){

  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // var lastIndex=gamePattern.pop();

  // newSequence();
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAns(userClickedPattern.length-1);
 //console.log(userClickedPattern);
});


//This to check whether the gamePattern==userClickedPattern
function checkAns(currLevel)
{
   // var userRes=userClickedPattern.pop();

   if(gamePattern[currLevel]===userClickedPattern[currLevel])
   {
      if(userClickedPattern.length===gamePattern.length)
      {
        //yes then call the newSequence fucntion after a delay of 1000ms.
        setTimeout(function()
        {
          newSequence();
        },1000);
      }
   }
   else{
     //Play a sound of gameover and apply certain class

         var audio=new Audio("sounds/wrong.mp3").play();

         $("body").addClass("game-over");
         setTimeout(function(){
         $("body").removeClass("game-over");
       },200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      restart();
   }
}
function newSequence()
{
  //for every newSequence
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level);

  var randomNumber=Math.floor(Math.random() * colorArr.length);
  var randomChosenColor=colorArr[randomNumber];
  gamePattern.push(randomChosenColor);

//Introduced flash here
  $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
function playSound(sound)
{

       var audio=new Audio("sounds/" + sound +".mp3").play();

}
function animatePress(currentColor)
{

      $("#"+ currentColor).addClass("pressed");
      setTimeout(function(){
      $("#" + currentColor).removeClass("pressed");
          },100);
}
function restart()
{
    level=0;
    started=false;
    gamePattern=[];
}
