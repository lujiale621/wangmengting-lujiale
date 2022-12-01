<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import BetterScroll from "better-scroll";
import FurniturnContein from "../dd/FurniturnContein.vue";
// init Swiper:
import type { SpriteEntry } from "../systems/obj";
// import { Sprite } from "pixi.js";
// let spritelist: Array<spriteobj>
const count = ref(0);
// let spobj: SpriteEntry;
const widtha = ref(1);
const heightb = ref(1);

defineProps<{ msg: string; splist: Array<SpriteEntry> }>();
onMounted(() => {
  widtha.value = window.screen.width;
  heightb.value = window.screen.height;
  console.log(widtha.value);

  let bs = new BetterScroll(".wrapper", {
    movable: true,
    scrollbar: true,
    // zoom: true,
    scrollY: true,
    click: true,
    bounce: true,
    observeDOM: true,
    observeDOMImage: true,
  });
  console.log("onBagMounted");
  let timer = setTimeout(() => {
    //需要定时执行的代码
    console.log("Hello World");
    console.log("Hello World");
  }, 3000);
});
</script>

<template>
  <div
    :style="'width:' + '70' + 'px' + ';' + 'height:' + heightb + 'px'"
    class="wrapper"
  >
    <div class="cont">
      <div class="furniturn">
        <ul class="content">
          <li v-for="spobj in splist" :key="spobj.name">
            <FurniturnContein :sp="spobj"></FurniturnContein>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
li {
  margin: 0px;
  list-style: none;
}
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
