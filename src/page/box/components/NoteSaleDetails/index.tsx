import NoteSaleForm from "../NoteSaleForm";
import { useEffect, useState } from "react";

interface Props {
  setIsOpen: (value: boolean) => void;
  header: Header;
}

export default function NoteSaleDetails({ setIsOpen, header }: Props) {
  const [paymentFields, setPaymentFields] = useState<PaymentField[]>([])
  const [pendingPayment, setPendingPayment] = useState<number>(0);
  const ordersDetails = header?.orders.find((order) => order);
  
  useEffect(() => {
    const totalPayment = paymentFields.reduce((acc: number, curr) => acc + Number(curr.mountain), 0);
    setPendingPayment(totalPayment);
  }, [paymentFields]);

  const pendingValue = Number(ordersDetails?.total_price) - pendingPayment;
  console.log(pendingValue);
  return (
    <>
      <NoteSaleForm setIsOpen={setIsOpen} ordersDetails={ordersDetails} setPaymentFields={setPaymentFields}/>
      <div className="absolute right-8 bottom-20">
        <strong>Total : </strong>
        <strong>S/. {ordersDetails?.total_price}</strong>
      </div>
    </>
  );
}
