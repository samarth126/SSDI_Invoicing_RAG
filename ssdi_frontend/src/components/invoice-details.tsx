"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, CheckCircle, AlertCircle } from "lucide-react"

// Add a fallback alert component in case the shadcn/ui alert is not available
const FallbackAlert = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 border border-red-300 bg-red-50 text-red-800 rounded-md ${className}`}>{children}</div>
)

const FallbackAlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm">{children}</div>
)

// Try to import the Alert component, but use the fallback if it fails
let Alert: any
let AlertDescription: any
try {
  const alertModule = require("@/components/ui/alert")
  Alert = alertModule.Alert
  AlertDescription = alertModule.AlertDescription
} catch (e) {
  Alert = FallbackAlert
  AlertDescription = FallbackAlertDescription
}

interface Coordinates {
  x: number
  y: number
  w: number
  h: number
}

interface Field {
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

interface InvoiceData {
  _id: {
    $oid: string
  }
  jobId: string
  status: string
  headerFields: Field[]
  lineItems: Field[][]
  createdAt: {
    $date: string
  }
  updatedAt: {
    $date: string
  }
  __v: number
}

interface InvoiceDetailsProps {
  invoiceId: string
}

export default function InvoiceDetails({ invoiceId }: InvoiceDetailsProps) {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchInvoiceData() {
      setIsLoading(true)
      setError(null)

      try {
        // In a real app, this would fetch from your API
        // For demo purposes, we're using the static data
        const data: InvoiceData = {
          _id: {
            $oid: "67fdf81d1806f2701bde1365",
          },
          jobId: "97916e03-4169-486e-af85-4a914de31cb6",
          status: "DONE",
          headerFields: [
            {
              name: "currencyCode",
              category: "amounts",
              value: "INR",
              rawValue: "INR",
              type: "string",
              page: 2,
              confidence: 0.9361209869384766,
              coordinates: {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
              },
              model: "ai",
              label: "currencyCode",
            },
            {
              name: "senderName",
              category: "sender",
              value: "Karnavati Bikes Pvt Ltd-Service",
              rawValue: "Karnavati Bikes Pvt Ltd-Service",
              type: "string",
              page: 2,
              confidence: 0.8650981187820435,
              coordinates: {
                x: 0.057770961145194276,
                y: 0.8970064148253742,
                w: 0.19274028629856851,
                h: 0.008196721311475419,
              },
              model: "ai",
              label: "senderName",
            },
            {
              name: "receiverName",
              category: "receiver",
              value: "MAYUR JAGDISHBHAI PATEL",
              rawValue: "MAYUR JAGDISHBHAI PATEL",
              type: "string",
              page: 1,
              confidence: 0.8360890547434489,
              coordinates: {
                x: 0.23466257668711657,
                y: 0.12687099073414113,
                w: 0.1462167689161554,
                h: 0.007483962936564503,
              },
              model: "ai",
              label: "receiverName",
            },
            {
              name: "senderAddress",
              category: "sender",
              value:
                "ROYAL ENFIELD OPP KODIYAR TEMPLE NEXT TO TORRENT HOUSE, NR AEC CROSS ROAD NARANPURA, AHMEDABAD, , GUJARAT",
              rawValue:
                "ROYAL ENFIELD OPP KODIYAR TEMPLE NEXT TO TORRENT HOUSE, NR AEC CROSS ROAD NARANPURA, AHMEDABAD, , GUJARAT",
              type: "string",
              page: 2,
              confidence: 0.8510564495535458,
              coordinates: {
                x: 0.1083844580777096,
                y: 0.9262295081967213,
                w: 0.6625766871165645,
                h: 0.008553100498930877,
              },
              model: "ai",
              label: "senderAddress",
            },
            {
              name: "netAmount",
              category: "amounts",
              value: 1245.66,
              rawValue: "1245.66",
              type: "number",
              page: 1,
              confidence: 0.41922953724861145,
              coordinates: {
                x: 0.806237218813906,
                y: 0.5406272273699216,
                w: 0.042944785276073594,
                h: 0.0071275837491090455,
              },
              model: "ai",
              label: "netAmount",
            },
            {
              name: "taxId",
              category: "amounts",
              value: "24AAFCK5539E1ZN",
              rawValue: "24AAFCK5539E1ZN",
              type: "string",
              page: 1,
              confidence: 0.8792837858200073,
              coordinates: {
                x: 0.6748466257668712,
                y: 0.2466143977191732,
                w: 0.09815950920245398,
                h: 0.008196721311475419,
              },
              model: "ai",
              group: 1,
              label: "taxId",
            },
            {
              name: "receiverAddress",
              category: "receiver",
              value: "17/A SILVER FLAT NR SILVER MILL, RAJPUR GOMTIPUR ,AHMADABAD CITY",
              rawValue: "17/A SILVER FLAT NR SILVER MILL, RAJPUR GOMTIPUR ,AHMADABAD CITY",
              type: "string",
              page: 1,
              confidence: 0.887405888600783,
              coordinates: {
                x: 0.2361963190184049,
                y: 0.1443335709194583,
                w: 0.21830265848670757,
                h: 0.019600855310049875,
              },
              model: "ai",
              label: "receiverAddress",
            },
            {
              name: "grossAmount",
              category: "amounts",
              value: 1245.67,
              rawValue: "₹ 1245.67",
              type: "number",
              page: 1,
              confidence: 0.5860576629638672,
              coordinates: {
                x: 0.2955010224948875,
                y: 0.7027797576621525,
                w: 0.04805725971370145,
                h: 0.006058446186742672,
              },
              model: "ai",
              label: "grossAmount",
            },
          ],
          lineItems: [
            [
              {
                name: "description",
                category: "details",
                value: "CHAIN LUBE & CLEANER KIT- 150 ML",
                rawValue: "CHAIN LUBE & CLEANER KIT- 150 ML",
                type: "string",
                page: 1,
                confidence: 0.9031542198998588,
                coordinates: {
                  x: 0.12832310838445807,
                  y: 0.42658588738417674,
                  w: 0.1881390593047035,
                  h: 0.008196721311475419,
                },
                model: "ai",
                label: "description",
              },
              {
                name: "materialNumber",
                category: "details",
                value: "3600007/A",
                rawValue: "3600007/A",
                type: "string",
                page: 1,
                confidence: 0.8650103807449341,
                coordinates: {
                  x: 0.06032719836400818,
                  y: 0.42658588738417674,
                  w: 0.0541922290388548,
                  h: 0.008196721311475419,
                },
                model: "ai",
                label: "materialNumber",
              },
              {
                name: "netAmount",
                category: "amounts",
                value: 236.78,
                rawValue: "₹ 236.78",
                type: "number",
                page: 1,
                confidence: 0.8463829457759857,
                coordinates: {
                  x: 0.880879345603272,
                  y: 0.4269422665716322,
                  w: 0.04038854805725978,
                  h: 0.0071275837491090455,
                },
                model: "ai",
                label: "netAmount",
              },
              {
                name: "quantity",
                category: "details",
                value: 118,
                rawValue: "118.00",
                type: "number",
                page: 1,
                confidence: 0.8988197445869446,
                coordinates: {
                  x: 0.3430470347648262,
                  y: 0.4262295081967213,
                  w: 0.03323108384458079,
                  h: 0.008553100498930877,
                },
                model: "ai",
                label: "quantity",
              },
              {
                name: "unitPrice",
                category: "details",
                value: 1.79,
                rawValue: "1.79",
                type: "number",
                page: 1,
                confidence: 0.898292064666748,
                coordinates: {
                  x: 0.4120654396728016,
                  y: 0.4262295081967213,
                  w: 0.02044989775051126,
                  h: 0.008196721311475419,
                },
                model: "ai",
                label: "unitPrice",
              },
            ],
            [
              {
                name: "description",
                category: "details",
                value: "LIQUID GUN SEMI SYNTHETIC-15W50- 210 LTS",
                rawValue: "LIQUID GUN SEMI SYNTHETIC-15W50- 210 LTS",
                type: "string",
                page: 1,
                confidence: 0.9004684786001841,
                coordinates: {
                  x: 0.12883435582822086,
                  y: 0.44618674269422665,
                  w: 0.19683026584867078,
                  h: 0.016393442622950838,
                },
                model: "ai",
                label: "description",
              },
              {
                name: "materialNumber",
                category: "details",
                value: "3600027",
                rawValue: "3600027",
                type: "string",
                page: 1,
                confidence: 0.8993340134620667,
                coordinates: {
                  x: 0.06441717791411043,
                  y: 0.451176051318603,
                  w: 0.041922290388548056,
                  h: 0.006771204561653588,
                },
                model: "ai",
                label: "materialNumber",
              },
              {
                name: "netAmount",
                category: "amounts",
                value: 852.14,
                rawValue: "₹ 852.14",
                type: "number",
                page: 1,
                confidence: 0.8569498360157013,
                coordinates: {
                  x: 0.880879345603272,
                  y: 0.451176051318603,
                  w: 0.04192229038854811,
                  h: 0.006771204561653588,
                },
                model: "ai",
                label: "netAmount",
              },
              {
                name: "quantity",
                category: "details",
                value: 2.3,
                rawValue: "2.30",
                type: "number",
                page: 1,
                confidence: 0.895744800567627,
                coordinates: {
                  x: 0.34918200408997957,
                  y: 0.451176051318603,
                  w: 0.020449897750511203,
                  h: 0.006771204561653588,
                },
                model: "ai",
                label: "quantity",
              },
              {
                name: "unitPrice",
                category: "details",
                value: 330.51,
                rawValue: "330.51",
                type: "number",
                page: 1,
                confidence: 0.8919341564178467,
                coordinates: {
                  x: 0.4049079754601227,
                  y: 0.451176051318603,
                  w: 0.03271983640081799,
                  h: 0.006771204561653588,
                },
                model: "ai",
                label: "unitPrice",
              },
            ],
            [
              {
                name: "description",
                category: "details",
                value: "Oil filter with O Ring Kit",
                rawValue: "Oil filter with O Ring Kit",
                type: "string",
                page: 1,
                confidence: 0.903793603181839,
                coordinates: {
                  x: 0.12883435582822086,
                  y: 0.47505345687811834,
                  w: 0.12065439672801637,
                  h: 0.008553100498930821,
                },
                model: "ai",
                label: "description",
              },
              {
                name: "materialNumber",
                category: "details",
                value: "888414",
                rawValue: "888414",
                type: "string",
                page: 1,
                confidence: 0.8996815085411072,
                coordinates: {
                  x: 0.06952965235173825,
                  y: 0.47505345687811834,
                  w: 0.03629856850715746,
                  h: 0.008196721311475363,
                },
                model: "ai",
                label: "materialNumber",
              },
              {
                name: "netAmount",
                category: "amounts",
                value: 76.01,
                rawValue: "₹ 76.01",
                type: "number",
                page: 1,
                confidence: 0.8738371133804321,
                coordinates: {
                  x: 0.8834355828220859,
                  y: 0.47505345687811834,
                  w: 0.03783231083844585,
                  h: 0.0071275837491090455,
                },
                model: "ai",
                label: "netAmount",
              },
              {
                name: "unitPrice",
                category: "details",
                value: 67.8,
                rawValue: "67.80",
                type: "number",
                page: 1,
                confidence: 0.8980153203010559,
                coordinates: {
                  x: 0.40848670756646216,
                  y: 0.47505345687811834,
                  w: 0.027096114519427394,
                  h: 0.0071275837491090455,
                },
                model: "ai",
                label: "unitPrice",
              },
              {
                name: "quantity",
                category: "details",
                value: 1,
                rawValue: "1.00",
                type: "number",
                page: 1,
                confidence: 0.898600161075592,
                coordinates: {
                  x: 0.3502044989775051,
                  y: 0.47505345687811834,
                  w: 0.019427402862985665,
                  h: 0.0071275837491090455,
                },
                model: "ai",
                label: "quantity",
              },
            ],
            [
              {
                name: "description",
                category: "details",
                value: "O RING -DRAIN CAP",
                rawValue: "O RING -DRAIN CAP",
                type: "string",
                page: 1,
                confidence: 0.8088456988334656,
                coordinates: {
                  x: 0.12832310838445807,
                  y: 0.49607982893799,
                  w: 0.09764826175869121,
                  h: 0.008909479686386279,
                },
                model: "ai",
                label: "description",
              },
              {
                name: "materialNumber",
                category: "details",
                value: "570057/B",
                rawValue: "570057/B",
                type: "string",
                page: 1,
                confidence: 0.8682189881801605,
                coordinates: {
                  x: 0.06237218813905931,
                  y: 0.4964362081254455,
                  w: 0.04856850715746421,
                  h: 0.008553100498930821,
                },
                model: "ai",
                label: "materialNumber",
              },
              {
                name: "quantity",
                category: "details",
                value: 1,
                rawValue: "1.00",
                type: "number",
                page: 1,
                confidence: 0.8958613276481628,
                coordinates: {
                  x: 0.3507157464212679,
                  y: 0.4964362081254455,
                  w: 0.01891615541922287,
                  h: 0.007483962936564448,
                },
                model: "ai",
                label: "quantity",
              },
              {
                name: "netAmount",
                category: "amounts",
                value: 14.25,
                rawValue: "₹ 14.25",
                type: "number",
                page: 1,
                confidence: 0.8621551692485809,
                coordinates: {
                  x: 0.8834355828220859,
                  y: 0.49679258731290094,
                  w: 0.03783231083844585,
                  h: 0.007483962936564448,
                },
                model: "ai",
                label: "netAmount",
              },
              {
                name: "unitPrice",
                category: "details",
                value: 12.71,
                rawValue: "12.71",
                type: "number",
                page: 1,
                confidence: 0.8966782689094543,
                coordinates: {
                  x: 0.40899795501022496,
                  y: 0.4964362081254455,
                  w: 0.026073619631901856,
                  h: 0.007483962936564448,
                },
                model: "ai",
                label: "unitPrice",
              },
            ],
            [
              {
                name: "description",
                category: "details",
                value: "Strap battery",
                rawValue: "Strap battery",
                type: "string",
                page: 1,
                confidence: 0.9027274549007416,
                coordinates: {
                  x: 0.12883435582822086,
                  y: 0.5181753385602281,
                  w: 0.06748466257668712,
                  h: 0.008909479686386224,
                },
                model: "ai",
                label: "description",
              },
              {
                name: "materialNumber",
                category: "details",
                value: "560058/D",
                rawValue: "560058/D",
                type: "string",
                page: 1,
                confidence: 0.8862171173095703,
                coordinates: {
                  x: 0.06339468302658487,
                  y: 0.5178189593727727,
                  w: 0.048057259713701436,
                  h: 0.009265858873841681,
                },
                model: "ai",
                label: "materialNumber",
              },
              {
                name: "quantity",
                category: "details",
                value: 1,
                rawValue: "1.00",
                type: "number",
                page: 1,
                confidence: 0.894753098487854,
                coordinates: {
                  x: 0.34918200408997957,
                  y: 0.5185317177476836,
                  w: 0.020449897750511203,
                  h: 0.00641482537419813,
                },
                model: "ai",
                label: "quantity",
              },
              {
                name: "netAmount",
                category: "amounts",
                value: 66.49,
                rawValue: "₹ 66.49",
                type: "number",
                page: 1,
                confidence: 0.8664670586585999,
                coordinates: {
                  x: 0.8839468302658486,
                  y: 0.5185317177476836,
                  w: 0.03732106339468311,
                  h: 0.00641482537419813,
                },
                model: "ai",
                label: "netAmount",
              },
              {
                name: "unitPrice",
                category: "details",
                value: 59.32,
                rawValue: "59.32",
                type: "number",
                page: 1,
                confidence: 0.8945695757865906,
                coordinates: {
                  x: 0.40899795501022496,
                  y: 0.5185317177476836,
                  w: 0.02556237218813906,
                  h: 0.00641482537419813,
                },
                model: "ai",
                label: "unitPrice",
              },
            ],
            [
              {
                name: "description",
                category: "details",
                value: "SERVICE COUPON CHARGE (FSC",
                rawValue: "SERVICE COUPON CHARGE (FSC",
                type: "string",
                page: 1,
                confidence: 0.6327400803565979,
                coordinates: {
                  x: 0.12985685071574643,
                  y: 0.6254454739843193,
                  w: 0.16155419222903883,
                  h: 0.00962223806129725,
                },
                model: "ai",
                label: "description",
              },
            ],
            [
              {
                name: "description",
                category: "details",
                value: "COUPEN LAPSED)",
                rawValue: "COUPEN LAPSED)",
                type: "string",
                page: 1,
                confidence: 0.686403751373291,
                coordinates: {
                  x: 0.12985685071574643,
                  y: 0.6364932287954383,
                  w: 0.08691206543967278,
                  h: 0.00962223806129725,
                },
                model: "ai",
                label: "description",
              },
              {
                name: "materialNumber",
                category: "details",
                value: "GELA020",
                rawValue: "GELA020",
                type: "string",
                page: 1,
                confidence: 0.7717702984809875,
                coordinates: {
                  x: 0.06390593047034765,
                  y: 0.6325730577334284,
                  w: 0.044478527607361956,
                  h: 0.006058446186742672,
                },
                model: "ai",
                label: "materialNumber",
              },
              {
                name: "quantity",
                category: "details",
                value: 1,
                rawValue: "1.00",
                type: "number",
                page: 1,
                confidence: 0.6784505844116211,
                coordinates: {
                  x: 0.3502044989775051,
                  y: 0.6318602993585175,
                  w: 0.019427402862985665,
                  h: 0.007483962936564503,
                },
                model: "ai",
                label: "quantity",
              },
              {
                name: "unitPrice",
                category: "details",
                value: 200,
                rawValue: "₹ 200.00",
                type: "number",
                page: 1,
                confidence: 0.687292754650116,
                coordinates: {
                  x: 0.4003067484662577,
                  y: 0.6318602993585175,
                  w: 0.042944785276073594,
                  h: 0.007483962936564503,
                },
                model: "ai",
                label: "unitPrice",
              },
            ],
          ],
          createdAt: {
            $date: "2025-04-15T06:09:33.093Z",
          },
          updatedAt: {
            $date: "2025-04-15T06:09:33.093Z",
          },
          __v: 0,
        }

        setInvoiceData(data)
      } catch (err) {
        console.error("Error loading invoice data:", err)
        setError("Failed to load invoice data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvoiceData()
  }, [invoiceId])

  // Helper function to get a field value by name
  const getFieldValue = (name: string) => {
    if (!invoiceData) return null
    const field = invoiceData.headerFields.find((field) => field.name === name)
    return field ? field.value : null
  }

  // Calculate total amount from line items
  const calculateTotal = () => {
    if (!invoiceData) return 0

    let total = 0
    invoiceData.lineItems.forEach((item) => {
      const netAmountField = item.find((field) => field.name === "netAmount")
      if (netAmountField && typeof netAmountField.value === "number") {
        total += netAmountField.value
      }
    })

    return total
  }

  // Update the error display to handle the case where Alert might be a fallback
  if (error) {
    return (
      <div className="m-6">
        <Alert variant="destructive" className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 mt-1 flex-shrink-0" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-gray-500" />
          <h1 className="text-2xl font-bold">Invoice Details</h1>
        </div>
        <Badge variant={invoiceData?.status === "DONE" ? "success" : "default"} className="px-3 py-1">
          <CheckCircle className="h-4 w-4 mr-1" />
          {invoiceData?.status}
        </Badge>
      </div>

      {/* Summary Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Invoice Information</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Job ID:</span>
                  <span className="font-medium">{invoiceData?.jobId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Currency:</span>
                  <span className="font-medium">{getFieldValue("currencyCode")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax ID:</span>
                  <span className="font-medium">{getFieldValue("taxId")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Net Amount:</span>
                  <span className="font-medium">
                    {getFieldValue("netAmount")} {getFieldValue("currencyCode")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Gross Amount:</span>
                  <span className="font-medium">
                    {getFieldValue("grossAmount")} {getFieldValue("currencyCode")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created At:</span>
                  <span className="font-medium">{new Date(invoiceData?.createdAt.$date).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Sender Information</h2>
                <div className="space-y-2">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-medium">{getFieldValue("senderName")}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Address:</span>
                    <span className="font-medium">{getFieldValue("senderAddress")}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Receiver Information</h2>
                <div className="space-y-2">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-medium">{getFieldValue("receiverName")}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Address:</span>
                    <span className="font-medium">{getFieldValue("receiverAddress")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material Number</TableHead>
                <TableHead className="w-[300px]">Description</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Net Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceData?.lineItems.map((item, index) => {
                const materialNumber = item.find((field) => field.name === "materialNumber")
                const description = item.find((field) => field.name === "description")
                const quantity = item.find((field) => field.name === "quantity")
                const unitPrice = item.find((field) => field.name === "unitPrice")
                const netAmount = item.find((field) => field.name === "netAmount")

                return (
                  <TableRow key={index}>
                    <TableCell>{materialNumber?.value || "-"}</TableCell>
                    <TableCell>{description?.value || "-"}</TableCell>
                    <TableCell className="text-right">{quantity?.value || "-"}</TableCell>
                    <TableCell className="text-right">
                      {unitPrice?.value ? `${unitPrice.value} ${getFieldValue("currencyCode")}` : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {netAmount?.value ? `${netAmount.value} ${getFieldValue("currencyCode")}` : "-"}
                    </TableCell>
                  </TableRow>
                )
              })}
              <TableRow>
                <TableCell colSpan={4} className="text-right font-bold">
                  Total:
                </TableCell>
                <TableCell className="text-right font-bold">
                  {calculateTotal()} {getFieldValue("currencyCode")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Tabs defaultValue="metadata" className="mt-6">
        <TabsList>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="raw">Raw Data</TabsTrigger>
        </TabsList>
        <TabsContent value="metadata" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Document Metadata</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Document ID:</span>
                  <span className="font-medium">{invoiceData?._id.$oid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Job ID:</span>
                  <span className="font-medium">{invoiceData?.jobId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-medium">{invoiceData?.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span className="font-medium">{new Date(invoiceData?.createdAt.$date).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Updated:</span>
                  <span className="font-medium">{new Date(invoiceData?.updatedAt.$date).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="raw" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Raw JSON Data</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[400px] text-xs">
                {JSON.stringify(invoiceData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Loading state component
function LoadingState() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
