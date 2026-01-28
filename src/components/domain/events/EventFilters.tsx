import React, { memo } from "react";
import { Space, Tag, Select, DatePicker, Typography } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const { CheckableTag } = Tag;
const { Text } = Typography;
const { RangePicker } = DatePicker;

const CATEGORIES = ["All", "Movies", "Music", "Tech", "Sports", "Arts"];
const LOCATIONS = [
  "All",
  "Mumbai",
  "Delhi-NCR",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Gurugram",
  "Goa",
  "Nashik",
  "Kolkata",
  "Jaipur",
  "Ziro, Arunachal Pradesh",
];

interface EventFiltersProps {
  category: string;
  location: string;
  dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
  onCategoryChange: (cat: string) => void;
  onLocationChange: (loc: string) => void;
  onDateRangeChange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
}

export const EventFilters: React.FC<EventFiltersProps> = memo(
  ({
    category,
    location,
    dateRange,
    onCategoryChange,
    onLocationChange,
    onDateRangeChange,
  }) => {
    return (
      <div
        style={{
          background: "#fff",
          padding: "20px 0",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <Space direction="vertical" size={20} style={{ width: "100%" }}>
          <Space size={24} wrap align="center">
            <div style={{ minWidth: 200 }}>
              <Text
                type="secondary"
                style={{
                  fontSize: 12,
                  display: "block",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Location
              </Text>
              <Select
                value={location}
                onChange={onLocationChange}
                style={{ width: "100%" }}
                options={LOCATIONS.map((loc) => ({ label: loc, value: loc }))}
                placeholder="Select City"
                size="large"
              />
            </div>

            <div style={{ minWidth: 300 }}>
              <Text
                type="secondary"
                style={{
                  fontSize: 12,
                  display: "block",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Date Range
              </Text>
              <RangePicker
                value={dateRange}
                onChange={onDateRangeChange}
                style={{ width: "100%" }}
                size="large"
              />
            </div>
          </Space>

          <Space size={8} wrap>
            {CATEGORIES.map((cat) => (
              <CheckableTag
                key={cat}
                checked={category === cat}
                onChange={() => onCategoryChange(cat)}
                style={{
                  padding: "6px 20px",
                  borderRadius: 20,
                  fontSize: 14,
                  border: category === cat ? "none" : "1px solid #e2e8f0",
                  backgroundColor: category === cat ? "#F84464" : "transparent",
                  color: category === cat ? "white" : "#64748b",
                  transition: "all 0.3s",
                }}
              >
                {cat}
              </CheckableTag>
            ))}
          </Space>
        </Space>
      </div>
    );
  },
);
