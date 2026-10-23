"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import { CheckIcon, ChevronDownIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export interface ComboboxItem {
  value: string;
  label: string;
}

export interface ComboboxProps {
  items: ComboboxItem[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function Combobox({
  items,
  value,
  onValueChange,
  placeholder = "Select...",
  className,
  disabled = false,
}: ComboboxProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Finde das Label für den aktuellen Wert
  const selectedLabel =
    items.find((item) => item.value === value)?.label || placeholder;

  // Gefilterte Items
  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.value.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Focus auf Input beim Öffnen
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (itemValue: string) => {
    onValueChange(itemValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          <span className="truncate">{selectedLabel}</span>
          <HugeiconsIcon
            icon={ChevronDownIcon}
            className="size-4 opacity-50"
            strokeWidth={2}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="max-h-80 w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto p-0"
      >
        <div className="border-b p-1">
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 w-full border-none bg-transparent px-2 py-1 text-sm outline-none focus:ring-0"
            autoFocus
          />
        </div>
        <div className="max-h-64 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <DropdownMenuItem
                key={item.value}
                onSelect={() => handleSelect(item.value)}
                className="flex cursor-pointer items-center justify-between"
              >
                <span>{item.label}</span>
                {item.value === value && (
                  <HugeiconsIcon
                    icon={CheckIcon}
                    className="size-4"
                    strokeWidth={2}
                  />
                )}
              </DropdownMenuItem>
            ))
          ) : (
            <div className="px-2 py-1 text-sm text-muted-foreground">
              No results
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
