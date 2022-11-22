import * as PIXI from "pixi.js";
import { ImageResource, Resource, Sprite } from "pixi.js";
import { SpriteEntry } from "./obj";
import { Spritesheet, AnimatedSprite, Assets } from "pixi.js";
import fireplacePath from "@/assets/fireplace/fireplace.png";
import biluPath from "@/assets/fireplace/bilu.png";
import fireplacePathJS from "@/assets/fireplace/fireplace.json";
import guiziPath from "@/assets/guizi.png";
import xiaomihuPath from "@/assets/xiaomihu.png";
import xiaosongshuPath from "@/assets/xiaosongshu.png";
import backgroundPath from "@/assets/background.png";
import picturePath from "@/assets/picture/picture.png";
import picturePath2 from "@/assets/picture/picture2.png";
import picturePathJS from "@/assets/picture/picture.json";
import xiangkuamgPath from "@/assets/xiangkuang.jpg";
const spritelist: Array<SpriteEntry> = new Array<SpriteEntry>();
let PixiApp: PIXI.Application;
const TextureCache = PIXI.utils.TextureCache;
let wr = 0;
let hr = 0;
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
let guizi: PIXI.Sprite;
let bgheigth: number;
let bgwidth: number;
let scwidth: number;
let scheight: number;
export const PixiEngine = {
  init(width: number, height: number) {
    scwidth = width;
    scheight = height;
    //背景高度是屏幕高度 是背景图片的宽度
    bgheigth = width * 3.6;
    bgwidth = width * 1.2;
    const da: Array<number> = this.scalewh(scwidth, scheight);
    wr = da[0];
    hr = da[1];
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
  //把定义的平面位置映射到适应屏幕位置
  transcreentocenternpos(x: number, y: number) {
    const width = 414;
    const height = 896;
    const x1 = x - width / 2;
    const y1 = y - height / 2;
    console.log(
      "转换前屏幕大小x：",
      width,
      "y:",
      height,
      "转换前背景图大小x：",
      width * 1.2,
      "y：",
      height * 1.6633928571428573
    );
    console.log(
      "转换后屏幕大小x：",
      scwidth,
      "y:",
      scheight,
      "转换后背景图大小x：",
      bgwidth,
      "y：",
      bgheigth
    );

    console.log(
      "转换前屏幕坐标x:",
      x,
      "y:",
      y,
      "转换后中心坐标x:",
      x1,
      "y:",
      y1
    );
    const x2 = x1 * wr;
    const y2 = y1 * hr;
    console.log(
      "中心坐标伸前x:",
      x1,
      "y:",
      y1,
      "中心坐标伸后中心坐标x:",
      x2,
      "y:",
      y2
    );
    const x3 = x2 + scwidth / 2;
    const y3 = y2 + scheight / 2;
    console.log(
      "中心坐标伸后转换前x:",
      x2,
      "y:",
      y2,
      "中心坐标伸后转换后x:",
      x3,
      "y:",
      y3
    );
    return [x3, y3];
  },
  //通过背景图的伸缩获取伸缩比 wr=hr
  scalewh(windowwidth: number, windowheight: number) {
    const width = 414;
    const height = 896;
    let wr = 0;
    let hr = 0;
    wr = bgwidth / (width * 1.2);
    hr = bgheigth / (height * 1.6633928571428573);
    console.log(
      "背景宽度：",
      bgwidth,
      "高度：",
      bgheigth,
      "映射画布宽度：",
      width,
      "高度：",
      height,
      "映射画布的背景宽度：",
      width * 1.2,
      "高度：",
      height * 1.6633928571428573
    );
    return [wr, hr];
  },
  //设置精灵位置 x，y原始坐标
  spsetpos(x: number, y: number, sp: SpriteEntry) {
    console.log("开始转换精灵坐标-精灵：", sp.name);
    const da = this.transcreentocenternpos(x, y);

    sp.spgroup.position = {
      x: da[0],
      y: da[1],
    };
  },
  getlocalpos(x: number, y: number) {
    const width = 414;
    const height = 896;
    const x1 = x - scwidth / 2;
    const y1 = y - scheight / 2;
    console.log(
      "转换前屏幕大小x：",
      width,
      "y:",
      height,
      "转换前背景图大小x：",
      width * 1.2,
      "y：",
      height * 1.6633928571428573
    );
    console.log(
      "转换后屏幕大小x：",
      scwidth,
      "y:",
      scheight,
      "转换后背景图大小x：",
      bgwidth,
      "y：",
      bgheigth
    );

    console.log(
      "转换前屏幕坐标x:",
      x,
      "y:",
      y,
      "转换后中心坐标x:",
      x1,
      "y:",
      y1
    );
    const x2 = x1 / wr;
    const y2 = y1 / hr;
    console.log(
      "中心坐标缩前x:",
      x1,
      "y:",
      y1,
      "中心坐标缩后中心坐标x:",
      x2,
      "y:",
      y2
    );
    const x3 = x2 + width / 2;
    const y3 = y2 + height / 2;
    console.log(
      "中心坐标缩后转换前x:",
      x2,
      "y:",
      y2,
      "中心坐标缩后转换后x:",
      x3,
      "y:",
      y3
    );
    return [x3, y3];
  },
  loadobj(scwidth: number, scheight: number) {
    console.log("setup");
    console.log("windowwidth:", scwidth);
    console.log("windowheight:", scheight);
    background = new PIXI.Sprite(PIXI.Texture.from(backgroundPath));
    background.name = "background";
    background.angle = 90;
    background.width = bgheigth;
    background.height = bgwidth;
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
    this.spsetpos(180, 700, guiziobj);

    picanspobj.spgroup.angle = 90;
    picanspobj.spgroup.width = 138 * wr;
    picanspobj.spgroup.height = 90 * wr;
    this.spsetpos(300, 400, picanspobj);

    fireplaceobj.spgroup.angle = 90;
    fireplaceobj.spgroup.width = 138 * wr;
    fireplaceobj.spgroup.height = 138 * wr;
    this.spsetpos(150, 500, fireplaceobj);
    xiaomihuobj.spgroup.angle = 90;
    xiaomihuobj.spgroup.width = 69 * wr;
    xiaomihuobj.spgroup.height = 69 * wr;
    this.spsetpos(75, 250, xiaomihuobj);
    xiaosongshuobj.spgroup.angle = 90;
    xiaosongshuobj.spgroup.width = 69 * wr;
    xiaosongshuobj.spgroup.height = 69 * wr;
    this.spsetpos(75, 330, xiaosongshuobj);
    PixiApp.stage.addChild(background);
    xiaomihuobj.load();
    xiaosongshuobj.load();
    fireplaceobj.load();
    guiziobj.load();
    // picanspobj.load();
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
