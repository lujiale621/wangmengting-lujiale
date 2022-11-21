<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import BetterScroll from "better-scroll";
import furniturncontein from "./furniturncontein.vue";
// init Swiper:
import type { SpriteEntry } from "../systems/obj";
// import { Sprite } from "pixi.js";
// let spritelist: Array<spriteobj>
const count = ref(0);
// let spobj: SpriteEntry;
const widtha = ref(1);
const heightb = ref(1);
let bs = new BetterScroll(".wrapper", {
  movable: true,
  zoom: true,
  scrollY: true,
  click: true,
});

defineProps<{ msg: string; splist: Array<SpriteEntry> }>();
onMounted(() => {
  widtha.value = window.screen.width;
  heightb.value = window.screen.height;
  console.log(widtha.value);
  let bs = new BetterScroll(".wrapper", {
    movable: true,
    zoom: true,
    scrollY: true,
    click: true,
  });
  console.log("onbagMounted");
});
</script>

<template>
  <div
    :style="'width:' + '70' + 'px' + ';' + 'height:' + heightb + 'px'"
    class="container"
  >
    <div class="contenter">
      <div class="furniturn">
        <div class="wrapper">
          <ul class="content">
            <li v-for="spobj in splist" :key="spobj.name">
              <furniturncontein :sp="spobj"></furniturncontein>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: bisque;

  display: flex;
  /* top: 0;
  bottom: 0; */
  position: absolute;
  top: 50%;
  left: 35px;
  transform: translate(-50%, -50%);
  /* bottom: 0px;
  left: 0px; */
  background-image: url("@/assets/swbg.png");
  background-size: 100% 100%;
  margin: auto;
  background-position: center;
}

.contenter {
  /* background-image: url("src/assets/swbg.png"); */
  /* height: 100%;
  width: 70px; */
  display: flex;
  position: absolute;
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  padding-right: 5px;
  transform: translate(-50%, -50%);
}

.furniturn {
  width: 100%;

  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.content {
  height: 100%;
  width: 100%;
  padding: 0%;
}
</style>
