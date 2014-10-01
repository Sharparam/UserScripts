// ==UserScript==
// @name Facebook comment cleaner
// @namespace http://sharparam.com/
// @description Cleans Facebook comments of idiotic name-only mentions
// @downloadURL https://github.com/Sharparam/UserScripts/raw/master/fb_comment_cleaner.user.js
// @updateURL https://github.com/Sharparam/UserScripts/raw/master/fb_comment_cleaner.meta.js
// @include /^https?://(www\.)?facebook.com(/.*)?$/
// @version 1.1.0
// @grant none
// @run-at document-end
// ==/UserScript==

function cleanComments() {
    var comments = document.querySelectorAll('li.UFIComment');
    
    for (var cIdx = 0; cIdx < comments.length; cIdx++) {
        var comment = comments[cIdx];
        var body = comment.querySelector('.UFICommentBody');
        var isValid = false;
        var contents = body.children;
        
        for (var i = 0; i < contents.length; i++) {
            var element = contents[i];
            var name = element.tagName;
            var cls = element.className;
            var text = element.textContent ? element.textContent.trim() : (element.innerText ? element.innerText.trim() : null);
            
            if (text !== null && text != '' && name !== 'A' && cls !== 'profileLink')
                isValid = true;
        }
        
        if (!isValid)
            comment.remove();
    }
}

window.onload = function() {
    cleanComments();
    // Create a button the user can use to clean the comments
    var html = '<button style="position: fixed; bottom: 10px; left: 10px;">Clean comments</button>';
    var frag = document.createDocumentFragment();
    var temp = document.createElement('div');
    temp.innerHTML = html;
    var btn = temp.firstChild;
    btn.onclick = function() { cleanComments(); };
    document.body.insert(btn);
};
