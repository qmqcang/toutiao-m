import request from '@/utils/request'

// 获取频道文章数据
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
