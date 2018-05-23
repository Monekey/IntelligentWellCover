/**
 * Created by cuiqimeng on 2018/5/11.
 */
angular.module("app")
    .service('UpdateService', function($rootScope, $timeout, $http, $ionicPopup, $ionicLoading, config, qmHttp, $cordovaToast){
        $rootScope.AppInfo = {};
        function _CheckUpdate(flag) {
            //自动更新开始
            var myurl = config.UPDATE_BASEURL + 'getVersion';
            qmHttp.Get(myurl, {}, {tracker: true})
                .then(function(data){
                    $rootScope.AppInfo = data;
                    checkUpdate();
                });
            // Android升级
            function checkUpdate() {
                document.addEventListener("deviceready", function () {
                    //获取网络的信息是通过cordova的插件来实现的  你也可以把他写到服务里面
                    var type = navigator.connection.type;
                    var AppVersionCode =$rootScope.AppInfo.version;// 获取的服务器版本
                    //获取本地APP版本
                    //cordova.getAppVersion.getVersionNumber().then(function (}）是固定写法   看一查阅github的api
                    cordova.getAppVersion.getVersionNumber().then(function (version) {
                        // 0.0.1 => 00001 => 1
                        //将版本号转化成固定的格式  我们要避免使用.这样的符号
                        $timeout(function(){
                            $rootScope.CurrentVersion = version;
                        });
                        //转换过后的本地版本号nowVersionNum
                        var nowVersionNum = parseInt(version.toString().replace(new RegExp(/(\.)/g), '0'));
                        // 10000
                        //newVersionNum获取的服务器版本
                        var newVersionNum = parseInt(AppVersionCode);
                        if (newVersionNum > nowVersionNum) {
                            //判断网络信息我们去执行相应的操作，这里操作简单我就不做注解了
                            if (type === 'wifi') {
                                $ionicPopup.confirm({
                                    title: '发现新版本'+ $rootScope.AppInfo.path + ",大小："+($rootScope.AppInfo.size/1024/1024).toFixed(2) + "M",
                                    template: '<div><p ng-repeat="updateInfo in AppInfo.updateList">{{updateInfo}}</p></div>',
                                    cancelText: '取消',
                                    okText: '升级'
                                }).then(function (res) {
                                    if (res) {
                                        CheckPermissionAndDownload()
                                    }
                                });
                            } else {
                                $ionicPopup.confirm({
                                    title: '发现新版本'+ $rootScope.AppInfo.path + ",大小："+($rootScope.AppInfo.size/1024/1024).toFixed(2) + "M。建议您在WIFI条件下进行升级",
                                    template: '<div><p ng-repeat="updateInfo in AppInfo.updateList">{{updateInfo}}</p></div>',
                                    cancelText: '取消',
                                    okText: '升级'
                                }).then(function (res) {
                                    if (res) {
                                        CheckPermissionAndDownload()
                                    }
                                });
                            }
                        }else if(flag == "popup"){
                            $cordovaToast.show("已经是最新版本", 'short', 'bottom');
                        }
                    });
                }, false);
            }

            //这个方法就是核心方法了    让你能实现版本的更新

            function UpdateForAndroid() {
                var source = config.UPDATE_BASEURL + "app.apk"; // 下载地址
                var target = "/sdcard/app.apk";
                var trustAllHosts = true;
                var options = {};
                //FileTransfer这个类是cordova插件的方法，要使用文件下载new一个FileTransfer对象调用他的方法就好了
                var fileTransfer = new FileTransfer();

                /**这是官方给出的api 参数的解释  因为比较好懂这里需要注意下的是trustAllHosts参数

                 *trustAllHosts这个参数决定了 你能否下载当trustAllHosts=false时你的下载的链接必须有安全凭证，

                 * trustAllHosts=true的时候 你可以跳过安全凭证

                 * Downloads a file form a given URL and saves it to the specified directory.

                 * @param source {String}          URL of the server to receive the file

                 * @param target {String}         Full path of the file on the device

                 * @param successCallback (Function}  Callback to be invoked when upload has completed

                 * @param errorCallback {Function}    Callback to be invoked upon error

                 * @param trustAllHosts {Boolean} Optional trust all hosts (e.g. for self-signed certs), defaults to false

                 * @param options {FileDownloadOptions} Optional parameters such as headers

                 */

                function successCallback(entry){
//   当下载成以后同过这个cordova方法你将打开你下载的最新app 固定格式 不做讲解 如果想知道cordova.plugins.fileOpener2插件的其他用法，可以看官方给的api

                    cordova.plugins.fileOpener2.open(

                        target,

                        'application/vnd.android.package-archive'

                    );

                    $ionicLoading.hide();

                }

                function errorCallback(error){

                    //当apk下载失败做的操作
                    alert(JSON.stringify(error));
                    $ionicLoading.show({

                        template: "下载失败， 原因：" + JSON.stringify(error)

                    });

                    $timeout(function () {

                        $ionicLoading.hide()

                    }, 2000);

                }


                //onprogress 是fileTransfer的属性   他是通过回调函数来更新下载进度的

                fileTransfer.onprogress = function(progressEvent) {
                    // if (progressEvent.lengthComputable) {

                        $ionicLoading.show({

                            template: "已经下载：" +Math.floor((progressEvent.loaded / $rootScope.AppInfo.size)*100) + "%"

                        });

                    }

                //这个方法就是执行下载apk的方法 参数一定要写对 上面有对应的参数 自行查看 就不做讲解了
                fileTransfer.download(source, target, successCallback, errorCallback, trustAllHosts, options);

            }
            //自动更结束

            function CheckPermissionAndDownload() {
                //检查权限
                var permissions = cordova.plugins.permissions;
                permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, checkPermissionCallback, null);


                function checkPermissionCallback(status) {
                    if (!status.hasPermission) {
                        var errorCallback = function() {
                            alert('Storage permission is not turned on');
                        }
                        permissions.requestPermission(
                            permissions.READ_EXTERNAL_STORAGE,
                            function(status) {
                                if (!status.hasPermission) {
                                    errorCallback();
                                } else {
                                    // continue with downloading/ Accessing operation
                                    UpdateForAndroid();
                                }
                            },
                            errorCallback);
                    }else{
                        UpdateForAndroid();
                    }
                }
            }
        }

        return{
            CheckUpdate: _CheckUpdate
        }
    });