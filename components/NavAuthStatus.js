"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NavAuthStatus() {
  const [status, setStatus] = useState({
    loading: true,
    loggedIn: false,
    email: null,
    picture: null,
  });

  useEffect(function () {
    fetch("/api/me")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setStatus({
          loading: false,
          loggedIn: data.loggedIn,
          email: data.email || null,
          picture: data.picture || null,
        });
      })
      .catch(function () {
        setStatus({ loading: false, loggedIn: false, email: null, picture: null });
      });
  }, []);

  if (status.loading) {
    return null;
  }

  if (status.loggedIn) {
    return (
      <Link href="/dashboard" className="flex items-center gap-1.5">
        {status.picture ? (
          <img
            src={status.picture}
            alt={status.email}
            className="h-7 w-7 flex-shrink-0 rounded-full border border-white/20"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#0B6E62] text-xs font-bold text-white">
            {status.email ? status.email[0].toUpperCase() : "?"}
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link href="/login" className="hover:text-white">
      Log in
    </Link>
  );
}
