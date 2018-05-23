/**
 * Created by 崔启蒙 on 2018/4/21.
 */
angular.module("app")
    .constant("OperateSensorNameList",{
        FENGMINGQI:"蜂鸣器",
        YUANCHENGKONGZHI:"允许远程控制",
        YUANCHENGCANKAO:"远程控制验证码参考",
        YUANCHENGSHURU:"远程控制验证码输入",
        XITONGFUWEI:"系统复位",
        BAOJINGDAIMA:"设备报警代码",
        JINGGAISHENGQI:"井盖升起",
        JINGGAILUOXIA:"井盖落下",
        JINGGAITINGZHU:"井盖停住"
    })
    /**
     * OperateType 1:开关 2:数值 3:可切换开关
     * Operate: true:可操作 false：不可操作
     * Type: 1:状态 2：动作 3：参数
     * Show: true:显示 false：不显示
     * Special: true表示为特殊操作，不可设置
     * defaultValue: 默认值
     */
    .value("OperateSensorConfig", {
        井盖升起 : {
            OperateType: 1,
            Operate: true,
            Type: 2,
            Show: true,
            Special: true,
            defaultValue: 0
        },
        井盖落下: {
            OperateType: 1,
            Operate: true,
            Type: 2,
            Show: true,
            Special: true,
            defaultValue: 0
        },
        井盖停住: {
            OperateType: 1,
            Operate: false,
            Type: 2,
            Show: false,
            defaultValue: 0
        },
        井盖已打开: {
            OperateType: 1,
            Operate: false,
            Type: 1,
            Show: false,
            defaultValue: 0
        },
        井盖已全开: {
            OperateType: 1,
            Operate: false,
            Type: 1,
            Show: false,
            defaultValue: 0
        },
        井盖已关紧: {
            OperateType: 1,
            Operate: false,
            Type: 1,
            Show: true,
            defaultValue: 0
        },
        入口光栅状态: {
            OperateType: 1,
            Operate: false,
            Type: 1,
            Show: false,
            defaultValue: 0
        },
        井盖开启角度值: {
            OperateType: 2,
            Operate: false,
            Type: 1,
            Show: false,
            defaultValue: 0
        },
        温度: {
            OperateType: 2,
            Operate: false,
            Type: 1,
            Show: true,
            defaultValue: 0
        },
        湿度: {
            OperateType: 2,
            Operate: false,
            Type: 1,
            Show: true,
            defaultValue: 0
        },
        可燃气体浓度: {
            OperateType: 2,
            Operate: false,
            Type: 1,
            Show: true,
            defaultValue: 0
        },
        急停已触发: {
            OperateType: 1,
            Operate: false,
            Type: 1,
            Show: false,
            defaultValue: 0
        },
        蓄能器压力不足: {
            OperateType: 1,
            Operate: false,
            Type: 1,
            Show: true,
            defaultValue: 0
        },
        下拉压力不足: {
            OperateType: 1,
            Operate: false,
            Type: 1,
            Show: true,
            defaultValue: 0
        },
        禁用自动蓄能: {
            OperateType: 1,
            Operate: false,
            Type: 3,
            Show: false,
            defaultValue: 0
        },
        禁用下拉保压: {
            OperateType: 1,
            Operate: false,
            Type: 3,
            Show: false,
            defaultValue: 0
        },
        使能温湿度传感器: {
            OperateType: 1,
            Operate: false,
            Type: 3,
            Show: true,
            defaultValue: 1
        },
        使能倾角传感器: {
            OperateType: 1,
            Operate: false,
            Type: 3,
            Show: true,
            defaultValue: 0
        },
        使能燃气浓度传感器: {
            OperateType: 1,
            Operate: false,
            Type: 3,
            Show: true,
            defaultValue: 0
        },
        禁用入口报警: {
            OperateType: 1,
            Operate: false,
            Type: 3,
            Show: false,
            defaultValue: 0
        },
        Modbus从站地址: {
            OperateType: 2,
            Operate: false,
            Type: 3,
            Show: false,
            defaultValue: 10
        },
        通信超时时间: {
            OperateType: 2,
            Operate: false,
            Type: 3,
            Show: false,
            defaultValue: 600
        },
        设备报警代码: {
            OperateType: 2,
            Operate: false,
            Type: 1,
            Show: true,
            defaultValue: 0
        },
        蜂鸣器: {
            OperateType: 1,
            Operate: true,
            Type: 2,
            Show: true,
            defaultValue: 0,
            icon: 'icon-fengmingqi'
        },
        系统复位: {
            OperateType: 3,
            Operate: true,
            Type: 2,
            Show: true,
            defaultValue: 0,
            icon: 'icon-fuwei'
        },
        心跳信号: {
            OperateType: 3,
            Operate: true,
            Type: 1,
            Show: false,
            defaultValue: 0
        },
        握手信号: {
            OperateType: 1,
            Operate: true,
            Type: 2,
            Show: false,
            defaultValue: 0
        },
        动作指令有效时间: {
            OperateType: 2,
            Operate: true,
            Type: 3,
            Show: true,
            defaultValue: 30
        },
        井盖异常开启报警: {
            OperateType: 1,
            Operate: false,
            Type: 1,
            Show: false,
            defaultValue: 0
        },
        井口异常进入报警: {
            OperateType: 1,
            Operate: false,
            Type: 1,
            Show: false,
            defaultValue: 0
        },
        现场最大操作距离: {
            OperateType: 2,
            Operate: true,
            Type: 3,
            Show: true,
            defaultValue: 20
        },
        远程控制验证码参考: {
            OperateType: 2,
            Operate: true,
            Type: 3,
            Show: false,
            defaultValue: 18430
        },
        远程控制验证码输入: {
            OperateType: 2,
            Operate: true,
            Type: 3,
            Show: false,
            defaultValue: 0
        },
        允许远程控制: {
            OperateType: 1,
            Operate: true,
            Type: 3,
            Show: false,
            defaultValue: 0
        }
    })
.service('DeviceService', function(qmHttp, UserService, $rootScope, $interval, config, $log, EventBus, OperateSensorNameList, $q, $window, $ionicPopup, $filter){
    $rootScope.TotalAlarms = [];
    var deviceList = [];
    var deviceDistanceMap = {};
    var intervalObj = undefined;
    var timestrap = undefined;
    var alarms = {};
    var alarmsHistory = {};
    var IsAlarm = false;
    var AlarmLastDate = new Date();
    var map = null;
    function _setTimestrap() {
        timestrap = new Date();
    }
    function GetAlarms(){
        var defered = $q.defer();
        var param = {
            userApiKey: UserService.GetUser().userApikey,
            flagCode: UserService.GetUser().flagCode,
            page: 1
            // pageSize: 100
        };
        qmHttp.Post("alarms/queryAlarms.html", param, {tracker: true})
            .then(function (data) {
                // angular.forEach(data.alarmItem, function(item){
                //     item.LastTDate = "2000-01-01";
                //     alarms[item.alarmId] = item;
                // });
                // var _cache = $window.localStorage.getItem('LastAlarms');
                // if(false && _cache){
                //     _cache = JSON.parse(_cache);
                //     angular.forEach(alarms, function(item, id){
                //         item.LastTDate = _cache[id]?_cache[id].LastTDate:"2000-01-01";
                //     });
                // }
                defered.resolve(data);
            },function(error){
                defered.reject(error);
            });
        return defered.promise;
        // return qmHttp.Post("alarms/queryAlarms.html", param, {tracker: false})
        //     .then(function (data) {
        //         alarms = data.alarmItem;
        //     })
    }
    function createMarker(device, mapObj, isAlarm){
        var iconImage = device.NewAlarmCount?"img/jg-alarm.png":"img/jg-normal.png";
        device.marker = new AMap.Marker({
            position: device.position,//marker所在的位置
            map: mapObj, //创建时直接赋予map属性
            animation: device.NewAlarmCount?"AMAP_ANIMATION_DROP":"",
            visible: true,
            icon: new AMap.Icon({
                size: new AMap.Size(30, 30),  //图标大小
                image: iconImage,
                imageOffset: new AMap.Pixel(0, 0)
            })
            // clickable: true
            // label: {
            //     content: device.deviceName,
            //     offset: {
            //         top: 34,
            //         left: 0
            //     }
            // }
        });
    }
    var test = true;
    function CheckAlarms() {
        /*
        test =! test;
        IsAlarm = false;
        angular.forEach(alarms, function(item){
            if(item.active == 1){
                var device = _getDeviceById(item.deviceId);
                var sensor = _getSensorById(item.sensorId, device);
                var result = false;
                var alarmMessage = "";
                switch (item.alarmType){
                    case "switch_on": //开关On
                        result = (sensor.switcher == '1');
                        alarmMessage = "开关On";
                        break;
                    case "switch_off": //开关Off
                        result = (sensor.switcher != '1');
                        alarmMessage = "开关Off";
                        break;
                    case "offline_for_minutes": //超过item.duration分钟未连接
                        console.log("不支持的触发器");
                        break;
                    case "val_above": //数值高于item.heightValue
                        result = (parseFloat(sensor.value) > parseFloat(item.heightValue));
                        alarmMessage = "当前数值"+sensor.value+"高于"+item.heightValue;
                        break;
                    case "val_below": //数值低于item.belowValue
                        result = (parseFloat(sensor.value) < parseFloat(item.belowValue));
                        alarmMessage = "当前数值"+sensor.value+"低于"+item.belowValue;
                        break;
                    case "val_above_below": //数值低于item.belowValue 高于item.heightValue
                        result = (parseFloat(sensor.value) > parseFloat(item.heightValue))||(parseFloat(sensor.value) < parseFloat(item.belowValue));
                        alarmMessage = "当前数值"+sensor.value+"低于"+item.belowValue+"或高于"+item.heightValue;
                        break;
                    case "val_above_below_ofm": //数值低于item.belowValue 高于item.heightValue 未连接超过duration分钟
                        console.log("不支持的触发器");
                        break;
                    case "x_tir_y_rec": //数值低于item.belowValue 恢复 高于item.heightValue 报警
                        console.log("不支持的触发器");
                        break;
                    case "val_between": //数值在item.belowValue和item.heightValue之间
                        result = (parseFloat(sensor.value) > parseFloat(item.heightValue))&&(parseFloat(sensor.value) < parseFloat(item.belowValue));
                        result&&(alarmMessage = "当前数值"+sensor.value+"在"+item.belowValue+"和"+item.heightValue+"之间");
                        break;
                    case "val_above_bound": //数值超过item.heightValue 分钟超过duration
                        console.log("不支持的触发器");
                        break;
                    case "val_below_bound": //数值低于item.belowValue 分钟超过duration
                        console.log("不支持的触发器");
                        break;
                    case "offline": //未连接
                        result = !sensor.isLine;
                        alarmMessage = "未连接";
                        break;
                }
                device.isAlarm = result;
                device.isAlarm = test;
                if(result){
                    alarmMessage = device.deviceName + ":"+ sensor.sensorName+" "+alarmMessage;
                    console.log(alarmMessage);
                    device.aList.push({
                        item: item,
                        message: alarmMessage
                    })
                    IsAlarm = true;
                }
            }
        });
        $rootScope.$broadcast("IsAlarm", function(){
            return IsAlarm
        });
        return; */
        var page = 1;
        var StopFlag = false;
        // AlarmLastDate = new Date('2018-05-14 18:09:34');
        AlarmLastDate = new Date();
        var currentLastTime = angular.copy(AlarmLastDate);
        _checkOnePage();
        function _checkOnePage(){
            StopFlag = false;
            GetAlarmsHistory(page).then(function(){
                var arr = alarmsHistory[page];
                for(var i=arr.length-1;i>=0;i--){
                    var item = arr[i];
                    var cd = item.triggerDate;
                    if(cd > currentLastTime){//触发
                        AlarmLastDate = new Date(Math.max(cd.getTime(), AlarmLastDate.getTime()));
                        console.log(AlarmLastDate);
                        TriggerAlarm(item);
                        // UpdateLocalStorage();
                    }else{
                        StopFlag = true;
                    }
                }
                page++;
                StopFlag || _checkOnePage();
            })
        }
    }
    function TriggerAlarm(alarmItem){
        // console.log(alarmItem.triggerDate+ ":" +alarmItem.triggerContent);
        angular.forEach(deviceList, function(device){
            if(device.deviceId == alarmItem.deviceId){
                var flag = true;
                angular.forEach(device.aList, function(item){
                    if(item.id == alarmItem.id){
                        flag = false;
                        item.IsRead = alarmItem.IsRead;
                        alarmItem.IsTriggered = item.IsTriggered;
                        alarmItem = item;
                        return;
                    }
                });
                if(!alarmItem.IsRead){
                    flag&&(device.NewAlarmCount++);
                    device.isAlarm = true;
                    EventBus.Publish("seeAll");
                    AlarmDetailPopup(alarmItem);
                    if(!alarmItem.IsTriggered){
                        $rootScope.TotalAlarms.push(alarmItem);
                        createMarker(device, map, true);
                        scheduleSingleNotification();
                    }else{

                    }
                }
                flag && device.aList.push(alarmItem);
                return;
            }
        });

        function scheduleSingleNotification() {
            cordova.plugins.notification.local.schedule({
                id: alarmItem.id,
                title: $filter('date')(alarmItem.triggerDate, "HH:mm:ss")+alarmItem.deviceName,
                text: alarmItem.triggerContent,
                // at: new Date(),
                foreground: true,
                icon: "file://img/icon.png",
                data: {alarmItem: alarmItem}
            });
        };
    }
    function TestTriggerAlarm(){
        var device = deviceList[0];
        var alarmItem = angular.copy(alarmsHistory[1][0]);
        alarmItem.triggerDate = new Date();
        alarmItem.triggerContent = "设备："+device.deviceName+" 测试传感器数值异常";
        device.aList.push(alarmItem);
        device.NewAlarmCount++;
        device.isAlarm = true;
        EventBus.Publish("seeAll");
        $rootScope.TotalAlarms.push(alarmItem);
        createMarker(device, map, true);
        cordova.plugins.notification.local.schedule({
            id: alarmItem.id,
            title: $filter('date')(alarmItem.triggerDate, "HH:mm:ss")+alarmItem.deviceName,
            text: alarmItem.triggerContent,
            // at: new Date(),
            foreground: true,
            icon: "file://img/icon.png",
            data: {alarmItem: alarmItem}
        });
    }
    //监听点击事件
    cordova.plugins.notification.local.on('click', function (notification) {
        if(notification.data.alarmItem){
            AlarmDetailPopup(notification.data.alarmItem);
        }
    });
    function UpdateLocalStorage(){
        $window.localStorage.setItem('LastAlarms', JSON.stringify(alarms));
    }
    function GetAlarmsHistory(page){
        var defered = $q.defer();
        var param = {
            userApiKey: UserService.GetUser().userApikey,
            flagCode: UserService.GetUser().flagCode,
            page: page || 1
            // pageSize: 100
        };
        qmHttp.Post("alarms/queryAlarmsHistory.html", param, {tracker: false})
            .then(function (data) {
                var ReadAlarmHistoryIdList = $window.localStorage.getItem("ReadAlarmHistoryIdList");
                if(ReadAlarmHistoryIdList){
                    ReadAlarmHistoryIdList = JSON.parse(ReadAlarmHistoryIdList);
                    angular.forEach(data.result, function(item){
                        if(ReadAlarmHistoryIdList.indexOf(item.id)>-1){
                            item.IsRead = true;
                        }
                        item.triggerDate = new Date(item.triggerDate)
                    })
                }else{
                    angular.forEach(data.result, function(item){
                        item.triggerDate = new Date(item.triggerDate)
                    })
                }
                alarmsHistory[param.page] = data.result;
                defered.resolve(alarmsHistory);
            },function(error){
                defered.reject(error);
            });
        return defered.promise;
    }
    function _getDeviceById(deviceId){
        for(var i=0, len=deviceList.length;i < len;i++){
            if(deviceList[i].deviceId === deviceId){
                return deviceList[i];
            }
        }
        return {};
    }
    function _getSensorById(sensorId, device){
        if(!device.sensorList){return;}
        for(var i=0, len=device.sensorList.length;i < len;i++){
            if(device.sensorList[i].sensorId === sensorId){
                return device.sensorList[i];
            }
        }
        return {};
    }
    $rootScope.AlarmDetailPopup = AlarmDetailPopup;
    function IsAlarmListNotAllRead(){
        // console.log(000)
        for(var i=0;i<deviceList.length;i++){
            if(deviceList[i].isLine && deviceList[i].NewAlarmCount){
                return true;
            }
        }
        return false;
    };
    function AlarmDetailPopup(alarmItem){
        // 又一个精心制作的自定义弹窗
        $rootScope.CurAlarmItem = alarmItem;
        var buttons = [{ text: ' 关闭' }];
        if(!alarmItem.IsRead){
            buttons.push({
                    text: '<b>不再提醒</b>',
                    type: 'button-assertive',
                    onTap: function(e) {
                        if(!alarmItem.IsRead){
                            (_getDeviceById(alarmItem.deviceId).NewAlarmCount>0) && _getDeviceById(alarmItem.deviceId).NewAlarmCount--;
                            var ReadAlarmHistoryIdList = $window.localStorage.getItem("ReadAlarmHistoryIdList");
                            if(!ReadAlarmHistoryIdList){
                                ReadAlarmHistoryIdList = []
                            }else{
                                ReadAlarmHistoryIdList = JSON.parse(ReadAlarmHistoryIdList);
                            }
                            ReadAlarmHistoryIdList.push(alarmItem.id);
                            $window.localStorage.setItem("ReadAlarmHistoryIdList", JSON.stringify(ReadAlarmHistoryIdList));
                            angular.forEach($rootScope.TotalAlarms, function(item, index){
                                if(alarmItem.id == item.id){
                                    $rootScope.TotalAlarms.splice(index, 1);
                                    return;
                                }
                            });
                        }
                        alarmItem.IsRead = true;
                        return "NoRemind";
                    }
                })
        }
        var myPopup = $ionicPopup.show({
            templateUrl: 'app/common/alarmPopup.html',
            title: alarmItem.deviceName,
            subTitle: $filter('date')(alarmItem.triggerDate, "yyyy-MM-dd HH:mm:ss"),
            scope: $rootScope,
            buttons: buttons
        });
        myPopup.then(function(res) {
            console.log(res)
        });
    }

    return {
        IsAlarmListNotAllRead: IsAlarmListNotAllRead,
        AlarmDetailPopup: AlarmDetailPopup,
        SetDeviceList: function(list){
            angular.forEach(deviceList, function(device){
                angular.forEach(list, function(newDevice){
                    if(device.deviceNo === newDevice.deviceNo){
                        newDevice.distance = device.distance;
                    }
                })
            });
            deviceList = list;
        },
        GetDeviceList: function(){
            return deviceList
        },
        GetDeviceByNo: function(deviceNo, tracker){
            if(!deviceNo){
                $log.error("DeviceService.GetDeviceByNo方法，入参中：设备序号不能为空！");
                return;
            }
            tracker = tracker || false;
            var param = {
                userApiKey: UserService.GetUser().userApikey,
                flagCode: UserService.GetUser().flagCode,
                deviceNo: deviceNo
            };
            return qmHttp.Post("device/queryByDeviceNo.html", param, {tracker: tracker})
        },
        GetAlarms: GetAlarms,
        TestTriggerAlarm: TestTriggerAlarm,
        GetAlarmsHistory: GetAlarmsHistory,
        GetAlarmsHistoryCache: function(){
            return alarmsHistory;
        },
        StartTimer: function(mapObj){
            if(intervalObj){
                this.StopTimer();
            }
            var self = this;
            map = mapObj;
            GetAlarms().then(function(){
                    queryDevMoniData(true);
                })
            intervalObj = $interval(function(){
                queryDevMoniData();
            },config.DefaultTimescale);
            function queryDevMoniData(useTracker) {
                useTracker = !!useTracker;
                var param = {
                    userApiKey: UserService.GetUser().userApikey,
                    flagCode: UserService.GetUser().flagCode,
                    deviceNo: ""
                };
                qmHttp.Post("device/queryDevMoniData.html",param, {tracker: useTracker})
                    .then(function(data){
                        console.log(data);
                        _setTimestrap();
                        angular.forEach(data.deviceList, function(device, index){
                            device.isLine = !!device.sensorList[0].isLine;
                            device.position = [device.deviceLng, device.deviceLat];
                            device.distance = 0;
                            device.NewAlarmCount = 0;
                            device.aList=[];
                            angular.forEach(deviceList, function (oldDevice) {
                                if(oldDevice.deviceId == device.deviceId){
                                    device.distance = oldDevice.distance;
                                    device.aList=oldDevice.aList;
                                    device.NewAlarmCount=oldDevice.NewAlarmCount;
                                    return;
                                }
                            });
                            createMarker(device, mapObj);
                        });
                        self.SetDeviceList(data.deviceList);
                        CheckAlarms();
                        $rootScope.$broadcast("UpdateDeviceList",deviceList);
                        AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
                            angular.forEach(deviceList, function (device) {
                                device.openInfoWin = openInfoWin;
                                (function(device){AMap.event.addListener(device.marker, 'click', function() {
                                    console.log(11)
                                    openInfoWin(device);
                                });})(device)
                            });

                            function openInfoWin(device) {
                                var num = device.NewAlarmCount;
                                var infoWindow = new SimpleInfoWindow({
                                    infoTitle: '<strong>'+device.deviceName+'</strong>',
                                    infoBody: '<p class="my-desc"><strong>'+device.deviceNo+'</strong> <br/>' +
                                    ((num)?'<strong style="color:red">'+num+'条报警记录</strong> <br/>':'') +
                                    '<a href="#/main/deviceDetail?deviceNo='+device.deviceNo+'&deviceName='+device.deviceName+'&openAlarm=true">详情>></a></p>',
                                    //基点指向marker的头部位置
                                    offset: new AMap.Pixel(0, -31)
                                });
                                infoWindow.open(mapObj, device.marker.getPosition());
                            }
                        });

                    })
            }
        },
        StopTimer: function () {
            $interval.cancel(intervalObj);
            intervalObj = undefined;
        },
        RestartTimer: function () {
            this.StopTimer();
            this.StartTimer();
        },
        GetLastDate: function () {
            return timestrap;
        },
        GetDistanceInfo: function (deviceNo) {
            return deviceDistanceMap[deviceNo]
        },
        SetDistanceInfo: function (deviceNo, distance) {
            if(angular.isDefined(distance)){
                deviceDistanceMap[deviceNo] = distance
            }
        },
        ControlSwitchValue: function (deviceNo, sensorId, value, tracker) {
            var defer = $q.defer();
            var param = {
                userApiKey: UserService.GetUser().userApikey,
                flagCode: UserService.GetUser().flagCode,
                deviceNo: deviceNo,
                sensorId: sensorId,
                value: value,
                sign: UserService.GetSign()
            };
            qmHttp.Post("device/controlSwitchValue.html", param, {tracker: !!tracker})
                .then(function (data) {
                    console.log(data);
                    defer.resolve(data);
                },function(error){
                    defer.reject(error);
                });
            return defer.promise;
        },
        /**
         * 根据设备序列号查询传感器最新一条监控数据
         * @param deviceNo
         * @returns {promise|{then, catch, finally}|*}
         */
        queryLastDtByDevNo: function(deviceNo){
            var params = {
                deviceNo: deviceNo,
                userApiKey: UserService.GetUserUserApiKey(),
                flagCode: UserService.GetUserFlagCode()
            }
            return qmHttp.Post("device/queryLastDtByDevNo.html", params, {tracker: true})
        },
        UpdateDevice: function(device, props){
            var params = {
                deviceNo: device.deviceNo,
                deviceId: device.deviceId,
                // deviceName: "测试修改接口1",
                userApiKey: UserService.GetUserUserApiKey(),
                flagCode: UserService.GetUserFlagCode(),
                sign: UserService.GetSign()
            };
            angular.extend(params, props);
            return qmHttp.Post("device/updateDevice.html", params, {tracker: true})
        },

    }
})