import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CHAIN_CONFIG } from "@/constants/chainInfo";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { SetStateAction } from "react";

type ChainFilterDropdownProps = {
  chainFilters: string[];
  setChainFilters: (value: SetStateAction<string[]>) => void;
  uniqueChains: string[];
};

const ChainFilterDropdown: React.FC<ChainFilterDropdownProps> = ({
  chainFilters,
  setChainFilters,
  uniqueChains,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto border-none bg-[#27272A]">
          Chains <ChevronDownIcon className="ml-2 h-4 w-4 cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {uniqueChains.map((chainId) => (
          <DropdownMenuCheckboxItem
            key={chainId}
            className="capitalize"
            checked={chainFilters.includes(chainId)}
            onCheckedChange={() => {
              const newFilters = chainFilters.includes(chainId)
                ? chainFilters.filter((id) => id !== chainId)
                : [...chainFilters, chainId];
              setChainFilters(newFilters);
            }}>
            {CHAIN_CONFIG[chainId]?.chainName}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChainFilterDropdown;
