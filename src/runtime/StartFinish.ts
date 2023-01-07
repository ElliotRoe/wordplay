import Step from './Step';
import type Evaluator from './Evaluator';
import type Value from './Value';
import type Expression from '../nodes/Expression';
import { finish } from './Finish';
import { start } from './Start';
import type Translation from '../translations/Translation';

export default class StartFinish extends Step {
    constructor(node: Expression) {
        super(node);
    }

    evaluate(evaluator: Evaluator): Value | undefined {
        start(evaluator, this.node);
        return finish(evaluator, this.node);
    }

    getExplanations(translation: Translation, evaluator: Evaluator) {
        return this.node.getStartExplanations(
            translation,
            evaluator.project.getNodeContext(this.node),
            evaluator
        );
    }
}
