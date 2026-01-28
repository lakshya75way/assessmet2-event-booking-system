import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme, App as AntApp } from "antd";
import { queryClient } from "./queryClient";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: "#F84464",
            borderRadius: 12,
            fontFamily: "'Inter', sans-serif",
          },
          components: {
            Button: {
              controlHeightLG: 56,
              borderRadiusLG: 12,
              colorPrimary: "#F84464",
            },
            Input: {
              controlHeightLG: 56,
              borderRadiusLG: 12,
            },
            Card: {
              borderRadiusLG: 16,
            },
          },
        }}
      >
        <AntApp>{children}</AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
