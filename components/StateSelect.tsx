"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "./Icon";
import { US_STATES } from "@/lib/site";

type Props = {
  id: string;
  name: string;
  value: string;
  onChange: (code: string) => void;
  invalid?: boolean;
  describedBy?: string;
};

// Custom listbox so the open list matches the design (native <select> popups can't be styled).
export function StateSelect({ id, name, value, onChange, invalid, describedBy }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", at: 0 });
  const listId = useId();

  const selectedIndex = US_STATES.findIndex(([code]) => code === value);
  const label = selectedIndex >= 0 ? US_STATES[selectedIndex][1] : "";

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the highlighted option visible.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openList = () => {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  const choose = (i: number) => {
    onChange(US_STATES[i][0]);
    setOpen(false);
  };

  const typeAhead = (key: string) => {
    const now = Date.now();
    const t = typed.current;
    t.text = now - t.at > 700 ? key : t.text + key;
    t.at = now;
    const i = US_STATES.findIndex(([, n]) => n.toLowerCase().startsWith(t.text.toLowerCase()));
    if (i >= 0) {
      setActive(i);
      if (!open) onChange(US_STATES[i][0]);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const last = US_STATES.length - 1;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp": {
        e.preventDefault();
        if (!open) return openList();
        setActive((a) => Math.min(last, Math.max(0, a + (e.key === "ArrowDown" ? 1 : -1))));
        return;
      }
      case "Home": case "End":
        if (open) { e.preventDefault(); setActive(e.key === "Home" ? 0 : last); }
        return;
      case "Enter": case " ":
        e.preventDefault();
        if (open) choose(active); else openList();
        return;
      case "Escape":
        if (open) { e.preventDefault(); setOpen(false); }
        return;
      case "Tab":
        setOpen(false);
        return;
      default:
        if (e.key.length === 1 && /[a-z]/i.test(e.key)) typeAhead(e.key);
    }
  };

  return (
    <div className={`select${open ? " open" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="input select-trigger"
        id={id}
        name={name}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
      >
        <span className={label ? "" : "placeholder"}>{label || "Select a state"}</span>
        <Icon name="chevron-down" />
      </button>
      {open && (
        <div className="select-pop">
          <ul className="select-list" role="listbox" id={listId} aria-labelledby={id} ref={listRef}>
            {US_STATES.map(([code, stateName], i) => (
              <li
                key={code}
                id={`${listId}-${i}`}
                data-index={i}
                role="option"
                aria-selected={code === value}
                className={i === active ? "active" : undefined}
                onPointerMove={() => setActive(i)}
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
              >
                <span>{stateName}</span>
                <span className="code">{code}</span>
                {code === value && <Icon name="check" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
