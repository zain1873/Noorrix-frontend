"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "./AuthContext";
import {
  getFavourites,
  addFavourite,
  removeFavourite,
  getGuestFavouriteIds,
  setGuestFavouriteIds,
  clearGuestFavourites,
} from "../lib/favourites";

const FavouritesContext = createContext(null);

export function FavouritesProvider({ children }) {
  const { user, hydrated } = useAuth();
  const [ids, setIds] = useState(new Set());
  const migratedRef = useRef(false);

  // Guest favourites live in localStorage. On login, migrate them to the
  // account once (silent POSTs), then load the canonical backend list.
  useEffect(() => {
    if (!hydrated) return;

    if (!user) {
      migratedRef.current = false;
      setIds(new Set(getGuestFavouriteIds()));
      return;
    }

    let active = true;
    (async () => {
      if (!migratedRef.current) {
        migratedRef.current = true;
        const guestIds = getGuestFavouriteIds();
        if (guestIds.length) {
          await Promise.all(guestIds.map((id) => addFavourite(id).catch(() => {})));
          clearGuestFavourites();
        }
      }
      const cars = await getFavourites();
      if (active) setIds(new Set((cars || []).map((c) => c.id)));
    })();

    return () => { active = false; };
  }, [user, hydrated]);

  const isFavourite = useCallback((id) => ids.has(id), [ids]);

  const toggleFavourite = useCallback(async (car) => {
    const id = car.id;
    const wasFav = ids.has(id);

    setIds((prev) => {
      const next = new Set(prev);
      if (wasFav) next.delete(id); else next.add(id);
      return next;
    });

    if (!user) {
      const current = getGuestFavouriteIds();
      const next = wasFav ? current.filter((x) => x !== id) : [...current, id];
      setGuestFavouriteIds(next);
      return true;
    }

    try {
      if (wasFav) await removeFavourite(id);
      else await addFavourite(id);
      return true;
    } catch {
      setIds((prev) => {
        const next = new Set(prev);
        if (wasFav) next.add(id); else next.delete(id);
        return next;
      });
      return false;
    }
  }, [ids, user]);

  return (
    <FavouritesContext.Provider value={{ isFavourite, toggleFavourite, count: ids.size }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  return ctx || { isFavourite: () => false, toggleFavourite: async () => false, count: 0 };
}
