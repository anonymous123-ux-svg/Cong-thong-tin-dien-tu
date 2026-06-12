"use client";

import { Copy, Send, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type InviteTab = "email" | "link";

type InviteMembersModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: string;
  classTitle: string;
};

function defaultMessageForClass(classTitle: string) {
  return `Join our ${classTitle} cohort on The Academic Curator. We'll be collaborating on modern UI research and quantum interface design this semester.`;
}

function isProbablyEmail(value: string) {
  const v = value.trim();
  if (!v) return false;
  if (!v.includes("@")) return false;
  if (v.startsWith("@") || v.endsWith("@")) return false;
  return true;
}

function splitEmails(value: string) {
  return value
    .split(/[\s,;]+/g)
    .map((v) => v.trim())
    .filter(Boolean);
}

export default function InviteMembersModal({
  open,
  onOpenChange,
  classId,
  classTitle,
}: InviteMembersModalProps) {
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);

  const [activeTab, setActiveTab] = useState<InviteTab>("email");
  const [emails, setEmails] = useState<string[]>([
    "j.doe@uni.edu",
    "s.smith@uni.edu",
  ]);
  const [emailInput, setEmailInput] = useState<string>("");
  const [message, setMessage] = useState<string>(
    defaultMessageForClass(classTitle),
  );
  const [origin, setOrigin] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const emailInputRef = useRef<HTMLInputElement>(null);

  const inviteLink = useMemo(() => {
    if (!origin) return "";
    return `${origin}/class/classes/${classId}/members`;
  }, [origin, classId]);

  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setEntered(false);
    window.setTimeout(() => onOpenChange(false), 200);
  }, [closing, onOpenChange]);

  useEffect(() => {
    setMessage(defaultMessageForClass(classTitle));
  }, [classTitle]);

  useEffect(() => {
    if (!open) return;

    setOrigin(window.location.origin);

    setClosing(false);
    setEntered(false);

    const id = window.requestAnimationFrame(() => setEntered(true));

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
      window.cancelAnimationFrame(id);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, requestClose]);

  useEffect(() => {
    if (!open) return;
    if (activeTab !== "email") return;

    emailInputRef.current?.focus();
  }, [open, activeTab]);

  function addEmails(values: string[]) {
    const next = values.map((v) => v.trim()).filter(isProbablyEmail);

    if (next.length === 0) return;

    setEmails((prev) => {
      const set = new Set(prev);
      for (const v of next) set.add(v);
      return Array.from(set);
    });
  }

  async function copyInviteLink() {
    if (!inviteLink) return;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  if (!open) return null;

  const visible = entered && !closing;

  return (
    <div
      className={
        visible
          ? "fixed inset-0 z-110 flex items-center justify-center bg-black/40 p-4 opacity-100 backdrop-blur-sm transition-opacity duration-200"
          : "fixed inset-0 z-110 flex items-center justify-center bg-black/40 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-200"
      }
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Invite Members"
    >
      <div
        className={
          visible
            ? "w-full max-w-lg translate-y-0 scale-100 overflow-hidden rounded-3xl bg-white shadow-2xl transition-transform duration-200"
            : "w-full max-w-lg translate-y-1 scale-[0.98] overflow-hidden rounded-3xl bg-white shadow-2xl transition-transform duration-200"
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Invite Members</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={requestClose}
            className="cursor-pointer rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            type="button"
            onClick={() => setActiveTab("email")}
            className={
              activeTab === "email"
                ? "cursor-pointer px-2 py-4 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600"
                : "cursor-pointer px-2 py-4 text-sm font-semibold text-gray-500 transition-colors hover:text-indigo-600"
            }
          >
            Email Invite
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("link")}
            className={
              activeTab === "link"
                ? "cursor-pointer px-6 py-4 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600"
                : "cursor-pointer px-6 py-4 text-sm font-semibold text-gray-500 transition-colors hover:text-indigo-600"
            }
          >
            Invite Link
          </button>
        </div>

        {activeTab === "email" ? (
          <div className="space-y-6 p-6">
            {/* Recipient Emails */}
            <div>
              <label
                htmlFor="invite-recipient-emails"
                className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-500"
              >
                Recipient Emails
              </label>

              <div className="flex flex-wrap gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2 transition-all focus-within:ring-2 focus-within:ring-indigo-200">
                {emails.map((email) => (
                  <span
                    key={email}
                    className="inline-flex items-center gap-1 rounded-lg bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700"
                  >
                    {email}
                    <button
                      type="button"
                      aria-label={`Remove ${email}`}
                      onClick={() =>
                        setEmails((prev) => prev.filter((e) => e !== email))
                      }
                      className="cursor-pointer rounded p-0.5 hover:bg-indigo-200"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </span>
                ))}

                <input
                  ref={emailInputRef}
                  id="invite-recipient-emails"
                  aria-label="Recipient emails"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
                      const values = splitEmails(emailInput);
                      if (values.length > 0) {
                        e.preventDefault();
                        addEmails(values);
                        setEmailInput("");
                      }
                    }
                  }}
                  onPaste={(e) => {
                    const text = e.clipboardData.getData("text");
                    const values = splitEmails(text);
                    if (values.length > 1) {
                      e.preventDefault();
                      addEmails(values);
                    }
                  }}
                  placeholder="Add more..."
                  className="min-w-30 flex-1 border-none bg-transparent py-1 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            {/* Custom Message */}
            <div>
              <label
                htmlFor="invite-custom-message"
                className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-500"
              >
                Custom Message
              </label>
              <textarea
                id="invite-custom-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-200 bg-indigo-50 p-4 text-sm text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {/* Send Button */}
            <button
              type="button"
              onClick={requestClose}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98]"
            >
              <Send className="h-5 w-5" aria-hidden="true" />
              Send Invitations
            </button>
          </div>
        ) : (
          <div className="space-y-6 p-6">
            {/* Invite Link */}
            <div>
              <label
                htmlFor="invite-link"
                className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-500"
              >
                Invite Link
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2">
                <input
                  id="invite-link"
                  aria-label="Invite link"
                  value={inviteLink}
                  readOnly
                  className="flex-1 border-none bg-transparent px-2 py-2 text-sm text-gray-700 focus:ring-0 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={copyInviteLink}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Send Button */}
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98]"
            >
              <Send className="h-5 w-5" aria-hidden="true" />
              Send Invitations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
