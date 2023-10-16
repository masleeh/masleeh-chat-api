import { z } from "zod";

// export class loginUserDto {
//     readonly username: string;
//     readonly password: string;
// }

export const loginUserDtoSchema = z.object({
    username: z.string().trim().min(1),
    password: z.string().trim().min(1)
}).required()

export type loginUserDto = z.infer<typeof loginUserDtoSchema>