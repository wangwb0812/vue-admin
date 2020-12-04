<template>
	<div class="tags-view tags-view-container">
		<div class="tags-view-wrapper">
			<el-tabs v-model="activeName" type="card" editable @edit="handleTabsEdit" @tab-click="handleClick">
				<el-tab-pane v-for="tag in visitedViews" closable :key="tag.name" :label="tag.title" :name="tag.name" />
			</el-tabs>
			<div class="tags-view-btn" title="标签管理">
				<el-dropdown size="small" trigger="click" @command="handleCommand">
					<i class="el-icon-arrow-down"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="a">关闭其他标签</el-dropdown-item>
						<el-dropdown-item command="b">关闭当前标签</el-dropdown-item>
						<el-dropdown-item command="c">关闭所有标签</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeName: this.$route.name
		}
	},
	computed: {
		visitedViews: {
			get() {
				return this.$store.state.tagsView.visitedViews;
			},
			set() {}
		}
	},
	watch: {
		$route(e) {
			this.activeName = e.name;
			this.addViewTags();
		}
	},
	mounted() {
		this.addViewTags();
	},
	methods: {
		handleCommand(command) {
			if (command === 'a') {
				const nowTag = this.visitedViews.find(v => v.name === this.activeName);
				this.$store.dispatch('tagsView/delOthersViews', nowTag);
			} else if (command === 'b') {
				const tabs = this.visitedViews;
				let activeName = this.activeName;
				tabs.forEach((tab, index) => {
					if (tab.name === activeName) {
						const nextTab = tabs[index + 1] || tabs[index - 1];
						if (nextTab) {
							activeName = nextTab.name;
							this.$router.push(nextTab);
						} else {
							this.$router.push({
								name: 'Home'
							});
						}
						this.$store.dispatch('tagsView/delView', tab);
					}
				});
				this.activeName = activeName;
			} else if (command === 'c') {
				this.$store.dispatch('tagsView/delAllViews');
				this.$router.push({
					name: 'Home'
				});
			}
		},
		handleClick(tab) {
			const tabs = this.visitedViews;
			tabs.forEach((item) => {
				if (tab.name === item.name) {
					this.$router.push(item);
				}
			});
		},
		handleTabsEdit(targetName) {
			const tabs = this.visitedViews;
			let activeName = this.activeName;
			tabs.forEach((tab, index) => {
				if (tab.name === targetName) {
					if (targetName === this.activeName) {
						const nextTab = tabs[index + 1] || tabs[index - 1];
						if (nextTab) {
							activeName = nextTab.name;
							this.$router.push(nextTab);
						} else {
							this.$router.push({
								name: 'Home'
							});
						}
					}
					this.$store.dispatch('tagsView/delView', tab);
				}
			});
			this.activeName = activeName;
		},
		addViewTags() {
			const { name } = this.$route;
			if (name) {
				this.$store.dispatch('tagsView/addView', this.$route);
			}
			return false;
		}
	}
};
</script>
