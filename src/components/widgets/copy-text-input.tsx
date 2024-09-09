'use client';
import { Transition } from '@headlessui/react';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { HiOutlineClipboardCopy } from 'react-icons/hi';

interface ICopyTextInput {
  label: string;
  text: string;
}
const CopyTextInput: React.FC<ICopyTextInput> = ({ label, text }) => {
  const [showResult, setShowResult] = React.useState(false);
  const _onCopy = () => {
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
    }, 2000);
  };
  return (
    <React.Fragment>
      <div>
        <label
          htmlFor="text-to-copy"
          className="block text-sm font-medium label"
        >
          {label}
        </label>

        <div className="flex mt-1 rounded-md shadow-sm ">
          <div className="relative flex items-stretch flex-grow indicator focus-within:z-10">
            <Transition
              show={showResult}
              enter="transition-opacity duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <span className="w-3/4 indicator-item indicator-center badge badge-accent">
                Copied successfully
              </span>
            </Transition>
            <input
              id="text-to-copy"
              readOnly={true}
              value={text}
              className="block w-full rounded-none input input-md rounded-l-md sm:text-sm"
              placeholder="John Doe"
            />
          </div>
          <CopyToClipboard
            text={text}
            onCopy={_onCopy}
          >
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium btn rounded-r-md"
            >
              <HiOutlineClipboardCopy className="w-6 h-6 text-accent" />
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CopyTextInput;
