export default {
  // 绑定方法
  bind (el, binding) {
    const documentHandler = e => {
      if (el.contains(e.target))// 如果点击的是原来的元素,那么就不进行操作
      // eslint-disable-next-line brace-style
      { return }
      binding.value(e)
    }

    el.__vueClickOutSide__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  // 更新方法
  update () { },
  unbind (el) {
    document.removeEventListener('click', el.__vueClickOutSide__)// 销毁事件
    delete el.__vueClickOutSide__
  }
}
