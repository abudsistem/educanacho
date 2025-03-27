const { z } =  require('zod');

const registerSchema = z.object({
    username: z
      .string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .max(20, "El nombre de usuario no debe superar los 20 caracteres")
      .regex(/^\S*$/, "El nombre de usuario no debe contener espacios"),
    email: z
      .string()
      .email("Debe ser un correo válido")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Debe ser un correo electrónico con un dominio válido"
      ),
    password: z
      .string()
      .min(8, "Debe tener al menos 8 caracteres")
      .max(30, "Debe tener máximo 30 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
      .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
      .regex(/[0-9]/, "Debe contener al menos un número")
      .regex(/[@$!%*?&]/, "Debe contener al menos un carácter especial (@$!%*?&)"),
  });

module.exports = registerSchema