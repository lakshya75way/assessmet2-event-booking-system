import { Input as AntInput, InputProps } from "antd";
import { SearchProps } from "antd/es/input";
import React, { memo } from "react";

export const Input: React.FC<InputProps> = memo((props) => {
  return <AntInput {...props} />;
});

export const PasswordInput: React.FC<InputProps> = memo((props) => {
  return <AntInput.Password {...props} />;
});

export const SearchInput: React.FC<SearchProps> = memo((props) => {
  return <AntInput.Search {...props} />;
});
