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
  color: #cbd5e1;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.875rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.75rem;
  }
`;

export const Input = styled.input`
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 10px;
  font-size: 1rem;
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
  transition: all 0.3s ease;

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    outline: none;
    border-color: #818cf8;
    background: rgba(255, 255, 255, 0.09);
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
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
