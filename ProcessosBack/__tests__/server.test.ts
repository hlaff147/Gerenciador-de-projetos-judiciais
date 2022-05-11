import { server } from "../server";
import { db } from "../knex/config/database";
import { User } from "../../common/user";
import * as request from "supertest";

describe("Testes dos pontos de api relativos a usuários", () => {
  beforeAll(async () => {
    await db.migrate.latest();
  });

  it("Cadastro de usuário com informações válidas", async () => {
    const user: User = {
      name: "Saul Goodman",
      cpf: "11111111111",
      email: "bettercallsaul@fake.com",
      phone: "11111111111",
      role: "advogado",
      password: "Senha1234",
    };

    const res = await request(server)
      .post("/api/cadastrar")
      .send(user)
      .set("Accept", "application/json");

    expect(res.body).toHaveProperty("success");
  });

  it("Autentificação com credenciais válidas", async () => {
    const res = await request(server)
      .get("/api/auth")
      .query({ cpf: "11111111111", password: "Senha1234" });

    expect(res.body).toHaveProperty("success");
  });
});
