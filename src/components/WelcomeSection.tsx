const WelcomeSection = () => {
  const aims = [
    "To promote the advancement of quality educational services in Nigeria.",
    "To collaborate with the Government people of the Federal Republic of Nigeria in the provision of the world class educational administration, delivery of quality education, maintenance of appropriate standards and best global practices.",
    "To promote self-regulatory and oversight functions in the operations of private schools in the country and act as a liaison body between the operators of private schools and the government for evolving conducive educational policies and quality control of private schools in the federation.",
    "To keep members abreast of developments, new trends, teaching methods and aids by ensuring quality professional publications, workshops, seminars and conferences for teachers and administrators.",
    "To promote collaboration between the Government at all levels, their educational agencies and the private sector educational service providers"
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
          {/* Left side - Chairman info */}
          <div className="text-center">
            <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-6 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/63769753-19f3-4016-bcd7-b347e88f7fa4.png" 
                alt="Elder Ogah Omaku Ogiri"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Elder Ogah Omaku Ogiri
            </h3>
            <p className="text-sm sm:text-base text-napps-blue font-medium mb-4">NAPPS Nasarawa State Chairman</p>
          </div>

          {/* Right side - Welcome text */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
              Welcome to NAPPS Nasarawa Chapter
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8">
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
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Aims and Objectives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {aims.map((aim, index) => (
              <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-napps-blue rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{aim}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="text-center bg-white rounded-lg p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">2024/2025 NAPPS State RESULTS</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6">Click here to view the results page</p>
          <a 
            href="https://exams.nappsnasarawa.com/student/results"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-napps-blue hover:bg-napps-blue-dark text-white font-medium px-6 py-3 sm:px-8 text-sm sm:text-base rounded-md transition-colors"
          >
            Click here
          </a>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;