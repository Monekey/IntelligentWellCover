/**
 * Created by 崔启蒙 on 2018/4/18.
 */
angular.module('app')
    .constant('DefaultConfig', {
        BASEURL: "https://api.dtuip.com/qy/",
        UPDATE_BASEURL: "http://hsxudong.cn:8887/",
        CONPANYURL: "http://iot.hsxudong.cn",
        isTestApi: false,
        NativeWatchPosition: true, //随意
        DefaultTimescale: 20000, //20000
        VisibleMeter: 20, //20
        VisibleMeter_Valid: false, //true
        INTERVAL_TIME: 2000
    })
    .value('config', {
        BASEURL: "https://api.dtuip.com/qy/",
        UPDATE_BASEURL: "http://hsxudong.cn:8887/",
        CONPANYURL: "http://iot.hsxudong.cn",
        isTestApi: false,
        NativeWatchPosition: true, //随意
        DefaultTimescale: 20000, //20000
        VisibleMeter: 20, //20
        VisibleMeter_Valid: false, //true
        ShowVConsole: false,
        INTERVAL_TIME: 2000,//上升下降操作，下发数据的间隔
        上升下降每次发送三个接口: false,
        SingleMode: true
    });