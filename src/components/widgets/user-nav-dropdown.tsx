"use client";
import React, { Fragment } from "react";
import Image from "next/image";

import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { logger } from "@/lib/logger";
import { type Session } from "next-auth";

interface IUserNavDropdownProps {
  session: Session | null;
}
const UserNavDropdown: React.FC<IUserNavDropdownProps> = ({ session }) => {
  const [profileImage, setProfileImage] = React.useState<string>(
    session?.user?.image || "/images/default-profile.jpg",
  );
  React.useEffect(() => {
    setProfileImage(session?.user?.image || "/images/default-profile.jpg");
  }, [session]);

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative ml-4 flex-shrink-0">
        <div>
          <Menu.Button className="flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">Open user menu</span>
            {profileImage && (
              <Image
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
                src={profileImage}
                alt="Profile image"
              />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className="block px-4 py-2 text-sm text-gray-700"
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserNavDropdown;
