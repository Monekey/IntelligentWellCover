/**
 * Created by 崔启蒙 on 2018/4/27.
 */
angular.module("app")
.filter('ImgUrlFixed', function(config){
    return function(url){
        if(url.indexOf("https://")>-1 || url.indexOf("http://")>-1){
            return url
        }
        return config.CONPANYURL + url;
    }
})
.filter('distanceNum', function(config, $filter){
    return function(m){
        if(!m){
            return '正在计算距离'
        }
        if(m>0 && m<1000){
            return $filter('number')(m, 0) + '米';
        }
        if(m>=1000 && m < (1000*1000)){
            return $filter('number')(m/1000, 2) + '千米';
        }
        if(m>(1000*1000)){
            return $filter('number')(m/1000, 2) + '千米';
        }
    }
});