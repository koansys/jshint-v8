
Run jshint on the command line fast (with v8 engine)
================================================

jshint-v8 is a modern and extreamly fast runner for the popular jshint
JavaScript style checker. jshint_ is a fork of jslint_ implemented
by the JavaScript guru Douglas Crockford in JavaScript itself.

Credits
--------

  * this work was forked from `geekQ's github`_
  * this work was inspired by jsbeautify_ implementation.
  * original jslint-v8 implementation by jlbfalcao_
  * vim support and Rakefile by `Vladimir Dobriakov`_ AKA geekQ_


Build
-----

this on OSX (10.7.0) but if you have the prerequisites installed it
should work fine on BSD and Linux as well.

**Assumption** You have python setup already with virtualenv

Setup  V8
+++++++++

There are  acouple steps to set up V8

Create a virtualenv::

    $ cd /usr/local/dev
    $ virtualenv v8-env --no-site-packages --distribute
    $ source v8-env/bin/activate

Install scons::

    $ easy_install scons

Get and build V8::

    $ svn checkout http://v8.googlecode.com/svn/trunk/ v8-read-only
    $ cd v8-read-only
    $ scons snapshot=on library=shared arch=x64 d8

.. warning::

   with OSX 10.7 Lion scons fails with ``ImportError: No module named SCons.Script`` so you need to ``export SCONS_LIB_DIR=/usr/local/src/v8-env/lib/python2.7/site-packages/scons-2.1.0-py2.7.egg/scons-2.1.0`` to make it work

That was easy no? `snapshot=on` reportedly make it load
faster. `arch=x64` targets 64 architecture and d8 tells it to build
the developer shell in release mode. Let's test it::

    $ echo 'print("Hello, world!");' > test.js
    $ ./d8 test.js
    Hello World!!

If it prints ``Hello world!!`` it worked. So let's put it someplace permanent::

    $ sudo cp d8 /usr/local/bin/
    $ sudo cp libv8* /usr/local/lib/
    $ cp include/* /usr/local/include/

Build jshint-v8
+++++++++++++++

Python
------

::

    $ sh build.sh


Ruby
----

::

 $ V8_BASEDIR=/usr/local rake compile

If you do not have ruby/rake you can run g++ directly, please look
inside Rakefile.

        ruby convert_to_h.rb print_human.js > print_human.
        ruby convert_to_h.rb print_human.js > print_human.h
        ruby convert_to_h.rb print_vim.js > print_vim.h
        V8_BASEDIR=/usr/local/ rake compile


Run on console
--------------

    $ jshint --browser file.js
    $ jshint --node file.js

checks the style for `file.js`. You can provide all the known jslint
switches on the command line. Here `--browser` indicates that e.g.
XMLHttpRequest object should be allowed and `--node` indicates Assume
node.

Emacs
-----

Create a `flymake-jslint.el` file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create flymake-jslint.el in your emacs site direcory or somewher eon your load path with the folllowing contents::

    (require 'flymake)

    (defun flymake-jslint-init ()
      (let* ((temp-file (flymake-init-create-temp-buffer-copy
			 'flymake-create-temp-inplace))
	     (local-file (file-relative-name
			  temp-file
			  (file-name-directory buffer-file-name))))
	(list "/usr/local/bin/jslint" (list local-file))))

    (setq flymake-allowed-file-name-masks
	  (cons '(".+\\.js$"
		  flymake-jslint-init
		  flymake-simple-cleanup
		  flymake-get-real-file-name)
		flymake-allowed-file-name-masks))

    (setq flymake-err-line-patterns
	  (cons '("^Lint at line \\([[:digit:]]+\\) character \\([[:digit:]]+\\): \\(.+\\)$"
		  nil 1 2 3)
		flymake-err-line-patterns))

    (provide 'flymake-jslint)

Import it in your .emacs
~~~~~~~~~~~~~~~~~~~~~~~~


Add the following to .emacs::

    (require 'flymake-jslint)
    (add-hook 'javascript-mode-hook
	      (lambda () (flymake-mode 1)))


Run from vim
------------

Set up `jshint` as make program in .vimrc:

    autocmd BufRead,BufNewFile *.js,*.json setlocal makeprg=jslint\ --vim\ \%

`--vim` provides error message formatting suitable for parsing in vim.

Now you can check your JavaScript easily with `:make` or even
automatically on every file save or load.

See a screenshot for `usage inside vim`_.

.. _`v8 doc`: http://code.google.com/apis/v8/build.html
.. _jsbeautify: http://blog.slashpoundbang.com/post/2488598258/running-javascript-from-the-command-line-with-v8
.. _jlbfalcao: https://github.com/jlbfalcao/jslint-v8
.. _`Vladimir Dobriakov`: http://www.mobile-web-consulting.de
.. _jslint: http://www.jslint.com/
.. _geekQ: http://www.geekQ.net/
.. _`usage inside vim`: http://www.mobile-web-consulting.de/post/4745654954/run-jslint-fast-v8-engine-for-vim
.. _`geekQ's github`: https://github.com/geekq/jslint-v8
