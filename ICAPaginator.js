/******************************************************************************
 *                                                                            *
 * Functionality for dividing a long text into shorter chunks of text of      *
 * roughly equal size. It's called a paginator because not only will it make  *
 * sure divisions only occur on word boundaries but there is a mechanism for  *
 * widow / orphan protection as well.                                         *
 *                                                                            *
 * To use the widow / orphan protection feature the texts you feed it         *
 * obviously need to have line breaks and paragraph breaks (multiple line     *
 * breaks in succession are considered to be paragraph breaks).               *
 *                                                                            *
 * We use this object for making sure texts of indeterminate length do not    *
 * take up more than one screen length.                                       *
 *                                                                            *
 * How to use:                                                                *
 * -----------                                                                *
 *                                                                            *
 * var sourceText = "some enormous string.";                                  *
 * // Pages will be an array of strings.                                      *
 * var pages = ICAPaginator.paginate(sourceText);                             *
 *                                                                            *
 * Customization / settings:                                                  *
 * -------------------------                                                  *
 *                                                                            *
 * - maxPageLength : The maximum length of a single page in characters.       *
 *                   Defaults to 500.                                         *
 *                                                                            *
 * - orphanLength  : The minimum length of a line in characters before it's   *
 *                   considered to be an orphan. Defaults to 15.              *
 *                                                                            *
 * - widowLength   : The minimum length of a line in characters before it's   *
 *                   considered to be a widow. Defaults to 65.                *
 *                                                                            *
 *                                                                            *
 * License:                                                                   *
 * --------                                                                   *
 *                                                                            *
 * This is free and unencumbered software released into the public domain.    *
 *                                                                            *
 * Anyone is free to copy, modify, publish, use, compile, sell, or            *
 * distribute this software, either in source code form or as a compiled      *
 * binary, for any purpose, commercial or non-commercial, and by any          *
 * means.                                                                     *
 *                                                                            *
 * In jurisdictions that recognize copyright laws, the author or authors      *
 * of this software dedicate any and all copyright interest in the            *
 * software to the public domain. We make this dedication for the benefit     *
 * of the public at large and to the detriment of our heirs and               *
 * successors. We intend this dedication to be an overt act of                *
 * relinquishment in perpetuity of all present and future rights to this      *
 * software under copyright law.                                              *
 *                                                                            *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,            *
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF         *
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.     *
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR          *
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,      *
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR      *
 * OTHER DEALINGS IN THE SOFTWARE.                                            *
 *                                                                            *
 * For more information, please refer to <http://unlicense.org/>              *
 *                                                                            *
 *****************************************************************************/
ICAPaginator = {

  maxPageLength : 500,
  
  orphanLength : 30,

  widowLength : 30,

  isTooLarge  : function(page) {
    if(page.length > ICAPaginator.maxPageLength) {
      return true;
    }
    return false;
  },

  widowOrphanFix : function(page1, page2) {

    page1 = page1.replace(/^[\s\r\n]+(.*?)[\s\r\n]+$/, '\1');
    page2 = page2.replace(/^[\s\r\n]+(.*?)[\s\r\n]+$/, '\1');

    var linesInPage1 = ICAPaginator._pageToLines(page1);
    var linesInPage2 = ICAPaginator._pageToLines(page2);

    var orphan = linesInPage1[linesInPage1.length - 1];
    var widow = linesInPage2[0];

    if(orphan.length > 0 && widow.length > 0) {
      if(orphan.length < ICAPaginator.orphanLength) {
        console.log('orphan', linesInPage1);
        linesInPage2[0] = orphan + ' ' + linesInPage2[0];
        linesInPage1.pop();
      }
      else {
        if( widow.length < ICAPaginator.widowLength) {
          console.log('widow: ', linesInPage2);
          linesInPage1[linesInPage1.length - 1] = orphan + ' ' + widow;
          linesInPage2.shift();
        }
      }
    }

        return [linesInPage1.join("\n"),
      linesInPage2.join("\n")];
  },

  _pageToLines : function(page) {
    var lines = [];
    var paragraphs = page.split(/\s*[\r\n]{2,}\s*/);
    for(var i = 0; i < paragraphs.length ; i++) {
      lines = lines.concat(paragraphs[i].split(/\s*[\r\n]+\s*/));
    }
    return lines;

  },

  paginate : function(sourceText) {
    var pages = [];

    var page = '';
    var pageCounter = 0;

    sourceText = sourceText.replace(/^[\s\r\n]+/, '');
    sourceText = sourceText.replace(/[\s\r\n]+$/, '');


    while(sourceText.length) {
      var nextChar = sourceText.substr(0,1);
      if(nextChar.match(/[\s\n\r]/) 
         && ICAPaginator.isTooLarge(page + nextChar)) {
          if(pages.length == 0) {
              pages[pages.length] = page;
              page = '';
              sourceText = sourceText.substr(1);
              continue;
            }
            else {
                var fixedPages = 
                  ICAPaginator.widowOrphanFix(pages[pages.length - 1], page);
                pages[pages.length - 1] = fixedPages[0];
                pages[pages.length] = fixedPages[1];
                page = '';
                sourceText = sourceText.substr(1);
              }
        }
        // Current page is not too large. Add the character to the
        // current page and remove it from the source text.
        else {
            page = page + nextChar;
            sourceText = sourceText.substr(1);
        }
    }
    pages[pages.length] = page;
    return pages;
  },
}
