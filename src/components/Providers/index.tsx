import { BrowserRouter } from "react-router-dom"

interface Props {
    children:React.ReactNode
}

export default function Providers({children}:Props) {
    return(
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}