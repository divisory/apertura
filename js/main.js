var DATA, dockApp;

dockApp = angular.module("dockApp", []);

DATA = [];

dockApp.controller('dockCtrl', [
  '$scope', '$http', function($scope, $http, $sce) {
    $http.get('list.json').success(function(data) {
      var d, i, len;
      $scope.modules = data;
      for (i = 0, len = data.length; i < len; i++) {
        d = data[i];
        DATA[d.title.trim().toLowerCase()] = d;
      }
    });
    $scope.getName = function(str) {
      return "" + (str.toUpperCase().trim().substr(0, 1)) + (str.trim().substr(1));
    };
    $scope.isMenuOpened = false;
    $scope.toggleMenu = function() {
      return $scope.isMenuOpened = !$scope.isMenuOpened;
    };
  }
]);

dockApp.config([
  "$routeProvider", function($routeProvider) {
    return $routeProvider.when("/dock/:orderId", {
      templateUrl: "module.html",
      controller: "ShowOrderController"
    }).when("/structure/", {
      templateUrl: "structure.html"
    }).when("/config/", {
      templateUrl: "config.html"
    }).when("/grid/", {
      templateUrl: "grid.html"
    }).when("/adk/", {
      templateUrl: "adk.html"
    }).when("/home/", {
      templateUrl: "homepage.html"
    }).otherwise({
      redirectTo: "home"
    });
  }
]);

dockApp.controller("AddOrderController", function($scope) {
  return $scope.message = "This is Add new order screen";
});

dockApp.controller("ShowOrderController", function($scope, $routeParams, $http) {
  $scope.parseTags = function(str, status) {
    return (status !== true ? str = str.replace(/p{(.+?)}p/gim, '<p>$1</p>') : void 0, str.replace(/ul{(.+?)}ul/gim, '<ul>$1</ul>').replace(/li{(.+?)}li/gim, '<li>$1</li>').replace(/h3{(.+?)}h3/gim, '<h3>$1</h3>').replace(/imp{(.+?)}imp/gim, '<span class="important">$1</span>').replace(/p{(.+?)}p/gim, '<div class="pad-bot-10">$1</div>').replace(/(p{|}p)/gim, '').replace(/bd{(.+?)}/gim, '<span class="badge">$1</span>').replace(/arg{(.+?)}/gim, '<span class="arg">$1</span>').replace(/a{(.+?)}/gim, '<a href="$1">$1</a>'));
  };
  $scope.order_id = $routeParams.orderId;
  $scope.module = DATA[$routeParams.orderId.trim().toLowerCase()];
  $scope.isProperties = $scope.module.hasOwnProperty('properties');
  $scope.isMethods = $scope.module.hasOwnProperty('methods');
  $scope.isMixins = $scope.module.hasOwnProperty('mixins');
  return $scope.isPlugins = $scope.module.hasOwnProperty('plugins');
});
