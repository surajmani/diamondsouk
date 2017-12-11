var baseUrl = 'http://192.168.43.73/api/';
var Common = {
    beforeSend: function () {
        var header = {};
        header.Authorization = 'Bearer ' + login.logData.ClientSecret;
        return header;
    },
    Post: function (dataTopost, url, callBack, showprg) {
        $.support.cors = true;
        if (showprg == null || showprg == true) {
            Common.ShwoprogressModal();
        }
        $.ajax({
            type: "POST",
            crossDomain: true,
            url: baseUrl + '' + url,
            contentType: 'application/json',
            data: JSON.stringify(dataTopost),
            headers: this.beforeSend(),
            success: function (result) {
                if (showprg == null || showprg == true) {
                    Common.RemoveModal();
                }
                callBack(true, result);
            },
            error: function (result) {
                if (showprg == null || showprg == true) {
                    Common.RemoveModal();
                }
                if (result.status == 0) {
                    callback(false, result.statusText);
                    Common.showError("No internet, please check your internet connection");
                    return;
                }
                try {
                    callBack(false, JSON.parse(result.responseText));
                } catch (e) {

                    callBack(false, "");
                }
                try {
                    var err = JSON.parse(result.responseText);
                    Common.showError(Common.escapeRegExp(JSON.stringify(err.errors)));
                } catch (e) {
                    Common.showError(result.statusText);
                }
            }
        });
    },
    Get: function (url, callback, showprg) {
        if (showprg == null || showprg == true) {
            Common.ShwoprogressModal();
        };
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: baseUrl + '' + url,
            contentType: 'application/json',
            headers: this.beforeSend(),
            success: function (result) {
                if (showprg == null || showprg == true) {
                    Common.RemoveModal();
                };
                callback(true, result);
            },
            error: function (result) {
                console.log(result);

                if (showprg == null || showprg == true) {
                    Common.RemoveModal();
                }
                if (result.status == 0) {
                    callback(false, result.statusText);
                    Common.showError("No internet, please check your internet connection");
                    return;
                }
                try {
                    callback(false, JSON.parse(result.responseText));
                } catch (e) {
                    callback(false, result.responseText);
                }
                try {
                    var err = JSON.parse(result.responseText);
                    Common.showError(Common.escapeRegExp(JSON.stringify(err.errors)));
                } catch (e) {
                    Common.showError(result.statusText);
                }
            }
        });
    },
    LoadPage: function (url, callBack) {

        Common.ShwoprogressModal();
        $.ajax({
            type: "GET",
            url: url,
            success: function (result) {
                Common.RemoveModal();
                callBack(true, result);
            },
            error: function (result) {
                Common.RemoveModal();
                callBack(false, JSON.parse(result.responseText));
            }
        });
    },
    ShwoprogressModal: function () {
        try {
            var mDocument = document.getElementsByClassName('bg')[0];
            document.getElementById('openModalProgress').style.width = mDocument.clientWidth + 'px';
            document.getElementById('openModalProgress').style.left = mDocument.offsetLeft + 'px';
            $('#openModalProgress').addClass('showModal');
        } catch (e) { }
    },
    RemoveModal: function () {
        $('#openModalProgress').removeClass('showModal');
    },
    showError: function (str) {
        mAlert.Ini(mAlert.Type.ERROR, 300, 150, 'ERROR', str);

    },
    showInfo: function (str, callback) {
        mAlert.Ini(mAlert.Type.INFO, 300, 150, 'INFO', str, callback);
    },

    showConfirmDialog: function (str, callBack) {
        mAlert.Ini(mAlert.Type.YESNO, 300, 150, 'INFO', str, callBack);
    }
    ,
    escapeRegExp: function (tr) {
        return tr.replace(/"/g, '').replace(/{/g, '').replace(/}/g, '').replace(/\[/g, '').replace(/]/g, '').replace(/:/g, ' ');
    },
    SetJsonToLocal(key, Json) {
        localStorage.setItem(key, JSON.stringify(Json));
    },
    GetJsonFromLocal(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    initializeSite: function () {
        localStorage.removeItem("ChorusUserDetail");
        localStorage.removeItem("chorusSives");
    },
    PrintInnerHtml(ele, data) {
        $(ele).html(data);
    },
    GetCustomer: function () {
        login.logData = JSON.parse(this.GetJsonFromLocal("ChorusUserDetail"));
        if (login.logData == null) {
            window.location.href = "index.html";
        }

    },
    GetSieves: function () {
        if (login.logData.ClientSecret == "") {
            return;
        }
        var sieves = this.GetJsonFromLocal("chorusSives");
        if (sieves == null) {
            this.Get("products/get_product_sieve_ratio", function (s, r) {
                Common.SetJsonToLocal("chorusSives", JSON.stringify(r));
                sieves = JSON.parse(Common.GetJsonFromLocal("chorusSives"));

                return sieves;
            }, false);
        }
        else {
            return JSON.parse(sieves);
        }
    },
    GetValueFromObject(obj, k) {
        var rtn = null;
        Object.keys(obj).forEach(function (key) {
            if (k.toLowerCase() == key.toLowerCase()) {
                rtn = obj[key]
            }
        });
        return rtn;
    },
    removeFromArray: function (arrOriginal, elementToRemove) {
        return arrOriginal.filter(function (el) { return el !== elementToRemove });
    },
    AutoComplete: function (elem, autoPopdata, callback) {
        var id = "autoPop" + new Date().getMilliseconds();
        var div = document.createElement("div");
        div.id = id;
        div.style.display = "none";
        elem.setAttribute("autoPopID", id);
        div.className = "autoPop";
        div.style.top = elem.top + elem.offsetHeight + "px";
        div.style.width = elem.offsetWidth + "px";
        elem.parentNode.appendChild(div);
        elem.onkeyup = (function () {
            var autoPopID = elem.getAttribute("autoPopID");
            div.innerHTML = "";
            for (s in autoPopdata) {
                if (autoPopdata[s].Name.toLowerCase().indexOf(this.value.toLowerCase()) > -1) {
                    var option = document.createElement("div");
                    option.innerHTML = autoPopdata[s].Name;
                    option.setAttribute("val", autoPopdata[s].id);
                    div.appendChild(option);
                    option.onclick = function () {
                        elem.value = this.innerHTML;
                        callback({ value: this.getAttribute("val"), text: this.innerHTML });
                        div.innerHTML = "";
                        document.getElementById(autoPopID).style.display = "none";
                    }
                }
            }
            document.getElementById(autoPopID).style.display = "block";
        });

    }
    , LoadUserImage: function (elem) {

    }
}


var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        app.setupPush();
    },
    setupPush: function () {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "956859149736"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function (data) {
            console.log('registration event: ' + data.registrationId);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function (e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function (data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
        });
    }
};








