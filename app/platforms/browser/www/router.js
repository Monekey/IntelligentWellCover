/**
 * Created by 崔启蒙 on 2018/4/14.
 */
angular.module('app')
    .constant('Router', {
        "app": {
            url:'',
            abstract: true,
            templateUrl: 'app/app.html'
        },
        "app.nav": {
            url:'nav',
            abstract: true,
            templateUrl: 'app/common/nav.html'
        },
        "app.main": {
            url:'/main',
            controller: 'mainCtrl',
            templateUrl: 'app/components/main.html',
            reloadOnSearch: false,
            $Title: "定位数据",
        },
        "app.login": {
            url:'/login',
            controller: 'login',
            templateUrl: 'app/common/login.html',
            params: {first:''},
            $Title: "登录"
        },
        "app.main.deviceDetail":  {
            url:'/deviceDetail?deviceNo&deviceName',
            controller: 'deviceDetail',
            templateUrl: 'app/components/deviceDetail.html',
            // reloadOnSearch: false,
            $Title: "设备详情",
            $HideTitle: false
        },
        "app.main.deviceList": {
            url:'/deviceList',
            controller: 'deviceListCtrl',
            templateUrl: 'app/components/deviceList.html',
            // reloadOnSearch: false,
            $Title: "设备列表"
        },
        "app.main.user": {
            url:'/user',
            controller: 'userCtrl',
            templateUrl: 'app/components/user.html',
            $Title: "用户中心"
        },
        "app.main.setting": {
            url:'/setting',
            controller: 'settingCtrl',
            templateUrl: 'app/components/setting.html',
            $Title: "设置"
        }
    })
    .config(['$stateProvider',"Router", function($stateProvider, Router){
        angular.forEach(Router, function(stateParam, stateName){
            $stateProvider.state(stateName, stateParam);
        });
    }])