import React from 'react';
import Icons from './icons';
import { Inbox, PlusCircle, UserCircle2 } from 'lucide-react';
import Image from 'next/image';

const DiscordUi = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="m-2 lg:m-4 rounded-xl bg-opacity-25 dark:bg-opacity-25 p-2 lg:p-4 ring-1 ring-inset ring-gray-900/10 dark:ring-gray-100/10 max-w-[1240px] w-full">
        <div className="flex min-h-[800px] w-full max-w-[1200px] bg-discord-background text-white rounded-lg overflow-hidden shadow-xl mx-auto">
          <div className="hidden sm:flex w-[72px] bg-[#202225] flex-col items-center py-3">
            <div className="size-12 bg-discord-color rounded-2xl flex items-center justify-center mb-2 hover:rounded-xl transition-all duration-200">
              <Icons.discord className="size-3/5 text-foreground" />
            </div>
            <div className="w-8 h-[2px] bg-discord-background rounded-full my-2"></div>
            <div className="flex flex-col items-center flex-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="size-12 bg-discord-background rounded-3xl flex items-center justify-center mb-3 hover:rounded-xl transition-all duration-200 hover:bg-discord-color cursor-not-allowed"
                >
                  <span className="text-lg font-semibold text-gray-400">
                    {String.fromCharCode(65 + i)}
                  </span>
                </div>
              ))}
              <div className="mt-auto">
                <div className="group size-12 bg-discord-background rounded-3xl flex items-center justify-center mb-3 hover:rounded-xl transition-all duration-200 hover:bg-[#3ba55c] cursor-not-allowed">
                  <PlusCircle className="text-[#3ba55c] group-hover:text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex w-60 bg-[#2f3137] flex-col">
            <div className="px-4 h-16 border-b border-[#202225] flex items-center shadow-sm">
              <div className="w-full bg-[#202225] text-sm rounded px-2 h-8 flex items-center justify-center text-gray-500 cursor-not-allowed">
                Find or start a conversation
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pt-4">
              <div className="px-2 mb-4">
                <div className="flex items-center text-sm px-2 py-1.5 rounded hover:bg-[#393c43] text-[#dcddee] cursor-not-allowed">
                  <UserCircle2 className="mr-4 size-8 text-[#b9bbbe]" />
                  <span className="font-medium text-sm">Friends</span>
                </div>
                <div className="flex items-center text-sm px-2 py-1.5 rounded hover:bg-[#393c43] text-[#dcddee] cursor-not-allowed">
                  <Inbox className="mr-4 size-8 text-[#b9bbbe]" />
                  <span className="font-medium text-sm">Nitro</span>
                </div>
              </div>

              <div className=' px-2 mb-4 '>
                 <h3 className=' text-xs font-semibold text-[#8e9297] px-2 mb-2 uppercase '>
                    Direct Messages
                 </h3>
                 <div className=' flex items-center px-2 py-1.5 rounded bg-[#393c43] text-white cursor-pointer' >
                    <Image src="/asset-profile-picture.png" alt="KittyAt_Avt"
                     width={32}
                     height={32}
                     className=' object-cover rounded-full mr-3'
                    />

                 </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordUi;