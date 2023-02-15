import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Digite um email válido")
    .required("O email é obrigatório"),
  password: yup
    .string()
    .min(6, "a senha deve ter no mínimo 6 caracteres")
    .required("A senha é obrigatória"),
});
