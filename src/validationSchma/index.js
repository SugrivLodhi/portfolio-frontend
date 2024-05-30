import { string, object } from "yup";

export const validationSchema = object().shape({
  fullName: string()
    .min(3, "Full Name must be at least 3 characters")
    .max(50, "Full Name must be at most 50 characters")
    .required("Full Name is required"),
  email: string().email("Invalid email address").required("Email is required"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

export  const loginValidationSchema = object().shape({
    email: string().email("Invalid email address").required("Email is required"),
    password: string().required("Password is required")
})
