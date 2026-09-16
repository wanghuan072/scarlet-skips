import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { RunBuilder } from "./RunBuilder";

vi.mock("next/image", () => ({ default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} /> }));
vi.mock("@/lib/builds/sim", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/builds/sim")>();
  return { ...actual, freshState: () => ({ ...actual.freshState(), level: 10 }) };
});

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

it("announces the selected destination and finishes after more than 40 skips", () => {
  const pick = vi.fn();
  render(<RunBuilder destination="score" onPickDestination={pick} />);
  expect(screen.getByRole("button", { name: "Score" }).getAttribute("aria-pressed")).toBe("true");
  expect(screen.getByRole("button", { name: "Moon" }).getAttribute("aria-pressed")).toBe("false");
  fireEvent.click(screen.getByRole("button", { name: "Moon" }));
  expect(pick).toHaveBeenCalledWith("moon");
  fireEvent.click(screen.getByRole("button", { name: "Until level-up" }));
  expect(screen.getByRole("button", { name: "Stop" })).toBeDefined();
  act(() => vi.runAllTimers());
  expect(screen.getByRole("heading", { name: "Three cards. One pick." })).toBeDefined();
  expect(screen.queryByRole("button", { name: "Stop" })).toBeNull();
});

it("cancels pending batches on Reset and does not resume afterward", () => {
  render(<RunBuilder />);
  fireEvent.click(screen.getByRole("button", { name: "Until level-up" }));
  fireEvent.click(screen.getByRole("button", { name: "Reset" }));
  act(() => vi.runAllTimers());
  expect(screen.getByText("Fresh run. One rope. One loop per skip.")).toBeDefined();
  expect(screen.queryByRole("heading", { name: "Three cards. One pick." })).toBeNull();
});

it("stops an in-progress jump and permits a manual skip", () => {
  render(<RunBuilder />);
  fireEvent.click(screen.getByRole("button", { name: "Until level-up" }));
  expect(screen.getByRole("button", { name: "Skip" }).hasAttribute("disabled")).toBe(true);
  fireEvent.click(screen.getByRole("button", { name: "Stop" }));
  act(() => vi.runAllTimers());
  expect(screen.queryByRole("heading", { name: "Three cards. One pick." })).toBeNull();
  expect(screen.getByText("Stopped. Continue with Skip or Until level-up.")).toBeDefined();
  expect(screen.getByRole("button", { name: "Skip" }).hasAttribute("disabled")).toBe(false);
  fireEvent.click(screen.getByRole("button", { name: "Skip" }));
  expect(screen.queryByText("Stopped. Continue with Skip or Until level-up.")).toBeNull();
});

it("clears pending batches when unmounted", () => {
  const view = render(<RunBuilder />);
  fireEvent.click(screen.getByRole("button", { name: "Until level-up" }));
  view.unmount();
  act(() => vi.runAllTimers());
  expect(vi.getTimerCount()).toBe(0);
});
