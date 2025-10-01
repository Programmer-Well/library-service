import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { User } from './app/users/entities/user.entity';
import { Book } from './app/books/entities/book.entity';
import { BooksModule } from './app/books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'arch',
      entities: [User, Book],
      synchronize: true, // true só ambiente de dev, false só ambiente de prod
      // autoLoadEntities: true, // Carrega entities registradas nos módulos
    }),
    UsersModule,
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
