import React from "react";
import { Spin, Result, Button, Empty } from "antd";

interface DataStateProps {
  loading?: boolean;
  error?: Error | string | null;
  empty?: boolean;
  onRetry?: () => void;
  loadingContent?: React.ReactNode;
  children: React.ReactNode;
}

export const DataState: React.FC<DataStateProps> = ({
  loading,
  error,
  empty,
  onRetry,
  loadingContent,
  children,
}) => {
  if (loading) {
    return (
      <>
        {loadingContent || (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "100px 0",
            }}
          >
            <Spin size="large" />
          </div>
        )}
      </>
    );
  }

  if (error) {
    return (
      <Result
        status="error"
        title="Error Occurred"
        subTitle={
          typeof error === "string"
            ? error
            : error?.message || "Something went wrong while fetching data."
        }
        extra={
          onRetry && (
            <Button type="primary" onClick={onRetry}>
              Try Again
            </Button>
          )
        }
      />
    );
  }

  if (empty) {
    return (
      <div style={{ padding: "60px 0" }}>
        <Empty description="No events found matching your criteria." />
      </div>
    );
  }

  return <>{children}</>;
};
