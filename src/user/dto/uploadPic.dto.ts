import { ApiProperty } from "@nestjs/swagger"
import { z } from "zod"

export class uploadPicDto {
    @ApiProperty({ example: '12343567', description: 'User id' })
    readonly user_id: string
}

export const uploadPicDtoSchema = z.object({
    user_id: z.string().optional(),
    image: z.any()
})

export type uploadPicDtoZod = z.infer<typeof uploadPicDtoSchema>