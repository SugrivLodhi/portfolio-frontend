import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Modal from "./common/Modal";
import InputField from "./common/Input";
import StyledButton from "./common/Button";
import { ContextProvider } from "@/context";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "@/validationSchma";
import { postRequest } from "@/api/ApiUtill";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 5px;
  h2 {
    margin-bottom: 0.5rem;
  }
`;

const Login = () => {
  const formData = useForm({
    resolver: yupResolver(loginValidationSchema),
  });
  const navigate = useRouter();
  const start = usePathname();

  useEffect(() => {
    if (start === "/login") {
      dispatch({ type: "openLoginPopup" });
    }
  }, []);

  const { handleSubmit } = formData;
  const { state, dispatch } = useContext(ContextProvider);
  const handleClose = () => dispatch({ type: "closeLoginPopup" });
  const login = async (body) => {
    try {
      const response = await postRequest("/login", body);

      if (response?.token) {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        toast.success(response.message);
        handleClose();
        navigate.push("/");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };
  const onSubmit = async (data) => {
    const response = await login(data);
    console.log("re", response);
  };

  return (
    <FormProvider {...formData}>
      <Modal isOpen={state.isOpenLoginPopup} onClose={handleClose}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <InputField
            type="email"
            placeholder="Email"
            label="Email"
            name="email"
          />
          <InputField
            type="password"
            placeholder="Password"
            label="Password"
            name="password"
          />
          <StyledButton type="submit">Login</StyledButton>
        </Form>
      </Modal>
    </FormProvider>
  );
};

export default Login;
