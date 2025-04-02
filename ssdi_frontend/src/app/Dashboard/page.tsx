"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Calendar, ChevronLeft, Download, Search, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    // Check for user data in storage
    const userData = localStorage.getItem("user") || sessionStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      // Even if we get an error response, we should still clean up the client-side
      localStorage.removeItem("user")
      sessionStorage.removeItem("user")

      if (response.ok) {
        router.push("/login")
      } else {
        const data = await response.json()
        setError(data.message || "Logout failed")
        // Still redirect to login after a brief delay
        setTimeout(() => router.push("/login"), 1000)
      }
    } catch (error) {
      console.error("Logout failed:", error)
      // Clean up and redirect even if the request fails
      localStorage.removeItem("user")
      sessionStorage.removeItem("user")
      router.push("/login")
    }
  }

  // Sample invoice data
  const invoices = [
    {
      invoiceNumber: "DMI/23-24/056",
      vendorNumber: "Digital Maven India",
      companyName: "Digital Maven India",
      date: "Sep 30, 2023, 8:00:00 PM",
      purchaseOrderNumber: "210000616",
      status: "Approved",
    },
    {
      invoiceNumber: "ACM/23-24/128",
      vendorNumber: "Acme Corp",
      companyName: "Acme Corporation",
      date: "Oct 15, 2023, 3:30:00 PM",
      purchaseOrderNumber: "210000723",
      status: "Pending",
    },
    {
      invoiceNumber: "GLB/23-24/394",
      vendorNumber: "Global Tech",
      companyName: "Global Technologies Ltd",
      date: "Nov 05, 2023, 11:45:00 AM",
      purchaseOrderNumber: "210000891",
      status: "Approved",
    },
    {
      invoiceNumber: "INF/23-24/217",
      vendorNumber: "Infinity Systems",
      companyName: "Infinity Systems Inc",
      date: "Nov 22, 2023, 2:15:00 PM",
      purchaseOrderNumber: "210000952",
      status: "Rejected",
    },
    {
      invoiceNumber: "NXT/24-25/012",
      vendorNumber: "NextGen Solutions",
      companyName: "NextGen Solutions",
      date: "Jan 10, 2024, 9:20:00 AM",
      purchaseOrderNumber: "210001103",
      status: "Approved",
    },
  ]

  const handleDownload = (invoiceNumber: string) => {
    console.log(`Downloading invoice ${invoiceNumber}`)
    // Implement actual download functionality here
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
            <div className="flex items-center gap-1 text-lg font-medium text-gray-700">Invoice Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Welcome, {user?.username || "User"}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-gray-600 hover:text-red-600">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content with Invoice Table */}
      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Invoices</h1>
          <p className="text-gray-600">Manage and track your invoice status</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input placeholder="Search invoices..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Filter by date
            </Button>
            <Button size="sm">Export</Button>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-medium">Invoice Number</th>
                <th className="px-4 py-3 font-medium">Vendor Number</th>
                <th className="px-4 py-3 font-medium">Company Name</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Purchase Order Number</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.invoiceNumber} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{invoice.invoiceNumber}</td>
                  <td className="px-4 py-3">{invoice.vendorNumber}</td>
                  <td className="px-4 py-3">{invoice.companyName}</td>
                  <td className="px-4 py-3">{invoice.date}</td>
                  <td className="px-4 py-3">{invoice.purchaseOrderNumber}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                                            ${
                                              invoice.status === "Approved"
                                                ? "bg-green-100 text-green-800"
                                                : invoice.status === "Pending"
                                                  ? "bg-yellow-100 text-yellow-800"
                                                  : "bg-red-100 text-red-800"
                                            }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-blue-600"
                      onClick={() => handleDownload(invoice.invoiceNumber)}
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing 1-5 of 5 invoices</p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

