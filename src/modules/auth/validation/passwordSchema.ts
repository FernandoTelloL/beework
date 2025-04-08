import * as yup from "yup";

export const passwordSchema = yup.object().shape({
  password: yup.string().required("La contraseña es obligatoria").min(8, "Debe tener al menos 8 caracteres"),
});
