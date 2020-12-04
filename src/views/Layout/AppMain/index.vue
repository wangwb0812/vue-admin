<template>
	<div class="app-main">
		<transition name="fade-transform" mode="out-in">
			<keep-alive :include="cachedViews">
				<router-view :key="key" />
			</keep-alive>
		</transition>
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
}
</script>
