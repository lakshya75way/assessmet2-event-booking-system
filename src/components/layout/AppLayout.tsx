import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import {
  Outlet,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AppHeader } from "./Header";
import { AppFooter } from "./Footer";
import { CitySelectionModal } from "../common/CitySelectionModal";

const { Content } = Layout;

const CITY_STORAGE_KEY = "selectedCity";

export const AppLayout: React.FC = React.memo(() => {
  const [selectedCity, setSelectedCity] = useState<string>(() => {
    // Initialize from URL first, then Storage, then empty
    const urlParams = new URLSearchParams(window.location.search);
    return (
      urlParams.get("location") || localStorage.getItem(CITY_STORAGE_KEY) || ""
    );
  });

  const [showCityModal, setShowCityModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedCity = localStorage.getItem(CITY_STORAGE_KEY) || "All";

    // 1. If URL has a city, it always wins
    if (searchParams.has("location")) {
      const city = searchParams.get("location")!;
      if (city !== selectedCity) setSelectedCity(city);
      // Sync URL to Storage immediately
      if (city !== savedCity) localStorage.setItem(CITY_STORAGE_KEY, city);
      return;
    }

    // 2. If URL has NO city, use savedCity
    if (savedCity !== "All") {
      const isEventsPage =
        location.pathname === "/" || location.pathname === "/events";
      if (isEventsPage) {
        setSearchParams(
          (prev) => {
            const next = new URLSearchParams(prev);
            next.set("location", savedCity);
            return next;
          },
          { replace: true },
        );
      }
      if (savedCity !== selectedCity) setSelectedCity(savedCity);
    } else {
      // savedCity is "All", ensure selectedCity matches
      if (selectedCity && selectedCity !== "All") setSelectedCity("All");

      // If truly no city even in storage, and on events page, show modal
      if (
        !localStorage.getItem(CITY_STORAGE_KEY) &&
        (location.pathname === "/" || location.pathname === "/events")
      ) {
        setShowCityModal(true);
      }
    }
  }, [location.pathname, searchParams, selectedCity, setSearchParams]);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem(CITY_STORAGE_KEY, city);
    setShowCityModal(false);

    const isEventsPage =
      location.pathname === "/" || location.pathname.startsWith("/events");

    if (isEventsPage) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (city) {
          next.set("location", city);
        } else {
          next.set("location", "All");
        }
        next.delete("page");
        return next;
      });
    } else {
      navigate(`/?location=${city || "All"}`);
    }
  };

  const handleCityChange = () => {
    setShowCityModal(true);
  };

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <CitySelectionModal visible={showCityModal} onSelect={handleCitySelect} />

      <AppHeader
        selectedCity={selectedCity || "Select City"}
        onCityChange={handleCityChange}
      />

      <Content
        style={{
          padding: "0 5%",
          marginTop: 24,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Content>

      <AppFooter />
    </Layout>
  );
});
