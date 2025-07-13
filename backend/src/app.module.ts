import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test } from './domains/test.models';
// import { TestModule } from './test/test.module';
import { TestModule } from './domains/test.module.ts';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Test],
      autoLoadModels: true,
      synchronize: false, // usamos init.sql
    }),
    TestModule,
  ],
})
export class AppModule {}
