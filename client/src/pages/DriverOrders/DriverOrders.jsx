import { useOrderAssignedToDriverQuery } from "@/features/user.slice";

export default function DriverOrders() {
  const { data, isLoading, isError } = useOrderAssignedToDriverQuery();

  // if API is still loading
  if (isLoading) return <p>Loading orders...</p>;

  // if API failed
  if (isError) return <p>Failed to load orders.</p>;

  // ✅ safely get orders array (fallback to empty array)
  const driverOrders = data?.orders || [];
  console.log(driverOrders);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">My Assigned Orders</h2>

      {driverOrders.length === 0 ? (
        <p>No orders assigned yet.</p>
      ) : (
        <ul className="list-disc pl-6">
          {driverOrders.map((order) => (
            <li key={order._id}>
              Order #{order._id} - {order.orderby?.email} ({order.orderstatus}) - deliverto ({order.address})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
