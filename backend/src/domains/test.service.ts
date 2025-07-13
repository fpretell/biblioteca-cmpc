import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// import { Test } from './test.model';
import { Test } from './test.models';

@Injectable()
export class TestService {
  constructor(@InjectModel(Test) private testModel: typeof Test) {}

  findAll() {
    return this.testModel.findAll();
  }
}
