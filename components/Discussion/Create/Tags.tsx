"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Hash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TAGS } from "@/constants/tags"; // Ensure you have the file from previous steps
import { TagType } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";

interface Props {
  value?: TagType;
  onChange: (value: TagType) => void;
}

export function TagSelector({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);

  // Find the full config object based on the current value
  const selectedTag = TAGS.find((tag) => tag.value === value);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full h-14 justify-between bg-[#1a110d]/50 border-[#3e2723] text-[#eaddcf] hover:bg-[#1a110d] hover:text-[#d4af37] hover:border-[#d4af37]/50 rounded-xl transition-all"
          >
            {selectedTag ? (
              <div className="flex items-center gap-2">
                {/* Render the selected tag with its specific color style */}
                <span
                  className={cn(
                    "w-3 h-3 rounded-full",
                    selectedTag.style.split(" ")[0].replace("bg-", "bg-")
                  )}
                />
                <span className="font-mono text-sm">{selectedTag.label}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[#5d4037]">
                <Hash size={4} />
                <span className="text-sm">Select Tag...</span>
              </div>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[280px] p-0 bg-[#1a110d] border-[#3e2723] text-[#eaddcf]"
          align="end"
        >
          <Command className="bg-transparent">
            <CommandInput
              placeholder="Search category..."
              className="text-[#eaddcf] placeholder:text-[#5d4037]"
            />
            <CommandList className="max-h-[300px] overflow-y-auto custom-scrollbar">
              <CommandEmpty className="py-6 text-center text-sm text-[#5d4037]">
                No category found.
              </CommandEmpty>
              <CommandGroup heading="Dojo Themes" className="text-[#a1887f]">
                {TAGS.filter(
                  (t) =>
                    ![
                      "TypeScript_JavaScript",
                      "Python",
                      "Java",
                      "CPP_n_C",
                      "Rust",
                      "SQL",
                      "NoSQL",
                      "Frontend",
                      "Backend",
                      "Dynamic_Programming",
                      "Graphs_n_Trees",
                      "Arrays_n_Strings",
                      "Recursion",
                      "Bit_Manipulation",
                      "System_Design",
                      "Math_n_Geometry",
                      "Job",
                      "Placement",
                      "Gate",
                    ].includes(t.value)
                ).map((tag) => (
                  <CommandItem
                    key={tag.value}
                    value={tag.label} // Search by label
                    onSelect={() => {
                      onChange(tag.value);
                      setOpen(false);
                    }}
                    className="cursor-pointer aria-selected:bg-[#3e2723]/30 aria-selected:text-[#d4af37] focus:bg-[#3e2723]/30 focus:text-[#d4af37] my-1"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className={cn("w-2 h-2 rounded-full", tag.style.split(" ")[0])} />
                      <span>{tag.label}</span>
                      {value === tag.value && <Check className="ml-auto h-4 w-4 text-[#d4af37]" />}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Technical Topics" className="text-[#a1887f]">
                {TAGS.filter((t) =>
                  [
                    "Dynamic_Programming",
                    "Graphs_n_Trees",
                    "Arrays_n_Strings",
                    "Recursion",
                    "Bit_Manipulation",
                    "System_Design",
                    "Math_n_Geometry",
                  ].includes(t.value)
                ).map((tag) => (
                  <CommandItem
                    key={tag.value}
                    value={tag.label}
                    onSelect={() => {
                      onChange(tag.value);
                      setOpen(false);
                    }}
                    className="cursor-pointer aria-selected:bg-[#3e2723]/30 aria-selected:text-[#d4af37] focus:bg-[#3e2723]/30 focus:text-[#d4af37] my-1"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className={cn("w-2 h-2 rounded-full", tag.style.split(" ")[0])} />
                      <span>{tag.label}</span>
                      {value === tag.value && <Check className="ml-auto h-4 w-4 text-[#d4af37]" />}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>

              {/* Add more groups if needed for Languages, etc. */}
              <CommandGroup heading="Languages and Stack" className="text-[#a1887f]">
                {TAGS.filter((t) =>
                  [
                    "TypeScript_JavaScript",
                    "Python",
                    "CPP_n_C",
                    "Java",
                    "Rust",
                    "SQL",
                    "NoSQL",
                    "Frontend",
                    "Backend",
                  ].includes(t.value)
                ).map((tag) => (
                  <CommandItem
                    key={tag.value}
                    value={tag.label}
                    onSelect={() => {
                      onChange(tag.value);
                      setOpen(false);
                    }}
                    className="cursor-pointer aria-selected:bg-[#3e2723]/30 aria-selected:text-[#d4af37] focus:bg-[#3e2723]/30 focus:text-[#d4af37] my-1"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className={cn("w-2 h-2 rounded-full", tag.style.split(" ")[0])} />
                      <span>{tag.label}</span>
                      {value === tag.value && <Check className="ml-auto h-4 w-4 text-[#d4af37]" />}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Career" className="text-[#a1887f]">
                {TAGS.filter((t) => ["Job", "Placement", "Gate"].includes(t.value)).map((tag) => (
                  <CommandItem
                    key={tag.value}
                    value={tag.label}
                    onSelect={() => {
                      onChange(tag.value);
                      setOpen(false);
                    }}
                    className="cursor-pointer aria-selected:bg-[#3e2723]/30 aria-selected:text-[#d4af37] focus:bg-[#3e2723]/30 focus:text-[#d4af37] my-1"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className={cn("w-2 h-2 rounded-full", tag.style.split(" ")[0])} />
                      <span>{tag.label}</span>
                      {value === tag.value && <Check className="ml-auto h-4 w-4 text-[#d4af37]" />}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
