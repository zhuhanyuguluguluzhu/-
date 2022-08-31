<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input type="text" placeholder="赵雷" v-model="searchKey" />
    <button class="search" @click="search">Search</button>
  </div>
  <div class="searchHistory">
    <span style="font-weight: 700">历史</span>
    <span
      class="keyWord"
      v-for="item in keyWordList"
      :key="item"
      @click="searchHistory(item)"
      >{{ item }}</span
    >
    <svg class="icon" aria-hidden="true" @click="deleteKeyWord">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="songListContent">
    <div class="songItem" v-for="(song, index) in searchList" :key="song.id">
      <div class="songItem-left" @click="updateIndex(song)">
        <span class="song-index">{{ index + 1 }}</span>
        <p class="song-name">
          {{ song.name }}
          <span v-for="ar in song.artists" class="author">{{ ar.name }}</span>
        </p>
      </div>
      <div class="songItem-right">
        <svg class="icon play" aria-hidden="true" v-if="song.mvid">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearch } from "@/request/api/search.js";
export default {
  data() {
    return {
      keyWordList: [],
      searchKey: "",
      searchList: [],
    };
  },
  mounted() {
    this.keyWordList = JSON.parse(localStorage.getItem("keyWord"))
      ? JSON.parse(localStorage.getItem("keyWord"))
      : [];
  },
  methods: {
    async search() {
      this.keyWordList.unshift(this.searchKey.trim());
      //数组去重
      this.keyWordList = [...new Set(this.keyWordList)];
      console.log([...new Set(this.keyWordList)]);
      // 限制长度
      if (this.keyWordList.length > 5) {
        this.keyWordList.splice(-1);
      }

      // search 获取数据
      let res = await getSearch(this.searchKey);
      this.searchList = res.data.result.songs;
      console.log(res);
      console.log(this.searchList);

      // 本地存储
      localStorage.setItem("keyWord", JSON.stringify(this.keyWordList));
      this.searchKey = "";
    },
    deleteKeyWord() {
      localStorage.removeItem("keyWordList");
      this.keyWordList = [];
    },
    async searchHistory(item) {
      let res = await getSearch(item);
      this.searchList = res.data.result.songs;
      console.log(this.searchList);
    },
    updateIndex(item) {
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      this.$store.commit("pushPlayList", item);
      this.$store.commit(
        "updatePlayListIndex",
        this.$store.state.playList.length - 1
      );
    },
  },
};
</script>

<style scoped lang="less">
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.4rem;
    width: 70%;
    border: none;
    border-bottom: 0.04rem solid #ccc;
    padding: 0.1rem;
  }
  .search {
    padding: 0.1rem;
    border-radius: 0.6rem;
    border: 1px solid silver;
    box-shadow: 0.01rem 0.01rem 0.04rem;
  }
}
.searchHistory {
  padding: 0.2rem;
  position: relative;
  .keyWord {
    padding: 0.1rem;
    background-color: rgb(236, 62, 62);
    border-radius: 0.8rem;
    color: #fff;
    margin: 5px 10px;
    display: inline-block;
  }
  .icon {
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    right: 0.24rem;
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
</style>
