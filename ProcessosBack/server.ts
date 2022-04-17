import express = require("express");

var app = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify({ message: "Hello World!" }));
});

var server = app.listen(3000, () => {
  console.log("[SERVIDOR] Servidor aberto na porta 3000");
});

const closeServer = () => server.close();

export { server, closeServer };
