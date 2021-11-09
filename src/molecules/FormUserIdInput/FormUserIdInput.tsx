import React from "react";
import { FormTextInput, FormTextInputProps } from "molecules/FormTextInput";

export const FormUserIdInput = (props: Partial<FormTextInputProps>) => {
  return (
    <FormTextInput
      name="userId"
      label="form.label.user"
      placeholder="form.placeholder.user.id"
      keyboardType="email-address"
      {...props}
    />
  );
};