import { getProducts } from "@/helpers/getProducts";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import {
  OrderTables,
  SearchHostess,
  SearchProduct,
  OrderAction,
} from "../components/index";

export default function Orders() {
  const { data, isLoading } = useQuery("products", getProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const formatOrders = pendingOrders.reduce((acc, product) => {
    const productExist = acc.find((obj) => obj.id == product.id);
    if (productExist) {
      productExist.count = productExist.count + 1;
      productExist.price = Number(product.price) * productExist.count;
    } else {
      acc.push({ ...product, count: 1 });
    }
    return acc;
  }, [] as Product[]);

  const totalPrice = formatOrders.reduce((acc, curr) => {
    return acc + Number(curr.price);
  }, 0);

  useEffect(() => {
    const newFilteredProducts = (data ? data.product : []).filter(
      ({ name }: Product) => {
        const todoText = name.toLocaleLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
      }
    );
    setFilteredProducts(newFilteredProducts);
  }, [data, searchValue]);

  return (
    <section className="flex justify-center items-center flex-col gap-8 w-full relative md:-left-7 lg:left-4">
      <div className="fixed md:right-26 space-y-3 md:space-y-6 w-[95%] md:w-[60%] lg:w-[65%] h-[30rem] top-[4.7rem] p-5 bg-background z-30 shadow-2xl">
        <h3 className="text-3xl">Pedido</h3>
        <div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-24">
            <SearchHostess />
            <SearchProduct
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>
          <OrderTables formatOrders={formatOrders} pendingOrders={pendingOrders} setPendingOrders={setPendingOrders}/>
          <div className="absolute right-3 bottom-4 flex justify-end items-center gap-x-2 text-xl font-semibold">
            <span>Total a pagar:</span>
            <span className="w-62 p-1 rounded-md bg-foreground/20">S/.{totalPrice}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-4 relative top-[30rem]">
        <OrderAction
          formatOrders={formatOrders}
          isLoading={isLoading}
          setPendingOrders={setPendingOrders}
          pendingOrders={pendingOrders}
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
        />
      </div>
    </section>
  );
}
