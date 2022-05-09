import { Process } from "../../../common/process";
import { db } from "../config/database";

const getRandomJudgeId = async (): Promise<number | null> => {
  try {
    const query = await db("users").select("id").where({ role: "juiz" });
    if (!query.length)
      throw Error("Não foi possível encontrar um juiz para o processo");

    const randomIndex = Math.floor(Math.random() * query.length);
    return query[randomIndex].id;
  } catch (err: any) {
    console.log(err.message);
  }

  return null;
};

export const createProcess = async (process: any): Promise<number | null> => {
  try {
    const judgeId = (await getRandomJudgeId()) as any;
    process.judgeId = judgeId;

    const query = await db("processes").insert(process);
    return query[0];
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};

export const getAllProcess = async (): Promise<Process[] | null> => {
  try {
    const query = await db("processes");
    return query;
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};

export const deleteProcess = async (id: number): Promise<number | null> => {
  try {
    const query = await db("processes").where({ id: id }).del();
    return query;
  } catch (err: any) {
    console.log(err.message);
  }

  return null;
};

export const getProcessesByLaywerId = async (
  lawyerId: number
): Promise<Process[] | null> => {
  try {
    const query = await db("processes").where({ lawyerId: lawyerId }).select();
    return query.length ? query : null;
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};

export const getProcessesByJudgeId = async (
  judgeId: number
): Promise<Process[] | null> => {
  try {
    const query = await db("processes").where({ judgeId: judgeId }).select();
    return query.length ? query : null;
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};

export const getProcessById = async (id: number): Promise<Process | null> => {
  try {
    const query = await db("processes").where({ id: id }).select();
    return query.length ? query[0] : null;
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};
