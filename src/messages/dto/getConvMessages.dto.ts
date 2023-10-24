import { z } from "zod";

export class getConvMessagesDto {
    readonly conv_id: string;
}

export const getConvMessagesSchema = z.object({
    conv_id: z.string().trim().min(1)
})