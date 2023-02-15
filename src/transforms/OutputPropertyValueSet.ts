import type Project from '../models/Project';
import { reviseProject } from '../models/stores';
import type Evaluate from '../nodes/Evaluate';
import Expression from '../nodes/Expression';
import Measurement from '../runtime/Measurement';
import Text from '../runtime/Text';
import Value from '../runtime/Value';
import type LanguageCode from '../translation/LanguageCode';
import type OutputExpression from './OutputExpression';
import type { OutputPropertyValue } from './OutputExpression';

/**
 * Represents one or more equivalent inputs to an output expression.
 * Used for editing multiple inputs at once.
 */
export default class OutputPropertyValueSet {
    readonly name: string;
    readonly outputs: OutputExpression[];
    readonly values: OutputPropertyValue[];

    /** Constructs a set of values given a set of expressions and a name on them. */
    constructor(name: string, outputs: OutputExpression[]) {
        this.name = name;
        this.outputs = outputs;
        this.values = [];
        for (const out of outputs) {
            const value = out.getPropertyValue(name);
            if (value) this.values.push(value);
        }
    }

    getTranslation(languages: LanguageCode[]): string | undefined {
        return this.values[0]?.bind.getTranslation(languages);
    }

    /** If all the values are equivalent, returns the value, otherwise undefined */
    getValue(): Value | undefined {
        let value: Value | undefined;
        for (const candidate of this.values) {
            if (candidate.value instanceof Expression) return undefined;
            else if (value === undefined) value = candidate.value;
            else if (!candidate.value.isEqualTo(value)) return undefined;
        }
        return value;
    }

    getExpression(): Expression | undefined {
        let expr: Expression | undefined;
        for (const candidate of this.values) {
            if (candidate.value instanceof Value) return undefined;
            else if (expr === undefined) expr = candidate.value;
            else if (!candidate.value.equals(expr)) return undefined;
        }
        return expr;
    }

    getNumber() {
        const value = this.getValue();
        return value instanceof Measurement ? value.toNumber() : undefined;
    }

    getText() {
        const value = this.getValue();
        return value instanceof Text ? value.text : undefined;
    }

    getName() {
        return this.name;
    }

    getExpressions(): Evaluate[] {
        return this.values.map((value) => value.evaluate);
    }

    isEmpty() {
        return this.values.length === 0;
    }

    onAll() {
        return this.values.length === this.outputs.length;
    }

    isDefault() {
        return this.values.every((val) => !val.given);
    }

    someGiven() {
        return this.values.some((val) => val.given);
    }

    /** Given a project, unsets this property on expressions on which it is set. */
    unset(project: Project) {
        // Find all the values that are given, then map them to [ Evaluate, Evaluate ] pairs
        // that represent the original Evaluate and the replacement without the given value.
        reviseProject(
            project.getBindReplacements(
                this.values
                    .filter((value) => value.given)
                    .map((value) => value.evaluate),
                this.name,
                undefined
            )
        );
    }
}
