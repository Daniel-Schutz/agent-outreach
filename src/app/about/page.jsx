'use client';

import { motion } from 'framer-motion';
import { 
  BarChart, 
  Users, 
  Globe, 
  Heart, 
  Coffee, 
  MapPin,
  Mail,
  Linkedin,
  Twitter,
  ChevronRight,
  Award,
  Check
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  // Company statistics
  const stats = [
    { label: "Founded", value: "2019" },
    { label: "Employees", value: "85+" },
    { label: "Countries", value: "12" },
    { label: "Customers", value: "2,500+" },
    { label: "Email Sequences", value: "1.2M+" },
    { label: "Success Rate", value: "93%" }
  ];

  // Team members
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Co-Founder & CEO",
      bio: "Former sales leader at Salesforce with 12+ years of experience in scaling SaaS businesses.",
      image: "/api/placeholder/400/400"
    },
    {
      name: "Sarah Chen",
      role: "Co-Founder & CTO",
      bio: "AI researcher with a Ph.D. from MIT. Previously led engineering teams at Google and Dropbox.",
      image: "/api/placeholder/400/400"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Revenue Officer",
      bio: "15+ years of experience building high-performing sales teams at HubSpot and ZoomInfo.",
      image: "/api/placeholder/400/400"
    },
    {
      name: "Emily Thompson",
      role: "VP of Product",
      bio: "Product leader with experience at Asana and Slack. Passionate about building intuitive user experiences.",
      image: "/api/placeholder/400/400"
    },
    {
      name: "David Kim",
      role: "VP of Marketing",
      bio: "Marketing executive with a track record of building brands at Mailchimp and Intercom.",
      image: "/api/placeholder/400/400"
    },
    {
      name: "Olivia Martinez",
      role: "VP of Customer Success",
      bio: "Customer success leader focused on creating exceptional experiences for every customer.",
      image: "/api/placeholder/400/400"
    }
  ];

  // Company values
  const values = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Customer First",
      description: "We put our customers at the center of everything we do. Their success is our success."
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Authenticity",
      description: "We believe meaningful connections come from authentic communication, not spam or tricks."
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our product and service."
    },
    {
      icon: <Coffee className="h-6 w-6 text-primary" />,
      title: "Work-Life Balance",
      description: "We value our team members' wellbeing and encourage a healthy balance between work and life."
    }
  ];

  // Office locations
  const locations = [
    {
      city: "San Francisco",
      country: "United States",
      address: "123 Market Street, San Francisco, CA 94103",
      flagship: true
    },
    {
      city: "New York",
      country: "United States",
      address: "456 Madison Avenue, New York, NY 10022",
      flagship: false
    },
    {
      city: "London",
      country: "United Kingdom",
      address: "789 Oxford Street, London, W1D 1BS",
      flagship: false
    },
    {
      city: "Singapore",
      country: "Singapore",
      address: "101 Marina Bay Drive, Singapore 018956",
      flagship: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-900/50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  We're on a mission to make outreach <span className="text-primary">human again</span>
                </h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8">
                  At Outreach Agent, we believe in the power of meaningful connections. We're building tools that help businesses connect with their prospects in a way that feels personal and authentic.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/careers"
                    className="btn-primary py-3 px-6"
                  >
                    Join Our Team
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-outline py-3 px-6"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative h-80 lg:h-96 bg-zinc-200 dark:bg-zinc-700 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">Team Photo Placeholder</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Our Impact by the Numbers
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                Since our founding, we've been privileged to help thousands of businesses improve their outreach and build better relationships.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white dark:bg-zinc-800 rounded-xl p-6 text-center shadow-sm border border-zinc-200 dark:border-zinc-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="relative aspect-square bg-zinc-200 dark:bg-zinc-700 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">Founders Photo Placeholder</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-zinc-600 dark:text-zinc-300">
                  <p>
                    Outreach Agent was founded in 2019 by Alex Johnson and Sarah Chen, who met while working at a SaaS company where they experienced firsthand the challenges of scaling outreach efforts without sacrificing quality.
                  </p>
                  <p>
                    Tired of seeing businesses rely on impersonal mass emails that felt spammy and rarely got results, they set out to build a solution that would help businesses connect with their prospects in a more meaningful way.
                  </p>
                  <p>
                    What started as a small team of 5 has now grown to over 85 employees across 4 offices worldwide. Throughout our growth, we've remained committed to our core mission: making outreach human again.
                  </p>
                  <p>
                    Today, we're proud to serve over 2,500 customers ranging from small startups to Fortune 500 companies, helping them build authentic relationships with their prospects and customers.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Our Values
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                These core principles guide everything we do, from product development to customer support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-white dark:bg-zinc-800 rounded-xl p-8 shadow-sm border border-zinc-200 dark:border-zinc-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Meet Our Leadership Team
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                We're a diverse group of passionate individuals committed to transforming how businesses connect with their customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(0.5, index * 0.1) }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="h-64 bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">Profile Photo</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-zinc-600 dark:text-zinc-300">{member.bio}</p>
                    
                    <div className="mt-4 flex space-x-3">
                      <a href="#" className="text-zinc-500 hover:text-primary transition-colors">
                        <Linkedin size={20} />
                      </a>
                      <a href="#" className="text-zinc-500 hover:text-primary transition-colors">
                        <Twitter size={20} />
                      </a>
                      <a href="#" className="text-zinc-500 hover:text-primary transition-colors">
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/team" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                Meet the rest of the team
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Office Locations Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Our Global Presence
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                With offices around the world, we're able to serve customers across different time zones and markets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {locations.map((location, index) => (
                <motion.div
                  key={location.city}
                  className={`bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm ${
                    location.flagship 
                      ? 'border-2 border-primary' 
                      : 'border border-zinc-200 dark:border-zinc-700'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-primary mt-1 mr-2" />
                    <div>
                      <h3 className="text-lg font-bold">{location.city}</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">{location.country}</p>
                    </div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-4">{location.address}</p>
                  
                  {location.flagship && (
                    <div className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded">
                      Headquarters
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Careers Section */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  Join Our Team
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8">
                  We're always looking for talented individuals to join our mission of making outreach human again. Check out our open positions and see if there's a fit for you.
                </p>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Flexible work environment</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">Remote-first culture with flexible hours</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Competitive compensation</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">Salary, equity, and comprehensive benefits</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Growth opportunities</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">Professional development and career advancement</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link
                    href="/careers"
                    className="btn-primary py-3 px-6"
                  >
                    View Open Positions
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="relative aspect-square bg-zinc-200 dark:bg-zinc-700 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">Office Culture Photo Placeholder</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-12 text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Let's Connect
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Have questions about Outreach Agent? Want to learn more about our product or company? We'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/contact" 
                  className="bg-white text-primary hover:bg-zinc-100 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Contact Us
                </Link>
                <Link 
                  href="/demo" 
                  className="bg-primary/20 hover:bg-primary/30 text-white py-3 px-6 rounded-lg font-medium transition-colors border border-white/20"
                >
                  Request a Demo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}