import Vue from "vue"
import Vuex from "vuex"
import VueRouter from 'vue-router'
import app from "./app.vue"
import createLogger from './logger/logger.js';
import loginmodel from "./components/loginmodel.vue";
import buling from "./plugins/buling.js";
import calendar from "./views/calendar/index.vue";
import work from "./views/work/index.vue";
window.buling = buling
Vue.use(Vuex);
Vue.use(VueRouter);
const routes=[
	{path:'/work',component:work,name:"工作总结"},
	{path:'/calendar',component:calendar,name:"待办事项"},
	{path:'/*',redirect:"/work"}
]
const router=new VueRouter({
	routes
})

const store = new Vuex.Store({
	state:{
		todos:[],
		loginStatus: true,
		currentUser:"",
		users: [{
				username: "admin",
				password: "123456",
				
			}],
		names: "all",
		data:{
			date:{
				year: 2017,
            	month:10
			},
			morenshuju: []
		}
	},
	mutations:{
		GETALL(state,payload){
			state.todos = payload
		},
		DEL(state,payload){
			
			state.todos = payload
		},
		ADD(state,payload){
			state.todos = payload
		},
		CHANGETITLE(state,payload){
			state.todos = state.todos.map((item)=>{
				if(item.id == payload.id){
					return payload
				}
				return item
			})
		},
		CHANGEDONE(state,payload){
			state.todos = state.todos.map((item)=>{
				if(item.id == payload.id){
					return payload
				}
				return item
			})
		},
		//日历
		JIANWORK(state,payload){
			state.data.date = payload
		},
		JIAWORK(state,payload){
			state.data.date = payload
		},
		GETALLWORK(state,payload){
			state.data.morenshuju = payload
		},
		DELWORK(state,payload){
			state.data.morenshuju = payload
		},
		ADDWORK(state,payload){
			state.data.morenshuju = payload
		},
		CHANGEWORK(state,payload){
			state.data.morenshuju = payload
		}
	},
	actions:{
		async GETALL({commit},payload){
			var data = await fetch("/getall").then(res => res.json());
//			console.log(data)
			commit("GETALL",data)
		},
		async DEL({commit},payload){
			var data = await fetch("/del",{
				"method" : "DELETE",
				"headers" : {
					"Content-Type":"application/json"
				},
				"body": JSON.stringify(payload)
			}).then(res => res.json());
			//这里返回的data不是剩余的数据 无法直接使用 载荷的方式直接提交上去，
			//载荷提交删除的那个人的 id 在mutations 那边使用filter 过滤
			commit("DEL",data)
		},
		async ADD({commit},payload){
			var data = await fetch("/add",{
				"method" : "POST",
				"headers":{
					"Content-Type": "application/json"
				},
				"body":JSON.stringify(payload)
			}).then(res => res.json());

			commit("ADD",data)
		},
		async CHANGETITLE({commit},payload){
			var data = await fetch("/change",{
				"method" : "PATCH",
				"headers":{
					"Content-Type": "application/json"
				},
				"body":JSON.stringify(payload)
			}).then(res => res.json());

			commit("CHANGETITLE",data)
		},
		async CHANGEDONE({commit},payload){
			var data = await fetch("/mapList/" + payload.id,{
				"method" : "PATCH",
				"headers":{
					"Content-Type": "application/json"
				},
				"body":JSON.stringify({done : payload.done})
			}).then(res => res.json());

			commit("CHANGEDONE",data)
		},
		//日历
		async GETALLWORK({commit},payload){
			var data = await fetch("/getallwork?year="+payload.year+"&month="+payload.month).then(res => res.json());
			console.log(data);
			commit("GETALLWORK",data)
		},
		async DELWORK({commit},payload){
			var data = await fetch("/delwork",{
				"method":"DELETE",
				"headers":{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(payload)
			}).then(res => res.json());
			commit("DELWORK",data)
		},
		async ADDWORK({commit},payload){
			var data = await fetch("/addwork",{
				"method":"POST",
				"headers":{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(payload)
			}).then(res => res.json());
			commit("ADDWORK",data)
		},
		async CHANGEWORK({commit},payload){
			var data = await fetch("/changework",{
				"method":"PATCH",
				"headers":{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(payload)
			}).then(res => res.json());
			commit("CHANGEWORK",data)
		},
		async DRAGGABLEWORK({commit},payload){
			var data = await fetch("/changework",{
				"method":"PATCH",
				"headers":{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(payload)
			}).then(res => res.json());
			commit("CHANGEWORK",data)
		}
	},
	getters:{
		changeClass(state){
			console.log(state.names);
			return state.todos.filter((item)=>{
				return item.title == state.names
			})
		}
	},
	plugins: [createLogger()]
})


new Vue({
	el : "#app",
	store,
	router,
	render:h=>h(app)
})
window.router=router