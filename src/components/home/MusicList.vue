<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        :show-indicators="false"
        class="mySwiper"
      >
        <van-swipe-item v-for="music in musicList" :key="music.id">
          <router-link :to="{ path: '/musicItem', query: { id: music.id } }">
            <img :src="music.picUrl" alt="" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-play"></use>
              </svg>
              {{ changeCount(music.playCount) }}
            </span>
            <!-- 文字 -->
            <span class="name">{{ music.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home";
import { changeCount } from "@/request/api/musicItem";
import { onMounted, reactive, toRef } from "@vue/runtime-core";
export default {
  name: "MusicList",
  // vu2
  // data() {
  //   return {
  //     musicList: [],
  //   };
  // },
  // methods: {
  //   changeCount(num) {
  //     if (num >= 100000000) {
  //       return (num / 100000000).toFixed(1) + "亿";
  //     } else if (num >= 10000) {
  //       return (num / 10000).toFixed(1) + "万";
  //     }
  //   },
  //   async getMusicList() {
  //     let response = await getMusicList();
  //     this.musicList = response.data.result;
  //   },
  // },
  // mounted() {
  //   this.getMusicList();
  // },
  // vue3
  setup() {
    let state = reactive({
      musicList: [],
    });
    onMounted(async () => {
      let musicResponse = await getMusicList();
      console.log(musicResponse);
      state.musicList = musicResponse.data.result;
      
    });

    return {
      musicList: toRef(state, "musicList"),
      changeCount,
    };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 3.6rem;

    .van-swipe-item {
      //   margin-right: 0.14rem;
      padding-right: 0.2rem;
      position: relative;
      height: 3.8rem;
      margin-top: 0.2rem;
      img {
        width: 100%;
        height: 2.4rem;
        border-radius: 0.2rem;
        //   position: absolute;
      }
      .playCount {
        position: absolute;
        z-index: 100;
        right: 0.3rem;
        color: white;
        margin-top: 0.06rem;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .name {
        //   position: absolute;
        bottom: 0px;
      }
    }
  }
}
</style>
