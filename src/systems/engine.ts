import * as PIXI from "pixi.js";
import { ImageResource, Resource } from "pixi.js";
import { SpriteEntry } from "./obj";

import xiaomihuPath from "@/assets/xiaomihu.png";
import xiaosongshuPath from "@/assets/xiaosongshu.png";
import backgroundPath from "@/assets/background.png";

const spritelist: Array<SpriteEntry> = new Array<SpriteEntry>();
let PixiApp: PIXI.Application;
const TextureCache = PIXI.utils.TextureCache;

const percent = 50;
const currentTime = 0;
let backgroundlength: number;
let backgroundcenter: number;
let maxleftmovelenth: number;
let maxrightmovelenth: number;
let maxtopmovelenth: number;
let maxbottommovelenth: number;
let backgroundheightlength: number;
let poivlength: number;
let pohilength: number;
let dragFlag = false;
let startPoint: any;
let backgroundheightcenter: number;
//舞台中心
// let stagecenturey:number
// let stagecenturex:number
// stagecenturey=    PixiApp.stage.position.y
// stagecenturex=    PixiApp.stage.position.x
// console.log("stagecenturey:",stagecenturey)
// console.log("stagecenturey:",stagecenturey)
//精灵
let background: PIXI.Sprite;
let xiaomihu: PIXI.Sprite;
let xiaosongshu: PIXI.Sprite;
export const PixiEngine = {
  init(width: number, height: number) {
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
  getCanvas() {
    return PixiApp.view;
  },
  loadobj(scwidth: number, scheight: number) {
    console.log("setup");
    console.log("windowwidth:", scwidth);
    console.log("windowheight:", scheight);
    background = new PIXI.Sprite(PIXI.Texture.from(backgroundPath));
    background.name = "background";
    background.angle = 90;
    background.width = scwidth * 6;
    background.height = scwidth * 2;
    //背景图长度
    backgroundlength = background.width;
    //背景图宽度
    backgroundheightlength = background.height;
    //一半画板宽度
    const canvheightlength = scwidth / 2;
    const cutlentheight = backgroundheightlength - canvheightlength;
    //一半画板长度
    const canvlength = scheight / 2;
    const cutlent = backgroundlength - canvlength;
    //宽需要偏移量
    pohilength = cutlentheight - backgroundheightlength / 2;
    maxtopmovelenth = pohilength;
    maxbottommovelenth = pohilength;
    backgroundheightcenter = background.width / 2;
    //需要偏移量
    poivlength = cutlent - backgroundlength / 2;
    maxleftmovelenth = poivlength;
    maxrightmovelenth = poivlength;
    backgroundcenter = background.height / 2;
    background.position = {
      x: background.height - pohilength,
      y: -poivlength,
    };
    console.log("x需要偏移量:", pohilength, "y需要偏移量:", poivlength);
    xiaomihu = new PIXI.Sprite(PIXI.Texture.from(xiaomihuPath));
    const xiaomihuobj: SpriteEntry = new SpriteEntry(
      xiaomihu,
      xiaomihuPath,
      "xiaomihu",
      scwidth / 6
    );
    spritelist.push(xiaomihuobj);
    xiaomihu.name = "xiaomihu";
    xiaomihu.angle = 90;
    xiaomihu.width = scwidth / 6;
    xiaomihu.height = scwidth / 6;
    xiaomihu.position = {
      x: background.height / 2 - 90,
      y: canvlength - 60,
    };

    xiaosongshu = new PIXI.Sprite(PIXI.Texture.from(xiaosongshuPath));
    const xiaosongshuobj: SpriteEntry = new SpriteEntry(
      xiaosongshu,
      xiaosongshuPath,
      "xiaosongshu",
      scwidth / 6
    );
    spritelist.push(xiaosongshuobj);
    xiaosongshu.name = "xiaosongshu";
    xiaosongshu.angle = 90;
    xiaosongshu.width = scwidth / 7;
    xiaosongshu.height = scwidth / 7;
    xiaosongshu.position = {
      x: background.height / 2 - 90,
      y: canvlength + 50,
    };
    PixiApp.stage.addChild(background);
    PixiApp.stage.addChild(xiaomihu);
    PixiApp.stage.addChild(xiaosongshu);
    console.log(PixiApp.stage.getChildIndex(xiaosongshu));
  },
  loadeventlisten() {
    xiaomihu.interactive = true;
    xiaosongshu.interactive = true;
    background.interactive = true;
    //平移事件

    //轻敲 当从显示对象放置和移除触摸点时触发
    background.on("touchstart", (event: any) => {
      dragFlag = true;
      startPoint = { x: event.data.global.x, y: event.data.global.y };
    });
    //当触摸点沿着显示对象移动时触发
    background.on("touchmove", (event: any) => {
      if (dragFlag) {
        const dx = event.data.global.x - startPoint.x;
        const dy = event.data.global.y - startPoint.y;
        PixiApp.stage.position.x += dx;
        PixiApp.stage.position.y += dy;

        maxleftmovelenth += dy;
        maxrightmovelenth -= dy;
        maxtopmovelenth += dx;
        maxbottommovelenth -= dx;
        console.log(
          "maxleftmovelenth:",
          maxleftmovelenth,
          "maxrightmovelenth:",
          maxrightmovelenth
        );
        startPoint = { x: event.data.global.x, y: event.data.global.y };
        if (maxleftmovelenth < 0) {
          dragFlag = false;
          maxleftmovelenth = 0;
          maxrightmovelenth = 2 * poivlength;
          // PixiApp.stage.position.x = 0;
          PixiApp.stage.position.y = -poivlength;

          console.log("maxleftmovelenth reset");
          console.log(
            "maxleftmovelenth:",
            maxleftmovelenth,
            "maxrightmovelenth",
            maxrightmovelenth
          );
        }
        if (maxrightmovelenth < 0) {
          dragFlag = false;
          maxrightmovelenth = 0;
          maxleftmovelenth = 2 * poivlength;

          // PixiApp.stage.position.x = 0;
          PixiApp.stage.position.y = poivlength;
          console.log("maxrightmovelenth reset");
          console.log(
            "maxleftmovelenth:",
            maxleftmovelenth,
            "maxrightmovelenth",
            maxrightmovelenth
          );
        }
        if (maxtopmovelenth < 0) {
          dragFlag = false;
          maxtopmovelenth = 0;
          maxbottommovelenth = 2 * pohilength;
          PixiApp.stage.position.x = -pohilength;
          // PixiApp.stage.position.y = -pohilength;

          console.log("maxtopmovelenth reset");
          console.log(
            "maxtopmovelenth:",
            maxtopmovelenth,
            "maxbottommovelenth",
            maxbottommovelenth
          );
        }
        if (maxbottommovelenth < 0) {
          dragFlag = false;
          maxbottommovelenth = 0;
          maxtopmovelenth = 2 * pohilength;

          PixiApp.stage.position.x = pohilength;
          // PixiApp.stage.position.y = pohilength;
          console.log("maxbottommovelenth reset");
          console.log(
            "maxtopmovelenth:",
            maxtopmovelenth,
            "maxbottommovelenth",
            maxbottommovelenth
          );
        }
        console.log("stagecenturex:", PixiApp.stage.position.x);
        console.log("stagecenturey:", PixiApp.stage.position.y);
      }
    });
    background.on("touchend", () => {
      console.log("touchend");
      dragFlag = false;
    });
    // xiaomihu.on ("click",(event: any)=>{
    //     console.log("click")
    // })

    // xiaomihu.on("mousemove",(event: any)=>{
    //     console.log("mousemove")
    // }),
    // xiaosongshu.on ("click",(event: any)=>{
    //     console.log("click")
    // })

    // xiaosongshu.on("mousemove",(event: any)=>{
    //     console.log("mousemove")
    // }),
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
