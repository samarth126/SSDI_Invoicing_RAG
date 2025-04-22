import InvoiceDashboard from "../../../../invoice-dashboard"

export default function InvoicePage({ params }: { params: { id: string } }) {
  return <InvoiceDashboard invoiceId={params.id} />
}
