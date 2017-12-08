<style scoped lang='stylus'>
</style>
<template>
    <div>
        <div class="modal fade" id="calModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{calSetting.ifirmeModel.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <p>
                            <span>{{calSetting.ifirmeModel.subTitle}}</span>
                            <input type="text" class="form-control" v-model="calSetting.form.subTitle">
                        </p>
                        <p>
                            <span>{{calSetting.ifirmeModel.start}}</span>
                            <input type="date" class="form-control" v-model="calSetting.form.start">
                        </p>
                        <p>
                            <span>{{calSetting.ifirmeModel.end}}</span>
                            <input type="date" class="form-control" v-model="calSetting.form.end">
                        </p>
                        <p>
                            <span>{{calSetting.ifirmeModel.type}}</span>
                            <select class="form-control" v-model="calSetting.form.type">
                                <option value="work">工作</option>
                                <option value="life">生活</option>
                            </select>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="submit">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["calSetting"],
    data() {
        return {

        }
    },
    methods: {
        submit() {
            var start = new Date(this.calSetting.form.start.replace(/\-/g, "").substr(0, 4), this.calSetting.form.start.replace(/\-/g, "").substr(4, 2) - 1, this.calSetting.form.start.replace(/\-/g, "").substr(6, 2));
            var end = new Date(this.calSetting.form.end.replace(/\-/g, "").substr(0, 4), this.calSetting.form.end.replace(/\-/g, "").substr(4, 2) - 1, this.calSetting.form.end.replace(/\-/g, "").substr(6, 2));
            if (this.calSetting.ifirmeModel.title == "新增事件") {
                if (end - start > 7776000000) {
                    alert("输入的时间差不能大于90天");
                    return;
                } else if (end < start) {
                    alert("结束时间不能早于开始时间");
                    return;
                } 
                var id = "";
                var str = "1230456987qwertyuiopasdfghjklzxcvbnm";
                for (var i = 0; i < 8; i++) {
                    id += str[parseInt(Math.random() * str.length)]
                }
                this.$store.dispatch("ADDWORK", {
                    id: id,
                    title: this.calSetting.form.subTitle,
                    start: this.calSetting.form.start.replace(/\-/g, ""),
                    end: this.calSetting.form.end.replace(/\-/g, ""),
                    type: this.calSetting.form.type
                });
                $('#calModal').modal('hide')
                


            } else if (this.calSetting.ifirmeModel.title == "修改事件") {
                if (end - start > 7776000000) {
                    alert("输入的时间差不能大于90天");
                    return;
                } else if (end < start) {
                    alert("结束时间不能早于开始时间");
                    return;
                } 
                this.$store.dispatch("CHANGEWORK", {
                    id: this.calSetting.id,
                    title: this.calSetting.form.subTitle,
                    start: this.calSetting.form.start.replace(/\-/g, ""),
                    end: this.calSetting.form.end.replace(/\-/g, ""),
                    type: this.calSetting.form.type
                });
                $('#calModal').modal('hide');
                this.calSetting.isShowTools = false
                

            }
        }
    }
}
</script>