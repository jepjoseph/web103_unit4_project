import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllCustomItems,
  deleteCustomItem,
} from "../services/customItemsService";

import SwitchPreview from "../components/SwitchPreview";

function ViewSwitches() {
  const [switches, setSwitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadSwitches() {
      try {
        const data = await getAllCustomItems();

        if (active) {
          setSwitches(data.items);
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

    loadSwitches();

    return () => {
      active = false;
    };
  }, []);

  async function handleDelete(item) {
    if (deletingId !== null) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setDeletingId(item.id);
    setError("");

    try {
      await deleteCustomItem(item.id);

      setSwitches((previous) =>
        previous.filter((savedItem) => savedItem.id !== item.id),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <main className="saved-switches-page">
        <p>Loading your smart switches...</p>
      </main>
    );
  }

  return (
    <main className="saved-switches-page">
      <header className="saved-switches-heading">
        <div>
          <h2>My Smart Switches</h2>
          <p>View and manage your saved smart switch configurations.</p>
        </div>

        <Link to="/" className="create-switch-link">
          + Create New Switch
        </Link>
      </header>

      {error && <p role="alert">Error: {error}</p>}

      {!error && switches.length === 0 ? (
        <div className="empty-switches">
          <h3>No Saved Switches</h3>
          <p>You haven't created any smart switches yet.</p>
          <Link to="/">Create Your First Switch</Link>
        </div>
      ) : !error ? (
        <div className="switch-list">
          {switches.map((item) => (
            <article key={item.id} className="switch-card">
              <h3>{item.name}</h3>

              <div className="saved-switch-preview">
                <SwitchPreview finish={item.finish} channels={item.channels} />
              </div>

              <div className="saved-switch-information">
                <p>
                  <strong>Finish:</strong> {item.finish}
                </p>

                <p>
                  <strong>Channels:</strong> {item.channels}
                </p>

                <p>
                  <strong>Connectivity:</strong> {item.connectivity}
                </p>

                <p>
                  <strong>Energy Monitoring:</strong>{" "}
                  {item.energy_monitoring ? "Enabled" : "Disabled"}
                </p>

                <p className="saved-switch-price">
                  <strong>Price:</strong> ${Number(item.total_price).toFixed(2)}
                </p>
              </div>

              <div className="switch-actions">
                <Link to={`/switches/${item.id}`}>View Details</Link>

                <Link to={`/switches/${item.id}/edit`}>Edit</Link>

                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  disabled={deletingId !== null}
                  className="delete-button"
                >
                  {deletingId === item.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </main>
  );
}

export default ViewSwitches;
