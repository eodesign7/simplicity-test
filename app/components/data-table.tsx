import * as React from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  MoreHorizontal,
  Plus,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import type {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
} from "@tanstack/react-table";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type Data = {
  _id: string;
  title: string;
  publicationDate: string;
  lastUpdate: string;
  categories: string;
  status: boolean;
};

const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }: { row: Row<Data> }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "publicationDate",
    header: "Published",
  },
  {
    accessorKey: "lastUpdate",
    header: "Updated",
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }: { row: Row<Data> }) => (
      <Badge variant="secondary" className="text-xs">
        {row.getValue("categories")}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<Data> }) => (
      <Badge
        variant={row.getValue("status") === true ? "default" : "secondary"}
        className={
          row.getValue("status") === true
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }
      >
        {row.getValue("status") === true ? "Published" : "Unpublished"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: Row<Data> }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              to={`/announcements/${row.original._id}`}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              // TODO: Implement publish/unpublish functionality
              const newStatus = !row.original.status;
              console.log("Toggle status", row.original._id, newStatus);
            }}
            className="flex items-center gap-2"
          >
            {row.original.status === true ? (
              <>
                <EyeOff className="h-4 w-4" />
                Unpublish
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Publish
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              // TODO: Implement delete functionality
              console.log("Delete", row.original._id);
            }}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function DataTable() {
  const announcements = useQuery(api.announcements.getAll);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "publicationDate", desc: false },
  ]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [activeTab, setActiveTab] = React.useState("all");

  // Transform Convex data to match our Data type
  const data = React.useMemo(() => {
    if (!announcements) return [];
    return announcements.map((item) => ({
      _id: item._id,
      title: item.title,
      publicationDate: item.publicationDate,
      lastUpdate: item.lastUpdate,
      categories: item.categories,
      status: item.status,
    }));
  }, [announcements]);

  // Filter data based on active tab
  const filteredData = React.useMemo(() => {
    if (activeTab === "all") return data;
    if (activeTab === "published")
      return data.filter((item) => item.status === true);
    if (activeTab === "unpublished")
      return data.filter((item) => item.status === false);
    return data;
  }, [data, activeTab]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row._id,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  if (!announcements) {
    return (
      <div className="w-full space-y-4 p-6 flex items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Loading announcements...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 flex-1">
            <Input
              placeholder="Search..."
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="h-8 flex-1"
            />
          </div>

          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="unpublished">Unpublished</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Select
              value={sorting.length > 0 ? sorting[0].id : "publicationDate"}
              onValueChange={(value) => {
                if (value === "publicationDate") {
                  setSorting([{ id: "publicationDate", desc: false }]);
                } else if (value === "lastUpdate") {
                  setSorting([{ id: "lastUpdate", desc: false }]);
                }
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publicationDate">
                  Publication Date
                </SelectItem>
                <SelectItem value="lastUpdate">Last Update</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Plus />
              <span className="hidden lg:inline">Add Announcement</span>
            </Button>
          </div>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
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
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}

          {table.getFilteredRowModel().rows.length > 10 ? (
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredRowModel().rows.length} row(s) total.
              </div>
              <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">Rows per page</p>
                  <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value));
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue
                        placeholder={table.getState().pagination.pageSize}
                      />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-start py-4">
              <div className="text-sm text-muted-foreground">
                {table.getFilteredRowModel().rows.length} row(s) total.
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
