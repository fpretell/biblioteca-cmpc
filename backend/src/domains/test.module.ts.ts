import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test } from './test.models';
import { TestService } from './test.service';
import { TestController } from './test.controller';

@Module({
  imports: [SequelizeModule.forFeature([Test])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
