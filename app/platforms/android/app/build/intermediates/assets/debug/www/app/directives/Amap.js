/**
 * Created by 崔启蒙 on 2018/4/19.
 */
angular.module("app")
    .directive("aMap", function($interval, qmHttp, UserService, Widget, DeviceService, $cordovaToast, EventBus, $state, config){
        return {
            restrict: "AE",
            template: "<div id='AMAP_CONTENT' class='AMap-content'></div>" +
            "<div class='map-icon-bar'>" +
            "<i class='iconfont icon-browse font-bold' ng-click='seeAll()'></i>" +
            "<i class='iconfont icon-baojing alarm-normal' ng-class='{\"alarm-color\": true}' ng-click='panToLocation()'></i>" +
            "</div>"+
            "<div class='map-icon-location' ng-click='panToLocation()'>" +
            // "<i class='iconfont' ng-class='{\"icon-dingwei3\": CenterChanged, \"icon-dingwei1 Rotation\": !CenterChanged}' ng-click='panToLocation()'></i>" +
            "<i ng-show='CenterChanged' class='iconfont icon-dingwei3'></i>" +
            "<ion-spinner ng-hide='CenterChanged' icon=\"ripple\" class=\"spinner-assertive\"></ion-spinner>" +
            "</div>",
            scope: {},
            link: function(scope, ele, attr){
                var intervalObj = null, watched = null;
                var currLocation={};
                var domID = "AMAP_CONTENT";
                var _firstLoading = true;
                scope.vm = {};
                // getDeviceData();
                var mapObj = new AMap.Map(domID, {
                    showBuildingBlock: true,
                    zoom: 10,
                    viewMode: '3D'
                });
                //拖动改变定位按钮状态
                AMap.event.addListener(mapObj, 'dragend', function(event){
                    scope.$apply(CenterPositionChanged)
                });
                scope.CenterChanged = false;//初值为false表示第一次加载完成会自动定位到中心
                scope.getCenterChanged = function(){
                    return scope.CenterChanged;
                };
                function CenterPositionChanged(){
                    if(scope.CenterChanged === true){
                        return;
                    }
                    scope.CenterChanged = true;
                    console.log( scope.CenterChanged )
                }
                function CenterPositionTracked(){
                    if(scope.CenterChanged === false){
                        return;
                    }
                    scope.CenterChanged = false;
                }

                function panTo(device){
                    mapObj.panTo(device.position);
                    CenterPositionChanged();
                }
                EventBus.Subscribe('PANTO', panTo);
                EventBus.Subscribe('GetDistance', GetDistance);
                DeviceService.StartTimer(mapObj);
                DeviceService.GetAlarms();
                // EventBus.Subscribe('getDeviceData', getDeviceData);
                EventBus.Subscribe('panToLocation', panToLocation);
                //也可以在创建完成后通过setMap方法执行地图对象
                // marker.setMap(mapObj);
                var Circle = new AMap.Circle({
                    map: mapObj,
                    // center: e.position,
                    radius: config.VisibleMeter,
                    strokeOpacity: 0
                });
                mapObj.plugin(["AMap.ToolBar"],function(){
                    //加载工具条
                    var tool = new AMap.ToolBar();
                    mapObj.addControl(tool);
                });
                mapObj.plugin('AMap.Geolocation', function () {
                    var GeoConfig = {
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10,          //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: false,        //显示定位按钮，默认：true
                        // buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                        // buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                        // markerOptions: true,
                        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy:false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    }
                    var geolocation = new AMap.Geolocation(GeoConfig);
                    mapObj.addControl(geolocation);
                    setTimeout(function(){
                        geolocation.getCurrentPosition();
                    });
                    if(config.NativeWatchPosition){
                        watched = geolocation.watchPosition();
                    }else{
                        intervalObj = $interval(function(){
                            geolocation.getCurrentPosition();
                        }, 1000);
                    }
                    scope.panToLocation = function(){
                        ZoomAndPanToLocation();
                        geolocation.getCurrentPosition();
                        if(config.NativeWatchPosition){
                            geolocation.clearWatch(watched);
                            watched = geolocation.watchPosition();
                        }else{
                            $interval.cancel(intervalObj);
                            intervalObj = $interval(function(){
                                geolocation.getCurrentPosition();
                            }, 1000);
                        }

                    };
                    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
                    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息

                });
                function onComplete(e) {
                    currLocation=e;
                    Circle.setCenter(e.position)
                    console.log(e)

                    if(scope.CenterChanged === false){
                        if(_firstLoading){
                            _firstLoading=false;
                            ZoomAndPanToLocation();
                        }else{
                            panToLocation();
                        }
                    }
                    reloadDeviceList(e.position);
                }
                function onError(e) {
                    $cordovaToast.showShortTop('定位失败，请确保打开定位并保持网络通畅');
                    console.log(e)
                }

                scope.$on("UpdateDeviceList", function(){
                    console.log(11)
                    currLocation.position&&reloadDeviceList(currLocation.position);
                });
                function reloadDeviceList(p){
                    angular.forEach(DeviceService.GetDeviceList(), function(device){
                        // if(!device || !device.position){return;}
                        var distance = AMap.GeometryUtil.distance([p.lng, p.lat], device.position);
                        // DeviceService.SetDistanceInfo(device.deviceNo, distance);
                        device.distance = distance;
                        if(config.VisibleMeter_Valid){
                            (distance<=config.VisibleMeter)?device.marker.show():device.marker.hide();
                        }else{
                            device.marker.show()
                        }
                    })
                }
                function GetDistance(device) {
                    if(!currLocation.position){return}
                    var p = currLocation.position;
                    device.distance = AMap.GeometryUtil.distance([p.lng, p.lat], device.position);
                }

                function panToLocation() {
                    mapObj.panTo(currLocation.position);
                }
                function ZoomAndPanToLocation(){
                    mapObj.panTo(currLocation.position);
                    mapObj.setZoom(16);
                    CenterPositionTracked();
                }
                scope.seeAll=function(){
                    var newCenter = mapObj.setFitView();
                    CenterPositionChanged();
                };

                scope.$on('$destroy', function(){
                    $interval.cancel(intervalObj);
                })
            }
        }
    })