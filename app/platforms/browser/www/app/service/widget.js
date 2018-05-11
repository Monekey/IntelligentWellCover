/**
 * Created by 崔启蒙 on 2018/4/19.
 */
angular.module("app")
    .service("Widget", ['$ionicPopup', "$cordovaToast", "$log", function($ionicPopup, $cordovaToast, $log){
        return{
            ShowModalAlert: function (content) {
                var myPopup = $ionicPopup.alert({
                    template: '<span>'+content+'</span>',
                    title: '提示'
                });
                return myPopup
            },
            ShowAlert: function(content, position){
                $log.error(content);
                return $cordovaToast.show(content, 'short', position||'bottom');
            }
        }
    }])