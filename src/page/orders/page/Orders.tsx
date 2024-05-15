import { getProducts } from '@/helpers/getProducts';
import OrderAction from '../components/OrderAction'
import { useQuery } from 'react-query';

export default function Orders() {
  const { data, isLoading } = useQuery("products", getProducts);
  console.log(data)
  return (
    <section className="flex flex-col gap-8 w-full">
      <h3 className="text-3xl">Pedido</h3>
      <div className="flex gap-4">
        <OrderAction product={data ? data.product : []} isLoading={isLoading}/>
      </div>

    </section>
  )
}
