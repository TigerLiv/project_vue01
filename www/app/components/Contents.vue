<style>
/*
	table,tr,td{
		border :1px solid #ddd;
		border-collapse:"collapse";
	}
*/
	textarea{
		width: 90%;
		height: 90%;
	}
	.level{
		min-width: 73px;
	}
	.change{
		min-width: 78px;
	}
	.content{
		max-width: 400px;
	}
</style>
<template>
		<tr class="active">
			<td><span v-if="!isShowTitle">{{conTitle}}</span></td>
			<td class="content"><span @dblclick="changeShowTxt(1)" v-if="!isShowContent">{{con.content}}</span><textarea v-if="isShowContent" v-model="con.content" v-focus @blur="hide(item, 1)"/></td>
			<td class="level">
				<select class="form-control" v-model="con.level" @change="changeSelect(item)">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
			<input v-if="isShowLevel" v-model="con.level" v-focus @blur="hide(item, 2)"></td>
			<td><span @dblclick="changeShowTxt(3)" v-if="!isShowTime">{{con.completionTime.length == 0 ? 0 : con.completionTime}}</span><input  v-if="isShowTime" v-model="con.completionTime" v-focus @blur="hide(item, 3)"></td>
			<td><span @dblclick="changeShowTxt(4)" v-if="!isShowCompletion">{{con.finalCompletion.length==0?"无" : con.finalCompletion}}</span><textarea v-if="isShowCompletion" v-model="con.finalCompletion" v-focus @blur="hide(item, 4)"/></td>
			<td class="change">
				<select class="form-control" v-model="con.change.length==0 ? false : true" @change="changeSelect(item)">
					{{con.change}}
					<option value="true">有</option>
					<option value="false">无</option>
				</select>
<!--				<span @dblclick="changeShowTxt(5)" v-if="!isShowChange">{{con.change ? "有" : "无"}}</span>-->
<!--				<input v-if="isShowChange" v-model="con.change" v-focus @blur="hide(item, 5)"/>-->
			</td>
			<td><button @click="del(item.id,index)" class="btn btn-danger">删除</button></td>
		</tr>
</template>
<script>
	export default{
		props:["con", "item", "index"],
		data() {
			return {
				isShowTitle: false,
				isShowContent: false,
				isShowLevel: false,
				isShowTime: false,
				isShowCompletion: false,
				isShowChange: false
			}
		},
		computed : {
			conTitle(){
				switch(this.con.title){
					case "teaching" : return "教学";
					case "research" : return "科研";
					case "dissertation" : return "论文";
					case "laboratoryConstruction" : return "实验室建设";
					case "cooperation" : return "校企合作";
					case "courseContests" : return "交流/研讨";
					case "communicationDiscussion" : return "课程设计指导";
					case "courseDesign" : return "就业指导";
					case "teachingMaterial" : return "教材著作";
					case "schoolDepartment" : return "学校/系工作";
					case "government" : return "党政";
					case "train" : return "培训";
					case "innovationEntrepreneurship" : return "创新和创业";
				}
			}	
		},
		methods: {
			del(id, index) {
//				console.log(id, index)
				this.$store.dispatch("DEL", {
					id: id,
					n : index
				})
			},
			changeSelect(item){
				this.$store.dispatch("CHANGETITLE",item)
			},
			changeShowTxt(n){
				switch(n){
					case 0 : this.isShowTitle = !this.isShowTitle;break;
					case 1 : this.isShowContent = !this.isShowContent;break;
					case 2 : this.isShowLevel = !this.isShowLevel;break;
					case 3 : this.isShowTime = !this.isShowTime;break;
					case 4 : this.isShowCompletion = !this.isShowCompletion;break;
					case 5 : this.isShowChange = !this.isShowChange;break;
				}
			},
			hide(item , n){
				this.changeShowTxt(n);
				this.$store.dispatch("CHANGETITLE",item)
			},
			changeDone(id){ 
				this.$store.dispatch("CHANGEDONE",{
					id : id,
					done : this.$refs.cbox.checked
				})
			}
		},
		directives:{
			focus:{
				inserted(el,binding){
					console.log(binding);
					el.focus()
				}
			}
		},
	}
</script>