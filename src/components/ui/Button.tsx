import { Button as AntButton, ButtonProps } from "antd";
import React, { memo } from "react";

export const Button: React.FC<ButtonProps> = memo((props) => {
  return <AntButton {...props} />;
});
