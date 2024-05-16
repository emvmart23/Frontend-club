import { getProducts } from '@/helpers/getProducts';
import OrderAction from '../components/OrderAction'
import { useQuery } from 'react-query';
import { useState } from 'react';
import OrderTables from '../components/OrderTables';

export default function Orders() {
  const { data, isLoading } = useQuery("products", getProducts);
  const [pendindgOrders, setPendingOrders] = useState<Product[] | []>([]);
  
  return (
    <section className="flex flex-col gap-8 w-full">
      <h3 className="text-3xl">Pedido</h3>
      <div>
        <OrderTables pendingOrders={pendindgOrders}/>
      </div>
      <div className="flex gap-4">
        <OrderAction product={data ? data.product : []} isLoading={isLoading} setPendingOrders={setPendingOrders} pendingOrders={pendindgOrders}/>
      </div>

    </section>
  )
}
