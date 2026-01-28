import React from "react";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};
