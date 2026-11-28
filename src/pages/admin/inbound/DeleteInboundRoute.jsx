// import React, { useState } from "react";
// import inboundApi from "../../api/inboundApi";

// export default function DeleteInboundRoute({
//   inboundRouteId,
//   onClose,
//   onDeleted,
// }) {
//   const [deleting, setDeleting] = useState(false);
//   const [error, setError] = useState("");

//   const handleDelete = async () => {
//     if (!inboundRouteId || deleting) return;

//     setDeleting(true);
//     setError("");

//     try {
//       // Backend DELETE /inbound/routes/{route_id} returns HTTP 204 (no body).
//       await inboundApi.remove(inboundRouteId);

//       if (typeof onDeleted === "function") {
//         onDeleted(inboundRouteId);
//       }
//       if (typeof onClose === "function") {
//         onClose();
//       }
//     } catch (err) {
//       const detail =
//         err?.response?.data?.detail ??
//         err?.response?.data?.message ??
//         err?.message;

//       setError(
//         Array.isArray(detail)
//           ? detail
//               .map((item) => item?.msg || item?.message || String(item))
//               .filter(Boolean)
//               .join(", ")
//           : detail || "Unable to delete inbound route. Please try again."
//       );
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
//         <div className="mb-4 flex items-start justify-between gap-4">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-900">
//               Delete Inbound Route
//             </h2>
//             <p className="mt-1 text-sm text-gray-500">
//               Are you sure you want to delete this inbound route?
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             disabled={deleting}
//             aria-label="Close"
//             className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//               aria-hidden="true"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         </div>

//         <div className="rounded-lg border border-red-100 bg-red-50 p-4">
//           <p className="text-sm text-red-800">
//             This action cannot be undone. The inbound route will be permanently
//             removed.
//           </p>
//         </div>

//         {error && (
//           <div
//             role="alert"
//             className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
//           >
//             {error}
//           </div>
//         )}

//         <div className="mt-6 flex justify-end gap-3">
//           <button
//             type="button"
//             onClick={onClose}
//             disabled={deleting}
//             className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             Cancel
//           </button>

//           <button
//             type="button"
//             onClick={handleDelete}
//             disabled={deleting || !inboundRouteId}
//             className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {deleting ? "Deleting..." : "Delete Route"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useState } from "react";
import { inboundApi } from "./InboundCalls";

export default function DeleteInboundRoute({
  inboundRouteId,
  onClose,
  onDeleted,
}) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!inboundRouteId || deleting) return;

    setDeleting(true);
    setError("");

    try {
      // Backend DELETE /inbound/routes/{route_id} returns HTTP 204 (no body).
      await inboundApi.remove(inboundRouteId);

      if (typeof onDeleted === "function") {
        onDeleted(inboundRouteId);
      }
      if (typeof onClose === "function") {
        onClose();
      }
    } catch (err) {
      const detail =
        err?.response?.data?.detail ??
        err?.response?.data?.message ??
        err?.message;

      setError(
        Array.isArray(detail)
          ? detail
              .map((item) => item?.msg || item?.message || String(item))
              .filter(Boolean)
              .join(", ")
          : detail || "Unable to delete inbound route. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Delete Inbound Route
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Are you sure you want to delete this inbound route?
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            aria-label="Close"
            className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="rounded-lg border border-red-100 bg-red-50 p-4">
          <p className="text-sm text-red-800">
            This action cannot be undone. The inbound route will be permanently
            removed.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || !inboundRouteId}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete Route"}
          </button>
        </div>
      </div>
    </div>
  );
}