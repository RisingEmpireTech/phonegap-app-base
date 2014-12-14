App.DevTools = {
    load: function(){
        // Add event listener to simulate device hardware buttons
        this.simHWButtons();

        // All Dev Tools Loaded, So Start App
        App.deviceReady();
    },
    simHWButtons: function(){
        document.addEventListener("keydown", function(e) {
            // Capture keypress for navigation purposes
            // to simulate back and menu buttons
            if (e.which == 27 || e.which == 93){
                e.preventDefault();
                if (e.which == 27) Pages.backBtn(); // Esc Key
                if (e.which == 93) Pages.menuBtn(); // Menu (Select) Key
                // See http://css-tricks.com/snippets/javascript/javascript-keycodes/
                // for other key options.
            }
        }, false);
        console.log("Added key listener, to simulate hardware buttons.");
        console.log("Escape key for back button, and Menu (Select) key for menu");
    }
};