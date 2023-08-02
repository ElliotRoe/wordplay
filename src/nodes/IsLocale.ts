import type Conflict from '@conflicts/Conflict';
import Token from './Token';
import type Type from './Type';
import type Evaluator from '@runtime/Evaluator';
import type Value from '@runtime/Value';
import type Step from '@runtime/Step';
import type Context from './Context';
import Symbol from './Symbol';
import { GLOBE1_SYMBOL } from '@parser/Symbols';
import Bool from '@runtime/Bool';
import { node, type Grammar, type Replacement, optional } from './Node';
import type Locale from '@locale/Locale';
import AtomicExpression from './AtomicExpression';
import BooleanType from './BooleanType';
import Glyphs from '../lore/Glyphs';
import Purpose from '../concepts/Purpose';
import concretize from '../locale/concretize';
import Language from './Language';
import StartFinish from '../runtime/StartFinish';
import type Bind from './Bind';
import type Expression from './Expression';
import type TypeSet from './TypeSet';

export default class IsLocale extends AtomicExpression {
    readonly globe: Token;
    readonly locale: Language | undefined;

    constructor(globe: Token, locale: Language | undefined) {
        super();

        this.globe = globe;
        this.locale = locale;

        this.computeChildren();
    }

    static make(language: Language) {
        return new IsLocale(new Token(GLOBE1_SYMBOL, Symbol.Change), language);
    }

    getGrammar(): Grammar {
        return [
            { name: 'globe', kind: node(Symbol.Locale) },
            {
                name: 'locale',
                kind: optional(node(Language)),
            },
        ];
    }

    clone(replace?: Replacement) {
        return new IsLocale(
            this.replaceChild('globe', this.globe, replace),
            this.replaceChild('locale', this.locale, replace)
        ) as this;
    }

    getPurpose() {
        return Purpose.Decide;
    }

    computeConflicts(context: Context): Conflict[] {
        return [];
    }

    computeType(): Type {
        // The type is a boolean.
        return BooleanType.make();
    }

    compile(): Step[] {
        return [new StartFinish(this)];
    }

    evaluate(evaluator: Evaluator, prior: Value | undefined): Value {
        if (prior) return prior;

        return new Bool(
            this,
            this.locale === undefined
                ? false
                : this.locale.region === undefined
                ? evaluator.project.locales.some((locale) =>
                      this.locale?.isLocaleLanguage(locale)
                  )
                : evaluator.project.locales.some((locale) =>
                      this.locale?.isLocale(locale)
                  )
        );
    }

    getDependencies(): Expression[] {
        return [];
    }
    evaluateTypeSet(
        bind: Bind,
        original: TypeSet,
        current: TypeSet,
        context: Context
    ): TypeSet {
        return current;
    }

    getStart() {
        return this.locale ?? this.globe;
    }

    getFinish() {
        return this.locale ?? this.globe;
    }

    getNodeLocale(translation: Locale) {
        return translation.node.IsLocale;
    }

    getStartExplanations(locale: Locale, context: Context) {
        return concretize(
            locale,
            locale.node.IsLocale.start,
            this.locale?.toWordplay() ?? '-'
        );
    }

    getGlyphs() {
        return Glyphs.Locale;
    }
}
