import { Request, Response } from 'express';
import { AuthUsecase } from '../usecases/auth.usecase.js';

export class AuthController {
  private usecase = new AuthUsecase();

  signup = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const { token, user } = await this.usecase.signup(username, email, password);

      res.status(201).json({
        message: 'User successfully created',
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
        token,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { token, user } = await this.usecase.login(email, password);

      res.status(200).json({
        message: 'Login successful',
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
        token,
      });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  };
}
