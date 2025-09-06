const WelcomeSection = () => {
  const aims = [
    "To promote the advancement of quality educational services in Nigeria.",
    "To collaborate with the Government people of the Federal Republic of Nigeria in the provision of the world class educational administration, delivery of quality education, maintenance of appropriate standards and best global practices.",
    "To promote self-regulatory and oversight functions in the operations of private schools in the country and act as a liaison body between the operators of private schools and the government for evolving conducive educational policies and quality control of private schools in the federation.",
    "To keep members abreast of developments, new trends, teaching methods and aids by ensuring quality professional publications, workshops, seminars and conferences for teachers and administrators.",
    "To promote collaboration between the Government at all levels, their educational agencies and the private sector educational service providers"
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left side - Chairman info */}
          <div className="text-center">
            <div className="w-64 h-64 mx-auto mb-6 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/api/placeholder/256/256" 
                alt="Hon Daniel Ogga Omaku Ogiri"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Hon Daniel Ogga Omaku Ogiri
            </h3>
            <p className="text-napps-blue font-medium mb-4">NAPPS Nasarawa State Chairman</p>
            <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
              It is a long established fact that a reader will be distracted by the readable content 
              of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
              more-or-less normal distribution of letters.
            </p>
          </div>

          {/* Right side - Welcome text */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Welcome to NAPPS Nasarawa Chapter
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              The National Association of Proprietors of Private Schools (NAPPS) is the apex association 
              of private school owners in Nigeria. NAPPS was founded in 2005 with the aim of promoting 
              the welfare and interaction of proprietors of private schools and the advancement of quality 
              educational services in Nigeria. This coupled with our vision which compels us to educate 
              and nurture the Nigerian child for functional as well as quality living wherever he finds 
              himself spurs us to stay at our best in ensuring the delivery quality of educational services 
              at all our schools.
            </p>
            <p className="text-gray-600 leading-relaxed">
              On this website, you will find information on our activities, news, and resources relevant 
              to the education community. We hope you find your visit informative and helpful. Thank you 
              for visiting, and we look forward to serving you better!
            </p>
          </div>
        </div>

        {/* Aims and Objectives */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Aims and Objectives</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {aims.map((aim, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-napps-blue rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-600 leading-relaxed">{aim}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="text-center bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">2024 NAPPS State RESULTS</h3>
          <p className="text-gray-600 mb-6">Click here to view the results page</p>
          <button className="bg-napps-blue hover:bg-napps-blue-dark text-white font-medium px-8 py-3 rounded-md transition-colors">
            Click here
          </button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;