import React, { useState, useCallback } from "react";
import { useLoaderData, Form, useNavigation } from "react-router-dom";
import {
  Card,
  Typography,
  Space,
  Tag,
  Divider,
  Radio,
  Alert,
  Row,
  Col,
  Skeleton,
} from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Event, Seat } from "../../types";
import { Button } from "../../components/ui/Button";
import { SeatSelection } from "../../components/domain/bookings/SeatSelection";
import { APP_CONFIG } from "../../config/constants";

const { Title, Text } = Typography;

const SHOW_TIMINGS = [
  { id: "1", time: "10:00 AM", available: true },
  { id: "2", time: "01:00 PM", available: true },
  { id: "3", time: "04:00 PM", available: true },
  { id: "4", time: "07:00 PM", available: true },
  { id: "5", time: "10:00 PM", available: true },
];

export const EventBookingPage: React.FC = () => {
  const event = useLoaderData() as Event;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [selectedTiming, setSelectedTiming] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSeatsChange = useCallback((seats: Seat[], total: number) => {
    setSelectedSeats(seats);
    setTotalAmount(total);
  }, []);

  const bookingFee = selectedSeats.length * APP_CONFIG.BOOKING_FEE_PER_TICKET;
  const gst = bookingFee * APP_CONFIG.GST_PERCENTAGE;
  const grandTotal = totalAmount + bookingFee + gst;

  const canProceed = !!selectedTiming;

  return (
    <div
      className="page-transition"
      style={{ maxWidth: 1200, margin: "0 auto" }}
    >
      <div
        style={{
          background: "white",
          padding: 24,
          borderRadius: 12,
          marginBottom: 24,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div className="booking-header">
          <div className="booking-banner-container">
            {!imageLoaded && (
              <Skeleton.Button
                active
                style={{ width: 120, height: 180, borderRadius: 8 }}
              />
            )}
            <img
              src={event.imageUrl}
              alt={`${event.title} banner`}
              onLoad={() => setImageLoaded(true)}
              style={{
                width: 120,
                height: 180,
                objectFit: "cover",
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                display: imageLoaded ? "block" : "none",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Title
              level={2}
              className="booking-title"
              style={{ margin: 0, marginBottom: 8, fontSize: 28 }}
            >
              {event.title}
            </Title>
            <Space size={16} wrap style={{ marginBottom: 16 }}>
              <Tag
                color="#F84464"
                style={{
                  border: "none",
                  padding: "4px 12px",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {event.category.toUpperCase()}
              </Tag>
              <Space size={4} style={{ fontSize: 14 }}>
                <EnvironmentOutlined style={{ color: "#666" }} />
                <Text type="secondary">
                  {event.venue}, {event.location}
                </Text>
              </Space>
              <Space size={4} style={{ fontSize: 14 }}>
                <CalendarOutlined style={{ color: "#666" }} />
                <Text type="secondary">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              </Space>
            </Space>
            <Divider style={{ margin: "12px 0" }} />
            <Text
              style={{
                fontSize: 14,
                color: "#666",
                lineHeight: 1.6,
                maxWidth: 800,
                display: "block",
              }}
            >
              {event.description}
            </Text>
          </div>
        </div>
        <style>{`
          .booking-header {
            display: flex;
            gap: 24px;
            align-items: start;
          }
          @media (max-width: 576px) {
            .hero-banner {
              padding: 32px 24px !important;
              min-height: auto !important;
              text-align: center;
            }
            .hero-title {
              font-size: 28px !important;
              margin-bottom: 12px !important;
              display: block !important;
            }
            .hero-subtitle {
              font-size: 14px !important;
              margin-bottom: 24px !important;
            }
            .hero-banner .ant-btn {
              width: 100%;
              margin-left: 0 !important;
              margin-bottom: 12px;
            }
            .hero-banner > div {
               max-width: 100% !important;
               margin: 0 auto;
            }
          }
          @media (max-width: 768px) {
            .booking-header {
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .booking-title {
              font-size: 22px !important;
              margin-top: 16px !important;
            }
            .booking-banner-container {
              width: 160px !important;
              height: 240px !important;
            }
            .booking-banner-container > .ant-skeleton, 
            .booking-banner-container > img {
              width: 160px !important;
              height: 240px !important;
            }
          }
        `}</style>
      </div>

      <Card
        title={
          <Space>
            <ClockCircleOutlined style={{ color: "#F84464" }} />
            <Text strong style={{ fontSize: 16 }}>
              Select Show Timing
            </Text>
          </Space>
        }
        style={{
          marginBottom: 24,
          borderRadius: 12,
          border: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
        bodyStyle={{ padding: 24 }}
      >
        <Space size={12} wrap>
          {SHOW_TIMINGS.map((timing) => (
            <Tag
              key={timing.id}
              role="button"
              aria-pressed={selectedTiming === timing.id}
              onClick={() => timing.available && setSelectedTiming(timing.id)}
              style={{
                padding: "10px 24px",
                fontSize: 14,
                cursor: timing.available ? "pointer" : "not-allowed",
                borderRadius: 4,
                border:
                  selectedTiming === timing.id
                    ? "1px solid #F84464"
                    : "1px solid #e5e7eb",
                background: timing.available
                  ? selectedTiming === timing.id
                    ? "#F84464"
                    : "white"
                  : "#f5f5f5",
                color: timing.available
                  ? selectedTiming === timing.id
                    ? "white"
                    : "#333"
                  : "#999",
                transition: "all 0.2s",
                fontWeight: 500,
              }}
            >
              {timing.time}
            </Tag>
          ))}
        </Space>
      </Card>

      {selectedTiming && (
        <Card
          title={
            <Text strong style={{ fontSize: 16 }}>
              Select Your Seats
            </Text>
          }
          style={{
            marginBottom: 24,
            borderRadius: 12,
            border: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
          bodyStyle={{ padding: 24 }}
        >
          <SeatSelection
            onSeatsChange={handleSeatsChange}
            basePrice={event.price}
            timingId={selectedTiming}
          />
        </Card>
      )}

      {canProceed && (
        <Card
          style={{
            borderRadius: 12,
            border: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          }}
          bodyStyle={{ padding: 32 }}
        >
          {selectedSeats.length === 0 && (
            <Alert
              message="Please select at least one seat to continue with payment"
              type="info"
              showIcon
              style={{ marginBottom: 24, borderRadius: 8 }}
            />
          )}
          <Form method="post">
            <input type="hidden" name="eventId" value={event.id} />
            <input
              type="hidden"
              name="ticketQuantity"
              value={selectedSeats.length}
            />
            <input type="hidden" name="totalAmount" value={grandTotal} />
            <input type="hidden" name="paymentMethod" value={paymentMethod} />
            <input type="hidden" name="showTiming" value={selectedTiming} />
            <input
              type="hidden"
              name="seats"
              value={JSON.stringify(selectedSeats.map((s) => s.id))}
            />

            <Row gutter={{ xs: 16, sm: 24, md: 48 }}>
              <Col xs={24} md={14}>
                <Text
                  strong
                  style={{ display: "block", marginBottom: 16, fontSize: 18 }}
                >
                  Payment Method
                </Text>
                <Radio.Group
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  value={paymentMethod}
                  style={{ width: "100%" }}
                  disabled={selectedSeats.length === 0}
                >
                  <Space
                    direction="vertical"
                    style={{ width: "100%" }}
                    size={16}
                  >
                    <div
                      style={{
                        border:
                          paymentMethod === "stripe"
                            ? "1px solid #F84464"
                            : "1px solid #e5e7eb",
                        borderRadius: 8,
                        padding: "16px",
                        background:
                          paymentMethod === "stripe" ? "#FFF5F7" : "white",
                        cursor:
                          selectedSeats.length > 0 ? "pointer" : "not-allowed",
                        transition: "all 0.2s",
                        opacity: selectedSeats.length === 0 ? 0.6 : 1,
                      }}
                      onClick={() =>
                        selectedSeats.length > 0 && setPaymentMethod("stripe")
                      }
                      aria-label="Pay via Credit or Debit Card"
                    >
                      <Radio value="stripe" style={{ width: "100%" }}>
                        <Space>
                          <WalletOutlined
                            style={{ fontSize: 20, color: "#F84464" }}
                          />
                          <div>
                            <Text strong style={{ display: "block" }}>
                              Credit/Debit Card
                            </Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              Safe money transfer using your bank account
                            </Text>
                          </div>
                        </Space>
                      </Radio>
                    </div>

                    <div
                      style={{
                        border:
                          paymentMethod === "upi"
                            ? "1px solid #F84464"
                            : "1px solid #e5e7eb",
                        borderRadius: 8,
                        padding: "16px",
                        background:
                          paymentMethod === "upi" ? "#FFF5F7" : "white",
                        cursor:
                          selectedSeats.length > 0 ? "pointer" : "not-allowed",
                        transition: "all 0.2s",
                        opacity: selectedSeats.length === 0 ? 0.6 : 1,
                      }}
                      onClick={() =>
                        selectedSeats.length > 0 && setPaymentMethod("upi")
                      }
                      aria-label="Pay via UPI or Net Banking"
                    >
                      <Radio value="upi" style={{ width: "100%" }}>
                        <Space>
                          <WalletOutlined
                            style={{ fontSize: 20, color: "#F84464" }}
                          />
                          <div>
                            <Text strong style={{ display: "block" }}>
                              UPI / Net Banking
                            </Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              Pay via GooglePay, PhonePe, Paytm
                            </Text>
                          </div>
                        </Space>
                      </Radio>
                    </div>
                  </Space>
                </Radio.Group>

                <Alert
                  message="Safe & Secure"
                  description="Your payment details are encrypted and secure."
                  type="success"
                  showIcon
                  style={{ marginTop: 24, borderRadius: 8 }}
                />
              </Col>

              <Col xs={24} md={10}>
                <div
                  style={{
                    background: "#F9FAFB",
                    padding: 24,
                    borderRadius: 12,
                  }}
                >
                  <Title level={4} style={{ marginTop: 0 }}>
                    Booking Summary
                  </Title>
                  <Space
                    direction="vertical"
                    size={16}
                    style={{ width: "100%" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text type="secondary">
                        Seats ({selectedSeats.length})
                      </Text>
                      <Text strong>
                        {selectedSeats.length > 0
                          ? selectedSeats.map((s) => s.id).join(", ")
                          : "None Selected"}
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text type="secondary">Show Time</Text>
                      <Text strong>
                        {
                          SHOW_TIMINGS.find((t) => t.id === selectedTiming)
                            ?.time
                        }
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text type="secondary">Subtotal</Text>
                      <Text>₹{totalAmount || 0}</Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text type="secondary">Booking Fee</Text>
                      <Text>₹{bookingFee || 0}</Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text type="secondary">
                        GST ({APP_CONFIG.GST_PERCENTAGE * 100}%)
                      </Text>
                      <Text>₹{(gst || 0).toFixed(2)}</Text>
                    </div>
                    <Divider style={{ margin: "16px 0" }} />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text strong style={{ fontSize: 18 }}>
                        Total Amount
                      </Text>
                      <Text strong style={{ fontSize: 24, color: "#F84464" }}>
                        ₹{(grandTotal || 0).toFixed(2)}
                      </Text>
                    </div>
                  </Space>

                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={isSubmitting}
                    disabled={selectedSeats.length === 0}
                    style={{
                      marginTop: 24,
                      height: 56,
                      fontSize: 18,
                      fontWeight: 700,
                      background: "#F84464",
                      borderColor: "#F84464",
                    }}
                  >
                    {selectedSeats.length === 0
                      ? "Select Seats to Pay"
                      : `Pay ₹${grandTotal.toFixed(2)}`}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default EventBookingPage;
