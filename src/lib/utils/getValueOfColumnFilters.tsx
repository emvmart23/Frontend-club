import { ColumnFiltersState } from "@tanstack/react-table";

export const getValueOfColumnsFilter = <T,>(
  arrayColumn: ColumnFiltersState,
  col: T
) =>
  arrayColumn.filter((column) => column.id === col).find((column) => column)
    ?.value;
