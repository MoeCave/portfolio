export const ASCII_TITLE = `
 ██████╗ ██╗      ██████╗ ██╗    ██╗██╗███╗   ██╗ ██████╗
 ██╔══██╗██║     ██╔═══██╗██║    ██║██║████╗  ██║██╔════╝
 ██████╔╝██║     ██║   ██║██║ █╗ ██║██║██╔██╗ ██║██║  ███╗
 ██╔══██╗██║     ██║   ██║██║███╗██║██║██║╚██╗██║██║   ██║
 ██████╔╝███████╗╚██████╔╝╚███╔███╔╝██║██║ ╚████║╚██████╔╝
 ╚═════╝ ╚══════╝ ╚═════╝  ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝

 ███████╗███████╗██╗   ██╗███████╗██████╗
 ██╔════╝██╔════╝██║   ██║██╔════╝██╔══██╗
 █████╗  █████╗  ██║   ██║█████╗  ██████╔╝
 ██╔══╝  ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██╔══██╗
 ██║     ███████╗ ╚████╔╝ ███████╗██║  ██║
 ╚═╝     ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
`.trim();

export const MESSAGES = [
  "> Loading UI modules...",
  "> Initializing shaders...",
  "> Fetching projects...",
  "> Wiring dev tools...",
  "> Compiling asset manifest...",
  "> Mounting filesystem...",
  "> Calibrating display matrix...",
  "> Verifying checksums...",
  "> Spawning workers...",
  "> Almost there...",
];

export function getVisibleCount(pct) {
  return Math.min(MESSAGES.length, Math.ceil((pct / 100) * MESSAGES.length));
}