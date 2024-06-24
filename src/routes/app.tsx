import ProtectedRoute from "@/components/ProtectedRoute";
import RouteNotFound from "@/components/RouteNotFound";
import AppLayout from "@/layout/AppLayout";
import Attendance from "@/page/attendance/page/Attendance";
import OrderHandling from "@/page/barman/page/OrderHandling";
import OrdersProcessed from "@/page/barman/page/OrdersProcessed";
import Boxes from "@/page/box/page/Boxes";
import OpeningBoxes from "@/page/box/page/OpeningBox";
import MethodsPayments from "@/page/method_payments/page/MethodsPayments";
import Categories from "@/page/category/page/Categories";
import Customers from "@/page/customer/page/Customers";
import Dashboard from "@/page/home/Dashboard";
import Orders from "@/page/orders/page/Orders";
import Products from "@/page/product/page/Products";
import Roles from "@/page/role/page/Roles";
import Units from "@/page/unit_measure/page/Units";
import Users from "@/page/user/page/Users";

const appRouter = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/usuarios",
        element: <Users />,
      },
      {
        path: "/productos",
        element: <Products />,
      },
      {
        path: "/clientes",
        element: <Customers />,
      },
      {
        path: "/categorias",
        element: <Categories />,
      },
      {
        path: "/roles",
        element: <Roles />,
      },
      {
        path: "/unidades",
        element: <Units />,
      },
      {
        path: "/metodos-de-pago",
        element: <MethodsPayments />,
      },
      {
        path: "/asistencia",
        element: <Attendance />,
      },
      {
        path: "/apertura-caja",
        element: <OpeningBoxes />,
      },
      {
        path: "/caja",
        element: <Boxes />,
      },
      {
        path: "/pedido",
        element: <Orders />,
      },
      {
        path: "/atencion-de-pedidos",
        element: <OrderHandling />,
      },
      {
        path: "/pedidos-atendidos",
        element: <OrdersProcessed />,
      },
      {
        path: "*",
        element: <RouteNotFound/>
      },
    ],
  },
];

export default appRouter;
