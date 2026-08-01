"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X } from "lucide-react"

const mockEmails = [
  { id: "1", email: "shadcn@example.com", verified: true },
  { id: "2", email: "alternate@example.com", verified: true },
]

const mockUrls = [
  { id: "1", url: "https://shadcn.com" },
  { id: "2", url: "http://twitter.com/shadcn" },
]

export function ProfileForm() {
  const [username, setUsername] = useState("shadcn")
  const [selectedEmail, setSelectedEmail] = useState("1")
  const [bio, setBio] = useState("I own a computer.")
  const [urls, setUrls] = useState(mockUrls)
  const [newUrl, setNewUrl] = useState("")

  const handleAddUrl = () => {
    if (newUrl.trim()) {
      setUrls([...urls, { id: Date.now().toString(), url: newUrl }])
      setNewUrl("")
    }
  }

  const handleRemoveUrl = (id: string) => {
    setUrls(urls.filter((u) => u.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-medium">Profile</h2>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>

      <Separator />

      <div className="space-y-6">
        {/* Username */}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="max-w-sm"
          />
          <p className="text-sm text-muted-foreground">
            This is your public display name. It can be your real name or a
            pseudonym. You can only change this once every 30 days.
          </p>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Select value={selectedEmail} onValueChange={setSelectedEmail}>
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
            <SelectContent>
              {mockEmails.map((email) => (
                <SelectItem key={email.id} value={email.id}>
                  {email.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            You can manage verified email addresses in your email settings.
          </p>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-2">
          <label htmlFor="bio" className="text-sm font-medium">
            Bio
          </label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
            className="max-w-sm"
          />
          <p className="text-sm text-muted-foreground">
            You can @mention other users and organizations to link to them.
          </p>
        </div>

        {/* URLs */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">URLs</label>
          <p className="text-sm text-muted-foreground">
            Add links to your website, blog, or social media profiles.
          </p>

          <div className="space-y-2">
            {urls.map((item) => (
              <div key={item.id} className="flex max-w-sm items-center gap-2">
                <Input value={item.url} readOnly className="flex-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveUrl(item.id)}
                  aria-label="Remove URL"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex max-w-sm items-center gap-2">
            <Input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Add URL"
              onKeyDown={(e) => e.key === "Enter" && handleAddUrl()}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddUrl}
              disabled={!newUrl.trim()}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
