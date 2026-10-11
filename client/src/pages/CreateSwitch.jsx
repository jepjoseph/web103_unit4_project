import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createCustomItem } from "../services/customItemsService";
import SwitchPreview from "../components/SwitchPreview";
import SwitchConfigurationForm from "../components/SwitchConfigurationForm";

import {
  calculatePreviewPrice,
  getCompatibilityErrors,
} from "../utils/switchPricing";

function CreateSwitch() {
  const navigate = useNavigate();

  const [config, setConfig] = useState({
    name: "",
    finish: "Black",
    channels: 2,
    connectivity: "Wi-Fi",
    energy_monitoring: false,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setConfig((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : name === "channels"
            ? Number(value)
            : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (saving) return;

    const errors = getCompatibilityErrors(config);

    if (errors.length > 0) {
      setError(errors.join(" "));
      return;
    }

    setSaving(true);
    setError("");

    try {
      const result = await createCustomItem(config);
      navigate(`/switches/${result.item.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const totalPrice = calculatePreviewPrice(config);
  const compatibilityErrors = getCompatibilityErrors(config);

  return (
    <main className="configurator-page">
      <header className="configurator-heading">
        <h2>Customize Your Smart Switch</h2>
        <p>Configure your switch and see the changes instantly.</p>
      </header>

      <div className="configurator-layout">
        {/* LEFT: CONFIGURATION FORM */}
        <section className="configurator-panel">
          <h3>Configuration</h3>

          <SwitchConfigurationForm
            config={config}
            onChange={handleChange}
            onSubmit={handleSubmit}
            saving={saving}
            error={error}
            submitLabel="Save Configuration"
          />

          <Link to="/switches" className="configurator-link">
            View My Saved Switches
          </Link>
        </section>

        {/* RIGHT: LIVE PREVIEW AND SUMMARY */}
        <aside className="configurator-panel preview-panel">
          <h3>Live Preview</h3>

          <SwitchPreview finish={config.finish} channels={config.channels} />

          <div className="preview-information">
            <h3>Configuration Summary</h3>

            <p>
              <strong>Finish:</strong> {config.finish}
            </p>
            <p>
              <strong>Channels:</strong> {config.channels}
            </p>
            <p>
              <strong>Connectivity:</strong> {config.connectivity}
            </p>
            <p>
              <strong>Energy Monitoring:</strong>{" "}
              {config.energy_monitoring ? "Enabled" : "Disabled"}
            </p>

            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default CreateSwitch;
