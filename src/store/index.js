import login from '@/request/api/login'
import { createStore} from 'vuex'
import {getSongLyric} from '../request/api/musicItem'
export default createStore({
  state: {
    playList: [{
        al:{//初始播放
           id: 149013204,
            name: "一直很安静",//专辑的名字
            pic: 109951167740623340,
            picUrl: "http://p4.music.126.net/d3P6hiIEDH4Gp9cApS5b3A==/109951167740623345.jpg",
            pic_str: "109951167740623345"
          },
      ar:[
        { id: 14312549, name: '王贰浪' }
      ],
      id: 1968781675,//歌曲id 
      // 歌曲名字 
      name:'一直很安静'
      
    }],
    playListIndex: 0,//默认播放下标为0
    isbtnShow: true,//true播放按钮的显示  false 暂停按钮显示 
    songDetailShow: false,//歌曲详情展示
    lyricList: {},//歌词
    currentTime: 0,//当前时间
    duration: 0,//歌曲总时长
    isLogin: true,//判读是否登录
    isFooterShow:true//是否显示底部组件 一开始显示
  },
  getters: {
  },
  mutations: {
    // 点击按钮的显示和隐藏
    updateIsbtnShow(state,value) {
        state.isbtnShow = value
    },
    // 切换歌单
    updatePlayList(state, value) {
      state.playList = value
    },
    // 切换歌曲
    updatePlayListIndex(state, value) {
        state.playListIndex = value
    },
    // 展示歌曲播放页面
    updateSongDetailShow(state) {
      state.songDetailShow = !state.songDetailShow
    },
    //更新歌词
    updateLyricList(state, value) {
      state.lyricList = value
    },
    //更新歌曲播放的时间
    updateCurrentTime(state, value) {
      // console.log(state.currentTime);
      state.currentTime = value
    },

    updateDuration(state,value) {
       state. duration = value
    },
    //更新 search 的歌曲
    pushPlayList(state,value) {
        state.playList.push(value)
    }
  },
  actions: {
   async getSongLyric(context,value) {
      let res = await getSongLyric(value)
      console.log(res);
      // 把数据提交给 mutations 进行操作
      context.commit('updateLyricList',res.data.lrc)
    },
    async getLogin(context, value) {
      let res = await login(value);
      // console.log(res);
      context.commit('')
    }


  },
  modules: {
  }
})
