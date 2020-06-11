<template>
	<span v-html="text"></span>
</template>
<script>
import emojiList from '../emoji/lib/conf'
export default {
	name: 'commTextPanel',
	props: {
		content: String
	},
	data() {
		return {
			text: '',
			emojiArr: emojiList.emoji_face
		}
	},
	created() {
		this.text = this.content
		this.htmlFormatter(this.content)
	},
	methods: {
		htmlFormatter(val) {
			//emoji-satisfied
			let tmp = this.text
			this.emojiArr.forEach(item => {
				tmp = tmp.replace('[' + item + ']', this.setEmojiHtml(item))
			})
			this.text = tmp
		},
		setEmojiHtml: function(name) {
			let path = ''
			return '<span>[emojiemoji]</span>'
		}
	}
	// filters:{
	//   htmlFormatter(val){
	//     let matched=/::[a-zA-Z]{0,10};/i;
	//     let a="aaa";
	//     val.replace(matched,'<span style="color:blue">aaa</span>');
	//     console.log(val)
	//     val="<span>"+val+"</span>"
	//     return val;
	//   }
	// }
}
</script>