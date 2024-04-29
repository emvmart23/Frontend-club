import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Sheet, SheetTrigger } from "@/components/ui/Sheet";
import ProductDetails from "../ProductDetails";
import { useEffect, useState } from "react";
import { getCategories } from "@/store/slices/category/thunk";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { getUnits } from "@/store/slices/unit/thunk";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="ml-4"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    accessorKey: "category_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const category = useSelector((state:RootState) => state.categories.category)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dispatch = useAppDispatch();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        dispatch(getCategories());
      },[]);

      const data = category.map((category) => (category.name))
      data.splice(0,0,"")
      const category_id = row.getValue("category_id") as number;
      return <div>{data[category_id]}</div>;
    },
  },
  {
    accessorKey: "unit_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unidad
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dispatch = useAppDispatch()
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        dispatch(getUnits());
      }, [])
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const unit = useSelector((state:RootState) => state.units.unit)
      const units = unit.map((unit) => unit.abbreviation)
      const unit_id = row.getValue("unit_id") as number;
      return <div>{units[unit_id]}</div>;
    },
  },
  {
    accessorKey: "has_alcohol",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isActive = row.getValue("has_alcohol") == true;
      const hasAlcohol = isActive ? "con alcohol" : "sin alcohol";
      return (
        <Badge className={`${isActive ? "bg-green-600" : "bg-red-600"}`}>
          {hasAlcohol}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setIsOpen] = useState(false);
      return (
        <Sheet open={open} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Ver</Button>
          </SheetTrigger>
          <ProductDetails product={product} open={open} setIsOpen={setIsOpen} />
        </Sheet>
      );
    },
  },
];
