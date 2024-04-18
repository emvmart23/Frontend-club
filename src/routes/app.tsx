const appRouter = [
    {
      path: "/",
      element: (
        <></>
        //<ProtectedRoute>
          //<AppLayout />
        //</ProtectedRoute>
      ),
    children: [
        {
          path: "/",
          element: <div>Dashboard</div>,
        },
        {
            path: "/",
            element: <div></div>,
        },
    ]
    }
]

export default appRouter;