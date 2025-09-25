import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex  h-screen bg-white">
      <Sidebar />
      <div className="ml-64 flex flex-col flex-1 min-h-0">
        <Header />
        <main className="flex-1 overflow-auto h-full scrollbar-hide">{children}</main>
      </div>
    </div>
  );
}
