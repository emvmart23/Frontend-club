import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import NoteSaleForm from "../NoteSaleForm";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

interface Props {
    setIsOpen: (value: boolean) => void;
    header: Header;
  }

export default function NoteSaleFinish({ setIsOpen, header }: Props) {
  const [paymentFields, setPaymentFields] = useState<PaymentField[]>([]);
  const [pendingPayment, setPendingPayment] = useState<number>(0);
  const ordersDetails = header?.orders.find((order) => order);

  useEffect(() => {
    const totalPayment = paymentFields.reduce(
      (acc: number, curr) => acc + Number(curr.mountain),
      0
    );
    setPendingPayment(totalPayment);
  }, [paymentFields]);

  const pendingValue = Number(ordersDetails?.total_price) - pendingPayment;
  console.log(pendingValue);
  console.log("data", ordersDetails)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="destructive">Terminar</Button>
      </DialogTrigger>
      <DialogContent className="h-[34rem] max-w-[42rem]">
        <NoteSaleForm
          setIsOpen={setIsOpen}
          ordersDetails={ordersDetails}
          setPaymentFields={setPaymentFields}
          header={header}
        />
        <div className="absolute right-8 bottom-20">
          <strong>Total : </strong>
          <strong>S/. {ordersDetails?.total_price}</strong>
        </div>
      </DialogContent>
    </Dialog>
  );
}
