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
      69 * wr,
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
      138 * wr,
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
      138 * wr,
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
      69 * wr,
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
      69 * wr,
      75,
      330,
      69,
      69
    );

    //信息初始化区
    this.loadsp(fireplaceobj);
    this.loadsp(guiziobj);
    this.loadsp(xiaomihuobj);
    this.loadsp(xiaosongshuobj);
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
    });
  },
  getloadsprite() {
    return spritelist;
  },
};
