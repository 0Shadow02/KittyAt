import React from 'react'
import Icons from './icons'

const DiscordUi = ({children}:{children:React.ReactNode}) => {
  return (
    <div className=' flex h-screen w-full bg-discord-background text-white rounded-lg overflow-hidden shadow-xl'>
        <div className=' hidden sm:flex w-[72px]  bg-[#202225] flex-col py-3  '>
           <div className=' size-12 bg-discord-color  rounded-2xl flex items-center justify-center mb-2 hover:rounded-xl transition-all duration-200 mx-auto '>
               <Icons.discord  className=' size-3/5  text-foreground'/>
           </div>
           <div  className=' w-8 h-[2px] bg-discord-background rounded-full  mx-auto my-2'>
              {[...Array(5).map((_, i)=> (
                <div key={i} 
                className=' size-12 bg-discord-background rounded-3xl flex items-center justify-center mb-3 hover:rounded-xl transition-all duration-200 hover:bg-discord-color cursor-not-allowed' >
                <span  className=' text-lg font-semibold text-gray-400 '>
                  {String.fromCharCode(65 + i) }
                </span>
              </div> ) 
            ),
            ]}
           </div> 
        </div>
       
    </div>
  )
}

export default DiscordUi