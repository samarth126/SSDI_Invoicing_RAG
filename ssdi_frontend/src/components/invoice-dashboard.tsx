"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, Search } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { InvoiceData } from "@/lib/types"

interface InvoiceDashboardProps {
  invoiceId: string
}

export default function InvoiceDashboard({ invoiceId }: InvoiceDashboardProps) {
  const [activeTab, setActiveTab] = useState("product-details")
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchInvoiceData() {
      setIsLoading(true)
      setError(null)

      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/invoices/${invoiceId}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch invoice data: ${response.status}`)
        }

        const data = await response.json()
        setInvoiceData(data)
      } catch (err) {
        console.error("Error fetching invoice data:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch invoice data")

        // For demo purposes, set mock data when API fails
        // Remove this in production
        setInvoiceData({
          invoiceNumber: `DMI/23-24/056 (ID: ${invoiceId})`,
          vendorNumber: "Digital Maven India",
          companyName: "Digital Maven India",
          date: "Sep 30, 2023, 08:00:00 PM",
          purchaseOrderNumber: "210000616",
          companyAddress: "Interface, Building 7, 4th Floor, Off Malad Link Road, Malad (West), Mumbai-400064",
          panNumber: "",
          gstNumber: "",
          customerName: "- Culver Max Entertainment Private Limited",
          customerAddress: "Interface, Building 7, 4th Floor, Off Malad Link Road, Malad (West), Mumbai-400064",
          gstin: "27AABCS1728D1ZO",
          grandTotal: "60652 INR",
          productDetails: [
            {
              productCode: "998387",
              productDescription: "Video Production Services",
              baseAmount: 51400,
              taxes: 9252,
              total: 60652,
            },
          ],
          bankDetails: [
            {
              accountNumber: "10071733214",
              bankName: "IDFC FIRST BANK LIMITED",
              accountHolderName: "Digital Maven India",
              ifscCode: "IDFB0040159",
            },
          ],
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (invoiceId) {
      fetchInvoiceData()
    }
  }, [invoiceId])

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <img src="/placeholder.svg?height=30&width=50" alt="SAP Logo" className="h-8" />
          <h1 className="text-lg font-medium">Invoice Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-blue-600">HP</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error} - Showing mock data for demonstration purposes.</AlertDescription>
          </Alert>
        )}

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                  <span className="text-gray-500">Invoice Number:</span>
                  <span>{invoiceData?.invoiceNumber}</span>
                </div>
                <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                  <span className="text-gray-500">Vendor Number:</span>
                  <span>{invoiceData?.vendorNumber}</span>
                </div>
                <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                  <span className="text-gray-500">Company Name:</span>
                  <span>{invoiceData?.companyName}</span>
                </div>
                <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                  <span className="text-gray-500">Date:</span>
                  <span>{invoiceData?.date}</span>
                </div>
                <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                  <span className="text-gray-500">Purchase Order Number:</span>
                  <span>{invoiceData?.purchaseOrderNumber}</span>
                </div>
                <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                  <span className="text-gray-500">Company Address:</span>
                  <span>{invoiceData?.companyAddress}</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                  <span className="text-gray-500">PAN Number:</span>
                  <Input className="h-9" value={invoiceData?.panNumber || ""} readOnly />
                </div>
                <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                  <span className="text-gray-500">GST Number:</span>
                  <Input className="h-9" value={invoiceData?.gstNumber || ""} readOnly />
                </div>
                <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                  <span className="text-gray-500">Customer Name:</span>
                  <span>{invoiceData?.customerName}</span>
                </div>
                <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                  <span className="text-gray-500">Customer Address:</span>
                  <span>{invoiceData?.customerAddress}</span>
                </div>
                <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                  <span className="text-gray-500">GSTIN:</span>
                  <span>{invoiceData?.gstin}</span>
                </div>
                <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                  <span className="text-gray-500">Grand Total:</span>
                  <span>{invoiceData?.grandTotal}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="product-details" className="w-full" onValueChange={setActiveTab}>
          <div className="border-b">
            <TabsList className="h-10 bg-transparent border-b-0">
              <TabsTrigger
                value="product-details"
                className={`h-10 px-4 rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none ${
                  activeTab === "product-details" ? "border-blue-600 text-blue-600" : "border-transparent"
                }`}
              >
                Product Details
              </TabsTrigger>
              <TabsTrigger
                value="bank-details"
                className={`h-10 px-4 rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none ${
                  activeTab === "bank-details" ? "border-blue-600 text-blue-600" : "border-transparent"
                }`}
              >
                Bank Details
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="product-details" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-medium">Product Code</TableHead>
                      <TableHead className="font-medium">Product Description</TableHead>
                      <TableHead className="font-medium text-right">Base Amount</TableHead>
                      <TableHead className="font-medium text-right">Taxes</TableHead>
                      <TableHead className="font-medium text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoiceData?.productDetails.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>{product.productCode}</TableCell>
                        <TableCell>{product.productDescription}</TableCell>
                        <TableCell className="text-right">{product.baseAmount}</TableCell>
                        <TableCell className="text-right">{product.taxes}</TableCell>
                        <TableCell className="text-right">{product.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bank-details" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-medium">Bank Details</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-medium">Bank Account Number</TableHead>
                      <TableHead className="font-medium">Bank Name</TableHead>
                      <TableHead className="font-medium">Account Holder Name</TableHead>
                      <TableHead className="font-medium">IFSC Code</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoiceData?.bankDetails.map((bank, index) => (
                      <TableRow key={index}>
                        <TableCell>{bank.accountNumber}</TableCell>
                        <TableCell>{bank.bankName}</TableCell>
                        <TableCell>{bank.accountHolderName}</TableCell>
                        <TableCell>{bank.ifscCode}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="flex justify-end p-4 bg-white border-t">
        <button className="px-4 py-2 text-blue-600 hover:underline">Back</button>
      </footer>
    </div>
  )
}

// Loading state component
function LoadingState() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="grid grid-cols-[150px_1fr] items-center gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="grid grid-cols-[150px_1fr] items-center gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="border-b mb-6">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="flex justify-end p-4 bg-white border-t">
        <Skeleton className="h-8 w-16" />
      </footer>
    </div>
  )
}
