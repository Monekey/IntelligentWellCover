/**
 * Created by cuiqimeng on 2018/5/18.
 */
angular.module("app")
    .directive("backToTop", function(){
        return {
            restrict: "AE",
            templateUrl: "app/directives/BackToTop.html",
            scope: {},
            link: function(scope, ele, attr){

            }
        }
    })