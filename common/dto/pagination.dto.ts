import { IsInt, IsNumber, IsOptional, Min } from "class-validator"

import {Type} from 'class-transformer'

export class Pagination{

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    skip: number = 1

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    take:number = 10

}