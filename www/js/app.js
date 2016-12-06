// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
// angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

var vendorApp = angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('top');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-dash': {
        templateUrl: 'templates/home/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
      .state('landing', {
        url: '/landing',
        abstract: false,
        cache:false,
        templateUrl: 'templates/auth/app-landing.html',
        controller: 'appLandingCtrl'
      })

      .state('location', {
        url: '/location',
        cache:false,
        templateUrl: 'templates/general/location.html',
        controller: 'LocationCtrl'
      })

      .state('intro-slider', {
        url: '/intro-slider',
        templateUrl: 'templates/general/intro-slider.html',
        controller: 'IntroSliderCtrl'
      })

      .state('login', {
        url: '/login',
            templateUrl: 'templates/auth/login.html',
            controller: 'loginCtrl'

      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/auth/signUp.html',
        controller: 'SignUpCtrl'

      })
  //State for update app
  .state('updateApp', {
    url: '/updateApp',
    templateUrl: 'templates/general/updateApp.html',
    controller: 'updateAppCtrl'

  })
      /////state for under-construction //////
  .state('under-construction', {
    url: '/under-construction',
    templateUrl: 'templates/general/AppUnderConstruction.html',
    controller: 'AppUnderConstructionCtrl'

  })


  .state('tab.menu', {
      url: '/menu',
      views: {
        'tab-chats': {
          templateUrl: 'templates/menu/menu.html',
          controller: 'MenuCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-account': {
        templateUrl: 'templates/profile/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/dash');
  $urlRouterProvider.otherwise('/landing');


});
var db = firebase.database();



function checkLocalStorage(item) {
  if (localStorage.getItem(item) === null || typeof window.localStorage[item] === 'undefined') {
    return false
  } else {
    return true
  }
}