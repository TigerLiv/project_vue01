<style>

</style>
<template>
	<div>
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="myModalLabel">添加条目</h4>
					</div>
					<div class="modal-body">
						<span>类别:</span>
						<select class="form-control" v-model="popSetting.title">
							<option value="teaching">教学</option>
							<option value="research">科研</option>
							<option value="dissertation">论文</option>
							<option value="laboratoryConstruction">实验室建设</option>
							<option value="cooperation">校企合作</option>
							<option value="courseContests">学科竞赛</option>
							<option value="communicationDiscussion">交流/研讨</option>
							<option value="courseDesign">课程设计指导</option>
							<option value="employmentGuidance">就业指导</option>
							<option value="teachingMaterial">教材著作</option>
							<option value="schoolDepartment">学校/系工作</option>
							<option value="government">党政</option>
							<option value="train">培训</option>
							<option value="innovationEntrepreneurship">创新和创业</option>
						</select><br/>
						<span>内容:</span><input type="text" class="form-control" v-model="popSetting.content">
						<span>级别:</span><select type="text" class="form-control" v-model="popSetting.level">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>
						<span>计划完成时间:</span><input type="text" class="form-control" v-model="popSetting.completionTime">
						<span>最终完成情况:</span><input type="text" class="form-control" v-model="popSetting.finalCompletion">
						<span>有无变化:</span><select type="text" class="form-control" v-model="popSetting.change">
							<option value="true">有</option>
							<option value="false">无</option>
						</select>
					</div>

					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" @click="add">保存</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props : ["popSetting"],
		data (){
			return{
				
			}
		},
		methods:{
			add() {
				// 随机生成 8位ID
				var id = "";
				switch(this.popSetting.title){
					case "teaching" : id = "1"; break;
					case "research" : id = "2"; break;
					case "dissertation": id = "3"; break;
					case "laboratoryConstruction": id = "4"; break;
					case "cooperation": id = "5"; break;
					case "courseContests": id = "6"; break;
					case "communicationDiscussion": id = "7"; break;
					case "courseDesign": id = "8"; break;
					case "employmentGuidance": id = "9"; break;
					case "teachingMaterial": id = "10"; break;
					case "schoolDepartment": id = "11"; break;
					case "government": id = "12"; break;
					case "train": id = "13"; break;
					case "innovationEntrepreneurship": id = "14"; break;

				}
				this.$store.dispatch("ADD", {
					id: id,
					title : this.popSetting.title,
					content: this.popSetting,
				})

				$('#myModal').modal('hide');
			},
		}
	}
</script>