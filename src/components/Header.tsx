import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Portal", href: "https://exams.nappsnasarawa.com" },
    { name: "RESULTS", href: "https://exams.nappsnasarawa.com/student/results" },
    { name: "PROPRIETOR REGISTRATION", href: "https://portal.nappsnasarawa.com" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top announcement banner */}
      <div className="bg-napps-red text-white py-1 px-4 text-center text-sm">
        <span className="font-medium">IN COLLABORATION WITH NASARAWA STATE MINISTRY OF EDUCATION</span>
      </div>
      
      {/* Main navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="NAPPS Nasarawa Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith('https://') ? '_blank' : '_self'}
                rel={item.href.startsWith('https://') ? 'noopener noreferrer' : undefined}
                className={`text-sm font-medium transition-colors hover:text-napps-blue ${
                  item.name === "RESULTS" || item.name === "PROPRIETOR REGISTRATION" || item.name === "Portal"
                    ? "text-napps-blue"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.href.startsWith('https://') ? '_blank' : '_self'}
                    rel={item.href.startsWith('https://') ? 'noopener noreferrer' : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-napps-blue py-2 ${
                      item.name === "RESULTS" || item.name === "PROPRIETOR REGISTRATION" || item.name === "Portal"
                        ? "text-napps-blue"
                        : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;