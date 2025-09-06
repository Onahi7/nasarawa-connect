import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Our Location",
      details: [
        "NAPPS Secretariat",
        "Nasarawa State, Nigeria",
        "Federal Capital Territory Region"
      ]
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Numbers",
      details: [
        "+234 XXX XXX XXXX",
        "+234 XXX XXX XXXX",
        "Office Hours: 8AM - 5PM"
      ]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Addresses",
      details: [
        "info@nappsnasarawa.com",
        "admin@nappsnasarawa.com",
        "support@nappsnasarawa.com"
      ]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Office Hours",
      details: [
        "Monday - Friday: 8:00 AM - 5:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-napps-green/90 via-napps-blue/80 to-purple-900/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Get in touch with NAPPS Nasarawa State. We're here to help and answer your questions.
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-napps-blue to-napps-green text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <MessageSquare className="w-6 h-6" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-gray-700 font-medium">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-gray-700 font-medium">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-gray-700 font-medium">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What is this about?"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700 font-medium">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        className="mt-2 resize-none"
                        required
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-napps-green to-green-600 hover:from-napps-green/90 hover:to-green-600/90 text-white font-medium py-3 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-napps-blue to-napps-green rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                        <div className="space-y-1">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gradient-to-r from-napps-blue to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Quick Access</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">School Portal</h3>
                <p className="text-gray-200 mb-4">Access your school dashboard and manage your account</p>
                <Button 
                  className="bg-napps-yellow hover:bg-yellow-500 text-napps-blue font-medium"
                  onClick={() => window.open('https://portal.nappsnasarawa.com', '_blank')}
                >
                  Visit Portal
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">Registration</h3>
                <p className="text-gray-200 mb-4">Register your school as a NAPPS member</p>
                <Button 
                  className="bg-napps-green hover:bg-green-600 text-white font-medium"
                  onClick={() => window.open('https://register.nappsnasarawa.com', '_blank')}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">Results</h3>
                <p className="text-gray-200 mb-4">Check student results and academic records</p>
                <Button 
                  className="bg-napps-red hover:bg-red-600 text-white font-medium"
                  onClick={() => window.open('https://portal.nappsnasarawa.com/student/result', '_blank')}
                >
                  View Results
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Find Us</h2>
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-napps-blue/20 to-napps-green/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-napps-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">NAPPS Nasarawa Secretariat</h3>
                <p className="text-gray-600">Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;