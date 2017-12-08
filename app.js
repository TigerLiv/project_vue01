var express = require("express");
var formidable = require("formidable");
var fs = require("fs");
var url = require("url");
var app = express();

app.use(express.static("www"));
app.get("/getall", function(req, res) {
	fs.readFile("./data/data.json",function(err, data){
		var arr = JSON.parse(data.toString()).mapList;
//		console.log(arr);
		res.json(arr);
	})
});
app.patch("/change", function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		fs.readFile("./data/data.json",function(err, data){
			var arr = JSON.parse(data.toString()).mapList;
			arr.forEach(function(item){
				if(fields.id == item.id){
					item.contents = fields.contents;
				}
			})
			fs.writeFile("./data/data.json", JSON.stringify({mapList : arr}), function(data){
				res.json(arr);
			})
		})
	})
});
app.delete("/del", function(req,res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		console.log(fields);
		fs.readFile("./data/data.json", function(err,data){
			var arr = JSON.parse(data.toString()).mapList;
			arr.forEach(function(item){
				if(fields.id== item.id){
					item.contents.splice(fields.n, 1);
				}
			})
			fs.writeFile("./data/data.json", JSON.stringify({mapList : arr}), function(data){
				res.json(arr);
			})
		})
	})
});
app.post("/add", function(req,res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
//		console.log(fields);
		fs.readFile("./data/data.json", function(err,data){
			var arr = JSON.parse(data.toString()).mapList;
			arr.forEach(function(item){
				if(fields.id == item.id){
					item.contents.push(fields.content)
				}
			})
			fs.writeFile("./data/data.json", JSON.stringify({mapList : arr}), function(data){
				res.json(arr);
			})
		})
	})
});
//日历
function buling(n) {
    return n.toString().length > 1 ? n.toString() : "0" + n.toString()
}

app.get("/getallwork", function(req, res) {
    var year = url.parse(req.url, true).query.year;
    var month = url.parse(req.url, true).query.month;


    // 如果本月是1月 那么上一个月就是上一年的12月 否则就是本月减1
    var pmonth = month == 1 ? 12 : month - 1;
    var nmonth = month == 12 ? 1 : month + 1;
    // 如果本月是1月 上一年就是当前年减1  否则就是当前年 
    var pyear = month == 1 ? year - 1 : year;
    var nyear = month == 12 ? year + 1 : year;
    fs.readFile("./data/work.json", function(err, data) {
        var arr = JSON.parse(data.toString()).mapList;
        arr = arr.filter((item)=>{
            return item.start.substr(0,6) == `${year}${buling(month)}`||
                   item.end.substr(0,6) == `${year}${buling(month)}`||
                   item.start.substr(0,6) == `${pyear}${buling(pmonth)}`||
                    item.end.substr(0,6) == `${pyear}${buling(pmonth)}`||
                    item.start.substr(0,6) == `${nyear}${buling(nmonth)}`||
                    item.end.substr(0,6) == `${nyear}${buling(nmonth)}`
        })
        arr.sort(function(a, b) {
            return (new Date(a.start.substr(0, 4), a.start.substr(4, 2) - 1, a.start.substr(6, 2)) - new Date(b.start.substr(0, 4), b.start.substr(4, 2) - 1, b.start.substr(6, 2))) > 0
        });
        res.json(arr)
    })
});
app.delete("/delwork", function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        fs.readFile("./data/work.json", function(err, data) {
            var arr = JSON.parse(data.toString()).mapList;
            arr = arr.filter(function(item) {
                return item.id != fields.id
            })
            fs.writeFile("./data/work.json", JSON.stringify({ mapList: arr }), function(data) {
                res.json(arr)
            })
        })
    })
})
app.post("/addwork", function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        fs.readFile("./data/work.json", function(err, data) {
            var arr = JSON.parse(data.toString()).mapList;
            arr.push(fields)
            fs.writeFile("./data/work.json", JSON.stringify({ mapList: arr }), function(data) {
                arr.sort(function(a, b) {
                    return (new Date(a.start.substr(0, 4), a.start.substr(4, 2) - 1, a.start.substr(6, 2)) - new Date(b.start.substr(0, 4), b.start.substr(4, 2) - 1, b.start.substr(6, 2))) > 0
                });
                res.json(arr)
            })
        })
    })
});
app.patch("/changework", function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        fs.readFile("./data/work.json", function(err, data) {
            var arr = JSON.parse(data.toString()).mapList;
            arr.forEach(function(item) {
                if (fields.id == item.id) {
                    item.title = fields.title || item.title 
                    item.start = fields.start
                    item.end = fields.end
                    item.type = fields.type || item.type
                }
            });
            fs.writeFile("./data/work.json", JSON.stringify({ mapList: arr }), function(data) {
                arr.sort(function(a, b) {
                    return (new Date(a.start.substr(0, 4), a.start.substr(4, 2) - 1, a.start.substr(6, 2)) - new Date(b.start.substr(0, 4), b.start.substr(4, 2) - 1, b.start.substr(6, 2))) > 0
                });
                res.json(arr)
            })
        })
    })
})
app.listen(3000,function(){
	console.log(3000);
})