<template>
	<div><div id="chartsId1" style="height: 600px;"></div></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
	name: 'SystemRole',
	data() {
		return {
			charts: null
		};
	},
	mounted() {
		console.log(1)
		this.chartsInit()
	},
	methods: {
		chartsInit() {
			var option = {
				aria: {
					show: true
				},
				title: {
					text: '某站点用户访问来源',
					left: 'center'
				},
				series: [
					{
						name: '访问来源',
						type: 'pie',
						data: [
							{ value: 335, name: '直接访问' },
							{ value: 310, name: '邮件营销' },
							{ value: 234, name: '联盟广告' },
							{ value: 135, name: '视频广告' },
							{ value: 1548, name: '搜索引擎' }
						]
					}
				]
			};
			this.charts = echarts.init(document.getElementById('chartsId1'));
			this.charts.setOption(option);
		}
	}
};
</script>

<style lang="scss" scoped></style>
