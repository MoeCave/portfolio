export const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

@keyframes __ls_blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
@keyframes __ls_slideIn {
  from { opacity: 0; transform: translateY(5px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes __ls_fadeOutUp {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-12px); }
}
@keyframes __ls_fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes __ls_flicker {
  0%,100% { opacity: 1; }
  94% { opacity: 1; }
  95% { opacity: 0.87; }
  96% { opacity: 1; }
  99% { opacity: 0.94; }
}
`;

export function injectGlobalStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("__ls-global__")) return;
  const el = document.createElement("style");
  el.id = "__ls-global__";
  el.textContent = GLOBAL_CSS;
  document.head.appendChild(el);
}