<style scoped lang='stylus'>
.tools {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    .modal-content {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, 0%);
        width: 600px;
    }
}
</style>
<template>
    <div class="tools" v-if="calSetting.isShowTools">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">修改事件</h4>
            </div>
            <div class="modal-body">
                <button type="button" class="btn btn-primary" @click="del">删除</button>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#calModal" @click="change">修改事件</button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" @click="close">关闭</button>
                <button type="button" class="btn btn-primary">保存</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["calSetting"],
    date() {
        return {

        }
    },
    methods: {
        close() {
            this.calSetting.isShowTools = false
        },
        change() {
        	var vm = this;
            this.calSetting.ifirmeModel.title = "修改事件"
            this.calSetting.ifirmeModel.subTitle = "修改事件名称"
            this.calSetting.ifirmeModel.start = "修改事件开始时间"
            this.calSetting.ifirmeModel.end = "修改事件结束时间"
            this.calSetting.ifirmeModel.type = "修改事件类型"
            this.$store.state.data.morenshuju.forEach(function(item){
            	if(vm.calSetting.id == item.id){
            		var start = `${item.start.toString().substr(0,4)}-${item.start.toString().substr(4,2)}-${item.start.toString().substr(6,2)}`;
            		var end = `${item.end.toString().substr(0,4)}-${item.end.toString().substr(4,2)}-${item.end.toString().substr(6,2)}`
					vm.calSetting.form.subTitle = item.title
					vm.calSetting.form.start = start
					vm.calSetting.form.end = end
					vm.calSetting.form.type = item.type
            	}
            });
            console.log(this.calSetting);
        },
        del(){
        	this.$store.dispatch("DELWORK",{
        		id : this.calSetting.id
        	});
        	this.close()
        	// console.log(this.popSetting.id);
        }
    }
}
</script>