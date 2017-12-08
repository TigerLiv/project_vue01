<style>

</style>
<template>
	<div id="loginright">

		<div class="modal fade" id="loginModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h3 class="modal-title" id="myModalLabel">登录</h3>
					</div>
					<div class="modal-body">
						<div class="input-group">
							<span class="input-group-addon" id="sizing-addon2">用户名</span>
							<input type="text" id="username" class="form-control" placeholder="请输入用户名" aria-describedby="sizing-addon2">
						</div>
						<br/>
						<div class="input-group">
							<span class="input-group-addon" id="sizing-addon2">密&nbsp;&nbsp;&nbsp;码</span>
							<input type="password" id="password" class="form-control" placeholder="请输入密码" aria-describedby="sizing-addon2">
						</div>
					</div>

					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button"  class="btn btn-success" @click="login">登录</button>
						
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
			
			//当前用户信息
			currentUser: { username: "" },
        //登录框显示或隐藏状态
      
        //注册框显示或隐藏状态
      
        //用户信息栏显示或隐藏状态
    }
},
methods:{
	login: function() {
            var username = $("#username").val(); //获取用户名
            var psw = $("#password").val() //获取密码
            console.log(username+" "+psw);
            var flag = false;
            for (var i = 0, len = this.$store.state.users.length; i < len; i++) {
                //判断用户名密码是否正确
                if (this.$store.state.users[i].username === username && this.$store.state.users[i].password === psw) {
                	flag = true;
                	alert("登录成功！");
                    //用户登录框消失
                    this.$store.state.loginStatus = true;
                    //用户登录信息显示
                    this.userbarStatus = true;
                    //设置用户栏信息
                    this.$store.state.currentUser= this.$store.state.users[i].username;
                
                    //登录或注册入口消失
                    this.lrBtnStatus = false;
                    break;
                }
            }

            if (this.$store.state.loginStatus) {
            	$('#loginModel').modal('hide');
            }
            if (!flag) {
            	alert("输入的账号或密码不正确！");
            	document.getElementById("username").reset();
            }

        }
    }
}
</script>