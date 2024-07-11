import { Button } from "@/components/ui/Button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfHostess from "../../Pdf";
import { Loader2 } from "lucide-react";
import { ExcelExport } from "@/lib/utils/excelExport";

interface Props {
  data: ReportHostess[];
}

export default function bReportHostessActions({ data }: Props) {
  const excel = data.filter(item => item.hostess_role === 8);
  return (
    <div className="ml-auto w-min flex justify-between gap-4">
      <PDFDownloadLink
        document={<PdfHostess data={data} />}
        fileName="anfitrionas.pdf"
      >
        {({ loading }) => (
          <Button className="w-32">
            {loading && <Loader2 className="animate-spin" />}
            generar PDF
          </Button>
        )}
      </PDFDownloadLink>
      <ExcelExport data={excel} fileName={"trabajadoras"}/>
    </div>
  );
}
