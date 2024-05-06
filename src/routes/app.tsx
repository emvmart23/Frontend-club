import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/layout/AppLayout";
import Attendance from "@/page/attendance/page/Attendance";
import Categories from "@/page/category/page/Categories";
import Customers from "@/page/customer/page/Customers";
import Dashboard from "@/page/home/Dashboard";
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
      }
    ],
  },
];

export default appRouter;
