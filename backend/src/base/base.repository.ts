import { IBaseType } from './types/base-types';

export class BaseRepository<T extends IBaseType> {
  constructor(protected model: any) {}

  async findAll(filter: any = {}): Promise<T[]> {
    return this.model.find(filter);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.find(id);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async updateById(id: string, update: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true });
  }

  async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndUpdate(id);
  }
}
