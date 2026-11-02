import { createRoot } from "react-dom/client";
import Contact from "../../src/components/Contact";
import "../../src/index.css";

// This fixture is served only by Vite's local dev server; it is not in dist.
createRoot(document.getElementById("root")).render(
  <Contact
    config={{
      serviceId: "test_service",
      templateId: "test_template",
      publicKey: "test_public_key",
    }}
  />,
);
