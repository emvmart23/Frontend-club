import {
  AlarmClock,
  Boxes,
  Combine,
  Fingerprint,
  LayoutDashboard,
  ListOrdered,
  Settings,
  ShoppingBasket,
  SlidersHorizontal,
  User,
} from "lucide-react";

export const links = [
  {
    id: 1,
    icon: <LayoutDashboard />,
    title: "Dashboard",
    path: "/",
  },
  {
    id: 2,
    icon: <ShoppingBasket />,
    title: "Productos",
    path: "/productos",
  },
  {
    id: 3,
    icon: <ListOrdered />,
    title: "Pedidos",
    path: "/pedido",
  },
  {
    id: 4,
    icon: <Boxes />,
    title: "Clientes",
    path: "/clientes",
  },
  {
    id: 5,
    icon: <SlidersHorizontal />,
    title: "Categorias",
    path: "/categorias",
  },
  {
    id: 6,
    icon: <Settings />,
    title: "Configuracion",
    submenu: [
      {
        icon: <User />,
        title: "Usuarios",
        path: "/usuarios",
      },
      {
        icon: <Fingerprint />,
        title: "Roles",
        path: "/roles",
      },
      {
        icon: <Combine />,
        title: "Unidad",
        path: "/unidades",
      },
    ],
  },
  {
    id: 8,
    icon: <AlarmClock />,
    title: "Asistencia",
    path: "/asistencia",
  },
  {
    id: 9,
    icon: <Boxes />,
    title: "Caja",
    path: "/caja",
  },
];
