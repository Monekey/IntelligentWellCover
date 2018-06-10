/**
 * Created by 崔启蒙 on 2018/4/21.
 */
angular.module('app')
    .controller('deviceDetail', function($scope,$rootScope, $state, DeviceService, Widget, $interval, EventBus, OperateSensorNameList,
                                         $q, $ionicModal, $ionicPlatform, OperateSensorConfig, $cordovaToast, $ionicPopup, $timeout, config){
        console.log($state.params);
        // $rootScope.Page.$Title = $state.params.deviceName;
        $scope.OperateIds = {};
        $scope.ControlCode = '';
        $scope.VisibleMeter = config.VisibleMeter;
        $scope.DateAfter = Math.round((new Date() - DeviceService.GetLastDate())/1000);
        var intervalObj = $interval(function(){
            $scope.DateAfter = Math.round((new Date() - DeviceService.GetLastDate())/1000);
        },1000);
        $scope.sensorLastDataList = [];
        $scope.deviceName = $state.params.deviceName;
        $ionicModal.fromTemplateUrl('alarmsDetailModal', {
            scope: $scope,
            animation: 'slide-in-left',
            hardwareBackButtonClose: true,
            backdropClickToClose: true
        }).then(function(modal) {
            $scope.alarmDetailM = modal;
        });

        $scope.alarmDetailModal = function() {
            $scope.CurAlarmList = $scope.Device.aList;
            $scope.alarmDetailM.show();
        };
        $scope.closeAlarmsDetailModal = function() {
            $scope.alarmDetailM.hide();
        };
        function getCurrentDeviceData(DeviceList) {

            $scope.Device = DeviceList.filter(function(item){
                return item.deviceNo === $state.params.deviceNo;
            })[0];
            if($state.params.openAlarm && $scope.Device.NewAlarmCount){
                $timeout($scope.alarmDetailModal);
            }

            $scope.StateList = [];
            $scope.ActionList = [];
            $scope.SettingList = [];
            angular.forEach($scope.Device.sensorList, function(sensor){
                if(OperateSensorConfig[sensor.sensorName]){
                    var _SConfig = OperateSensorConfig[sensor.sensorName];
                    _SConfig.sensor = sensor;
                    switch (_SConfig.Type){
                        case 1: $scope.StateList.push(_SConfig);break;
                        case 2: $scope.ActionList.push(_SConfig);break;
                        case 3: $scope.SettingList.push(_SConfig);break;
                        default: break;
                    }
                }else{
                    console.log(sensor.sensorName+",此传感器未配置");
                }
            });
            if(OperateSensorConfig['现场最大操作距离'].sensor && OperateSensorConfig['现场最大操作距离'].sensor.value){
                $scope.VisibleMeter = parseFloat(OperateSensorConfig['现场最大操作距离'].sensor.value);
            }
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

        function CheckOpDistanceValid(){
            if(parseFloat($scope.Device.distance) <= $scope.VisibleMeter){
                $scope.holdHelpError = false;
            }else{
                console.log("距离过远，最大可操作距离为"+$scope.VisibleMeter+"米。");
                $cordovaToast.show("距离过远，最大可操作距离为"+$scope.VisibleMeter+"米。", 'short', 'center');
                $scope.holdHelpError = true;
            }
            return !$scope.holdHelpError;
        }

        $scope.StartSwitch = function(){
            if(!CheckOpDistanceValid()){
                return;
            }
            var defered = $q.defer();
            var p1 = DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.YUANCHENGKONGZHI], 1);
            // var p2 = DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.YUANCHENGSHURU], $scope.ControlCode);
            p1.then(function(){
                DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.YUANCHENGSHURU], $scope.ControlCode)
                    .then(function(data){
                        defered.resolve(data)
                    })
            });
            return defered.promise;
            // return $q.all([p1, p2])
        };
        $scope.ChangeSwitch = function (flag) {
            if(!CheckOpDistanceValid()){
                return;
            }
            var id = $scope.OperateIds[OperateSensorNameList.JINGGAISHENGQI];
            if(flag == 'down'){
                $scope.triggerHoldOn_up = false;
                id = $scope.OperateIds[OperateSensorNameList.JINGGAILUOXIA];
            }else{
                $scope.triggerHoldOn_down = true;
            }
            // DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.YUANCHENGKONGZHI], '1')
            // .then(function(data){
            //     console.log('允许远程控制成功');
            if(config.上升下降每次发送三个接口){
                DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.YUANCHENGKONGZHI], 1);//1改成1
                DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.YUANCHENGSHURU], $scope.ControlCode)
            }
            // DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.FENGMINGQI], '1')
            // .then(function(data){
            //     console.log("蜂鸣器响应成功")
            // });
            DeviceService.ControlSwitchValue($scope.Device.deviceNo, id, 1)
            .then(function(data){
                console.log(data)
            })
            // })
        };
        $scope.CancelSwitch = function(){
            console.log('cancel');
            $scope.triggerHoldOn_up = false;
            $scope.triggerHoldOn_down = false;
            DeviceService.ControlSwitchValue($scope.Device.deviceNo, $scope.OperateIds[OperateSensorNameList.JINGGAITINGZHU], 1)
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
        $scope.SensorSwitch = function(sensorConifg){
            var sensor = sensorConifg.sensor;
            var value = sensor.switcher == '1'?'0':'1';
            if(sensorConifg.OperateType == 3){
                value = '1';
            }

            DeviceService.ControlSwitchValue($scope.Device.deviceNo, sensor.sensorId, value, true)
                .then(function(){
                    if(sensorConifg.OperateType == 3){
                        sensor.switcher = '0';
                        $cordovaToast.show(sensor.sensorName + "操作成功！", 'short', 'bottom');
                    }else{
                        sensor.switcher = value;
                    }
                })
        };
        $scope.SensorSwitchToggle = function(sensorConifg){
            var sensor = sensorConifg.sensor;
            DeviceService.ControlSwitchValue($scope.Device.deviceNo, sensor.sensorId, sensor.switcher, true)
                .then(function(){
                    $cordovaToast.show(sensor.sensorName + "操作成功！", 'short', 'bottom');
                })
        }
        $scope.SensorValue = function (sensor) {
            var value = sensor.value;
            DeviceService.ControlSwitchValue($scope.Device.deviceNo, sensor.sensorId, value)
                .then(function(){
                    if(sensor.sensorName == '现场最大操作距离' && value){
                        $scope.VisibleMeter = parseFloat(value);
                    }
                    $cordovaToast.show("参数设置成功！", 'short', 'bottom');
                })
        };
        $scope.OpenSensorValueModal = function(sensorConifg){
            $scope.CURRENTSENSOR= {
                VALUE: sensorConifg.sensor.value,
                INVALID: false
            };
            $scope.CURRENTSENSORUNIT = sensorConifg.sensor.unit;
            // 一个精心制作的自定义弹窗
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="CURRENTSENSOR.VALUE"><br/><p ng-show="CURRENTSENSOR.INVALID" style="color: red">值不能为空</p>',
                title: '请输入新的值',
                // subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                    { text: '取消' },
                    {
                        text: '<b>应用</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.CURRENTSENSOR.VALUE) {
                                $scope.CURRENTSENSOR.INVALID = true;
                                e.preventDefault();
                            }
                            return $scope.CURRENTSENSOR.VALUE;
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                if(!res){return};
                DeviceService.ControlSwitchValue($scope.Device.deviceNo, sensorConifg.sensor.sensorId, res)
                    .then(function(){
                        sensorConifg.sensor.value = res;
                        $cordovaToast.show("参数设置成功！", 'short', 'bottom');
                    })
            });
        }
        $scope.getCurrentPosition=function(){
            $scope.Position = {
                lat: $rootScope.CurrPosition?$rootScope.CurrPosition.lat:"",
                lng: $rootScope.CurrPosition?$rootScope.CurrPosition.lng:""
            };
        }
        $scope.OpenDevicePositionModal = function(){
            // $scope.getCurrentPosition();
            $scope.Position = {
                lat: parseFloat($scope.Device.deviceLat),
                lng: parseFloat($scope.Device.deviceLng)
            };
            var myPopup = $ionicPopup.show({
                template: '<div class="list">' +
                '<div class="item">纬度(lat)：<input class="modal-input" type="number" ng-model="Position.lat">' +
                '<i style="font-size: 32px;position: absolute;right: 7px;top: 17px;color: #660000;" class="iconfont icon-dingwei3" ng-click="getCurrentPosition()">' +
                '<span style="font-size: 12px; position: absolute;bottom: -20px;left: -10px;">当前位置<span></span></span></i>' +
                '</div>' +
                '<div class="item">经度(lng)：<input class="modal-input" type="number" ng-model="Position.lng">' +
                '<br/><p ng-show="DevicePositionModalINVALID" style="color: red">值不能为空</p></div>' +
                '</div>',
                title: '请输入新的经纬度',
                // subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                    { text: '取消',
                        onTap: function(e) {
                            return "close";
                        }},
                    {
                        text: '<b>修改</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.Position.lat || !$scope.Position.lng) {
                                $scope.DevicePositionModalINVALID = true;
                                e.preventDefault();
                            }
                            return $scope.Position;
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                if(res==="close"){return};
                $scope.Position.lat = String($scope.Position.lat);
                $scope.Position.lng = String($scope.Position.lng);
                DeviceService.UpdateDevice($scope.Device, $scope.Position, res)
                    .then(function(){
                        $cordovaToast.show("经纬度设置成功！请等待数据同步", 'short', 'bottom');
                    })
            });
        }

        $ionicModal.fromTemplateUrl('operateModal', {
            scope: $scope,
            animation: 'slide-in-left',
            hardwareBackButtonClose: true,
            backdropClickToClose: true
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function() {
            $scope.operateModalShow = true;
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $ionicModal.fromTemplateUrl('settingModal', {
            scope: $scope,
            animation: 'slide-in-left',
            hardwareBackButtonClose: true,
            backdropClickToClose: true
        }).then(function(modal) {
            $scope.settingModal = modal;
        });
        $scope.openSettingModal = function() {
            $scope.settingModal.show();
        };
        $scope.closeSettingModal = function() {
            $scope.settingModal.hide();
        };
        $scope.OpenMoreSetting = function(){
            $ionicPopup.prompt({
                title: '验证管理员身份',
                // template: 'Enter your secret password',
                inputType: 'password',
                inputPlaceholder: '请输入密码',
                // buttons: [
                //     { text: '取消' },
                //     {
                //         text: '<b>确定</b>',
                //         type: 'button-positive',
                //         onTap: function(e) {
                //
                //         }
                //     }
                // ]
            }).then(function(res) {
                if(!res){return}
                if(res == '18430'){
                    Widget.ShowAlert('身份验证成功');
                    $scope.openSettingModal();
                }else {
                    Widget.ShowAlert('身份验证失败！');
                }
            });
        }
        EventBus.Subscribe('OpenSettingModal', $scope.openSettingModal);
        //Cleanup the modal when we're done with it!
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
            $scope.operateModalShow = false;
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
        $scope.$on('$destroy', function(){
            $scope.CancelSwitch();
            $scope.closeSettingModal();
            $scope.closeModal();
            $scope.closeAlarmsDetailModal();
        })
    })
.directive("ngOnhold", function($swipe, $parse, $interval, config, $rootScope, $timeout){
    //长按触发事件需要的时间
    var ON_HOLD_TIMEMS = 500;
    //定时器间隔
    var INTERVAL_TIME = config.INTERVAL_TIME;

    return function(scope, element, attr) {

        var onholdStratHandler = $parse(attr["ngOnholdStart"])
        var onholdHandler = $parse(attr["ngOnhold"]);
        var onholdEndHandler = $parse(attr["ngOnholdEnd"]);
        var run;
        // var intervalObj = $rootScope.intervalObj;
        $interval.cancel($rootScope.intervalObj);

        $swipe.bind(element, {
            'start': function(coords, event) {
                $(element).addClass('hold-start');
                run = setTimeout(function(){
                    element.triggerHandler("onhold");
                    try {
                        navigator.vibrate(500);
                    }catch (e){
                        $(element).removeClass('hold-start');
                    }
                    onholdStratHandler(scope, {$event: event}).then(function() {
                        onholdHandler(scope, {$event: event});
                        $interval.cancel($rootScope.intervalObj);
                        $rootScope.intervalObj = $interval(function(){
                            if(element.hasClass("activated")){
                                element.triggerHandler("onhold");
                                onholdHandler(scope, {$event: event});
                            }else{
                                $interval.cancel($rootScope.intervalObj);
                            }
                        }, INTERVAL_TIME);
                    });
                }, ON_HOLD_TIMEMS);
            },
            'cancel': function(event) {
                if(run){
                    console.log("cancel");
                    clearTimeout(run);
                    $interval.cancel($rootScope.intervalObj);
                }
            },
            'move' : function(event){
                if(run){
                    // console.log("moved")
                    // clearTimeout(run)
                    // $interval.cancel($rootScope.intervalObj);
                }
            },
            'end': function(coords, event) {
                $(element).remove('hold-start');
                $interval.cancel($rootScope.intervalObj);
                // if(run){
                //     clearTimeout(run);
                //     scope.$apply(function() {
                //         onholdEndHandler(scope, {$event: event});
                //     });
                // }
                clearTimeout(run);
                scope.$apply(function() {
                    onholdEndHandler(scope, {$event: event});
                });
            }
        }, ['touch', 'mouse']);
        scope.$on("$destroy", function(){
            $interval.cancel($rootScope.intervalObj);
        })
    }
});