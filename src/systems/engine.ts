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
import picturePath from "@/assets/picture/picture.png";
import picturePath2 from "@/assets/picture/picture2.png";
import picturePathJS from "@/assets/picture/picture.json";
import wendujiPath from "@/assets/wenduji/wenduji.png";
import wendujiPath2 from "@/assets/wenduji/wenduji2.png";
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
import { assist } from "./assist";
import { Pixihttp } from "./http";
import { tool } from "./tools";
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
    this.testapi();
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
  },
  testapi() {
    Pixihttp.getspritedata();
  },

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
    shizhongsp.interactive = true;
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
    xiaocaosp.interactive = true;
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
    caocongsp.interactive = true;
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
    heyesp.interactive = true;
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
    huasp.interactive = true;
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
    yinghuashusp.animationSpeed = 0.08;
    yinghuashusp.interactive = true;
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
    luohuasp.interactive = true;
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
    wendujiansp.interactive = true;
    wendujiansp.loop = true;
    wendujiansp.gotoAndPlay(0);
    const wendujiobj: SpriteEntry = new SpriteEntry(
      wendujiansp,
      wendujiPath2,
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
    ansp.interactive = true;
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

    //画
    const picsheet = new Spritesheet(
      PIXI.Texture.from(picturePath),
      picturePathJS
    );

    picsheet.parse();
    const picansp = new AnimatedSprite(
      picsheet.animations["070e35bd86e25290dac7286ec8e63563_wps图片"]
    );
    picansp.animationSpeed = 0.2;
    picansp.interactive = true;
    picansp.loop = true;
    // picansp.gotoAndPlay(0);
    picansp.name = "picture";

    const picanspobj: SpriteEntry = new SpriteEntry(
      picansp,
      picturePath2,
      "picture",
      300,
      400,
      138,
      90
    );

    // spritelist.push(picanspobj);
    console.log("Spritesheet ready to use!");
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
    guizi.interactive = true;

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
    // picanspobj.load();
  },
  loadsp(spobj: SpriteEntry) {
    assist.toloadsp(spobj);
    spritelist.push(spobj);
    spobj.load();
  },
  //加载监听器
  loadeventlisten() {
    xiaomihu.interactive = true;
    xiaosongshu.interactive = true;

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
    });
  },

  getloadsprite() {
    return spritelist;
  },
};
