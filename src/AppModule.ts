import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { TaskModel } from './App/Tasks/Data/TaskModel';
import { TasksModule } from './App/Tasks/TasksModule';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [TaskModel],
        logging: true,
        synchronize: false,
        timezone: 'Z',
      }),
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
