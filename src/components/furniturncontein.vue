<script setup lang="ts">
// import { ref } from "vue";
import { onMounted } from "vue";
import type { SpriteEntry } from "@/systems/obj";

const prop = defineProps<{ sp: SpriteEntry }>();

function clickfurn() {
  console.log("click");
  console.log(prop.sp);
}

onMounted(() => {
  console.log("onMounted", prop.sp);
});
const imgUrl = new URL(prop.sp?.url, import.meta.url);
</script>

<template>
  <div
    @click="clickfurn"
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
