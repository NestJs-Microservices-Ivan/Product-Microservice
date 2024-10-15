import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { PrismaClient } from '@prisma/client';
import { ProductPaginationDto } from '../../common/dto/pagination.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()

//* Tengo que extender la clase de prisma client e implementar OnModuleInit

export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductsService')
  
  //*OnModuleInit me permite conectarme a la base de datos
  async onModuleInit() {
      await this.$connect()
      this.logger.log('Dabase Connected')
  }



  create(createProductDto: CreateProductDto) {
    return this.products.create({
      data: createProductDto
    })
  }

  async findAll(productPaginationDto: ProductPaginationDto) {

    const {skip,take} = productPaginationDto

    // const countPages = await this.products.count()

    const data = await this.products.findMany({
      skip : (skip - 1) * take,
      take
    })

    if(data.length == 0)
      return 'No more pages'

    return {
      
      data,

      meta: {
        Info:`Page ${skip} from ${take}`,
      }
    }

  }

  async findOne(id: number) {

    const findById = await this.products.findUnique({
      where:{
        id
      }
    })

    if(!findById)
      throw new NotFoundException(`The product whit ID ${id} does not exist`)

    return findById

  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    
    console.log(updateProductDto)
    
    const updateProduct = await this.products.update({
      where:{id},
      data:updateProductDto
    })

    return updateProduct

  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
