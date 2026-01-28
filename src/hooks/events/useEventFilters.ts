import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";

export const useEventFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "All";
  const location = searchParams.get("location") || "All";
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const dateRange = useMemo<[Dayjs | null, Dayjs | null] | null>(() => {
    const start = searchParams.get("startDate");
    const end = searchParams.get("endDate");
    if (start && end) return [dayjs(start), dayjs(end)];
    return null;
  }, [searchParams]);

  const updateFilters = useCallback(
    (updates: Record<string, string | null>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(updates).forEach(([key, value]) => {
          if (value === null || value === "") {
            next.delete(key);
          } else if (value === "All") {
            if (key === "location") {
              next.set(key, "All");
            } else {
              next.delete(key);
            }
          } else {
            next.set(key, value);
          }
        });
        if (!updates.page) next.delete("page");
        return next;
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setSearchParams],
  );

  const setCategory = (cat: string) => updateFilters({ category: cat });
  const setLocation = (loc: string) => updateFilters({ location: loc });
  const setDateRange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates) {
      updateFilters({
        startDate: dates[0]?.toISOString() || null,
        endDate: dates[1]?.toISOString() || null,
      });
    } else {
      updateFilters({ startDate: null, endDate: null });
    }
  };
  const setPage = (p: number) => updateFilters({ page: p.toString() });

  return {
    category,
    location,
    search,
    page,
    dateRange,
    setCategory,
    setLocation,
    setDateRange,
    setPage,
    updateFilters,
  };
};
