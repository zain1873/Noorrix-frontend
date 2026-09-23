"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "./AuthContext";
import {
  getFavourites,
  addFavourite,
  removeFavourite,
  getGuestFavouriteIds,
  clearGuestFavourites,
} from "../lib/favourites";
import SignInPrompt from "../components/SignInPrompt/SignInPrompt";

const FavouritesContext = createContext(null);

export function FavouritesProvider({ children }) {
  const { user, hydrated } = useAuth();
  const [ids, setIds] = useState(new Set());
  const [promptOpen, setPromptOpen] = useState(false);
  const migratedRef = useRef(false);

  // Favourites require an account. Guests get a sign-in prompt instead.
  // Any legacy guest favourites left in localStorage are migrated once on login.
  useEffect(() => {
    if (!hydrated) return;

    if (!user) {
      migratedRef.current = false;
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

  const closePrompt = useCallback(() => setPromptOpen(false), []);

  const isFavourite = useCallback((id) => !!user && ids.has(id), [ids, user]);

  const toggleFavourite = useCallback(async (car) => {
    if (!user) {
      setPromptOpen(true);
      return false;
    }

    const id = car.id;
    const wasFav = ids.has(id);

    setIds((prev) => {
      const next = new Set(prev);
      if (wasFav) next.delete(id); else next.add(id);
      return next;
    });

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
    <FavouritesContext.Provider value={{ isFavourite, toggleFavourite, count: user ? ids.size : 0 }}>
      {children}
      <SignInPrompt open={promptOpen} onClose={closePrompt} />
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  return ctx || { isFavourite: () => false, toggleFavourite: async () => false, count: 0 };
}
