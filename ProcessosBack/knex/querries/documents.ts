import { Document } from "../../../common/document";
import { db } from "../config/database";

export const getDocumentsByProcessId = async (
  processId: number
): Promise<Document[] | null> => {
  try {
    const query = await db("documents")
      .where({ processId: processId })
      .select()
      .orderBy("datePosted", "desc");
    return query.length ? query : null;
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};

export const getDocumentById = async (id: number): Promise<Document | null> => {
  try {
    const query = await db("documents").where({ id: id }).select();
    return query.length ? query[0] : null;
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};

export const attachDocument = async (
  document: Document
): Promise<any | null> => {
  try {
    const query = db("documents").insert(document);
    return query;
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};

export const deleteDocument = async (id: number): Promise<number | null> => {
  try {
    const query = db("documents").where({ id: id }).del();
    return query;
  } catch (err: any) {
    console.log(err.message);
  }
  return null;
};
