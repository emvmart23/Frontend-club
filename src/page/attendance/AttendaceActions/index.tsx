import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { useState } from "react";
import AttendanceForm from "../AttendanceForm";


export default function AttendanceActions() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Asistencia</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl h-[30rem]">
        <AttendanceForm />
      </DialogContent>
    </Dialog>
  );
}
