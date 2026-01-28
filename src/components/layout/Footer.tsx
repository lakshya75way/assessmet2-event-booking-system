import React from "react";
import { Layout, Row, Col, Typography, Space, Divider } from "antd";
import {
  FacebookFilled,
  TwitterCircleFilled,
  InstagramFilled,
  LinkedinFilled,
  YoutubeFilled,
  AppstoreFilled,
  AndroidFilled,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Text, Title, Link } = Typography;

export const AppFooter: React.FC = React.memo(() => {
  return (
    <Footer
      style={{
        background: "#333338",
        color: "#999",
        padding: "60px 5% 20px",
        fontSize: 14,
      }}
    >
      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Title level={4} style={{ color: "white", margin: 0 }}>
              EventBook
            </Title>
            <Text style={{ color: "#bbb" }}>
              Your ultimate destination for booking tickets for movies, events,
              plays, sports, and activities. Experience the best live
              entertainment with us.
            </Text>
            <Space size={16}>
              <FacebookFilled
                style={{ fontSize: 24, color: "#bbb", cursor: "pointer" }}
              />
              <TwitterCircleFilled
                style={{ fontSize: 24, color: "#bbb", cursor: "pointer" }}
              />
              <InstagramFilled
                style={{ fontSize: 24, color: "#bbb", cursor: "pointer" }}
              />
              <YoutubeFilled
                style={{ fontSize: 24, color: "#bbb", cursor: "pointer" }}
              />
              <LinkedinFilled
                style={{ fontSize: 24, color: "#bbb", cursor: "pointer" }}
              />
            </Space>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <Title level={5} style={{ color: "white" }}>
            Quick Links
          </Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              width: "100%",
            }}
          >
            <Link style={{ color: "#999" }}>About Us</Link>
            <Link style={{ color: "#999" }}>Contact Us</Link>
            <Link style={{ color: "#999" }}>Help Center</Link>
            <Link style={{ color: "#999" }}>List Your Event</Link>
            <Link style={{ color: "#999" }}>Corporate Bookings</Link>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <Title level={5} style={{ color: "white" }}>
            Download App
          </Title>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                background: "#444",
                padding: "12px 20px",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
              }}
            >
              <AndroidFilled style={{ fontSize: 24, color: "white" }} />
              <div>
                <Text style={{ display: "block", fontSize: 10, color: "#ccc" }}>
                  GET IT ON
                </Text>
                <Text strong style={{ color: "white" }}>
                  Google Play
                </Text>
              </div>
            </div>
            <div
              style={{
                background: "#444",
                padding: "12px 20px",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
              }}
            >
              <AppstoreFilled style={{ fontSize: 24, color: "white" }} />
              <div>
                <Text style={{ display: "block", fontSize: 10, color: "#ccc" }}>
                  Download on the
                </Text>
                <Text strong style={{ color: "white" }}>
                  App Store
                </Text>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Divider style={{ borderColor: "#4a4a4a", margin: "40px 0" }} />

      <Row justify="space-between" align="middle">
        <Col>
          <Text style={{ color: "#777" }}>
            © 2026 EventBook Entertainment Pvt. Ltd. All Rights Reserved.
          </Text>
        </Col>
        <Col>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Link style={{ color: "#777" }}>Privacy Policy</Link>
            <div style={{ width: 1, height: "1em", background: "#777" }} />
            <Link style={{ color: "#777" }}>Terms of Service</Link>
            <div style={{ width: 1, height: "1em", background: "#777" }} />
            <Link style={{ color: "#777" }}>Sitemap</Link>
          </div>
        </Col>
      </Row>
    </Footer>
  );
});
