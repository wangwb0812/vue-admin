<template>
	<div class="block">{{ $route.meta.title }}</div>
</template>

<script>
export default {
	name: 'UserResetPsd',
	data() {
		return {}
	}
}
</script>

<style lang="scss" scoped>
	@import '~@/styles/theme/mixin.scss';
  .block {
    width: 1000px;
		border: 3px solid;
    @include base-background();
		@include base-border();
	  @include base-font();
  }
</style>