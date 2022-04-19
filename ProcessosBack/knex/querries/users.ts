import { db } from "../config/database";

export const createUser = async (user: any) => {
  try {
    const query = await db("users").insert(user);
    return query;
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
