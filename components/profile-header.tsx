"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, ChevronDown, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { ProfileType } from "@/lib/types"
import { useLanguage } from "@/lib/i18n/language-context"

interface ProfileHeaderProps {
  profile: ProfileType
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const [showBio, setShowBio] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const { t, language } = useLanguage()

  const email = "alex.chen@example.com" // Replace with actual email or get from profile data

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Get the appropriate bio based on language
  const shortBio = language === "zh" ? profile.shortBio_zh || profile.shortBio : profile.shortBio
  const longBio = language === "zh" ? profile.longBio_zh || profile.longBio : profile.longBio

  // Get the appropriate skills tree based on language
  const skillsTree = language === "zh" && profile.skillsTree_zh ? profile.skillsTree_zh : profile.skillsTree

  // Get primary skills (level 1 nodes)
  const primarySkills = Object.keys(skillsTree)

  const bioText = showBio ? longBio : `${shortBio.substring(0, 150)}...`

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div
        className="absolute top-0 left-0 right-0 h-48 rounded-xl -z-10 overflow-hidden"
        style={{
          backgroundImage: "url('/placeholder.svg?height=400&width=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 warm-gradient opacity-80"></div>
      </div>

      <div className="relative w-32 h-32 overflow-hidden border-4 rounded-full border-primary">
        <Image
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80"
          alt="Profile Avatar"
          fill
          className="object-cover"
          priority
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-center"
      >
        <h1 className="text-4xl font-bold">@bayuncao</h1>
        <p className="mt-2 text-xl text-muted-foreground">{profile.title}</p>

        <div className="flex flex-col items-center mt-4">
          <div className="flex flex-wrap justify-center gap-2">
            {primarySkills.slice(0, 5).map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-3 py-1 text-xs border-primary/30 hover:border-primary/60 transition-colors"
                relatedTags={skillsTree[skill]}
              >
                {skill}
              </Badge>
            ))}
            {primarySkills.length > 5 && (
              <Badge
                variant="outline"
                className="px-3 py-1 text-xs border-primary/30 hover:border-primary/60 transition-colors"
              >
                +{primarySkills.length - 5} {t.profile.more}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <Button size="icon" variant="ghost" className="hover:bg-transparent group">
            <Github className="w-5 h-5 text-foreground group-hover:text-purple-600 group-hover:scale-125 transition-all duration-300" />
          </Button>
          <Button size="icon" variant="ghost" className="hover:bg-transparent group">
            <Twitter className="w-5 h-5 text-foreground group-hover:text-blue-500 group-hover:scale-125 transition-all duration-300" />
          </Button>
          <Button size="icon" variant="ghost" className="hover:bg-transparent group">
            <Linkedin className="w-5 h-5 text-foreground group-hover:text-blue-700 group-hover:scale-125 transition-all duration-300" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:bg-transparent group"
            onClick={() => setShowEmailModal(true)}
          >
            <Mail className="w-5 h-5 text-foreground group-hover:text-amber-500 group-hover:scale-125 transition-all duration-300" />
          </Button>
        </div>

        <div className="max-w-2xl mx-auto mt-8">
          <p className="text-muted-foreground">{bioText}</p>
          <Button variant="link" onClick={() => setShowBio(!showBio)} className="flex items-center mt-2">
            {showBio ? t.profile.showLess : t.profile.readMore}
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showBio ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </motion.div>
      {/* Email Modal */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Email</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <div className="grid flex-1 gap-2">
              <Input readOnly value={email} className="font-mono" />
            </div>
            <Button
              size="icon"
              onClick={copyToClipboard}
              className={`transition-all duration-300 ${copied ? "bg-green-500 hover:bg-green-600" : ""}`}
            >
              {copied ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

