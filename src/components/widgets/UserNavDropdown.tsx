'use client';
import { logger } from '@lib/logger';
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';

interface IUserNavDropdownProps {
  session: any;
}
const UserNavDropdown: React.FC<IUserNavDropdownProps> = ({ session }) => {
  React.useEffect(() => {
    logger.debug('UserNavDropdown', 'session', session);
  }, [session]);

  return (
    <div className="flex items-center">
      <Menu
        as="div"
        className="relative flex-shrink-0 ml-4"
      >
        <div>
          <Menu.Button className="flex text-sm text-white bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src={session?.user?.image as string}
              alt="Profile image"
            />
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
          <Menu.Items className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
