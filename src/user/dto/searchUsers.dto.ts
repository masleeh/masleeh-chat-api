import { ApiProperty } from "@nestjs/swagger"
import { z } from "zod"

export class searchUsersDto {
    @ApiProperty({ example: 'masleeh', description: 'Query string' })
    readonly username: string
}

export const searchUsersDtoSchema = z.object({
    username: z.string({
        required_error: 'Username is not provided',
        invalid_type_error: 'Username type is not string'
    })
}).required()

export type searchUsersDtoZod = z.infer<typeof searchUsersDtoSchema>