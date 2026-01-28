import React from "react";
import { Typography, Divider } from "antd";

const { Title, Text } = Typography;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <Title level={2} style={{ margin: 0 }}>
        {title}
      </Title>
      {subtitle && <Text type="secondary">{subtitle}</Text>}
      <Divider />
    </div>
  );
};
