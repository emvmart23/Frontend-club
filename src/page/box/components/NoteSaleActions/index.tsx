import { Button } from "@/components/ui/Button";
import NoteSaleFinish from "../NoteSaleFinish";

interface Props {
  setIsOpen: (value: boolean) => void;
  header: Header;
}

export default function NoteSaleActions({ setIsOpen, header }: Props) {
  
  return (
    <>
      <Button> Generar ticket </Button>
      {Boolean(header.state_doc) === true ? (
        <NoteSaleFinish setIsOpen={setIsOpen} header={header} />
      ) : (
        <Button className="bg-orange-500">Anular</Button>
      )}
      <Button className="bg-orange-500">PDF ticket</Button>
    </>
  );
}
