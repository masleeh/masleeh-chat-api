import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export class updateUserInfoDto {
    @ApiProperty({example: 'kcp29sd;wn', description: 'User id' })
    readonly user_id: string;

    @ApiProperty({example: 'masleeh', description: 'New username'})
    readonly username: string;
}

export const updateUserInfoDtoSchema = z.object({
    user_id: z.string().trim().min(1),
    username: z.string().trim().min(1, {message: 'Username is too short'})
})