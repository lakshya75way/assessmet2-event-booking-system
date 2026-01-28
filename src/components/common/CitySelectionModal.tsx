import React, { useState, useEffect } from "react";
import { Modal, Input, Typography, Space, Tag, Empty } from "antd";
import { SearchOutlined, CompassOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const POPULAR_CITIES = [
  "Mumbai",
  "Delhi-NCR",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Kochi",
  "Ahmedabad",
  "Chandigarh",
  "Jaipur",
  "Lucknow",
];

const OTHER_CITIES = [
  "Goa",
  "Indore",
  "Bhopal",
  "Vadodara",
  "Nagpur",
  "Coimbatore",
  "Thiruvananthapuram",
  "Visakhapatnam",
  "Surat",
  "New York",
  "London",
  "Dubai",
  "Singapore",
];

interface CitySelectionModalProps {
  visible: boolean;
  onSelect: (city: string) => void;
}

export const CitySelectionModal: React.FC<CitySelectionModalProps> = ({
  visible,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (visible) setSearchTerm("");
  }, [visible]);

  const allCities = [...POPULAR_CITIES, ...OTHER_CITIES].sort();

  const filteredCities = searchTerm
    ? allCities.filter((city) =>
        city.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : allCities;

  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      width={700}
      centered
      styles={{
        body: { padding: "40px" },
        mask: { backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.6)" },
      }}
    >
      <Space direction="vertical" size={32} style={{ width: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <CompassOutlined
            style={{ fontSize: 48, color: "#F84464", marginBottom: 16 }}
          />
          <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
            Pick your location
          </Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Discover events, movies, and experiences in your city
          </Text>
        </div>

        <Input
          size="large"
          placeholder="Search for your city"
          prefix={<SearchOutlined style={{ color: "#aaa" }} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            borderRadius: 8,
            height: 50,
            fontSize: 16,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        />

        <div style={{ maxHeight: "50vh", overflowY: "auto", paddingRight: 8 }}>
          {searchTerm ? (
            filteredCities.length > 0 ? (
              <Space size={[12, 12]} wrap>
                {filteredCities.map((city) => (
                  <Tag
                    key={city}
                    className="city-tag"
                    onClick={() => onSelect(city)}
                  >
                    {city}
                  </Tag>
                ))}
              </Space>
            ) : (
              <Empty
                description="No cities found"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )
          ) : (
            <>
              <div style={{ marginBottom: 24 }}>
                <Text
                  strong
                  style={{
                    display: "block",
                    marginBottom: 16,
                    color: "#666",
                    textTransform: "uppercase",
                    fontSize: 12,
                    letterSpacing: 1,
                  }}
                >
                  Popular Cities
                </Text>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(100px, 1fr))",
                    gap: 16,
                    textAlign: "center",
                  }}
                >
                  <div
                    onClick={() => onSelect("All")}
                    style={{
                      cursor: "pointer",
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #F84464",
                      background: "#fff5f7",
                      transition: "all 0.2s",
                    }}
                    className="popular-city-item"
                  >
                    <Text strong style={{ fontSize: 13, color: "#F84464" }}>
                      All Cities
                    </Text>
                  </div>

                  {POPULAR_CITIES.map((city) => (
                    <div
                      key={city}
                      onClick={() => onSelect(city)}
                      style={{
                        cursor: "pointer",
                        padding: 8,
                        borderRadius: 8,
                        border: "1px solid #eee",
                        transition: "all 0.2s",
                      }}
                      className="popular-city-item"
                    >
                      <Text strong style={{ fontSize: 13 }}>
                        {city}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Text
                  strong
                  style={{
                    display: "block",
                    marginBottom: 16,
                    color: "#666",
                    textTransform: "uppercase",
                    fontSize: 12,
                    letterSpacing: 1,
                  }}
                >
                  Other Cities
                </Text>
                <Space size={[12, 12]} wrap>
                  {OTHER_CITIES.map((city) => (
                    <Tag
                      key={city}
                      className="city-tag"
                      onClick={() => onSelect(city)}
                    >
                      {city}
                    </Tag>
                  ))}
                </Space>
              </div>
            </>
          )}
        </div>
      </Space>

      <style>{`
        .city-tag {
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          border: 1px solid #e5e7eb;
          background: white;
          transition: all 0.2s;
        }
        .city-tag:hover, .popular-city-item:hover {
          background: #F84464;
          color: white !important;
          border-color: #F84464;
        }
        .popular-city-item:hover span {
             color: white !important;
        }
      `}</style>
    </Modal>
  );
};
