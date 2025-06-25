import bcrypt from 'bcrypt';
import pool from '../db.js';
import { getClientIp } from '../utils.js';

export async function register(req, res) {
  const required = ['username', 'user', 'role', 'email', 'password', 'accepted_terms'];
  for (const field of required) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }
  const { username, user, role, email, password, accepted_terms, phone, birth_date, address, country, city } = req.body;
  try {
    const exists = await pool.query('SELECT 1 FROM logger WHERE username = $1 OR email = $2', [username, email]);
    if (exists.rows.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const ip = getClientIp(req);
    await pool.query(
      `INSERT INTO logger (username, "user", role, email, password, accepted_terms, phone, birth_date, address, country, city, registration_ip, registration_date)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW())`,
      [username, user, role, email, hashed, accepted_terms, phone ?? null, birth_date ?? null, address ?? null, country ?? null, city ?? null, ip]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
}

export async function checkAvailability(req, res) {
  const { username, email } = req.query;
  if (!username && !email) {
    return res.status(400).json({ error: 'username or email query parameter required' });
  }
  try {
    const result = await pool.query(
      'SELECT username, email FROM logger WHERE username = $1 OR email = $2',
      [username ?? null, email ?? null]
    );
    let usernameExists = false;
    let emailExists = false;
    for (const row of result.rows) {
      if (username && row.username === username) usernameExists = true;
      if (email && row.email === email) emailExists = true;
    }
    res.json({ usernameExists, emailExists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Check failed' });
  }
}

export async function login(req, res) {
  const { usernameOrEmail, password } = req.body;
  if (!usernameOrEmail || !password) {
    return res.status(400).json({ error: 'usernameOrEmail and password are required' });
  }
  try {
    const result = await pool.query('SELECT id, password FROM logger WHERE username = $1 OR email = $1', [usernameOrEmail]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const userRow = result.rows[0];
    const match = await bcrypt.compare(password, userRow.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const ip = getClientIp(req);
    await pool.query('UPDATE logger SET last_ip = $1, last_login = NOW() WHERE id = $2', [ip, userRow.id]);
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
}
