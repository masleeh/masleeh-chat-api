import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export class createConversationDto {
    @ApiProperty({ example: ['aWqdVyzN-BT7', 'bSOuaNRL53x6'], description: 'User ids for conv creationg (min 2 required)' })
    readonly user_ids: string[];
    
    @ApiProperty({ example: 'Cool guys chat', description: 'Conv title (Optional)' })
    readonly title?: string;
    
    @ApiProperty({ example: 'private', description: 'Conv type (private | group)' })
    readonly type: 'private' | 'group';
    
    @ApiProperty({ example: 'aWqdVyzN-BT7', description: 'Conv creator' })
    readonly user_id: string;
}

export const createConversationDtoSchema = z.object({
    user_ids: z.array(z.string({
        required_error: 'provide valid user_id in user_ids array'
    }).min(12)).min(2, { message: 'User_ids: minimun 2 user_id required' }),
    title: z.string().optional(),
    type: z.union([z.literal("private"), z.literal('group')]),
    user_id: z.string()
})

export type createConversationDtoZod = z.infer<typeof createConversationDtoSchema>