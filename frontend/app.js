
var app = angular.module('main', []);
app.controller('mainCtrl',['$scope','$http',function($scope,$http){
  $scope.globalScore;
  $scope.champions=[];
  $scope.started=false;
  $scope.correct=false;


  $http.get('https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=c388af0c-681a-431b-a5fb-b21dd04c7c0a').success(function(data){
  $scope.before=data.data;
  var result=[];
  for(var i in $scope.before){
    result.push([i,$scope.before[i]]);
  }
  $scope.after=result;
  });


  $scope.randomize=function(){
    var random=Math.floor((Math.random()*123)+1)
    $scope.currentChampion=$scope.after[random];
  };

  $scope.start=function(){
    $scope.getGlobalScore();
    $scope.started=true;
    var random2=Math.floor((Math.random()*123)+1)
    $scope.currentChampion=$scope.after[random2];


  };
  $scope.check=function(toCheck){
    if(toCheck==$scope.currentChampion[1].name){
      $scope.correct=true;
      window.alert('CORRECT!')
      $scope.randomize();
      $scope.answer=""
    }
    else{
      $scope.correct=false;
      window.alert('NO! IT WAS '+$scope.currentChampion[1].name)
      $scope.randomize();
      $scope.answer=""
    }
  };

  $scope.getGlobalScore=function(){
    $http.get('http://localhost:8080/api/globalscore').success(function(data){
      $scope.globalScore=data.score;
      console.log($scope.globalScore)
    });
  };

  $scope.addToGlobalScore=function(add){
    $http.put('http://localhost:8080/api/globalscore/'+add).success(function(data){
      console.log('added '+add+' to globalscore')
    })
  }
}]);
