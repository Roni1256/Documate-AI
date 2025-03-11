import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    const d=new Date
    const [date,setDate]=useState(d.getFullYear())
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <nav className="fixed w-full z-50 backdrop-blur-2xl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              DocuMate AI
            </Link>
            
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-6">
        <div className="min-h-screen flex flex-col justify-center items-center pt-20 pb-32">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 leading-tight animate-gradient">
              Transform Your Documents with AI Power
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-12 md:mb-16 text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Experience the future of document analysis with our advanced AI technology. Get instant insights, answers, and understanding from your documents.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link
                to="/app"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 md:py-5 md:px-12 rounded-full text-lg md:text-xl transition duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-1 relative overflow-hidden group"
              >
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
             
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-24 w-full">
            {[
              {
                icon: "🚀",
                title: "Lightning Fast",
                description: "Get instant analysis and responses within seconds"
              },
              {
                icon: "🎯",
                title: "High Accuracy",
                description: "Powered by state-of-the-art AI models for precise results"
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                description: "Your documents are encrypted and protected"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <footer className="py-10 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-gray-400">©{date} DocuMate AI. All rights reserved.</p>
          <p className="text-gray-500 mt-2">Transforming document analysis with artificial intelligence</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing