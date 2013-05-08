angular.module('writer', ['ui.bootstrap']);
var WriterCtrl = function ($scope, $timeout) {
  $scope.prevWriter = "";
  $scope.whichWriter = "right";
  $scope.controlChar = "^";
  $scope.isControl = false;

  // button selectors
  
  $scope.viewSettings = 'projector';
  $scope.viewText = 'fit';

  $scope.hideLeft = true;
  $scope.hideRight = true;


  $scope.lastChar ="";
 

  //writers
  $scope.left = {name: 'You', text: '', style: ''};
  $scope.right = {name: 'Tim Vine', text: '', style: ''};

  //some default text
  $scope.previewText = [];

  $scope.timVineJokes = 
    {line:'         \nCrime in multi-storey car parks. That is wrong on so many different levels.       \nBlack Beauty? He was a dark horse.       \nVelcro? What a rip-off!       \nI phoned the local gym and I asked if they could teach me how to do the splits. He said, "How flexible are you?" I said, "I can\'t make Tuesdays."        \nEric Bristow asked me why I put superglue on one of his darts. I said you just can\'t let it go can you?        \nI\'ve just been on a once-in-a-lifetime holiday. I\'ll tell you what, never again.        \n\rConjunctivitis.com – that’s a site for sore eyes.'};



  //changing writer
  function sttringChangeWriter() {
    
    
    if ($scope.prevWriter != "") {
      if ($scope.whichWriter == "right") {
        $scope.previewText.push({line: $scope.left.text, style: $scope.left.style});
        $scope.hideLeft = true;
        $scope.hideRight = false;
        document.getElementById("leftText").focus(); 
      } else if ($scope.whichWriter == "left") {
        $scope.previewText.push({line: $scope.right.text, style: $scope.right.style});
        $scope.hideLeft = false;
        $scope.hideRight = true;
        document.getElementById("leftText").focus(); 
      }

    } else {
       if ($scope.whichWriter == "right") {
        $scope.hideLeft = true;
        $scope.hideRight = false;
        document.getElementById("leftText").focus(); 


      } else if ($scope.whichWriter == "left") {
        $scope.hideLeft = false;
        $scope.hideRight = true;
        document.getElementById("leftText").focus(); 
      }
    }
    $scope.left.style = "";
    $scope.left.text = "";
    $scope.right.text = "";
    $scope.prevWriter = $scope.whichWriter;
    document.getElementById('previewScroll').scrollTop = 9999999;

  }

  $scope.$watch('whichWriter', sttringChangeWriter);


  function timVineTypes(){
    var typingObject;
    var typePosition = 0;
    var theTypingTextArray = $scope.timVineJokes.line.split("");
    var typingNow = function(){

        $scope.right.text += theTypingTextArray[typePosition];
        typePosition++;
        if (typePosition >= theTypingTextArray.length){ typePosition = 0; }
        document.getElementById('previewScroll').scrollTop = 9999999;
        document.getElementById('rightText').scrollTop = 9999999;
        typingObject = $timeout(typingNow,60);
  

    }
    typingNow();

  }
  timVineTypes();




// checking each keystroke
$scope.writing = function() {

  document.getElementById('previewScroll').scrollTop = 9999999;
  $scope.lastChar = $scope.left.text.slice(-1);
  $scope.lastCharCode = $scope.lastChar.charCodeAt(0);

  if ($scope.isControl) {




    if ($scope.lastChar === "w"){//change the Writer
      $scope.left.text = $scope.left.text.slice(0,-2);
      if ($scope.whichWriter === "left"){
        $scope.whichWriter = "right";
      } else {
        $scope.whichWriter = "left";
      }
    }
    if ($scope.lastChar === "b"){//change to bold
      $scope.left.text = $scope.left.text.slice(0,-2);
      $scope.previewText.push({line: $scope.left.text, style: $scope.left.style});
      $scope.left.text = "";
      $scope.left.style = "typeBold";
    }
    if ($scope.lastChar === "i"){//change to italic
      $scope.left.text = $scope.left.text.slice(0,-2);
      $scope.previewText.push({line: $scope.left.text, style: $scope.left.style});
      $scope.left.text = "";
      $scope.left.style = "typeItalic";
    }
    if ($scope.lastChar === "n"){//changeback to normal
      $scope.left.text = $scope.left.text.slice(0,-2);
      $scope.previewText.push({line: $scope.left.text, style: $scope.left.style});
      $scope.left.text = "";
      $scope.left.style = "";
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



  
