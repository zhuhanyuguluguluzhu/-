<template>
  <MusicItemTop :playlist="playlist" />
  <MusicItemList
    :songlist="songlist"
    :subscribedCount="playlist.subscribedCount"
  />
</template>

<script>
import { useRouter } from "vue-router";
import { onMounted, reactive, toRef } from "vue";
import { getMusicItemList, getSongList } from "@/request/api/musicItem.js";
import MusicItemTop from "@/components/Item/MusicItemTop.vue";
import MusicItemList from "@/components/Item/MusicItmmList.vue";
export default {
  name: "MusicItem",
  components: { MusicItemTop, MusicItemList },
  setup() {
    const state = reactive({
      playlist: {},
      songlist: [],
    });
    onMounted(async () => {
      // 歌单的id
      let id = useRouter().currentRoute.value.query.id;
      // console.log(useRouter());
      // console.log(id);

      // 获取歌单详情
      let response = await getMusicItemList(id);
      // console.log(response.data.playlist.subscribedCount);
      state.playlist = response.data.playlist;

      // 获取歌曲列表
      let result = await getSongList(id);
      // console.log(result);
      state.songlist = result.data.playlist.tracks;
      console.log(state.songlist);

      // 防止页面刷新，数据丢失，将数据保存到sessionStorage中
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
    });
    return {
      playlist: toRef(state, "playlist"),
      songlist: toRef(state, "songlist"),
    };
  },
};
</script>

<style lang="less" scoped></style>
