angular.module('writer', ['ui.bootstrap']);
var WriterCtrl = function ($scope, $timeout) {
  $scope.prevWriter = "";
  $scope.whichWriter = "left";
  $scope.controlChar = "^";
  $scope.isControl = false;

  // button selectors
  
  $scope.viewSettings = 'darkScreen';
  $scope.viewText = 'fit';

  $scope.hideLeft = true;
  $scope.hideRight = true;


  $scope.lastChar ="";
 

  //writers
  $scope.left = {name: 'You', text: ''};
  $scope.right = {name: 'Tim Vine', text: ''};

  //some default text
  $scope.previewText = [];

  $scope.timVineJokes = [
    {line:'  Crime in multi-storey car parks. That is wrong on so many different levels. '},
    {line:'  Black Beauty? He was a dark horse. '},
    {line:'  Velcro? What a rip-off! '},
    {line:'  I phoned the local gym and I asked if they could teach me how to do the splits. He said, "How flexible are you?" I said, "I can\'t make Tuesdays." '},
    {line:'  Eric Bristow asked me why I put superglue on one of his darts. I said you just can\'t let it go can you? '},
    {line:'  I\'ve just been on a once-in-a-lifetime holiday. I\'ll tell you what, never again. '}, 
    {line:'  Conjunctivitis.com – that’s a site for sore eyes. '}
    ];
  $scope.whichTimVineJoke = Math.floor(Math.random() * 7);



  //changing writer
  function sttringChangeWriter() {
    
    
    if ($scope.prevWriter != "") {
      if ($scope.whichWriter == "right") {
        
        timVine();

      } else if ($scope.whichWriter == "left") {
        $scope.previewText.push({line: $scope.right.text});
        $scope.hideLeft = false;
        $scope.hideRight = true;
        document.getElementById("leftText").focus(); 
      }

    } else {
       if ($scope.whichWriter == "right") {
          timVine();


      } else if ($scope.whichWriter == "left") {
        $scope.hideLeft = false;
        $scope.hideRight = true;
        document.getElementById("leftText").focus(); 
      }
    }

    $scope.left.text = "";
    $scope.right.text = "";
    $scope.prevWriter = $scope.whichWriter;
    document.getElementById('previewScroll').scrollTop = 9999999;

  };

  function timVine() {
    $scope.hideLeft = true;
    $scope.hideRight = false;
    timVineTypes($scope.timVineJokes[$scope.whichTimVineJoke].line);

    $scope.whichTimVineJoke++;
    if($scope.whichTimVineJoke >= $scope.timVineJokes.length) { 
        $scope.whichTimVineJoke = 0;
      }
    $scope.previewText.push({line: $scope.left.text});
    document.getElementById("leftText").focus(); 
    
  };

  function timVineTypes(timText){
    var typingObject;

    $scope.isTimText = timText;
    var theTypingTextArray = timText.split("");
    var typingNow = function(){

      if(theTypingTextArray.length > 0){
        $scope.right.text += theTypingTextArray.shift();
        document.getElementById('previewScroll').scrollTop = 9999999;
        typingObject = $timeout(typingNow,20);
      } else {
        $timeout.cancel(typingObject);
        $scope.whichWriter = "left";

      } 

    }
    typingNow();


  };

  $scope.$watch('whichWriter', sttringChangeWriter);


// checking each keystroke
$scope.writing = function() {

  document.getElementById('previewScroll').scrollTop = 9999999;
  $scope.lastChar = $scope.left.text.slice(-1);
  $scope.lastCharCode = $scope.lastChar.charCodeAt(0);

  if ($scope.isControl) {

    if ($scope.lastChar === "w"){//change the Writer
      $scope.left.text = $scope.left.text.slice(0,-2);
      $scope.whichWriter = "right";
    }
    $scope.isControl = false;
  }
  if ((!$scope.isControl) && ($scope.lastChar === $scope.controlChar)){
      $scope.isControl = true;
  }

}



// modal stuff
  $scope.open = function () {
    $scope.shouldBeOpen = true;
  };

  $scope.close = function () {
    $scope.closeMsg = 'I was closed at: ' + new Date();
    $scope.shouldBeOpen = false;
  };

  $scope.opts = {
  	backdrop: false,
    backdropFade: true,
    dialogFade:true
  };
  

}; 



  
