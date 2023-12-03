"use server"

import { cookies } from "next/headers"

export default async function getCookies() {
    const cookieStore = cookies()
    const store = cookieStore.get('token')
    return store?.value
  }
  