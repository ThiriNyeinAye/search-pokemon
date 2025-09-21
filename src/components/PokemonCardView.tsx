"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Pokemon } from "@/types/pokemon";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/state/searchSlice";
import type { RootState } from "@/state/store";
import { useApolloClient } from "@apollo/client/react";
import { GET_POKEMON_BY_NAME } from "@/lib/queries";

export default function PokemonCardView({
  pokemon: p,
  queryName,
}: {
  pokemon: Pokemon | null | undefined;
  queryName: string;
}) {
  const reduce = useReducedMotion();
  const dispatch = useDispatch();
  const favorites = useSelector((s: RootState) => s.search.favorites);
  const isFav = p ? !!favorites[p.name] : false;

  if (!p) {
    return (
      <motion.div
        className="rounded-2xl border border-neutral-800 p-4 md:p-6 bg-neutral-900/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.25 }}
      >
        <p>No result for “{queryName}”.</p>
      </motion.div>
    );
  }

  return (
    <motion.section
      className="rounded-2xl border border-neutral-800 p-4 md:p-6 bg-neutral-900/40"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 18 }}
      layout
      aria-labelledby="pokemon-heading"
    >
      <div className="flex items-start gap-4">
        {p.image && (
          <Image
            src={p.image}
            alt={p.name}
            width={0}
            height={0}
            className="rounded-xl bg-neutral-950 ring-1 ring-neutral-800"
            sizes="(max-width: 640px) 96px, 112px"
            priority
            style={{ height: "auto", width: "122px" }}
          />
        )}
        <div className="flex-1">
          <h2
            id="pokemon-heading"
            className="text-xl md:text-2xl font-semibold flex items-center gap-3"
          >
            {p.name} <span className="text-neutral-400">#{p.number}</span>
            <button
              onClick={() => dispatch(toggleFavorite(p.name))}
              className="ml-1 text-yellow-400 hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
              title="Toggle favorite"
              aria-label={isFav ? "Unfavorite" : "Favorite"}
            >
              {isFav ? "★" : "☆"}
            </button>
          </h2>
          <p className="text-neutral-300">{p.classification}</p>
          <p className="text-sm">Types: {p.types.join(", ")}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Section title="Size">
          <Row
            label="Weight"
            value={`${p.weight.minimum} – ${p.weight.maximum}`}
          />
          <Row
            label="Height"
            value={`${p.height.minimum} – ${p.height.maximum}`}
          />
        </Section>

        <Section title="Resistant / Weaknesses">
          <BadgeList items={p.resistant} label="Resistant" />
          <div className="h-2" />
          <BadgeList items={p.weaknesses} label="Weaknesses" />
        </Section>

        <Section title="Attacks">
          <SubTitle>Fast</SubTitle>
          <ul className="text-sm list-disc ml-5 space-y-0.5">
            {p.attacks.fast.map((a) => (
              <li key={"f" + a.name}>
                {a.name} <span className="text-neutral-400">({a.type})</span> –{" "}
                {a.damage}
              </li>
            ))}
          </ul>
          <div className="h-3" />
          <SubTitle>Special</SubTitle>
          <ul className="text-sm list-disc ml-5 space-y-0.5">
            {p.attacks.special.map((a) => (
              <li key={"s" + a.name}>
                {a.name} <span className="text-neutral-400">({a.type})</span> –{" "}
                {a.damage}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Evolutions</h3>
        <EvolutionScroller evolutions={p.evolutions ?? []} />
      </div>
    </motion.section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-neutral-800 p-4 bg-neutral-950/40">
      <h3 className="font-medium mb-2">{title}</h3>
      {children}
    </div>
  );
}
function SubTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium underline mb-1">{children}</p>;
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm">
      <span className="text-neutral-400">{label}:</span> {value}
    </p>
  );
}
function BadgeList({ items, label }: { items: string[]; label?: string }) {
  if (!items?.length) return null;
  return (
    <div>
      {label && <p className="text-xs text-neutral-400 mb-1">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {items.map((t) => (
          <span
            key={label + t}
            className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function EvolutionScroller({
  evolutions,
}: {
  evolutions: Pick<Pokemon, "id" | "number" | "name" | "image" | "types">[];
}) {
  const apollo = useApolloClient();
  if (!evolutions?.length)
    return <p className="text-sm text-neutral-300">No evolutions.</p>;

  return (
    <>
      <div className="sm:hidden -mx-4 px-4">
        <ul
          className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory"
          role="list"
          aria-label="Evolutions"
        >
          {evolutions.map((evo) => (
            <EvolutionChip
              key={evo.id}
              evo={evo}
              apolloPrefetch={() =>
                apollo.query({
                  query: GET_POKEMON_BY_NAME,
                  variables: { name: evo.name },
                })
              }
              className="snap-start min-w-[220px]"
            />
          ))}
        </ul>
      </div>

      <ul
        className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
        role="list"
        aria-label="Evolutions"
      >
        {evolutions.map((evo) => (
          <EvolutionChip
            key={evo.id}
            evo={evo}
            apolloPrefetch={() =>
              apollo.query({
                query: GET_POKEMON_BY_NAME,
                variables: { name: evo.name },
              })
            }
          />
        ))}
      </ul>
    </>
  );
}

function EvolutionChip({
  evo,
  apolloPrefetch,
  className = "",
}: {
  evo: Pick<Pokemon, "id" | "number" | "name" | "image" | "types">;
  apolloPrefetch: () => void;
  className?: string;
}) {
  return (
    <motion.li
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={className}
      layout
    >
      <Link
        href={`/?q=${encodeURIComponent(evo.name)}`}
        onMouseEnter={apolloPrefetch}
        onFocus={apolloPrefetch}
        className="group flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-950/40 px-3 py-2 hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label={`Show ${evo.name}`}
      >
        {evo.image ? (
          <img
            src={evo.image}
            alt={evo.name}
            width={36}
            height={36}
            className="rounded-md bg-neutral-950 ring-1 ring-neutral-800"
          />
        ) : (
          <div className="w-9 h-9 rounded-md bg-neutral-800" />
        )}
        <div className="min-w-0">
          <p className="truncate">
            {evo.name} <span className="text-neutral-500">#{evo.number}</span>
          </p>
          <p className="text-xs text-neutral-400 truncate">
            {evo.types?.join(", ")}
          </p>
        </div>
        <span
          aria-hidden
          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400"
        >
          ↗
        </span>
      </Link>
    </motion.li>
  );
}
