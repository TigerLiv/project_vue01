<style scoped lang='stylus'>
.content {
    width: 1000px;

    position: relative;
}

.calendar table,
.calendar tr,
.calendar td,
.calendar th {
    border: 1px solid #333;
    border-collapse: collapse;
}

.calendar table {
    width: 1000px;
}

.calendar table tbody td {
    height: 100px;
    vertical-align: top;
    text-align: right;
    padding: 5px 5px 0 0;
}

.calendar table tbody td.cur {
    color: #eeeeee;
}

.schedule {
    position: absolute;
    top: 22px;
    left: 0px;
}

.schedule .box {
    height: 100px;
}

.schedule .box table {
    width: 1000px;
    position: relative;
    top: 25px;
}

.schedule .box table tr td div {

    margin: 1px 0;
}
.schedule .box table tr td div.life{
    background: #99cc33;
}
.schedule .box table tr td div.work{
    background: #99ccff;
    color: #fff;
}
.bgCur{
    background: pink;
}
table.gridtable {
    font-family: verdana,arial,sans-serif;
    font-size:13px;
    color:#333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
}
table.gridtable th {
    border-width: 1px;
    padding: 0px;
    font-size: 16px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
    text-align: center;
}
table.gridtable td {
    border-width: 1px;
    padding: 0px;
    font-size: 14px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
}
</style>
<template>
	<div>
		<div class="content">
            <div class="calendar">
                <table class="gridtable">
                    <thead>
                        <th>周日</th>
                        <th>周一</th>
                        <th>周二</th>
                        <th>周三</th>
                        <th>周四</th>
                        <th>周五</th>
                        <th>周六</th>
                    </thead>
                    <tbody>
                        <tr v-for=" (item,index) in calendar.length / 7">
                            <td v-for="child in 7" :class="{cur :calendar[index * 7 + (child - 1)].cur}" :data-day="calendar[index * 7 + (child - 1)].fullday">{{calendar[index * 7 + (child - 1)].fullday}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="schedule">
                <div class="box" v-for="item in schedule">
                    <table >
                        <tr v-for="child in item" >
                            <td v-for="td in child" :colspan="td.colspan" :style="{width: 1000 / 7 * td.colspan + 'px'}">
                                <div v-if="td.title" @dblclick="showTools(td)" :class="[td.type]" class="draggable" :data-id="td.id">{{td.title}}</div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
  props:["date","calSetting"],
  data(){
   return{

   }
},
computed:{
   calendar() {
    var arr = []
    var nowMonthLength = new Date(this.date.year, this.date.month, 0).getDate();
                // console.log("本月一共有"+nowMonthLength+"天");
                var nowMonthFirstWeek = new Date(this.date.year, this.date.month - 1).getDay();
                // console.log("本月第一天星期" + nowMonthFirstWeek);
                var lastMonthLength = new Date(this.date.year, this.date.month - 1, 0).getDate();
                // console.log("上个月一共" + lastMonthLength+"天");

                // 如果本月是1月 那么上一个月就是上一年的12月 否则就是本月减1
                var pmonth = this.date.month == 1 ? 12 : this.date.month - 1;
                var nmonth = this.date.month == 12 ? 1 : this.date.month + 1;
                // 如果本月是1月 上一年就是当前年减1  否则就是当前年 
                var pyear = this.date.month == 1 ? this.date.year - 1 : this.date.year;
                var nyear = this.date.month == 12 ? this.date.year + 1 : this.date.year;

                //因为 日期的fullday 不一定都是8位的 比如：201711 这就是6位
                // 20171231 这就是8位 所以要补零
                
                //上一周在本月留了几天  
                // 添加fullday 是因为 没有一个 变量携带具体的年月日，导致我们无法判断 具体的年月日
                while (nowMonthFirstWeek--) {
                    arr.unshift({
                        day: lastMonthLength,
                        cur: true,
                        fullday: `${pyear}${buling(pmonth)}${buling(lastMonthLength)}`
                    });
                    // while 语句里面的变量不能减两次，所以要先用再减
                    lastMonthLength--;
                }
                // 当天月的天数
                var _a = 1;
                while (nowMonthLength--) {
                    arr.push({
                        day: _a,
                        cur: false,
                        fullday: `${this.date.year}${buling(this.date.month)}${buling(_a)}`
                    });
                    _a++;
                }
                // 返回下一个月在本月 遗留的天数
                // 如果arr的长度大于35 本月就有42天 - 当前数组的长度 就是下个月在本月留的天数
                var nextMonth = arr.length > 35 ? 42 - arr.length : 35 - arr.length;
                // 让剩余的天数 去自减
                _a = 1;
                while (nextMonth--) {
                    arr.push({
                        day: _a,
                        cur: true,
                        fullday: `${nyear}${buling(nmonth)}${buling(_a)}`
                    });
                    _a++;
                }

                return arr
            },
            schedule() {
                var vm = this;
                var arr = []
                // 第一层循环是看本月有多少周 this.calendar.length / 7 
                for (var i = 0; i < this.calendar.length / 7; i++) {
                    arr.push([]);
                    // 第二层 每层有 3个 tr
                    for (var j = 0; j < 3; j++) {
                        arr[i].push([]);
                        // 第三层 每一层tr里面有 默认的 7个 td
                        for (var k = 0; k < 7; k++) {
                            // 给默认的td写一些参数
                            arr[i][j].push({
                                colspan: 1, //默认的colspan
                                fullday: this.calendar[i * 7 + k].fullday, //添加fullday 是为了 和 日期里面fullday 去比较 
                                xingqi: k //添加一个星期  为了跨周 时计算 第一周的 持续天数
                            });
                        }
                    }
                }
                // 1.开始遍历 持久化数据
                this.$store.state.data.morenshuju.forEach(function(item) {
                    if(vm.calendar[0].fullday > item.start){
                        item.start = vm.calendar[0].fullday
                    }
                    var end = new Date(item.end.toString().substr(0, 4), item.end.toString().substr(4, 2) - 1, item.end.toString().substr(6, 2));
                    var start = new Date(item.start.toString().substr(0, 4), item.start.toString().substr(4, 2) - 1, item.start.toString().substr(6, 2));
                    var during = (end - start) / 1000 / 60 / 60 / 24 + 1;
                    if(during < 0) return;
                    // 10.打一个断点
                    var flag = true;
                    // 2.遍历 当前数组
                    arr.forEach(function(week, weekidx) {
                        // 3.遍历事件的tr
                        for (var i = 0; i < 3; i++) {
                            // 4.遍历事件的td
                            for (var j = 0; j < 7; j++) {
                                if (week[i][j]) {
                                    // 5.如果td里面的fullday == 持久化数据里面的开始日期的话
                                    if (week[i][j].fullday == item.start && flag && !week[i][j].title) {
                                        //6.得到第一周 的持续天数 
                                        var nowWeekDuring = during + week[i][j].xingqi <= 7 ? during : 7 - week[i][j].xingqi
                                        // 7.给他们写上title 和 colspan
                                        week[i][j].title = item.title;
                                        week[i][j].id = item.id;
                                        week[i][j].type = item.type;
                                        week[i][j].colspan = nowWeekDuring;
                                        // 8.删掉持续时间 - 1  那一项
                                        week[i].splice(j + 1, nowWeekDuring - 1);
                                        // 9.为了避免 出现多行重复事件，写了一个 flag
                                        flag = false;
                                        // 11 跨周 
                                        // 去看 第六步
                                        // 返回除了第一周意外的剩余天数
                                        var rest = during - nowWeekDuring;
                                        var count = 0
                                        // 12.如果剩余天数 大于7
                                        while (rest > 0) {
                                            count++;
                                            // 14. 下一周的天数就是 rest >= 7 ? 7 : rest
                                            var nextWeekDuring = rest >= 7 ? 7 : rest;
                                            // ★★★★★★解决换月的时候 报错的问题 ★★★★★★
                                            if( weekidx + count >= arr.length) break;
                                            // 16.解决事件层叠的bug
                                            for (var ii = 0; ii < 3; ii++) {
                                                // 17.如果 这一周有了title 那就去下一行写就可以了
                                                if (arr[weekidx + count][ii][0].title) {
                                                    // continue 可以打断 for循环本次的执行，让它重新执行一边
                                                    continue;
                                                }
                                                // 15.去看10.html
                                                arr[weekidx + count][ii][0].title = item.title;
                                                arr[weekidx + count][ii][0].id = item.id;
                                                arr[weekidx + count][ii][0].type = item.type
                                                arr[weekidx + count][ii][0].colspan = nextWeekDuring
                                                arr[weekidx + count][ii].splice(1, nextWeekDuring - 1);
                                                break;
                                            }
                                            // 13.自减 7 
                                            rest -= 7
                                        }
                                    }
                                }
                            }
                        }
                    });
                });

return arr
}
},
updated(){
    var vm = this;
    var id;
    var toucha,weicha;
    $(".draggable").draggable({
        containment: ".schedule",
        start(event){
            id = $(this).data("id")
            var lie = parseInt((event.clientX - 296) / 142);
            var hang =  parseInt((event.clientY - 56) / 100);
            var nowDay = $(".calendar table tbody tr td").eq(hang * 7 + lie).data("day").toString();
            $(`.draggable[data-id=${id}]`).hide()
            $.get("/getall",vm.date,function(data){
                data.forEach(function(item){
                    if(item.id  ==  id){
                        toucha = new Date(nowDay.substr(0,4),nowDay.substr(4,2) - 1,nowDay.substr(6,2)) - new Date(item.start.substr(0,4),item.start.substr(4,2) - 1,item.start.substr(6,2));
                        weicha =  new Date(item.end.substr(0,4),item.end.substr(4,2) - 1,item.end.substr(6,2)) - new Date(nowDay.substr(0,4),nowDay.substr(4,2) - 1,nowDay.substr(6,2));
                    }
                });
            })
        },
        drag(event){
            var lie = parseInt((event.clientX - 296) / 142);
            var hang =  parseInt((event.clientY - 56) / 100);
            var nowDay = $(".calendar table tbody tr td").eq(hang * 7 + lie).data("day").toString();
            $(".calendar table tbody tr td").removeClass('bgCur')
            $(".calendar table tbody tr td").eq(hang * 7 + lie).addClass('bgCur')
        },
        stop(event){
            var lie = parseInt((event.clientX - 296) / 142);
            var hang =  parseInt((event.clientY - 56) / 100);
            var nowDay = $(".calendar table tbody tr td").eq(hang * 7 + lie).data("day").toString();
            console.log(toucha,weicha);
            var newStart = Date.parse(new Date(nowDay.substr(0,4),nowDay.substr(4,2) - 1,nowDay.substr(6,2))) - toucha;
            var newEnd = Date.parse(new Date(nowDay.substr(0,4),nowDay.substr(4,2) - 1,nowDay.substr(6,2))) + weicha;
            var start = {   
                year : new Date(newStart).getFullYear(),
                month : new Date(newStart).getMonth() + 1,
                day : new Date(newStart).getDate()
            }
            var end = {
                year : new Date(newEnd).getFullYear(),
                month : new Date(newEnd).getMonth() + 1,
                day : new Date(newEnd).getDate()
            }
            vm.$store.dispatch("DRAGGABLEWORK",{
                id : id,
                start : `${start.year}${buling(start.month)}${buling(start.day)}`,
                end : `${end.year}${buling(end.month)}${buling(end.day)}`
            });
            $(".draggable").show();
            $(".draggable").css("position","static")
            $(".calendar table tbody tr td").removeClass('bgCur')
        }
    })
},
methods:{
   showTools(item){
    this.calSetting.isShowTools = true;
    this.calSetting.id = item.id
}
}
}
</script>