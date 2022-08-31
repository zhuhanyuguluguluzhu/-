<template>
  <div class="footerMusic">
    <div class="footerMusic-left" @click="updateSongDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <h4>{{ playList[playListIndex].name }}</h4>
        <p>横滑切换上下首歌曲</p>
      </div>
    </div>
    <div class="footerMusic-right">
      <svg
        class="icon liebiao"
        aria-hidden="true"
        @click="play"
        v-if="isbtnShow"
      >
        <!-- v-if= true 是隐藏 -->
        <!-- 播放 -->
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <!-- 暂停 -->
      <svg class="icon liebiao" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="songDetailShow"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <MusicDetail
        :songDetail="playList[playListIndex]"
        :play="play"
        :isbtnShow="isbtnShow"
        :addDuration="addDuration"
      />
    </van-popup>
  </div>
</template>

<script>
import MusicDetail from "@/components/Item/MusicDetail.vue";
import { mapMutations, mapState } from "vuex";
export default {
  components: { MusicDetail },
  data() {
    return {
      timer: 0,
    };
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "songDetailShow"]),
  },
  methods: {
    play() {
      // 判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play(); //播放ing
        this.updateIsbtnShow(false); //让播放按钮显示
        this.updateTime(); //当前歌曲时间显示
      } else {
        this.$refs.audio.pause(); //暂停
        this.updateIsbtnShow(true); //让播放按钮隐藏
        clearInterval(this.timer);
      }
    },
    updateTime() {
      this.timer = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000);
    },
    addDuration() {
      this.updateDuration(this.$refs.audio.duration);
    },

    ...mapMutations([
      "updateIsbtnShow",
      "updateSongDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
  },
  watch: {
    // 点击触发

    playListIndex() {
      //监听 歌曲 索引值改变 自动播放
      this.$refs.audio.autoplay = true;
      //让播放按钮显示
      if (this.$refs.audio.paused) {
        this.updateIsbtnShow(false);
      }
    },
    playList() {
      if (this.isbtnShow) {
        //暂停状态
        this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      }
    },
  },
  mounted() {
    console.log(this.$refs);
    this.$store.dispatch("getSongLyric", this.playList[this.playListIndex].id);
    // this.updateTime(); //当前歌曲时间显示
  },
  updated() {
    this.$store.dispatch("getSongLyric", this.playList[this.playListIndex].id);
    this.addDuration();
  },
};
</script>

<style scoped lang="less">
.footerMusic {
  width: 100%;
  height: 1.3rem;
  background-color: #fff;
  border: 1px solid #999;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;
  .footerMusic-left {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    div {
      h4 {
        font-weight: 700;
      }
    }
  }
  .footerMusic-right {
    width: 16%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>