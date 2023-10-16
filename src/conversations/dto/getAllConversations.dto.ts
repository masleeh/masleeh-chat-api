import { ApiProperty } from "@nestjs/swagger"
import { z } from "zod"

export class getAllConversationsDto {
    @ApiProperty({ example: 'aWqdVyzN-BT7', description: "User_id" })
    readonly user_id: string
}

export const getAllConversationsSchema = z.object({
    user_id: z.string().trim().min(12)
}).required()

export type getAllConversationsDtoZod = z.infer<typeof getAllConversationsSchema>