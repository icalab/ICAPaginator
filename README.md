ICAPaginator
============

Functionality for dividing a long text into shorter chunks of text of
roughly equal size. It's called a paginator because not only will it make
sure divisions only occur on word boundaries but there is a mechanism for
widow / orphan protection as well.

To use the widow / orphan protection feature the texts you feed it
obviously need to have line breaks and paragraph breaks (multiple line
breaks in succession are considered to be paragraph breaks).

We use this object for making sure texts of indeterminate length do not
take up more than one screen length.

How to use:
-----------

var sourceText = "some enormous string.";
// Pages will be an array of strings.
var pages = ICAPaginator.paginate(sourceText);

Customization / settings:
-------------------------

- maxPageLength : The maximum length of a single page in characters.
                  Defaults to 500.

- orphanLength  : The minimum length of a line in characters before it's
                  considered to be an orphan. Defaults to 15.

- widowLength   : The minimum length of a line in characters before it's
                  considered to be a widow. Defaults to 65.


License:
--------

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
