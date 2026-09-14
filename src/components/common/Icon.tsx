import type { ReactNode } from "react";
import type { IconName } from "@/types/content";

export function Icon({
  name,
  size = 24,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" {...common}/><path d="m14 7 5 5-5 5" {...common}/></>,
    award: <><circle cx="12" cy="8" r="5" {...common}/><path d="m8.5 12-1 9 4.5-2 4.5 2-1-9" {...common}/></>,
    book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v18H7.5A3.5 3.5 0 0 0 4 23z" {...common}/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H12v18h4.5a3.5 3.5 0 0 1 3.5 3z" {...common}/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" {...common}/><path d="M8 3v4M16 3v4M3 10h18" {...common}/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" {...common}/></>,
    cards: <><rect x="5" y="3" width="13" height="18" rx="2" {...common}/><path d="m9 8 3-2 3 2-3 3zM9 15h6" {...common}/><path d="M3 7H2v13a2 2 0 0 0 2 2h10v-1" {...common}/></>,
    check: <path d="m5 12 4 4L19 6" {...common}/>,
    clover: <><path d="M12 12c-5-1-7-4-5-6 2-2 5 0 5 3 0-3 3-5 5-3 2 2 0 5-5 6 5 1 7 4 5 6-2 2-5 0-5-3 0 3-3 5-5 3-2-2 0-5 5-6Z" {...common}/><path d="M12 12v10" {...common}/></>,
    controller: <><path d="M7 8h10a5 5 0 0 1 4.7 6.7l-1 3A2.5 2.5 0 0 1 16.5 19L14 16h-4l-2.5 3a2.5 2.5 0 0 1-4.2-1.3l-1-3A5 5 0 0 1 7 8Z" {...common}/><path d="M7 12v4M5 14h4M17 13h.01M19 15h.01" {...common}/></>,
    fire: <path d="M12 22c4.5 0 7-2.9 7-6.8 0-3.2-1.7-5.7-4.7-8.2.1 2-1 3.3-2.2 4.1.1-3.8-2-6.7-4.8-9.1.3 4-2.3 6-2.3 9.8C5 17.2 7.6 22 12 22Zm0-1c-1.7 0-3-1.2-3-3 0-1.5.8-2.6 2.3-3.8-.1 1 .4 1.8 1.2 2.3.1-1.5.8-2.5 1.7-3.3.2 1.7.8 2.8.8 4.5 0 2-1.3 3.3-3 3.3Z" {...common}/>,
    flask: <><path d="M9 2h6M10 2v6l-6 10a2.5 2.5 0 0 0 2.2 4h11.6a2.5 2.5 0 0 0 2.2-4L14 8V2" {...common}/><path d="M7 16h10" {...common}/></>,
    gauge: <><path d="M4 18a8 8 0 1 1 16 0" {...common}/><path d="m12 18 4-6M7 18h10" {...common}/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" {...common}/>,
    home: <><path d="m3 11 9-8 9 8" {...common}/><path d="M5 10v11h14V10M9 21v-7h6v7" {...common}/></>,
    info: <><circle cx="12" cy="12" r="9" {...common}/><path d="M12 11v6M12 7h.01" {...common}/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" {...common}/></>,
    minus: <path d="M5 12h14" {...common}/>,
    plus: <><path d="M12 5v14M5 12h14" {...common}/></>,
    rocket: <><path d="M14 4c3-2 5-2 6-2 0 1 0 3-2 6l-5 7-4-4z" {...common}/><path d="m9 11-4 1-3 3 6 1M13 15l-1 4-3 3-1-6M6 18l-2 2" {...common}/><circle cx="15.5" cy="6.5" r="1.5" {...common}/></>,
    rope: <><path d="M6 4v7a6 6 0 0 0 12 0V4" {...common}/><path d="M4 2h4v5H4zM16 2h4v5h-4z" {...common}/></>,
    route: <><circle cx="6" cy="18" r="2" {...common}/><circle cx="18" cy="6" r="2" {...common}/><path d="M8 18h2a4 4 0 0 0 4-4v-4a4 4 0 0 1 4-4" {...common}/></>,
    search: <><circle cx="11" cy="11" r="7" {...common}/><path d="m20 20-4-4" {...common}/></>,
    shield: <path d="M12 3 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z" {...common}/>,
    shoe: <><path d="M5 15c3 0 4-4 5-8l4 3 2 4 4 2c1 1 1 4-1 5H7c-4 0-5-5-2-6Z" {...common}/><path d="M7 17h11M11 10l3 2" {...common}/></>,
    spark: <path d="m12 2 2.6 6.6L22 11l-6 4.2.2 7.3-5.9-4.3-5.9 4.3.2-7.3L-1.4 11 6 8.6z" {...common}/>,
    speed: <><path d="M4 7h9M2 12h11M4 17h9" {...common}/><path d="m14 7 6 5-6 5z" {...common}/></>,
    target: <><circle cx="12" cy="12" r="9" {...common}/><circle cx="12" cy="12" r="4" {...common}/><path d="M12 3v3M21 12h-3M12 21v-3M3 12h3" {...common}/></>,
    trophy: <><path d="M7 3h10v5a5 5 0 0 1-10 0zM12 13v5M8 22h8M9 18h6" {...common}/><path d="M7 5H3v2a4 4 0 0 0 4 4M17 5h4v2a4 4 0 0 1-4 4" {...common}/></>,
    x: <><path d="M6 6l12 12M18 6 6 18" {...common}/></>,
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
