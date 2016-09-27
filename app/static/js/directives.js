angular
  .module('RealIron')
  .directive('ngMusicSearch', ngMusicSearch);
//  .directive('ngMusicPlayer', ngMusicPlayer)
//  .directive('ngMusicPlaylist', ngMusicPlaylist);

function ngMusicSearch(riSearch){
  return {
    restrict: 'A',
    scope: {
        search: "=onkeyenter",
    },
    templateUrl: "/static/templates/music_search.html",
    link: function(scope, elem, attrs){
      elem.bind('keydown', function(e){
        if(e.keyCode == 13){
          scope.search(scope.query);
        }
      });
    }
  }
}

//function ngMusicPlayer(){
//  return {
//    restrict: 'A',
//    scope: {
//    },
//    link: function(scope, elem, attrs){
//    }
//  }
//}
//
//function ngMusicPlaylist(){
//  return {
//    restrict: 'A'
//    scope: {
//    },
//    link: function(scope, elem, attrs){
//    }
//  }
//}