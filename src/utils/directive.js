import { escapeHtml } from "@/utils/escapeHtml";
export default {
  'richtext': {
    bind: function (el, binding, vnode) {
      console.log(el)
      console.log(binding)
      console.log(vnode)
      el.innerHTML = escapeHtml(binding.value)
    }
  }
}
