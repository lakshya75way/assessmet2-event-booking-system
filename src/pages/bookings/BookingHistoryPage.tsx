import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Card, Table, Tag, Typography, Button, Space } from "antd";
import { CalendarOutlined, EyeOutlined } from "@ant-design/icons";
import { Booking } from "../../types";

const { Title, Text } = Typography;

export const BookingHistoryPage: React.FC = () => {
  const bookings = useLoaderData() as Booking[];

  const columns = [
    {
      title: "Event",
      dataIndex: "title",
      key: "title",
      minWidth: 250,
      render: (text: string, record: Booking) => (
        <Space direction="vertical" size={2}>
          <Text strong style={{ fontSize: 14 }}>
            {text}
          </Text>
          <Text
            type="secondary"
            style={{ fontSize: 11, fontFamily: "monospace" }}
          >
            ID: {record.id.substring(0, 12)}...
          </Text>
        </Space>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 140,
      render: (date: string) => (
        <Space>
          <CalendarOutlined style={{ color: "#F84464" }} />
          <Text style={{ fontSize: 13 }}>
            {new Date(date).toLocaleDateString()}
          </Text>
        </Space>
      ),
    },
    {
      title: "Qty",
      dataIndex: "ticketQuantity",
      key: "ticketQuantity",
      width: 80,
      align: "center" as const,
      render: (qty: number) => <Tag style={{ borderRadius: 6 }}>{qty}</Tag>,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 120,
      align: "right" as const,
      render: (val: number) => (
        <Text strong style={{ color: "#F84464" }}>
          ₹{val.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center" as const,
      render: (status: string) => (
        <Tag
          color={status === "confirmed" ? "#10b981" : "#f59e0b"}
          style={{ borderRadius: 6, fontWeight: 600, border: "none" }}
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 180,
      align: "right" as const,
      render: (_: unknown, record: Booking) => (
        <Link to={`/tickets/${record.id}`}>
          <Button
            icon={<EyeOutlined />}
            size="middle"
            type="primary"
            style={{
              borderRadius: 8,
              background: "#F84464",
              borderColor: "#F84464",
              color: "white",
            }}
          >
            View Ticket
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div
      className="page-transition"
      style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 16px" }}
    >
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ marginBottom: 8 }}>
          Your Bookings
        </Title>
        <Text type="secondary">
          View and manage all your upcoming and past events.
        </Text>
      </div>

      <Card
        bordered={false}
        style={{
          boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
          borderRadius: 20,
          overflow: "hidden",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Table
          dataSource={bookings}
          columns={columns}
          rowKey="id"
          pagination={false}
          scroll={{ x: 800 }}
          locale={{ emptyText: "No bookings found." }}
          style={{ background: "white" }}
        />
      </Card>
      <style>{`
        .ant-table-thead > tr > th {
          background: #fafafa !important;
          font-weight: 700 !important;
          font-size: 13px !important;
          color: #64748b !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
        }
      `}</style>
    </div>
  );
};

export default BookingHistoryPage;
