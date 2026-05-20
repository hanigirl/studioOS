import Link from "next/link"
import { Suspense } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TodayContent } from "@/components/dashboard-today/today-content"
import { LoadingState } from "@/components/dashboard-today/loading-state"

export default function DashboardTodayPage() {
  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" asChild className="-ms-2">
        <Link href="/">
          <ArrowLeft className="rtl:rotate-180" aria-hidden="true" />
          Back to Dashboard
        </Link>
      </Button>
      <Suspense fallback={<LoadingState />}>
        <TodayContent />
      </Suspense>
    </div>
  )
}
