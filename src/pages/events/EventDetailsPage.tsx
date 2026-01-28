import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Typography,
  Tag,
  Space,
  Card,
  Divider,
  Breadcrumb,
} from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  WalletOutlined,
  LeftOutlined,
  HeartFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Event } from "../../types";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

export const EventDetailsPage: React.FC = () => {
  const event = useLoaderData() as Event;
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate(`/events/book/${event.id}`);
  };

  return (
    <div className="page-transition">
      <div style={{ marginBottom: 24 }}>
        <div className="responsive-breadcrumb">
          <Breadcrumb
            items={[
              { title: <Link to="/">Events</Link> },
              { title: event.title },
            ]}
          />
        </div>
        <style>{`
          @media (max-width: 576px) {
            .responsive-breadcrumb {
              display: none;
            }
          }
        `}</style>
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={() => navigate("/")}
          style={{ paddingLeft: 0, marginTop: 16 }}
        >
          Back to Events
        </Button>
      </div>

      <Row gutter={[40, 40]}>
        <Col xs={24} lg={16}>
          <div
            style={{
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              height: 450,
              marginBottom: 32,
            }}
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                padding: "40px 32px",
              }}
            >
              <Tag
                style={{
                  marginBottom: 16,
                  background: "#F84464",
                  color: "white",
                  border: "none",
                  fontWeight: 600,
                  borderRadius: 4,
                  padding: "4px 12px",
                }}
              >
                {event.category.toUpperCase()}
              </Tag>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Title
                  level={1}
                  style={{
                    color: "white",
                    margin: 0,
                    fontWeight: 800,
                    fontSize: 40,
                  }}
                >
                  {event.title}
                </Title>
                <div
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(12px)",
                    padding: "6px 14px",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.15)",
                    height: "fit-content",
                    minWidth: "max-content",
                  }}
                >
                  <HeartFilled style={{ color: "#F84464", fontSize: 13 }} />
                  <Text
                    style={{ color: "white", fontWeight: 700, fontSize: 13 }}
                  >
                    {event.likes
                      ? event.likes >= 1000
                        ? (event.likes / 1000).toFixed(1) + "k"
                        : event.likes
                      : "0"}
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <div
            className="event-info-stats"
            style={{
              display: "flex",
              gap: 60,
              marginBottom: 40,
              flexWrap: "wrap",
            }}
          >
            <Space direction="vertical" size={8}>
              <Text
                type="secondary"
                style={{ letterSpacing: 1, fontSize: 11, fontWeight: 700 }}
              >
                DATE & TIME
              </Text>
              <Space size={12}>
                <div
                  style={{ background: "#f8f9fa", padding: 8, borderRadius: 8 }}
                >
                  <CalendarOutlined
                    style={{ color: "#F84464", fontSize: 18 }}
                  />
                </div>
                <Text strong style={{ fontSize: 16 }}>
                  {dayjs(event.date).format("MMMM D, YYYY [at] h:mm A")}
                </Text>
              </Space>
            </Space>
            <Space direction="vertical" size={8}>
              <Text
                type="secondary"
                style={{ letterSpacing: 1, fontSize: 11, fontWeight: 700 }}
              >
                LOCATION
              </Text>
              <Space size={12}>
                <div
                  style={{ background: "#f8f9fa", padding: 8, borderRadius: 8 }}
                >
                  <EnvironmentOutlined
                    style={{ color: "#F84464", fontSize: 18 }}
                  />
                </div>
                <Text strong style={{ fontSize: 16 }}>
                  {event.venue ? `${event.venue}, ` : ""}
                  {event.location}
                </Text>
              </Space>
            </Space>
          </div>
          <style>{`
            @media (max-width: 576px) {
              .event-info-stats {
                gap: 24px !important;
              }
            }
          `}</style>

          <Title level={4} style={{ fontWeight: 700, marginBottom: 16 }}>
            About the Event
          </Title>
          <Paragraph
            style={{ fontSize: 16, lineHeight: "1.8", color: "#64748b" }}
          >
            {event.description}
          </Paragraph>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            style={{
              position: "sticky",
              top: 100,
              padding: 16,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
              borderRadius: 20,
              border: "1px solid #f1f5f9",
            }}
          >
            <Title level={3} style={{ fontWeight: 800, marginTop: 0 }}>
              Book Tickets
            </Title>
            <Divider style={{ margin: "16px 0" }} />

            <Space direction="vertical" size={24} style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text type="secondary" style={{ fontWeight: 500 }}>
                  Price per ticket
                </Text>
                <Text strong style={{ fontSize: 28, color: "#F84464" }}>
                  ₹{event.price}
                </Text>
              </div>

              <div
                style={{
                  background: "#fff5f6",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1px solid #ffebed",
                }}
              >
                <Text
                  type="secondary"
                  style={{ fontSize: 13, color: "#991b1b" }}
                >
                  * Group bookings available for 5+ people
                </Text>
              </div>

              <Button
                type="primary"
                size="large"
                block
                icon={<WalletOutlined />}
                onClick={handleBookingClick}
                style={{
                  height: 60,
                  borderRadius: 15,
                  fontSize: 17,
                  fontWeight: 700,
                  background: "#F84464",
                  border: "none",
                }}
              >
                Book Tickets Now
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
