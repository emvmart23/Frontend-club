import {
  AlarmClock,
  Boxes,
  CirclePlus,
  Combine,
  Fingerprint,
  LayoutDashboard,
  List,
  ListOrdered,
  PackageOpen,
  Settings,
  ShoppingBasket,
  SlidersHorizontal,
  SquareArrowOutUpRight,
  User,
  Users,
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
        icon: <CirclePlus />,
        title: "Generar pedido",
        path: "/generar-pedido",
      },
      {
        icon: <List />,
        title: "Lista de pedidos",
        path: "/lista-de-pedidos",
      }
    ],
  },
  {
    icon: <Users />,
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
        icon: <SquareArrowOutUpRight />,
        title: "Apertura de caja",
        path: "/apertura-caja",
      },
      {
        icon: <PackageOpen />,
        title: "Cajas",
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
