// src/modules/auth/validation/createAccountSchema.ts
import * as yup from "yup";

export const createAccountSchema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  lastName: yup.string().required("Los apellidos son obligatorios"),
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("El correo es obligatorio"),
  birthDate: yup.date().required("La fecha de nacimiento es obligatoria"),
});
