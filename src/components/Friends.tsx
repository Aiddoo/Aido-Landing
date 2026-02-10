"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { MessageCatalog } from "@/i18n/messages";

type FriendsProps = {
  content: MessageCatalog["friends"];
};

export function Friends({ content }: FriendsProps) {
  return (
    <section
      id="friends"
      className="px-6 py-24 sm:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e0d8_1px,transparent_1px)] bg-size-[20px_20px]" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center space-y-4">
          <div className="inline-block px-4 py-1 bg-brand text-white wobbly-md border-2 border-foreground hand-shadow -rotate-2 font-bold mb-4">
            {content.label}
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            {content.title}
          </h2>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {content.descriptionLead}{" "}
            <span className="block sm:inline mt-1 sm:mt-0">
              {content.descriptionTail}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {content.cards.map((friend, index) => (
            <motion.div
              key={friend.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              style={{ rotate: friend.rotate }}
              className="group relative flex flex-col items-center gap-6 rounded-sm border-2 border-foreground bg-white p-6 hand-shadow-hover hand-shadow cursor-pointer"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-foreground opacity-10 -rotate-2" />

              <div
                className="relative h-24 w-24 overflow-hidden wobbly-md border-2 border-foreground sm:h-32 sm:w-32"
                style={{ backgroundColor: friend.color }}
              >
                <Image
                  src={friend.path}
                  alt={friend.name}
                  fill
                  className="object-cover p-2"
                />
              </div>
              <span className="text-lg font-bold text-foreground">
                {friend.name}
              </span>

              <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full border border-foreground" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
