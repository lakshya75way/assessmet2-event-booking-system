import React from "react";
import { QRCode, Typography, Space } from "antd";

const { Text } = Typography;

interface TicketQRCodeProps {
  value: string;
  subText?: string;
}

export const TicketQRCode: React.FC<TicketQRCodeProps> = ({
  value,
  subText,
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "inline-block",
          padding: 16,
          background: "white",
          border: "1px solid #f1f5f9",
          borderRadius: 20,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        }}
      >
        <QRCode value={value} size={200} bordered={false} color="#1e293b" />
      </div>
      {subText && (
        <Space
          direction="vertical"
          size={0}
          style={{ marginTop: 16, display: "block" }}
        >
          <Text type="secondary" style={{ fontSize: 12 }}>
            {subText}
          </Text>
        </Space>
      )}
    </div>
  );
};
