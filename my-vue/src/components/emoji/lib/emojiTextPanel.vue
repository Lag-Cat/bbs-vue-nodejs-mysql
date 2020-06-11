<template>
</template>
<script>
export default {
	name: 'emojiTextPanel',
	render(craeteElement) {
		return craeteElementh('div', {
			text:'asdsdasdas',
			//给div绑定value属性
			props: {
				value: ''
			}, //给div绑定样式
			style: {
				width: '30px'
			}, //给div绑定点击事件
			on: {
				click: () => {
				}
			}
		})
	},
	data() {
		return {
			text: [
				{ type: 'text', text: '' },
				{ type: 'emoji', text: '' },
				{ type: 'text', text: '' },
				{ type: 'emoji', text: '' },
				{ type: 'text', text: '' },
				{ type: 'emoji', text: '' },
				{ type: 'text', text: '' },
				{ type: 'emoji', text: '' },
				{ type: 'text', text: '' },
				{ type: 'emoji', text: '' },
				{ type: 'text', text: '' },
				{ type: 'emoji', text: '' },
				{ type: 'text', text: '' },
				{ type: 'emoji', text: '' }
			]
		}
	}
}
</script>   