import * as PIXI from "pixi.js";
import { assist } from "./assist";
import type { Sprite, AnimatedSprite } from "pixi.js";
import { PixiEngine } from "./engine";
import rightPath from "@/assets/right.png";
import closepath from "@/assets/close.png";
import { Pixihttp } from "./http";
let startPoint: any;
let wr = 0;
interface Action {
  move(x: number, y: number): void;
}
export class HttpMsg {
  public data: string = "null";
  public msg: string = "null";
  constructor() {}
}
export class SpObj {
  public name: string = "asdad3";
  public url: string = "Blue Train";
  public width: number = 1;
  public height: number = 1;
  public x: number = 1;
  public y: number = 1;
  public visable: boolean = true;
  constructor() {}
}
export class SpriteEntry implements Action {
  public spgroup = new PIXI.Container();
  public sprite: Sprite | undefined | AnimatedSprite = undefined;
  public name: string = "";
  public url: string = "";
  public spriteset: boolean = false;
  private rectangle = new PIXI.Graphics();
  public mapx: number = 0;
  public mapy: number = 0;
  public mapwidth: number = 0;
  public mapheight: number = 0;
  public setspedit(flag: boolean) {
    this.spriteset = flag;
    if (flag) {
      this.spgroup.visible = true;
      this.rectangle.visible = true;
    } else {
      this.rectangle.visible = false;
    }
  }
  //加载完纹理后调用此函数
  public load() {
    //初始化基本信息

    //初始化矩形框
    this.editframeinit();
  }
  public move(x: number, y: number): void {
    if (this.sprite !== undefined) {
      this.spgroup.position = {
        x: x,
        y: y,
      };
    } else {
      console.log("err with undefined sprite: ", this.name);
    }
  }
  public editframeinit() {
    console.log("矩形框初始化，精灵：", this.sprite);
    const spgroup = this.spgroup;
    const boxwidth: number = this.sprite!.width;
    const boxheight = this.sprite!.height;
    console.log("矩形框：", "宽度：", boxwidth, "高度：", boxheight);
    this.rectangle.beginFill(0xffffff, 0.1);
    this.rectangle.lineStyle(1, 0xffffff, 1);
    this.rectangle.drawRect(
      this.sprite!.position._x - boxwidth / 2,
      this.sprite!.position._y - boxwidth / 2,
      boxwidth,
      boxheight
    );
    this.rectangle.endFill();
    //按钮初始化
    const right = new PIXI.Sprite(PIXI.Texture.from(rightPath));
    right.anchor.x = 0.5;
    right.anchor.y = 0.5;
    right.width = boxwidth / 4;
    right.height = boxwidth / 4;
    right.interactive = true;
    right.position = {
      x: this.sprite!.position._x - boxwidth / 2,
      y: this.sprite!.position._y - boxwidth / 2,
    };
    right.on("tap", (event: any) => {
      console.log("tap");
      this.rectangle.visible = false;
      this.setspedit(false);
      Pixihttp.updatasprite(this);
    });
    const close = new PIXI.Sprite(PIXI.Texture.from(closepath));
    close.anchor.x = 0.5;
    close.anchor.y = 0.5;
    close.width = boxwidth / 4;
    close.height = boxwidth / 4;
    close.interactive = true;
    close.position = {
      x: this.sprite!.position._x + boxwidth / 2,
      y: this.sprite!.position._y - boxwidth / 2,
    };
    close.on("tap", (event) => {
      spgroup.visible = false;
    });

    this.rectangle.addChild(right);
    this.rectangle.addChild(close);
    spgroup.addChild(this.sprite!);
    spgroup.addChild(this.rectangle);
    PixiEngine.getPixiApp().stage.addChild(spgroup);
    console.log("矩形框和精灵初始化");
    this.rectangle.visible = false;
  }
  private isDragging = false;
  private isscaleing = false;
  private init_drag(width: number) {
    if (this.sprite) {
      console.log("监听精灵拖动事件");
      this.spgroup
        .on("touchstart", (event) => {
          console.log("touchstart");
          if (this.spriteset) {
            this.isDragging = true;
            startPoint = { x: event.data.global.x, y: event.data.global.y };
          }
        })
        .on("touchmove", (event) => {
          if (this.spriteset) {
            if (this.isDragging) {
              const dx = event.data.global.x - startPoint.x;
              const dy = event.data.global.y - startPoint.y;
              const spx = this.spgroup?.position.x;
              const spy = this.spgroup?.position.y;
              //精灵当前位置
              console.log("精灵当前位置-x:", spx, "y:", spy);
              if (spx != null && spy != null) {
                this.move(spx + dx, spy + dy);
              }
              startPoint = { x: event.data.global.x, y: event.data.global.y };
            }
          }
        })
        .on("touchend", () => {
          this.isDragging = false;
        })
        .on("touchendoutside", () => {
          this.isDragging = false;
        });
    }
  }
  initinfo() {
    wr = PixiEngine.getwr();
    console.log("beforeinitinfo:", this);
    this.spgroup.angle = 90;
    this.sprite!.width = this.mapwidth * wr;
    this.sprite!.height = this.mapheight * wr;
    this.spgroup.width = this.mapwidth * wr;
    this.spgroup.height = this.mapheight * wr;
    assist.spsetpos(this.mapx, this.mapy, this);
    console.log("afterinitinfo:", this);
  }

  constructor(
    sprite: Sprite | AnimatedSprite,
    url: string,
    name: string,
    width: number,
    mapx: number,
    mapy: number,
    mapwidth: number,
    mapheight: number
  ) {
    this.sprite = sprite;
    this.spgroup.addChild(this.sprite);
    this.spgroup.visible = false;
    this.name = name;
    this.spgroup.name = name;
    this.url = url;
    this.mapx = mapx;
    this.mapy = mapy;
    this.mapwidth = mapwidth;
    this.mapheight = mapheight;
    this.spriteset = false;
    this.init_drag(width);
    sprite!.anchor.x = 0.5;
    sprite!.anchor.y = 0.5;
    this.initinfo();
  }
}
