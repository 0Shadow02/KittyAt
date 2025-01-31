"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FiSmartphone, 
  FiMail, 
  FiShield, 
  FiCheckCircle, 
  FiArrowRight,
  FiClock,
  FiKey,
  FiXCircle,
  FiCopy
} from 'react-icons/fi'
import QRCode from 'react-qr-code'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

const TwoFactorAuth = () => {
  const [activeMethod, setActiveMethod] = useState<'app' | 'sms' | 'email' | null>('app')
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const methods = [
    {
      id: 'app',
      title: 'Authenticator App',
      icon: <FiSmartphone className="w-5 h-5" />,
      description: 'Use an authenticator app like Google Authenticator or Authy',
      status: 'active'
    },
    {
      id: 'sms',
      title: 'SMS Verification',
      icon: <FiSmartphone className="w-5 h-5" />,
      description: 'Receive verification codes via text message',
      status: 'inactive'
    },
    {
      id: 'email',
      title: 'Email Verification',
      icon: <FiMail className="w-5 h-5" />,
      description: 'Receive verification codes via email',
      status: 'inactive'
    }
  ]

  const tempSecret = 'JBSWY3DPEHPK3PXP'

  const handleVerifyCode = async () => {
    setIsLoading(true)
    setError('')
    setTimeout(() => {
      setIsLoading(false)
      if (verificationCode === '123456') {
        setIsVerified(true)
        setError('')
      } else {
        setError('Invalid verification code. Please try again.')
      }
    }, 1000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tempSecret)
    toast.success('Secret key copied to clipboard')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-4 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 rounded-full border border-blue-200 shadow-sm">
            <FiShield className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Account Protection</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Two-Factor Authentication</h1>
          <p className="text-gray-600 max-w-prose mx-auto">
            Secure your account with an additional layer of verification
          </p>
        </motion.div>

        {/* Methods Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {methods.map((method) => (
            <motion.div
              key={method.id}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="min-h-[200px]"
            >
              <button
                onClick={() => setActiveMethod(method.id as any)}
                className={`w-full h-full text-left p-6 rounded-xl border transition-all duration-200 ${
                  activeMethod === method.id 
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20'
                    : 'border-gray-200 hover:border-blue-200 hover:bg-white'
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${activeMethod === method.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      {React.cloneElement(method.icon, {
                        className: `w-5 h-5 ${activeMethod === method.id ? 'text-blue-600' : 'text-gray-600'}`
                      })}
                    </div>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-gray-900">{method.title}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                  {method.status === 'active' && (
                    <div className="mt-auto pt-4">
                      <Badge 
                        variant={activeMethod === method.id ? 'default' : 'secondary'} 
                        className="gap-1.5 w-fit"
                      >
                        <FiCheckCircle className="w-4 h-4" />
                        Active
                      </Badge>
                    </div>
                  )}
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Setup Guide */}
        <AnimatePresence mode='wait'>
          {activeMethod === 'app' && (
            <motion.div
              key="app-setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* QR Code Section */}
              <Card className="rounded-xl border border-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <QRCode
                        value={`otpauth://totp/YourApp?secret=${tempSecret}&issuer=YourApp`}
                        size={160}
                        className="w-40 h-40"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-6 w-full">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-base font-medium flex items-center gap-2 text-gray-900">
                            <FiKey className="w-5 h-5 text-blue-600" />
                            Setup Instructions
                          </Label>
                          <ol className="list-decimal list-outside space-y-2 text-gray-700 pl-4 marker:text-gray-400">
                            <li className="pl-2">Install an authenticator app on your device</li>
                            <li className="pl-2">Scan the QR code or enter the secret key below</li>
                            <li className="pl-2">Enter the 6-digit code generated by the app</li>
                          </ol>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">
                            Secret Key:
                          </Label>
                          <div className="flex items-center gap-2">
                            <code className="font-mono text-sm px-3 py-2 text-black bg-gray-100 rounded-md border border-gray-200">
                              {tempSecret}
                            </code>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={copyToClipboard}
                              className="gap-1.5 shadow-sm"
                            >
                              <FiCopy className="w-4 h-4" />
                              Copy
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Section */}
              <Card className="rounded-xl border border-gray-200 bg-white">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {isVerified ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-green-600"
                        >
                          <FiCheckCircle className="w-6 h-6" />
                        </motion.div>
                      ) : (
                        <FiClock className="w-6 h-6 text-blue-600" />
                      )}
                      <h3 className="text-lg text-black font-semibold">
                        {isVerified ? 'Verification Successful' : 'Enter Verification Code'}
                      </h3>
                    </div>

                    {!isVerified ? (
                      <motion.div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                          <div className="w-full max-w-xs space-y-1">
                            <Input
                              placeholder="••••••"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value)}
                              className="text-center text-black tracking-[0.5em] font-mono text-xl h-14"
                              maxLength={6}
                            />
                            <p className="text-sm text-gray-500">
                              Enter the code from your authenticator app
                            </p>
                          </div>
                          <Button
                            onClick={handleVerifyCode}
                            disabled={isLoading}
                            className="gap-2 w-full md:w-auto"
                            size="lg"
                          >
                            {isLoading ? (
                              <>
                                <FiClock className="w-4 h-4 animate-spin" />
                                Verifying...
                              </>
                            ) : (
                              <>
                                Verify Code
                                <FiArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </Button>
                        </div>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-md border border-red-100"
                          >
                            <FiXCircle className="w-5 h-5" />
                            <span className="text-sm">{error}</span>
                          </motion.div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3 bg-green-50 px-4 py-3 rounded-md border border-green-100"
                      >
                        <FiCheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-700">2FA Successfully Enabled</p>
                          <p className="text-sm text-green-600">
                            Your account is now protected with two-factor authentication
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default TwoFactorAuth

























