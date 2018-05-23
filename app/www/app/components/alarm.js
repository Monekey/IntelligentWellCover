/**
 * Created by cuiqimeng on 2018/5/18.
 */
angular.module('app')
    .controller('alarmCtrl', function($scope, DeviceService, $state){
        $scope.state = $state;
        $scope.loadMore = function(){
            $scope.curPage++;
            /*
             DeviceService.GetAlarmsHistory($scope.curPage).then(function(alarmsHistory){
             if(!alarmsHistory[$scope.curPage].length){
             $scope.moredata = false;
             return;
             }
             angular.forEach(alarmsHistory[$scope.curPage], function(item){
             $scope.list.push(item)
             });
             $scope.$broadcast('scroll.infiniteScrollComplete');
             })
             */
            if(!$scope.alarmsHistory[$scope.curPage]){
                $scope.moredata = false;
                return;
            }
            angular.forEach($scope.alarmsHistory[$scope.curPage], function(item){
                $scope.list.push(item);
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
        init();
        function init() {
            $scope.list = [];
            $scope.curPage = 0;
            $scope.moredata = true;
            $scope.alarmsHistory = DeviceService.GetAlarmsHistoryCache();
            $scope.loadMore();
        }

        $scope.doRefresh = function(){
            init();
            $scope.$broadcast('scroll.refreshComplete');
        };
    });