angular
  .module('RealIron')
  .directive('realironPlayer', realironPlayer)
  .directive('ngMusicSearch', ngMusicSearch);

function ngMusicSearch(){
  return {
    restrict: 'A',
    scope: {
        query: "=ngModel",
        search: "&onkeyenter",
    },
    link: function(scope, elem, attrs){
      elem.bind('keydown', function(e){
        if(e.keyCode == 13){
          scope.search({query: scope.query});
        }
      });
    }
  }
}
function realironPlayer($window, riSearch, riPlayer, riPlaylist){
  return {
    restrict: 'A',
    scope: {
        videoId: "@",
    },
    templateUrl: "/static/templates/realiron_player.html",
    link: function(scope, elem, attrs){
        scope.riPlaylist = riPlaylist;
        scope.riPlayer = riPlayer;

        $window.onYouTubeIframeAPIReady = scope.riPlayer.init(scope.videoId);
        scope.riPlaylist.init();

        scope.playlist = scope.riPlaylist.getPlaylist();
        scope.player = scope.riPlayer.getPlayer();

        scope.search = function(query) {
            if(isNull(query)){
                $window.alert("검색어를 입력해 주세요.");
                return false;
            }
            var success = function(data, status, headers, config){
                var video = {
                    title : data.items[0].snippet.title,
                    videoId : data.items[0].id.videoId,
                    thumb : data.items[0].snippet.thumbnails.default.url,
                    edit : false,
                    playing : false,
                    other_videos : []
                }
                for (i = 1; i < data.items.length; i++) {
                    video.other_videos.push({
                        title : data.items[i].snippet.title,
                        videoId : data.items[i].id.videoId,
                        thumb : data.items[i].snippet.thumbnails.default.url
                    });
                }
                scope.playlist.push(video);
                scope.riPlayer.play(video);
            }
            var error = function(data, status, headers, config){
                $window.alert('동영상 등록에 실패하였습니다.');
            }
            riSearch.simpleSearch(query, success, error);
            scope.query = null;
        }
    }
  }

}