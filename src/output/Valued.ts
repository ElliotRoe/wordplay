import type Value from '@values/Value';
import type StructureValue from '../values/StructureValue';

/**
 * A base class that represents some part of Stage output.
 * It's core responsibility is to store a link to a Structure value,
 * maintaining provenance.
 * */
export default class Valued {
    /**
     * The value on which this output component is based.
     * If undefined, it means it was generated by the system and not by code.
     * */
    readonly value: Value;

    constructor(value: Value) {
        this.value = value;
    }
}

export function getOutputInputs(
    value: StructureValue,
    start = 0,
): (Value | undefined)[] {
    return value.type.inputs
        .slice(start)
        .map((input) => value.resolve(input.names));
}

export function getOutputInput(
    value: StructureValue,
    index: number,
): Value | undefined {
    const input = value.type.inputs[index];
    return input ? value.resolve(input.names) : undefined;
}
