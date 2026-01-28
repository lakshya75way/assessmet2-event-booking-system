import { useEventFilters } from "../../hooks/events/useEventFilters";
import { useLoaderData } from "react-router-dom";
import { Row, Col, Typography, Pagination } from "antd";
import { EventCard } from "../../components/domain/events/EventCard";
import { EventFilters } from "../../components/domain/events/EventFilters";
import { Event, PaginatedResponse } from "../../types";
import { Button } from "../../components/ui/Button";

const { Title, Text } = Typography;

export const EventsListPage: React.FC = () => {
  const response = useLoaderData() as PaginatedResponse<Event>;

  const {
    category,
    location,
    search,
    dateRange,
    setCategory,
    setLocation,
    setDateRange,
    setPage,
    updateFilters,
  } = useEventFilters();

  const handleCategoryChange = setCategory;
  const handleLocationChange = setLocation;
  const handleDateRangeChange = setDateRange;
  const handlePageChange = setPage;

  return (
    <div className="page-transition">
      {!search && (
        <div
          className="hero-banner"
          style={{
            background: "linear-gradient(90deg, #1A1A1A 0%, #2A2A2A 100%)",
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 32,
            position: "relative",
            minHeight: 200,
            display: "flex",
            alignItems: "center",
            padding: "32px",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -50,
              top: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(248, 68, 100, 0.1)",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 600 }}>
            <Title
              level={1}
              className="hero-title"
              style={{
                color: "white",
                margin: 0,
                fontSize: 32,
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Endless <span style={{ color: "#F84464" }}>Entertainment</span>
            </Title>
            <Text
              className="hero-subtitle"
              style={{
                color: "#aaa",
                fontSize: 15,
                marginTop: 12,
                display: "block",
              }}
            >
              From the front row of a concert to the center circle of a stadium,
              find your next unforgettable moment.
            </Text>

            <div style={{ marginTop: 24 }}>
              <Button
                type="primary"
                size="large"
                onClick={() =>
                  updateFilters({ search: null, category: "music" })
                }
                style={{
                  borderRadius: 30,
                  height: 48,
                  padding: "0 32px",
                  background: "#F84464",
                  border: "none",
                  fontWeight: 700,
                }}
              >
                Explore Music
              </Button>
              <Button
                type="default"
                size="large"
                onClick={() =>
                  updateFilters({
                    search: null,
                    category: "All",
                    location: "All",
                    startDate: null,
                    endDate: null,
                  })
                }
                style={{
                  borderRadius: 30,
                  height: 48,
                  padding: "0 32px",
                  marginLeft: 16,
                  background: "transparent",
                  borderColor: "#F84464",
                  color: "#F84464",
                  fontWeight: 700,
                }}
              >
                View All
              </Button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hero-banner {
            flex-direction: column !important;
            justify-content: center !important;
            text-align: center !important;
            padding: 40px 20px !important;
            min-height: auto !important;
            display: flex !important;
          }
          .hero-banner > div {
            width: 100% !important;
            max-width: 100% !important;
          }
          .hero-title {
            font-size: 28px !important;
            line-height: 1.2 !important;
            margin-bottom: 12px !important;
          }
          .hero-subtitle {
            font-size: 14px !important;
            margin-bottom: 24px !important;
            display: block !important;
            white-space: normal !important;
          }
          .hero-banner .ant-btn {
            width: 100%;
            margin-left: 0 !important;
            margin-bottom: 12px;
          }
        }
      `}</style>

      <div
        className="filters-container"
        style={{
          background: "white",
          padding: "16px 24px",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          marginBottom: 32,
          position: "sticky",
          top: 72,
          zIndex: 900,
        }}
      >
        <EventFilters
          category={category}
          location={location}
          dateRange={dateRange}
          onCategoryChange={handleCategoryChange}
          onLocationChange={handleLocationChange}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>

      <div
        className="events-list-header"
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <Title level={2} style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
          {search
            ? `Search Results for "${search}"`
            : location !== "All"
              ? `Events in ${location}`
              : category === "All"
                ? "Recommended Events"
                : `${category} Events`}
        </Title>
        <Text type="secondary" style={{ fontSize: 14 }}>
          {response.total} Events
        </Text>
      </div>

      <style>{`
        @media (max-width: 576px) {
          .events-list-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .filters-container {
            top: 130px !important;
            padding: 12px 16px !important;
          }
        }
      `}</style>

      {response?.items?.length > 0 ? (
        <>
          <Row
            gutter={[
              { xs: 12, sm: 16, md: 24 },
              { xs: 12, sm: 16, md: 24 },
            ]}
          >
            {response.items.map((event: Event) => (
              <Col xs={12} sm={12} md={8} lg={6} key={event.id}>
                <EventCard event={event} />
              </Col>
            ))}
          </Row>

          <div
            style={{ marginTop: 40, textAlign: "center", paddingBottom: 40 }}
          >
            <Pagination
              current={response.page || 1}
              total={response.total}
              pageSize={response.limit || 8}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            background: "white",
            borderRadius: 12,
            border: "1px dashed #e0e0e0",
            marginTop: 32,
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 24, opacity: 0.5 }}>🏙️</div>
          <Title level={3} style={{ color: "#333", marginBottom: 8 }}>
            {response.total > 0 && response.items.length === 0
              ? "You've reached the end"
              : location !== "All"
                ? `No events found in ${location} yet`
                : "No events match your criteria"}
          </Title>
          <Text
            type="secondary"
            style={{ display: "block", marginBottom: 32, fontSize: 16 }}
          >
            {response.total > 0 && response.items.length === 0
              ? `There are ${response.total} events available, but none on this page.`
              : location !== "All"
                ? "We're working on bringing the best experiences to your city. Meanwhile, check out what's happening nearby!"
                : "Try adjusting your search filters or explore all categories."}
          </Text>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              if (response.total > 0 && response.items.length === 0) {
                handlePageChange(1);
              } else {
                handleLocationChange("All");
              }
            }}
            style={{ minWidth: 200 }}
          >
            {response.total > 0 && response.items.length === 0
              ? "Go to First Page"
              : location !== "All"
                ? "Explore All Events"
                : "Clear Filters"}
          </Button>
        </div>
      )}
    </div>
  );
};
