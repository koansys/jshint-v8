#!/bin/bash
for f in print_vim.js print_human.js jshint.js; do
    echo "converting $f..."
    python convert_to_h.py $f
done
echo "building binary at ./jshint"
g++ -o jshint jshint.cpp -I/usr/local/include/ -lv8 -L/usr/local/lib -lpthread

