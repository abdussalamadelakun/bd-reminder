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

export const createProfile = async (req: Request, res: Response) => {
  const { fullName, dateOfBirth, email } = req.body;
  const client = await pool.connect();
  try {
    // const result = await client.query(
    //   `INSERT INTO profiles (full_name, date_of_birth, email) VALUES (${fullName}, ${dateOfBirth}, ${email})`,
    // );

    const query: string =
      "INSERT INTO profiles (full_name, date_of_birth, email) VALUES ($1, $2, $3);";
    const values: string[] = [fullName, dateOfBirth, email];
    client.query(query, values);

    res.status(201).json({ message: "Resource succesfully created" });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    }
    res.status(500).json({ message: "Server side error" });
  } finally {
    client.release();
  }
};
