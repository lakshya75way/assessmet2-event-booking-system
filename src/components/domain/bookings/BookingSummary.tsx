import React, { memo } from "react";
import { Card, Typography, Space, Divider } from "antd";
import { ShoppingCartOutlined, WalletOutlined } from "@ant-design/icons";
import { Event } from "../../../types";

const { Title, Text } = Typography;

interface BookingSummaryProps {
  event: Event;
  quantity: number;
}

export const BookingSummary: React.FC<BookingSummaryProps> = memo(
  ({ event, quantity }) => {
    const total = (event.price * quantity).toFixed(2);

    return (
      <Card
        bordered={false}
        style={{ background: "#f8fafc", borderRadius: 16 }}
      >
        <Title level={4}>
          <ShoppingCartOutlined /> Order Details
        </Title>
        <Divider />

        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text type="secondary">
              {event.title} (x{quantity})
            </Text>
            <Text strong>₹{(event.price * quantity).toFixed(2)}</Text>
          </div>

          <Divider dashed style={{ margin: "8px 0" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={4} style={{ margin: 0 }}>
              Total Amount
            </Title>
            <Title level={3} style={{ margin: 0, color: "#F84464" }}>
              <WalletOutlined /> ₹{total}
            </Title>
          </div>
        </Space>
      </Card>
    );
  },
);
