import { useMutation } from "@tanstack/react-query";
import { ticketService } from "../../services/ticket/ticket.service";
import { notificationService } from "../../services/notification/notification.service";

export const useValidateTicket = () => {
  return useMutation({
    mutationFn: (qrCode: string) =>
      ticketService.validateTicket({ ticketId: qrCode }),
    onSuccess: () => {
      notificationService.success("Ticket verified successfully.");
      notificationService.simulateSMS(
        "+1234567890",
        "Your ticket has been validated at the venue.",
      );
    },
    onError: (error: unknown) => {
      const msg =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Verification failed";
      notificationService.error(msg);
    },
  });
};
