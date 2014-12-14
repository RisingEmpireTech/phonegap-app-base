Pages = {
    homePage: "main/index",
    menuPage: "main/index",
    currentPage: this.homePage,
    nextPage: null,
    pageHistory: [],
    backBtn: function(){
        if (Pages.currentPage != this.homePage){
            if (typeof e !== "undefined") e.preventDefault();
            Pages.loadPage(Pages.pageHistory.pop(), true);
        }
        else {
            navigator.app.exitApp();
        }
    },
    menuBtn: function(){
        Pages.loadPage(this.menuPage);
    }
};

// i.e. pageName = "pageFolder/page"
Pages.loadPage = function(pageName, goback){
    if (typeof goback === "undefined") Pages.unloadPage();
    $("#content").load("pages/" + pageName + ".html", Pages.newPageLoaded);
    Pages.currentPage = pageName;
    console.log(pageName + " page loaded.");
};

Pages.newPageLoaded = function(){
    // Load default controls
    App.controls.loadControls();

    // Checks for page specific onLoad and triggers it.
    var currentPage = Pages.currentPage;
    var objPieces = currentPage.replace("-", "").split("/");
    if (typeof Pages[objPieces[0]] !== "undefined"){
        if (typeof Pages[objPieces[0]][objPieces[1]] !== "undefined"){
            var page = Pages[objPieces[0]][objPieces[1]];
            if (typeof page.onLoad !== "undefined") page.onLoad();
        }
    }
};

Pages.unloadPage = function(){
    // Add current page to the history stack
    Pages.pageHistory.push(Pages.currentPage);

    // Clear the contents of the contentBody container
    $("#content").html("");
};