import { Button } from "@/components/ui/Button";
import { saveAs } from "file-saver";
import XLSX from "xlsx";

interface ExcelReport<T> {
  data: T[];
  fileName: string;
}

export const ExcelExport = <T,>({
  data,
  fileName
}: ExcelReport<T>) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octect-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return <Button onClick={exportToExcel}>Exportar
  </Button>
};