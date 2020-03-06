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
const uploadImg = formData => {
  console.log('tttt', formData)
  return axios.post('/content/upload', formData)
}
// 发帖接口
const addPost = (data) => axios.post('/content/add', { ...data })

// 获取文章详情
const getDetail = (tid) => axios.get('/public/content/detail?tid=' + tid)

// 更新文章编辑帖子
const updatePost = (data) => axios.post('/content/update', { ...data })
export {
  getLists,
  getTips,
  getLinks,
  getTop,
  uploadImg,
  addPost,
  getDetail,
  updatePost
}
