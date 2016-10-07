angular
  .module('RealIron')
  .controller('TestCtrl', testCtrl);

testCtrl.$inject = ['$scope', '$sce', '$interval'];

function testCtrl($scope, $sce, $interval){
  $scope.names = ['고추간장치킨', '깐부가라', '마늘전기구이', '바삭한식스팩', '불사조치킨', '순살크리스피', '순살파닭', '순살떢볶이', '순살스윗치킨', '전기구이치킨', '크리스피치킨', '후라이드치킨'];
  $scope.chicken_list = [];

  for(var i = 0 ; i < $scope.names.length ; i++){
    $scope.chicken_list.push({
      'name' : $scope.names[i],
      'src' : '/static/img/test/' + i + '.png',
      'value' : 0,
      'new' : false,
      'hot' : false,
    });
  }

  $scope.increase = function(chicken){
     chicken.value = chicken.value + 1;
  }

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $interval(function(){
    index = Math.floor(Math.random() * $scope.chicken_list.length);
    $scope.increase($scope.chicken_list[index]);
  }, 1000);
}
