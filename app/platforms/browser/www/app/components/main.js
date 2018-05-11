/**
 * Created by 崔启蒙 on 2018/4/18.
 */
angular.module('app')
    .controller('mainCtrl', function($scope, DeviceService, $state, EventBus, UserService, $rootScope){
        $scope.state = $state;
        // $scope.Router = Router;
        // $scope.ModalViewShow = false;
        // $scope.PopupModalViewPage = function(ModalViewContent, params){
        //     $scope.ModalViewShow = true;
        //     $scope.ModalViewContent = ModalViewContent+".html";
        //     if(params){
        //         $scope.ModalViewContent += "?";
        //         angular.forEach(params, function (value, key) {
        //             $scope.ModalViewContent += key + "=" + value + "&";
        //         })
        //     }
        // };
        // $scope.CloseViewModalPage = function(){
        //     $scope.ModalViewShow = false;
        // };
        $scope.goDeviceDetail = function(device){
            var params = {deviceNo:device.deviceNo,deviceName: device.deviceName};
            $state.go('app.main.deviceDetail', params)
        }
        $scope.doRefresh = function () {
            $state.go($state.current.name,$state.params,{reload: false});
            // $rootScope.$emit("UpdateDeviceList", DeviceService.GetDeviceList());
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.panTo = function(device){
            EventBus.Publish('PANTO', device)
        }
        $scope.panToLocation = function(){
            EventBus.Publish('panToLocation')
        }
    });