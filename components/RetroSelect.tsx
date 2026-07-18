"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

type RetroSelectOption = { value: string; label: string };

export function RetroSelect({
  value,
  options,
  onChange,
  ariaLabel,
  variant = "light",
  className = "",
  searchable = false,
  placeholder,
}: {
  value: string;
  options: RetroSelectOption[];
  onChange: (value: string) => void;
  ariaLabel: string;
  variant?: "light" | "dark";
  className?: string;
  searchable?: boolean;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  function toggleOpen(next: boolean) {
    setOpen(next);
    if (!next) setQuery("");
    if (next) {
      const idx = options.findIndex((option) => option.value === value);
      setActiveIndex(idx >= 0 ? idx : 0);
    }
  }

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const dark = variant === "dark";
  const selected = options.find((option) => option.value === value);
  const filtered = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(query.trim().toLowerCase())
      )
    : options;
  const highlighted = Math.min(activeIndex, Math.max(filtered.length - 1, 0));

  // Keep the keyboard-highlighted option scrolled into view.
  useEffect(() => {
    if (!open) return;
    const item = listRef.current?.children[highlighted] as
      | HTMLElement
      | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [open, highlighted]);

  function onListKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(Math.min(highlighted + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(Math.max(highlighted - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const option = filtered[highlighted];
      if (option) {
        onChange(option.value);
        toggleOpen(false);
      }
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`} onKeyDown={onListKeyDown}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => toggleOpen(!open)}
        className={
          dark
            ? "flex w-full items-center justify-between gap-2 rounded-none border-2 border-white bg-black px-2 py-1.5 text-xs text-white hover:bg-[#1a1a1a]"
            : "flex w-full items-center justify-between gap-2 rounded-none border-2 border-black bg-white px-3 py-2 text-sm text-black shadow-[2px_2px_0_#000] hover:bg-[#FFCC00]"
        }
      >
        <span className="truncate">
          {selected?.label ?? placeholder ?? value}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className={
            dark
              ? "absolute left-0 right-0 z-50 mt-1 border-2 border-white bg-black shadow-[3px_3px_0_#fff]"
              : "absolute left-0 right-0 z-50 mt-1 border-2 border-black bg-white shadow-[3px_3px_0_#000]"
          }
        >
          {searchable && (
            <div
              className={`flex items-center gap-2 border-b-2 px-3 py-2 ${
                dark ? "border-white" : "border-black"
              }`}
            >
              <Search
                className={`h-3.5 w-3.5 shrink-0 ${
                  dark ? "text-white/60" : "text-black/60"
                }`}
              />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Search..."
                aria-label={`Search ${ariaLabel}`}
                className={`w-full bg-transparent text-xs outline-none ${
                  dark
                    ? "text-white placeholder:text-white/40"
                    : "text-black placeholder:text-black/40"
                }`}
              />
            </div>
          )}

          <ul
            ref={listRef}
            role="listbox"
            aria-label={ariaLabel}
            className="max-h-64 overflow-y-auto"
          >
            {filtered.length === 0 && (
              <li
                className={`px-3 py-2 text-xs ${
                  dark ? "text-white/50" : "text-black/50"
                }`}
              >
                No matches.
              </li>
            )}
            {filtered.map((option, index) => {
              const isSelected = option.value === value;
              const isActive = index === highlighted;
              return (
                <li key={option.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      toggleOpen(false);
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={
                      dark
                        ? `block w-full px-3 py-2 text-left text-xs ${
                            isActive
                              ? "bg-[#FFCC00] text-black"
                              : isSelected
                                ? "bg-white/20 text-white"
                                : "text-white"
                          }`
                        : `block w-full px-3 py-2 text-left text-sm ${
                            isActive
                              ? "bg-[#FFCC00] text-black"
                              : isSelected
                                ? "bg-black text-white"
                                : "text-black"
                          }`
                    }
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
