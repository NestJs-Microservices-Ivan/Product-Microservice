import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Pagination } from '../../common/dto/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @MessagePattern({cmd:'create_product'})
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  //!ATENCION: SIEMPRE LO QUE SE VA A PASAR POR EL PAYLOAD TIENE QUE TENER EL MISMO NOMBRE QUE EL QUE SE RECIBE EN EL MICROSERVICIO
  @MessagePattern({cmd:'find_all'})
  findAll(@Payload() pagination:Pagination) {
    return this.productsService.findAll(pagination);
  }


  @MessagePattern({cmd:'find_one_product'})
  findOne(@Payload('id',ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }



  @MessagePattern({cmd:'update_product'})
  update(@Payload('id',ParseIntPipe) id: number, @Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }


  @MessagePattern({cmd:'delete_product'})
  remove(@Payload('id',ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
