import { flexRender, type Table as TableType } from "@tanstack/react-table";
import { ChevronDown, Plus } from "lucide-react";
import RefreshButton from "./refreshButton";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import type { ChangeEvent } from "react";

type DashboardTableProps<T> = {
  table: TableType<T>;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
  error: Error | null;
  filter?: {
    columnName: string;
    placeholder?: string;
    input?: {
      value: string;
      onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    };
  };
  addButton?: {
    label?: string;
    addFn: () => void;
  };
  pagination?: {
    prevFn: () => void;
    nextFn: () => void;
    prevBtnDisabled: boolean;
    nextBtnDisabled: boolean;
  };
};

export default function DashboardTable<T>({
  table,
  isError,
  isFetching,
  isLoading,
  refetch,
  error,
  addButton,
  filter,
  pagination,
}: DashboardTableProps<T>) {
  const TABLE_COLUMNS = table.getAllColumns();

  return (
    <Card className="w-full p-6">
      <div className="flex py-4 flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex justify-between md:justify-start gap-4 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" disabled={isLoading || isError}>
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-4">
            {addButton && (
              <Button
                variant="outline"
                disabled={isLoading}
                onClick={addButton.addFn}
              >
                <Plus />
                <span className="md:inline hidden">
                  {addButton.label ?? "New"}
                </span>
              </Button>
            )}

            <RefreshButton isFetching={isFetching} onClick={() => refetch()} />
          </div>
        </div>

        {filter && (
          <Input
            placeholder={
              filter.placeholder ?? `Filter ${filter.columnName}s...`
            }
            value={
              filter.input
                ? filter.input.value
                : (table
                    .getColumn(filter.columnName)
                    ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) => {
              filter.input
                ? filter.input.onChange(event)
                : table
                    .getColumn(filter.columnName)
                    ?.setFilterValue(event.target.value);
            }}
            className="max-w-sm bg-muted/60"
            disabled={isLoading || isError}
          />
        )}
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, idx) => (
                <TableRow key={`skeleton-${idx}`}>
                  {table.getAllLeafColumns().map((col) => (
                    <TableCell
                      key={`skeleton-cell-${col.id}-${idx}`}
                      className="py-4"
                    >
                      <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={TABLE_COLUMNS.length}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-destructive">
                      Failed to load data
                      {(error as any)?.message
                        ? `: ${(error as any).message}`
                        : "."}
                    </span>
                    <Button variant="outline" onClick={() => refetch()}>
                      Try again
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={TABLE_COLUMNS.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        {pagination && (
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.prevFn()}
              disabled={pagination.prevBtnDisabled || isLoading || isError}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.nextFn()}
              disabled={pagination.nextBtnDisabled || isLoading || isError}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
