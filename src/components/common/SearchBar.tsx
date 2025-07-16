import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => (
  <div className="flex justify-end mb-4">
    <div className="relative max-w-md w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);

export default SearchBar;