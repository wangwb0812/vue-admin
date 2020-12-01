import Vue from 'vue';
import store from '@/store'

Vue.directive('icon', {
	bind(el, binding) {
		const obj = store.state.iconList.find(val=>{
			return val.id == binding.value
		})
		//console.log(obj)
		if (obj && obj.image){
			el.src = `/static/idtype/${obj.image}`;
			el.title = obj.name;
		  el.style.width = '18px';
		  el.style.verticalAlign = 'middle';
		} else {
			el.src = `/static/idtype/other.png`;
		  el.style.width = '18px';
			if (obj && obj.name){
				el.title = obj.name;
			}
		}
		
	},
	update(el, binding){
	  const obj =  store.state.iconList.find(val=>{
			return val.id == binding.value
		})
		if (obj && obj.image){
			el.src = `/static/idtype/${obj.image}`;
			el.title = obj.name;
		  el.style.width = '18px';
		  el.style.verticalAlign = 'middle';
		} else {
			el.src = `/static/idtype/other.png`;
		  el.style.width = '18px';
			if (obj && obj.name){
				el.title = obj.name;
			}
		}
	}
})
