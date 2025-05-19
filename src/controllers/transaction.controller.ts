import { Request, Response } from "express";
import prisma from "../config/db";

// GET all transactions (ordered by id ascending)
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        id: 'asc', // 🔁 urut berdasarkan ID dari kecil ke besar
      },
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// CREATE transaction
export const createTransaction = async (req: Request, res: Response) => {
  const { title, amount, category, type } = req.body;

  try {
    const newTransaction = await prisma.transaction.create({
      data: { title, amount, category, type }
    });
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: "Failed to create transaction", error: err });
  }
};

// DELETE transaction
export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.transaction.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ message: "Transaction not found", error: err });
  }
};
