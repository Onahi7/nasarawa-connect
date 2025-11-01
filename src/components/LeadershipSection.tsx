import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMembers } from "@/hooks/useMembers";

const LeadershipSection = () => {
  const { members: leaders, loading } = useMembers();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12 lg:mb-16">
          Meet our Amiable Leaders
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-card animate-pulse">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-16 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {leaders.map((leader) => (
              <div key={leader.id} className="text-center group cursor-pointer">
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={leader.image_url || "/placeholder.svg"}
                    alt={leader.name}
                    className="w-full h-64 sm:h-72 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-napps-blue transition-colors">
                  {leader.name}
                </h3>
                <p className="text-sm sm:text-base text-napps-blue font-medium mb-4">
                  {leader.position}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {leader.bio || "Dedicated to advancing educational excellence and supporting our member schools in Nasarawa State."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LeadershipSection;