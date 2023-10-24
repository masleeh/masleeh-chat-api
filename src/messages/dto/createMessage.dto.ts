import { z } from "zod";

export class createMessageDto {
    readonly user_id: string;
    readonly conv_id: string;
    readonly body: string;
    readonly type?: string;
}

export const createMessageSchema = z.object({
    user_id: z.string().trim().min(1),
    conv_id: z.string().trim().min(1),
    body: z.string().trim().min(1),
    type: z.string().optional()
})