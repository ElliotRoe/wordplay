import { getContext } from "svelte";
import type { Writable } from "svelte/store";
import type { InsertionPoint } from "../models/Caret";
import type Caret from "../models/Caret";
import type Project from "../models/Project";
import type LanguageCode from "../nodes/LanguageCode";
import type Node from "../nodes/Node";
import type { Highlights } from "./Highlights";

export type CaretContext = Writable<Caret> | undefined;
export const CaretSymbol = Symbol("caret");

export type HoveredContext = Writable<Node | undefined> | undefined;
export const HoveredSymbol = Symbol("hovered");

export type InsertionPointsContext = Writable<Map<Node[],InsertionPoint>> | undefined;
export const InsertionPointsSymbol = Symbol("insertions");

export type DraggedContext = Writable<Node | undefined>;
export const DraggedSymbol = Symbol("dragged");

export type LanguageContext = Writable<LanguageCode[]>;
export const LanguageSymbol = Symbol("language");
export function getLanguages() { return getContext<LanguageContext>(LanguageSymbol); }

export type ProjectContext = Writable<Project>;
export const ProjectSymbol = Symbol("project");

export type HighlightContext = Writable<Highlights> | undefined;
export const HighlightSymbol = Symbol("highlight");