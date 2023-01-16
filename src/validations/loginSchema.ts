import * as yup from "yup";

export const loginSchema=yup.object({
   
    email:yup.string().required(),
    password:yup.string().required().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])/,"Requied 1 Uppercase 1 lower case 1 digit")
    .min(5).max(20),
   
})