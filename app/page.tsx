"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800 px-6">
      <div className="text-center">

        {/* Logo animado */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-red-500 dark:from-red-600 dark:to-pink-700 flex items-center justify-center shadow-xl">
            <span className="text-white text-5xl font-bold">🔥</span>
          </div>
        </motion.div>

        {/* Título animado */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl font-extrabold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-6xl"
        >
          Welcome to <span className="text-red-500 dark:text-red-400">Stream Match</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 text-lg text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto"
        >
          Find amazing people near you. Swipe, connect, and enjoy the experience.
        </motion.p>

        {/* Botones */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link
            href="/matches"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Empezar a deslizar
          </Link>

          <Link
            href="/profile"
            className="px-6 py-3 rounded-full bg-white dark:bg-gray-700 text-zinc-800 dark:text-zinc-100 font-semibold border border-red-300 dark:border-gray-600 shadow hover:shadow-md transition-all hover:scale-105"
          >
            Ver mi perfil
          </Link>
        </motion.div>

        {/* Pequeña animación decorativa */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 1.2, duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="mt-10 text-6xl select-none"
        >
          ❤️
        </motion.div>
      </div>
    </div>
  );
}
