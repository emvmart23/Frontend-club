import { store } from "@/store/store"

import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

interface Props {
    children:React.ReactNode
}

export default function Providers({children}:Props) {
    const queryClient = new QueryClient()
    return(
        <BrowserRouter>
         <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
         </Provider>
        </BrowserRouter>
    )
}
