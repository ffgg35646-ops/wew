import { requireAdmin } from "@/lib/admin-auth"
import SiteImagesAdminClient from "./SiteImagesAdminClient"

export default async function SiteImagesPage() {
  await requireAdmin()

  return <SiteImagesAdminClient />
}
