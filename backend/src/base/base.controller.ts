import { Request, Response } from 'express';
import { BaseUsecase } from './base.usecase';
import { IBaseType } from './types/base-types';



export class BaseController<T extends IBaseType> {
  constructor(protected usecase: BaseUsecase<T>) {}

  async getAll(req: Request, res: Response) {
    const data = await this.usecase.getAll(req.query);
    res.json(data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.usecase.getById(id);
    res.json(data);
  }

  async create(req: Request, res: Response) {
    const data = await this.usecase.create(req.body);
    res.status(201).json(data);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.usecase.update(id, req.body);
    res.json(data);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.usecase.delete(id);
    res.json(data);
  }
}
