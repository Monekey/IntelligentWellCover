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
            OperateType: 1,
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
                        _setTimestrap();
                        angular.forEach(data.deviceList, function(device, index){
                            device.isLine = !!device.sensorList[0].isLine;
                            device.position = [device.deviceLng, device.deviceLat];
                            createMarker(device, mapObj);
                            device.distance = 0;
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