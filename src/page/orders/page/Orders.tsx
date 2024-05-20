import { getProducts } from "@/helpers/getProducts";
import OrderAction from "../components/OrderAction";
import { useQuery } from "react-query";
import {useState } from "react";
import OrderTables from "../components/OrderTables";
import SearchProduct from "../components/SearchProduct";
import SearchHostess from "../components/SearchHostess";

export default function Orders() {
  const { data, isLoading } = useQuery("products", getProducts);
  const [searchValue, setSearchValue] = useState("");
  const [pendindgOrders, setPendingOrders] = useState<Product[] | []>([]);

  const filteredProducts = (data ? data.product : []).filter(
    ({ name }: Product) => {
      const todoText = name.toLocaleLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    }
  );

  const formatOrders = pendindgOrders.reduce((acc, product) => {
    const productExist = acc.find((obj) => obj.id == product.id);
    productExist ? productExist.count++ : acc.push({ ...product, count: 1 });
    return acc;
  }, [] as Order[]);

  const totalPrice = formatOrders.reduce((acc ,curr) => {
    return acc + curr.price * curr.count;
  }, 0)

  return (
    <section className="flex flex-col gap-8 w-full">
      <div className="fixed space-y-6 md:w-[60%] lg:w-[60%] top-[4.7rem] p-5 bg-background z-20">
        <h3 className="text-3xl">Pedido</h3>
        <div className="flex gap-8 md:gap-40">
          <SearchHostess />
          <SearchProduct
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
      </div>
      <div className="mt-40 mb-24 mx-auto w-[80%]">
        <OrderTables pendingOrders={pendindgOrders} totalPrice={totalPrice} />
      </div>
      <div className="flex gap-4">
        <OrderAction
          isLoading={isLoading}
          setPendingOrders={setPendingOrders}
          pendingOrders={pendindgOrders}
          filteredProducts={filteredProducts}
        />
      </div>
    </section>
  );
}
