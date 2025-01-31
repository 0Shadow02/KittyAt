import React from 'react'
import { Codeblock } from './Code-Block'

const CodeCard = () => {
  return (
    
    <div className="w-full relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-xl">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-8 lg:pr-20">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-5xl font-bold font-sans bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Easy Integration
            </h1>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
          </div>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-mono">
            Seamlessly connect KittyAI with your existing workflows in minutes. 
            Our intuitive logging API works effortlessly with any programming language 
            or framework, complete with automatic type definitions and smart completion.
          </p>
        </div>
  
        {/* Code Block */}
        <div className="relative group">
          <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl filter blur-xl group-hover:bg-cyan-500/20 transition-all duration-300"></div>
          <div className="relative border border-white/10 rounded-2xl bg-black/30 backdrop-blur-lg overflow-hidden transition-all duration-300 hover:border-cyan-400/50">
            <div className="p-4 bg-gradient-to-b from-gray-900/50 to-gray-900/20">
              <Codeblock />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  )
}

export default CodeCard

