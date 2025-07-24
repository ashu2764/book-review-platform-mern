import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/auth.repository.js'; 
import { AuthError } from '../../../infrastructure/errors/auth.error.js';
import { IUser } from '../../../models/user.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export class AuthUsecase {
  constructor(private repo = new UserRepository()) {}

  async signup(
    username: string,
    email: string,
    password: string
  ): Promise<{ token: string; user: IUser }> {
    const existing = await this.repo.findByEmail(email);
    if (existing) throw new AuthError('Email already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.repo.create({ username, email, password: hashed });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    return { token, user };
  }

  async login(email: string, password: string): Promise<{ token: string; user: IUser }> {
    const user = await this.repo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AuthError('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    return { token, user };
  }
}
