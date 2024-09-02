import { logger } from '@lib/logger';
import React, { KeyboardEventHandler } from 'react';

interface ITaggedInputProps {
  label: string;
  value: string[];
  onChange: (tags: string[]) => void;
}
const TaggedInput: React.FC<ITaggedInputProps> = ({
  label,
  value,
  onChange,
}) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchResults, setSearchResults] = React.useState<Array<string>>([]);
  const [tags, setTags] = React.useState<Array<string>>(value);

  React.useEffect(() => {
    logger.debug('TaggedInput', 'callingOnChange', tags);
    onChange(tags);
  }, [tags, onChange]);
  const removeTag = (tag: string) => {
    setTags(tags.filter((obj) => obj !== tag));
  };
  const searchTags = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    const response = await fetch(`api/tags/search?q=${searchText}`);
    if (response.status === 200) {
      const results = await response.json();
      setSearchResults(results.map((r: { name: string }) => r.name));
    }
    setIsSearching(false);
  };
  const handleChange = async ($event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = $event.target;
    setSearchText(value);
    await searchTags(value);
  };
  const handleKeyPress = ($event: React.KeyboardEvent<HTMLInputElement>) => {
    if ($event.code === 'Enter' || $event.code === 'NumpadEnter') {
      __addTag(searchText);
    }
  };
  const __addTag = (tag: string) => {
    setTags([...tags, tag]);
    setSearchResults([]);
    setIsSearching(false);
    setSearchText('');
  };
  const doResultClick = ($event: any) => __addTag($event.target.textContent);
  return (
    <>
      <label
        htmlFor="{name}"
        className="block text-sm font-medium"
      >
        {label}
      </label>
      <div className="flex w-full text-sm align-middle border rounded-lg shadow-sm border-accent ">
        <div className="flex flex-row pt-3 pl-2 space-x-1">
          {tags &&
            tags.map((tag) => (
              <span
                key={tag}
                className="badge badge-primary badge-lg py-0.5"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  type="button"
                  className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center "
                >
                  <span className="sr-only">{tag}</span>
                  <svg
                    className="w-2 h-2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 8 8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth={1.5}
                      d="M1 1l6 6m0-6L1 7"
                    />
                  </svg>
                </button>
              </span>
            ))}
        </div>
        <input
          value={searchText}
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          placeholder="Start typing and press enter"
          className="w-full input focus:outline-none"
        />
      </div>
      {isSearching && (
        <div
          role="status"
          className="z-50 ml-5 -mt-3"
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4 mr-2 "
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {searchResults && searchResults.length !== 0 && (
        <div className={`z-50 mb-4 flex space-y-0`}>
          <aside
            aria-labelledby="menu-heading"
            className="absolute z-50 flex flex-col items-start w-64 -mt-5 text-sm bg-white border rounded-md shadow-md"
          >
            <ul className="flex flex-col w-full">
              {searchResults.map((result) => (
                <li
                  key={result}
                  onClick={doResultClick}
                  className="px-2 py-1 space-x-2 cursor-pointer hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white focus:outline-none"
                >
                  {result}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </>
  );
};

export default TaggedInput;
