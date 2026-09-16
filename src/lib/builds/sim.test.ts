import { describe, expect, it } from "vitest";
import { advanceSkipBatch, applyUpgrade, drawForLevel, freshState, jumpsNeeded, skipOnce } from "./sim";

describe("run model", () => {
  it("starts with one rope and increases progress without changing the input", () => {
    const state = freshState();
    const result = skipOnce(state, () => 1);
    expect(result.loops).toBe(1);
    expect(result.state.jumpProgress).toBe(1);
    expect(state.jumpProgress).toBe(0);
  });

  it("uses injected randomness for Luck and weighted card draws", () => {
    const state = { ...freshState(), level: 12, luck: 1, rocketShoes: true };
    expect(skipOnce(state, () => 0).lucky).toBe(1);
    expect(skipOnce(state, () => 1).lucky).toBe(0);
    const cards = drawForLevel(state, () => 0).map((item) => item.slug);
    expect(cards).toHaveLength(3);
    expect(new Set(cards).size).toBe(3);
    expect(drawForLevel({ ...state, gone: [cards[0]] }, () => 0).some((item) => item.slug === cards[0])).toBe(false);
  });

  it("continues from a 40-skip batch until a high level actually completes", () => {
    const initial = { ...freshState(), level: 10 };
    expect(jumpsNeeded(initial.level)).toBeGreaterThan(40);
    const first = advanceSkipBatch(initial, 40, () => 1);
    expect(first.leveled).toBe(false);
    expect(first.jumps).toBe(40);
    const second = advanceSkipBatch(first.state, 40, () => 1);
    expect(second.leveled).toBe(true);
    expect(second.jumps).toBe(jumpsNeeded(10) - 40);
  });

  it("refills fuel on a new card and removes a one-time card from the pool", () => {
    const state = applyUpgrade(freshState(), "upgrade-rocket-fuel").state;
    const burned = skipOnce(state, () => 1).state;
    expect(burned.fuel).toBe(0);
    expect(applyUpgrade(burned, "increase-jump-height").state.fuel).toBe(1);
    const charged = applyUpgrade(state, "charge-jump").state;
    expect(charged.gone).toContain("charge-jump");
  });

  it("rejects an invalid batch size", () => {
    expect(() => advanceSkipBatch(freshState(), 0)).toThrow(RangeError);
  });
});
