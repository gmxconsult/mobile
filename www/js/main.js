function init() {
    document.addEventListener("deviceready", deviceReady, true);
    delete init;
}


function checkPreAuth() {
    $.mobile.changePage("principal.html", { allowSamePageTransition: true, reloadPage: true, transition: "none" });
    //var form = $("#loginForm");
   // if (window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
   //     $("#username", form).val(window.localStorage["username"]);
    //    $("#password", form).val(window.localStorage["password"]);
        //handleLogin();
        //navigator.notification.alert("You must enter a username and password", function () { });

     //   $.mobile.changePage("principal.html", { allowSamePageTransition: true, reloadPage: true, transition: "none" });
       // $.mobile.changePage("principal.html");
   // }
    
}

function handleLogin() {
    var form = $("#loginForm");
    //disable the button so we can't resubmit while we wait
    $("#submitButton", form).attr("disabled", "disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    console.log("click");
    if (u != '' && p != '') {
        $.post("http://www.coldfusionjedi.com/demos/2011/nov/10/service.cfc?method=login&returnformat=json", { username: u, password: p }, function (res) {
            if (res == false) {
                //store
                window.localStorage["username"] = u;
                window.localStorage["password"] = p;
                $.mobile.changePage("principal.html");
            } else {
                 navigator.notification.alert("Your login failed", function () { });
                
            }
            $("#submitButton").removeAttr("disabled");
        }, "json");
    } else {
        //Thanks Igor!
        navigator.notification.alert("You must enter a username and password", function () { });
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

function deviceReady() {

    $("#loginForm").on("submit", handleLogin);

}