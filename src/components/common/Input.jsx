import React from "react";
import styled from "styled-components";
import { breakpoints } from "@/constants";
import { useFormContext, useFormState } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.875rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.75rem;
  }
`;

const Input = styled.input`
  padding: 0.8rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 1rem;
  width: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.875rem;
    padding: 0.6rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.75rem;
    padding: 0.5rem;
  }
`;

const InputField = ({ label, type, placeholder, name, ...rest }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
  console.log("erro", errors);
  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <Input
        {...register(name)}
        id={name}
        type={type}
        placeholder={placeholder}
        name={name}
        {...rest}
      />
      <ErrorMessage>{errors?.[name]?.message}</ErrorMessage>
    </Wrapper>
  );
};

export default InputField;
