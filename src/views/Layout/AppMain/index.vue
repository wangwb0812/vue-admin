<template>
	<div class="app-main">
		<el-scrollbar wrap-class="app-main-scrollbar-wrapper">
			<transition name="fade-transform" mode="out-in">
				<keep-alive :include="cachedViews"><router-view :key="key" /></keep-alive>
			</transition>
		</el-scrollbar>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		key() {
			return this.$route.path;
		},
		cachedViews() {
			return this.$store.state.tagsView.cachedViews;
		}
	}
};
</script>
