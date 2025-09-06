import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Target, Award, Heart, BookOpen, Globe } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Professionalism",
      description: "Maintaining the highest standards in educational delivery and administrative excellence."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Equity",
      description: "Ensuring fair treatment and equal opportunities for all member schools and students."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Discipline",
      description: "Fostering structured learning environments that promote academic and moral development."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Religious Tolerance",
      description: "Embracing diversity and promoting understanding across different faith traditions."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Patriotism",
      description: "Instilling love for country and commitment to national development in our students."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Integrity",
      description: "Upholding honesty, transparency, and ethical conduct in all our operations."
    }
  ];

  const achievements = [
    { number: "500+", label: "Member Schools" },
    { number: "25,000+", label: "Students Impacted" },
    { number: "15+", label: "Years of Excellence" },
    { number: "100%", label: "Commitment to Quality" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-napps-blue/90 via-napps-blue/80 to-purple-900/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">About NAPPS Nasarawa</h1>
          <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Transforming Education Through Excellence, Innovation, and Collaborative Growth
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            {/* Mission */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-napps-green to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                We strive to be the incubator of knowledge and orientation required to provide and create 
                the change needed for national development and transformation through quality private education.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-napps-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                Committed to the comprehensive education and nurturing of the Nigerian Child for functional, 
                quality living and nation building through innovative educational practices.
              </p>
            </div>

            {/* Impact */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-napps-yellow to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Empowering private schools across Nasarawa State to deliver world-class education 
                and produce graduates who contribute meaningfully to society.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our actions and define our character as an organization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                <div className="text-napps-blue mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Organization */}
      <section className="py-20 bg-gradient-to-r from-napps-blue to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">About Our Organization</h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  The National Association of Proprietors of Private Schools (NAPPS) Nasarawa State 
                  is a professional body established to promote excellence in private education across 
                  Nasarawa State, Nigeria.
                </p>
                <p>
                  We serve as the unified voice of private school proprietors, advocating for quality 
                  education standards, professional development, and the advancement of educational 
                  policies that benefit our member schools and the communities they serve.
                </p>
                <p>
                  In collaboration with the Nasarawa State Ministry of Education, we work tirelessly 
                  to ensure that private schools in our state meet and exceed national educational 
                  standards while fostering innovation in teaching and learning methodologies.
                </p>
                <p>
                  Our association provides a platform for networking, resource sharing, and collective 
                  advocacy, enabling our member schools to thrive in an increasingly competitive 
                  educational landscape.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl font-bold text-napps-yellow mb-2">{achievement.number}</div>
                  <div className="text-gray-200">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Partnership</h2>
          <div className="bg-napps-red text-white py-4 px-8 rounded-lg inline-block mb-8">
            <p className="text-lg font-semibold">IN COLLABORATION WITH NASARAWA STATE MINISTRY OF EDUCATION</p>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Working hand-in-hand with the Nasarawa State Ministry of Education, we ensure that 
            private schools contribute meaningfully to the state's educational development goals 
            while maintaining autonomy in their operations and pedagogical approaches.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;