<template>
	<div class="sidebar-container" :class="{ isCollapse: isCollapse }">
		<div class="muen-top">
			<div class="muen-top-icon-wrapper"><img class="muen-top-icon" src="../../../assets/logo.png" /></div>
			<span class="muen-top-title">管理系统</span>
		</div>
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
				:default-active="activeMenu"
				class="el-menu-vertical-demo"
				@open="handleOpen"
				@close="handleClose"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
				:collapse="isCollapse"
				collapse-transition
				router
			>
				<template v-for="menuItem in menuList">
					<el-submenu v-if="menuItem.children && menuItem.children.length > 0" :key="menuItem.id" :index="menuItem.path">
						<template slot="title">
							<i :class="menuItem.menuIcon || 'el-icon-setting'"></i>
							<span slot="title">{{ menuItem.title }}</span>
						</template>
						<!--  二级菜单 -->
						<el-menu-item v-for="item in menuItem.children" :key="item.id" :index="item.path">
							<i :class="item.menuIcon || 'el-icon-setting'"></i>
							<span slot="title">{{ item.title }}</span>
						</el-menu-item>
					</el-submenu>
					<el-menu-item v-else :key="menuItem.id" :index="menuItem.path">
						<i :class="menuItem.menuIcon || 'el-icon-setting'"></i>
						<span slot="title">{{ menuItem.title }}</span>
					</el-menu-item>
				</template>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters(['sidebar', 'menuList']),
		isCollapse() {
			return !this.sidebar.isOpen;
		},
		activeMenu() {
			const route = this.$route;
			const { path } = route;
			return path;
		}
	},
	methods: {
		handleCollapse() {
			this.isCollapse = !this.isCollapse;
		},
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		}
	}
};
</script>
<style lang="scss" scoped>
.sidebar-container {
	.muen-top {
		height: 50px;
		line-height: 50px;
		background-color: #2b2f3a;
		.muen-top-icon-wrapper {
			display: inline-block;
			width: 64px;
			height: 50px;
			text-align: center;
			.muen-top-icon {
				width: 32px;
				height: 32px;
				vertical-align: middle;
			}
		}
		.muen-top-title {
			color: #fff;
			line-height: 50px;
			font-size: 16px;
			vertical-align: middle;
		}
	}
}
</style>
