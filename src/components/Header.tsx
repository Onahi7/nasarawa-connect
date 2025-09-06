import { Button } from "@/components/ui/button";

const Header = () => {
  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Portal", href: "https://portal.nappsnasarawa.com" },
    { name: "RESULTS", href: "https://portal.nappsnasarawa.com/student/result" },
    { name: "PROPRIETOR REGISTRATION", href: "https://register.nappsnasarawa.com" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top announcement banner */}
      <div className="bg-napps-red text-white py-1 px-4 text-center text-sm">
        <span className="font-medium">IN COLLABORATION WITH NASARAWA STATE MINISTRY OF EDUCATION</span>
      </div>
      
      {/* Main navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-end space-x-6">
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
      </nav>
    </header>
  );
};

export default Header;