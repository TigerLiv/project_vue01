<style>

</style>
<template>
	<div>
		<div class="modal fade" id="regist" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h3 class="modal-title" id="myModalLabel">注册</h3>
					</div>
					<div class="modal-body">
						<div class="input-group">
							<span class="input-group-addon" id="sizing-addon2">用户名</span>
							<input type="text" id="yonghu" class="form-control" placeholder="请输入用户名" aria-describedby="sizing-addon2">
						</div>
						<br/>
						<div class="input-group">
							<span class="input-group-addon" id="sizing-addon2">密&nbsp;&nbsp;&nbsp;码</span>
							<input type="text" id="mima" class="form-control" placeholder="请输入密码" aria-describedby="sizing-addon2">
						</div>
					</div>

					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button"  class="btn btn-success" @click="regist">立即注册</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	
	data (){
		return{
			registerStatus: false
		}
	},
	methods:{
		regist(){
				var obj = {}; //创建用户账号密码容器
				var flag = false;
            var username = $("#yonghu").val(); //获取用户名
            var psw = $("#mima").val() //获取密码
                //判断用户名是否存在
                console.log(username+","+psw)
                for (var i = 0, len = this.$store.state.users.length; i < len; i++) {
                	if (this.$store.state.users[i].username === username) {
                		flag = true;
                		alert("该用户名已经被注册！");
                		break;
                	}
                }
                if (!flag) {
                	if (username == "" || psw == "") {
                		alert("账号和密码不能为空！");
                	} else {

                		obj.username = username;
                		obj.password = psw;

                    //添加用户信息到用户列表
                    this.$store.state.users.push(obj);
                    alert("注册成功！");
                    //设置用户信息栏显示
                    this.registerStatus = true;
                    if (this.registerStatus) {
                    	$('#regist').modal('hide');
                    }
                    //设置用户栏信息

                    //重置表单数据
                    document.getElementById("yonghu").reset();
                   
                }
            }
        }
    }
}
</script>