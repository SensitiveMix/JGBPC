angular.module('techNodeApp').controller('AnalystCtrl', ['$scope', '$routeParams', '$scope', 'server', function($scope, $routeParams, $scope, server) {
        $scope.online_users=server.getOnlineUser($scope.me._id)
        $scope.offline_users=server.getOfflineUser($scope.me._id)
}])