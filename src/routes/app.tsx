import AppLayout from "@/layout/AppLayout";
import Users from "@/page/user/page/Users"

const appRouter = [
    {
      path: "/",
      element: (
          <AppLayout />
      ),
    children: [
        {
            path: "/",
            element: <Users/>,
        },
    ]
    }
]

export default appRouter;