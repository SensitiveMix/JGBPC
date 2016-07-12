angular.module('techNodeApp').controller('LoginCtrl', ['$scope', '$location', 'server', function($scope, $location, server) {
  $scope.login = function () {
    var data=[$scope.name,$scope.password,$scope.email]
    server.login(data).then(function () {
      $location.path('/rooms')
    }, function () {
      $location.path('/login')
    })
  }
}])