import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/layout/AppLayout";
import Categories from "@/page/category/page/Categories";
import Dashboard from "@/page/home/Dashboard";
import Products from "@/page/product/page/Products";
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
        path: "/categorias",
        element: <Categories />,
      },
    ],
  },
];

export default appRouter;
