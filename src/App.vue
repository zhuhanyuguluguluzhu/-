<template>
  <router-view />
  <footerMusic v-show="$store.state.isFooterShow" />
</template>
<script>
import footerMusic from "@/components/Item/FooterMusic.vue";
export default {
  components: { footerMusic },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
// 1 rem = 50px
.icon {
  width: 0.5rem;
  height: 0.5rem;
}
a {
  color: black;
}
</style>
