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
    var onReady;
    var onStateChange;

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
        //onReady = isReady;
        onReady = play;
        return onReady;
    }

    function setOnStateChange(isPlaying, isEnded){
        onStateChange = function(event){
            if(event.data == YT.PlayerState.PLAYING) {
                //isPlaying();
            }
            else if(event.data == YT.PlayerState.ENDED){
                play();
                //isEnded();
            }
        }
        return onStateChange;
    }

    function stopVideo(){
        return function(){
            stop();
        }
    }

    function play(){
        player.playVideo();
    }

    function pause(){
        player.pauseVideo();
    }

    function stop(){
        player.stopVideo();
    }

    return{
        setOnReady: setOnReady,
        setOnStateChange: setOnStateChange,
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

    function init(){
    }

    function append(index){
        playlist.append(video);
    }

    function edit(index, query){
    }

    function remove(index){
    }

    return{
        init: init,
        append: append,
        edit: edit,
        remove: remove
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