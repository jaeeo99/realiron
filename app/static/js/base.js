'use strict';
//-------------------
// set Angular Module
angular
  .module('RealIron', [
    'ui.bootstrap',
    'ui.sortable',
    'ngSanitize',
    'ngCookies'
  ]);

//-------------------
// set Angular Config
angular
  .module('RealIron')
  .config(config);

config.$inject = ['$httpProvider', '$interpolateProvider'];
function config($httpProvider, $interpolateProvider){
  $interpolateProvider.startSymbol('{$');
  $interpolateProvider.endSymbol('$}');

//  $httpProvider.defaults.useXDomain = true;
//  delete $httpProvider.defaults.headers.common["X-Requested-With"];
}

var GOOGLE_API_KEY = "AIzaSyCH8SzDt8nCXEg_rWl2KkLNK3gKRJ21C8w";

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test($email);
}

function isNull(data){
  if(data == null || data == undefined || data == ""){
    return true;
  }
  else{
    return false;
  }
}

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

function cloneJSON(obj){
  return JSON.parse(JSON.stringify(obj));
}

function shuffle(list){
  for(var j, x, i = list.length; i; j = Math.floor(Math.random() * i), x = list[--i], list[i] = list[j], list[j] = x);
  return list;
}

function isMobile() {
  if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)){
      return true;
  }
  else {
      return false;
  }
}
