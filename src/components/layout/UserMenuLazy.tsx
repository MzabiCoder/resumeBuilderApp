"use client";

import dynamic from "next/dynamic";
import type { UserMenuProps } from "./UserMenu";

const UserMenu = dynamic(() => import("./UserMenu").then((m) => m.UserMenu), {
  // Same-size placeholder avoids layout shift while the menu chunk loads.
  loading: () => <span aria-hidden="true" className="block size-11 rounded-full bg-primary-soft" />,
});

/** Code-split UserMenu so guests never download DropdownMenu/Popper code. */
export function UserMenuLazy(props: UserMenuProps) {
  return <UserMenu {...props} />;
}
