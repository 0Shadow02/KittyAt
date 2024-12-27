import { cn } from '@/lib/utils'
import React from 'react'
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: React.ReactNode
}

export const Heading = ({children,className,...props}:HeadingProps) => {
  return (
    <h1 className={cn("text-4xl sm:text-5xl text-pretty font-semibold tracking-tight text-zinc-800 dark:text-foreground",className)}
    {...props}>
        {children}
    </h1>
  )
}
