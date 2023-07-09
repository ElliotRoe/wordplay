import { test, expect } from 'vitest';
import Evaluator from '@runtime/Evaluator';
import { getDefaultNative } from './Native';

const native = await getDefaultNative();

test.each([
    ['{1:"hi" 2:"bye"}.set(3 "hello")', '{1:"hi" 2:"bye" 3:"hello"}'],
    ['{1:"hi" 2:"bye"}.set(1 "hello")', '{1:"hello" 2:"bye"}'],
    ['{1:"hi" 2:"bye"}.unset(1)', '{2:"bye"}'],
    ['{1:"hi" 2:"bye"}.remove("bye")', '{1:"hi"}'],
    ["{'cat':1 'dog':2 'mouse':3}.filter(ƒ(k v) v ≥ 3)", '{"mouse":3}'],
    [
        "{'cat':1 'dog':2 'mouse':3}.translate(ƒ(k v) -v)",
        '{"cat":-1 "dog":-2 "mouse":-3}',
    ],
])('Expect %s to be %s map functions', (code, value) => {
    expect(Evaluator.evaluateCode(native, code)?.toString()).toBe(value);
});
