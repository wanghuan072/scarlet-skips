export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "Builds", href: "/builds" },
  { label: "Guides", href: "/guides" },
  { label: "Ending", href: "/ending" },
  { label: "High Score", href: "/high-score" },
  { label: "Updates", href: "/updates" },
  { label: "Tools", href: "/tools" },
] as const;

export const toolNavigation = [
  { label: "Pick My Upgrade", href: "/lab/pick-my-upgrade", icon: "cards", category: "Choose", description: "Compare the three cards on screen against your current goal and run state.", tone: "pink" },
  { label: "Run Recovery", href: "/lab/run-recovery", icon: "gauge", category: "Recover", description: "Identify the bottleneck that ended a run and get a short stabilization plan.", tone: "blue" },
  { label: "Ending Route", href: "/lab/ending-route", icon: "route", category: "Plan", description: "Follow and save the spoiler-light, control-first route toward the ending.", tone: "green" },
  { label: "My Runs", href: "/lab/my-runs", icon: "trophy", category: "Track", description: "Keep private scores, build notes and milestones in this browser.", tone: "gold" },
  { label: "Upgrade Matrix", href: "/upgrades/matrix", icon: "flask", category: "Compare", description: "Inspect documented two-card interactions, synergies and open questions.", tone: "purple" },
  { label: "Challenge Generator", href: "/challenges/generator", icon: "target", category: "Practice", description: "Generate a focused run constraint for practice or a different kind of attempt.", tone: "red" },
  { label: "Upgrade Database", href: "/upgrades", icon: "book", category: "Reference", description: "Browse every documented upgrade, its timing, stacks and related builds.", tone: "teal" },
] as const;

export const resourceNavigation = [
  { label: "All Upgrades", href: "/upgrades" },
  { label: "Tools", href: "/tools" },
  { label: "Challenges", href: "/challenges" },
  { label: "Game Info", href: "/game-info" },
  { label: "Upgrade Matrix", href: "/upgrades/matrix" },
] as const;

export const siteNavigation = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Copyright", href: "/copyright" },
  { label: "Sitemap", href: "/sitemap.xml" },
] as const;
