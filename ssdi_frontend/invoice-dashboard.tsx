"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, Search } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define types for our invoice data
interface Coordinates {
  x: number
  y: number
  w: number
  h: number
}

interface HeaderField {
  name: string
  category: string
  value: string | number
  rawValue: string
  type: string
  page: number
  confidence: number
  coordinates: Coordinates
  model: string
  label: string
  group?: number
}

interface LineItemField {
  name: string
  category: string
  value: string | number
  rawValue: string
  type: string
  page: number
  confidence: number
  coordinates: Coordinates
  model: string
  label: string
}

interface InvoiceData {
  _id: {
    $oid: string
  }
  jobId: string
  status: string
  headerFields: HeaderField[]
  lineItems: LineItemField[][]
  createdAt: {
    $date: string
  }
  updatedAt: {
    $date: string
  }
  __v: number
}

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
        const response = await fetch(`http://localhost:3000/api/invoice/${invoiceId}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch invoice data: ${response.status}`)
        }

        const data = await response.json()
        setInvoiceData(data)
      } catch (err) {
        console.error("Error fetching invoice data:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch invoice data")
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
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-4">
                {invoiceData?.headerFields
                  .filter((field) => ["sender", "receiver", "details"].includes(field.category))
                  .slice(0, 6)
                  .map((field, index) => (
                    <div key={index} className="grid grid-cols-[150px_1fr] items-center gap-2">
                      <span className="text-gray-500">
                        {field.label.charAt(0).toUpperCase() + field.label.slice(1)}:
                      </span>
                      <span>{field.value.toString()}</span>
                    </div>
                  ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {invoiceData?.headerFields
                  .filter((field) => ["amounts", "details"].includes(field.category))
                  .slice(0, 6)
                  .map((field, index) => (
                    <div key={index} className="grid grid-cols-[150px_1fr] items-center gap-2">
                      <span className="text-gray-500">
                        {field.label.charAt(0).toUpperCase() + field.label.slice(1)}:
                      </span>
                      <span>{field.value.toString()}</span>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="line-items" className="w-full" onValueChange={setActiveTab}>
          <div className="border-b">
            <TabsList className="h-10 bg-transparent border-b-0">
              <TabsTrigger
                value="line-items"
                className={`h-10 px-4 rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none ${
                  activeTab === "line-items" ? "border-blue-600 text-blue-600" : "border-transparent"
                }`}
              >
                Line Items
              </TabsTrigger>
              <TabsTrigger
                value="raw-data"
                className={`h-10 px-4 rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none ${
                  activeTab === "raw-data" ? "border-blue-600 text-blue-600" : "border-transparent"
                }`}
              >
                Raw Data
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="line-items" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-medium">Material Number</TableHead>
                      <TableHead className="font-medium">Description</TableHead>
                      <TableHead className="font-medium text-right">Quantity</TableHead>
                      <TableHead className="font-medium text-right">Unit Price</TableHead>
                      <TableHead className="font-medium text-right">Net Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoiceData?.lineItems.map((lineItem, lineIndex) => {
                      // Find fields by their name property
                      const materialNumber = lineItem.find((field) => field.name === "materialNumber")
                      const description = lineItem.find((field) => field.name === "description")
                      const quantity = lineItem.find((field) => field.name === "quantity")
                      const unitPrice = lineItem.find((field) => field.name === "unitPrice")
                      const netAmount = lineItem.find((field) => field.name === "netAmount")

                      return (
                        <TableRow key={lineIndex}>
                          <TableCell>{materialNumber?.value?.toString() || "-"}</TableCell>
                          <TableCell>{description?.value?.toString() || "-"}</TableCell>
                          <TableCell className="text-right">{quantity?.value?.toString() || "-"}</TableCell>
                          <TableCell className="text-right">{unitPrice?.value?.toString() || "-"}</TableCell>
                          <TableCell className="text-right">{netAmount?.value?.toString() || "-"}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="raw-data" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-medium">Raw JSON Data</h3>
                <pre className="p-4 bg-gray-100 rounded-md overflow-auto max-h-96 text-xs">
                  {invoiceData ? JSON.stringify(invoiceData, null, 2) : "No data available"}
                </pre>
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
