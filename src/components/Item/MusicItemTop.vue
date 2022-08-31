<template>
  <div class="musicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgImg" />
    <div class="itemLeft">
      <!-- 返回箭头 -->
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <!-- 搜索 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <!-- 列表 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
  </div>
  <div class="musicContent">
    <div class="musicContent-left">
      <img :src="playlist.coverImgUrl" alt="" />
      <span class="playCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-play"></use>
        </svg>
        {{ changeCount(playlist.playCount) }}
      </span>
    </div>
    <div class="musicContent-right">
      <h3>{{ playlist.name }}</h3>
      <div class="right_img">
        <img :src="playlist.creator.backgroundUrl" alt="" />
        <span>{{ playlist.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
      <div class="detail">
        <span>{{ playlist.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
    </div>
  </div>
  <div class="itemTopFooter">
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <span>{{ playlist.commentCount }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ playlist.shareCount }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>

<script>
import { changeCount } from "@/request/api/musicItem";
export default {
  name: "musicItemTop",
  setup(props) {
    // console.log(props);
    //传递数据没有渲染来的快 没有数据的话要从sessionsStroge里取
    // 通过props进行传值，判断如果数据拿不到，就获取sessionStorage中的
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem(props).playlist.creator
      );
    }
    return {
      changeCount,
    };
  },
  props: ["playlist"],
};
</script>
<style lang="less" scoped>
.musicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 0.2rem;
  position: relative;
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: #fff;
      font-size: 0.4rem;
    }
    .icon {
      //填充
      fill: #fff;
    }
  }
  .bgImg {
    width: 100%;
    height: 10rem;
    position: fixed;
    z-index: -1;
    filter: blur(20px);
  }
}
.musicContent {
  display: flex;
  width: 100%;
  height: 3rem;
  padding: 0.2rem;
  .musicContent-left {
    width: 40%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.3rem;
    }
    .playCount {
      display: flex;
      position: absolute;
      align-items: center;
      right: 0.2rem;
      top: 0;
      color: #fff;
      font-size: 0.2rem;
      .icon {
        fill: #fff;
        width: 0.26rem;
        height: 0.26rem;
      }
    }
  }
  .musicContent-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    height: 100%;
    margin-left: 0.4rem;
    .right_img {
      font-size: 0.3rem;
      font-weight: 900;
      color: #fff;
      font-family: "微软雅黑";
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 0.1rem;
      }
      .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.08rem;
        vertical-align: middle;
      }
    }
    .detail {
      display: flex;
      position: relative;
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        /* 弹性伸缩盒子模型显示 */
        display: -webkit-box;
        /* 限制在一个块元素显示的文本的行数 */
        -webkit-line-clamp: 2;
        /* 设置或检索伸缩盒对象的子元素的排列方式 */
        -webkit-box-orient: vertical;
        font-size: 0.24rem;
        color: #ccc;
      }
      .icon {
        position: absolute;
        top: 65%;
        right: -0.14rem;
        fill: #fff;
        width: 0.24rem;
        height: 0.24rem;
      }
    }
  }
}
.itemTopFooter {
  width: 100%;
  height: rem;
  display: flex;
  align-items: center;
  padding: 0.2rem;
  .footerItem {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
