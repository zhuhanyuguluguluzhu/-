<template>
  <div class="songList">
    <div class="songListTop">
      <div class="songListTop-left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <span
          >播放全部<span>(共{{ songCount }}首)</span></span
        >
      </div>
      <div class="songListTop-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span>收藏({{ subscribedCount }})</span>
      </div>
    </div>

    <div class="songListContent">
      <div
        class="songItem"
        v-for="(song, index) in songlist"
        :key="song.id"
        @click="playMusic(index)"
      >
        <div class="songItem-left">
          <span class="song-index">{{ index + 1 }}</span>
          <p class="song-name">
            {{ song.name }}
            <span v-for="ar in song.ar" class="author">{{ ar.name }}</span>
          </p>
        </div>
        <div class="songItem-right">
          <svg class="icon play" aria-hidden="true" v-if="song.mv">
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from "@vue/runtime-core";
import { mapMutations } from "vuex";
export default {
  setup(props) {
    const songCount = computed(() => {
      return props.songlist.length;
    });
    return {
      songCount,
      ...toRefs(props),
    };
  },
  props: ["songlist", "subscribedCount"],
  methods: {
    playMusic(index) {
      // 传递歌单歌曲
      this.updatePlayList(this.songlist);
      // 传递歌单索引值
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex"]),
  },
};
</script>

<style scoped lang="less">
.songList {
  width: 100%;
  height: 15rem;
  background-color: #fff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .songListTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    .songListTop-left {
      .icon {
        vertical-align: middle;
        fill: #fff;
      }
      > span {
        font-size: 0.34rem;
        font-weight: 700;
        margin-left: 0.4rem;
        span {
          font-size: 0.24rem;
          font-weight: 400;
          color: #ccc;
        }
      }
    }
    .songListTop-right {
      display: flex;
      align-items: center;
      background-color: red;
      padding: 0.2rem;
      border-radius: 0.4rem;
      color: #fff;
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #fff;
        margin-right: 0.1rem;
        stroke: #fff;
        stroke-width: 50;
      }
    }
  }
  .songListContent {
    width: 100%;
    padding: 0.2rem;
    padding-top: 0;
    .songItem {
      width: 100%;
      height: 1.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .songItem-left {
        display: flex;
        align-items: center;
        .song-index {
          font-size: 0.4rem;
        }
        .song-name {
          margin-left: 0.4rem;
          font-size: 0.36rem;
          font-weight: 700;
          display: flex;
          flex-direction: column;
          .author {
            color: #ccc;
            font-size: 0.2rem;
            margin-top: 0.1rem;
          }
        }
      }
      .songItem-right {
        .play {
          margin-right: 0.1rem;
        }
      }
    }
  }
}
</style>
