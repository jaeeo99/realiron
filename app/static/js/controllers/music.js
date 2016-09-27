angular
  .module('RealIron')
  .controller('MusicCtrl', musicCtrl);

musicCtrl.$inject = ['$scope', '$window', '$cookies', 'riSearch', 'riPlayer', 'riPlaylist', '$log'];

function musicCtrl($scope, $window, $cookies, riSearch, riPlayer, riPlaylist, $log){
    // def angular function for html attr
    $scope.search = function(query) {
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
        }
        var error = function(data, status, headers, config){
            $window.alert('동영상 등록에 실패하였습니다.');
        }
        riSearch.simpleSearch(query, success, error);
        $scope.query = null;
    }

    // codes for youtube player
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    $window.onPlayerReady = riPlayer.setOnReady(function(){});

    $window.onPlayerStateChange = riPlayer.setOnStateChange(function(){},function(){});

    $window.onYouTubeIframeAPIReady = riPlayer.init('curr_video');

    $window.stopVideo = riPlayer.stopVideo();

}
