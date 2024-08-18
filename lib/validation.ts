import { z } from "zod";

const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must have at most 50 characters"),
  email: z.string().email("Invalid email Address"),
  phone: z.string().refine(
    (phone) => {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
      return phoneRegex.test(phone);
    },
    {
      message: "Invalid phone number",
    }
  ),
});

export default UserFormValidation;
