"use client"
import React from 'react'
import {SessionProvider} from 'next-auth/react'
const ProviderNextauth = ({children}:{children:React.ReactNode}) => {
  return <>
       <SessionProvider>
         {children}
       </SessionProvider>
    </>
    
}

export default ProviderNextauth



ProviderNextauth