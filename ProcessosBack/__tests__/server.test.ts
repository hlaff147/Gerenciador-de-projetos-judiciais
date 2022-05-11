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
  let lawyerId: number;
  let judgeId: number;
  let processId: number;
  const userCpf: string = "11111111111";

  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {
    closeServer();
  });

  it("Cadastro de usuário com informações válidas", async () => {
    const res = await signupUser(userCpf, "advogado");
    lawyerId = res.body.success.id;
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
      .query({ id: lawyerId });

    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toHaveProperty("cpf");
    expect(res.body.success.cpf).toBe(userCpf);
  });

  it("Apaga usuário por pdf", async () => {
    var res = await request(server).get("/api/usuarios");

    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toHaveLength(1);

    res = await request(server)
      .delete("/api/apagar-usuario")
      .send({ cpf: userCpf });

    expect(res.body).toHaveProperty("success");

    res = await request(server).get("/api/usuarios");

    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toHaveLength(0);
  });

  it("Abertura de processos", async () => {
    const process: Process = {
      name: "Processo de Test",
      lawyerId: lawyerId,
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

  it("Resgatar lista de processos por id de advogado", async () => {
    const res = await request(server)
      .get("/api/processos")
      .query({ lawyerId: lawyerId });

    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toHaveLength(1);
    expect(res.body.success[0].id).toBe(processId);
  });
});
