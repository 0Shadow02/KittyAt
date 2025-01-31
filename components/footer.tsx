"use client"
import { FaGithub, FaDiscord, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";

export const Footer=({id}:{id:string | ""})=> {
    const Navigation = useRouter()
  return (
    <footer id={id} className="relative w-full border-t border-slate-800/50 mt-24 overflow-hidden group">
      {/* Animated Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 -z-10 opacity-15"
        style={{
          background: `linear-gradient(
            45deg,
            rgba(56, 189, 248, 0.1) 0%,
            rgba(79, 70, 229, 0.15) 30%,
            rgba(236, 72, 153, 0.1) 70%,
            rgba(56, 189, 248, 0.1) 100%
          )`,
        }}
      />

      {/* Subtle Moving Beam Effect */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute -top-1/2 left-0 w-full h-[200%] opacity-20">
          <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#fff_50%,#000_100%)] opacity-5 animate-beam" />
        </div>
      </div>

      {/* Sparkles Overlay */}
      <div className="absolute inset-0 -z-10">
        <SparklesCore
          background="transparent"
          minSize={0.2}
          maxSize={1}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#4F46E5"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
          {/* Brand Section */}
          <div className="space-y-6 col-span-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                KittyAt
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Transforming cloud monitoring with real-time insights
              <br />
              and detailed analytics.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: FaGithub, color: "hover:text-purple-400",link:"https://github.com/0Shadow02/KittyAt" },
                { icon: FaDiscord, color: "hover:text-indigo-400",link:"https://discord.com" },
                { icon: FaXTwitter, color: "hover:text-blue-400", link:"https://twitter.com/Shadow992791168" },
              ].map((SocialIcon, index) => (
                <motion.button 
                  key={index}
                  onClick={()=> Navigation.push(SocialIcon.link)}
                  whileHover={{ scale: 1.1 }}
                  className="p-2.5 rounded-lg bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-blue-400/30 transition-all"
                >
                  <SocialIcon.icon className={`h-5 w-5 text-gray-400 ${SocialIcon.color} transition-colors`} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {['Product', 'Company', 'Resources', 'Legal'].map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {[
                  ...(section === 'Product' 
                    ? ['Features', 'Pricing', 'Docs', 'Status'] 
                    : section === 'Company' 
                    ? ['About', 'Blog', 'Careers', 'Contact'] 
                    : section === 'Resources' 
                    ? ['API', 'Help Center', 'Guides', 'Insights'] 
                    : ['Privacy', 'Terms', 'Security', 'GDPR'])
                ].map((item) => (
                  <li key={item}>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-blue-400 text-sm flex items-center gap-1.5 transition-colors"
                      >
                        <span className="text-blue-400/50 text-xs">↳</span>
                        {item}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-slate-800/50 pt-12 mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-white/90 mb-4">
              Join Our Developer Community
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-96 px-5 py-3 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 placeholder-gray-600 text-gray-300 transition-all"
              />
              <Button
                variant="link"
                className="group relative overflow-hidden px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <span className="relative z-10">Get Updates</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} KittyAt. Crafted with ❤️ for developers
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-blue-400 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-blue-400 hover:after:w-full after:transition-all"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-blue-400 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-blue-400 hover:after:w-full after:transition-all"
              >
                Terms of Service
              </Link>
            </div>
            
            {/* Back to Top Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2.5 rounded-lg bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-blue-400/30 transition-all"
            >
              <ArrowUp className="h-4 w-4 text-gray-400" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}