import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProductController } from 'src/product/product.controller';
import { ProductModule } from 'src/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController, ProductModule],
  providers: [UsersService],
})
export class UsersModule {}
