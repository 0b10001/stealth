import { Request, Response } from 'express';
import db from '../models/database';

export const getAllTasks = (req: Request, res: Response) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

export const getUserTasks = (req: Request, res: Response) => {
  const userId = req.params.id;
  db.all('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

export const createTask = (req: Request, res: Response) => {
  const userId = req.params.id;
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const sql = 'INSERT INTO tasks (user_id, title) VALUES (?, ?)';
  db.run(sql, [userId, title], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      id: this.lastID,
      user_id: userId,
      title,
      completed: false
    });
  });
}; 