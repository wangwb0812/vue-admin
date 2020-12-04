<template>
	<div class="app-wrapper">
		<sidebar />
		<div class="main-container" :class="{'main-container-collose': isCollapse}">
			<navbar />
			<tags-view />
			<app-main />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import AppMain from './AppMain'
	import Navbar from './Navbar'
	import Sidebar from './Sidebar'
	import TagsView from './TagsView'
	export default {
		components: {
			AppMain,
			Navbar,
			Sidebar,
			TagsView
		},
		computed:{
			...mapGetters(['sidebar']),
			isCollapse() {
				return !this.sidebar.isOpen
			}
		}
	}
</script>

<style>
</style>
