var http = require('http');
var fs=require('fs');
var path = require('path');
var server = http.createServer(function (req, res) {
    var url_info = require('url').parse(req.url, true);
    //检查是不是给/test的request
	console.log(url_info)
    if(url_info.pathname === '/getVersion'){
		var file="version.json";
		var result=JSON.parse(fs.readFileSync(file));
		var currDir = path.normalize(result.path),
        fileName = 'app-debug.apk',
        currFile = path.join(currDir,fileName)
		fs.stat(currFile, function (err, stats) {
			result.size = stats.size;  
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(result));			
		})		
    }
    //这个是用来回复上面那个post的，显示post的数据以表示成功了。你要是有别的目标，自然不需要这一段。
    else if(url_info.pathname === '/app.apk'){
		var file="version.json";
		var result=JSON.parse(fs.readFileSync(file));
		console.log(result)
         var currDir = path.normalize(result.path),
        fileName = url_info.query.name || 'app-debug.apk',
        currFile = path.join(currDir,fileName),
        fReadStream;

    fs.exists(currFile,function(exist) {
        if(exist){
			/*
            res.set({
                "Content-type":"application/octet-stream",
                "Content-Disposition":"attachment;filename="+encodeURI(fileName)
            });*/
            fReadStream = fs.createReadStream(currFile);
            fReadStream.on("data",(chunk) => res.write(chunk,"binary"));
            fReadStream.on("end",function () {
                res.end();
            });
        }else{
			res.writeHead(200, {"Content-type":"application/octet-stream",
                "Content-Disposition":"attachment;filename=jg.apk"});
            //res.set("Content-type","text/html");
            res.send("file not exist!");
            res.end();
        }
    });
    }
}).listen(8887, function() {
   console.log('listening on port  8887');
});;
