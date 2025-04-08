import * as yup from "yup";

export const loginSchema = yup.object().shape({
  inputValue: yup.string()
    .required("El campo no puede estar vacío")
    .min(3, "El campo debe tener al menos 3 caracteres")
    .max(30, "El campo no puede tener más de 30 caracteres")
    .test("is-valid", "Debe ser un correo válido o un usuario", (value) => {
      if (!value) return false;
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isUsername = /^[a-zA-Z0-9_]{3,30}$/.test(value);
      return isEmail || isUsername;
    }),


});

