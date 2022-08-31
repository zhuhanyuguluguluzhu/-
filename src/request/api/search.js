import server from '@/request/index'

export function getSearch(keywords) {
  return server({
    method: 'GET',
    url:`/search?keywords=${keywords}`
  })
}