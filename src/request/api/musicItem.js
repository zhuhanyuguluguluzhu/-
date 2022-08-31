import server from '@/request/index'
//获取歌单详情页的数据
export function getMusicItemList(id){
  return server({
    method: 'GET',
    url:`/playlist/detail?id=${id}`
  })
}
// 数字格式化
export function changeCount(num) {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + "亿";
  } else if (num >= 10000) {
    return (num / 10000).toFixed(1) + "万";
  }
}
// 获取歌单的歌曲
export function getSongList(id) {
  return server({
    method: 'GET',
    url:`/playlist/detail?id=${id}`
  })
}
// 获取歌曲歌词
export function getSongLyric(id) {
  return server({
    method: 'GET',
    url:`/lyric?id=${id}`
  })
}






