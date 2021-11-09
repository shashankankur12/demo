import React from "react";
import { FormTextInput, FormTextInputProps } from "molecules/FormTextInput";

export const FormEmailInput = (props: Partial<FormTextInputProps>) => {
  return (
    <FormTextInput
      name="email"
      label="form.label.email.address"
      placeholder="form.placeholder.email.address"
      keyboardType="email-address"
      {...props}
    />
  );
};
