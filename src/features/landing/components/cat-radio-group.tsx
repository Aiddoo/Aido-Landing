"use client";

import { Radio } from "@base-ui/react/radio";
import Image from "next/image";
import type { ComponentProps } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import type {
  ProfileCat,
  ProfileCatId,
} from "@/features/landing/data/home-cats";
import { profileCats } from "@/features/landing/data/home-cats";
import { cn } from "@/lib/utils";

type CatRadioGroupProps = Omit<
  ComponentProps<typeof RadioGroup>,
  "children" | "value" | "defaultValue" | "onValueChange"
> & {
  value: ProfileCatId;
  onValueChange: (value: ProfileCatId) => void;
  names: Record<ProfileCatId, string>;
};

function isProfileCatId(value: unknown): value is ProfileCatId {
  return profileCats.some((cat) => cat.id === value);
}

/** 앱의 프로필 고르기처럼 고양이 9마리를 3×3으로 늘어놓고 하나를 고른다. 화살표 키로 옮겨 다닌다. */
export function CatRadioGroup({
  value,
  onValueChange,
  names,
  className,
  ...props
}: CatRadioGroupProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(next) => {
        if (isProfileCatId(next)) onValueChange(next);
      }}
      className={cn("grid-cols-3 gap-x-2 gap-y-4 sm:gap-x-4", className)}
      {...props}
    >
      {profileCats.map((cat) => (
        <CatRadioGroup.Item key={cat.id} cat={cat} name={names[cat.id]} />
      ))}
    </RadioGroup>
  );
}

CatRadioGroup.Item = function Item({
  cat,
  name,
}: {
  cat: ProfileCat;
  name: string;
}) {
  return (
    <Radio.Root
      value={cat.id}
      data-motion="pop"
      className="group/cat flex cursor-pointer flex-col items-center gap-2 rounded-2xl px-1 py-2 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/60"
    >
      <span className="block size-16 rounded-full ring-3 ring-transparent ring-offset-3 ring-offset-paper transition-[translate,scale,box-shadow] duration-300 ease-spring group-hover/cat:-translate-y-1 group-active/cat:scale-95 group-data-checked/cat:ring-brand sm:size-20">
        <Image
          src={cat.src}
          alt=""
          width={80}
          height={80}
          sizes="(min-width: 640px) 80px, 64px"
          className="size-full rounded-full"
        />
      </span>
      <span className="text-center text-caption leading-tight text-balance text-muted-foreground group-data-checked/cat:font-semibold group-data-checked/cat:text-foreground">
        {name}
      </span>
    </Radio.Root>
  );
};
