import { z } from "zod";

// export class registerUserDTO {
//     readonly username: string;
//     readonly password: string;
// }

export const registerUserDTOSchema = z.object({
    username: z.string().trim().min(1),
    password: z.string().trim().min(1)
}).required()

export type registerUserDTO = z.infer<typeof registerUserDTOSchema>