import { useQuery } from "react-query";
import FinishSaleForm from "../NoteSaleForm";
import { getDetails } from "@/helpers/getDetails";

interface Props {
  setIsOpen: (value: boolean) => void;
  header: Header;
}

export default function NoteSaleDetails({ setIsOpen, header }: Props) {
  const { data } = useQuery("details", getDetails);
  const ordersDetails = header?.orders.find((order) => order);

  const pendingPayments = data?.data.find.reduce((acc: Header, curr) => {
    return;
  }, 0);

  return (
    <>
      <FinishSaleForm setIsOpen={setIsOpen} ordersDetails={ordersDetails} />
      <div className="absolute right-8 bottom-20">
        <strong>Total : </strong>
        <strong>S/. {ordersDetails?.total_price}</strong>
      </div>
    </>
  );
}
