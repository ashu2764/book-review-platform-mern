import { IUser } from '../apps/auth/models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
