/// <reference path="D:\WORK\WebCustomPlugin\CommonJS/jquery.min.js" />

var mAlert = {
    Type: new Enum('INFO', 'WARNING', 'ERROR', 'YESNO'),
    ////////type = Diailog type
    Ini: function (type, width, height, title, message, yesCallBack, noCallBack) {
        var mDocument = document.getElementsByClassName('bg')[0];
        var mAlertDialog = document.createElement('div');
        mAlertDialog.className = 'mAlertDialog';
        mAlertDialog.style.width = mDocument.clientWidth + 'px';
        mDocument.appendChild(mAlertDialog);
        console.log(mDocument.clientHeight + 'px');
        var mAlertDialogBody = document.createElement('div');
        mAlertDialogBody.style.width = width + 'px';
        mAlertDialogBody.style.height = height + 'px';
        mAlertDialogBody.className = 'mAlertDialogBody';
        //mAlertDialogBody.innerHTML = 'mAlertDialogBody';
        mAlertDialog.appendChild(mAlertDialogBody);


        var mAlertHeading = document.createElement('div');
        mAlertHeading.className = 'mAlertHeading';
        mAlertHeading.innerHTML = title;
        mAlertDialogBody.appendChild(mAlertHeading);

        var mAlertClose = document.createElement('div');
        mAlertClose.innerHTML = '';
        mAlertClose.className = 'mAlertClose';
        mAlertHeading.appendChild(mAlertClose);
        mAlertClose.onclick = function () {
            mAlert.RemoveDiaLog(mAlertDialog);
        };

        var mAlertMessage = document.createElement('div');
        mAlertMessage.className = 'mAlertMessage';
        mAlertMessage.innerHTML = '<div class="mAlertMessageBody">' + message + '</div>';
        mAlertDialogBody.appendChild(mAlertMessage);

        if (type != 0 && type != 1) {
            var mAlertFooter = document.createElement('div');
            mAlertFooter.className = 'mAlertFooter';
            mAlertDialogBody.appendChild(mAlertFooter);

            var mAlertFooterOK = document.createElement('button');
            mAlertFooterOK.className = 'mAlertFooterOk mAlertFooterButton';
            if (type == 2) {
                mAlertFooterOK.className = 'mAlertFooterOk mAlertFooterOkOnly mAlertFooterButton';
            }

            mAlertFooter.appendChild(mAlertFooterOK);

            if (type == 3) {
                mAlertFooterOK.textContent = 'Yes';
                mAlertFooterOK.className = mAlertFooterOK.className + ' mAlertFooterYes';
                var mAlertFooterNo = document.createElement('button');
                mAlertFooterNo.textContent = 'No';
                mAlertFooterNo.onclick = function () {
                    mAlert.RemoveDiaLog(mAlertDialog);
                    if (noCallBack != null)
                    {
                        noCallBack();
                    }
                }
                mAlertFooter.appendChild(mAlertFooterNo);

                mAlertFooterNo.className = 'mAlertFooterOk mAlertFooterButton mAlertFooterNo';
                mAlertFooterOK.onclick = function () {
                    mAlert.RemoveDiaLog(mAlertDialog);
                    yesCallBack();
                };
            }
            else {
                mAlertFooterOK.textContent = 'OK';
                mAlertFooterOK.onclick = function () {
                    mAlert.RemoveDiaLog(mAlertDialog);
                    if (yesCallBack != null) {
                        yesCallBack();
                    }
                }


            }
        }
        if (type == 0 && yesCallBack != null) {
            var mAlertFooter = document.createElement('div');
            mAlertFooter.className = 'mAlertFooter';
            mAlertDialogBody.appendChild(mAlertFooter);
            var mAlertFooterOK = document.createElement('button');
            mAlertFooterOK.className = 'mAlertFooterOk mAlertFooterButton';
            if (type == 0) {
                mAlertFooterOK.className = 'mAlertFooterOk mAlertFooterOkOnly mAlertFooterButton';
            }

            mAlertFooter.appendChild(mAlertFooterOK);
            mAlertFooterOK.textContent = 'OK';
            mAlertFooterOK.onclick = function () {
                mAlert.RemoveDiaLog(mAlertDialog);
                yesCallBack();
            }
        }
        var mTop = (mAlertDialog.clientHeight - height) / 2;
        var mCounter = (-1 * height);
        mAlertDialogBody.style.marginTop = mCounter + 'px';
        var mAlertTimer = setInterval(function () {
            mCounter = mCounter + 10;
            mAlertDialogBody.style.marginTop = mCounter + 'px';
            if (mCounter >= mTop) {
                clearInterval(mAlertTimer);
                var mUperLimit = mCounter - 20;
                var mAlertTimerUp = setInterval(function () {
                    mCounter = mCounter - 1;
                    mAlertDialogBody.style.marginTop = mCounter + 'px';
                    if (mCounter == mUperLimit) {
                        clearInterval(mAlertTimerUp);
                        var mAlertTimerDown = setInterval(function () {

                            mCounter = mCounter + 1;
                            mAlertDialogBody.style.marginTop = mCounter + 'px';
                            if (mCounter >= mTop) {
                                clearInterval(mAlertTimerDown);
                            }
                        }, 8);
                    }
                }, 12);
            }
        }, 5);

        mAlertHeading.className = mAlertHeading.className + ' mAlert' + this.Type.name(type);
    },
    RemoveDiaLog: function (dialog) {
        var mDocument = document.getElementsByClassName('bg')[0];
        mDocument.removeChild(dialog);
    },
};


function Enum() {
    var that = this;
    for (var i in arguments) {
        that[arguments[i]] = i;
    }
    this.name = function (value) {
        for (var key in that) {
            if (that[key] == value) {
                return key;
            }
        }
    };
    this.exist = function (value) {
        return (typeof that.name(value) !== "undefined");
    };
    if (Object.freeze) {
        Object.freeze(that);
    }
}

