import { Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  deleteUser,
  getUser,
  getUserById,
} from "./knex/querries/users";
import { db } from "./knex/config/database";
import {
  createProcess,
  deleteProcess,
  getAllProcess as getAllProcesses,
  getProcessById,
  getProcessesByJudgeId,
  getProcessesByLaywerId,
} from "./knex/querries/processes";
import {
  attachDocument,
  deleteDocument,
  getDocumentById,
  getDocumentsByProcessId,
} from "./knex/querries/documents";
import { Process } from "../common/process";

const express = require("express");
const bodyParser = require("body-parser");
const multipart = require("connect-multiparty");
const cors = require("cors");

var app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

var allowCrossDomain = function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(allowCrossDomain);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors(corsOptions));

const multipartMiddleware = multipart({ uploadDir: './uploads' });
app.post('/upload', multipartMiddleware, (req:any, res:any) => {
  const files = req.files;
  console.log(files);
  res.json({ message: files });
});

app.post("/api/cadastrar", async (req: Request, res: Response) => {
  var user = req.body;
  const userId = await createUser(user);

  if (userId) {
    user = await getUserById(userId);
    console.log(
      `[SERVIDOR] Usuário cpf ${user.cpf} foi registrado com id ${userId}`
    );
    res.send({ success: user });
  } else {
    res.send({ failure: "Usuário não pode ser cadastrado" });
  }
});

app.get("/api/usuarios", async (req: Request, res: Response) => {
  const users = await getAllUsers();

  if (users) {
    console.log(`[SERVIDOR] Buscando ${users.length} usuários`);
    res.send({ success: users });
  } else {
    res.send({ failure: "Não pode buscar todos os usuários" });
  }
});

app.get("/api/usuario", async (req: Request, res: Response) => {
  const id = req.query.id as string;

  const user = await getUserById(parseInt(id));

  if (user) {
    console.log(`[SERVIDOR] Buscando usuário id ${id}`);
    res.send({ success: user });
  } else {
    res.send({ failure: `Não pode encontrar usuário id ${id}` });
  }
});

app.delete("/api/apagar-usuario", async (req: Request, res: Response) => {
  const cpf: string = req.body.cpf;
  const success = await deleteUser(cpf);

  if (success) {
    console.log(`[SERVIDOR] Usuário cpf ${cpf} foi deletado da base de dados`);
    res.send({ success: `Usuário cpf ${cpf} deletado com sucesso` });
  } else {
    res.send({ failure: `Não pode deletar usuário cpf: ${cpf}` });
  }
});

app.get("/api/auth", async (req: Request, res: Response) => {
  const cpf = req.query.cpf as string;
  const password = req.query.password as string;

  const user = await getUser(cpf, password);

  if (user) {
    console.log(`[SERVIDOR] Buscando usuário cpf ${cpf}`);
    res.send({ success: user });
  } else {
    res.send({ failure: "Não pode encontrar usuário com essas credenciais" });
  }
});

app.post("/api/abrir-processo", async (req: Request, res: Response) => {
  var process = req.body;
  const processId = await createProcess(process);

  if (processId) {
    process = await getProcessById(processId);
    console.log(
      `[SERVIDOR] Processo ${process.name} foi registrado com id ${processId}`
    );
    res.send({ success: process });
  } else {
    res.send({ failure: "Processo não pode ser aberto" });
  }
});

app.delete("/api/apagar-processo", async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const success = await deleteProcess(parseInt(id));

  if (success) {
    console.log(`[SERVIDOR] Processo id ${id} foi deletado da base de dados`);
    res.send({ success: `Processo id ${id} deletado com sucesso` });
  } else {
    res.send({ failure: `Não pode deletar processo id: ${id}` });
  }
});

app.get("/api/processos", async (req: Request, res: Response) => {
  const lawyerId = req.query.lawyerId as string;
  const judgeId = req.query.judgeId as string;

  const lawyerIsValid = lawyerId != undefined;
  const judgeIsValid = judgeId != undefined;

  let processes: Process[] | null = null;

  if (!lawyerIsValid && !judgeIsValid) {
    processes = await getAllProcesses();
    console.log(`[SERVIDOR] Buscando ${processes?.length} processos`);
  } else if (lawyerIsValid) {
    processes = await getProcessesByLaywerId(parseInt(lawyerId));
    console.log(
      `[SERVIDOR] Buscando ${processes?.length} processos de advogado id ${lawyerId}`
    );
  } else if (judgeIsValid) {
    processes = await getProcessesByJudgeId(parseInt(judgeId));
    console.log(
      `[SERVIDOR] Buscando ${processes?.length} processos de juiz id ${judgeId}`
    );
  }

  if (processes) {
    res.send({ success: processes });
  } else {
    res.send({ failure: "Não pode buscar processos" });
  }
});

app.get("/api/processo", async (req: Request, res: Response) => {
  const id = req.query.id as string;

  if (!id) {
    res.send({
      failure: "Por favor, ofereça uma forma de identificar o processo",
    });
    return;
  }

  const process = await getProcessById(parseInt(id));

  if (process) {
    console.log(`[SERVIDOR] Buscando processos ${id}`);
    res.send({ success: process });
  } else {
    res.send({ failure: `Não pode encontrar processos com id ${id}` });
  }
});

app.get("/api/documentos", async (req: Request, res: Response) => {
  const processId = req.query.processId as string;
  const documents = await getDocumentsByProcessId(parseInt(processId));

  if (documents) {
    console.log(
      `[SERVIDOR] Buscando ${documents.length} documentos de processo id ${processId}`
    );
    res.send({ success: documents });
  } else {
    res.send({
      failure: `Não pode encontrar documentos para processo id ${processId}`,
    });
  }
});

app.get("/api/documento", async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const document = await getDocumentById(parseInt(id));

  if (document) {
    console.log(`[SERVIDOR] Buscando documento id ${id}`);
    res.send({ success: document });
  } else {
    res.send({
      failure: `Não pode encontrar documento id ${id}`,
    });
  }
});

app.post("/api/anexar-documento", async (req: Request, res: Response) => {
  const document = req.body;
  const id = await attachDocument(document);

  if (id) {
    console.log(`[SERVIDOR] Anexando documento id ${id}`);
    res.send({ success: document });
  } else {
    res.send({ failure: "Não pode anexar documento" });
  }
});

app.delete("/api/apagar-documento", async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const success = await deleteDocument(parseInt(id));

  if (success) {
    console.log(`[SERVIDOR] Documento id ${id} foi deletedo da base de dados`);
    res.send({ success: id });
  } else {
    res.send({ failure: `Não pode deletar documento id ${id}` });
  }
});

var server = app.listen(3000, async () => {
  console.log("[SERVIDOR] Servidor aberto na porta 3000");
  console.log("[SERVIDOR] Servidor conectado à base de dados");
});

const closeServer = () => {
  server.close();
  db.destroy();
};

export { server, closeServer };
