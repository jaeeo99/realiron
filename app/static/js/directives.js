angular
  .module('RealIron')
  .directive('ngMusicSearch', ngMusicSearch);

function ngMusicSearch(){
  return {
    restrict: 'A',
    scope: {
        ngModel: "=",
        search: "&callback"
    },
    templateUrl: '/static/templates/music_search.html',
    link: function(scope, elem, attrs){
      elem.bind('keydown', function(e){
        if(e.keyCode == 13){
          scope.search({query : scope.ngModel});
        }
      });
    }
  }
}