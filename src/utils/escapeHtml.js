import faces from '@/assets/js/face'
const htmlEncode = (html) => {
  let temp = document.createElement('div')
  temp.textContent !== undefined ? (temp.textContent = html) : (temp.innerText = html)
  const output = temp.innerHTML
  temp = null
  return output
}
const escapeHtml = (val = '') => {
  if (!val) return ''
  let result = val
  let face = /\sface\[\W{1,}\]/g
  if (face.test(result)) {
    let group = result.match(face)
    group.map(item => {
      const key = item.match(/\[\S+\]/g)[0]
      result = result.replace(item, `<img src="${faces[key]}">`)
    })
  }
  let img = /img\[\S+\]/g
  if (img.test(result)) {
    let group = result.match(img)
    group.map(item => {
      result = result.replace(item, `<img src="${item.substr(4, item.length - 5)}">`)
    })
  }
  let link = /\sa\(\S+\]/g
  if (link.test(result)) {
    let group = result.match(link)
    const title = /\((.+)\)/
    const linkName = /\[(.+)\]/
    group.map(item => {
      const nameGroup = item.match(linkName)
      let name = ''
      if (nameGroup.length > 0) {
        name = nameGroup[1]
      }
      const linkGroup = item.match(title)
      let link = ''
      if (linkGroup.length > 0) {
        link = linkGroup[1]
      }
      result = result.replace(item, `<a href="${link}">${name}</a>`)
    })
  }
  result = result.replace(/\[quote\]/g, `<div class="layui-elem-quote">`)
  result = result.replace(/\[\/quote\]/g, `</div>`)
  // 代码块替换
  // const code = /(\[\/?pre(.+?)[^\]]*\])|\[[^\]]*\]/g
  const code = /\[pre\]([^]+?)\[\/pre\]/g
  if (code.test(result)) {
    const group = result.match(code)
    console.log('codegroup', group)
    group.map((item) => {
      result = result.replace(item, htmlEncode(item))
    })
    result = result.replace(/\[pre\]/g, '<pre>')
    result = result.replace(/\[\/pre\]/g, '</pre>')
  }
  // hr替换
  result = result.replace(/\[hr\]/g, '<hr>')
  // 回车换行的替换
  result = result.replace(/\r\n/g, "<br>")
  result = result.replace(/\n/g, "<br>")
  return result
}
export {
  escapeHtml
}
