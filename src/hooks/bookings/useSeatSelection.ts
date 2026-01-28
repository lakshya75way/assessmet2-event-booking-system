import { useState, useCallback, useMemo } from "react";
import { Seat } from "../../types";

export const useSeatSelection = (basePrice: number, _timingId: string) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const PRICES = useMemo(
    () => ({
      silver: basePrice,
      gold: Math.ceil(basePrice * 1.2),
      premium: Math.ceil(basePrice * 1.5),
    }),
    [basePrice],
  );

  const toggleSeat = useCallback((seat: Seat) => {
    if (seat.status === "booked") return;

    setSelectedSeats((prev) => {
      const isSelected = prev.some((s) => s.id === seat.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        if (prev.length >= 10) return prev;
        return [...prev, seat];
      }
    });
  }, []);

  const totalAmount = useMemo(() => {
    return selectedSeats.reduce((sum, s) => sum + s.price, 0);
  }, [selectedSeats]);

  const clearSelection = useCallback(() => setSelectedSeats([]), []);

  return {
    selectedSeats,
    toggleSeat,
    clearSelection,
    totalAmount,
    PRICES,
  };
};
