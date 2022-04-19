import { db } from "../config/database";

export const createUser = async (user: any) => {
  try {
    const query = await db("users").insert(user);
    return query[0];
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};

export const getAllUsers = async () => {
  try {
    const query = await db("users");
    return query;
  } catch (err: any) {
    console.log(err.message);
  }
  return [];
};

export const deleteUser = async (cpf: string) => {
  try {
    const query = await db("users").where({ cpf: cpf }).del();
    return query;
  } catch (err: any) {
    console.log(err.message);
  }

  return null;
};

export const getUser = async (cpf: string, password: string) => {
  try {
    const query = await db("users")
      .where({ cpf: cpf, password: password })
      .select();
    return query.length ? query : null;
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};

export const getUserById = async (id: number) => {
  try {
    const query = await db("users").where({ id: id }).select();
    return query.length ? query[0] : null;
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};
