import { create } from "ipfs-http-client";
import all from "it-all";
import toBuffer from "it-to-buffer";
const ipfs = create({ url: "http://127.0.0.1:5001" });

export const AppIpfs = {
  async test() {
    console.log("ipfs-http-client:", ipfs);
    ipfs;
    const id = ipfs.config.getAll();
    console.log("ipfs-http-client-id:", id);
    const file = ipfs.add({
      path: "hello.txt",
      content: "Hello World 101",
    });
    console.log("ipfs-http:", file);

    // const file1 = new File(["text1", "text2"], "test.txt", {
    //   type: "text/plain",
    // });
    //添加文件到服务器
    // await ipfs.files.write("/cat.jpg", file1, { create: true });
    //查看目录中的文件
    const result = await all(ipfs.files.ls("/assets"));
    console.log("ipfs-http-ls:", result);
    //创建目录
    // await ipfs.files.mkdir('/images')
    //读取文件
    const bufferedContents = await ipfs.files.read("/assets/bed.png"); // a buffer

    console.log("ipfs-http-contents:", bufferedContents);
  },
  async lsalldir() {
    const result = [];

    for await (const resultPart of ipfs.files.ls("/")) {
      result.push(resultPart);
    }

    return result;
  },
};
