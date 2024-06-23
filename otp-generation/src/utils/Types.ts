import z from 'zod';

export const saveBody = z.object({
    username: z.string().max(20),
    phone:  z.string().max(10).refine((value) => /^[6-9]{1}[0-9]{9}$/.test(value))
});


export type PostInputs  = z.infer<typeof saveBody>;