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
          className="relative px-4 py-3 text-sm font-medium text-center"
          style={{
            backgroundColor: announcement.background_color || '#1e40af',
            color: announcement.text_color || '#ffffff',
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex-1">
              <span className="font-semibold mr-2">{announcement.title}</span>
              <span>{announcement.message}</span>
            </div>
            <button
              onClick={() => handleDismiss(announcement.id)}
              className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementBar;