import { notification } from "antd";

export const notificationService = {
  success: (msg: string) => {
    notification.success({
      message: "Success",
      description: msg,
      placement: "topRight",
    });
  },
  error: (msg: string) => {
    notification.error({
      message: "Error",
      description: msg,
      placement: "topRight",
    });
  },
  info: (msg: string) => {
    notification.info({
      message: "Info",
      description: msg,
      placement: "topRight",
    });
  },
  simulateEmail: (to: string, subject: string, body: string) => {
    if (import.meta.env.DEV) {
      console.log(`Email to ${to}: ${subject}\n${body}`);
    }
    notification.info({
      message: "Email Sent",
      description: `Recipient: ${to} | Subject: ${subject}`,
      placement: "bottomRight",
    });
  },
  simulateSMS: (phone: string, body: string) => {
    notification.info({
      message: "SMS Sent",
      description: `Phone: ${phone} | Body: ${body}`,
      placement: "bottomRight",
    });
  },
};
