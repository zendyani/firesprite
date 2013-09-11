/* See license.txt for terms of usage */

define([
    "firebug/firebug",
    "firebug/lib/object",
    "firebug/lib/trace",
    "firesprite/firespriteDomplate"
],
function(Firebug, Obj, FBTrace, FirespriteDomplate) {

function FirespriteInspector() {};
FirespriteInspector.prototype = {
    startInspecting: function()
    {
        if (FBTrace.DBG_FIRESPRITE)
            FBTrace.sysout("fire-sprite; firespite startInspecting()");
    },

    inspectNode: function(node)
    {
        var panel = Firebug.currentContext.getPanel("firesprite");
        FirespriteDomplate.linkUrl.replace({object: node}, panel.panelNode);
    },

    stopInspecting: function(node, canceled)
    {
        if (canceled)
            return;

        if (node.href.indexOf("http") != 0)
            return;

        // LinkInspectorPlate.linkPreview.replace({object: node}, this.panelNode);
    },

    supportsObject: function(object, type)
    {
        if (object instanceof Element)
        {
            if (object.tagName.toLowerCase() == "a")
                return 1;
        }

        return 0;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Inspector Listener

    onStartInspecting: function(context)
    {
    },

    onInspectNode: function(context, node)
    {
    },

    onStopInspecting: function(context, node, canceled)
    {
    },
};

// Firebug.registerRep(FirespriteInspector);

return FirespriteInspector;

// ********************************************************************************************* //
});
