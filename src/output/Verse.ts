import Structure from '@runtime/Structure';
import type Value from '@runtime/Value';
import TypeOutput, { TypeOutputInputs } from './TypeOutput';
import type { RenderContext } from './RenderContext';
import Phrase from './Phrase';
import Color from './Color';
import Place, { toPlace } from './Place';
import toStructure from '../native/toStructure';
import Measurement from '@runtime/Measurement';
import Decimal from 'decimal.js';
import { toColor } from './Color';
import List from '@runtime/List';
import type LanguageCode from '@translation/LanguageCode';
import { getPreferredTranslation } from '@translation/getPreferredTranslation';
import { getBind } from '@translation/getBind';
import Bool from '../runtime/Bool';
import { getStyle, toTypeOutput, toTypeOutputList } from './toTypeOutput';
import type TextLang from './TextLang';
import Pose from './Pose';
import type Sequence from './Sequence';

export const DefaultFont = 'Noto Sans';

export const VerseType = toStructure(`
    ${getBind((t) => t.output.verse.definition, '•')} Type(
        ${getBind((t) => t.output.verse.content)}•Type|[Type]
        ${getBind((t) => t.output.verse.background)}•Color: Color(100 0 0°)
        ${getBind((t) => t.output.verse.focus)}•Place|ø: ø
        ${TypeOutputInputs}
    )
`);

export default class Verse extends TypeOutput {
    readonly content: TypeOutput[];
    readonly background: Color;
    readonly focus: Place | undefined;

    constructor(
        value: Value,
        content: TypeOutput[],
        background: Color,
        focus: Place | undefined,
        size: number,
        font: string | undefined = undefined,
        place: Place | undefined = undefined,
        name: TextLang | undefined = undefined,
        entry: Pose | Sequence | undefined = undefined,
        rest: Pose | Sequence,
        move: Pose | Sequence | undefined = undefined,
        exit: Pose | Sequence | undefined = undefined,
        duration: number = 0,
        style: string | undefined = 'zippy'
    ) {
        super(
            value,
            size,
            font,
            place,
            name,
            entry,
            rest,
            move,
            exit,
            duration,
            style
        );

        this.content = content;
        this.background = background;
        this.focus = focus;
    }

    getBounds(context: RenderContext) {
        const places = this.getPlaces(context);
        const left = Math.min.apply(
            Math,
            places.map(([, place]) => place.x.toNumber())
        );
        const right = Math.max.apply(
            Math,
            places.map(([group, place]) =>
                place.x.add(group.getWidth(context)).toNumber()
            )
        );
        const top = Math.min.apply(
            Math,
            places.map(([, place]) => place.y.toNumber())
        );
        const bottom = Math.max.apply(
            Math,
            places.map(([group, place]) =>
                place.y.add(group.getHeight(context)).toNumber()
            )
        );
        return {
            left,
            top,
            width: right - left,
            height: bottom - top,
        };
    }

    /** A verse's width is the difference between it's left and right extents. */
    getWidth(context: RenderContext): Decimal {
        return new Decimal(this.getBounds(context).width);
    }

    /** A verse's height is the difference between it's highest and lowest extents. */
    getHeight(context: RenderContext): Decimal {
        return new Decimal(this.getBounds(context).height);
    }

    getGroups(): TypeOutput[] {
        return this.content;
    }

    /**
     * A Verse is a Group that lays out a list of phrases according to their specified places,
     * or if the phrases */
    getPlaces(context: RenderContext): [TypeOutput, Place][] {
        return this.content.map((group) => [
            group,
            group instanceof Phrase && group.place
                ? group.place
                : new Place(
                      this.value,
                      group.getWidth(context).div(2).neg(),
                      group.getHeight(context).div(2).neg(),
                      new Decimal(0),
                      new Decimal(0)
                  ),
        ]);
    }

    getBackground(): Color | undefined {
        return undefined;
    }

    getDescription(languages: LanguageCode[]) {
        return getPreferredTranslation(languages).output.verse.description;
    }
}

export function toVerse(value: Value): Verse | undefined {
    if (!(value instanceof Structure)) return undefined;

    if (value.type === VerseType) {
        const possibleGroups = value.resolve('content');
        const content =
            possibleGroups instanceof List
                ? toTypeOutputList(possibleGroups)
                : toTypeOutput(possibleGroups);
        const background = toColor(value.resolve('background'));
        const focus = toPlace(value.resolve('focus'));

        const {
            size,
            font,
            place,
            name,
            rest,
            enter,
            move,
            exit,
            duration,
            style,
        } = getStyle(value);

        return content && background && duration && style
            ? new Verse(
                  value,
                  Array.isArray(content) ? content : [content],
                  background,
                  focus,
                  size,
                  font,
                  place,
                  name,
                  enter,
                  rest ?? new Pose(value),
                  move,
                  exit,
                  duration,
                  style
              )
            : undefined;
    }
    // Try converting it to a group and wrapping it in a Verse.
    else {
        const type = toTypeOutput(value);
        return type === undefined
            ? undefined
            : new Verse(
                  value,
                  [type],
                  new Color(
                      value,
                      new Decimal(100),
                      new Decimal(0),
                      new Decimal(0)
                  ),
                  undefined,
                  16,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  new Pose(value),
                  undefined,
                  undefined,
                  0,
                  'zippy'
              );
    }
}

export function toDecimal(value: Value | undefined): Decimal | undefined {
    return value instanceof Measurement ? value.num : undefined;
}

export function toBoolean(value: Value | undefined): boolean | undefined {
    return value instanceof Bool ? value.bool : undefined;
}
