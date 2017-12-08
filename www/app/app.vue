<style scoped>
table {
	
}
table tr td{

}
ul li.cur{
	background: skyblue;
	color: #fff;
}
ul li a{
	color: #fff;
}
#sidebar{
    background: #202020;
}

</style>
<template>
	<div>
		<nav class="navbar navbar-inverse navbar-fixed-top">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">天津大学仁爱学院</a>

				<div class="navbar-header navbar-right" v-show="!this.$store.state.loginStatus">
					<button type="button" class="btn btn-default navbar-btn" data-toggle="modal" data-target="#loginModel">登录</button>

					<button type="button" class="btn btn-default navbar-btn" data-toggle="modal" data-target="#regist">注册</button>

				</div>
				<div class="navbar-header navbar-right" v-show="this.$store.state.loginStatus">
					<p class="navbar-text">{{this.$store.state.currentUser}}</p>

					<button type="button" class="btn btn-default navbar-btn" @click="zhuxiao" >注销</button>
					
				</div>
			</div>
		</nav>

		

		<section id="container" >

			<aside>
				<div id="sidebar"  class="nav-collapse" >
					<!-- sidebar menu start-->
					<ul class="sidebar-menu" id="nav-accordion">

						<p class="centered"><a href="profile.html"><img src="assets/img/ui-sam.jpg" class="img-circle" width="60"></a></p>
						<h5 class="centered">用户</h5>

						<li  class="mt" v-for="item in tabNav" :class="{cur:item.title==$route.name}">
							<a @click="routerGo(item)" class="cur" href="javascript:;">
								<i class="fa fa-dashboard"></i>
								<span>{{item.title}}</span>
							</a>
						</li>

						
					</ul>

				</div>
			</aside>

			<section id="main-content" class="">
				<section class="wrapper" style="margin-top: 0px;">

					<div class="row">
						<div class="">
						<router-view></router-view>
			
						</div>
					</div>
				</section>
			</section>
		</section>
		<!-- 	<div style="margin-top: 100px;" v-show="!this.$store.state.loginStatus" class="alert alert-danger" role="alert">请登录后查看内容</div> -->

		

		<!-- 日历 -->
		
		
	</div>
</template>
<script>
import login from "./components/loginmodel.vue";
import regist from "./components/registmodel.vue";
import model from "./components/model.vue";

import todoLi from "./components/todoLi.vue";

import month from "./components/month.vue"
import models from "./components/models.vue"
import tools from "./components/tools.vue"



export default {
	data() {
		return {
			 tabNav:[{
                title:"工作总结",
                url:"/work"
            },{
                title:"待办事项",
                url:"/calendar"
            }],
			state: "all",
			txt: "",
			popSetting:{
				title : "teaching",
				content : "",
				level : "1",
				completionTime : "",
				finalCompletion : "",
				change : ""
			},
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
            },
            navTitle:[
            {"title": "teaching" , "titleCh" : "教学"},
            {"title": "research" , "titleCh" : "科研"},
            {"title": "dissertation" , "titleCh" : "论文"},
            {"title": "laboratoryConstruction" , "titleCh" : "实验室建设"},
            {"title": "cooperation" , "titleCh" : "校企合作"},
            {"title": "courseContests" , "titleCh" : "交流/研讨"},
            {"title": "communicationDiscussion" , "titleCh" : "课程设计指导"},
            {"title": "courseDesign" , "titleCh" : "就业指导"},
            {"title": "teachingMaterial" , "titleCh" : "教材著作"},
            {"title": "schoolDepartment" , "titleCh" : "学校/系工作"},
            {"title": "government" , "titleCh" : "党政"},
            {"title": "train" , "titleCh" : "培训"},
            {"title": "innovationEntrepreneurship" , "titleCh" : "创新和创业"}
            ]
        }
    },
    created() {
    	this.$store.dispatch("GETALL")
    },
    computed: {
    	todos() {
    		if(this.$store.state.names == "all"){
    			console.log("all")
    			return this.$store.state.todos
    		}else{
    			return this.$store.getters.changeClass

    		}
    	},
    	date() {
    		this.$store.dispatch("GETALLWORK",{
    			year : this.$store.state.data.date.year,
    			month : this.$store.state.data.date.month
    		})
    		return this.$store.state.data.date
    	}
    },
    methods: {

    	changeState(item) {
    		switch(item){
    			case "all" : this.$store.state.names = "all"; return "全部";
    			case "teaching" : this.$store.state.names = "teaching" ;return "教学";
    			case "research" : this.$store.state.names = "research" ;return "科研";
    			case "dissertation" : this.$store.state.names = "dissertation" ;return "论文";
    			case "laboratoryConstruction" : this.$store.state.names = "laboratoryConstruction"; return "实验室建设";
    			case "cooperation" : this.$store.state.names = "cooperation"; return "校企合作";
    			case "courseContests" : this.$store.state.names = "courseContests"; return "交流/研讨";
    			case "communicationDiscussion" : this.$store.state.names = "communicationDiscussion"; return "课程设计指导";
    			case "courseDesign" : this.$store.state.names = "courseDesign"; return "就业指导";
    			case "teachingMaterial" : this.$store.state.names = "teachingMaterial"; return "教材著作";
    			case "schoolDepartment" : this.$store.state.names = "schoolDepartment" ;return "学校/系工作";
    			case "government" : this.$store.state.names = "government"; return "党政";
    			case "train" : this.$store.state.names = "train"; return "培训";
    			case "innovationEntrepreneurship" : this.$store.state.names = "innovationEntrepreneurship"; return "创新和创业";
    		}
    	},
    	zhuxiao(){
    		this.$store.state.loginStatus=false;
    	},
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
    	},
    	routerGo(item){
            router.push({path:item.url})
        }
    },
    components: {

    	login,
    	regist,
    	todoLi,
    	model,
    	month,
    	models,
    	tools

    }
}

</script>
