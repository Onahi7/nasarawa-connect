import { MapPin, Phone, Mail, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-napps-blue text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">NAPPS Nasarawa State</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              National Association of Proprietors of Private Schools (NAPPS) Nasarawa State is committed to 
              the comprehensive education and nurturing of the Nigerian Child for functional, quality living 
              and nation building.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-napps-yellow hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-napps-yellow hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-napps-yellow hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-napps-yellow transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-napps-yellow transition-colors">About</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-napps-yellow transition-colors">Contact</a>
              </li>
              <li>
                <a 
                  href="https://portal.nappsnasarawa.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-napps-yellow transition-colors"
                >
                  Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://register.nappsnasarawa.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-napps-yellow transition-colors"
                >
                  Registration
                </a>
              </li>
              <li>
                <a 
                  href="https://portal.nappsnasarawa.com/student/result" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-napps-yellow transition-colors"
                >
                  Results
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-napps-yellow transition-colors">Membership</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-napps-yellow transition-colors">Training</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-napps-yellow flex-shrink-0" />
              <span className="text-gray-300 text-sm">
                Nasarawa State, Nigeria
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-napps-yellow flex-shrink-0" />
              <span className="text-gray-300 text-sm">
                +234 XXX XXX XXXX
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-napps-yellow flex-shrink-0" />
              <span className="text-gray-300 text-sm">
                info@nappsnasarawa.com
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} NAPPS Nasarawa State. All rights reserved. 
            <span className="mx-2">|</span>
            In collaboration with Nasarawa State Ministry of Education
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;