<template>
  <div class="topNav">
    <!-- 列表icon -->
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <div class="topContent">
      <span @click="$router.push('/infoUser')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <!-- 搜索icon -->
    <div class="topSearch">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.topNav {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .topContent {
    display: flex;
    width: 65%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.3rem;
    padding: 0.2rem;
  }
  .active {
    font-weight: 700;
  }
}
</style>
