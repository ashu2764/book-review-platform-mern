import { BaseRepository } from '../../../base/base.repository.js'; 
import { IUser, UserModel } from '../../../models/user.model.js';

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email });
  }
}
