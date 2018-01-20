var ZohoCrmClient = {
    Auth: "e057cb8634f472fe925074144c61fd24",
    z: "086df670be49b3c22f448e918d1b2d28",
    insertRecords: function (comapny,fnm,lnm,email,title,ph) {
        var url = "https://crm.zoho.com/crm/private/json/Leads/insertRecords";
        var data2 = '<Leads><row no="1"><FL val="Lead Source">Online Store</FL><FL val="Company">' + comapny + '</FL><FL val="First Name">' + fnm + '</FL><FL val="Last Name">' + lnm + '</FL><FL val="Email">' + email + '</FL><FL val="Title">' + title + '</FL><FL val="Phone">' + ph + '</FL><FL val="Mobile">' + ph + '</FL><FL val="Lead Status">Attempted to Contact</FL></row></Leads>';


        //var formData = { "authtoken": this.Auth, "newFormat": 1, "scope": "crmapi", "xmlData": data2 };
        //formData.append("authtoken", this.Auth);
        //formData.append("newFormat", 1);
        //formData.append("scope", "crmapi");
        //formData.append("xmlData", data2);
        url += '?authtoken=' + this.Auth + '&newFormat=1&scope=crmapi&xmlData='+encodeURI(data2);

        $.ajax({
            type: "POST",
            url: url,
            //contentType: 'xml',
           // data: JSON.stringify(formData),
            success: function (result) {
                console.log(result);
                
            },
            error: function (result) {
                console.log(result);
            }
        });
    },
    getRecords: function () {
        var url = 'https://crm.zoho.com/crm/private/json/Leads/getRecords?authtoken=' + this.Auth + '&scope=crmapi';
        console.log(url);
        $.ajax({
            type: "GET",
            url: url,
            contentType: 'application/json',
            success: function (result) {
                console.log(result);               
            },
            error: function (result) {
                console.log(result);

            }
        });
    }
}
