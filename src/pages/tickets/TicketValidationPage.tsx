import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Card, Typography, Space, Result } from "antd";
import {
  QrcodeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import { Ticket } from "../../types";
import { useValidateTicket } from "../../hooks/tickets/useValidateTicket";
import { Button } from "../../components/ui/Button";

const { Title, Text, Paragraph } = Typography;

export const TicketValidationPage: React.FC = () => {
  const ticket = useLoaderData() as Ticket;
  const [validated, setValidated] = useState(false);
  const { mutate: validate, isPending, data: result } = useValidateTicket();

  const handleValidate = () => {
    validate(ticket.qrCode, {
      onSuccess: () => setValidated(true),
    });
  };

  return (
    <div
      className="page-transition"
      style={{ maxWidth: 640, margin: "60px auto" }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            background: "#e0e7ff",
            borderRadius: 20,
            marginBottom: 24,
          }}
        >
          <SecurityScanOutlined style={{ fontSize: 40, color: "#4f46e5" }} />
        </div>
        <Title level={2}>Validation Portal</Title>
        <Text type="secondary" style={{ fontSize: 16 }}>
          Verify guest tickets.
        </Text>
      </div>

      <Card
        style={{
          padding: 12,
          borderRadius: 24,
          border: "none",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
        }}
      >
        {!validated ? (
          <Space direction="vertical" size={24} style={{ width: "100%" }}>
            <div
              style={{
                background: "#f8fafc",
                padding: 32,
                borderRadius: 16,
                textAlign: "center",
              }}
            >
              <QrcodeOutlined
                style={{ fontSize: 64, color: "#94a3b8", marginBottom: 16 }}
              />
              <Paragraph>Ticket ID: {ticket.id}</Paragraph>
              <Paragraph type="secondary">Status: {ticket.status}</Paragraph>
            </div>

            <Button
              type="primary"
              size="large"
              block
              onClick={handleValidate}
              loading={isPending}
              style={{ height: 54, borderRadius: 12 }}
            >
              Confirm Validation
            </Button>
          </Space>
        ) : (
          <div className="page-transition">
            {result ? (
              <Result
                status="success"
                title="Validated"
                subTitle="Ticket is valid."
                icon={<CheckCircleOutlined style={{ color: "#10b981" }} />}
              />
            ) : (
              <Result
                status="error"
                title="Invalid"
                subTitle="Verification failed."
                icon={<CloseCircleOutlined style={{ color: "#ef4444" }} />}
              />
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
