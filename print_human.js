
for (i = 0; i < JSHINT.errors.length; i += 1) {
    e = JSHINT.errors[i];
    if (e) {
        print('Lint at line ' + e.line + ' character ' +
                e.character + ': ' + e.reason);
        print((e.evidence || '').
                replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
        print('');
    }
}
