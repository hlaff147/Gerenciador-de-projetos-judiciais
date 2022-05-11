import { closeServer, server } from "../server";
import { db } from "../knex/config/database";
import * as request from "supertest";

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
  let userId: number;
  const userCpf: string = "11111111111";

  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {
    closeServer();
  });

  it("Cadastro de usuário com informações válidas", async () => {
    const res = await signupUser(userCpf, "advogado");
    userId = res.body.success.id;
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
    const res = await request(server).get("/api/usuario").query({ id: userId });

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
});
