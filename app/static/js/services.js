angular
  .module('RealIron')
  .factory('riSearch', riSearch)
  .factory('riPlayer', riPlayer)
  .factory('riPlaylist', riPlaylist)
  .factory('srvAuth', srvAuth);

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

function riPlayer($window){
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
                play_video.playing = false;
                isEnded();
            }
        }
        return onStateChange;
    }

    function setPlayVideo(video){
        if(isNull(video)){
            $window.alert('유효한 영상이 아닙니다.');
            return;
        }
        play_video = video;
        player.loadVideoById(video.videoId, 0, 'large');
    }

    function play(){
        if(isNull(play_video)){
            return;
        }
        play_video.playing = true;
        player.playVideo();
    }

    function pause(){
        if(isNull(play_video)){
            return;
        }
        play_video.playing = false;
        player.pauseVideo();
    }

    function stop(){
        if(isNull(play_video)){
            return;
        }
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
        setPlayVideo: setPlayVideo,
        getPlayer: getPlayer,
        getPlayVideo: getPlayVideo,
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
        playlist.splice(index, 1);
    }

    function repeatToggle(){
        repeat = !repeat;
    }

    function resetIndex(){
        for(var i = 0 ; i < playlist.length ; i++){
            if(playlist[i].playing){
                cur_index = i;
                return;
            }
        }
        cur_index = -1;
    }

    function isRepeat(){
        return repeat;
    }

    function getPrev(){
        resetIndex();
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
        resetIndex();
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

    function getIndex(){
        return cur_index;
    }

    function getPlaylist(){
        return playlist;
    }

    return{
        resetIndex: resetIndex,
        repeatToggle: repeatToggle,
        getNext: getNext,
        getPrev: getPrev,
        getPlaylist: getPlaylist,
        getIndex: getIndex,
        isRepeat: isRepeat,
        init: init,
        push: push,
        remove: remove,
    }
}

function srvAuth($rootScope){
    var srvAuth = {};

    srvAuth.fblogin = function() {
      FB.login(function (response) {
        if (response.status === 'connected') {
          // You can now do what you want with the data fb gave you.
          console.info(response);
        }
      });
    }

    srvAuth.logout = function() {
      var _self = this;
      FB.logout(function(response) {
        $rootScope.$apply(function() {
          $rootScope.user = _self.user = {};
        });
      });
    }

    srvAuth.watchLoginChange = function() {
      var _self = this;
      FB.Event.subscribe('auth.authResponseChange', function(res) {
        if (res.status === 'connected') {
          FB.api('/me', function(res) {
            $rootScope.$apply(function() {
              $rootScope.user = _self.user = res;
              console.info($rootScope.user);
            });
          });
        } else {
          alert('Not Connected');
        }
      });
    }
    return srvAuth;
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