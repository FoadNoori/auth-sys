import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, UsersService],
})
export class ProductModule {}
