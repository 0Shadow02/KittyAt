import { useState, useRef, useEffect } from 'react';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors"
      >
        <span className="text-sm font-medium text-white">SH</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium">Shadow 10</p>
            <p className="text-xs text-gray-500">@shadow87 - Joined November 2023</p>
          </div>
          
          <div className="py-1">
            <DropdownItem text="Profile" />
            <DropdownItem text="Upgrade to plus" />
            <DropdownItem text="Account details" />
            <DropdownItem text="Reputation" />
            <DropdownItem text="Devcard" />
            <DropdownItem text="Invite friends" />
            <div className="border-t border-gray-100 my-1" />
            <DropdownItem text="Pause new tab" />
            <DropdownItem text="Customize" />
            <div className="border-t border-gray-100 my-1" />
            <DropdownItem text="Logout" />
          </div>
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ text }: { text: string }) => (
  <a
    href="#"
    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
  >
    {text}
  </a>
);

export default ProfileDropdown;