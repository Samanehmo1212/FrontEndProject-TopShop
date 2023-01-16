import { Value } from "sass";
import * as yup from "yup";
import { string } from "yup/lib/locale";

export const registerationSchema=yup.object({
    name:yup.string().required().min(5).max(20),
    email:yup.string().required(),
    password:yup.string().required().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])/,"Requied 1 Uppercase 1 lower case 1 digit")
    .min(5).max(20),
    re_password:yup.string().required().oneOf([yup.ref("password")],"password does not match"),
//    avatar:yup.mixed().required()
    // avatar:yup.mixed().test({
    //     test:(Value)=>Value.lenght>0,
    //     message:"file can not be empty"
    // })
})