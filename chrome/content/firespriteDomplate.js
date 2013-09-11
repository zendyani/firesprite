/* See license.txt for terms of usage */

define([
    "firebug/firebug",
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/lib/domplate"
],
function(Firebug, Obj, FBTrace, Locale, Domplate) {

var {domplate, DIV, IFRAME} = Domplate;

var FirespriteDomplate = domplate(
{
    linkUrl:
        DIV({"class": "linkUrl"},
            "$object.href"
        ),

    linkPreview:
        IFRAME({"class": "linkPreview", "src": "$object.href"}),

    defaultContent:
        DIV({"class": "defaultContent"},
            "Use Firebug Inspector and try to inspect a link on the current page."
        )
});

return FirespriteDomplate;

// ********************************************************************************************* //
});
