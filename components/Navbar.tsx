"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import AnimatedBackground from './ui/animated-background'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { MenuSquare } from 'lucide-react'
import { ModeToggle } from './ThemeSwitcherBtn'
import { LoginButton } from './auth/loginbutton'



export default function(){
    return (
       <>
            <Desktop/>
            <Mobile/>
       </>
    )
}

const items = [  
    {label:"Home", link:"/"  },
    {label:"Help", link: "#bottom-of-page"},
    {label:"Pricing", link:"/pricing"  },
] 

const Desktop = () => {
  return (
    <div className="hidden border-separate bg-background md:block lg:block bg-slate-200 dark:bg-black ">
        
      <nav className='w-full flex justify-between items-center px-8 h-[55px] min-h-[50px] '>
        <div className=' text-3xl font-bold font-mono text-foreground'>
           KittyAt
        </div>
        <div className=' flex'>
          <AnimateNavbaeItems/>
        </div>
        <div>
          <LoginButton>
          <Button variant={"secondary"}>
            Get started
          </Button>
          </LoginButton>
        </div>
      </nav>
    </div>
  )
}


const Mobile = () => {
  const [isOpen , setIsOpen] = useState(false)
  return (
    <div className='block md:hidden lg:hidden '>
      <nav className=' container flex flex-col justify-center items-center'>
         <Sheet >
            <SheetTrigger asChild >
                <Button >
                  <MenuSquare/>
                </Button>
            </SheetTrigger>
            <SheetContent className=' w-screen' >
            <div className=" fixed inset-0">
          <div className="flex items-center  py-3 border-b-2 border-muted-foreground w-full">
            <h2 className="text-lg font-semibold mx-2">Magic UI</h2>
            </div>
              <div >
                        {items.map(item=> <NavbarItem
                            clickCallback={()=> setIsOpen((prev)=>!prev)}
                            key={item.label}
                            link={item.link}
                            label={item.label}
                        />)}
                    </div>
              
                  </div>    
            </SheetContent>

         </Sheet>
        
        </nav> 

    </div>
  )
}

const NavbarItem = ({ link, label, clickCallback }: { link: string; label: string; clickCallback?: () => void }) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex w-full items-center mt-1">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-xl text-muted-foreground block font-medium font-serif",
          isActive ? "text-foreground" : "hover:text-foreground"
        )}
        onClick={() => {
          if (clickCallback) clickCallback();
        }}
      >
        {label}
      </Link>
      <div className="absolute -bottom-[8px] left-1/2 h-[1px] w-[100%] -translate-x-1/2 rounded-xl bg-foreground"></div>
    </div>
  );
};




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







