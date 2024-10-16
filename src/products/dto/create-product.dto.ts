import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

import { Type } from "class-transformer";

export class CreateProductDto {

    id:number
    
    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    price:number;


}
