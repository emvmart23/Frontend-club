import Users from "@/page/user/page/Users"

const appRouter = [
    {
      path: "/",
      element: (
        <Users/>
        //<ProtectedRoute>
          //<AppLayout />
        //</ProtectedRoute>
      ),
    children: [
        {
            path: "/users",
            element: <></>,
        },
    ]
    }
]

export default appRouter;