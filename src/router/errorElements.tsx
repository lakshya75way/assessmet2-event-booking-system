import React from "react";
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import { Result, Space, type ResultProps } from "antd";
import { Button } from "../components/ui/Button";

interface ErrorResultProps {
  status?: ResultProps["status"];
  title: string;
  subTitle: string;
}

const ErrorResult: React.FC<ErrorResultProps> = ({
  status = "error",
  title,
  subTitle,
}) => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "100px 0" }}>
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={
          <Space>
            <Button type="primary" onClick={() => navigate("/")}>
              Back Home
            </Button>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </Space>
        }
      />
    </div>
  );
};

export const RouteError: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const messages: Record<number, { title: string; subTitle: string }> = {
      404: {
        title: "404",
        subTitle: "Sorry, the page you visited does not exist.",
      },
      401: { title: "401", subTitle: "Please login to access this page." },
      500: { title: "500", subTitle: "Internal server error." },
    };
    const { title, subTitle } = messages[error.status] || {
      title: "Error",
      subTitle: "Something went wrong.",
    };
    return (
      <ErrorResult
        status={String(error.status) as "404" | "403" | "500"}
        title={title}
        subTitle={subTitle}
      />
    );
  }

  return (
    <ErrorResult
      title="Something went wrong"
      subTitle={
        error instanceof Error
          ? error.name === "ZodError"
            ? "Data validation failed. The API response did not match the expected format."
            : error.message
          : "An unexpected error occurred."
      }
    />
  );
};

export const Unauthorized: React.FC = () => (
  <ErrorResult
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
  />
);

export const NotFound: React.FC = () => (
  <ErrorResult
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
  />
);
