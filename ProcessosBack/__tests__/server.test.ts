import { closeServer, server } from "../server";
import { db } from "../knex/config/database";
import * as request from "supertest";
import { Process } from "../../common/process";

const signupUser = async (cpf: string, role: string) => {
  const res = await request(server).post("/api/cadastrar").send({
    name: "Placeholder Name",
    cpf: cpf,
    email: "placeholder@email.com",
    phone: "11111111111",
    role: role,
    password: "Senha1234",
  });

  expect(res.body).toHaveProperty("success");
  return res;
};

describe("Testes dos pontos de api relativos a usuários", () => {
  let authorId: number;
  let judgeId: number;
  let processId: number;
  const userCpf: string = "11111111111";

  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {});

  it("Cadastro de usuário com informações válidas", async () => {
    const res = await signupUser(userCpf, "advogado");
    authorId = res.body.success.id;
  });

  it("Autentificação com credenciais válidas", async () => {
    const res = await request(server)
      .get("/api/auth")
      .query({ cpf: userCpf, password: "Senha1234" });

    expect(res.body).toHaveProperty("success");
  });

  it("Autentificação com credenciais inválidas", async () => {
    const res = await request(server)
      .get("/api/auth")
      .query({ cpf: userCpf, password: "senha1234" });

    expect(res.body).toHaveProperty("failure");
  });

  it("Informações de usuário por id", async () => {
    const res = await request(server)
      .get("/api/usuario")
      .query({ id: authorId });

    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toHaveProperty("cpf");
    expect(res.body.success.cpf).toBe(userCpf);
  });

  it("Apagar usuário por cpf", async () => {
    var res = await request(server).get("/api/usuarios");

    expect(res.body).toHaveProperty("success");
    const userLength = res.body.success.length;

    res = await request(server)
      .delete("/api/apagar-usuario")
      .query({ cpf: userCpf });

    expect(res.body).toHaveProperty("success");

    res = await request(server).get("/api/usuarios");

    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toHaveLength(userLength - 1);
  });

  it("Abertura de processos", async () => {
    const process: Process = {
      name: "Processo de Test",
      authorId: authorId,
      defendantCpf: "33333333333",
    };
    var res;

    res = await signupUser("22222222222", "juiz");
    judgeId = res.body.success.id;

    res = await request(server).post("/api/abrir-processo").send(process);
    expect(res.body).toHaveProperty("success");
    processId = res.body.success.id;
  });

  it("Informações de processo por id", async () => {
    const res = await request(server)
      .get("/api/processo")
      .query({ id: processId });

    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toHaveProperty("id");
    expect(res.body.success.id).toBe(processId);
  });

  it("Resgatar lista de processos por id de autor", async () => {
    const res = await request(server)
      .get("/api/processos")
      .query({ authorId: authorId });

    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toHaveLength(1);
    expect(res.body.success[0].id).toBe(processId);
  });

  it("Resgatar lista de processos por id de juiz", async () => {
    const res = await request(server)
      .get("/api/processos")
      .query({ judgeId: judgeId });

    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toHaveLength(1);
    expect(res.body.success[0].id).toBe(processId);
  });

  it("Apagar processo por id", async () => {
    var res;

    res = await request(server).get("/api/processos");
    expect(res.body).toHaveProperty("success");
    const processCount = res.body.success.length;

    res = await request(server)
      .delete("/api/apagar-processo")
      .query({ id: processId });
    expect(res.body).toHaveProperty("success");

    res = await request(server).get("/api/processos");
    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toHaveLength(processCount - 1);
  });
});
