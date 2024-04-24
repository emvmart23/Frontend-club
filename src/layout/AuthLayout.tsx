import { TailwindIndicator } from "../components/index";
import { Toaster } from "../components/ui/Toaster";

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <div className="relative w-screen h-screen bg-muted">
      {children}
      <TailwindIndicator />
      <Toaster />
    </div>
  );
}

export default AuthLayout;