"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiBell, FiChevronRight, FiMenu } from "react-icons/fi";
import { FaPallet } from "react-icons/fa";
import Profile from "./_components/profile";
import { ShieldEllipsisIcon } from "lucide-react";
import TwoFactorAuth from "./_components/2FAuthentication";
import { Notifications } from "./_components/notifications";
import { Appearance } from "./_components/appearance";

const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sections = [
    { id: "profile", icon: FiUser, title: "Profile" },
    { id: "2FAuthentication", icon: ShieldEllipsisIcon, title: "2FAuthentication" },
    { id: "appearance", icon: FaPallet, title: "Appearance" },
    { id: "notifications", icon: FiBell, title: "Notifications" },
  ];

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col md:flex-row">
     
      <div className="md:hidden p-4 bg-white shadow-md flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <FiMenu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-64 bg-white shadow-lg p-6 space-y-4 fixed md:relative h-screen z-50 md:z-0"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8 hidden md:block">
              Settings
            </h2>
            {sections.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ x: 5 }}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                  activeSection === section.id
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600"
                }`}
                onClick={() => {
                  setActiveSection(section.id);
                  setIsSidebarOpen(false);
                }}
              >
                <section.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{section.title}</span>
                <FiChevronRight className="w-4 h-4 ml-auto" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 h-screen w-full overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {activeSection === "profile" && <Profile />}
          {activeSection === "2FAuthentication" && <TwoFactorAuth />}
          {activeSection === "appearance" && <Appearance />}
          {activeSection === "notifications" && <Notifications />}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, value, onChange }: InputFieldProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-2"
  >
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      value={value}
      onChange={onChange}
    />
  </motion.div>
);

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const ToggleSwitch = ({ label, checked, onChange }: ToggleSwitchProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200"
  >
    <span className="text-gray-700">{label}</span>
    <button
      className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
        checked ? "bg-blue-600" : "bg-gray-300"
      }`}
      onClick={onChange}
    >
      <motion.span
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
        animate={{ left: checked ? "1.5rem" : "0.25rem" }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    </button>
  </motion.div>
);

interface CheckboxProps {
  label: string;
}

const Checkbox = ({ label }: CheckboxProps) => (
  <motion.label className="flex items-center space-x-3" whileHover={{ x: 5 }}>
    <input
      type="checkbox"
      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
    />
    <span className="text-gray-700">{label}</span>
  </motion.label>
);

export default AccountSettings;
