import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Typography, Space, Tag, Divider } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { Seat } from "../../../types";

const { Text } = Typography;

interface SeatSelectionProps {
  onSeatsChange: (seats: Seat[], total: number) => void;
  basePrice: number;
  timingId: string;
}

const SEAT_COLORS = {
  premium: { color: "#F84464", label: "Premium" },
  gold: { color: "#FFB23F", label: "Gold" },
  silver: { color: "#A0A0A0", label: "Silver" },
};

export const SeatSelection: React.FC<SeatSelectionProps> = ({
  onSeatsChange,
  basePrice,
  timingId,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const PRICES = useMemo(
    () => ({
      silver: basePrice,
      gold: Math.ceil(basePrice * 1.2),
      premium: Math.ceil(basePrice * 1.5),
    }),
    [basePrice],
  );

  const generateSeats = useCallback(() => {
    const layout: Seat[][] = [];
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];

    rows.forEach((row, rowIndex) => {
      const rowSeats: Seat[] = [];
      const seatsInRow = 12;
      let type: "premium" | "gold" | "silver" = "silver";

      if (rowIndex < 2) type = "premium";
      else if (rowIndex < 5) type = "gold";

      for (let i = 1; i <= seatsInRow; i++) {
        const id = `${row}${i}`;

        const seed = timingId.charCodeAt(0) + (timingId.charCodeAt(1) || 0);
        const hash = (id.charCodeAt(0) * 31 + i + seed) % 100;

        const isBooked = hash < 30 + rowIndex * 2;

        rowSeats.push({
          id,
          row,
          number: i,
          type,
          price: PRICES[type],
          status: isBooked ? "booked" : "available",
        });
      }
      layout.push(rowSeats);
    });

    return layout;
  }, [timingId, PRICES]);

  const [seatLayout, setSeatLayout] = useState<Seat[][]>([]);

  useEffect(() => {
    setSeatLayout(generateSeats());
    setSelectedSeats([]);
    onSeatsChange([], 0);
  }, [generateSeats, onSeatsChange]);

  const SEAT_INFO = {
    premium: { ...SEAT_COLORS.premium, price: PRICES.premium },
    gold: { ...SEAT_COLORS.gold, price: PRICES.gold },
    silver: { ...SEAT_COLORS.silver, price: PRICES.silver },
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "booked") return;

    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    let newSelection: Seat[];

    if (isSelected) {
      newSelection = selectedSeats.filter((s) => s.id !== seat.id);
    } else {
      if (selectedSeats.length >= 10) {
        return;
      }
      newSelection = [...selectedSeats, seat];
    }

    setSelectedSeats(newSelection);
    const total = newSelection.reduce((sum, s) => sum + s.price, 0);
    onSeatsChange(newSelection, total);
  };

  const getSeatStatus = (seat: Seat): "available" | "booked" | "selected" => {
    if (seat.status === "booked") return "booked";
    return selectedSeats.some((s) => s.id === seat.id)
      ? "selected"
      : "available";
  };

  return (
    <div>
      <div
        style={{
          marginBottom: 32,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        {Object.entries(SEAT_INFO).map(([key, value]) => (
          <Space key={key} size={8} align="center">
            <div
              style={{
                width: 16,
                height: 16,
                background: value.color,
                borderRadius: 2,
              }}
            />
            <Text style={{ fontSize: 12 }}>
              {value.label} ₹{value.price}
            </Text>
          </Space>
        ))}
        <Space size={8} align="center">
          <div
            style={{
              width: 16,
              height: 16,
              background: "#E0E0E0",
              borderRadius: 2,
            }}
          />
          <Text style={{ fontSize: 12 }}>Booked</Text>
        </Space>
        <Space size={8} align="center">
          <div
            style={{
              width: 16,
              height: 16,
              background: "#10B981",
              borderRadius: 2,
            }}
          />
          <Text style={{ fontSize: 12 }}>Selected</Text>
        </Space>
      </div>

      <div
        style={{
          position: "relative",
          background: "white",
          padding: "32px 16px",
          borderRadius: 8,
          border: "1px solid #eee",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            margin: "0 auto 48px",
            width: "80%",
            maxWidth: 300,
            textAlign: "center",
          }}
        >
          <div
            style={{
              height: 4,
              background: "#ddd",
              borderRadius: "50%",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            }}
          />
          <Text
            style={{
              fontSize: 10,
              color: "#999",
              marginTop: 8,
              display: "block",
            }}
          >
            SCREEN THIS WAY
          </Text>
        </div>

        <div
          style={{
            minWidth: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Space direction="vertical" size={12}>
            {seatLayout.map((row, rowIndex) => (
              <div
                key={rowIndex}
                style={{ display: "flex", gap: 8, alignItems: "center" }}
              >
                <Text
                  style={{
                    width: 20,
                    fontSize: 12,
                    color: "#999",
                    textAlign: "right",
                    marginRight: 8,
                  }}
                >
                  {row[0].row}
                </Text>
                {row.map((seat) => {
                  const status = getSeatStatus(seat);
                  const bgColor =
                    status === "booked"
                      ? "#E0E0E0"
                      : status === "selected"
                        ? "#10B981"
                        : SEAT_COLORS[seat.type].color;
                  const cursor =
                    status === "booked" ? "not-allowed" : "pointer";

                  return (
                    <div
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      style={{
                        width: 28,
                        height: 28,
                        background: bgColor,
                        borderRadius: 4,
                        cursor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.1s",
                        transform:
                          status === "selected" ? "scale(1.1)" : "none",
                        color: "white",
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      {status === "selected" ? (
                        <CheckCircleFilled />
                      ) : status !== "booked" ? (
                        <span style={{ opacity: 0.7 }}>{seat.number}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </Space>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <Divider />
          <Space size={[8, 8]} wrap>
            {selectedSeats.map((seat) => (
              <Tag
                key={seat.id}
                color="success"
                closable
                onClose={() => handleSeatClick(seat)}
              >
                {seat.id} (₹{seat.price})
              </Tag>
            ))}
          </Space>
        </div>
      )}
    </div>
  );
};
