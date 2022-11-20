<script setup lang="ts">
// import { ref } from "vue";
import { onMounted } from "vue";
import type { SpriteEntry } from "@/systems/obj";

const prop = defineProps<{ sp: SpriteEntry }>();

function clickfurn(e: TouchEvent) {
  console.log(e);
  e.changedTouches[0].pageX;
  console.log(
    "触摸事件 点击位置：",
    "pagex:",
    e.changedTouches[0].pageX,
    "pagey",
    e.changedTouches[0].pageY
  );
  console.log("click");
  console.log(prop.sp);
  //设置精灵为可编辑状态
  prop.sp.setspedit(true);
}

onMounted(() => {
  console.log("onMounted", prop.sp);
});
const imgUrl = new URL(prop.sp?.url, import.meta.url);
</script>

<template>
  <div
    @touchstart="clickfurn"
    class="box"
    :style="{ backgroundImage: 'url(' + prop.sp?.url + ')' }"
  ></div>
</template>

<style scoped>
.box {
  width: 50px;
  height: 50px;
  background-image: url("@/assets/furnbg.png");
  background-size: 100% 100%;
  transform: rotate(90deg);
  margin: 2px 2px;
  align-items: center;
}
</style>
