import { AlarmClock, Boxes, Combine, Fingerprint, LayoutDashboard, ListOrdered, Settings, ShoppingBasket, SlidersHorizontal, User } from "lucide-react";

export const links = [
    {
        icon: <LayoutDashboard />,
        title: "Dashboard",
        path: "/"
    },
    {
        icon: <ShoppingBasket />,
        title: "Productos",
        path: "/productos",
    },
    {
        icon: <ListOrdered />,
        title: "Pedidos",
        path: "/pedido",
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
        icon: <Settings/>,
        title: "Configuracion",
        path: "/configuracion",
        submenu: [
            {
                icon: <User />,
                title: "Usuarios",
                path: "/usuarios",
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
            }
        ]
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