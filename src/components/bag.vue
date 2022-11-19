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
let bs = new BetterScroll(".wrapper", {
  movable: true,
  zoom: true,
  scrollY: true,
  click: true,
});

defineProps<{ msg: string; splist: Array<SpriteEntry> }>();

onMounted(() => {
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
  <div class="container">
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
  /* transform: rotate(90deg); */
  /* background-color: bisque; */
  height: 100%;
  width: 70px;
  display: flex;
  position: absolute;
  background-size: 100% 100%;
  top: 0px;
  left: 0px;
  /* background-image: url("src/assets/swbg.png"); */
}

.contenter {
  background-image: url("@/assets/swbg.png");
  /* background-color: bisque; */
  height: 100%;
  width: 70px;
  display: flex;
  position: absolute;
  background-size: 100% 100%;
  top: 0px;
  left: 0px;
}

.furniturn {
  width: 60px;
  margin: 6px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  max-width: 18rem;
}

.content {
  height: 100%;
  width: 50px;
  padding: 0%;
  margin: 2px;
}
</style>
