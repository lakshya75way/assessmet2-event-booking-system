import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Typography,
  Avatar,
  Dropdown,
  Button as AntButton,
  Input,
  Layout,
} from "antd";
import {
  useNavigate,
  Link,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  HistoryOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { storageService } from "../../services/storage/storage.service";

const { Header } = Layout;
const { Text } = Typography;

interface AppHeaderProps {
  selectedCity: string;
  onCityChange: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = React.memo(
  ({ selectedCity, onCityChange }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const user = storageService.getUser();

    const [searchQuery, setSearchQuery] = useState(
      searchParams.get("search") || "",
    );

    useEffect(() => {
      setSearchQuery(searchParams.get("search") || "");
    }, [searchParams]);

    const handleSearch = (value: string) => {
      const query = value.trim();
      if (!query) {
        const params = new URLSearchParams(location.search);
        params.delete("search");
        navigate(`/?${params.toString()}`);
        return;
      }

      if (/^(TICKET-|QR-|BOOKING-|[0-9a-f]{8}-[0-9a-f]{4})/i.test(query)) {
        navigate(`/tickets/${query}`);
        setSearchQuery("");
        return;
      }

      const params = new URLSearchParams(location.search);
      params.set("search", query);
      navigate(`/?${params.toString()}`);
    };

    const handleLogout = useCallback(() => {
      storageService.clearAuth();
      navigate("/login");
    }, [navigate]);

    const menuItems = useMemo(
      () => ({
        items: [
          {
            key: "bookings",
            label: "My Bookings",
            icon: <HistoryOutlined />,
            onClick: () => navigate("/my-bookings"),
          },
          user?.role === "admin"
            ? {
                key: "admin",
                label: "Admin Dashboard",
                icon: <DashboardOutlined />,
                onClick: () => navigate("/admin/dashboard"),
              }
            : null,
          {
            type: "divider" as const,
          },
          {
            key: "logout",
            label: "Logout",
            icon: <LogoutOutlined />,
            danger: true,
            onClick: handleLogout,
          },
        ].filter(Boolean),
      }),
      [handleLogout, navigate, user?.role],
    );

    return (
      <Header
        className="app-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: 72,
          background: "#333338",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flex: "0 0 auto",
          }}
        >
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <Text
              strong
              style={{
                fontSize: 22,
                color: "#F84464",
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              EventBook
            </Text>
          </Link>
        </div>

        <div className="search-container">
          <Input
            prefix={<SearchOutlined style={{ color: "#aaa" }} />}
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={(e) => handleSearch(e.currentTarget.value)}
            style={{
              borderRadius: 6,
              border: "none",
              height: 40,
              fontSize: 14,
              background: "#fff",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flex: "0 0 auto",
          }}
        >
          <div className="city-selector">
            <AntButton
              type="text"
              onClick={onCityChange}
              style={{
                color: "#ccc",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "0 8px",
              }}
            >
              {selectedCity === "All" ? "All Cities" : selectedCity}{" "}
              <DownOutlined style={{ fontSize: 10 }} />
            </AntButton>
          </div>

          {user ? (
            <Dropdown menu={menuItems} placement="bottomRight" arrow>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Avatar
                  style={{ backgroundColor: "#F84464" }}
                  icon={<UserOutlined />}
                  size="small"
                />
                <Text
                  className="user-name"
                  style={{ color: "white", fontSize: 13, fontWeight: 500 }}
                >
                  {user.name}
                </Text>
              </div>
            </Dropdown>
          ) : (
            <AntButton
              type="primary"
              onClick={() => navigate("/login")}
              size="small"
              style={{
                background: "#F84464",
                borderColor: "#F84464",
                borderRadius: 4,
                fontWeight: 600,
              }}
            >
              Sign In
            </AntButton>
          )}
        </div>

        <style>{`
          .search-container {
            flex: 1;
            max-width: 500px;
          }
          @media (max-width: 768px) {
            .app-header {
              padding: 0 16px !important;
            }
            .search-container {
               order: 3;
               position: absolute;
               top: 72px;
               left: 0;
               right: 0;
               background: #333338;
               padding: 8px 16px;
               max-width: none;
               box-shadow: 0 4px 8px rgba(0,0,0,0.1);
               display: ${location.pathname === "/" || location.pathname === "/events" ? "block" : "none"};
            }
            .user-name, .city-selector {
              display: none !important;
            }
          }
        `}</style>
      </Header>
    );
  },
);
