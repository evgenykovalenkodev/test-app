module.exports = {
    env: {
        amd: true,
        node: true,
        browser: true,
        es6: true
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6
    },
    plugins: [
        'vue'
    ],
    rules: {
        // enable additional rules
        indent: ['error', 4, { ignoredNodes: ['ConditionalExpression'], SwitchCase: 1 }],
        'comma-dangle': ['error', 'never'],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'max-len': ['error', { code: 2000 }],
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: [
                    'state'
                ]
            }
        ]
    }
};
