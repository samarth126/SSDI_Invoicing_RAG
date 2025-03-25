"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  })
  const [error, setError] = useState("")


  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        // credentials: 'include', // Important: to allow cookie storage
      })

      const data = await response.json()

      if (response.ok) {
        // Store user data in localStorage if remember me is checked
        if (formData.remember) {
          localStorage.setItem('user', JSON.stringify(data.user))
        } else {
          sessionStorage.setItem('user', JSON.stringify(data.user))
        }
        router.push('/Dashboard')
      } else {
        setError(data.error || "Login failed")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Image src="/sap-logo.png" alt="SAP Logo" width={100} height={50} className="object-contain" />
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Sign In</h1>
            <p className="mt-2 text-sm text-gray-600">Sign in to access the Invoice Dashboard</p>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email or Username
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember"
                checked={formData.remember}
                onCheckedChange={(checked) => 
                  setFormData({...formData, remember: checked as boolean})
                }
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don't have an account?</span>{" "}
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} SAP SE. All rights reserved.
        </div>
      </div>
    </div>
  )
}