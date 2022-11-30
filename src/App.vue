<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import { PixiEngine } from "./systems/engine";
import { Spritesheet, AnimatedSprite } from "pixi.js";
import { Sound } from "@pixi/sound";
import bag from "./components/Bag.vue";
import type { SpriteEntry } from "./systems/obj";
import soundPath from "@/assets/bg.mp3";
import musicopenPath from "@/assets/musicopen.png";
import musicclosePath from "@/assets/musicclose.png";
import * as PIXI from "pixi.js";
import furSet from "@/assets/set.png";
import furSave from "@/assets/save.png";
import { Pixihttp } from "./systems/http";
// import furniturepath from "../src/assets/set.png"
let sound: Sound;
const canvas: Ref<Node | null> = ref(null);
// const music: Ref<HTMLElement | null> = ref(null);
// const bag: Ref<HTMLElement | null> = ref(null);
let spritelist: Array<SpriteEntry>;

const musicflag = ref(true);
const furnitureflag = ref(true);
const musicPath = ref(musicopenPath);

const furniturepath = ref(furSet);
const onMusic = () => {
  musicflag.value = !musicflag.value;

  musicPath.value = musicflag.value ? musicopenPath : musicclosePath;
  console.log(musicflag.value);
  if (musicflag.value == false) {
    console.log("music close");
    sound.stop();
  } else {
    console.log("music open");
    sound.play();
  }
};
const onsetfurniture = () => {
  console.log(furnitureflag.value);
  furnitureflag.value = !furnitureflag.value;
  furniturepath.value = furnitureflag.value ? furSet : furSave;
  if (furnitureflag.value) {
    for (let i = 0; i < spritelist.length; i++) {
      spritelist[i].setspedit(false);
      console.log("关闭精灵编辑状态：", spritelist[i]);
      Pixihttp.updatasprite(spritelist[i]);
    }
    //关闭家具选择框
  } else {
    //弹出家具选择框
  }
};
onMounted(async () => {
  let widtha = window.screen.width;
  let heightb = window.screen.height;
  if (widtha > heightb) {
    console.log("横屏");
  } else {
    console.log("竖屏");
  }

  sound = Sound.from({
    url: soundPath,
    volume: 0.25,
    autoPlay: true,
    loaded: function () {
      console.log("Sound loaded");
    },
    complete: function () {
      console.log("Sound finished");
    },
  });
  sound.play();
  await PixiEngine.init(window.screen.width, window.screen.height);
  const canvasInfo = PixiEngine.getCanvas();
  // @ts-ignore
  canvas.value?.appendChild(canvasInfo);

  PixiEngine.loadobj(window.screen.width, window.screen.height);
  PixiEngine.tickinit();
  PixiEngine.loadeventlisten();
  spritelist = PixiEngine.getloadsprite();
  console.log("load sprite", spritelist);
});
</script>

<template>
  <div class="root">
    <div class="main-canvas" ref="canvas"></div>
    <div
      class="setfurniture"
      :class="{ openfurn: furnitureflag, closefurn: !furnitureflag }"
      :style="{ backgroundImage: 'url(' + furniturepath + ')' }"
      @click="onsetfurniture"
    ></div>
    <div
      ref="music"
      :style="{ backgroundImage: 'url(' + musicPath + ')' }"
      class="setmusicbuttom"
      @click="onMusic"
    ></div>
    <bag msg="asd" :splist="spritelist" v-if="!furnitureflag"></bag>
  </div>
</template>

<style scoped>
.setfurniture {
  /* background-image: url("src/assets/set.png"); */
  background-color: rgba(255, 255, 255, 0);
  width: 3.5rem;
  height: 3.5rem;
  background-size: 100% 100%;
  position: absolute;
  bottom: 50px;
  left: 10px;
  transform: rotate(90deg);
}

.closefurn {
  left: 80px;
}

.setmusicbuttom {
  /* background-image: url("src/assets/musicopen.png"); */
  background-color: rgba(255, 255, 255, 0);
  width: 2.5rem;
  height: 2.5rem;
  background-size: 100% 100%;
  position: absolute;
  bottom: 50px;
  right: 20px;
  transform: rotate(90deg);
}
</style>
