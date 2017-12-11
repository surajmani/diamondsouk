/// <reference path="site.js" />

var login = {
    DoLogin: function () {

        var dataTopost = { unm: $('#unm').val(), pwd: $('#pwd').val() };
        Common.Post(dataTopost, 'customers/Login?Email=' + dataTopost.unm + '&Password=' + dataTopost.pwd, login.HandleResponse);
    },
    HandleResponse: function (status, result) {
        if (status == false) {
            Common.showError(Common.escapeRegExp(JSON.stringify(result.errors)));
        }
        else if (status == true) {
            try {
                var rem = Common.GetJsonFromLocal("chorusRem");
                if (rem == null) {
                    rem = false;
                }
                if (rem == false) {
                    Common.SetJsonToLocal("unm", "");
                    Common.SetJsonToLocal("pwd", "");
                }
                else {
                    Common.SetJsonToLocal("unm", $("#unm").val());
                    Common.SetJsonToLocal("pwd", $("#pwd").val());
                }
                login.logData = result;
                Common.SetJsonToLocal('ChorusUserDetail', JSON.stringify(result));
                window.location.href = "newOrder.html";
                //Common.LoadPage("newOrder.html", function (s, r) {
                //    //Commom.showError(s);
                //    $("#container").html(r);
                //    //Commom.showError(r);
                //});
            } catch (e) {
                Common.showError(e.message);
            }
        }
    },
    rememberMe: function (elem) {
        var rem = Common.GetJsonFromLocal("chorusRem");
        console.log(rem);
        if (rem == null) {
            rem = false;
        }
        rem = !rem;
        if (rem == true) {
            $(elem).children('img').attr('src', "img/radio_chkecked.png");
        }
        else {
            $(elem).children('img').attr('src', "img/radio_unchkecked.png");
        }
        Common.SetJsonToLocal("chorusRem", rem);
    },
    logOut:function(){
        this.logData = null;
        Common.SetJsonToLocal("ChorusUserDetail", null);
        window.location.href = "index.html";
    },
    logData: { Name: "", Id: "", ClientId: "", ClientSecret: "", CallbackUrl: "", IsActive: "", AuthenticationCode: "", UserImageName: "", CartCount: "" }
}