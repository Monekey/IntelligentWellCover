/**
 * Created by 崔启蒙 on 2018/4/14.
 */
angular.module('app', ['ionic', 'ui.router','ngTouch', 'app.service', 'ngCordova', 'toggle-switch'])
    .run(function($rootScope, $ionicPlatform, $state, $ionicHistory, config,
                  $ionicPopup, $cordovaKeyboard, $timeout, $cordovaToast, $location){

        $state.go('app.login', {first: 1});

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
        //物理返回按钮控制&双击退出应用
        $ionicPlatform.registerBackButtonAction(function (e) {
            //判断处于哪个页面时双击退出
            if ($location.path() == '/main' || $location.path() == '/login') {
                if ($rootScope.backButtonPressedOnceToExit) {
                    ionic.Platform.exitApp();
                } else {
                    $rootScope.backButtonPressedOnceToExit = true;
                    $cordovaToast.showShortBottom('再按一次退出系统');
                    setTimeout(function () {
                        $rootScope.backButtonPressedOnceToExit = false;
                    }, 2000);
                }
            }else {
                if ($cordovaKeyboard.isVisible()) {
                    $cordovaKeyboard.close();
                } else {
                    // $ionicHistory.goBack();
                    window.history.back()
                }
            }
            // else {
            //     $rootScope.backButtonPressedOnceToExit = true;
            //     $cordovaToast.showShortBottom('再按一次退出系统');
            //     setTimeout(function () {
            //         $rootScope.backButtonPressedOnceToExit = false;
            //     }, 2000);
            // }
            e.preventDefault();
            return false;
        }, 101);
        var cache = window.localStorage.getItem("APP_CONFIG");
        if(cache){
            cache = JSON.parse(cache);
            angular.extend(config, cache);
        }
    })
    .config(function($ionicConfigProvider){
        $ionicConfigProvider.scrolling.jsScrolling(false);
    })
    .controller('homeCtrl', ['$scope', "$rootScope", "$window", "$state", "UserService", "$location", "$ionicLoading", "Router", "$ionicHistory", "$interval",
        function($scope, $rootScope, $window, $state, UserService, $location, $ionicLoading, Router, $ionicHistory, $interval){
        $rootScope.app = {
            firstLogin: true,
            userKey: ""
        };
        $rootScope.Page = {};
        $rootScope.GOBACK = function(){
            // $ionicHistory.goBack()
            window.history.back()
        };
        $rootScope.$watch(function(){
            return $rootScope.loadingTracker?$rootScope.loadingTracker.active():false
        }, function(nv, ov){
            if(nv === true){
                $ionicLoading.show({
                    template: 'Loading...'
                });
            }else{
                $ionicLoading.hide();
            }
        })

        $rootScope.$on("$stateChangeStart", function(event, toState, toParam, fromState, fromParam){
            console.log($location.path());
            toParam.fromState = fromState.name;
            if(toState.name!='app.login' && !UserService.GetUser()){//todo 过期
                event.preventDefault();
                $state.go('app.login')
            }else{
                toState.name=='app.main'||
                ($rootScope.Page = Router[toState.name])
            }
        })
        $rootScope.$on("$stateChangeSuccess", function(event, toState, toParam, fromState, fromParam){


        })
    }]);
