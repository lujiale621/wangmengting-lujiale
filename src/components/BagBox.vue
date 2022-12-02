<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";

import FurniturnContein from "../dd/FurniturnContein.vue";
// init Swiper:
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

import type { SpriteEntry } from "../systems/obj";
// import { Sprite } from "pixi.js";
// let spritelist: Array<spriteobj>
const count = ref(0);
// let spobj: SpriteEntry;
const widtha = ref(1);
const heightb = ref(1);
// const swiper = new Swiper(".swiper", {
//   // Optional parameters
//   direction: "vertical",
//   loop: true,
// });
defineProps<{ msg: string; splist: Array<SpriteEntry> }>();
onMounted(() => {
  widtha.value = window.screen.width;
  heightb.value = window.screen.height;
  console.log(widtha.value);
  // SwiperCore.use([Pagination]);
  console.log("onBagMounted");
});
// const swiper = new Swiper(".swiper", {
//   // Optional parameters
//   direction: "vertical",
//   loop: true,
// });
</script>

<template>
  <div
    :style="'width:' + '70' + 'px' + ';' + 'height:' + heightb + 'px'"
    class="wrapper"
  >
    <!-- <div class="cont">
      <div class="furniturn"> -->
    <swiper
      :spaceBetween="2"
      :slidesPerView="heightb / 60"
      :freeMode="true"
      :loop="false"
      direction="vertical"
      class="content"
    >
      <swiper-slide v-for="spobj in splist" :key="spobj.name">
        <FurniturnContein :sp="spobj"></FurniturnContein>
      </swiper-slide>
    </swiper>
    <!-- </div>
    </div> -->
  </div>
</template>

<style scoped>
li {
  margin: 0px;
  list-style: none;
}
.content {
  /* height: 30px;
  width: 40px; */
}
/* swiper-slide swiper-slide-prev swiper-slide-active swiper-slide-next {
  margin: 5%;
  height: 50px !important;
  width: 50px !important;
} */
/*  */
.wrapper {
  background-color: bisque;

  display: flex;
  /* top: 0;
  bottom: 0; */
  position: absolute;
  top: 50%;
  left: 35px;
  transform: translate(-50%, -50%) !important;
  /* bottom: 0px;
  left: 0px; */
  background-image: url("@/assets/swbg.png");
  background-size: 100% 100%;

  background-position: center;
}

.cont {
  /* background-image: url("src/assets/swbg.png"); */

  display: flex;
  position: absolute;
  background-size: 100% 100%;
  /* height: 50px;
  width: 50px; */
  top: 50%;
  left: 10%;
  padding-right: 5px;
  transform: translate(-50%, -50%);
}

.furniturn {
  width: 100%;
  position: relative;
  display: flex;

  align-items: center;
}

.content {
  height: 100%;
  width: 100%;
  padding: 0%;
}
</style>
