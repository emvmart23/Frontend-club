import {
  AlarmClock,
  Boxes,
  CirclePlus,
  ClipboardMinus,
  ClipboardPlus,
  Combine,
  Fingerprint,
  HandCoins,
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

const sizes = {
  menu:22,
  subMenu:17, 
}

export const links = [
  {
    icon: <LayoutDashboard size={sizes.menu} />,
    title: "Dashboard",
    path: "/",
  },
  {
    icon: <ShoppingBasket size={sizes.menu} />,
    title: "Productos",
    path: "/productos",
  },
  {
    icon: <ListOrdered size={sizes.menu} />,
    title: "Pedidos",
    childrens: [
      {
        icon: <CirclePlus size={sizes.subMenu} />,
        title: "Generar pedido",
        path: "/generar-pedido",
      },
      {
        icon: <List size={sizes.subMenu} />,
        title: "Lista de pedidos",
        path: "/lista-de-pedidos",
      },
    ],
  },
  {
    icon: <Users size={sizes.menu} />,
    title: "Clientes",
    path: "/clientes",
  },
  {
    icon: <SlidersHorizontal size={sizes.menu} />,
    title: "Categorias",
    path: "/categorias",
  },
  {
    icon: <Settings size={sizes.menu} />,
    title: "Configuracion",
    childrens: [
      {
        icon: <User size={sizes.subMenu} />,
        title: "Usuarios",
        path: "/usuarios",
      },
      {
        icon: <Fingerprint size={sizes.subMenu} />,
        title: "Roles",
        path: "/roles",
      },
      {
        icon: <Combine size={sizes.subMenu} />,
        title: "Unidad",
        path: "/unidades",
      },
      {
        icon: <HandCoins size={sizes.subMenu} />,
        title: "Metodos de pago",
        path: "/metodos-de-pago",
      },
    ],
  },
  {
    icon: <AlarmClock size={sizes.menu} />,
    title: "Asistencia",
    path: "/asistencia",
  },
  {
    icon: <Boxes size={sizes.menu} />,
    title: "Cajero",
    childrens: [
      {
        icon: <SquareArrowOutUpRight size={sizes.subMenu} />,
        title: "Apertura de caja",
        path: "/apertura-caja",
      },
      {
        icon: <PackageOpen size={sizes.subMenu} />,
        title: "Cajas",
        path: "/caja",
      },
    ],
  },
  {
    icon: <Wine size={sizes.menu} />,
    title: "Barman",
    childrens: [
      {
        icon: <Fingerprint size={sizes.subMenu} />,
        title: "Atencion de pedidos",
        path: "/atencion-de-pedidos",
      },
      {
        icon: <Combine size={sizes.subMenu} />,
        title: "Pedidos atendidos",
        path: "/pedidos-atendidos",
      },
    ],
  },
  {
    icon: <ClipboardMinus size={sizes.menu} />,
    title: "Reportes",
    childrens: [
      {
        icon: <ClipboardPlus size={sizes.subMenu} />,
        title: "Anfitrionas",
        path: "/reportes-de-anfitrionas",
      },
    ],
  },
];
