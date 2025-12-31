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
import type { Ingredient } from "@/types";
import listIngredientsData from "@/hooks/useIngredientsData";
import { useEffect, useState } from "react";
import DashboardTable from "@/components/dashboardTable";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewIngredientDialog } from "./newIngredient";
import { UpdateIngredientDialog } from "./UpdateIngredient";
import DeleteIngredient from "./deleteIngredient";
import { DEFAULT_LIMIT } from "@/utils/urlWithPagination";
import { ingredientsAPI } from "@/api/ingredients";
import { useSessionStorage } from "@/hooks/useSessionStorage";

export default function IngredientsTable() {
  const [skip, setSkip] = useSessionStorage("IngredientsTableCurrentPage", 0);

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientNameQ, setingredientNameQ] = useState("");

  const { data, isLoading, isError, error, refetch, isFetching } =
    listIngredientsData(skip, DEFAULT_LIMIT);

  useEffect(() => setIngredients(!data ? [] : data), [data]);

  useEffect(() => {
    async function fetchIngredients() {
      if (ingredientNameQ.trim()) {
        try {
          const res = await ingredientsAPI.searchByKeyword(ingredientNameQ);
          if (res) {
            setIngredients(res);
          }
        } catch (error) {}
      }
    }
    fetchIngredients();
  }, [ingredientNameQ]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [newOpen, setNewOpen] = useState<boolean>(false);

  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [updateIngredientID, setupdateingredientID] = useState<string>("");

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const columns: ColumnDef<Ingredient>[] = [
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
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        return <div>{row.getValue("id")}</div>;
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="zombie"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("name")}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
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
                onClick={() => {
                  setupdateingredientID(row.original.id ? row.original.id : "");
                  setUpdateOpen(true);
                }}
              >
                Update ingredient
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setupdateingredientID(row.original.id ? row.original.id : "");
                  setDeleteOpen(true);
                }}
                className="text-destructive focus:text-destructive"
              >
                Delete ingredient
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: ingredients,
    columns: columns,
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
        addButton={{
          label: "New Ingredient",
          addFn: () => setNewOpen((prev) => !prev),
        }}
        refetch={refetch}
        filter={{
          columnName: "name",
          input: {
            onChange: (e) => setingredientNameQ(e.target.value),
            value: ingredientNameQ,
          },
        }}
        pagination={{
          prevFn: () => setSkip((prev) => prev - DEFAULT_LIMIT),
          nextFn: () => setSkip((prev) => prev + DEFAULT_LIMIT),
          prevBtnDisabled: skip <= 0,
          nextBtnDisabled: data ? data.length < 10 : true,
        }}
      />

      <NewIngredientDialog open={newOpen} onOpenChange={setNewOpen} />

      <UpdateIngredientDialog
        open={updateOpen}
        onOpenChange={setUpdateOpen}
        ingredientID={updateIngredientID}
      />

      <DeleteIngredient
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        ingredientID={updateIngredientID}
      />
    </>
  );
}
