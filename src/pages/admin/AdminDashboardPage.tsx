import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Card, Row, Col, Statistic, Typography, Progress, Button } from "antd";
import {
  DollarOutlined,
  UserOutlined,
  CalendarOutlined,
  RiseOutlined,
  ScanOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface AnalyticsData {
  totalRevenue: number;
  totalBookings: number;
  activeEvents: number;
  venueCapacity: number;
  revenueByMonth: { month: string; value: number }[];
}

export const AdminDashboardPage: React.FC = () => {
  const data = useLoaderData() as AnalyticsData;

  const stats = [
    {
      title: "Total Revenue",
      value: data.totalRevenue,
      icon: <DollarOutlined />,
      prefix: "₹",
      color: "#10b981",
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: <UserOutlined />,
      color: "#4f46e5",
    },
    {
      title: "Active Events",
      value: data.activeEvents,
      icon: <CalendarOutlined />,
      color: "#f59e0b",
    },
    {
      title: "Growth Rate",
      value: 12.5,
      icon: <RiseOutlined />,
      suffix: "%",
      color: "#6366f1",
    },
  ];

  return (
    <div className="page-transition">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Admin Dashboard
        </Title>
        <Link to="/admin/scanner">
          <Button type="primary" size="large" icon={<ScanOutlined />}>
            Open Ticket Scanner
          </Button>
        </Link>
      </div>

      <Row gutter={[24, 24]} style={{ marginBottom: 40 }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <Statistic
                title={<Text type="secondary">{stat.title}</Text>}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color, fontWeight: 700 }}
                suffix={stat.suffix}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card
            title="Monthly Revenue Trend"
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 12,
                height: 250,
                padding: "20px 0",
              }}
            >
              {(() => {
                const maxValue =
                  Math.max(...data.revenueByMonth.map((d) => d.value)) || 1;
                return data.revenueByMonth.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: `${(item.value / maxValue) * 200}px`,
                        background: "#F84464",
                        borderRadius: "4px 4px 0 0",
                        transition: "height 1s ease-out",
                        minHeight: 4,
                        position: "relative",
                      }}
                    ></div>
                    <Text
                      type="secondary"
                      style={{ fontSize: 12, marginTop: 8 }}
                    >
                      {item.month}
                    </Text>
                  </div>
                ));
              })()}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title="Venue Capacity"
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              height: "100%",
            }}
          >
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <Progress
                type="circle"
                percent={data.venueCapacity}
                strokeColor="#F84464"
                strokeWidth={10}
                size={180}
              />
              <div style={{ marginTop: 24 }}>
                <Text type="secondary">
                  Average venue utilization across all active events.
                </Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboardPage;
