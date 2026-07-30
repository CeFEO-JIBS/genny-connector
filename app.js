// Click-to-copy for the connector address.
//
// It used to be a link. Following it in a browser hits the MCP endpoint, which answers
// "405 POST only" — a dead end for the one action every visitor to this page wants.
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".url");
  if (!btn) return;
  const text = btn.dataset.copy || btn.textContent.trim();
  const hint = btn.querySelector(".hint");
  const say = (msg) => {
    if (hint) hint.textContent = msg;
    const live = document.getElementById("copy-status");
    if (live) live.textContent = msg === "Copied" ? "Address copied to clipboard" : msg;
  };
  try {
    await navigator.clipboard.writeText(text);
    say("Copied");
  } catch {
    // Clipboard API needs a secure context and permission. If either is missing, select
    // the text so ⌘C still works rather than leaving the click doing nothing at all.
    const r = document.createRange();
    r.selectNodeContents(btn.querySelector(".addr") || btn);
    const sel = getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
    say("Press ⌘C");
  }
  setTimeout(() => say("Copy"), 2200);
});
