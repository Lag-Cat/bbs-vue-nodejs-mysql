<template>
	<div class="emoji-panel">
		<div class="selector-content">
			<div
				v-for="item in emoji"
				:key="item"
				class="emoji-icon"
				v-bind:class="'emoji-'+item"
				@click="handleClick(item)"
			></div>
		</div>
	</div>
</template>
<script>
import './emoji.css'
import conf from './conf.js'
export default {
	name: 'emojiSelector',
	data() {
		return {
			emoji: conf.emoji_face
		}
	},
	created() {},
	methods: {
		handleClick(name) {
			this.$emit('select', '[' + name + ']')
		}
	}
}
</script>
<style scoped>
.emoji-panel {
	width: 100%;
	max-height: 200px;
}
.emoji-panel .selector-content .emoji-icon {
	display: inline-block;
}
</style>