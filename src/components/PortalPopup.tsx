import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PortalPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup was shown in this session
    const popupShown = sessionStorage.getItem('portalPopupShown');
    
    if (!popupShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('portalPopupShown', 'true');
      }, 7000); // Show after 7 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleBannerClick = () => {
    window.open('https://portal.nappsnasarawa.com', '_blank', 'noopener,noreferrer');
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>NAPPS Portal</DialogTitle>
          <DialogDescription>Click to visit the NAPPS Nasarawa portal</DialogDescription>
        </DialogHeader>
        <div className="relative">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>
          <div 
            onClick={handleBannerClick}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img 
              src="/Yellow and Blue Illustrative Important Announcement Instagram post (1902 x 600 px).png" 
              alt="NAPPS Nasarawa Portal - Click to visit"
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
              <p className="text-white text-center text-sm sm:text-base font-semibold">
                Click to visit NAPPS Nasarawa Portal
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortalPopup;
