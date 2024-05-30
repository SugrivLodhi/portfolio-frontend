import React, { useContext } from "react";
import styled from "styled-components";
import Modal from "./common/Modal";
import InputField from "./common/Input";
import StyledButton from "./common/Button";
import { ContextProvider } from "@/context";
import { validationSchema } from "@/validationSchma";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { postRequest } from "@/api/ApiUtill";
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

const SignUp = () => {
  const formData = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = formData;
  const { state, dispatch } = useContext(ContextProvider);
  const handleClose = () => dispatch({ type: "closeSignupPopup" });
  const handleOpenLogin = () => dispatch({ type: "openLoginPopup" });
  const signUp = async (body) => {
    try {
      const response = await postRequest("/register", body);
      toast.success(response.message);
      handleClose();
      handleOpenLogin();
    } catch (error) {
      console.log("error", error);
    }
  };
  const onSubmit = async (data) => {
    console.log(data);
    const response = await signUp(data);
    console.log("re", response);
  };

  return (
    <FormProvider {...formData}>
      <Modal isOpen={state.isOpenSignUpPopup} onClose={handleClose}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign Up</h2>
          <InputField
            type="text"
            placeholder="Full Name"
            label="Full Name"
            name="fullName"
          />
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
          <StyledButton type="submit">Sign Up</StyledButton>
        </Form>
      </Modal>
    </FormProvider>
  );
};

export default SignUp;
