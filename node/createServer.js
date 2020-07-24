const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

http
  .createServer((req, res) => {
    let postData = "";
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", [
      "Authorization",
      "Content-Type",
    ]);
    res.setHeader("Content-Type", "text/plain;charset=utf-8");
    res.setHeader("Access-control-Allow-Credentials", true);
    req.setEncoding("utf-8");

    req.setEncoding("utf8");
    req.addListener("data", (trunk) => {
      postData += trunk;
    });

    req.addListener("end", () => {
      if (req.method === "OPTIONS" || req.url === "/favicon.ico") {
        res.writeHead(204, "ok", { "Content-Type": "text/palin" });
        res.end("ok");
      } else {
        const pathName = url.parse(req.url).pathname;
        if (pathName === "/getRichContent") {
          const html = fs.readFileSync( path.resolve(__dirname, "./resource/template.html"), "utf8");
          const css = fs.readFileSync(path.resolve(__dirname, "./resource/template.css"), "utf8");
          const data = { html, css };
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.write(JSON.stringify({data}));
          res.end();
        } else if (pathName === '/setRichContent') {
          fs.writeFileSync( path.resolve(__dirname, "./resource/template.html"), postData, "utf8");
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end('ok');
        }
      }
    });
  })
  .listen("8888");

console.log("node serve");
