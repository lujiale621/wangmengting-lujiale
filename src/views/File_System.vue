<script setup lang="ts">
import { AppIpfs } from "@/systems/ipfs";
import type { MFSEntry } from "ipfs-core-types/dist/src/files";
import { onMounted, onUpdated, reactive, ref, type Ref } from "vue";
// let result: Array<MFSEntry>;

const ongridclick = (event: MouseEvent, item: MFSEntry) => {
  console.log(event, item);
};
// let result: Array<MFSEntry>;

let result = reactive<MFSEntry[]>([]);

onMounted(() => {
  console.log("onMounted");
  console.log("ipfs-lsalldir:", "ipfs");
  result.length = 0;
  AppIpfs.lsalldir().then((entry) => {
    // result.push(entry[0]);
    result.push(...entry);
    console.log("ipfs-lsalldir:", result);
  });
  // result = reactive<MFSEntry[]>(await AppIpfs.lsalldir());
});
// onUpdated(async () => {
//   console.log("onUpdated");
//   result = reactive<MFSEntry[]>(await AppIpfs.lsalldir());
// });
</script>

<template>
  <van-row class="topbox">
    <van-col span="8" class="box"></van-col>
    <van-col span="8" class="box">File Systems</van-col>
    <van-col span="8" class="box"> </van-col>
  </van-row>
  <van-row>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="(item, idx) in result"
        :key="idx"
        icon="card"
        :text="item.name"
        clickable="true"
        @click="ongridclick($event, item)"
      ></van-grid-item>
    </van-grid>
  </van-row>
</template>

<style scoped>
.barright {
  /* text-align: center;
  display: inline; */
}
.topbox {
  background-color: rgba(250, 250, 250, 1);
  text-align: center;
}
.box {
  text-align: center;
  display: inline;
  height: 40px;
  padding: 5px 0;
}
</style>
