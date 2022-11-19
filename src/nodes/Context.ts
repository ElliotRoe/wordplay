import type Node from "./Node";
import type NativeInterface from "../native/NativeInterface";
import type Program from "./Program"
import type Type from "./Type";
import type Shares from "../runtime/Shares"
import type Source from "../models/Source";
import Tree from "./Tree";
import { DefaultTrees } from "../runtime/Shares";
import Native from "../native/NativeBindings";

/** Passed around during type inference and conflict detection to facilitate program analysis and cycle-detection. */
export default class Context {

    readonly source: Source;
    readonly program: Program; // This is optional, because sometimes nodes exist outside of programs.
    readonly shares?: Shares;
    readonly native?: NativeInterface;
    readonly stack: Node[] = [];
    readonly types: Record<string,Type>[] = [];
    readonly trees: Tree[];
    
    readonly _index: Map<Node,Tree | undefined> = new Map();

    constructor(source: Source, program: Program, shares?: Shares) {

        this.source = source;
        this.program = program;
        this.shares = shares;
        this.native = Native;

        this.trees = [
            new Tree(program),
            ...Native.getStructureDefinitionTrees(),
            ...DefaultTrees
        ]
        
    }

    /** Get a tree that that represents the node. It could be in the program, one of the native types, or a share. */
    get(node: Node): Tree | undefined {

        if(this._index.has(node)) return this._index.get(node);

        for(const tree of this.trees) {
            const match = tree.get(node);
            if(match) {
                this._index.set(node, match);
                return match;
            }
        }
        this._index.set(node, undefined);
        return undefined;
    }

    visit(node: Node) { this.stack.push(node); }
    unvisit() { this.stack.pop();}
    visited(node: Node) { return  this.stack.includes(node); }

}