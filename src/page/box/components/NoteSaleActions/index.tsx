import { Button } from "@/components/ui/Button";
import NoteSaleFinish from "../NoteSaleFinish";
import api from "@/service";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Loader2 } from "lucide-react";
import PdfNotes from "../../Pdf/PdfNotes";
import PDF from "../../Pdf/PdfNotes";

interface Props {
  setIsOpen: (value: boolean) => void;
  header: Header;
}

export default function NoteSaleActions({ setIsOpen, header }: Props) {
  const queryClient = useQueryClient();

  const cancelNote = async () => {
    try {
      const response = await api.post(`/anulated/${header?.id}`);
      if (response.status === 200) {
        toast({
          description: "Venta anulada correctamente",
          variant: "success",
        });
        queryClient.invalidateQueries("headers");
        setIsOpen(false);
      } else {
        toast({
          description: "Error al anular venta",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        description: "Error al anular venta",
        variant: "destructive",
      });
    }
  };
  [];

  return (
    <>
      <div>
        <PDFDownloadLink document={<PDF />} fileName="notes.pdf">
          {({ loading }) => "Download"}
        </PDFDownloadLink>
      </div>
      {Boolean(header.state_doc) === true ? (
        <NoteSaleFinish setIsOpen={setIsOpen} header={header} />
      ) : (
        <Button onClick={cancelNote} variant="destructive">
          Anular
        </Button>
      )}
      <Button className="bg-orange-500">PDF ticket</Button>
    </>
  );
}
