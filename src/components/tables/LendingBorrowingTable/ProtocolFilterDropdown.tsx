import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { SetStateAction } from "react";

type ProtocolFilterDropdownProps = {
    protocolFilters: string[];
    setProtocolFilters: (value: SetStateAction<string[]>) => void;
    uniqueProtocols: string[];
  }

const ProtocolFilterDropdown: React.FC<ProtocolFilterDropdownProps> = ({
  protocolFilters,
  setProtocolFilters,
  uniqueProtocols,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto border-none bg-[#27272A]">
          Protocols <ChevronDownIcon className="ml-2 h-4 w-4 cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {uniqueProtocols.map((protocol) => (
          <DropdownMenuCheckboxItem
            key={protocol}
            className="capitalize"
            checked={protocolFilters.includes(protocol)}
            onCheckedChange={() => {
              const newFilters = protocolFilters.includes(protocol)
                ? protocolFilters.filter((p) => p !== protocol)
                : [...protocolFilters, protocol];
              setProtocolFilters(newFilters);
            }}>
            {protocol}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProtocolFilterDropdown;
