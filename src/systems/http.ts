import axios from "axios";
import { SpriteEntry, SpObj } from "./obj";
import { Spritesheet, AnimatedSprite } from "pixi.js";
import { assist } from "./assist";
// import qs from "qs";
const BAER_URL =
  import.meta.env["VITE_AXIOS_BASE_URL"] === undefined
    ? "http://116.204.115.87:9090/"
    : import.meta.env["VITE_AXIOS_BASE_URL"]?.toString();
// axios instance create
const instance = axios.create({
  baseURL: BAER_URL, //接口统一域名
  timeout: 6000, //设置超时
  withCredentials: false,
  // headers: { "Content-Type": "application/json;charset=utf8" },
  headers: { "Content-Type": "text/plain; charset=utf-8" },
});
const GET: string = "get";
const POST: string = "post";
const PUT: string = "put";
const DEL: string = "delete";
function req(method: string, url: string, data: object): Promise<any> {
  method = method.toLowerCase();
  if (method == "post") {
    // return instance.post(url, qs.stringify(data))
    console.log("post");
    return instance.post(url, data);
  } else if (method == "get") {
    return instance.get(url, { params: data });
  } else if (method == "delete") {
    return instance.delete(url, { params: data });
  } else if (method == "put") {
    return instance.put(url, data);
    // return instance.put(url, qs.stringify(data))
  } else {
    console.error("known method" + method);
    throw Error("known method");
  }
}
axios.interceptors.response.use(null, (err) => {
  const config = err.config;
  if (!config || !config.retryTimes) return Promise.reject(err);
  const { __retryCount = 1, retryDelay = 300, retryTimes } = config;
  // 在请求对象上设置重试次数
  config.__retryCount = __retryCount;
  // 判断是否超过了重试次数
  if (__retryCount >= retryTimes) {
    return Promise.reject(err);
  }
  // 增加重试次数
  config.__retryCount++;
  // 延时处理
  const delay = new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, retryDelay);
  });
  // 重新发起请求
  return delay.then(function () {
    return axios(config);
  });
});

export const Pixihttp = {
  getspritedata() {
    const data = req(GET, "/spriteGetALL", {});
    return data;
  },
  getspritebyname(namev: string) {
    const data = req(GET, "/spriteGetByname", { name: namev });
    return data;
  },
  postsprite(sp: SpriteEntry) {
    const spobj = new SpObj();
    spobj.name = sp.name;
    spobj.url = sp.url;
    spobj.x = sp.mapx;
    spobj.y = sp.mapy;
    spobj.width = sp.mapwidth;
    spobj.height = sp.mapheight;
    spobj.visable = sp.spgroup.visible;
    console.log("postsprite:", spobj);
    const data = req(POST, "/spritePost", spobj);
    console.log(data);
  },
  updatasprite(sp: SpriteEntry) {
    const spobj = new SpObj();
    const da = assist.getlocalpos(sp.spgroup.position.x, sp.spgroup.position.y);
    sp.mapx = da[0];
    sp.mapy = da[1];
    console.log("updata x y", da);
    spobj.name = sp.name;
    spobj.url = sp.url;
    spobj.x = sp.mapx;
    spobj.y = sp.mapy;
    spobj.width = sp.mapwidth;
    spobj.height = sp.mapheight;
    spobj.visable = sp.spgroup.visible;
    console.log("updatasprite:", spobj);
    const data = req(POST, "/spriteUpdata", spobj);
    console.log(data);
  },
};
