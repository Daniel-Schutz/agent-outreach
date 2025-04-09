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
    { label: "Founded", value: "2022" },
    { label: "Team", value: "10+" },
    { label: "Focus", value: "AI Solutions" },
    { label: "Approach", value: "Client-Centric" }
  ];

  // Leadership team
  const teamMembers = [
    {
      name: "Issac Hicks",
      role: "CEO",
      bio: "Former Big 4 tech and AI consultant.",
      image: "/api/placeholder/400/400"
    },
    {
      name: "Austin Ambrozi",
      role: "Managing Partner",
      bio: "Expert in process innovation.",
      image: "/api/placeholder/400/400"
    },
    {
      name: "Aaron Chavez",
      role: "Managing Partner",
      bio: "Expert in tech startups and strategy.",
      image: "/api/placeholder/400/400"
    }
  ];

  // Company values and approach
  const values = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Client-Centric Agile",
      description: "We follow a highly collaborative Agile process, ensuring that you are always in the loop and can see the progress as it happens."
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Custom-Built Solutions",
      description: "Our bespoke solutions are tailored to meet your exact needs, whether it's a no-code solution or an advanced AI-driven service."
    },
    {
      icon: <Check className="h-6 w-6 text-primary" />,
      title: "Results-Driven Milestones",
      description: "We focus on delivering quick wins for you through tight, focused milestones, and we can adapt to changing priorities as needed."
    },
    {
      icon: <Coffee className="h-6 w-6 text-primary" />,
      title: "Human-Centered Approach",
      description: "We believe technology should enhance human capabilities, not replace them. We want to help you give your people back their autonomy."
    }
  ];

  // Office locations
  const locations = [
    {
      city: "Washington",
      country: "United States",
      address: "1220 3rd St NE, Suite 1213, Washington, DC 20002",
      flagship: true
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
                  Simplify your <span className="text-primary">day-to-day operations</span>
                </h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8">
                  We believe technology should enhance human capabilities, not replace them. We want to help you give your people back their autonomy.
                </p>
                <div className="flex flex-wrap gap-4">
 
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

        {/* About Section */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-80 lg:h-96 bg-zinc-200 dark:bg-zinc-700 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">Vision Image Placeholder</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-4">
                  We're a diverse team of AI experts and developers, dedicated to creating solutions that improve efficiency and amplify productivity. Autonomi was founded on the desire to make work more meaningful.
                </p>
                <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-4">
                  We believe businesses are about freedom and prosperity, and we strive to ensure technology solutions serve those goals. Let's eliminate repetitive tasks and enable your people to focus on high-value work.
                </p>
                <p className="text-lg text-zinc-600 dark:text-zinc-300">
                  Our mission is to transform businesses by automating the mundane tasks and empowering you to focus on what truly matters.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Our Approach
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                We know the human part of business is relationship building and exchanging value in a mutually beneficial way. Everything that gets in the way of that – that's what we're here for.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-white dark:bg-zinc-800 rounded-xl p-8 shadow-sm border border-zinc-200 dark:border-zinc-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex-center mr-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Meet the Leadership Behind the Mission
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                We know the human part of business is relationship building and exchanging value in a mutually beneficial way. Everything that gets in the way of that – that's what we're here for.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="h-64 bg-zinc-200 dark:bg-zinc-700 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">An image of {member.name}, {member.role} of Autonomi</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-zinc-600 dark:text-zinc-300">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
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
                  href="/contact" 
                  className="btn-outline py-3 px-6 text-white hover:bg-white/10 hover:text-white"
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