import Node from './Node';
import type Context from './Context';
import type Evaluator from '@runtime/Evaluator';
import type Value from '@values/Value';
import type Type from './Type';
import type Step from '@runtime/Step';
import type Bind from './Bind';
import type TypeSet from './TypeSet';
import ValueRef from '@locale/ValueRef';
import type Markup from './Markup';
import type Locales from '../locale/Locales';

export enum ExpressionKind {
    Simple = 'simple',
    Evaluate = 'block',
    Definition = 'definition',
}

export default abstract class Expression extends Node {
    constructor() {
        super();
    }

    /**
     * True if the expression is involved in triggering an evaluation. Used to decide whether to present
     * as code or value during stepping.
     */
    isEvaluationInvolved() {
        return false;
    }
    isEvaluationRoot() {
        return false;
    }

    /** True if binary operations can be applied to this without wrapping it in parentheses */

    abstract computeType(context: Context): Type;

    getType(context: Context): Type {
        return context.getType(this);
    }

    abstract getDependencies(_: Context): Expression[];

    getAllDependencies(
        context: Context,
        dependencies?: Set<Expression>
    ): Set<Expression> {
        if (dependencies === undefined) dependencies = new Set();

        // Prevent cycles.
        if (dependencies.has(this)) return dependencies;

        for (const dep of this.getDependencies(context)) {
            dep.getAllDependencies(context, dependencies);
            dependencies.add(dep);
        }
        return dependencies;
    }

    /** By default, an expression is constant if all of it's dependencies are constant. */
    isConstant(context: Context): boolean {
        // Get the expression's dependencies.
        const dependencies = this.getDependencies(context);
        // Ask the project if the dependency is constant. We ask the project since it's responsible
        // for caching whether an expression is constant and preventing cycles.
        return Array.from(dependencies).every((dependency) =>
            context.project.isConstant(dependency)
        );
    }

    /**
     * Used to determine what types are possible for a given after evaluating this expression, implementing type guards.
     * Most expressions do not manipulate possible types at all; primarily is just logical operators and type checks.
     * */
    abstract evaluateTypeGuards(
        bind: Bind,
        original: TypeSet,
        current: TypeSet,
        context: Context
    ): TypeSet;

    /** Used to decide whether to consider an expression as filtering types based on the behavior of evaluateTypeGuards() */
    guardsTypes() {
        return false;
    }

    abstract compile(evaluator: Evaluator, context: Context): Step[];
    abstract evaluate(evaluator: Evaluator, prior: Value | undefined): Value;

    abstract getStart(): Node;
    abstract getFinish(): Node;

    abstract getStartExplanations(
        locales: Locales,
        context: Context,
        evaluator: Evaluator
    ): Markup;

    abstract getFinishExplanations(
        locales: Locales,
        context: Context,
        evaluator: Evaluator
    ): Markup;

    /** Utility function for getting an optional result   */
    getValueIfDefined(
        locales: Locales,
        context: Context,
        evaluator: Evaluator
    ) {
        const value = evaluator.peekValue();
        return value ? new ValueRef(value, locales, context) : undefined;
    }

    /** Get the kind of node, for highlighting or other purposes */
    getKind(): ExpressionKind {
        return ExpressionKind.Evaluate;
    }
}
