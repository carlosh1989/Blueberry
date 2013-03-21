module.exports = {
    setUp: function (callback) {
        var parser = require('../src/grammar.js');
        
        this.compile = function (source) {
            return parser.parse(source);
        };
        
        var statementParser = require('../src/parsers/statement.js');
        this.parseStatement = function (source) {
            return statementParser(this.compile(source)[0]);
        }
        

        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },

    assign: function (test) {
        test.equals(this.parseStatement('a = 1'), '$a = 1;\n');
        test.equals(this.parseStatement('a = 1 + 6'), '$a = 1 + 6;\n');
        //test.equals(this.parseStatement('a = f(1 + 6)'), '$a = f(1 + 6);\n');
        test.equals(this.parseStatement('a = age > 18'), '$a = $age > 18;\n');
        test.done();
    },

    testIf: function (test) {
        test.equals(
            this.parseStatement('if can_drink\necho("Beer Beer!")\nend'),
            'if ($can_drink) {\necho(\'Beer Beer!\');\n}\n'
        );
        test.done();
    },

    testClass: function (test) {
        test.equals(
            this.parseStatement(),
            ''
        );
        test.done();
    }
};
