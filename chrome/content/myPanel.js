/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firesprite/firespriteDomplate"
],
function(Obj, FBTrace, Locale, firespriteDomplate) {

// ********************************************************************************************* //
// Custom Panel Implementation

var panelName = "fireSprite";

Firebug.MyPanel = function MyPanel() {};
Firebug.MyPanel.prototype = Obj.extend(Firebug.Panel,
{
    name: panelName,
    title: "fireSprite",
    inspectable: true,
    inspectHighlightColor: "green",

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    initialize: function()
    {
        Firebug.Panel.initialize.apply(this, arguments);
        
        Firebug.Inspector.addListener(this);
    },

    destroy: function(state)
    {
        Firebug.Panel.destroy.apply(this, arguments);

        Firebug.Inspector.removeListener(this);
    },

    show: function(state)
    {
        Firebug.Panel.show.apply(this, arguments);

        // this.MyTemplate.render(this.panelNode);
    },
        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Inspector API implementation

    startInspecting: function()
    {
        if (FBTrace.DBG_FIRESPRITE)
            FBTrace.sysout("fire-sprite; startInspecting()");
    },

    inspectNode: function(node)
    {
        if (FBTrace.DBG_FIRESPRITE)
            FBTrace.sysout("fire-sprite; inspectNode(node: " + node.tagName + ")");

        firespriteDomplate.linkUrl.replace({object: node}, this.panelNode);
    },

    stopInspecting: function(node, canceled)
    {
        if (FBTrace.DBG_FIRESPRITE)
            FBTrace.sysout("fire-sprite; stopInspecting(node: " + node.tagName +
                ", canceled: " + canceled + ")");

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
        if (FBTrace.DBG_FIRESPRITE)
            FBTrace.sysout("fire-sprite; Listener.onStartInspecting(context: " +
                context.getTitle() + ")");
    },

    onInspectNode: function(context, node)
    {
        if (FBTrace.DBG_FIRESPRITE)
            FBTrace.sysout("fire-sprite; Listener.onInspectNode(context: " +
                context.getTitle() + ", node: " + node.tagName + ")");
    },

    onStopInspecting: function(context, node, canceled)
    {
        if (FBTrace.DBG_FIRESPRITE)
            FBTrace.sysout("fire-sprite; Listener.onStopInspecting(context: " +
                context.getTitle() + ", node: " + node.tagName + ", canceled: " +
                canceled + ")");
    },


});

// ********************************************************************************************* //
// Panel UI (Domplate)

// Register locales before the following template definition.
Firebug.registerStringBundle("chrome://firesprite/locale/firesprite.properties");

/**
 * Domplate template used to render panel's content. Note that the template uses
 * localized strings and so, Firebug.registerStringBundle for the appropriate
 * locale file must be already executed at this moment.
 */
// with (Domplate) {
// Firebug.MyPanel.prototype.MyTemplate = domplate(
// {
//     tag:
//         SPAN(
//             Locale.$STR("firesprite.panel.label")
//         ),

//     render: function(parentNode)
//     {
//         this.tag.replace({}, parentNode);
//     }
// })}

// ********************************************************************************************* //
// Registration

Firebug.registerPanel(Firebug.MyPanel);
Firebug.registerStylesheet("chrome://firesprite/skin/hellobootamd.css");

return Firebug.MyPanel;

// ********************************************************************************************* //
});
