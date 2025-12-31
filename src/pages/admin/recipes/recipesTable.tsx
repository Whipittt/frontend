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
import type { Recipe } from "@/types";
import { useMemo, useState } from "react";
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
import { NewIngredientDialog } from "../ingredients/newIngredient";
import { UpdateIngredientDialog } from "../ingredients/UpdateIngredient";
import { DEFAULT_LIMIT } from "@/utils/urlWithPagination";
import { useRecipesData } from "@/hooks/useRecipes";
import { useNavigate } from "react-router-dom";
import DeleteRecipe from "./deleteRecipe";
import { useSessionStorage } from "@/hooks/useSessionStorage";

export default function RecipesTable() {
  const [skip, setSkip] = useSessionStorage("RecipeTableCurrentPage", 0);
  const { data, isLoading, isError, error, refetch, isFetching } =
    useRecipesData(skip, DEFAULT_LIMIT);

  const recipes = useMemo<Recipe[]>(() => (!data ? [] : data), [data]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [newOpen, setNewOpen] = useState<boolean>(false);

  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [updateRecipeID, setupdateingredientID] = useState<string>("");

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const columns: ColumnDef<Recipe>[] = [
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
        return (
          <Button
            variant="link"
            onClick={() => navigate(`/recipes/${row.getValue("id")}`)}
            className="text-foreground hover:text-primary"
          >
            {row.getValue("id")}
          </Button>
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="zombie"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="md:max-w-52 truncate">{row.getValue("title")}</div>
        );
      },
    },
    {
      accessorKey: "time_minutes",
      header: ({ column }) => {
        return (
          <Button
            variant="zombie"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Time (mins)
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("time_minutes")}</div>;
      },
    },
    {
      accessorKey: "rating",
      header: ({ column }) => {
        return (
          <Button
            variant="zombie"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating (5)
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("rating")}</div>;
      },
    },
    {
      accessorKey: "favourites_count",
      header: ({ column }) => {
        return (
          <Button
            variant="zombie"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Favourites
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("favourites_count")}</div>;
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
                  setupdateingredientID(row.original.id);
                  navigate(`/dashboard/recipes/${row.original.id}/update`);
                }}
              >
                Update recipe
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setupdateingredientID(row.original.id);
                  setDeleteOpen(true);
                }}
                className="text-destructive focus:text-destructive"
              >
                Delete recipe
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: recipes,
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
          label: "New Recipe",
          addFn: () => navigate("/dashboard/recipes/new"),
        }}
        refetch={refetch}
        filter={{ columnName: "title" }}
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
        ingredientID={updateRecipeID}
      />

      <DeleteRecipe
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        recipeId={updateRecipeID}
      />
    </>
  );
}
