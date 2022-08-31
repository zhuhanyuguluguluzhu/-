<template>
  <img :src="songDetail.al.picUrl" class="bigImg" alt="" />
  <div class="detailTop">
    <div class="detailTop-left">
      <svg class="icon" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="songMsg">
        <Vue3Marquee scrollamount="10">
          <h4>{{ songDetail.al.name }}</h4>
        </Vue3Marquee>

        <span v-for="item in songDetail.ar" :key="item.id">
          {{ item.name }}
        </span>
        <svg class="icon youjiantou1" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
      </div>
    </div>
    <div class="detailTop-right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow">
    <img
      src="@/assets/needle.png"
      alt=""
      class="needle"
      :class="{ needle_active: !isbtnShow }"
    />
    <img src="@/assets/cd.png" alt="" class="cd" />
    <img
      :src="songDetail.al.picUrl"
      alt=""
      class="author"
      :class="{ author_active: !isbtnShow, author_paused: isbtnShow }"
      @click="isLyricShow = true"
    />
  </div>
  <!-- 歌词部分的显示 -->
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
    <p
      v-for="item in lyric"
      :key="item"
      :class="{
        active:
          currentTime * 1000 >= item.time && currentTime * 1000 < item.next,
      }"
    >
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="detailFooter-top">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <!-- 进度条 -->
    <div class="detailFooter-content">
      <input
        type="range"
        class="progress"
        min="0"
        :max="duration"
        v-model="currentTime"
        step=""
      />
    </div>

    <div class="detailFooter-footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg
        class="icon bofang"
        aria-hidden="true"
        @click="play"
        style="width: 1rem; height: 1rem"
        v-if="isbtnShow"
      >
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg
        class="icon bofang"
        aria-hidden="true"
        @click="play"
        style="width: 1rem; height: 1rem"
        v-else
      >
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
  props: ["songDetail", "isbtnShow", "play", "addDuration"],
  data() {
    return {
      isLyricShow: false,
    };
  },
  methods: {
    // 展示歌曲播放
    ...mapMutations([
      "updateSongDetailShow",
      "updatePlayListIndex",
      "updateDuration",
    ]),
    backHome() {
      this.isLyricShow = false;
      this.updateSongDetailShow();
    },
    goPlay(num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
  },
  components: {
    Vue3Marquee,
  },
  mounted() {
    console.log(this.songDetail);
    this.addDuration();
  },
  computed: {
    ...mapState([
      "lyricList",
      "currentTime",
      "playList",
      "playListIndex",
      "duration",
    ]),

    lyric() {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // console.log(min,sec,Number(mill),lrc);
          // console.log(time);
          return { min, sec, mill, lrc, time };
        });
        // 歌曲时间的设置
        arr.forEach((item, i) => {
          if (i === arr.length - 1) {
            item.next = 0; //结束重新播放
          } else {
            // 下一句歌词时间
            item.next = arr[i + 1].time;
          }
        });
      }
      // console.log(arr);
      return arr;
    },
  },
  watch: {
    currentTime(newValue) {
      // let p = document.querySelector("p.active");
      // if (p.offsetTop < 300) {
      //   this.$refs.musicLyric.offsetTopTop = p.offsetTop;
      // }

      if (newValue === this.newValue) {
        if ((this.playListIndex = this.playList.length - 1)) {
          this.updatePlayListIndex(0);
          this.play()
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.bigImg {
  width: 100%;
  height: 100%;
  filter: blur(50px);
  position: absolute;
  z-index: -1;
}
.detailTop {
  display: flex;
  width: 100%;
  height: 1rem;
  justify-content: space-between;
  padding: 0.2rem;
  // background-color: pink;
  .detailTop-left {
    display: flex;
    align-items: center;
    color: #fff;
    .icon {
      fill: #fff;
    }
    .songMsg {
      width: 2rem;
      height: 100%;
      margin-left: 0.3rem;
      span {
        color: #999;
      }
      .youjiantou1 {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
  .detailTop-right {
    .icon {
      fill: #fff;
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  align-items: center;
  position: relative;
  .needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    top: 0;
    transform-origin: 0 0;
    transform: rotate(-15deg);
    transition: all 2s;
  }
  .needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    top: 0;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
  .author {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    left: 30%;

    animation: rotate_ar 10s linear infinite;
  }
  .author_active {
    animation-play-state: running;
  }
  .author_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 9.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  position: absolute;
  p {
    color: black;
    margin-top: 0.3rem;
    font-size: 0.4rem;
  }
  .active {
    color: #fff;
    font-size: 0.55rem;
    transition: all 0.35s ease-in;
    text-align: center;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  .detailFooter-top {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .detailFooter-content {
    width: 100%;
    height: 1rem;
    .progress {
      width: 100%;
      height: 0.04rem;
    }
  }

  .detailFooter-footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.7rem;
      height: 0.7rem;
    }
  }
}
</style>
