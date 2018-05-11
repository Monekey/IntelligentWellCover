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
    .constant("SensorNameDict", {
        井盖升起 : {

        }
    })
.service('DeviceService', function(qmHttp, UserService, $rootScope, $interval, config, $log, EventBus, OperateSensorNameList){
    var deviceList = [];
    var deviceDistanceMap = {};
    var intervalObj = undefined;
    var timestrap = undefined;
    var alarms;
    function _setTimestrap() {
        timestrap = new Date();
    }
    function GetAlarms(){
        var param = {
            userApiKey: UserService.GetUser().userApikey,
            flagCode: UserService.GetUser().flagCode,
            page: 1
        };
        qmHttp.Post("alarms/queryAlarmsHistory.html", param, {tracker: false})
            .then(function (data) {
                // alarms = data.alarmItem;
            })
        return qmHttp.Post("alarms/queryAlarms.html", param, {tracker: false})
            .then(function (data) {
                alarms = data.alarmItem;
            })
    }
    function createMarker(device, mapObj){
        device.marker = new AMap.Marker({
            position: device.position,//marker所在的位置
            map: mapObj, //创建时直接赋予map属性
            animation: "AMAP_ANIMATION_DROP",
            visible: true,
            icon: new AMap.Icon({
                size: new AMap.Size(30, 30),  //图标大小
                image: "img/jg-normal.png",
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
    return {
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
        StartTimer: function(mapObj){
            if(intervalObj){
                this.StopTimer();
            }
            var self = this;
            queryDevMoniData(true);
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
                        var arr = [];
                        // for(var i=0;i<125;i++){
                        //     angular.forEach(data.deviceList, function(item){
                        //         arr.push(item);
                        //     })
                        // }
                        // self.SetDeviceList(data.deviceList);
                        _setTimestrap();
                        angular.forEach(data.deviceList, function(device, index){
                            // device.deviceNo&&
                            // self.GetDeviceByNo(device.deviceNo).then(function(data){
                            device.position = [device.deviceLng, device.deviceLat];
                            createMarker(device, mapObj);
                            device.distance = 0;
                            // })
                        });
                        self.SetDeviceList(data.deviceList);
                        $rootScope.$broadcast("UpdateDeviceList",data.deviceList);
                        AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
                            angular.forEach(deviceList, function (device) {
                                (function(device){AMap.event.addListener(device.marker, 'click', function() {
                                    console.log(11)
                                    openInfoWin(device);
                                });})(device)
                            });

                            function openInfoWin(device) {
                                var infoWindow = new SimpleInfoWindow({
                                    infoTitle: '<strong>'+device.deviceName+'</strong>',
                                    infoBody: '<p class="my-desc"><strong>'+device.deviceNo+'</strong> <br/>' +
                                    '<a href="#/main/deviceDetail?deviceNo='+device.deviceNo+'">详情>></a></p>',
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
        ControlSwitchValue: function (deviceNo, sensorId, value) {
            var param = {
                userApiKey: UserService.GetUser().userApikey,
                flagCode: UserService.GetUser().flagCode,
                deviceNo: deviceNo,
                sensorId: sensorId,
                value: value,
                sign: UserService.GetSign()
            };
            return qmHttp.Post("device/controlSwitchValue.html", param, {tracker: false})
                .then(function (data) {
                    console.log(data)
                })
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

    }
})