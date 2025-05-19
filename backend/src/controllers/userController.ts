import { Request, Response } from 'express';
import db from '../models/database';

export const getAllUsers = (req: Request, res: Response) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.run(sql, [name, email], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      id: this.lastID,
      name,
      email
    });
  });
}; 