/* See license.txt for terms of usage */

// ********************************************************************************************* //
// XPCOM

var {classes: Cc, interfaces: Ci, utils: Cu} = Components;

// ********************************************************************************************* //
// Constants

// Extension installation path. Set within startup callback.
var installPath;

// ********************************************************************************************* //
// Firefox Bootstrap API

function install(data, reason) {}
function uninstall(data, reason) {}

function startup(data, reason)
{
    // Remember so, we can use later within firebugStartup callback.
    installPath = data.installPath;

    // Firebug extension start-up callback. Since extension load order isn't guaranteed
    // the code needs to be ready for two alternatives:
    // 1) Firebug is already loaded - good, let's just execute firebugStartup() callback
    // that will ensure proper Firebug related initialization for this extension.
    // 2) Firebug is not loaded yet - as soon as Firebug is loaded it'll execute this
    // method automatially.
    firebugStartup();
}

function shutdown(data, reason)
{
    firebugShutdown();
}

function isFirebugLoaded()
{
    try
    {
        // Import Firebug modules into this scope. It fails if Firebug isn't loaded yet.
        Cu.import("resource://firebug/loader.js");
        Cu.import("resource://firebug/prefLoader.js");

        return true;
    }
    catch (e)
    {
        // Report the error only if you want to track cases where this extension
        // is loaded before Firebug.
        //Cu.reportError(e);
    }

    return false;
}

// ********************************************************************************************* //
// Firebug Bootstrap API

/**
 * Executed by Firebug framework when Firebug is started. Since the order of Firebug
 * and its bootstrapped extensions is not guaranteed this function is executed twice.
 * 1) When Firebug is loaded
 * 2) When this extension is loaded
 */
function firebugStartup()
{
    // If Firebug isn't loaded just bail out, Firebug will execute this method
    // as soon as it loads.
    if (!isFirebugLoaded())
        return;

    // At this point, Firebug is loaded and we can use its API.
    FirebugLoader.registerBootstrapScope(this);

    // Load default preferences
    PrefLoader.loadDefaultPrefs(installPath, "prefs.js");
}

/**
 * Executed by Firefox when this extension shutdowns.
 */
function firebugShutdown()
{
    try
    {
        FirebugLoader.unregisterBootstrapScope(this);
    }
    catch (e)
    {
        Cu.reportError(e);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

/**
 * Executed by Firebug framework for every browser window. Use this function to append
 * any new elements into the browser window (browser.xul). Don't forget to remove
 * these elements in topWindowUnload.
 * 
 * @param {Window} win The browser window
 */
function topWindowLoad(win)
{
    // TODO: overlay global browser window
}

/**
 * Executed by Firebug framework when this extension
 * @param {Object} win
 */
function topWindowUnload(win)
{
    // TODO: remove global browser window overlays
}

/**
 * Entire Firebug UI is running inside an iframe (firebugFrame.xul). This function
 * is executed by Firebug framework when the frame is loaded. This happens when
 * the user requires Firebug for the first time (doesn't have to happen during the
 * Firefox session at all)
 * 
 * @param {Window} win The Firebug window
 */
function firebugFrameLoad(Firebug)
{
    // Register trace listener the customizes trace logs coming from this extension
    // * helloBootAMD; is unique prefix of all messages that should be customized.
    // * DBG_HELLOBOOTAMD is a class name with style defined in the specified stylesheet.
    Firebug.registerTracePrefix("fireSprite;", "DBG_FIRESPRITE", true,
        "chrome://firesprite/skin/hellobootamd.css");

    // The registration process will automatically look for 'main' module and load it.
    // The is the same what happens in a XUL overlay applied on:
    // chrome://firebug/content/firebugOverlay.xul
    var config = {id: "firesprite@janodvarko.cz"};
    Firebug.registerExtension("firesprite", config);
}

function firebugFrameUnload(Firebug)
{
    if (!Firebug.isInitialized)
        return;

    Firebug.unregisterExtension("firesprite");
    Firebug.unregisterTracePrefix("fireSprite;");
}

// ********************************************************************************************* //
