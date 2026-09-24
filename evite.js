/**
 * Video Evite — create a video invitation and share it for free.
 *
 * Everything runs in the browser: there is no server, no account and no upload.
 * Two ways to share:
 *   1. Shareable link  — event details (and a video *link*) are encoded in the URL hash.
 *   2. Download evite  — a single self-contained .html file with the uploaded video
 *                        embedded inside it, which can be emailed or messaged for free.
 */

(function () {
  "use strict";

  // ── Helpers ────────────────────────────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);

  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const MAX_FILE_BYTES = 50 * 1024 * 1024;  // hard stop — larger files break the embedded download
  const BIG_FILE_BYTES = 20 * 1024 * 1024;  // soft warning

  function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  // Base64url <-> UTF-8 JSON (URL-hash friendly, handles emoji/accents)
  function encodeState(obj) {
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    let bin = "";
    bytes.forEach((b) => { bin += String.fromCharCode(b); });
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function decodeState(str) {
    const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  }

  // ── Video link handling ────────────────────────────────────────────────────
  // Returns { kind: "iframe"|"file", src } or null when the URL is unusable.
  function parseVideoUrl(raw) {
    const value = (raw || "").trim();
    if (!value) return null;

    let url;
    try {
      url = new URL(value);
    } catch (_) {
      return null;
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;

    const host = url.hostname.replace(/^www\./, "").toLowerCase();

    // YouTube
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      const id = url.searchParams.get("v") || (url.pathname.match(/^\/(?:embed|shorts|v)\/([\w-]{6,})/) || [])[1];
      if (id) return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` };
    }
    if (host === "youtu.be") {
      const id = url.pathname.slice(1);
      if (id) return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` };
    }

    // Vimeo
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = (url.pathname.match(/(\d{6,})/) || [])[1];
      if (id) return { kind: "iframe", src: `https://player.vimeo.com/video/${encodeURIComponent(id)}` };
    }

    // Direct video file
    if (/\.(mp4|webm|ogg|ogv|mov|m4v)$/i.test(url.pathname)) {
      return { kind: "file", src: url.href };
    }

    return null;
  }

  /**
   * Final gate for any URL that ends up in a media `src`.
   * Only blob:, data:video/ and http(s) URLs pass, and HTML meta-characters are
   * percent-encoded so the value stays inert when the card is serialised to HTML.
   */
  function safeMediaSrc(src) {
    if (typeof src !== "string") return null;
    if (/^blob:/i.test(src) || /^data:video\//i.test(src)) return src;
    if (!/^https?:\/\//i.test(src)) return null;
    return src
      .replace(/</g, "%3C")
      .replace(/>/g, "%3E")
      .replace(/"/g, "%22")
      .replace(/'/g, "%27")
      .replace(/`/g, "%60")
      .replace(/\s/g, "%20");
  }

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    if (!y || !m || !d) return dateStr;
    const date = new Date(y, m - 1, d);
    if (Number.isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
  }

  function formatTime(timeStr) {
    if (!timeStr) return "";
    const [h, min] = timeStr.split(":").map(Number);
    if (Number.isNaN(h) || Number.isNaN(min)) return timeStr;
    const date = new Date(2000, 0, 1, h, min);
    return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  }

  function rsvpHref(value) {
    const v = (value || "").trim();
    if (!v) return null;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return `mailto:${v}`;
    const digits = v.replace(/[^\d+]/g, "");
    if (digits.length >= 7) return `tel:${digits}`;
    return null;
  }

  // ── Renderer ───────────────────────────────────────────────────────────────
  /**
   * Builds the evite card. `video` is { kind, src } or null.
   * All values are set through textContent / property assignment — never innerHTML —
   * so user supplied content can never inject markup.
   */
  function renderEvite(container, data, video) {
    container.textContent = "";
    container.setAttribute("data-evite-theme", data.theme || "midnight");

    const card = el("article", "evite-card");

    const mediaSrc = video ? safeMediaSrc(video.src) : null;
    if (mediaSrc) {
      const media = el("div", "evite-media");
      if (video.kind === "iframe") {
        const frame = document.createElement("iframe");
        frame.setAttribute("src", mediaSrc);
        frame.title = data.title ? `Video for ${data.title}` : "Invitation video";
        frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture";
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        frame.allowFullscreen = true;
        media.appendChild(frame);
      } else {
        const v = document.createElement("video");
        v.setAttribute("src", mediaSrc);
        v.controls = true;
        v.playsInline = true;
        v.preload = "metadata";
        media.appendChild(v);
      }
      card.appendChild(media);
    }

    const body = el("div", "evite-body");

    body.appendChild(el("p", "evite-kicker", "You're invited"));
    body.appendChild(el("h1", "evite-title", data.title || "Your event title"));
    if (data.host) body.appendChild(el("p", "evite-host", `Hosted by ${data.host}`));

    const details = el("div", "evite-details");
    const when = [formatDate(data.date), formatTime(data.time)].filter(Boolean).join(" · ");
    const rows = [
      ["🗓️", "When", when],
      ["📍", "Where", data.location],
    ];
    rows.forEach(([icon, label, value]) => {
      if (!value) return;
      const row = el("div", "evite-detail");
      row.appendChild(el("span", "evite-detail-icon", icon));
      const textWrap = el("div");
      textWrap.appendChild(el("span", "evite-detail-label", label));
      textWrap.appendChild(el("span", "evite-detail-value", value));
      row.appendChild(textWrap);
      details.appendChild(row);
    });
    if (details.childElementCount) body.appendChild(details);

    if (data.message) body.appendChild(el("p", "evite-message", data.message));

    if (data.rsvp) {
      const href = rsvpHref(data.rsvp);
      if (href) {
        const link = el("a", "evite-rsvp", `RSVP · ${data.rsvp}`);
        link.href = href;
        body.appendChild(link);
      } else {
        body.appendChild(el("p", "evite-message", `RSVP: ${data.rsvp}`));
      }
    }

    card.appendChild(body);
    container.appendChild(card);
  }

  // ── Guest view (opened from a shared link) ─────────────────────────────────
  function showSharedEvite(hash) {
    let data;
    try {
      data = decodeState(hash);
    } catch (_) {
      return false;
    }
    if (!data || typeof data !== "object") return false;

    const view = $("#evite-view");
    const builder = $("#builder");
    renderEvite(view, data, parseVideoUrl(data.videoUrl));

    const footer = el("p", "evite-footer");
    const link = el("a", null, "Make your own free video evite");
    link.href = "evite.html";
    footer.appendChild(link);
    view.appendChild(footer);

    view.hidden = false;
    if (builder) builder.hidden = true;
    if (data.title) document.title = `${data.title} — You're invited`;
    return true;
  }

  // ── Builder ────────────────────────────────────────────────────────────────
  function initBuilder() {
    const fields = {
      title: $("#f-title"),
      host: $("#f-host"),
      date: $("#f-date"),
      time: $("#f-time"),
      location: $("#f-location"),
      message: $("#f-message"),
      rsvp: $("#f-rsvp"),
      theme: $("#f-theme"),
      url: $("#f-url"),
    };

    const preview = $("#preview");
    const status = $("#share-status");
    const shareLink = $("#share-link");
    const fileInput = $("#f-file");
    const fileInfo = $("#file-info");
    const dropzone = $("#dropzone");

    let videoFile = null;      // File chosen by the user
    let videoObjectUrl = null; // Object URL used for the live preview
    let mode = "upload";       // "upload" | "link"

    function readFields() {
      return {
        title: fields.title.value.trim(),
        host: fields.host.value.trim(),
        date: fields.date.value,
        time: fields.time.value,
        location: fields.location.value.trim(),
        message: fields.message.value.trim(),
        rsvp: fields.rsvp.value.trim(),
        theme: fields.theme.value,
        videoUrl: mode === "link" ? fields.url.value.trim() : "",
      };
    }

    function currentVideo() {
      if (mode === "link") return parseVideoUrl(fields.url.value);
      if (videoObjectUrl) return { kind: "file", src: videoObjectUrl };
      return null;
    }

    function update() {
      renderEvite(preview, readFields(), currentVideo());
    }

    Object.values(fields).forEach((input) => {
      input.addEventListener("input", update);
      input.addEventListener("change", update);
    });

    // Tabs
    function setMode(next) {
      mode = next;
      const isUpload = next === "upload";
      $("#tab-upload").classList.toggle("is-active", isUpload);
      $("#tab-link").classList.toggle("is-active", !isUpload);
      $("#tab-upload").setAttribute("aria-selected", String(isUpload));
      $("#tab-link").setAttribute("aria-selected", String(!isUpload));
      $("#panel-upload").hidden = !isUpload;
      $("#panel-link").hidden = isUpload;
      update();
    }
    $("#tab-upload").addEventListener("click", () => setMode("upload"));
    $("#tab-link").addEventListener("click", () => setMode("link"));

    // File selection
    function clearFile() {
      if (videoObjectUrl) URL.revokeObjectURL(videoObjectUrl);
      videoFile = null;
      videoObjectUrl = null;
      fileInput.value = "";
    }

    function acceptFile(file) {
      if (!file) return;
      if (!file.type.startsWith("video/")) {
        clearFile();
        fileInfo.textContent = "That file isn't a video. Please choose an MP4, WebM or MOV file.";
        setMode("upload");
        return;
      }
      if (file.size > MAX_FILE_BYTES) {
        clearFile();
        fileInfo.textContent = `That video is ${formatBytes(file.size)} — too large to share. Please pick one under ${formatBytes(MAX_FILE_BYTES)}.`;
        setMode("upload");
        return;
      }
      clearFile();
      videoFile = file;
      videoObjectUrl = URL.createObjectURL(file);
      fileInfo.textContent = `${file.name} · ${formatBytes(file.size)}` +
        (file.size > BIG_FILE_BYTES ? " — large videos make the downloaded evite heavy to send." : "");
      setMode("upload");
    }

    fileInput.addEventListener("change", () => acceptFile(fileInput.files && fileInput.files[0]));

    ["dragenter", "dragover"].forEach((evt) =>
      dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.add("is-over"); })
    );
    dropzone.addEventListener("dragleave", (e) => {
      if (!dropzone.contains(e.relatedTarget)) dropzone.classList.remove("is-over");
    });
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("is-over");
      acceptFile(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]);
    });

    // ── Share: link ──────────────────────────────────────────────────────────
    function buildShareUrl() {
      const data = readFields();
      const url = new URL(window.location.href);
      url.hash = encodeState(data);
      url.search = "";
      return url.href;
    }

    async function copyShareLink() {
      const data = readFields();
      if (mode === "link" && data.videoUrl && !parseVideoUrl(data.videoUrl)) {
        status.textContent = "That video link isn't supported. Use a YouTube or Vimeo link, or a direct .mp4/.webm URL.";
        return;
      }

      const href = buildShareUrl();
      shareLink.value = href;
      shareLink.hidden = false;

      let note = "Link copied — paste it anywhere to share your evite.";
      if (mode === "upload" && videoFile) {
        note = "Link copied. Heads up: an uploaded video can't travel inside a link — " +
               "use “Download evite” to share the video itself, or switch to a video link.";
      }

      try {
        await navigator.clipboard.writeText(href);
        status.textContent = note;
      } catch (_) {
        shareLink.select();
        status.textContent = "Copy the link below to share your evite.";
      }
    }

    $("#btn-link").addEventListener("click", copyShareLink);

    if (navigator.share) {
      const shareBtn = $("#btn-share");
      shareBtn.hidden = false;
      shareBtn.addEventListener("click", async () => {
        try {
          await navigator.share({ title: readFields().title || "You're invited", url: buildShareUrl() });
        } catch (_) { /* user cancelled */ }
      });
    }

    // ── Share: self-contained download ───────────────────────────────────────
    async function getStylesheetText() {
      try {
        const res = await fetch("evite.css");
        if (res.ok) return await res.text();
      } catch (_) { /* fall through */ }
      // Fallback: read the already-parsed stylesheet (same-origin)
      const sheet = Array.from(document.styleSheets).find((s) => (s.href || "").includes("evite.css"));
      try {
        return sheet ? Array.from(sheet.cssRules).map((r) => r.cssText).join("\n") : "";
      } catch (_) {
        return "";
      }
    }

    function readFileAsDataUrl(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
    }

    async function downloadEvite() {
      const data = readFields();
      status.textContent = "Building your evite file…";

      let video = null;
      if (mode === "link") {
        video = parseVideoUrl(data.videoUrl);
        if (data.videoUrl && !video) {
          status.textContent = "That video link isn't supported. Use a YouTube or Vimeo link, or a direct .mp4/.webm URL.";
          return;
        }
      } else if (videoFile) {
        try {
          video = { kind: "file", src: await readFileAsDataUrl(videoFile) };
        } catch (_) {
          status.textContent = "Couldn't read that video file. Please choose it again.";
          return;
        }
      }

      const holder = document.createElement("div");
      holder.className = "evite-view";
      renderEvite(holder, data, video);

      const css = await getStylesheetText();
      const safeTitle = (data.title || "You're invited").replace(/[<>&]/g, "");
      const doc =
        "<!DOCTYPE html>\n" +
        '<html lang="en">\n<head>\n<meta charset="UTF-8" />\n' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
        `<title>${safeTitle}</title>\n` +
        '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />\n' +
        `<style>\n${css}\n</style>\n</head>\n<body>\n${holder.outerHTML}\n</body>\n</html>\n`;

      const blob = new Blob([doc], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(data.title || "evite").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "evite"}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      const embedded = video && typeof video.src === "string" && video.src.startsWith("data:");
      status.textContent = `Downloaded ${a.download} (${formatBytes(blob.size)}). ` +
        (embedded
          ? "Send that single file by email, text or chat — the video is inside it, so it plays without streaming."
          : "Send that single file by email, text or chat — it needs an internet connection to play the linked video.");
    }

    $("#btn-download").addEventListener("click", downloadEvite);

    update();
  }

  // ── Boot ───────────────────────────────────────────────────────────────────
  const hash = window.location.hash.slice(1);
  if (!hash || !showSharedEvite(hash)) {
    initBuilder();
  }
})();
