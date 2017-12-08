<style scoped lang='stylus'>
	.box{
		margin-top: 100px;
	}

    

</style>
<template>
	<div class="box">

		<div class="container-fluid">
			<div class="col-lg-12">
				<div class="row" style="margin-bottom: 20px;">
					<div class="col-lg-8">
						<button class="btn btn-default" type="submit" @click="jian">-</button>
						<span>{{this.date.year}}年{{this.date.month}}月</span>
						<button class="btn btn-default" type="submit" @click="jia">+</button>
					</div>
					<div class="col-lg-4">
						<button type="button" class="btn btn-success" data-toggle="modal" data-target="#calModal" @click="add">新增事件</button>
					</div>
				
				</div>
				<div class="row">
					<month :date="date" :calSetting="calSetting"></month>
				</div>
			</div>
		</div>
		<models :calSetting="calSetting"></models>
		<tools :calSetting="calSetting"></tools>
	</div>

</template>
<script>
import month from "../../components/month.vue";
import models from '../../components/models.vue';
import tools from '../../components/tools.vue';
export default{
	data(){
		return{
			calSetting: {
				isShowTools: false,
				ifirmeModel: {
                    // 外部名称
                    title: "",
                    subTitle: "",
                    start: "",
                    end: "",
                    type: ""
                },
                form: {
                    // 内部数据
                    subTitle: "",
                    start: "",
                    end: "",
                    type: ""
                }
            }
        }
    },
    computed: {
        date() {
            this.$store.dispatch("GETALLWORK",{
                year : this.$store.state.data.date.year,
                month : this.$store.state.data.date.month
            })
            return this.$store.state.data.date
        }
    },
    components: {
        month,
        models,
        tools
    },
    methods:{
    	jian() {
    		this.$store.commit("JIANWORK", {
    			year: this.date.month == 1 ? this.date.year - 1 : this.date.year,
    			month: this.date.month == 1 ? 12 : this.date.month - 1
    		})
    	},
    	jia() {
    		this.$store.commit("JIAWORK", {
    			year: this.date.month == 12 ? this.date.year + 1 : this.date.year,
    			month: this.date.month == 12 ? 1 : this.date.month + 1
    		})
    	},
    	add() {
    		this.calSetting.ifirmeModel.title = "新增事件"
    		this.calSetting.ifirmeModel.subTitle = "新增事件名称"
    		this.calSetting.ifirmeModel.start = "新增事件开始时间"
    		this.calSetting.ifirmeModel.end = "新增事件结束时间"
    		this.calSetting.ifirmeModel.type = "新增事件类型";
    		this.calSetting.form.subTitle = ""
    		this.calSetting.form.start = ""
    		this.calSetting.form.end = ""
    		this.calSetting.form.type = ""
    	}
    }
}
</script>