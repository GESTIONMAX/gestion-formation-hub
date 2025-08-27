"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toast } from "@/components/ui/toast"

export const Toaster = () => {
  const { toasts } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast
            key={id}
            {...props}
            className="flex items-center justify-between p-4 rounded-md border shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <div className="flex-1">
              {title && <div className="font-semibold">{title}</div>}
              {description && <div className="text-sm">{description}</div>}
            </div>
            {action}
          </Toast>
        )
      })}
    </>
  )
}
