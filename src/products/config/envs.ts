import 'dotenv/config'

import * as Joi from 'joi'

import { env } from 'process'
import { join } from 'path'

interface Envs{
    PORT : number,
    DATABASE_URL: string
}


const schema = Joi.object({
    PORT : Joi.number().required(),
    DATABASE_URL: Joi.string().required()
}).unknown(true)


const {error,value} = schema.validate(process.env)

if(error)
    throw new Error(`Config validation error ${error.message}`)

const envs : Envs = value

export const envsValue = {
    PORT : envs.PORT,
    DATABASE_URL : env.DATABASE_URL
}