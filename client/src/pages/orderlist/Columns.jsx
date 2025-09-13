import StatusSelect from "./StatusSelect";
import AssignDriverSelect from "./AssignDriverSelect";
export const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "OrderBy" },
  { accessorKey: "itemname", header: "Item" },
  {
    accessorKey: "orderstatus",
    header: "Order Status",
    cell: ({ row, getValue }) => {
      const id = row.original._id || row.original.id;
      const value = getValue();
      return <StatusSelect id={id} value={value} />;
    },
  },
  { accessorKey: "deliverystatus", header: "Delivery Status" },
  {
  accessorKey: "assignto",
  header: "Assign Driver",
  cell: ({ row }) => {
    const orderId = row.original._id || row.original.id;;
    return <AssignDriverSelect orderId={orderId} />;
  },
},

  { accessorKey: "address", header: "Address" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "assignedto", header: "Assigned To" },
];
