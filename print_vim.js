/* Prints errors in a form suitable for vim to automatically show in a quickfix list */
for (i = 0; i < JSLINT.errors.length; i += 1) {
    e = JSLINT.errors[i];
    if (e) {
        print ( filename + ":" + (e["line"]) + ":" + (e["character"])
            + ":" + e.reason );
    }
}
