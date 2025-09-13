// components/StatusSelect.jsx
import React, { useState, useEffect } from "react";
import { useUpdateOrderStatusMutation } from "@/features/user.slice"; // path as needed
import { toast } from "sonner"; // optional
import { useSelector } from "react-redux";

export default function StatusSelect({ id, value, disabled = false }) {
  const [selected, setSelected] = useState(value || "");
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => setSelected(value || ""), [value]);

  const handleChange = async (e) => {
    if (user.role !== "admin") {
      toast.error("you are not admin to update");
      return;
    }
    const next = e.target.value;
    setSelected(next);

    try {
      await updateOrderStatus({ orderId: id, status: next }).unwrap();
      toast?.success?.("Status updated");
    } catch (err) {
      console.error("Update failed", err);
      toast?.error?.("Failed to update status");
      // optionally rollback UI: setSelected(value)  <-- if you prefer
    }
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      disabled={isLoading}
      className="border rounded px-2 py-1 bg-white"
    >
      <option value="accepted">Accepted</option>
      <option value="rejected">Rejected</option>
      <option value="complete">Complete</option>
      <option value="assigned">Assigned</option>
    </select>
  );
}
