"use client";

import { keyBy } from "es-toolkit";
import { Crown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { Badge } from "@/components/ui/badge";
import { Box, Grid, HStack, VStack } from "@/components/ui/layout";
import { CatRadioGroup } from "@/features/landing/components/cat-radio-group";
import {
  nudgeCats,
  type ProfileCatId,
  profileCats,
} from "@/features/landing/data/home-cats";
import type { CatPickerContent } from "@/i18n/messages";
import { cn } from "@/lib/utils";

const catById = keyBy(profileCats, (cat) => cat.id);

/** 고양이를 고르면 내 프로필·친구 목록·앱 아이콘에 어떻게 보이는지 바로 보여 준다. */
export function CatPicker({
  content,
  className,
}: {
  content: CatPickerContent;
  className?: string;
}) {
  const [catId, setCatId] = useState<ProfileCatId>("default");
  const catSrc = catById[catId].src;
  return (
    <Grid
      align="center"
      className={cn(
        "gap-10 rounded-[2.5rem] bg-paper p-6 shadow-card sm:p-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 lg:p-12",
        className,
      )}
    >
      <VStack align="center" gap={8}>
        <ProfilePreview
          catId={catId}
          catSrc={catSrc}
          label={content.profileLabel}
          name={content.names[catId]}
        />
        <Grid className="w-full grid-cols-2 gap-3">
          <FriendListPreview catSrc={catSrc} content={content} />
          <AppIconPreview catId={catId} catSrc={catSrc} content={content} />
        </Grid>
      </VStack>
      <VStack gap={4}>
        <HStack
          render={<p />}
          align="center"
          gap={2}
          className="justify-center font-hand text-hand text-brand-deep"
        >
          <BrandMotif motif="paw" className="size-4" />
          {content.hint}
        </HStack>
        <CatRadioGroup
          aria-label={content.groupLabel}
          value={catId}
          onValueChange={setCatId}
          names={content.names}
        />
      </VStack>
    </Grid>
  );
}

function ProfilePreview({
  catId,
  catSrc,
  label,
  name,
}: {
  catId: ProfileCatId;
  catSrc: string;
  label: string;
  name: string;
}) {
  return (
    <VStack align="center" gap={4}>
      <span className="text-micro font-semibold text-muted-foreground">
        {label}
      </span>
      <Box className="relative grid size-48 place-items-center rounded-full bg-brand-soft sm:size-56">
        <BrandMotif
          motif="fish-bone"
          className="absolute top-4 -right-2 size-9 rotate-12 text-brand/45"
        />
        <BrandMotif
          motif="paw"
          className="absolute bottom-8 -left-1 size-6 -rotate-12 text-brand/40"
        />
        <Box
          key={catId}
          render={<span />}
          className="block size-36 animate-cat-pop rounded-full ring-4 ring-brand ring-offset-4 ring-offset-brand-soft sm:size-40"
        >
          <Image
            src={catSrc}
            alt=""
            width={160}
            height={160}
            sizes="(min-width: 640px) 160px, 144px"
            className="size-full rounded-full"
          />
        </Box>
        <Box
          key={`${catId}-name`}
          render={<span />}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 -rotate-3 animate-cat-pop rounded-full bg-ink px-4 py-0.5 font-hand text-hand whitespace-nowrap text-cream shadow-lift"
        >
          {name}
        </Box>
      </Box>
    </VStack>
  );
}

function FriendListPreview({
  catSrc,
  content,
}: {
  catSrc: string;
  content: CatPickerContent;
}) {
  const [dubuName, cheeseName] = content.friendNames;
  return (
    <VStack
      align="center"
      gap={3}
      className="rounded-2xl bg-muted/70 px-2 py-4"
    >
      <span className="text-micro font-semibold text-muted-foreground">
        {content.friendsLabel}
      </span>
      <HStack justify="center" gap={2} render={<ul />}>
        <FriendListPreview.Item src={catSrc} name={content.meLabel} isMe />
        <FriendListPreview.Item src={nudgeCats.dubu} name={dubuName} />
        <FriendListPreview.Item src={nudgeCats.cheese} name={cheeseName} />
      </HStack>
    </VStack>
  );
}

FriendListPreview.Item = function Item({
  src,
  name,
  isMe = false,
}: {
  src: string;
  name: string;
  isMe?: boolean;
}) {
  return (
    <VStack render={<li />} align="center" gap={1}>
      <Image
        src={src}
        alt=""
        width={40}
        height={40}
        sizes="40px"
        className={cn(
          "size-9 rounded-full sm:size-10",
          isMe && "ring-2 ring-brand ring-offset-2 ring-offset-muted",
        )}
      />
      <span
        className={cn(
          "max-w-12 truncate text-micro text-muted-foreground",
          isMe && "font-semibold text-foreground",
        )}
      >
        {name}
      </span>
    </VStack>
  );
};

function AppIconPreview({
  catId,
  catSrc,
  content,
}: {
  catId: ProfileCatId;
  catSrc: string;
  content: CatPickerContent;
}) {
  return (
    <VStack
      align="center"
      gap={3}
      className="rounded-2xl bg-muted/70 px-2 py-4"
    >
      <HStack align="center" justify="center" gap={1} wrap="wrap">
        <span className="text-micro font-semibold text-muted-foreground">
          {content.appIconLabel}
        </span>
        <Badge variant="soft" className="h-5 px-1.5 text-micro">
          {content.premiumBadge}
        </Badge>
      </HStack>
      <VStack align="center" gap={1}>
        <Box className="relative">
          <Image
            src={catSrc}
            alt=""
            width={48}
            height={48}
            sizes="48px"
            className="size-12 rounded-[28%] shadow-card"
          />
          {catId !== "default" && (
            <Box
              render={<span />}
              className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-ink text-brand ring-2 ring-muted"
            >
              <Crown aria-hidden="true" className="size-3" />
            </Box>
          )}
        </Box>
        <span className="text-micro text-muted-foreground">
          {content.appName}
        </span>
      </VStack>
    </VStack>
  );
}
