import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Divider,
  Tag,
  Space,
  message,
  Row,
  Col,
  Skeleton,
} from "antd";
import {
  HomeOutlined,
  CheckCircleFilled,
  DownloadOutlined,
  ShareAltOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Ticket } from "../../types";
import { Button } from "../../components/ui/Button";
import { TicketQRCode } from "../../components/domain/tickets/TicketQRCode";

const { Title, Text } = Typography;

interface RichTicket extends Ticket {
  event?: {
    title: string;
    date: string;
    location: string;
    imageUrl: string;
    venue?: string;
  };
  seat?: string;
  type?: string;
  price?: number;
}

export const TicketPage: React.FC = () => {
  const ticket = useLoaderData() as RichTicket;
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDownload = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Event Ticket",
          text: `I'm going to ${ticket.event?.title || "an event"}! Ticket: ${ticket.id}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      message.success("Link copied to clipboard!");
    }
  };

  return (
    <div
      className="page-transition"
      style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}
    >
      <Card
        className="ticket-card"
        style={{
          width: 440,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          border: "none",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            padding: "40px 32px",
            textAlign: "center",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -20,
              left: -20,
              width: 100,
              height: 100,
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              right: -20,
              width: 80,
              height: 80,
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
            }}
          />

          <CheckCircleFilled
            style={{ fontSize: 64, marginBottom: 16, color: "white" }}
          />
          <Title
            level={2}
            style={{ color: "#fff", margin: 0, fontWeight: 700 }}
          >
            Ticket Confirmed
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
            Ref: {ticket.id?.substring(0, 8).toUpperCase()}
          </Text>
        </div>

        <div style={{ padding: "32px" }}>
          {ticket.event && (
            <div style={{ marginBottom: 24, textAlign: "center" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 120,
                  borderRadius: 12,
                  overflow: "hidden",
                  marginBottom: 20,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                {!imageLoaded && (
                  <Skeleton.Button
                    active
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
                <img
                  src={ticket.event.imageUrl}
                  alt={ticket.event.title}
                  onLoad={() => setImageLoaded(true)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: imageLoaded ? "block" : "none",
                  }}
                />
              </div>
              <Title level={3} style={{ margin: 0, fontSize: 22 }}>
                {ticket.event.title}
              </Title>
              <Space direction="vertical" size={4} style={{ marginTop: 8 }}>
                <Space style={{ color: "#666" }}>
                  <CalendarOutlined />
                  <Text type="secondary">
                    {new Date(ticket.event.date).toLocaleDateString(undefined, {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Space>
                <Space style={{ color: "#666" }}>
                  <EnvironmentOutlined />
                  <Text type="secondary">
                    {ticket.event.venue ? `${ticket.event.venue}, ` : ""}
                    {ticket.event.location}
                  </Text>
                </Space>
              </Space>
            </div>
          )}

          <div
            style={{
              background: "#f9fafb",
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {ticket.seat?.includes(",") ? "SEATS (GROUP)" : "SEAT"}
                </Text>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  {ticket.seat || "General"}
                </div>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {ticket.seat?.includes(",") ? "TOTAL PRICE" : "PRICE"}
                </Text>
                <div style={{ fontSize: 16, fontWeight: 700 }}>
                  ₹{" "}
                  {(ticket.price || 0) * (ticket.seat?.split(",").length || 1)}
                </div>
              </Col>
              <Col span={24}>
                <div
                  style={{ borderTop: "1px dashed #e5e7eb", margin: "8px 0" }}
                />
              </Col>
              <Col span={24} style={{ textAlign: "center" }}>
                <Tag color="success" style={{ margin: 0 }}>
                  PAID VIA{" "}
                  {(ticket.paymentMethod || "CREDIT CARD").toUpperCase()}
                </Tag>
              </Col>
            </Row>
          </div>

          <TicketQRCode
            value={ticket.qrCode}
            subText="Show this QR code at the entrance"
          />

          <Divider style={{ margin: "32px 0" }} />

          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <Button
                icon={<DownloadOutlined />}
                block
                onClick={handleDownload}
                className="no-print"
              >
                Save PDF
              </Button>
              <Button
                icon={<ShareAltOutlined />}
                block
                onClick={handleShare}
                className="no-print"
              >
                Share
              </Button>
            </div>
            <Button
              type="default"
              icon={<HomeOutlined />}
              block
              onClick={() => navigate("/")}
              style={{ height: 48 }}
              className="no-print"
            >
              Back to Home
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};
