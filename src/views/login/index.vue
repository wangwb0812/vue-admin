<template>
	<div class="login">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="用户名">
				<el-input v-model="form.username"></el-input>
				</el-form-item>
			<el-form-item label="密码">
				<el-input type="password" v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleLogin">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	data() {
		return {
			form: {}
		}
	},
	computed:{
	
	},
	methods:{
		...mapActions({ loginByPwd: 'user/loginByPwd' }),
		handleLogin() {
			this.loginByPwd(this.form).then(res => {
				console.log(res)
			})
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
