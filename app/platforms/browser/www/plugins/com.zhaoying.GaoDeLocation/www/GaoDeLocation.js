cordova.define("com.zhaoying.GaoDeLocation.GaoDe", function(require, exports, module) { var exec = require('cordova/exec');

var GaoDe = {
    getCurrentPosition:function (successFn,errorFn) {
        exec(successFn,errorFn,'GaoDeLocation','getCurrentPosition',[]);
    }
};

module.exports = GaoDe;

});
