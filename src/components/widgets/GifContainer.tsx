'use client';
import React from 'react';
import Image from 'next/image';
import { TbThumbUp, TbThumbDown } from 'react-icons/tb';
import { Gif } from 'models';
import Link from 'next/link';

interface IGifContainerProps {
  gif: Gif;
  isLink?: boolean;
  showDetails?: boolean;
}
const GifContainer: React.FC<IGifContainerProps> = ({
  gif,
  isLink = true,
  showDetails = true,
}) => {
  const [upVotes, setUpVotes] = React.useState<number>(gif.upVotes);
  const [downVotes, setDownVotes] = React.useState<number>(gif.downVotes);

  const _doot = async (id: string, isUp: boolean) => {
    const response = await fetch(`api/votes?gifId=${id}&isUp=${isUp ? 1 : 0}`, {
      method: 'POST',
    });
    if (response.status === 200) {
      const result = (await response.json()) as Gif;
      setUpVotes(result.upVotes);
      setDownVotes(result.downVotes);
    }
  };
  return (
    <>
      <div className="group relative h-[17.5rem] transform overflow-hidden rounded-4xl">
        <div className="absolute inset-0">
          {isLink ? (
            <Link
              href={`gifs/${gif.slug}`}
              title={gif.title}
            >
              <Image
                alt={gif.title}
                className="absolute inset-0 transition duration-300 group-hover:scale-110"
                src={gif.fileName}
                fill
                sizes="100vw"
                style={{
                  objectFit: 'fill',
                }}
              />
            </Link>
          ) : (
            <Image
              alt={gif.title}
              className="absolute inset-0 transition duration-300 group-hover:scale-110"
              src={gif.fileName}
              fill
              sizes="100vw"
              style={{
                objectFit: 'fill',
              }}
            />
          )}
        </div>
      </div>
      {showDetails && (
        <div className="flex flex-row p-2">
          <div className="flex-1 space-x-2 text-base">
            {gif.searchTerms?.map((t) => (
              <div
                key={t}
                className="mr-0.5 badge badge-info  badge-md badge-outline"
              >
                {`#${t}`}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-1">
            <div className="flex transition duration-75 ease-in-out delay-150 hover:text-orange-700 hover:cursor-pointer">
              <span onClick={() => _doot(gif.id, true)}>
                <TbThumbUp className="w-5" />
              </span>
              <span className="text-xs">{upVotes}</span>
            </div>
            <div className="flex transition duration-75 ease-in-out delay-150 hover:text-orange-700 hover:cursor-pointer">
              <span
                onClick={() => _doot(gif.id, false)}
                className="pl-2 "
              >
                <TbThumbDown className="w-5" />
              </span>
              <span className="text-xs">{downVotes}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GifContainer;
