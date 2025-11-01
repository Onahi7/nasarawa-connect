import { X } from "lucide-react";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useState } from "react";

const AnnouncementBar = () => {
  const { announcements, loading } = useAnnouncements();
  const [dismissed, setDismissed] = useState<string[]>([]);

  if (loading || announcements.length === 0) return null;

  const activeAnnouncements = announcements.filter(
    (announcement) => 
      announcement.show_on_all_pages && 
      !dismissed.includes(announcement.id)
  );

  if (activeAnnouncements.length === 0) return null;

  const handleDismiss = (id: string) => {
    setDismissed(prev => [...prev, id]);
  };

  return (
    <div className="relative">
      {activeAnnouncements.map((announcement) => (
        <div
          key={announcement.id}
          className="relative px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-center"
          style={{
            backgroundColor: announcement.background_color || '#1e40af',
            color: announcement.text_color || '#ffffff',
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex-1 text-left sm:text-center">
              <span className="font-semibold mr-1 sm:mr-2">{announcement.title}</span>
              <span className="block sm:inline">{announcement.message}</span>
            </div>
            <button
              onClick={() => handleDismiss(announcement.id)}
              className="ml-2 sm:ml-4 p-1 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
              aria-label="Dismiss announcement"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementBar;