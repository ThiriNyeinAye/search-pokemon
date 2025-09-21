"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, type SearchSchema } from "@/lib/schemas";
import { useDispatch, useSelector } from "react-redux";
import { addRecent } from "@/state/searchSlice";
import type { RootState } from "@/state/store";
import { motion } from "framer-motion";

export default function SearchInput() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const dispatch = useDispatch();
  const recents = useSelector((s: RootState) => s.search.recents);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: { q: initial },
  });

  useEffect(() => {
    setValue("q", initial);
  }, [initial, setValue]);

  const onSubmit = (data: SearchSchema) => {
    const q = data.q.trim();
    if (q) dispatch(addRecent(q));
    router.push(q ? `/?q=${encodeURIComponent(q)}` : "/");
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 mb-6"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      role="search"
      aria-label="Search Pokémon"
    >
      <div className="flex gap-2">
        <div
          className="flex-1 inline-flex rounded-full p-[1px] 
             bg-neutral-700
             focus-within:bg-gradient-to-r 
             focus-within:from-purple-500 focus-within:to-pink-500 
             transition-colors"
        >
          <input
            {...register("q")}
            placeholder="Search by name… e.g., Bulbasaur"
            className="w-full rounded-full px-4 py-2 
               bg-[#1b1c1f] text-purple-200 
               focus:outline-none"
            autoComplete="off"
            aria-invalid={!!errors.q}
            aria-describedby={errors.q ? "search-error" : undefined}
          />
        </div>

        <div
          className="inline-flex rounded-full p-[1px]
                bg-gradient-to-r from-purple-500 to-pink-500"
        >
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full px-5 py-2
               bg-[#1b1c1f] text-purple-300 font-semibold
               hover:text-purple-100 hover:shadow-[0_0_14px_-6px_rgba(168,85,247,.7)]
               active:scale-[0.98] transition
               focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60"
          >
            <span>Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-3.5-3.5" />
            </svg>
          </button>
        </div>
      </div>
      {errors.q && (
        <p id="search-error" className="text-red-400 text-sm">
          {errors.q.message}
        </p>
      )}

      {mounted && recents.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {recents.slice(0, 8).map((term) => (
            <button
              key={term}
              onClick={() => router.push(`/?q=${encodeURIComponent(term)}`)}
              className="text-xs rounded-full px-3 py-1 bg-neutral-800 hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 whitespace-nowrap"
              type="button"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </motion.form>
  );
}
