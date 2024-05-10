import { AlarmClock, Boxes, Combine, Fingerprint, LayoutDashboard, ShoppingBasket, SlidersHorizontal, User } from "lucide-react";

export const links = [
    {
        icon: <LayoutDashboard />,
        title: "Dashboard",
        path: "/"
    },
    {
        icon: <User />,
        title: "Usuarios",
        path: "/usuarios",
    },
    {
        icon: <ShoppingBasket />,
        title: "Productos",
        path: "/productos",
    },
    {
        icon: <Boxes />,
        title:"Clientes",
        path:"/clientes" 
    },
    {
        icon: <SlidersHorizontal />,
        title: "Categorias",
        path: "/categorias"
    },
    {
        icon: <Fingerprint />,
        title: "Roles",
        path: "/roles"
    },
    {
        icon: <Combine  />,
        title: "Unidad",
        path: "/unidades"
    },
    {
        icon: <AlarmClock />,
        title: "Asistencia",
        path: "/asistencia"
    },
    {
        icon: <Boxes />,
        title: "Caja",
        path: "/caja"
    }
]