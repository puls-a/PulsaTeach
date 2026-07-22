import { useEffect, useRef } from "react";
import { history, historyKeymap } from "@codemirror/commands";
import { HighlightStyle, StreamLanguage, syntaxHighlighting } from "@codemirror/language";
import { Compartment, EditorState, Transaction } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { tags } from "@lezer/highlight";

const editorTheme = EditorView.theme({
  "&": { height: "100%", minHeight: "480px", backgroundColor: "#020617", color: "#e0e7ff" },
  "&.cm-focused": { outline: "2px solid #818cf8", outlineOffset: "-2px" },
  ".cm-scroller": { overflow: "auto", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", lineHeight: "1.75" },
  ".cm-content": { minHeight: "100%", padding: "16px 0", caretColor: "#6ee7b7" },
  ".cm-line": { padding: "0 18px" },
  ".cm-gutters": { backgroundColor: "#0f172a", color: "#64748b", borderRight: "1px solid rgba(255,255,255,.1)" },
  ".cm-activeLine, .cm-activeLineGutter": { backgroundColor: "rgba(99,102,241,.09)" },
  ".cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection": { backgroundColor: "rgba(99,102,241,.35) !important" }
}, { dark: true });

const pulsaHighlightStyle = HighlightStyle.define([
  { tag: [tags.keyword, tags.modifier, tags.controlKeyword], color: "#c4b5fd" },
  { tag: [tags.name, tags.propertyName, tags.labelName], color: "#bfdbfe" },
  { tag: [tags.string, tags.inserted], color: "#86efac" },
  { tag: [tags.number, tags.bool, tags.atom], color: "#fde68a" },
  { tag: [tags.typeName, tags.className, tags.namespace], color: "#67e8f9" },
  { tag: [tags.comment, tags.meta], color: "#94a3b8", fontStyle: "italic" },
  { tag: [tags.regexp, tags.escape, tags.special(tags.string)], color: "#f9a8d4" },
  { tag: [tags.deleted, tags.invalid], color: "#fca5a5" },
  { tag: [tags.operator, tags.punctuation], color: "#e2e8f0" }
]);

export default function CodeMirrorEditor({ value, documentKey, languageKind, locale, editorRef, onChange, onRun, onSave }) {
  const hostRef = useRef(null);
  const viewRef = useRef(null);
  const valueRef = useRef(value);
  const callbacksRef = useRef({ onChange, onRun, onSave });
  const languageRef = useRef(new Compartment());
  const escapeArmedRef = useRef(false);
  valueRef.current = value;

  useEffect(() => {
    callbacksRef.current = { onChange, onRun, onSave };
  }, [onChange, onRun, onSave]);

  useEffect(() => {
    if (!hostRef.current) return undefined;
    const view = new EditorView({
      parent: hostRef.current,
      state: EditorState.create({
        doc: valueRef.current,
        extensions: [
          lineNumbers(),
          history(),
          EditorView.lineWrapping,
          syntaxHighlighting(pulsaHighlightStyle),
          editorTheme,
          languageRef.current.of([]),
          EditorView.contentAttributes.of({
            "aria-label": locale === "fr" ? "Éditeur de code PulsaTeach" : "PulsaTeach code editor",
            "aria-multiline": "true",
            autocapitalize: "off",
            autocomplete: "off",
            spellcheck: "false"
          }),
          keymap.of([
            {
              key: "Escape",
              run: () => {
                escapeArmedRef.current = true;
                return false;
              }
            },
            {
              key: "Tab",
              run: (currentView) => {
                if (escapeArmedRef.current) {
                  escapeArmedRef.current = false;
                  return false;
                }
                currentView.dispatch(currentView.state.replaceSelection("  "));
                return true;
              }
            },
            {
              key: "Mod-Enter",
              run: (currentView) => {
                callbacksRef.current.onRun(currentView.state.doc.toString());
                return true;
              }
            },
            {
              key: "Mod-s",
              run: (currentView) => {
                callbacksRef.current.onSave(currentView.state.doc.toString());
                return true;
              }
            },
            ...historyKeymap
          ]),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) callbacksRef.current.onChange(update.state.doc.toString());
          })
        ]
      })
    });
    viewRef.current = view;
    editorRef.current = view;
    return () => {
      if (editorRef.current === view) editorRef.current = null;
      viewRef.current = null;
      view.destroy();
    };
  }, [documentKey, editorRef, locale]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view || view.state.doc.toString() === value) return;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: value },
      annotations: Transaction.addToHistory.of(false)
    });
  }, [value]);

  useEffect(() => {
    let active = true;
    loadLanguage(languageKind).then((extension) => {
      const view = viewRef.current;
      if (active && view) view.dispatch({ effects: languageRef.current.reconfigure(extension) });
    });
    return () => {
      active = false;
    };
  }, [documentKey, languageKind]);

  return <div ref={hostRef} className="h-full min-h-[480px] overflow-hidden bg-slate-950" />;
}

async function loadLanguage(kind) {
  if (["html", "dom"].includes(kind)) return import("@codemirror/legacy-modes/mode/xml").then(({ xml }) => StreamLanguage.define(xml));
  if (kind === "css") return import("@codemirror/legacy-modes/mode/css").then(({ css }) => StreamLanguage.define(css));
  if (kind === "typescript") return import("@codemirror/legacy-modes/mode/javascript").then(({ typescript }) => StreamLanguage.define(typescript));
  if (["javascript", "react", "node"].includes(kind)) return import("@codemirror/legacy-modes/mode/javascript").then(({ javascript }) => StreamLanguage.define(javascript));
  return [];
}
