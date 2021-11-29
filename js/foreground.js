// document.querySelector('#contents_wrapper').classList.add('styletest')
console.log('foreground.js loaded')

var iframe = document.getElementById("ctl00_cphBody_genericIFrame");

// if iframe exists:
if (iframe) {
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    console.log("iframe found");
    // send message to background.js that reg_page = true
    chrome.runtime.sendMessage({"reg_page": "true"});
} else {
    console.log("iframe not found");
    // send message to background.js that reg_page = false
    chrome.runtime.sendMessage({"reg_page": "false"});
}


//get manual add first tab button
var firstTabButton = iframeDoc.getElementById("__tab_ctl00_Body_tabRWS_tpnRWS1");
console.log(firstTabButton);
// if addCourseButton does not exist, then the page is not the add course page
if (firstTabButton == null || firstTabButton == undefined){
    console.log("First Tab Link Button not found");
    // registration is closed
    console.log("Registration is closed");
    
    if (iframeDoc.querySelector('#ct100_Body_lblNoAccessMsg')) {
        iframeDoc.querySelector('#ctl00_Body_lblNoAccessMsg').innerHTML = '<h1>AutoReg ACTIVE</h1>';
    }


    chrome.runtime.sendMessage({
        "reg_open": "false"
    });
} else {
    console.log("First Tab Link Button Found");
    // registraion is open
    

    chrome.runtime.sendMessage({
        "reg_open": "true"
    });
// get the dropdown if class full select
var dropdown = iframeDoc.getElementById("ctl00_Body_ddlFullCourseOption");
// select "Waitlist Me from dropdown to prevent additional messages/steps if a class is full"
dropdown.value = "add_to_waitlist";

//select first choice tab

    var firstChoiceTab = iframeDoc.getElementById("ctl00_Body_tabRWS_tpnRWS1"); //change to second choice "ctl00_Body_tabRWS_tpnRWS2"


    //get array of courses in side of tab
    var choices = firstChoiceTab.getElementsByClassName("lnkAddCourse");

    // for i in choices, print to console
    for (i = 0; i < choices.length; i++) {
        
        console.log("course" + i);
        choices[i].click();
    }

    // send message to background.js to not reload the page
    chrome.runtime.sendMessage({
        "continue": "false"
    });
}

function querySelectorIncludesText (doc, selector, text){
    return Array.from(doc.querySelectorAll(selector))
      .find(el => el.textContent.includes(text));
  }