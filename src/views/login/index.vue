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
import { loginByUsername, fetchPublicKey } from  '@/api/user.js'
export default {
	data() {
		return {
			form: {}
		}
	},
	methods:{
		handleLogin() {
			fetchPublicKey().then(res => {
				console.log(res)
				loginByUsername(this.form)
			})
			
		}
	}
};
</script>

<style lang="scss" scoped>
.login {
}
</style>
