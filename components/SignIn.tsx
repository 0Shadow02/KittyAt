
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"

export default function Component() {
  return (
    <div className="mx-auto max-w-[350px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">Step 1: Create Account</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
        <Button variant="outline" className="w-full">
          Sign up with Google
        </Button>
        <Button variant="outline" className="w-full">
          Sign up with Microsoft
        </Button>
      </div>
      <Separator className="my-8" />
      <div className="space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Verify Email</h1>
          <p className="text-gray-500 dark:text-gray-400">Step 2: Please verify your email address</p>
        </div>
        <Button type="submit" className="w-full">
          Send Verification Email
        </Button>
      </div>
      <Separator className="my-8" />
      <div className="space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Account Details</h1>
          <p className="text-gray-500 dark:text-gray-400">Step 3: Enter your name and account type</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" required />
        </div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Account Type</SelectLabel>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="business">Business</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button type="submit" className="w-full">
          Finish Sign Up
        </Button>
      </div>
    </div>
  )
}