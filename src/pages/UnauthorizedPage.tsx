import React from "react";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};
