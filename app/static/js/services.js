angular
  .module('RealIron')
  .factory('riSearch', riSearch)
  .factory('riPlayer', riPlayer)
  .factory('riPlaylist', riPlaylist);

function riSearch($http){
    var SEARCH_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=" + GOOGLE_API_KEY + "&q=";

    function simpleSearch(query, success, fail){
        $http.get(SEARCH_URL + query).
            success(success).
            error(fail);
    }

    return{
        simpleSearch: simpleSearch
    }
}

function riPlayer(){
    var player;
    var onReady = function(){};
    var onStateChange = function(){};
    var play_video;

    function init(videoDivId){
        return function(){
            player = new YT.Player(videoDivId, {
                events: {
                    'onReady': onReady,
                    'onStateChange': onStateChange
                }
            });
        }
    }

    function setOnReady(isReady){
        onReady = isReady;
        return onReady;
    }

    function setOnStateChange(isEnded){
        onStateChange = function(event){
            if(event.data == YT.PlayerState.ENDED){
                isEnded();
            }
        }
        return onStateChange;
    }

    function stopVideo(){
        return function(){
            stop();
        }
    }

    function play(video){
        play_video = video;
        play_video.playing = true;
        player.loadVideoById(video.videoId, 0, 'large');
        player.playVideo();
    }

    function pause(){
        play_video.playing = false;
        player.pauseVideo();
    }

    function stop(){
        play_video.playing = false;
        player.stopVideo();
    }

    function getPlayer(){
        return player;
    }

    function getPlayVideo(){
        return play_video;
    }

    return{
        setOnReady: setOnReady,
        setOnStateChange: setOnStateChange,
        getPlayer: getPlayer,
        getPlayVideo: getPlayVideo,
        stopVideo: stopVideo,
        init: init,
        play: play,
        pause: pause,
        stop: stop,
    }
}

function riPlaylist(){
    var playlist;
    var cur_index;
    var repeat = false;

    function init(){
        playlist = [];
        cur_index = -1;
    }

    function push(video){
        playlist.push(video);
    }

    function remove(index){
        playlist.splice(index, index + 1);
    }

    function setRepeat(isRepeat){
        repeat = isRepeat;
    }

    function getPrev(){
        if(playlist.length == 0){
            cur_index = -1;
            return null;
        }
        if(cur_index == -1){
            cur_index = 0;
        } else if(cur_index - 1 < 0){
            cur_index = playlist.length - 1;
        } else {
            cur_index--;
        }
        return playlist[cur_index];
    }

    function getNext(){
        if(playlist.length == 0){
            cur_index = -1;
            return null;
        }
        if(cur_index == -1){
            cur_index = 0;
        } else if(cur_index < playlist.length - 1){
            cur_index++;
        } else {
            cur_index = 0;
        }
        return playlist[cur_index];
    }

    function getPlaylist(){
        return playlist;
    }

    return{
        init: init,
        push: push,
        remove: remove,
        setRepeat: setRepeat,
        getNext: getNext,
        getPrev: getPrev,
        getPlaylist: getPlaylist
    }
}

// snippet code
//  .factory("fileReader", fileReader);
//
//fileReader.$inject = ['$q'];
//
//function fileReader($q){
//  function onLoad(reader, deferred, scope) {
//    return function () {
//      scope.$apply(function () {
//         deferred.resolve(reader.result);
//      });
//   }
//  }
//
//  function onError(reader, deferred, scope) {
//    return function () {
//      scope.$apply(function () {
//        deferred.reject(reader.result);
//      });
//    }
//  }
//
//  function onProgress(reader, scope) {
//    return function (event) {
//      scope.$broadcast("fileProgress", {
//         total: event.total,
//         loaded: event.loaded
//      });
//    }
//  }
//
//  function getReader(deferred, scope) {
//    var reader = new FileReader();
//    reader.onload = onLoad(reader, deferred, scope);
//    reader.onerror = onError(reader, deferred, scope);
//    reader.onprogress = onProgress(reader, scope);
//    return reader;
//  }
//
//  function readAsDataURL(file, scope) {
//    var deferred = $q.defer();
//    var reader = getReader(deferred, scope);
//    reader.readAsDataURL(file);
//    return deferred.promise;
//  }
//
//  return {
//    readAsDataUrl: readAsDataURL,
//  };
//}