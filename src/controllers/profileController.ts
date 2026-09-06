import pool from "../db.js";
import type { Request, Response } from "express";

export const getAllProfiles = async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`SELECT * FROM profiles;`);
    res.status(200).json(result.rows);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  } finally {
    client.release();
  }
};
