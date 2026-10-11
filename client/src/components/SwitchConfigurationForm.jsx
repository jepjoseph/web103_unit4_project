import {
  FINISHES,
  CHANNELS,
  CONNECTIVITY,
  getCompatibilityErrors,
} from "../utils/switchPricing";

function SwitchConfigurationForm({
  config,
  onChange,
  onSubmit,
  saving,
  error,
  submitLabel = "Save Configuration",
}) {
  const compatibilityErrors = getCompatibilityErrors(config);

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Switch Name</label>
      <input
        id="name"
        name="name"
        type="text"
        maxLength={100}
        placeholder="e.g. Living Room Switch"
        value={config.name}
        onChange={onChange}
        required
      />

      <label htmlFor="finish">Finish</label>
      <select
        id="finish"
        name="finish"
        value={config.finish}
        onChange={onChange}
      >
        {FINISHES.map((finish) => (
          <option key={finish} value={finish}>
            {finish}
          </option>
        ))}
      </select>

      <label htmlFor="channels">Channels</label>
      <select
        id="channels"
        name="channels"
        value={config.channels}
        onChange={onChange}
      >
        {CHANNELS.map((channels) => (
          <option key={channels} value={channels}>
            {channels}
          </option>
        ))}
      </select>

      <label htmlFor="connectivity">Connectivity</label>
      <select
        id="connectivity"
        name="connectivity"
        value={config.connectivity}
        onChange={onChange}
      >
        {CONNECTIVITY.map((connection) => (
          <option key={connection} value={connection}>
            {connection}
          </option>
        ))}
      </select>

      <label htmlFor="energy_monitoring">
        <input
          id="energy_monitoring"
          name="energy_monitoring"
          type="checkbox"
          checked={config.energy_monitoring}
          onChange={onChange}
        />
        Enable Energy Monitoring (+$12.00)
      </label>

      {compatibilityErrors.length > 0 && (
        <div role="alert">
          <strong>Unsupported Configuration</strong>
          <ul>
            {compatibilityErrors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={saving || compatibilityErrors.length > 0}>
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default SwitchConfigurationForm;
