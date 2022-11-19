import Bind from "../nodes/Bind";
import type Context from "./Context";
import Expression from "./Expression";
import Node from "./Node";
import Token from "./Token";
import type Transform from "../transforms/Transform";
import type Translations from "./Translations";
import { TRANSLATE } from "./Translations"
import Unparsable from "./Unparsable";

export default class Cell extends Node {

    readonly bar: Token;
    readonly value: Expression | Bind | Unparsable;

    constructor(bar: Token, expression: Expression | Bind | Unparsable) {
        super();

        this.bar = bar;
        this.value = expression;

        this.computeChildren();
    }

    getGrammar() { 
        return [
            { name: "bar", types:[ Token ] },
            { name: "value", types:[ Expression, Bind, Unparsable ] },
        ]; 
    }

    replace(pretty: boolean=false, original?: Node, replacement?: Node) { 
        return new Cell(
            this.replaceChild(pretty, "bar", this.bar, original, replacement), 
            this.replaceChild(pretty, "value", this.value, original, replacement)
        ) as this; 
    }


    computeConflicts() {}

    getType(context: Context) {
        return this.value.getType(context);
    }

    getDescriptions(): Translations {
        return {
            "😀": TRANSLATE,
            eng: "A table cell"
        }
    }

    getChildReplacement(): Transform[] | undefined { return undefined; }
    getInsertionBefore(): Transform[] | undefined { return undefined; }
    getInsertionAfter(): Transform[] | undefined { return undefined; }
    getChildRemoval(): Transform | undefined { return undefined; }
    
}