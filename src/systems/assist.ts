import { type SpriteEntry, HttpMsg } from "./obj";
import * as PIXI from "pixi.js";
import { PixiEngine } from "./engine";
import { Pixihttp } from "./http";
let bgheigth: number;
let bgwidth: number;
let scwidth: number;
let scheight: number;
let wr = 0;
let hr = 0;
let PixiApp: PIXI.Application;
let background: PIXI.Sprite;
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
import backgroundPath from "@/assets/background.png";
import type { Container } from "pixi.js";
let startPoint: any;
let backgroundheightcenter: number;
export const assist = {
  initpardata(width: number, height: number) {
    scwidth = width;
    scheight = height;
    //背景高度是屏幕高度 是背景图片的宽度
    bgheigth = width * 3.6;
    bgwidth = width * 1.2;
    const da: Array<number> = this.scalewh(scwidth, scheight);
    wr = da[0];
    hr = da[1];
    return [scwidth, scheight, bgheigth, bgwidth, wr, hr];
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
  //得到当前屏幕中心坐标
  getcenterpos(x: number, y: number) {
    const x1 = x - scwidth / 2;
    const y1 = y - scheight / 2;
    return [x1, y1];
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
  }, //设置精灵位置 x，y原始坐标
  spsetpos(x: number, y: number, sp: SpriteEntry) {
    console.log("开始转换精灵坐标-精灵：", sp.name);
    const da = this.transcreentocenternpos(x, y);

    sp.spgroup.position = {
      x: da[0],
      y: da[1],
    };
  },
  spcontainersetpos(x: number, y: number, sp: Container) {
    console.log("开始转换精灵坐标-精灵：", sp.name);
    const da = this.transcreentocenternpos(x, y);

    sp.position = {
      x: da[0],
      y: da[1],
    };
  },
  backgroundinit() {
    PixiApp = PixiEngine.getPixiApp();
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
    PixiApp.stage.addChild(background);
    background.interactive = true;
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

          for (let i = 0; i <= 3; i++) {
            PixiApp.stage.position.y = -poivlength + i;
            console.log(" PixiApp.stage.position.y:", PixiApp.stage.position.y);
            maxrightmovelenth = maxrightmovelenth - i;
            maxleftmovelenth = maxleftmovelenth + i;
          }

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
          for (let i = 0; i <= 3; i++) {
            PixiApp.stage.position.y = poivlength - i;
            maxrightmovelenth = maxrightmovelenth + i;
            maxleftmovelenth = maxleftmovelenth - i;
          }
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
          for (let i = 0; i <= 3; i++) {
            PixiApp.stage.position.x = -pohilength + i;
            maxtopmovelenth = maxtopmovelenth + i;
            maxbottommovelenth = maxbottommovelenth - i;
          }
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
          for (let i = 0; i <= 3; i++) {
            PixiApp.stage.position.x = pohilength - i;
            maxbottommovelenth = maxbottommovelenth + i;
            maxtopmovelenth = maxtopmovelenth - i;
          }
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
  },
  toloadsp(sp: SpriteEntry) {
    const results = Pixihttp.getspritebyname(sp.name);
    const msgs: HttpMsg = new HttpMsg();
    console.log("http-get-sprite:", sp.name, "return:", results);
    results.then((res) => {
      msgs.data = res.data.data;
      msgs.msg = res.data.msg;
      if (msgs.data == "null") {
        console.log(msgs);
        Pixihttp.postsprite(sp);
      } else {
        console.log(msgs.data);
        const objstr = JSON.parse(JSON.stringify(msgs.data));
        const sp: Container = PixiApp.stage.getChildByName(objstr.name);
        this.spcontainersetpos(objstr.x, objstr.y, sp);
        //更新精灵位置
        sp.width = objstr.width * wr;
        sp.height = objstr.height * wr;
        sp.visible = objstr.visable;
      }
    });
  },
  sprebackregister(sp: Container) {
    let direction = "null";
    const da = this.getcenterpos(sp.position.x, sp.position.y);
    const x = da[0];
    const y = da[1];
    const halfheight = bgheigth / 2 - 20;
    const halfwidth = bgwidth / 2 - 20;
    if (x > halfwidth) {
      direction = "bottom";
    }
    if (-x > halfwidth) {
      direction = "top";
    }
    if (y > halfheight) {
      direction = "left";
    }
    if (-y > halfheight) {
      direction = "right";
    }

    if (direction != "null") {
      for (let i = 0; i <= 10; i++) {
        if (direction == "right") {
          sp.position.y = sp.position.y + i;
        }
        if (direction == "left") {
          sp.position.y = sp.position.y - i;
        }
        if (direction == "top") {
          sp.position.x = sp.position.x + i;
        }
        if (direction == "bottom") {
          sp.position.x = sp.position.x - i;
        }
      }
    }
  },
};
