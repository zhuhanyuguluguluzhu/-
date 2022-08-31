import service from '@/request/index'

  // 获取轮播图的数据图片
export  function getBanner() {
  return service({
    method: 'GET',
    url:"/banner?type=2"
    })
}
  //获取发现好歌单
export function getMusicList() {
  return service({
    method: 'GET',
    url:'/personalized?limit=20'
    })
  }