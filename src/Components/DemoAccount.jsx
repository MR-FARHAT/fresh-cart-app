import { useState } from "react";
import { DEMO_ACCOUNT } from "../Contexts/AuthContext";

function CopyRow({ label, value }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mb-2">
      <span className="d-block small fw-semibold">{label}</span>
      <div className="d-flex align-items-center gap-2">
        <code className="flex-grow-1 text-break bg-white rounded px-2 py-1">{value}</code>
        <button type="button" onClick={copy} className="btn btn-sm btn-outline-secondary">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default function DemoAccount() {
  return (
    <div className="alert alert-success mt-3 mb-2 p-2">
      <p className="fw-bold small mb-2">
        <i className="fa-solid fa-user-check me-2"></i>
        Just looking around? Copy the demo account
      </p>
      <CopyRow label="Email" value={DEMO_ACCOUNT.email} />
      <CopyRow label="Password" value={DEMO_ACCOUNT.password} />
    </div>
  );
}
