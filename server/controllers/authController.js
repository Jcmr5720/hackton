import bcrypt from 'bcrypt';
import { supabase } from '../supabaseClient.js';
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
    const { data: existing, error: existErr } = await supabase
      .from('logger')
      .select('id')
      .or(`username.eq.${username},email.eq.${email}`);
    if (existErr) throw existErr;
    if (existing && existing.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const ip = getClientIp(req);
    const { error } = await supabase.from('logger').insert([
      {
        username,
        user,
        role,
        email,
        password: hashed,
        accepted_terms,
        phone: phone ?? null,
        birth_date: birth_date ?? null,
        address: address ?? null,
        country: country ?? null,
        city: city ?? null,
        registration_ip: ip,
        registration_date: new Date().toISOString(),
      },
    ]);
    if (error) throw error;
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
    let query = supabase.from('logger').select('username,email');
    if (username && email) {
      query = query.or(`username.eq.${username},email.eq.${email}`);
    } else if (username) {
      query = query.eq('username', username);
    } else if (email) {
      query = query.eq('email', email);
    }
    const { data, error } = await query;
    if (error) throw error;
    let usernameExists = false;
    let emailExists = false;
    for (const row of data ?? []) {
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
    const { data: userRow, error } = await supabase
      .from('logger')
      .select('id,password')
      .or(`username.eq.${usernameOrEmail},email.eq.${usernameOrEmail}`)
      .maybeSingle();
    if (error) throw error;
    if (!userRow) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, userRow.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const ip = getClientIp(req);
    await supabase
      .from('logger')
      .update({ last_ip: ip, last_login: new Date().toISOString() })
      .eq('id', userRow.id);
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
}
