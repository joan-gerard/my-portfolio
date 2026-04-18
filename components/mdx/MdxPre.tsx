"use client";

import { prismTheme } from "@/constants/prismTheme";
import { Highlight } from "prism-react-renderer";
import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { MdxInlineCode } from "./MdxInlineCode";

function getTextFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getTextFromNode).join("");
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getTextFromNode(node.props.children);
  }
  return "";
}

function parseLanguage(className: string): string {
  const m = /language-([\w-+]+)/.exec(className);
  return (m?.[1] ?? "plaintext").toLowerCase();
}

/** Prism grammar names; unknown values fall back to avoid runtime errors. */
function normalizeLanguage(raw: string): string {
  const aliases: Record<string, string> = {
    ts: "typescript",
    py: "python",
    sh: "bash",
    shell: "bash",
    zsh: "bash",
    yml: "yaml",
    md: "markdown",
    text: "plaintext",
    txt: "plaintext",
    /** Prism highlights XML/HTML via the `markup` grammar */
    xml: "markup",
    svg: "markup",
    /** Prism grammar id for Dockerfiles */
    dockerfile: "docker",
  };
  const lang = aliases[raw] ?? raw;
  const supported = new Set([
    "javascript",
    "typescript",
    "tsx",
    "jsx",
    "json",
    "css",
    "markup",
    "bash",
    "markdown",
    "yaml",
    "python",
    "java",
    "sql",
    "docker",
    "diff",
    "plaintext",
  ]);
  if (supported.has(lang)) return lang;
  if (lang === "js") return "javascript";
  if (lang === "html") return "markup";
  return "plaintext";
}

function isCodeChild(el: ReactNode): el is ReactElement<{
  className?: string;
  children?: ReactNode;
}> {
  if (!isValidElement(el)) return false;
  return el.type === "code" || el.type === MdxInlineCode;
}

function CodeBlock({
  code,
  language,
  label,
}: {
  code: string;
  language: string;
  label: string;
}) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg shadow-black/20">
      <div className="flex items-center justify-between border-b border-zinc-800/90 px-4 py-2">
        <span className="font-mono text-xs font-medium tracking-wide text-indigo-400/95">
          {label}
        </span>
      </div>
      <div className="overflow-x-auto p-4 pt-3">
        <Highlight theme={prismTheme} code={code.trimEnd()} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} m-0 overflow-visible p-0 font-mono text-[13px] leading-relaxed`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}

export function MdxPre({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"pre">) {
  const childArray = Children.toArray(children);
  const only = childArray.length === 1 ? childArray[0] : null;

  if (only && isCodeChild(only)) {
    const cls = String(only.props.className ?? "");
    const code = getTextFromNode(only.props.children);
    const rawLang = cls.includes("language-")
      ? parseLanguage(cls)
      : "plaintext";
    const language = normalizeLanguage(rawLang);
    const label = rawLang === "plaintext" ? "text" : rawLang;

    return <CodeBlock code={code} language={language} label={label} />;
  }

  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <pre
        className={`m-0 overflow-visible font-mono text-sm text-zinc-300 ${className ?? ""}`}
        {...rest}
      >
        {children}
      </pre>
    </div>
  );
}
