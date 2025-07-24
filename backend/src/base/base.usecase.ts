import { IBaseType } from './types/base-types';
import { BaseRepository } from './base.repository';

export class BaseUsecase<T extends IBaseType> {
  protected repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async getAll(filter: any = {}): Promise<T[]> {
    return this.repository.findAll(filter);
  }

  async getById(id: string): Promise<T | null> {
    return this.repository.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: string, update: Partial<T>): Promise<T | null> {
    return this.repository.updateById(id, update);
  }

  async delete(id: string): Promise<T | null> {
    return this.repository.deleteById(id);
  }
}
