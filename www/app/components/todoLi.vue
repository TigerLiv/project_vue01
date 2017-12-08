<style scoped lang='stylus'>
	.cur{
		text-decoration: line-through;
	}
	table,tr,td{
		border :1px solid #ddd;
		border-collapse:"collapse";
	}
	
	td{
		min-width:50px;
		
	}
	tr{
		height:50px;
	}
</style>
<template>
    <tbody>
    	<tr v-for="(con,index) in item.contents" is="contents-tr" :con="con" :item="item" :index="index">
			
    	</tr>
    </tbody>
</template>
<script>
	import contentsTr from "./Contents.vue";
export default {
    props: ["item"],
    
	components:{
		contentsTr
	}
}
</script>