import axios from '@/utils/request'
import qs from 'qs'
const getLists = options => {
  return axios.get('/public/list?' + qs.stringify(options))
}
const getTips = options => {
  return axios.get('/public/tips?' + qs.stringify(options))
}
// 友情链接
const getLinks = options => {
  return axios.get('/public/links?' + qs.stringify(options))
}
// 本周热议
const getTop = options => {
  return axios.get('/public/topweek?' + qs.stringify(options))
}
// 图片上传接口
const uploadImage = (formData) => axios.post('content/upload', formData)
export {
  getLists,
  getTips,
  getLinks,
  getTop,
  uploadImage
}
