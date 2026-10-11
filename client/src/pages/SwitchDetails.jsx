import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getCustomItemById,
  deleteCustomItem,
} from "../services/customItemsService";

import SwitchPreview from "../components/SwitchPreview";

function SwitchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  // Load the saved switch from the database.
  useEffect(() => {
    let active = true;

    async function loadSwitch() {
      setLoading(true);
      setError("");
      setItem(null);

      try {
        const data = await getCustomItemById(id);

        if (active) {
          setItem(data.item);
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

  // Delete the current switch.
  async function handleDelete() {
    if (deleting || !item) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setDeleting(true);
    setError("");

    try {
      await deleteCustomItem(id);
      navigate("/switches");
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  }

  // Format database timestamps.
  function formatDate(value) {
    if (!value) return "Not available";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? "Not available"
      : date.toLocaleString();
  }

  if (loading) {
    return (
      <main className="switch-details-page">
        <p>Loading switch details...</p>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="switch-details-page">
        <p role="alert">{error || "Switch not found."}</p>

        <Link to="/switches">Back to My Switches</Link>
      </main>
    );
  }

  return (
    <main className="switch-details-page">
      <header className="switch-details-heading">
        <div>
          <h2>{item.name}</h2>
          <p>View your saved smart switch configuration.</p>
        </div>

        <Link to="/switches" className="details-back-link">
          Back to My Switches
        </Link>
      </header>

      {error && <p role="alert">Error: {error}</p>}

      <div className="switch-details-layout">
        {/* LEFT PANEL: CONFIGURATION DETAILS */}
        <section className="configurator-panel switch-details-information">
          <h3>Configuration Details</h3>

          <div className="switch-detail-row">
            <strong>Switch ID</strong>
            <span>{item.id}</span>
          </div>

          <div className="switch-detail-row">
            <strong>Device Type</strong>
            <span>Smart Wall Switch</span>
          </div>

          <div className="switch-detail-row">
            <strong>Finish</strong>
            <span>{item.finish}</span>
          </div>

          <div className="switch-detail-row">
            <strong>Channels</strong>
            <span>{item.channels}</span>
          </div>

          <div className="switch-detail-row">
            <strong>Connectivity</strong>
            <span>{item.connectivity}</span>
          </div>

          <div className="switch-detail-row">
            <strong>Energy Monitoring</strong>
            <span>{item.energy_monitoring ? "Enabled" : "Disabled"}</span>
          </div>

          <div className="switch-details-price">
            <span>Total Price</span>
            <strong>${Number(item.total_price).toFixed(2)}</strong>
          </div>

          <div className="switch-details-dates">
            <p>
              <strong>Created:</strong> {formatDate(item.created_at)}
            </p>

            <p>
              <strong>Last Updated:</strong> {formatDate(item.updated_at)}
            </p>
          </div>

          <div className="switch-details-actions">
            <Link
              to={`/switches/${item.id}/edit`}
              className="details-edit-button"
            >
              Edit Switch
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="delete-button"
            >
              {deleting ? "Deleting..." : "Delete Switch"}
            </button>
          </div>
        </section>

        {/* RIGHT PANEL: SAVED CONFIGURATION PREVIEW */}
        <aside className="configurator-panel switch-details-preview">
          <h3>Switch Preview</h3>

          <SwitchPreview finish={item.finish} channels={item.channels} />

          <p className="details-preview-caption">
            Visual representation of your saved configuration.
          </p>
        </aside>
      </div>
    </main>
  );
}

export default SwitchDetails;
