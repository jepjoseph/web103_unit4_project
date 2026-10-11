import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getCustomItemById,
  updateCustomItem,
} from "../services/customItemsService";

import SwitchConfigurationForm from "../components/SwitchConfigurationForm";

import SwitchPreview from "../components/SwitchPreview";

import {
  calculatePreviewPrice,
  getCompatibilityErrors,
} from "../utils/switchPricing";

function EditSwitch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load the existing switch configuration.
  useEffect(() => {
    let active = true;

    async function loadSwitch() {
      setLoading(true);
      setError("");
      setConfig(null);

      try {
        const data = await getCustomItemById(id);

        if (active) {
          setConfig({
            name: data.item.name,
            finish: data.item.finish,
            channels: data.item.channels,
            connectivity: data.item.connectivity,
            energy_monitoring: data.item.energy_monitoring,
          });
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadSwitch();

    return () => {
      active = false;
    };
  }, [id]);

  // Update the local configuration as the user changes options.
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

  const totalPrice = config ? calculatePreviewPrice(config) : 0;

  const compatibilityErrors = config ? getCompatibilityErrors(config) : [];

  // Save the updated configuration.
  async function handleSubmit(event) {
    event.preventDefault();

    if (saving || !config) return;

    const errors = getCompatibilityErrors(config);

    if (errors.length > 0) {
      setError(errors.join(" "));
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateCustomItem(id, config);

      navigate(`/switches/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  // Loading state
  if (loading) {
    return (
      <main className="configurator-page">
        <p>Loading switch configuration...</p>
      </main>
    );
  }

  // Missing switch or failed API request
  if (!config) {
    return (
      <main className="configurator-page">
        <p role="alert">{error || "Switch not found."}</p>

        <Link to="/switches">Back to My Switches</Link>
      </main>
    );
  }

  return (
    <main className="configurator-page">
      <header className="configurator-heading">
        <h2>Edit Smart Switch</h2>

        <p>
          Modify your switch configuration and preview changes before saving.
        </p>
      </header>

      <div className="configurator-layout">
        {/* LEFT PANEL: EDIT FORM */}
        <section className="configurator-panel">
          <h3>Switch Configuration</h3>

          <SwitchConfigurationForm
            config={config}
            onChange={handleChange}
            onSubmit={handleSubmit}
            saving={saving}
            error={error}
            submitLabel="Save Changes"
          />

          <Link to={`/switches/${id}`} className="configurator-link">
            Cancel and Return to Details
          </Link>
        </section>

        {/* RIGHT PANEL: LIVE PREVIEW */}
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

            <h3>Updated Price: ${totalPrice.toFixed(2)}</h3>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default EditSwitch;
