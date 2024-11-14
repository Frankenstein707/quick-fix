'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Wrench, Users, Clock, Shield, ChevronRight, Github, Linkedin, Twitter } from 'lucide-react'

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-[#F3F3E0] text-[#133E87]">
      {/* Hero Section */}
      <section className="bg-[#133E87] text-white">
        <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
          <Wrench size={64} className="mb-6" />
          <h1 className="text-5xl font-bold mb-4">Welcome to QuickFix</h1>
          <p className="text-xl mb-8">Your One-Stop Solution for Mechanic Services</p>
          <Button asChild size="lg" className="bg-[#608BC1] hover:bg-[#CBDCEB] hover:text-[#133E87]">
            <Link href="/">Get Started <ChevronRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg border-[#608BC1] border-t-4">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Users className="mr-2 text-[#608BC1]" />
                  Easy Booking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Book a skilled mechanic with just a few clicks, anytime, anywhere.</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border-[#608BC1] border-t-4">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Clock className="mr-2 text-[#608BC1]" />
                  Quick Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Get your vehicle back on the road quickly with our efficient service.</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border-[#608BC1] border-t-4">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Shield className="mr-2 text-[#608BC1]" />
                  Trusted Mechanics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>All our mechanics are vetted and approved for your peace of mind.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#CBDCEB] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">About QuickFix</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            QuickFix is a revolutionary platform connecting vehicle owners with skilled mechanics. 
            Our mission is to simplify the process of finding and booking reliable mechanical services, 
            ensuring that your vehicle receives the best care possible. With our user-friendly interface 
            and network of trusted professionals, we're transforming the automotive service industry.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Parikshit Patil", role: "21BIT0208" },
              { name: "Aditya Apte", role: "21BIT0171" },
              { name: "Suprit Ratnakar", role: "21BIT0205" },
              { name: "Garvesh Patidar", role: "21BIT0653" },
              { name: "Vedant Passi", role: "21BIT169 " }
            ].map((member, index) => (
              <Card key={index} className="bg-white shadow-lg border-[#608BC1] border-t-4">
                <CardHeader>
                  <CardTitle className="text-xl text-center">{member.name}</CardTitle>
                  <CardDescription className="text-center">{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#133E87] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold flex items-center">
                <Wrench className="mr-2" />
                QuickFix
              </h3>
              <p className="mt-2">Your trusted mechanic service platform</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 QuickFix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}