import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { SearchBox } from "./SearchBox";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

const index = [
  { title: "Rocket Fuel", subtitle: "Upgrade", href: "/upgrades/upgrade-rocket-fuel", text: "rocket fuel airtime" },
  { title: "High Score", subtitle: "Guide", href: "/guides/high-score", text: "rocket score" },
];

beforeEach(() => push.mockClear());
afterEach(cleanup);

it("submits Enter to the full search page, not the first suggestion", () => {
  const { container } = render(<SearchBox index={index} />);
  const input = screen.getByRole("searchbox");
  fireEvent.change(input, { target: { value: "rocket" } });
  fireEvent.submit(container.querySelector("form")!);
  expect(push).toHaveBeenCalledWith("/search?q=rocket");
});

it("exposes suggestions as keyboard-activatable links and closes with Escape", () => {
  render(<SearchBox index={index} />);
  const input = screen.getByRole("searchbox");
  fireEvent.focus(input);
  const link = screen.getByRole("link", { name: /Rocket Fuel/ });
  expect(link.getAttribute("href")).toBe("/upgrades/upgrade-rocket-fuel");
  fireEvent.keyDown(input, { key: "Escape" });
  expect(screen.queryByRole("link", { name: /Rocket Fuel/ })).toBeNull();
});
