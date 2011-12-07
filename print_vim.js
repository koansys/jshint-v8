/* Prints errors in a form suitable for vim to automatically show in a quickfix list */
for (i = 0; i < JSHINT.errors.length; i += 1) {
    e = JSHINT.errors[i];
    if (e) {
        print ( filename + ":" + (e["line"]) + ":" + (e["character"])
            + ":" + e.reason );
    }
}
