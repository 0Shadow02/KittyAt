"use client";
import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Useredetails } from "@/app/actions/server-actions/get-user";
import { FiUpload, FiUser, FiMail, FiKey, FiShield } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const Profile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["userDetails"],
    queryFn: Useredetails,
  });

  const profileItems = [
    { icon: <FiUser className="w-5 h-5" />, label: "Full Name", value: data?.name },
    { icon: <FiMail className="w-5 h-5" />, label: "Email Address", value: data?.email },
    { icon: <FiShield className="w-5 h-5" />, label: "Account Role", value: data?.role },
  ];

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8"
      >
         
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 p-4 sm:p-8"
    >
      <div className="max-w-4xl mx-auto space-y-8">
       
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-2 text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Account Profile
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Manage your organizational credentials and security settings
          </p>
        </motion.div>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Section */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full md:w-72 relative group"
          >
            <div className="relative aspect-square rounded-2xl bg-white overflow-hidden shadow-lg border border-gray-100">
              {data?.image && (
                <Image
                  width={100}
                  height={100}
                  alt="Profile Image"
                  src={data.image}
                  layout="responsive"
                  className="object-cover"
                />
              )}
              <label className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer pb-4">
                <div className="text-center space-y-2">
                  <FiUpload className="w-6 h-6 text-white mx-auto" />
                  <span className="text-xs text-white font-medium tracking-wide">
                    Update Profile Image
                  </span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </motion.div>

          {/* Professional Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <Card className="shadow-lg rounded-2xl border border-gray-100 bg-white">
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {profileItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="p-2 sm:p-3 bg-blue-100 rounded-lg text-blue-600">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-500">
                        {item.label}
                      </h3>
                      <p className="font-medium text-gray-900">
                        {item.value || "Not available"}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Security Status */}
                <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl bg-gray-50">
                  <div className="p-2 sm:p-3 bg-purple-100 rounded-lg text-purple-600">
                    <FiShield className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-500">
                      Authentication Status
                    </h3>
                    <Badge
                      variant={data?.isTwoFactorEnabled ? "default" : "destructive"}
                      className="mt-1 rounded-md px-3 py-1 text-sm"
                    >
                      {data?.isTwoFactorEnabled
                        ? "Two-Factor Authentication Enabled"
                        : "Two-Factor Authentication Required"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
