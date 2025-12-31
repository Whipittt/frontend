import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/types";
import { useListUsersData } from "@/hooks/useUsersData";
import DashboardTable from "@/components/dashboardTable";
import { NewUserDialog } from "./newUser";
import { useState } from "react";
import { DEFAULT_LIMIT } from "@/utils/urlWithPagination";
import { useSessionStorage } from "@/hooks/useSessionStorage";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-line data-[state=checked]:border-primary"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-line data-[state=checked]:border-primary"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorFn: (row) => row.fullname.split(" ")[0] || "",
    id: "firstname",
    header: ({ column }) => {
      return (
        <Button
          variant="zombie"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("firstname")}</div>;
    },
  },

  {
    accessorFn: (row) => {
      const parts = row.fullname.split(" ");
      return parts.slice(1).join(" ") || "";
    },
    id: "lastname",
    header: ({ column }) => {
      return (
        <Button
          variant="zombie"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("lastname")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="zombie"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="zombie"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date created
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("created_at") as string;
      const date = value ? new Date(value) : null;

      const formatted = date
        ? date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })
        : "-";

      return <div className="lowercase">{formatted}</div>;
    },
  },
  {
    accessorKey: "is_superuser",
    header: () => <div>Role</div>,
    cell: ({ row }) => {
      return (
        <div>
          <Badge variant={"outline"} className="font-normal rounded-full">
            {row.original.is_superuser ? "Admin" : "User"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigate(`/dashboard/users/${row.original.id}`)}
            >
              Update user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function UserTable() {
  const [skip, setSkip] = useSessionStorage("UsersTableCurrentPage", 0);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useListUsersData(skip, DEFAULT_LIMIT);

  const users = React.useMemo<User[]>(() => {
    return !data ? [] : data;
  }, [data]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [newOpen, setNewOpen] = useState<boolean>(false);

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <DashboardTable
        table={table}
        isError={isError}
        isFetching={isFetching}
        error={error}
        isLoading={isLoading}
        refetch={refetch}
        addButton={{
          label: "New user",
          addFn: () => setNewOpen((prev) => !prev),
        }}
        filter={{ columnName: "email" }}
        pagination={{
          prevFn: () => setSkip((prev) => prev - DEFAULT_LIMIT),
          nextFn: () => setSkip((prev) => prev + DEFAULT_LIMIT),
          prevBtnDisabled: skip <= 0,
          nextBtnDisabled: data ? data.length < 10 : true,
        }}
      />

      <NewUserDialog open={newOpen} onOpenChange={setNewOpen} />
    </>
  );
}
