import { z } from 'zod';
const signupSchema = z.object({
    firstname: z
        .string()
        .min(3, { message: "firstname must be at least 3 characters long" }),
    lastname: z
        .string()
        .min(3, { message: "lastname must be at least 3 characters long" }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .refine((val) => /[a-z]/.test(val), {
            message: "Password must contain at least one lowercase letter.",
        })
        .refine((val) => /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter.",
        })
        .refine((val) => /\d/.test(val), {
            message: "Password must contain at least one digit.",
        })
        .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
            message: "Password must contain at least one special character.",
        }),
    email: z.string().email(),
    phone_number: z
        .string()
        .length(10, { message: "Phone number must be 10 digits long" })
        .refine((val) => /\d{10}/.test(val), {
            message: "Phone number must be a 10-digit number.",
        }),
});


const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});


export { signupSchema, signinSchema };