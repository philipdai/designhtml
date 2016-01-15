var newAimsApp = angular.module('newAimsApp', ['ui.router']);

newAimsApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('home');

  $stateProvider
    .state('app', {
      url: '/',
      //abstract: true,
      views: {
        "": {templateUrl: 'app/app.html'},
        "header@app": {templateUrl: 'app/header/header.html'},
        "nav@app": {templateUrl: 'app/nav/nav.html'},
        "home@app": {templateUrl: 'app/home/home.html'}
      }
    })
    .state('app.home', {
      url: 'home',
      views: {
        "body@app": {
          templateUrl: 'app/home/home.html'
          //,
          //controller: 'home/HomeController',
          //controllerAs: 'ctrHome'
        }
      },
      onEnter: function() {
        $('nav-home-item').addClass('active');
        $('org-demo-item').removeClass('active');

      },
      onExit: function() {
        $('nav-home-item').removeClass('active');
      }
    })
    .state('app.org', {
      url: 'org',
      //abstract: true,
      views: {
        "body@app": {
          templateUrl: 'app/org/org.html'
          //,
          //controller: 'org/OrganizationController',
          //controllerAs: 'ctrOrg'
        }
      }
    });
});