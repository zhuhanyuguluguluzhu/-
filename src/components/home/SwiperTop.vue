<template>
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from "@/request/api/home";
import { reactive, onMounted } from "vue";

export default {
  setup() {
    const state = reactive({
      images: [],
    });
    onMounted(async () => {
      let response = await getBanner();
      console.log(response);
      state.images = response.data.banners;
    });

    return { state };
  },
};
</script>

<style lang="less" scoped>
#swiperTop {
  .van-swipe {
    width: 100%;
    // padding: 0.2rem;
    .van-swipe__track {
      .van-swipe-item {
        img {
          width: 100%;
          height: 3rem;
        }
      }
    }
    /deep/.van-swipe__indicator--active {
      background-color: rgb(246, 15, 15);
    }
  }
}
</style>
