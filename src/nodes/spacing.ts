import type Node from "./Node";

export function withSpaces<NodeType extends Node>(list: NodeType[]) {
    const preferredSpace = " ";
    return list.map((value, index) => {
        const currentSpace = value.getPrecedingSpace() ?? "";
        return index > 0 && (currentSpace.length === 0 || currentSpace.indexOf(preferredSpace) < 0) ? 
            value.withPrecedingSpace(currentSpace + preferredSpace, true) : 
            value;
    });
}