import * as assert from "assert";
import { defContext, defGrammar, ParseScope } from "../src";

const grammar = `
list: '('! <expr> ')'! ;
sym: ( <ALPHA_NUM> | [?!$+\\u002d*/.~#^=<>] )+ => join ;
expr: ( <FLOAT> | <STRING> | <sym> | <list> | <WS1> )* ;
prog: <START> <expr> <END> => hoist ;
`;

const prune = (scope: ParseScope<any>) => {
    if (!scope) return;
    delete scope.state;
    if (scope.result == null) delete scope.result;
    if (scope.children) {
        for (let c of scope.children) {
            prune(c);
        }
    } else {
        delete scope.children;
    }
    return scope;
};

describe("parse", () => {
    it("s-expr", () => {
        const lang = defGrammar(grammar);
        assert(!!lang);
        const ctx = defContext(
            `(def hello (x) (str "hello, " x))\n\n(print (hello -12.3))`
        );
        assert(lang!.rules.prog(ctx));
        const tree = prune(ctx.root);
        assert.deepEqual(tree, {
            id: "root",
            children: [
                {
                    id: "expr",
                    children: [
                        {
                            id: "list",
                            children: [
                                {
                                    id: "expr",
                                    children: [
                                        {
                                            id: "sym",
                                            result: "def",
                                        },
                                        {
                                            id: "sym",
                                            result: "hello",
                                        },
                                        {
                                            id: "list",
                                            children: [
                                                {
                                                    id: "expr",
                                                    children: [
                                                        {
                                                            id: "sym",
                                                            result: "x",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            id: "list",
                                            children: [
                                                {
                                                    id: "expr",
                                                    children: [
                                                        {
                                                            id: "sym",
                                                            result: "str",
                                                        },
                                                        {
                                                            id: "string",
                                                            result: "hello, ",
                                                        },
                                                        {
                                                            id: "sym",
                                                            result: "x",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "list",
                            children: [
                                {
                                    id: "expr",
                                    children: [
                                        {
                                            id: "sym",
                                            result: "print",
                                        },
                                        {
                                            id: "list",
                                            children: [
                                                {
                                                    id: "expr",
                                                    children: [
                                                        {
                                                            id: "sym",
                                                            result: "hello",
                                                        },
                                                        {
                                                            id: "real",
                                                            result: -12.3,
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });
});
