import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full" data-testid="marketing-layout">
      <Header />
      <main className="flex-1 pt-[calc(2.25rem+3.5rem)] lg:pt-[calc(2.25rem+4rem)]">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
