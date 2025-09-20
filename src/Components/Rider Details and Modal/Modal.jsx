import { Fragment } from "react";
import ReactDOM from "react-dom";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <Fragment>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
          {children}
        </div>
      </div>
    </Fragment>,
    document.body
  );
}
