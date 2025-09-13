import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useOrderListQuery } from "@/features/user.slice";

export default function OrderList() {
  const { data, error, isLoading } = useOrderListQuery(); // RTK query result
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (data?.orders) {
      // If API provides order list
      setAllData(data.orders);
      console.log(data.orders)
    }
  }, [data]);

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders</p>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={allData} />
    </div>
  );
}
