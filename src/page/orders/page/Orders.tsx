import { getProducts } from "@/helpers/getProducts";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import {
  OrderTables,
  SearchHostess,
  SearchProduct,
  OrderAction,
} from "../components/index";
import { Button } from "@/components/ui/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import api from "@/service";
import { toast } from "@/hooks/useToast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Orders() {
  const { user } = useAuth();
  const { data, isLoading } = useQuery("products", getProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [formatOrder, setFormatOrder] = useState<Product[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [orders, setOrders] = useState<Product[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [value, setValue] = useState("");

  const formatOrders = (array: Product[]) => {
    return array.reduce((acc, product) => {
      const productExist = acc.find((obj) => obj.id == product.id);
      if (productExist) {
        productExist.count = productExist.count + 1;
        productExist.price = Number(product.price) * productExist.count;
      } else {
        acc.push({ ...product, count: 1 });
      }
      return acc;
    }, [] as Product[]);
  };

  const totalPrice = formatOrder.reduce((acc, curr) => {
    return acc + Number(curr.price);
  }, 0);

  const combineOrders = (
    formatOrders: Product[],
    totalPrice: number,
    hostess: string
  ) => {
    return formatOrders.map((order) => {
      return {
        ...order,
        hostess: hostess,
        total_price: totalPrice,
      };
    });
  };

  const createHeader = async (headerData: { mozo: string | undefined }) => {
    try {
      const response = await api.post("/headers/create", headerData);

      if (response.status !== 200) {
        toast({
          description: "Hubo un error al guardar el pedido",
          variant: "destructive",
        });
      }
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const saveOrder = async () => {
    setIsPending(true);

    if (value === "" || value === undefined) {
      toast({
        description: "Debe seleccionar un mozo",
        variant: "destructive",
      });
      setIsPending(false);
      return;
    }

    try {
      const header = {
        mozo: user?.name,
      };

      const data = await createHeader(header);

      const orderWithHosstes = orders.map((order) => {
        return {
          ...order,
          hostess: value,
        };
      });

      const response = await api.post("/orders/create", orderWithHosstes);

      if (response.status === 200 && data?.status === 200) {
        toast({
          description: "Pedido guardado correctamente",
          variant: "success",
        });
      } else {
        toast({
          description: "Hubo un error al guardar el pedido",
          variant: "destructive",
        });
      }

      setValue("");
      setPendingOrders([]);
      setIsPending(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const newFormatOrders = formatOrders(pendingOrders);
    setFormatOrder(newFormatOrders);
  }, [pendingOrders]);

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

  useEffect(() => {
    const combinedOrders = combineOrders(formatOrder, totalPrice, value);
    setOrders(combinedOrders);
  }, [formatOrder]);

  return (
    <section className="flex justify-center items-center flex-col gap-8 w-full relative md:pr-16 lg:pr-2">
      <div className="fixed space-y-3 md:space-y-5 w-[90%] lg:w-[61%] h-[30rem] md:h-[27rem] top-[4.7rem] p-5 bg-background z-30 shadow-2xl min-w-[300px]">
        <h3 className="text-3xl">Pedido</h3>
        <div className="relative">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-24">
            <SearchHostess value={value} setValue={setValue} />
            <SearchProduct
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>
          <OrderTables
            setFormatOrder={setFormatOrder}
            formatOrder={formatOrder}
            pendingOrders={pendingOrders}
            setPendingOrders={setPendingOrders}
          />
          <div className="w-[15rem] md:w-[18rem] lg:w-[19rem] xl:w-[22rem] absolute -right-[0.4rem] sm:right-[2rem] md:right-[3rem] lg:right-[2.5rem] xl:right-[5.6rem] -bottom-[4rem] flex justify-between items-center gap-x-1 text-[0.8rem] lg:text-xl font-semibold">
            <div>
              <span>Total a pagar: </span>
              <span className="p-1 rounded-md bg-foreground/20">
                S/.{totalPrice}
              </span>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={orders.length <= 0 ? true : false}>
                  {isPending && (
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Guardar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Estas seguro que deseas guardar la orden ?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={saveOrder}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <div className="flex gap-4 relative top-[30rem] md:top-[28rem]">
        <OrderAction
          isLoading={isLoading}
          setPendingOrders={setPendingOrders}
          pendingOrders={pendingOrders}
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          formatOrders={formatOrders}
          setFormatOrder={setFormatOrder}
        />
      </div>
    </section>
  );
}
