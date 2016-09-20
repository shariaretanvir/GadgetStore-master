
var app = angular.module("myapp", ["ngRoute", 'ui.bootstrap'])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.when("/gadgets", {
            templateUrl: "app/views/gadgets.html"
        });
        $routeProvider.when("/aa", {
            templateUrl : "app/aa.html"
        });
       $routeProvider.otherwise({
        redirectTo: "/gadgets"
    });
})