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

export const Input = styled.input`
  padding: 1rem;
  border: none;
  border-radius: 3px;
  font-size: 1rem;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: #666;
  }
  
  &:focus {
    outline: none;
    background: white;
    box-shadow: 0 0 0 2px #61dafb;
    transform: translateY(-2px);
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.875rem;
    padding: 0.8rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.75rem;
    padding: 0.7rem;
  }
`;

const InputField = ({ label, type, placeholder, name, ...rest }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
 
  return (
    <Wrapper>
      {label && (
        <Label htmlFor={name}>{label}</Label>
      )}
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
