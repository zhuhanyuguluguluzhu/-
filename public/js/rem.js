// 移动端 rem 适配

// 定义当屏幕尺寸的变化的回调函数
function remSize() {
  //获取设备宽度
  let deviceWidth = document.documentElement.clientWidth || windon.innerWidth;
  // 固定宽度
  if (deviceWidth >= 750) {
    deviceWidth = 750
  }
  if (deviceWidth <= 320) {
    deviceWidth =320
  }
  // 750px ====>1 rem = 100px
  // 375px ====>1 rem = 50px
  //  rem document.documentElement  === html 根元素
  document.documentElement.style.fontSize = (deviceWidth /7.5) + 'px'
  // 设置字体大小 font-size :15px 
  document.querySelector('body').style.fontSize = 0.3+ 'rem'

}

remSize()
  // 当窗口发生变化的时候调用
window.onresize = function () {
  remSize()
  
}