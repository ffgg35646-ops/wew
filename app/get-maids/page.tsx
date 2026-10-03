"use server"

import GetMaidsClient from "./GetMaidsClient"
import { getActiveMaids } from "@/lib/maids"

export default async function GetMaidsPage() {
  const maids = await getActiveMaids()

  return <GetMaidsClient initialMaids={maids} />
}
