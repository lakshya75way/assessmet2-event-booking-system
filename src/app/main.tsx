import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "../styles/global.css";

async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MOCKS === "false") {
    return;
  }
  const { worker } = await import("../mocks/browser");
  const registration = await worker.start({
    onUnhandledRequest: "bypass",
  });
  // Small delay to ensure SW is active and ready to intercept
  await new Promise((resolve) => setTimeout(resolve, 100));
  return registration;
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
