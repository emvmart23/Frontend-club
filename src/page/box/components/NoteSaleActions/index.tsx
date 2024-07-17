import { Button } from "@/components/ui/Button";
import NoteSaleFinish from "../NoteSaleFinish";
import api from "@/service";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "../../Pdf/PdfNotes";
import PdfTickets from "../../Pdf/PdfTickets";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  setIsOpen: (value: boolean) => void;
  header: Header;
}

export default function NoteSaleActions({ setIsOpen, header }: Props) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const cancelNote = async () => {
    try {
      const response = await api.post(`/note/anulated/${header?.id}`);
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
      <PDFDownloadLink document={<PDF data={header} />} fileName="notes.pdf">
        {() => (
          <Button className="w-full">
            PDF ticket
          </Button>
        )}
      </PDFDownloadLink>
      {header.state_doc !== null &&
        (Boolean(header.state_doc) === true ? (
          <NoteSaleFinish setIsOpen={setIsOpen} header={header} />
        ) : (
          <>
            <Button onClick={cancelNote} variant="destructive">
              Anular nota de venta
            </Button>
            <Button className="bg-orange-500">PDF ticket</Button>
            <PDFDownloadLink
              document={<PdfTickets data={header} user={user} />}
              fileName="anfitrionas.pdf"
            >
              {() => (
                <Button className="w-full">
                  Generar nota
                </Button>
              )}
            </PDFDownloadLink>
          </>
        ))}
    </>
  );
}
