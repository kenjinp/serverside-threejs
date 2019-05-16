import * as express from "express";
import threeImage from "./three-image";

const server = express();

const DEFAULT_PORT = 8080;
const port = Number(process.env.PORT) || DEFAULT_PORT;

server.get("/", (req, res) => {
  const image = threeImage();
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": image.length
  });
  res.end(image);
});

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on port: ${port}`);
});
