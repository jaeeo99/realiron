angular
  .module('RealIron')
  .factory('riSearch', riSearch);

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

}

function riPlaylist(){

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