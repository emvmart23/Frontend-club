import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { useEffect, useState } from "react";
import AttendanceForm from "../AttendanceForm";
import { getBoxes } from "@/page/box/components/BoxForm";

export default function AttendanceActions() {
  const [allBoxes, setBoxes] = useState<Box[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchBox = async () => {
    const data = await getBoxes();
    setBoxes(data.boxes);
  };

  useEffect(() => {
    fetchBox();
  }, []);

  const lastId = allBoxes.reduceRight(
    (maxId, box) => Math.max(maxId, box.id),
    0
  );
  const lastBox = allBoxes.find((box) => box.id === lastId);
  const boxIsClose = Boolean(lastBox?.state);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button disabled={boxIsClose === true ? false : true }>Asistencia</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl h-[30rem]">
        <AttendanceForm />
      </DialogContent>
    </Dialog>
  );
}
