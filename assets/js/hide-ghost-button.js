/**
 * A script to hide the "Publish with Ghost" button on the signup portal popup.
 * 
 * This task was made more difficult by the use of an iframe as it prohibits CSS selectors from accessing it.
 * This solution uses jQuery to detect when an iframe has been added to the DOM and then attempts to hide the
 * button by accessing the iframe's content window using jQuery.
 */

$(document).ready(function() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length === 1 && mutation.addedNodes[0].firstChild.nodeName === 'IFRAME') {
                // An iframe has been added
                var iframe = $(mutation.addedNodes[0].firstChild);
                if (iframe.attr('title') === 'portal-popup') {
                    // This is the correct iframe, let's wait for it to load
                    iframe.ready(function() {
                        // Wait a bit for the elements to be populated
                        setTimeout(function() {
                            // Hide the ghost button
                            iframe.contents().find('body').find('.gh-portal-powered').hide()
                        }, 10);
                    });
                }
            }
        });
    });

    var config = {
        attributes: true,
        childList: true,
        characterData: true
    };

    var portalRootEl = $('#ghost-portal-root').get(0);
    observer.observe(portalRootEl, config);
});
