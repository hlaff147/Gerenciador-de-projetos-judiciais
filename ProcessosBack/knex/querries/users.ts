import { User } from "../../../common/user";
import { db } from "../config/database";

export const createUser = async (user: any): Promise<number | null> => {
  try {
    const query = await db("users").insert(user);
    return query[0];
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};

export const getAllUsers = async (): Promise<User[] | null> => {
  try {
    const query = await db("users");
    return query;
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};

export const deleteUser = async (cpf: string): Promise<number | null> => {
  try {
    const query = await db("users").where({ cpf: cpf }).del();
    return query;
  } catch (err: any) {
    console.log(err.message);
  }

  return null;
};

export const getUser = async (
  cpf: string,
  password: string
): Promise<User | null> => {
  try {
    const query = await db("users")
      .where({ cpf: cpf, password: password })
      .select();
    return query.length ? query[0] : null;
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const query = await db("users").where({ id: id }).select();
    return query.length ? query[0] : null;
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};
