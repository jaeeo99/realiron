angular
  .module('RealIron')
  .controller('MusicCtrl', musicCtrl);

musicCtrl.$inject = ['$scope', '$window', '$cookies', 'riSearch', 'riPlayer', 'riPlaylist', '$log'];

function musicCtrl($scope, $window, $cookies, riSearch, riPlayer, riPlaylist, $log){
    // codes for youtube player
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
