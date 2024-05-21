import { Input } from "@/components/ui/Input";

interface Props {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export default function SearchProduct({ searchValue, setSearchValue }: Props) {
  return (
    <Input
      className="w-full"
      type="text"
      value={searchValue}
      placeholder="buscar producto"
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
    />
  );
}
