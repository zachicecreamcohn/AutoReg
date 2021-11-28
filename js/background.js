// this url will be compared to current tab. If they're equal, foreground.js is injected
var reg_url = "https://acadinfo.wustl.edu/WSHome/Generic.aspx?Type=Registration&Page=/apps/Registration/"
var reg_url_2 = "https://acadinfo.wustl.edu/WSHome/Generic.aspx?Type=Registration&Page=%2fapps%2fRegistration%2f"
var reg_url_3 = "https://acadinfo.wustl.edu/WSHome/Generic.aspx?MenuID=67&Page=/apps/Registration/"
var reg_url_4 = "https://acadinfo.wustl.edu/WSHome/Generic.aspx?Type=Registration&Page=/apps/Registration/"
// var target_url = "https://www.saucedemo.com/inventory.html"

var continue_to_run = true;

        
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // chrome.tabs.onActivated.addListener(tab => {
        console.log("continue_to_run: " + continue_to_run)
        if (continue_to_run == true) {
        current_tab_info = tab
            console.log(current_tab_info.url)
            if (reg_url == current_tab_info.url || reg_url_2 == current_tab_info.url || reg_url_3 == current_tab_info.url || reg_url_4 == current_tab_info.url) {
                chrome.tabs.insertCSS(null, {file: "./css/background.css"})

                chrome.tabs.executeScript(null, {
                    file: "./js/foreground.js"
                },
                    () => console.log("foreground.js injected"));
                
            } else {
                console.log("foreground.js NOT injected. Not registration page.")
            }
        } else {
            console.log("foreground.js NOT injected. continue_to_run is false.")
        }
    });


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.reg_open);
    if (request.reg_open == "true") {
        console.log("reg_open is true");
        continue_to_run = false;
    } else if (request.reg_open == "false") {
        console.log("reg_open is false");
        continue_to_run = true;
        // reload page
        chrome.tabs.reload(current_tab_info.id);
    
    }
    if (request.continue == "false") {
        console.log("background.js received STOP message from foreground.js");
        // stop running script on the page
        alert("RSW1 Classes Have Been Added! Restart your browser to use the extension again.")
        continue_to_run = false;
    }
    if (request.reg_page == "true") {
        console.log("is reg page")
    } else if (request.reg_page == "false") {
        console.log("is NOT reg page")
        continue_to_run = false;
    }
});
   

chrome.windows.onRemoved.addListener(function(windowId) {
    continue_to_run = true;
});