import React, { useEffect } from "react";

export default function Toast({ id, message, type = "info", onClose }) {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(id), 4500);
    return () => clearTimeout(t);
  }, [id, onClose]);

  return (
    <div role="status" aria-live="polite" className={`toast toast-${type}`}>
      {message}
      <button aria-label="close notification" onClick={() => onClose && onClose(id)}>✕</button>
    </div>
  );
}
