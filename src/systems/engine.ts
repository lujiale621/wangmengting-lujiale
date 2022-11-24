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
  },
  getPixiApp() {
    return PixiApp;
  },
  getCanvas() {
    return PixiApp.view;
  },
  //加载精灵
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
      69 * wr
    );

    spritelist.push(fireplaceobj);
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
      138 * wr
    );

    // spritelist.push(picanspobj);
    console.log("Spritesheet ready to use!");
    //柜子
    guizi = new PIXI.Sprite(PIXI.Texture.from(guiziPath));
    const guiziobj: SpriteEntry = new SpriteEntry(
      guizi,
      guiziPath,
      "guizi",
      138 * wr
    );
    guizi.interactive = true;
    spritelist.push(guiziobj);
    guizi.name = "guizi";
    // xiaomihu.angle = 90;
    guizi.width = 138 * wr;
    guizi.height = 138 * wr;

    xiaomihu = new PIXI.Sprite(PIXI.Texture.from(xiaomihuPath));
    const xiaomihuobj: SpriteEntry = new SpriteEntry(
      xiaomihu,
      xiaomihuPath,
      "xiaomihu",
      69 * wr
    );
    spritelist.push(xiaomihuobj);
    xiaomihu.name = "xiaomihu";
    // xiaomihu.angle = 90;
    xiaomihu.width = 69 * wr;
    xiaomihu.height = 69 * wr;

    xiaosongshu = new PIXI.Sprite(PIXI.Texture.from(xiaosongshuPath));
    const xiaosongshuobj: SpriteEntry = new SpriteEntry(
      xiaosongshu,
      xiaosongshuPath,
      "xiaosongshu",
      69 * wr
    );
    //位置中y坐标为横屏横坐标 x坐标为屏幕宽度
    spritelist.push(xiaosongshuobj);
    xiaosongshu.name = "xiaosongshu";
    xiaosongshu.width = 59 * wr;
    xiaosongshu.height = 59 * wr;
    guiziobj.spgroup.angle = 90;
    guiziobj.spgroup.width = 138 * wr;
    guiziobj.spgroup.height = 138 * wr;
    assist.spsetpos(180, 700, guiziobj);

    picanspobj.spgroup.angle = 90;
    picanspobj.spgroup.width = 138 * wr;
    picanspobj.spgroup.height = 90 * wr;
    assist.spsetpos(300, 400, picanspobj);

    fireplaceobj.spgroup.angle = 90;
    fireplaceobj.spgroup.width = 138 * wr;
    fireplaceobj.spgroup.height = 138 * wr;
    assist.spsetpos(150, 500, fireplaceobj);
    xiaomihuobj.spgroup.angle = 90;
    xiaomihuobj.spgroup.width = 69 * wr;
    xiaomihuobj.spgroup.height = 69 * wr;
    assist.spsetpos(75, 250, xiaomihuobj);
    xiaosongshuobj.spgroup.angle = 90;
    xiaosongshuobj.spgroup.width = 69 * wr;
    xiaosongshuobj.spgroup.height = 69 * wr;
    assist.spsetpos(75, 330, xiaosongshuobj);

    xiaomihuobj.load();
    xiaosongshuobj.load();
    fireplaceobj.load();
    guiziobj.load();
    // picanspobj.load();
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
    });
  },
  getloadsprite() {
    return spritelist;
  },
};
