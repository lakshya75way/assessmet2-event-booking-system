import React from "react";
import { Card, Tag, Typography, Space, Skeleton } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Event } from "../../../types";

const { Text, Paragraph } = Typography;

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = React.memo(({ event }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(event.likes || 0);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount((prev: number) => (isLiked ? prev - 1 : prev + 1));
  };

  const formatLikes = (count: number) => {
    if (count >= 1000) return (count / 1000).toFixed(1) + "k";
    return count;
  };

  return (
    <Link to={`/events/${event.id}`} style={{ display: "block" }}>
      <Card
        hoverable
        cover={
          <div
            style={{
              position: "relative",
              paddingTop: "133.33%", // 3:4 Aspect Ratio
              overflow: "hidden",
              borderRadius: "10px 10px 0 0",
              backgroundColor: "#f5f5f5",
            }}
          >
            {!imageLoaded && (
              <Skeleton.Button
                active
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
            <img
              alt={event.title}
              src={event.imageUrl}
              onLoad={() => setImageLoaded(true)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                display: imageLoaded ? "block" : "none",
              }}
              className="card-img"
            />
            {/* Heart/Interest Overlay - Functional Like */}
            <div
              onClick={handleLike}
              role="button"
              aria-label={isLiked ? "Unlike event" : "Like event"}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: isLiked
                  ? "rgba(248, 68, 100, 0.9)"
                  : "rgba(0,0,0,0.4)",
                backdropFilter: "blur(6px)",
                padding: "4px 8px",
                borderRadius: 20,
                color: "white",
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                gap: 4,
                zIndex: 10,
                transition: "all 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              {isLiked ? (
                <HeartFilled style={{ color: "white" }} />
              ) : (
                <HeartOutlined style={{ color: "#F84464" }} />
              )}{" "}
              {formatLikes(likeCount)}
            </div>

            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
                padding: "24px 10px 10px",
              }}
            >
              <Tag
                color="#F84464"
                style={{
                  margin: 0,
                  border: "none",
                  fontWeight: 700,
                  borderRadius: 4,
                  fontSize: 9,
                  letterSpacing: "0.5px",
                }}
              >
                {event.category.toUpperCase()}
              </Tag>
            </div>
          </div>
        }
        bodyStyle={{ padding: "10px" }}
        style={{
          borderRadius: 10,
          overflow: "hidden",
          border: "1px solid #f0f0f0",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          transition: "all 0.3s ease",
        }}
        className="event-card"
      >
        <Space direction="vertical" size={0} style={{ width: "100%" }}>
          <Paragraph
            strong
            style={{
              fontSize: "14px",
              display: "block",
              color: "#1f1f1f",
              lineHeight: 1.3,
              height: "38px", // Reduced height
              margin: "0 0 4px 0",
              overflow: "hidden",
            }}
            ellipsis={{ rows: 2, symbol: "..." }}
          >
            {event.title}
          </Paragraph>

          <Space
            size={4}
            split={<span style={{ color: "#eee" }}>|</span>}
            style={{ color: "#8c8c8c", fontSize: 11 }}
            className="card-details"
          >
            <Text
              style={{
                color: "#8c8c8c",
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Text>
            <Text
              style={{ color: "#8c8c8c", fontSize: 11, maxWidth: 60 }}
              ellipsis
            >
              {event.location}
            </Text>
          </Space>

          <div
            style={{
              marginTop: 6,
              display: "flex",
              alignItems: "baseline",
              gap: 4,
            }}
          >
            <Text type="secondary" style={{ fontSize: 11 }}>
              From
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#F84464",
              }}
            >
              ₹{event.price}
            </Text>
          </div>
        </Space>
      </Card>

      <style>{`
        .event-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.1) !important;
            border-color: #F84464 !important;
        }
        .event-card:hover .card-img {
            transform: scale(1.08);
        }
      `}</style>
    </Link>
  );
});
