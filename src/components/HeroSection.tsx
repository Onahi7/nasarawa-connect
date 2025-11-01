import { Button } from "@/components/ui/button";
import { Megaphone, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useHeroImages } from "@/hooks/useHeroImages";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const HeroSection = () => {
  const { images, loading } = useHeroImages();
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="relative min-h-screen overflow-hidden pt-16 sm:pt-20" style={{ background: 'var(--gradient-hero)' }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
        {/* Left side - Carousel content */}
        <div className="text-white order-2 lg:order-1">
          {loading ? (
            <div className="animate-pulse space-y-4 sm:space-y-6">
              <div className="h-10 sm:h-12 bg-white/20 rounded mb-4 sm:mb-6"></div>
              <div className="h-6 sm:h-8 bg-white/20 rounded mb-3 sm:mb-4"></div>
              <div className="h-4 bg-white/20 rounded w-2/3 mb-4 sm:mb-6"></div>
              <div className="h-10 sm:h-12 bg-white/20 rounded w-full sm:w-32"></div>
            </div>
          ) : (
            <Carousel 
              className="w-full"
              plugins={[
                Autoplay({
                  delay: 5000,
                })
              ]}
            >
              <CarouselContent>
                {images.length > 0 ? images.map((image) => (
                  <CarouselItem key={image.id}>
                    <div className="space-y-4 sm:space-y-6">
                      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                        {image.title}
                      </h1>
                      {image.description && (
                        <p className="text-base sm:text-lg leading-relaxed text-gray-200 max-w-2xl">
                          {image.description}
                        </p>
                      )}
                      <div>
                        <Button 
                          className="bg-napps-green hover:bg-napps-green/90 text-white font-medium px-8 py-3 rounded-md transition-all duration-300 hover:scale-105"
                        >
                          REGISTER
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                )) : (
                  <CarouselItem>
                    <div className="space-y-4 sm:space-y-6">
                      <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                        Welcome to<br />
                        <span className="text-napps-yellow">NAPPS NASARAWA STATE</span>
                      </h1>
                      <p className="text-base sm:text-lg leading-relaxed text-gray-200 max-w-2xl">
                        National Association of Proprietors of Private Schools
                      </p>
                      <div>
                        <Button 
                          className="bg-napps-green hover:bg-napps-green/90 text-white font-medium px-6 py-3 sm:px-8 text-sm sm:text-base rounded-md transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                        >
                          REGISTER
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex left-4 text-white border-white/20 hover:bg-white/20" />
              <CarouselNext className="hidden sm:flex right-4 text-white border-white/20 hover:bg-white/20" />
            </Carousel>
          )}
        </div>

        {/* Right side - Banner Images */}
        <div className="relative order-1 lg:order-2">
          {loading ? (
            <div className="w-full h-64 sm:h-80 lg:h-96 bg-white/20 rounded-lg animate-pulse"></div>
          ) : (
            <Carousel 
              className="w-full"
              plugins={[
                Autoplay({
                  delay: 5000,
                })
              ]}
            >
              <CarouselContent>
                {images.length > 0 ? images.map((image) => (
                  <CarouselItem key={`banner-${image.id}`}>
                    <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
                      <img 
                        src={image.image_url} 
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  </CarouselItem>
                )) : (
                  <CarouselItem>
                    <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
                      <img 
                        src="/banner1.jpg" 
                        alt="NAPPS Nasarawa State Banner"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>
          )}
        </div>
      </div>

      {/* Mission, Vision, Values cards at bottom */}
      <div className="relative z-10 mt-8 sm:mt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Our Mission */}
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-card transform transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-napps-green/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-napps-green rounded flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-sm"></div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Our Mission</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We strive to be the incubator of knowledge and orientation required to provide and create 
                the change needed for national development and transformation.
              </p>
            </div>

            {/* Our Vision */}
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-card transform transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-napps-green/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-napps-green rounded flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white"></div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Our Vision</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Committed to the comprehensive education and nurturing of the Nigeria Child for functional, 
                quality living and nation building.
              </p>
            </div>

            {/* Our Core Values */}
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-card transform transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-napps-green/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-napps-green rounded flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded"></div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Our Core Values</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Professionalism, Equity, Discipline, Religious tolerance, Patriotism and Integrity
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;