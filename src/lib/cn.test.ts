import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("keeps custom font sizes alongside colours", () => {
    expect(cn("text-display-xl", "text-ink")).toBe("text-display-xl text-ink");
  });
  it("resolves conflicts, last wins", () => {
    expect(cn("px-2", false, "px-4")).toBe("px-4");
    expect(cn("text-display-sm", "text-display-lg")).toBe("text-display-lg");
  });
});
