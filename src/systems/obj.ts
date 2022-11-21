import * as PIXI from "pixi.js";
import type { Sprite } from "pixi.js";
import { PixiEngine } from "./engine";
import rightPath from "@/assets/right.png";
import closepath from "@/assets/close.png";
let startPoint: any;
interface Action {
  move(x: number, y: number): void;
}

export class SpriteEntry implements Action {
  public spgroup = new PIXI.Container();
  public sprite: Sprite | undefined = undefined;
  public name: string = "";
  public url: string = "";
  public spriteset: boolean = false;
  private rectangle = new PIXI.Graphics();
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
    right.height = boxheight / 4;
    right.interactive = true;
    right.position = {
      x: this.sprite!.position._x - boxwidth / 2,
      y: this.sprite!.position._y - boxwidth / 2,
    };
    right.on("tap", (event: any) => {
      console.log("tap");
      this.rectangle.visible = false;
      this.setspedit(false);
    });
    const close = new PIXI.Sprite(PIXI.Texture.from(closepath));
    close.anchor.x = 0.5;
    close.anchor.y = 0.5;
    close.width = boxwidth / 4;
    close.height = boxheight / 4;
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
    console.log("矩形框初始化");
    this.rectangle.visible = false;
  }
  private isDragging = false;
  private isscaleing = false;
  private init_drag(width: number) {
    if (this.sprite) {
      console.log("监听精灵拖动事件");
      this.spgroup
        .on("touchstart", (event) => {
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
              // this.move(e.x + width / 2, e.y - width / 2);
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

  constructor(sprite: Sprite, url: string, name: string, width: number) {
    this.sprite = sprite;
    this.spgroup.addChild(this.sprite);
    this.name = name;
    this.url = url;
    this.spriteset = false;
    this.init_drag(width);
    sprite!.anchor.x = 0.5;
    sprite!.anchor.y = 0.5;
  }
}
