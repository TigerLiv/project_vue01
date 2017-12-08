<style scoped lang='stylus'></style>
<template>
	<div>
		<div style="margin-top: 60px;margin-left:0px;" class="container-fluid col-lg-12" v-show="this.$store.state.loginStatus" >
			<div class="page-header">
				<h1>工作总结 <small>（截止2017年8月1日）</small></h1>
			</div>
			<p>
				<button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal">添加条目</button>
			</p>
			<table class="table table-striped table-bordered table-hover table-responsive">
				<thead>
					<tr>
						<td class="col-2">
							<div class="dropdown">
								<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
									类别
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu" aria-labelledby="dropdownMenu1" >
									<li class="cla"><a href="#" @click="changeState('all')">全部</a></li>
									<li v-for="item in navTitle" class="cla"><a href="#" @click="changeState(item.title)">{{item.titleCh}}</a></li>
								</ul>
							</div>
						</td>						
						<td>内容</td>
						<td>级别</td>
						<td>计划完成时间</td>
						<td>最终完成情况</td>
						<td>有无变化</td>
						<td>删除</td>
					</tr>

				</thead>

				<tbody v-for="item of todos" is="todo-li" :item="item"></tbody>
			</table>
		</div>

		<model :popSetting="popSetting"></model>
		<login></login>
		<regist></regist>
	</div>
</template>
<script>
import model from '../../components/model.vue';
import Contents from '../../components/Contents.vue';
import todoLi from '../../components/todoLi.vue';
import login from '../../components/loginmodel.vue';
import regist from '../../components/registmodel.vue';
export default{
	data(){
		return{
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
		}
	},
	components:{
		model,
		login,
		regist,
		todoLi
	}
}
</script>