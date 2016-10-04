angular
  .module('RealIron')
  .controller('MainCtrl', mainCtrl);

mainCtrl.$inject = ['$scope', 'srvAuth'];

function mainCtrl($scope, srvAuth){
    $scope.logout = function() {
        srvAuth.logout();
    }
    $scope.fblogin = function() {
        srvAuth.fblogin();
    }
}