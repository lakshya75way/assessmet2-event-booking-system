import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Result,
  Space,
  Tag,
  App,
  Switch,
  InputNumber,
  Descriptions,
  Divider,
} from "antd";
import {
  ScanOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ReloadOutlined,
  CameraOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { ticketService } from "../../services/ticket/ticket.service";

import { Ticket, Event } from "../../types";

const { Text, Title } = Typography;

interface ScannedTicket extends Ticket {
  event?: Event;
  holder?: string;
  seat?: string;
}

interface ReviewData {
  ticket: ScannedTicket;
  group: {
    total: number;
    used: number;
    remaining: number;
  };
}

const CameraPreview: React.FC<{ onScan: (val: string) => void }> = ({
  onScan,
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        setError("Could not access camera. Please allow permissions.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        position: "relative",
      }}
    >
      {error ? (
        <div style={{ color: "white", padding: 20, textAlign: "center" }}>
          <CloseCircleFilled style={{ fontSize: 24, marginBottom: 8 }} />
          <div>{error}</div>
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          zIndex: 10,
          background: "rgba(0,0,0,0.5)",
          padding: "10px 20px",
          borderRadius: 8,
        }}
      >
        <Button type="primary" onClick={() => onScan("TICKET-SIMULATED-QR")}>
          Simulate Scan (Mock)
        </Button>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: "2px solid rgba(255,255,255,0.3)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 200,
            height: 200,
            border: "2px solid #10b981",
            borderRadius: 12,
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
          }}
        ></div>
      </div>
    </div>
  );
};

export const TicketScannerPage: React.FC = () => {
  const [ticketId, setTicketId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scanState, setScanState] = useState<
    "idle" | "review" | "success" | "error"
  >("idle");
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [resultMessage, setResultMessage] = useState("");
  const [checkInQty, setCheckInQty] = useState(1);
  const [cameraMode, setCameraMode] = useState(false);
  const { message } = App.useApp();

  const handleSearch = async (searchId?: string) => {
    const idToSearch = (searchId || ticketId).trim();
    if (!idToSearch) {
      message.error("Please enter a ticket ID");
      return;
    }

    setIsLoading(true);
    try {
      const data = await ticketService.searchTicket(idToSearch);
      setReviewData(data);
      setScanState("review");
      setCheckInQty(1);
      if (searchId) setTicketId(searchId);
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      const errorMsg = axiosError.response?.data?.message || "Ticket not found";
      message.error(errorMsg);
      setScanState("error");
      setResultMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckIn = async (all: boolean = false) => {
    setIsLoading(true);
    try {
      const data = await ticketService.validateTicket({
        ticketId: ticketId.trim(),
        checkInAll: all,
        checkInQuantity: checkInQty,
      });

      if (data.valid) {
        setScanState("success");
        setResultMessage(data.message);
        message.success("Check-in successful");
      } else {
        setScanState("error");
        setResultMessage(data.message || "Validation failed");
        message.error(data.message || "Validation failed");
      }
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      message.error(axiosError.response?.data?.message || "Check-in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const resetScan = () => {
    setTicketId("");
    setScanState("idle");
    setReviewData(null);
    setResultMessage("");
    setCheckInQty(1);
  };

  // Render Helpers
  const renderIdle = () => (
    <div style={{ textAlign: "center", padding: "24px 0" }}>
      <div
        style={{
          textAlign: "right",
          marginBottom: 24,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Space>
          <Text type="secondary">Camera Mode</Text>
          <Switch
            checked={cameraMode}
            onChange={setCameraMode}
            checkedChildren={<CameraOutlined />}
            unCheckedChildren={<ScanOutlined />}
          />
        </Space>
      </div>

      {cameraMode ? (
        <div
          style={{
            position: "relative",
            height: 300,
            background: "#000",
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CameraPreview
            onScan={(mockQr) => {
              setCameraMode(false);
              handleSearch(mockQr);
            }}
          />
        </div>
      ) : (
        <>
          <div
            style={{
              width: 80,
              height: 80,
              background: "#f0f2f5",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <ScanOutlined style={{ fontSize: 32, color: "#666" }} />
          </div>
          <Title level={4} style={{ marginBottom: 24 }}>
            Ready to Scan
          </Title>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Input
              placeholder="Enter Ticket ID / Scan QR"
              size="large"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              prefix={<ScanOutlined style={{ color: "#bfbfbf" }} />}
              onPressEnter={() => handleSearch()}
              style={{ borderRadius: 8 }}
            />
            <Button
              type="primary"
              size="large"
              onClick={() => handleSearch()}
              loading={isLoading}
              block
              style={{
                height: 48,
                borderRadius: 8,
                background: "#F84464",
                borderColor: "#F84464",
              }}
            >
              Search Ticket
            </Button>
          </Space>
        </>
      )}
    </div>
  );

  const renderReview = () => {
    if (!reviewData) return null;
    const { ticket, group } = reviewData;
    const isSoldOut = group.remaining === 0;

    return (
      <div style={{ padding: "0" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <CheckCircleFilled
            style={{ fontSize: 48, color: "#10B981", marginBottom: 16 }}
          />
          <Title level={3} style={{ margin: 0 }}>
            Ticket Found
          </Title>
          <Text type="secondary">{ticket.id}</Text>
        </div>

        <div
          style={{
            background: "#f9fafb",
            padding: 24,
            borderRadius: 12,
            marginBottom: 24,
          }}
        >
          <Descriptions title="Event Details" column={1} size="small">
            <Descriptions.Item label="Event">
              <b>{ticket.event?.title}</b>
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {ticket.event?.date
                ? new Date(ticket.event.date).toLocaleDateString()
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Seat">
              <Tag color="blue">{ticket.seat || "General"}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Holder">
              {ticket.holder || "Guest"}
            </Descriptions.Item>
          </Descriptions>
          <Divider style={{ margin: "16px 0" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Space>
              <TeamOutlined />
              <Text strong>Group Status</Text>
            </Space>
            <Tag color={isSoldOut ? "red" : "green"}>
              {group.used}/{group.total} Checked In
            </Tag>
          </div>
          <div style={{ marginTop: 8, textAlign: "right" }}>
            <Text type="secondary">
              Available to Check-in: <b>{group.remaining}</b>
            </Text>
          </div>
        </div>

        {!isSoldOut && (
          <div
            style={{
              background: "#fff",
              border: "1px solid #eee",
              padding: 16,
              borderRadius: 12,
              marginBottom: 24,
            }}
          >
            <Text strong style={{ display: "block", marginBottom: 12 }}>
              Check-in Actions
            </Text>
            <Space align="center" style={{ marginBottom: 16 }}>
              <Text>Quantity:</Text>
              <InputNumber
                min={1}
                max={group.remaining}
                value={checkInQty}
                onChange={(val) => setCheckInQty(val || 1)}
              />
              <Button
                type="primary"
                onClick={() => handleCheckIn(false)}
                loading={isLoading}
              >
                Check In {checkInQty}
              </Button>
            </Space>
            <div style={{ marginTop: 8 }}>
              <Button
                block
                onClick={() => handleCheckIn(true)}
                disabled={isLoading}
              >
                Check In All Remaining ({group.remaining})
              </Button>
            </div>
          </div>
        )}

        {isSoldOut && (
          <Result
            status="warning"
            subTitle="All tickets in this group have already been used."
            style={{ padding: "0 0 24px" }}
          />
        )}

        <Button block size="large" onClick={resetScan}>
          Cancel / Scan Next
        </Button>
      </div>
    );
  };

  const renderResult = (status: "success" | "error") => (
    <div style={{ textAlign: "center", padding: "24px 0" }}>
      <Result
        status={status}
        title={status === "success" ? "Check-in Complete" : "Error"}
        subTitle={resultMessage}
        icon={
          status === "success" ? (
            <CheckCircleFilled style={{ color: "#10B981" }} />
          ) : (
            <CloseCircleFilled style={{ color: "#EF4444" }} />
          )
        }
      />
      <Button
        type="primary"
        size="large"
        icon={<ReloadOutlined />}
        onClick={resetScan}
        style={{ minWidth: 200, borderRadius: 8 }}
      >
        Scan Next Ticket
      </Button>
    </div>
  );

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px 0" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
        Admin Ticket Scanner
      </Title>

      <Card
        bordered={false}
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: 16 }}
      >
        {scanState === "idle" && renderIdle()}
        {scanState === "review" && renderReview()}
        {(scanState === "success" || scanState === "error") &&
          renderResult(scanState)}
      </Card>
    </div>
  );
};
