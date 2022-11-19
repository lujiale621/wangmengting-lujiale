import * as PIXI from "pixi.js";
import type { Sprite } from "pixi.js";

// export interface Spriteobj {
//     sprite: Sprite
//     url: string
//     name: string

// }
let startPoint: any;
interface Action {
  move(x: number, y: number): void;
}

export class SpriteEntry implements Action {
  public sprite: Sprite | undefined = undefined;
  public name: string = "";
  public url: string = "";

  public move(x: number, y: number): void {
    if (this.sprite !== undefined) {
      this.sprite.position = {
        x: x,
        y: y,
      };
    } else {
      console.log("err with undefined sprite: ", this.name);
    }
  }

  private isDragging = false;
  private init_drag(width: number) {
    if (this.sprite) {
      this.sprite
        .on("touchstart", (event) => {
          this.isDragging = true;
          startPoint = { x: event.data.global.x, y: event.data.global.y };
        })
        .on("touchmove", (event) => {
          if (this.isDragging) {
            const dx = event.data.global.x - startPoint.x;
            const dy = event.data.global.y - startPoint.y;
            const spx = this.sprite?.position.x;
            const spy = this.sprite?.position.y;
            //精灵当前位置
            console.log("精灵当前位置-x:", spx, "y:", spy);
            if (spx != null && spy != null) {
              this.move(spx + dx, spy + dy);
            }
            startPoint = { x: event.data.global.x, y: event.data.global.y };
            // this.move(e.x + width / 2, e.y - width / 2);
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
    this.name = name;
    this.url = url;

    this.init_drag(width);
  }
}
