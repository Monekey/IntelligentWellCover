/**
 * Created by 崔启蒙 on 2018/4/21.
 */
angular.module('app')
    .controller('deviceDetail', function($scope,$rootScope, $state, DeviceService, Widget, $interval, EventBus, OperateSensorNameList, $q, $ionicModal, $ionicPlatform){
        console.log($state.params);
        $scope.OperateIds = {};
        $scope.ControlCode = '';
        $scope.DateAfter = Math.round((new Date() - DeviceService.GetLastDate())/1000);
        var intervalObj = $interval(function(){
            $scope.DateAfter = Math.round((new Date() - DeviceService.GetLastDate())/1000);
        },1000);
        $scope.sensorLastDataList = [];
        $scope.deviceName = $state.params.deviceName;
        $scope.loadDeviceData = function () {
            if(!$state.params.deviceNo || $rootScope.loadingTracker.active()){
                return;
            }
            DeviceService.queryLastDtByDevNo($state.params.deviceNo)
                .then(function(data){
                    $scope.sensorLastDataList = data.sensorLastDataList
                })
        };
        function getCurrentDeviceData(DeviceList) {
            $scope.Device = DeviceList.filter(function(item){
                return item.deviceNo === $state.params.deviceNo;
            })[0];
            $scope.sensorLastDataList = $scope.Device.sensorList;
            $scope.Device.$OperateSensorList = {};
            angular.forEach($scope.Device.sensorList, function(sensor){
                $scope.Device.$OperateSensorList[sensor.sensorName] = sensor;
            });
            angular.forEach(OperateSensorNameList, function (value, key) {
                $scope.OperateIds[value] = _getOperateSId(value);
            });
            $scope.ControlCode = _getOperateSValue(OperateSensorNameList.YUANCHENGCANKAO);
        }
        function _getOperateSId(key){
            return $scope.Device.$OperateSensorList[key]&&$scope.Device.$OperateSensorList[key].sensorId;
        }
        function _getOperateSValue(key){
            return $scope.Device.$OperateSensorList[key]&&$scope.Device.$OperateSensorList[key].value;
        }
        $scope.$on('UpdateDeviceList', function(event, deviceList){
            getCurrentDeviceData(deviceList);
        });
        getCurrentDeviceData(DeviceService.GetDeviceList());
        // var timer = null;
        // $scope.refreshTimer = function(){
        //     $interval.cancel(timer);
        //     $scope.loadDeviceData();
        //     $scope.TimerSecond = 30;
        //     timer = $interval(function(){
        //         if($scope.TimerSecond === 0){
        //             $scope.loadDeviceData();
        //             $scope.refreshTimer();
        //         }
        //         $scope.TimerSecond--;
        //     }, 1000)
        // };
        // $scope.refreshTimer();
        $scope.StartSwitch = function(){
            var defered = $q.defer();
            var p1 = DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.YUANCHENGSHURU], '1');
            // var p2 = DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.YUANCHENGSHURU], $scope.ControlCode);
            p1.then(function(){
                DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.YUANCHENGKONGZHI], $scope.ControlCode)
                    .then(function(data){
                        defered.resolve(data)
                    })
            });
            return defered.promise;
            // return $q.all([p1, p2])
        }
        $scope.ChangeSwitch = function (flag) {
            var id = $scope.OperateIds[OperateSensorNameList.JINGGAISHENGQI];
            if(flag == 'down'){
                id = $scope.OperateIds[OperateSensorNameList.JINGGAILUOXIA];
            }
            // DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.YUANCHENGKONGZHI], '1')
            // .then(function(data){
            //     console.log('允许远程控制成功');
            // DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.FENGMINGQI], '1')
            // .then(function(data){
            //     console.log("蜂鸣器响应成功")
            // });
            DeviceService.ControlSwitchValue($scope.Device.deviceNo, id, '1')
            .then(function(data){
                console.log(data)
            })
            // })
        };
        $scope.CancelSwitch = function(){
            console.log('cancel')
            DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.JINGGAITINGZHU], '1')
                .then(function(data){
                    console.log('停了')
                })
            // DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.FENGMINGQI], '0')
            // .then(function(data){
            //     console.log("蜂鸣器停止")
            // });
        }
        $scope.$on("$destroy", function(){
            // $interval.cancel(timer);
            $interval.cancel(intervalObj);
            $scope.modal.remove();
        })
        var backAction;
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-left'
        }).then(function(modal) {
            $scope.modal = modal;
            backAction= $ionicPlatform.registerBackButtonAction(function(){
                $scope.modal.hide();
                backAction();
                return;
                }, 401);
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
            backAction();
        };
        //Cleanup the modal when we're done with it!
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
    })
.directive("ngOnhold", function($swipe, $parse, $interval){
    //长按触发事件需要的时间
    var ON_HOLD_TIMEMS = 500;
    //定时器间隔
    var INTERVAL_TIME = 2000;

    return function(scope, element, attr) {

        var onholdStratHandler = $parse(attr["ngOnholdStart"])
        var onholdHandler = $parse(attr["ngOnhold"]);
        var onholdEndHandler = $parse(attr["ngOnholdEnd"]);
        var run;
        var intervalObj;

        $swipe.bind(element, {
            'start': function(coords, event) {
                run = setTimeout(function(){
                    element.triggerHandler("onhold");
                    onholdStratHandler(scope, {$event: event}).then(function() {
                        onholdHandler(scope, {$event: event});
                        intervalObj = $interval(function(){
                            element.triggerHandler("onhold");
                            onholdHandler(scope, {$event: event});
                        }, INTERVAL_TIME);
                    });
                }, ON_HOLD_TIMEMS);
            },
            'cancel': function(event) {
                if(run)clearTimeout(run);
            },
            'move' : function(event){
                if(run)clearTimeout(run);
            },
            'end': function(coords, event) {
                $interval.cancel(intervalObj);
                if(run){
                    clearTimeout(run);
                    scope.$apply(function() {
                        onholdEndHandler(scope, {$event: event});
                    });
                }
            }
        }, ['touch', 'mouse']);
    }
});