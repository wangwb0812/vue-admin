<template>
	<div class="login">
		<div class="login-form-wrapper">
			<h1 class="login-title">用户登录</h1>
			<el-form class="login-form" ref="form" :model="form" :rules="rules">
				<el-form-item prop="username">
					<el-input v-model="form.username" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" v-model="form.password" placeholder="密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button class="login-btn" :loading="loading" type="primary" @click="handleLogin">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	data() {
		const validateUsername = (rule, value, callback) => {
			if (!value) {
				callback(new Error('请输入用户名！'))
			} else {
				callback()
			}
		};
		const validatePsd = (rule, value, callback) => {
			if (!value) {
				callback(new Error('请输入密码！'))
			} else {
				callback()
			}
		};
		return {
			loading: false,
			form: {},
			rules: {
				username: [{ validator: validateUsername, trigger: 'blur' }],
				password: [{ validator: validatePsd, trigger: 'blur' }]
			}
		};
	},
	methods: {
		...mapActions({ loginByPwd: 'user/loginByPwd' }),
		handleLogin() {
			this.$refs.form.validate(valid => {
				if (valid) {
					this.loading = true
					this.loginByPwd(this.form).then(() => {
						this.loading = false
						this.$router.push('/home')
					}).catch(err => {
						this.loading = false
						throw new Error(err)
					});
				} else {
					console.log('error submit!!')
					return false
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.login {
	background: url(../../assets/login_bg.jpg) no-repeat center;
	background-size: cover;
	height: 100%;
	.login-form-wrapper {
		width: 360px;
		@include pCenter;
		.login-title {
			color: #1ab392;
			font-weight: normal;
			font-size: 24px;
			text-align: center;
			margin-bottom: 30px;
		}
		.login-form {
			.el-form-item {
				margin-bottom: 30px;
				.el-input {
					height: 42px;
					background-color: transparent;
					/deep/ .el-input__inner {
						background-color: rgba(255, 255, 255, 0.2);
						border: none;
						border-radius: 0;
						color: #fff;
					}
				}
			}
		}
		.login-btn {
			background-color: #1ab392;
			border-color: #1ab392;
			width: 100%;
			border-radius: 0;
		}
	}
}
</style>
