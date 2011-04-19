task :build => [:convert_js_to_h] do
  print "Please always set V8_BASEDIR to the folder of the V8 engine source"
  sh "g++ -o jslint jslint.cpp -I$V8_BASEDIR/include/ -lv8 -L$V8_BASEDIR/lib -lpthread"
end

task :convert_js_to_h do
  sh "ruby convert_to_h.rb print_vim.js > print_vim.h"
  sh "ruby convert_to_h.rb print_human.js > print_human.h"
end
