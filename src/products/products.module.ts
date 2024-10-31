import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { envsValue } from './config/envs';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {
  constructor(){
    console.log(envsValue)
  }
}
