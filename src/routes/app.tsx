import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/layout/AppLayout";
import Attendance from "@/page/attendance/page/Attendance";
import OrderHandling from "@/page/barman/page/OrderHandling";
import OrdersProcessed from "@/page/barman/page/OrdersProcessed";
import Boxes from "@/page/box/page/Boxes";
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
        path: '/asistencia',
        element: <Attendance/>
      },
      {
        path: '/caja',
        element: <Boxes/>
      },
      {
        path: '/pedido',
        element: <Orders/>
      },
      {
        path: '/atencion-de-pedidos',
        element: <OrderHandling/>
      },
      {
        path: '/pedidos-atendidos',
        element: <OrdersProcessed/>
      }
    ],
  },
];

export default appRouter;
