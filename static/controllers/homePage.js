/**
 * Created by sunNode on 16/7/20.
 */
angular.module('techNodeApp').controller('HomePageCtrl', ['$scope', '$location', 'server', function($scope, $location, server) {
    server.validate().then(function() {
        if ($location.path() === '/login') {
            $location.path('/rooms')
        }
    }, function() {
        $location.path('/login')
    })
}])