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
  Wine,
} from "lucide-react";

export const links = [
  {
    icon: <LayoutDashboard />,
    title: "Dashboard",
    path: "/",
  },
  {
    icon: <ShoppingBasket />,
    title: "Productos",
    path: "/productos",
  },
  {
    icon: <ListOrdered />,
    title: "Pedidos",
    childrens: [
      {
        icon: <ListOrdered />,
        title: "Generar pedido",
        path: "/generar-pedido",
      },
      {
        icon: <ListOrdered />,
        title: "Lista de pedidos",
        path: "/lista-de-pedidos",
      }
    ],
  },
  {
    icon: <Boxes />,
    title: "Clientes",
    path: "/clientes",
  },
  {
    icon: <SlidersHorizontal />,
    title: "Categorias",
    path: "/categorias",
  },
  {
    icon: <Settings />,
    title: "Configuracion",
    childrens: [
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
      {
        icon: <Combine />,
        title: "Metodos de pago",
        path: "/metodos-de-pago",
      },
    ],
  },
  {
    icon: <AlarmClock />,
    title: "Asistencia",
    path: "/asistencia",
  },
  {
    icon: <Boxes />,
    title: "Cajero",
    childrens: [
      {
        icon: <Boxes />,
        title: "Apertura de caja",
        path: "/apertura-caja",
      },
      {
        icon: <Boxes />,
        title: "Caja",
        path: "/caja",
      },
    ],
  },
  {
    icon: <Wine />,
    title: "Barman",
    childrens: [
      {
        icon: <Fingerprint />,
        title: "Atencion de pedidos",
        path: "/atencion-de-pedidos",
      },
      {
        icon: <Combine />,
        title: "Pedidos atendidos",
        path: "/pedidos-atendidos",
      },
    ],
  },
];
