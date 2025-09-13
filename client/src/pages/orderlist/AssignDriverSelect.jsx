import { useState } from "react";
import { useAssignToMutation, useFetchDriversQuery } from "@/features/user.slice";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export default function AssignDriverSelect({ orderId }) {
  const [selectedDriver, setSelectedDriver] = useState("");
  const { data, isLoading } = useFetchDriversQuery(); 
  const drivers = data?.drivers || [];  
  const [assignTo, { isLoading: assigning }] = useAssignToMutation();
  const user = useSelector((state) => state.user.userInfo);

  const handleAssign = async (driverId) => {
    if (user.role !== "admin") {
      toast.error("You are not authorized to assign drivers");
      return;
    }

    setSelectedDriver(driverId);

    try {
      const res = await assignTo({ orderId, driverId }).unwrap();
      toast.success(`Order assigned to driver: ${res.updatedOrder?.driver?.name || "Driver"}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign order");
    }
  };

  if (isLoading) return <p>Loading drivers...</p>;

  return (
    <select
      value={selectedDriver}
      onChange={(e) => handleAssign(e.target.value)}
      className="border rounded px-2 py-1"
      disabled={assigning}
    >
      <option value="">Select Driver</option>
      {drivers.map((driver) => (
        <option key={driver._id} value={driver._id}>
          {driver.name}
        </option>
      ))}
    </select>
  );
}
