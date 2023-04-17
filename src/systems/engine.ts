import * as PIXI from "pixi.js";
import { ImageResource, Resource, Sprite } from "pixi.js";
import { SpriteEntry } from "./obj";
import { Spritesheet, AnimatedSprite } from "pixi.js";
import fireplacePath from "@/assets/fireplace/fireplace.png";
import biluPath from "@/assets/fireplace/bilu.png";
import fireplacePathJS from "@/assets/fireplace/fireplace.json";
import guiziPath from "@/assets/guizi.png";
import xiaomihuPath from "@/assets/xiaomihu.png";
import xiaosongshuPath from "@/assets/xiaosongshu.png";
import bedPath from "@/assets/bed.png";
import qiaokeliPath from "@/assets/qiaokeli.png";
import doudouPath from "@/assets/doudou.png";
import rabbitPath from "@/assets/rabbit.png";

import wendujiPath from "@/assets/wenduji/wenduji.png";
import wendujiPathgif from "@/assets/wenduji/wenduji.gif";
import wendujiPathJS from "@/assets/wenduji/wenduji.json";
import luohuaPath from "@/assets/luohua/luohua.png";
import luohuaPathGIF from "@/assets/luohua/luohua.gif";
import luohuaPathJS from "@/assets/luohua/luohua.json";
import yinghuashuPath from "@/assets/yinghuashu/yinghuashu.png";
import yinghuashuPathGIF from "@/assets/yinghuashu/yinghuashu.gif";
import yinghuashuPathJS from "@/assets/yinghuashu/yinghuashu.json";
import huaPath from "@/assets/hua/hua.png";
import huaPathGIF from "@/assets/hua/hua.gif";
import huaPathJS from "@/assets/hua/hua.json";
import heyePath from "@/assets/heye/heye.png";
import heyePathGIF from "@/assets/heye/heye.gif";
import heyePathJS from "@/assets/heye/heye.json";
import xiaocaoPath from "@/assets/xiaocao/xiaocao.png";
import xiaocaoPathGIF from "@/assets/xiaocao/xiaocao.gif";
import xiaocaoPathJS from "@/assets/xiaocao/xiaocao.json";
import caocongPath from "@/assets/caocong/caocong.png";
import caocongPathGIF from "@/assets/caocong/caocong.gif";
import caocongPathJS from "@/assets/caocong/caocong.json";
import shizhongPath from "@/assets/shizhong/shizhong.png";
import shizhongPathGIF from "@/assets/shizhong/shizhong.gif";
import shizhongPathJS from "@/assets/shizhong/shizhong.json";
import guoPath from "@/assets/guo/guo.png";
import guoPathGIF from "@/assets/guo/guo.gif";
import guoPathJS from "@/assets/guo/guo.json";
import shafaPath from "@/assets/shafa.png";
import axiPath from "@/assets/axi.png";
import bingxiangPath from "@/assets/bingxiang.png";
import chuguiPath from "@/assets/chugui.png";
import shujiaPath from "@/assets/shujia.png";
import topguiPath from "@/assets/topgui.png";
import matongPath from "@/assets/matong.png";
import xishoupenPath from "@/assets/xishoupen.png";
import chuanghuPath from "@/assets/chuanghu.png";
import xiaoguiziPath from "@/assets/xiaoguizi.png";
import yiguiPath from "@/assets/yigui.png";
import maojingPath from "@/assets/maojing.png";
import shengdanshuPath from "@/assets/shengdanshu/shengdanshu.png";
import shengdanshuPathGIF from "@/assets/shengdanshu/shengdanshu.gif";
import shengdanshuPathJS from "@/assets/shengdanshu/shengdanshu.json";
import shuPath from "@/assets/shu/shu.png";
import shuPathGIF from "@/assets/shu/shu.gif";
import shuPathJS from "@/assets/shu/shu.json";
import huapenPath from "@/assets/huapen/huapen.png";
import huapenPathGIF from "@/assets/huapen/huapen.gif";
import huapenPathJS from "@/assets/huapen/huapen.json";
import { assist } from "./assist";
import { Pixihttp } from "./http";
import { tool } from "./tools";
import { AppIpfs } from "./ipfs";
const spritelist: Array<SpriteEntry> = new Array<SpriteEntry>();
let PixiApp: PIXI.Application;
let wr = 0;
let hr = 0;
let xiaomihu: PIXI.Sprite;
let xiaosongshu: PIXI.Sprite;
let guizi: PIXI.Sprite;
let bgheigth: number;
let bgwidth: number;
let scwidth: number;
let scheight: number;
export const PixiEngine = {
  init(width: number, height: number) {
    //屏幕和位置参数的设置
    const da: Array<number> = assist.initpardata(width, height);
    scwidth = da[0];
    scheight = da[1];
    //背景高度是屏幕高度 是背景图片的宽度
    bgheigth = da[2];
    bgwidth = da[3];
    wr = da[4];
    hr = da[5];
    console.log("屏幕伸缩比-x：", wr, "y：", hr);
    if (typeof PixiApp !== "undefined") {
      PixiApp.destroy();
    }
    PixiApp = new PIXI.Application({
      width: width,
      height: height,
      antialias: true,
      backgroundColor: 0x2980b9,
      backgroundAlpha: 0.2,
      resolution: 1,
    });
    this.testapi();
  },
  testapi() {},

  getPixiApp() {
    return PixiApp;
  },
  getCanvas() {
    return PixiApp.view;
  },
  getwr() {
    return wr;
  }, //加载精灵
  loadobj(scwidth: number, scheight: number) {
    assist.backgroundinit();
    //huapen
    const huapensheet = new Spritesheet(
      PIXI.Texture.from(huapenPath),
      huapenPathJS
    );
    huapensheet.parse();
    const huapensp = new AnimatedSprite(
      huapensheet.animations["24afb299ff52c2481dfd0c991cb8d57a"]
    );
    huapensp.animationSpeed = 0.05;

    huapensp.loop = true;
    huapensp.gotoAndPlay(0);
    const huapenobj: SpriteEntry = new SpriteEntry(
      huapensp,
      huapenPathGIF,
      "huapen",
      20,
      200,
      70,
      70
    );
    //shu
    const shusheet = new Spritesheet(PIXI.Texture.from(shuPath), shuPathJS);
    shusheet.parse();
    const shusp = new AnimatedSprite(
      shusheet.animations["f31b4a9dae7041e171ce5a56dda5d8a"]
    );
    shusp.animationSpeed = 0.05;

    shusp.loop = true;
    shusp.gotoAndPlay(0);
    const shuobj: SpriteEntry = new SpriteEntry(
      shusp,
      shuPathGIF,
      "shu",
      50,
      200,
      70,
      70
    );
    //guo
    const guosheet = new Spritesheet(PIXI.Texture.from(guoPath), guoPathJS);
    guosheet.parse();
    const guosp = new AnimatedSprite(
      guosheet.animations["2424c7ec7ae01964a42dd618c0ce5aa"]
    );
    guosp.animationSpeed = 0.05;

    guosp.loop = true;
    guosp.gotoAndPlay(0);
    const guoobj: SpriteEntry = new SpriteEntry(
      guosp,
      guoPathGIF,
      "guo",
      100,
      200,
      70,
      70
    );
    //时钟
    const shizhongsheet = new Spritesheet(
      PIXI.Texture.from(shizhongPath),
      shizhongPathJS
    );
    shizhongsheet.parse();
    const shizhongsp = new AnimatedSprite(
      shizhongsheet.animations["568c24782fd06ec7702575a324caccf"]
    );
    shizhongsp.animationSpeed = 0.005;

    shizhongsp.loop = true;
    shizhongsp.gotoAndPlay(0);
    const shizhongobj: SpriteEntry = new SpriteEntry(
      shizhongsp,
      shizhongPathGIF,
      "shizhong",
      100,
      100,
      50,
      50
    );
    //小草
    const xiaocaosheet = new Spritesheet(
      PIXI.Texture.from(xiaocaoPath),
      xiaocaoPathJS
    );
    xiaocaosheet.parse();
    const xiaocaosp = new AnimatedSprite(
      xiaocaosheet.animations["3e72d2305d5b8bb138068391c68452b"]
    );
    xiaocaosp.animationSpeed = 0.05;

    xiaocaosp.loop = true;
    xiaocaosp.gotoAndPlay(0);
    const xiaocaoobj: SpriteEntry = new SpriteEntry(
      xiaocaosp,
      xiaocaoPathGIF,
      "xiaocao",
      250,
      400,
      100,
      50
    );
    //草丛
    const caocongsheet = new Spritesheet(
      PIXI.Texture.from(caocongPath),
      caocongPathJS
    );
    caocongsheet.parse();
    const caocongsp = new AnimatedSprite(
      caocongsheet.animations["5e3b4c18753c3b6f9125bc6ca3d5f79c"]
    );
    caocongsp.animationSpeed = 0.05;

    caocongsp.loop = true;
    caocongsp.gotoAndPlay(0);
    const caocongobj: SpriteEntry = new SpriteEntry(
      caocongsp,
      caocongPathGIF,
      "caocong",
      450,
      100,
      100,
      100
    );
    //荷叶
    const heyesheet = new Spritesheet(PIXI.Texture.from(heyePath), heyePathJS);
    heyesheet.parse();
    const heyesp = new AnimatedSprite(
      heyesheet.animations["3d6cb1337a4516bbd5d425f2f7a05b"]
    );
    heyesp.animationSpeed = 0.05;

    heyesp.loop = true;
    heyesp.gotoAndPlay(0);
    const heyeobj: SpriteEntry = new SpriteEntry(
      heyesp,
      heyePathGIF,
      "heye",
      350,
      400,
      100,
      100
    );
    //花盆
    const huasheet = new Spritesheet(PIXI.Texture.from(huaPath), huaPathJS);
    huasheet.parse();
    const huasp = new AnimatedSprite(
      huasheet.animations["2a4437fb90f7169cb29a9ad86cfee13f"]
    );
    huasp.animationSpeed = 0.05;

    huasp.loop = true;
    huasp.gotoAndPlay(0);
    const huaobj: SpriteEntry = new SpriteEntry(
      huasp,
      huaPathGIF,
      "hua",
      250,
      300,
      100,
      100
    );
    //樱花树
    const yinghuashusheet = new Spritesheet(
      PIXI.Texture.from(yinghuashuPath),
      yinghuashuPathJS
    );
    yinghuashusheet.parse();
    const yinghuashusp = new AnimatedSprite(
      yinghuashusheet.animations["0fce7ce5942b91467435bcbbeeae7cbe"]
    );
    yinghuashusp.animationSpeed = 0.01;

    yinghuashusp.loop = true;
    yinghuashusp.gotoAndPlay(0);
    const yinghuashuobj: SpriteEntry = new SpriteEntry(
      yinghuashusp,
      yinghuashuPathGIF,
      "yinghuashu",
      150,
      600,
      300,
      200
    );
    //落花

    const luohuasheet = new Spritesheet(
      PIXI.Texture.from(luohuaPath),
      luohuaPathJS
    );
    luohuasheet.parse();
    const luohuasp = new AnimatedSprite(
      luohuasheet.animations["0fb2d1232966ba7925141896913d3a"]
    );
    luohuasp.animationSpeed = 0.05;

    luohuasp.loop = true;
    luohuasp.gotoAndPlay(0);
    const luohuaobj: SpriteEntry = new SpriteEntry(
      luohuasp,
      luohuaPathGIF,
      "luohua",
      150,
      600,
      90,
      90
    );
    //圣诞树
    const shengdanshusheet = new Spritesheet(
      PIXI.Texture.from(shengdanshuPath),
      shengdanshuPathJS
    );
    shengdanshusheet.parse();
    const shengdanshusp = new AnimatedSprite(
      shengdanshusheet.animations["5b7e1c57461cad9bcb5007d070c101a"]
    );
    shengdanshusp.animationSpeed = 0.01;

    shengdanshusp.loop = true;
    shengdanshusp.gotoAndPlay(0);
    const shengdanshuobj: SpriteEntry = new SpriteEntry(
      shengdanshusp,
      shengdanshuPathGIF,
      "shengdanshu",
      350,
      600,
      120,
      180
    );
    //温度计
    const wendujisheet = new Spritesheet(
      PIXI.Texture.from(wendujiPath),
      wendujiPathJS
    );
    wendujisheet.parse();
    const wendujiansp = new AnimatedSprite(
      wendujisheet.animations["0ee4442ef715642a383c7e1055887d7d"]
    );
    wendujiansp.animationSpeed = 0.01;

    wendujiansp.loop = true;
    wendujiansp.gotoAndPlay(0);
    const wendujiobj: SpriteEntry = new SpriteEntry(
      wendujiansp,
      wendujiPathgif,
      "wenduji",
      150,
      600,
      90,
      90
    );
    //壁炉
    const sheet = new Spritesheet(
      PIXI.Texture.from(fireplacePath),
      fireplacePathJS
    );

    sheet.parse();
    const ansp = new AnimatedSprite(sheet.animations["fireplace_wps图片"]);
    ansp.animationSpeed = 0.2;

    ansp.loop = true;
    ansp.gotoAndPlay(0);
    const fireplaceobj: SpriteEntry = new SpriteEntry(
      ansp,
      biluPath,
      "fireplace",
      150,
      500,
      138,
      138
    );

    // spritelist.push(picanspobj);
    console.log("Spritesheet ready to use!");
    //沙发
    const shafa = new PIXI.Sprite(PIXI.Texture.from(shafaPath));
    const shafaobj: SpriteEntry = new SpriteEntry(
      shafa,
      shafaPath,
      "shafa",
      300,
      700,
      200,
      100
    );
    //沙发
    const shujia = new PIXI.Sprite(PIXI.Texture.from(shujiaPath));
    const shujiaobj: SpriteEntry = new SpriteEntry(
      shujia,
      shujiaPath,
      "shujia",
      100,
      700,
      100,
      50
    );
    //沙发
    const topgui = new PIXI.Sprite(PIXI.Texture.from(topguiPath));
    const topguiobj: SpriteEntry = new SpriteEntry(
      topgui,
      topguiPath,
      "topgui",
      130,
      300,
      120,
      60
    );
    //橱柜
    const chugui = new PIXI.Sprite(PIXI.Texture.from(chuguiPath));
    const chuguiobj: SpriteEntry = new SpriteEntry(
      chugui,
      chuguiPath,
      "chugui",
      450,
      700,
      100,
      100
    );
    //衣柜
    const yigui = new PIXI.Sprite(PIXI.Texture.from(yiguiPath));
    const yiguiobj: SpriteEntry = new SpriteEntry(
      yigui,
      yiguiPath,
      "yigui",
      100,
      300,
      80,
      120
    );
    const axi = new PIXI.Sprite(PIXI.Texture.from(axiPath));
    const axiobj: SpriteEntry = new SpriteEntry(
      axi,
      axiPath,
      "axi",
      100,
      300,
      80,
      50
    );
    //小柜
    const xiaoguizi = new PIXI.Sprite(PIXI.Texture.from(xiaoguiziPath));
    const xiaoguiziobj: SpriteEntry = new SpriteEntry(
      xiaoguizi,
      xiaoguiziPath,
      "xiaoguizi",
      150,
      420,
      100,
      100
    );
    //床
    const bed = new PIXI.Sprite(PIXI.Texture.from(bedPath));
    const bedobj: SpriteEntry = new SpriteEntry(
      bed,
      bedPath,
      "bed",
      150,
      420,
      160,
      160
    );
    //床
    const qiaokeli = new PIXI.Sprite(PIXI.Texture.from(qiaokeliPath));
    const qiaokeliobj: SpriteEntry = new SpriteEntry(
      qiaokeli,
      qiaokeliPath,
      "qiaokeli",
      150,
      370,
      50,
      50
    );
    //床
    const doudou = new PIXI.Sprite(PIXI.Texture.from(doudouPath));
    const doudouobj: SpriteEntry = new SpriteEntry(
      doudou,
      doudouPath,
      "doudou",
      150,
      250,
      50,
      50
    );
    //床
    const rabbit = new PIXI.Sprite(PIXI.Texture.from(rabbitPath));
    const rabbitobj: SpriteEntry = new SpriteEntry(
      rabbit,
      rabbitPath,
      "rabbit",
      150,
      120,
      50,
      50
    );

    //bingxiang
    const bingxiang = new PIXI.Sprite(PIXI.Texture.from(bingxiangPath));
    const bingxiangobj: SpriteEntry = new SpriteEntry(
      bingxiang,
      bingxiangPath,
      "bingxiang",
      550,
      700,
      100,
      200
    );
    //柜子
    guizi = new PIXI.Sprite(PIXI.Texture.from(guiziPath));
    const guiziobj: SpriteEntry = new SpriteEntry(
      guizi,
      guiziPath,
      "guizi",
      180,
      700,
      138,
      138
    );
    const matong = new PIXI.Sprite(PIXI.Texture.from(matongPath));
    const matongobj: SpriteEntry = new SpriteEntry(
      matong,
      matongPath,
      "matong",
      300,
      100,
      50,
      50
    );
    const chuanghu = new PIXI.Sprite(PIXI.Texture.from(chuanghuPath));
    const chuanghuobj: SpriteEntry = new SpriteEntry(
      chuanghu,
      chuanghuPath,
      "chuanghu",
      300,
      100,
      60,
      60
    );
    const maojing = new PIXI.Sprite(PIXI.Texture.from(maojingPath));
    const maojingobj: SpriteEntry = new SpriteEntry(
      maojing,
      maojingPath,
      "maojing",
      200,
      100,
      50,
      50
    );
    const xishoupen = new PIXI.Sprite(PIXI.Texture.from(xishoupenPath));
    const xishoupenobj: SpriteEntry = new SpriteEntry(
      xishoupen,
      xishoupenPath,
      "xishoupen",
      300,
      100,
      70,
      70
    );

    guizi.name = "guizi";
    // xiaomihu.angle = 90;
    guizi.width = 138 * wr;
    guizi.height = 138 * wr;

    xiaomihu = new PIXI.Sprite(PIXI.Texture.from(xiaomihuPath));
    const xiaomihuobj: SpriteEntry = new SpriteEntry(
      xiaomihu,
      xiaomihuPath,
      "xiaomihu",
      75,
      250,
      69,
      69
    );
    xiaomihu.name = "xiaomihu";
    // xiaomihu.angle = 90;
    xiaomihu.width = 69 * wr;
    xiaomihu.height = 69 * wr;

    xiaosongshu = new PIXI.Sprite(PIXI.Texture.from(xiaosongshuPath));
    const xiaosongshuobj: SpriteEntry = new SpriteEntry(
      xiaosongshu,
      xiaosongshuPath,
      "xiaosongshu",
      75,
      330,
      69,
      69
    );

    //信息初始化区
    this.loadsp(wendujiobj);
    this.loadsp(fireplaceobj);
    this.loadsp(guiziobj);
    this.loadsp(xiaomihuobj);
    this.loadsp(xiaosongshuobj);
    this.loadsp(luohuaobj);
    this.loadsp(yinghuashuobj);
    this.loadsp(huaobj);
    this.loadsp(heyeobj);
    this.loadsp(xiaocaoobj);
    this.loadsp(caocongobj);
    this.loadsp(shizhongobj);
    this.loadsp(guoobj);
    this.loadsp(huapenobj);
    this.loadsp(shuobj);
    this.loadsp(shafaobj);
    this.loadsp(chuguiobj);
    this.loadsp(bingxiangobj);
    this.loadsp(shujiaobj);
    this.loadsp(topguiobj);
    this.loadsp(xiaoguiziobj);
    this.loadsp(yiguiobj);
    this.loadsp(axiobj);
    this.loadsp(matongobj);
    this.loadsp(maojingobj);
    this.loadsp(xishoupenobj);
    this.loadsp(chuanghuobj);
    this.loadsp(shengdanshuobj);
    this.loadsp(bedobj);
    this.loadsp(qiaokeliobj);
    this.loadsp(doudouobj);
    this.loadsp(rabbitobj);

    // picanspobj.load();
  },
  loadsp(spobj: SpriteEntry) {
    assist.toloadsp(spobj);
    spritelist.push(spobj);
    spobj.load();
  },
  //加载监听器
  loadeventlisten() {
    //缩放事件
    window.addEventListener("mousewheel", (event: any) => {
      console.log("mousewheel");
      const step = event.wheelDelta > 0 ? 0.1 : -0.1;
      if (PixiApp.stage.scale.x + step >= 0.1) {
        PixiApp.stage.scale.x += step;
        PixiApp.stage.scale.y += step;
      }
    });
  },

  tickinit() {
    PixiApp.ticker.add((delta) => {
      // console.log("ricker");
      //触碰边缘回弹
      assist.sprebackregister(PixiApp.stage.getChildByName("xiaomihu"));
      assist.sprebackregister(PixiApp.stage.getChildByName("xiaosongshu"));
      assist.sprebackregister(PixiApp.stage.getChildByName("guizi"));
      assist.sprebackregister(PixiApp.stage.getChildByName("fireplace"));
      assist.sprebackregister(PixiApp.stage.getChildByName("wenduji"));
      assist.sprebackregister(PixiApp.stage.getChildByName("luohua"));
      assist.sprebackregister(PixiApp.stage.getChildByName("yinghuashu"));
      assist.sprebackregister(PixiApp.stage.getChildByName("hua"));
      assist.sprebackregister(PixiApp.stage.getChildByName("heye"));
      assist.sprebackregister(PixiApp.stage.getChildByName("xiaocao"));
      assist.sprebackregister(PixiApp.stage.getChildByName("caocong"));
      assist.sprebackregister(PixiApp.stage.getChildByName("shizhong"));
      assist.sprebackregister(PixiApp.stage.getChildByName("guo"));
      assist.sprebackregister(PixiApp.stage.getChildByName("huapen"));
      assist.sprebackregister(PixiApp.stage.getChildByName("shu"));
      assist.sprebackregister(PixiApp.stage.getChildByName("chugui"));
      assist.sprebackregister(PixiApp.stage.getChildByName("shafa"));
      assist.sprebackregister(PixiApp.stage.getChildByName("bingxiang"));
      assist.sprebackregister(PixiApp.stage.getChildByName("shujia"));
      assist.sprebackregister(PixiApp.stage.getChildByName("topgui"));
      assist.sprebackregister(PixiApp.stage.getChildByName("yigui"));
      assist.sprebackregister(PixiApp.stage.getChildByName("xiaoguizi"));
      assist.sprebackregister(PixiApp.stage.getChildByName("axi"));
      assist.sprebackregister(PixiApp.stage.getChildByName("maojing"));
      assist.sprebackregister(PixiApp.stage.getChildByName("matong"));
      assist.sprebackregister(PixiApp.stage.getChildByName("xishoupen"));
      assist.sprebackregister(PixiApp.stage.getChildByName("chuanghu"));
      assist.sprebackregister(PixiApp.stage.getChildByName("shengdanshu"));
      assist.sprebackregister(PixiApp.stage.getChildByName("bed"));
      assist.sprebackregister(PixiApp.stage.getChildByName("qiaokeli"));
      assist.sprebackregister(PixiApp.stage.getChildByName("rabbit"));
      assist.sprebackregister(PixiApp.stage.getChildByName("doudou"));
    });
  },

  getloadsprite() {
    return spritelist;
  },
};
