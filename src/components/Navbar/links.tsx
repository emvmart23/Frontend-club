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

const sizeIconOfSubmenu = 17;
const sizeIconOfMenu = 22;

export const links = [
  {
    icon: <LayoutDashboard size={sizeIconOfMenu} />,
    title: "Dashboard",
    path: "/",
  },
  {
    icon: <ShoppingBasket size={sizeIconOfMenu} />,
    title: "Productos",
    path: "/productos",
  },
  {
    icon: <ListOrdered size={sizeIconOfMenu} />,
    title: "Pedidos",
    childrens: [
      {
        icon: <CirclePlus size={sizeIconOfSubmenu} />,
        title: "Generar pedido",
        path: "/generar-pedido",
      },
      {
        icon: <List size={sizeIconOfSubmenu} />,
        title: "Lista de pedidos",
        path: "/lista-de-pedidos",
      },
    ],
  },
  {
    icon: <Users size={sizeIconOfMenu} />,
    title: "Clientes",
    path: "/clientes",
  },
  {
    icon: <SlidersHorizontal size={sizeIconOfMenu} />,
    title: "Categorias",
    path: "/categorias",
  },
  {
    icon: <Settings size={sizeIconOfMenu} />,
    title: "Configuracion",
    childrens: [
      {
        icon: <User size={sizeIconOfSubmenu} />,
        title: "Usuarios",
        path: "/usuarios",
      },
      {
        icon: <Fingerprint size={sizeIconOfSubmenu} />,
        title: "Roles",
        path: "/roles",
      },
      {
        icon: <Combine size={sizeIconOfSubmenu} />,
        title: "Unidad",
        path: "/unidades",
      },
      {
        icon: <HandCoins size={sizeIconOfSubmenu} />,
        title: "Metodos de pago",
        path: "/metodos-de-pago",
      },
    ],
  },
  {
    icon: <AlarmClock size={sizeIconOfMenu} />,
    title: "Asistencia",
    path: "/asistencia",
  },
  {
    icon: <Boxes size={sizeIconOfMenu} />,
    title: "Cajero",
    childrens: [
      {
        icon: <SquareArrowOutUpRight size={sizeIconOfSubmenu} />,
        title: "Apertura de caja",
        path: "/apertura-caja",
      },
      {
        icon: <PackageOpen size={sizeIconOfSubmenu} />,
        title: "Cajas",
        path: "/caja",
      },
    ],
  },
  {
    icon: <Wine size={sizeIconOfMenu} />,
    title: "Barman",
    childrens: [
      {
        icon: <Fingerprint size={sizeIconOfSubmenu} />,
        title: "Atencion de pedidos",
        path: "/atencion-de-pedidos",
      },
      {
        icon: <Combine size={sizeIconOfSubmenu} />,
        title: "Pedidos atendidos",
        path: "/pedidos-atendidos",
      },
    ],
  },
  {
    icon: <ClipboardMinus size={sizeIconOfMenu} />,
    title: "Reportes",
    childrens: [
      {
        icon: <ClipboardPlus size={sizeIconOfSubmenu} />,
        title: "Anfitrionas",
        path: "/reportes-de-anfitrionas",
      },
    ],
  },
];
