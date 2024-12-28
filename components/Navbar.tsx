"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { buttonVariants } from './ui/button'
import AnimatedBackground from './ui/animated-background'



export default function(){
    return (
       <>
            <Desktop/>
            {/* <Mobile/> */}
       </>
    )
}

const items = [  
    {label:"Home", link:"/"  },
    {label:"Help", link:"/settings"  },
    {label:"Signout", link:"/signout"  },
] 

const Desktop = () => {
  return (
    <div className="hidden border-separate bg-background md:block lg:block ">
        
      <nav className='w-full flex justify-between items-center px-8 h-[55px] min-h-[50px] '>
        <div>
           section1
        </div>
        <div className=' flex'>
          <AnimateNavbaeItems/>
        </div>
        <div>
        section3
        </div>
      </nav>
    </div>
  )
}







 const AnimateNavbaeItems = () => {
  return (
    <AnimatedBackground
   
    className='rounded-lg bg-zinc-100 dark:bg-zinc-800'
    transition={{
        type: 'spring',
        bounce: 0.4,
        duration: 0.5,
    }}
    enableHover
    >
    {items.map((item, index) =>{
        const pathname = usePathname()
        const isActive = pathname === item.link;
      return <Link
        href={item.link}
        key={index}
        data-id={item}
        type='button'
        className={cn(buttonVariants({ variant: 'ghost' }), 
        'w-full justify-start px-12 py-0.5 text-md font-medium transition-colors duration-300', 
        isActive ? 'text-foreground' : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50')}
   
      >
        {item.label}
        {isActive && (
              <div className="absolute -bottom-[8px] left-1/2 h-[2px] w-[60%] -translate-x-1/2 rounded-xl bg-foreground md:block"></div>
            )}
            
        </Link>
        
  
    } )}
  </AnimatedBackground>
  )
}














 



