import { Megaphone } from "lucide-react";

const NewsSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-napps-yellow/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-start gap-4 sm:gap-6 bg-white rounded-lg p-6 sm:p-8 shadow-lg">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-napps-yellow rounded-full flex items-center justify-center">
              <Megaphone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-napps-blue mb-3">
              Latest News & Updates
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-napps-blue pl-4">
                <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">
                  2025/2026 Data Capturing Now Open!
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  The National Association of Proprietors of Private Schools (NAPPS) Nasarawa State is pleased to announce that the 2025/2026 academic year data capturing exercise has commenced. All proprietors are advised to register their schools and update their information on the portal.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-2">
                  This exercise is mandatory for all private schools in Nasarawa State and will enable better coordination, support, and services for our members.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <a 
                  href="https://portal.nappsnasarawa.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-napps-blue hover:bg-napps-blue-dark text-white font-medium px-6 py-3 rounded-md transition-colors text-sm sm:text-base"
                >
                  Visit Portal
                </a>
                <a 
                  href="https://register.nappsnasarawa.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-napps-green hover:bg-napps-green/90 text-white font-medium px-6 py-3 rounded-md transition-colors text-sm sm:text-base"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
