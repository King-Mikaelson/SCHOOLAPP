"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/backoffice/overview");
  }, [ router ]);
  
  return (
    <main className="">
      Navigate to a dedicated sub route
    </main>
  )
}