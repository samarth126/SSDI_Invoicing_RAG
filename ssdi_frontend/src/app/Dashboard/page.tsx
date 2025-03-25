"use client"
import React, { useEffect, useState } from 'react';
import Image from "next/image"
import { Calendar, ChevronLeft, Search, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState<{ username: string } | null>(null)
    const [error, setError] = useState<string>("")
    
    useEffect(() => {
        // Check for user data in storage
        const userData = localStorage.getItem('user') || sessionStorage.getItem('user')
        if (!userData) {
            router.push('/login')
        } else {
            setUser(JSON.parse(userData))
        }
    }, [router])

    const handleLogout = async () => {
      try {
          const response = await fetch('http://localhost:3000/api/auth/logout', {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
          });

          // Even if we get an error response, we should still clean up the client-side
          localStorage.removeItem('user')
          sessionStorage.removeItem('user')

          if (response.ok) {
              router.push('/login')
          } else {
              const data = await response.json()
              setError(data.message || 'Logout failed')
              // Still redirect to login after a brief delay
              setTimeout(() => router.push('/login'), 1000)
          }
      } catch (error) {
          console.error('Logout failed:', error)
          // Clean up and redirect even if the request fails
          localStorage.removeItem('user')
          sessionStorage.removeItem('user')
          router.push('/login')
      }
  }
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="flex items-center justify-between border-b bg-white px-4 py-2 shadow-sm">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-16 overflow-hidden">
                            <Image src="/sap-logo.png" alt="SAP Logo" width={64} height={32} className="object-contain" />
                        </div>
                        <div className="flex items-center gap-1 text-lg font-medium text-gray-700">
                            Invoice Dashboard
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">
                            Welcome, {user?.username || 'User'}
                        </span>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleLogout}
                            className="text-gray-600 hover:text-red-600"
                        >
                            <LogOut className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Rest of your existing dashboard code */}
            {/* ...existing code... */}
        </div>
    )
}