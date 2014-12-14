App = {
    /**
     * A function used to call a saved callback function
     * This can be used after certain actions
     * to see if a callback was saved. If no callback was
     * saved the user will be taken to the fallback.
     *
     * @param fallback  string      format: "pageFolder/page"
     */
    callBack: function(fallback){
        if (typeof sessionStorage.callBack != "undefined"){
            var pieces = sessionStorage.getItem("callBack").split(".");
            sessionStorage.removeItem("callBack");
            Pages[pieces[0]][pieces[1]][pieces[2]]();
        }
        else {
            Pages.loadPage(fallback);
        }
    },
    /**
     * This function is called after PhoneGap has finished loading
     */
    deviceReady: function(){
        console.log("Device is ready.");

        // Listen for Hardware Button Presses
        document.addEventListener("backbutton", Pages.backBtn, false);
        document.addEventListener("menubutton", Pages.menuBtn, false);

        // Load Home Page
        Pages.loadPage(Pages.homePage);
    },
    /**
     * Called from /index.html, this starts the app
     */
    initialize: function(){
        console.log("App initializing.");

        // Check for the presence of phonegap
        if (this.isPhoneGap()) {
            console.log("On device, waiting for device ready.");
            document.addEventListener("deviceready", App.events.deviceReady, false);
        }
        else {
            // We are likely in browser testing, load dev tools
            App.DevTools.load();
        }
    },
    /**
     * Check for the presence of Phonegap variables
     * if present, then assume Phonegap is present.
     */
    isPhoneGap: function(){
        //noinspection JSUnresolvedVariable
        return typeof cordova !== "undefined" || typeof PhoneGap !== "undefined" || typeof phonegap !== "undefined";
    }
};
/**
 * A collection of handlers for different HTML controls
 */
App.controls = {
    /**
     * Optional Function to Initialize Date Inputs
     */
    dateInputHandler: function(){
        var datepicker = $('.datepicker');

        // Set the default date to today's date
        var dateObj = BBIT.time.date();
        datepicker.attr("data-value", dateObj.dateStringLZ);

        // Specify date format, see URL in picker.date.js for more info
        datepicker.pickadate({format: 'mmmm d, yyyy', formatSubmit: 'mm/dd/yyyy'});
    },
    /**
     * Handler buttons are used to call page specific functions
     *
     * To Use:
     * -------
     * 1. Attach the "handler-btn" class to an HTML button
     * 2. Assign the HTML button's "data-value" attribute the "pageFolder.page.function" you
     *    you want to call from the PageSpec.js file.
     * 3. Assign the HTML button's "data-parameter" attribute an optional string parameter
     *    that you want to pass to the function
     */
    handlerBtn: function(){
        var handlerBtn = $(".handler-btn");
        handlerBtn.unbind( "click" );
        handlerBtn.click(function(){
            var value = $(this).attr("data-value");
            var parameter = $(this).attr("data-parameter");
            var pieces = value.split(".");
            console.log("Calling Pages." + pieces[0] + "." + pieces[1] + "." + pieces[2]);
            Pages[pieces[0]][pieces[1]][pieces[2]](parameter);
        });
    },
    /**
     * Load app controls
     * This is called on every page load
     */
    loadControls: function(){
        // Control Buttons
        App.controls.handlerBtn();
        App.controls.navBtn();

        // Optional Date & Time Inputs
        App.controls.dateInputHandler();
        App.controls.timeInputHandler();
    },
    /**
     * Nav Buttons are used to navigate a user to a different page
     *
     * To Use:
     * -------
     * 1. Attach the "nav-btn" class to an HTML button
     * 2. Assign the HTML button's "data-value" attribute the "pageFolder/page" you
     *    you want to navigate to.
     * 3. There is also an option "data-callBack" that can be used to specify a
     *    page specific function to call after an action is performed on the
     *    next page. It should be given in the form "pageFolder.page.function"
     */
    navBtn: function(){
        var navBtn = $(".nav-btn");
        navBtn.unbind( "click" );
        navBtn.click(function(){
            if (typeof $(this).attr("data-callBack") != "undefined") sessionStorage.callBack = $(this).attr("data-callBack");
            Pages.loadPage($(this).attr("data-value"));
        });
    },
    /**
     * Optional Function to Initialize Time Inputs
     */
    timeInputHandler: function(){
        $('.timepicker').pickatime()
    }
};