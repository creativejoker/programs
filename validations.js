var doc = document;
var requestedMode = null;
var gE = function (id) { return document.getElementById(id); };
var arrErrorList = null;
var strDateStatus = "";
var isIE6 = null;
var isNetscape = null;
var newwindow = ''; // For BRHelp window
var CloseAlert = false; //This Code for GLBranch
var F2ReturnValue = null;
var Ctrl_IDValue;
var Ctrl_TypeID;
var th = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
var dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
var tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
var tw = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
var resdiag = null;
var str;
var strDialog = null;
var BravailHeight = window.screen.availHeight;
if (navigator.appName == 'Netscape') isNetscape = true; else isIE6 = true;

function fnSetFocus(textField) {
    if (typeof (textField) == "string") {
        if (fnGetControl(textField).disabled == false) {
            if (textField.indexOf("igtxtCQuestions") == "-1") {
                fnGetControl(textField).focus();
            }
        }
    }
    else {
        textField.setFocus();
    }
}


function fnGroupFocus() {
    fnSetFocus("btnGroupDetail");
}

String.prototype.Format = function () {
    if (arguments.length == 0)
        return this;
    var strRet = this;
    for (var i = 0; i < arguments.length; i++) {
        strRet = strRet.replace("{" + i + "}", arguments[i]);
    }
    return strRet;
};
/****************************************************************************************
    Function/Procedure  Name            :- fnEnableReadonly
    functionality                       :- This function will set readonly to the controls and will take  arguments as param array
    Parameters                          :- ControlId to Enable   with comma separated( Ex ("txtCleintId","txtAddress","txtPhone")
    returns                             :- boolean
    written by                          :- Siva Mohan Reddy.

****************************************************************************************/
function fnEnableReadonly(textField) {
    gE(textField).readonly = true;
}

/****************************************************************************************
    Function/Procedure  Name            :- fnEnableFields
    functionality                       :- This function will take arguments as param array and  Enable coresponding fields
    Parameters                          :- ControlId to Enable with comma separated( Ex ("txtCleintId","txtAddress","txtPhone")
    returns                             :- None
    written by                          :- Siva Mohan Reddy.

****************************************************************************************/

function fnEnableFields() {
    for (var i = 0; i < arguments.length; i++) {
        if (brIsIgCtl(arguments[i]) == true) {
            var ctl = ig_getWebControlById(arguments[i]);
            if (ctl == null)
                ctl = ig_getWebControlById(brGetControlId(arguments[i]));
            if (ctl == null)
                ctl = igedit_getById(arguments[i]);
            if (ctl == null) {
                ctl = fnGetControl(arguments[i]);
                ctl.disabled = false;
                continue;
            }
            ctl.setEnabled(true);
        }
        else if (typeof (arguments[i]) == "string") {
            if (fnGetControl(arguments[i]) != null)
                fnGetControl(arguments[i]).disabled = false;
        }
        else {
            arguments[i].setEnable();
        }
    }
}
function CheckSameUser(OperatorID, UserID) {
    if (OperatorID == UserID)
        return true;
    else
        return false;



}


// this function for to enable infragistic buttons.
function fnbtnEnable() {
    for (var i = 0; i < arguments.length; i++) {
        var button = ig_getWebControlById(brGetControlId(arguments[i]));
        button.setEnabled(true);
    }
}

/****************************************************************************************
    Function/Procedure  Name            :- fnDisableFields
    functionality                       :- This function will take arguments as param array and  Disable coresponding fields
    Parameters                          :- ControlId to Disable with comma separated( Ex ("txtCleintId","txtAddress","txtPhone")
    returns                             :- None
    written by                          :- Siva Mohan Reddy.

****************************************************************************************/

function fnDisableFields() {
    for (var i = 0; i < arguments.length; i++) {
        if (brIsIgCtl(arguments[i]) == true) {
            var ctl = ig_getWebControlById(arguments[i]);
            if (ctl == null)
                ctl = ig_getWebControlById(brGetControlId(arguments[i]));
            if (ctl == null)
                ctl = igedit_getById(arguments[i]);
            if (ctl == null) {
                ctl = fnGetControl(arguments[i]);
                ctl.disabled = true;
                continue;
            }
            ctl.setEnabled(false);
        }
        else if (typeof (arguments[i]) == "string") {
            fnGetControl(arguments[i]).disabled = true;
        }
        else {
            arguments[i].setDisable();
        }
    }
}

function fnbtnDisable() {
    for (var i = 0; i < arguments.length; i++) {
        var button = ig_getWebControlById(brGetControlId(arguments[i]));
        button.setEnabled(false);
    }
}

function fnSetFieldsToEmptyValue() {
    for (var i = 0; i < arguments.length; i++) {
        fnGetControl(arguments[i]).value = "";
    }
}

function fnSetFieldsToEmptyValueLabel() {
    for (var i = 0; i < arguments.length; i++) {
        fnGetControl(arguments[i]).innerHTML = "";
    }
}
/****************************************************************************************
    Function/Procedure  Name            :- fnSelectCombo
    functionality                       :- This function will take arguments as param array and  will select the first value of the Combobox
    Parameters                          :- ControlId to Select with comma separated( Ex ("cboCleintId","cboAddress","cboPhone")
    returns                             :- None
    written by                          :- Siva Mohan Reddy.
	Modified By                         : Pothirajan C on 25/08/05
****************************************************************************************/

function fnSelectCombo() {
    var SelectedItem = 0;
    if (arguments.length == 0) {
        return false;
    }

    for (var i = 0; i < arguments.length; i++) {
        SelectedItem = 0;
        for (var j = 0; j < fnGetControl(arguments[i]).options.length; j++) {
            if (fnGetControl(arguments[i]).options[j].defaultSelected == true) {
                SelectedItem = j;
                break;
            }
        }
        if (fnGetControl(arguments[i]).options.length != 0)
            fnGetControl(arguments[i]).options[SelectedItem].selected = true;

    }
}

/****************************************************************************************
    Function/Procedure  Name            :- fnClearTextBox
    functionality                       :- This function will clear the Texboxes and will take  arguments as param array
    Parameters                          :- ControlId  with comma separated( Ex ("txtCleintId","txtAddress","txtPhone")
    returns                             :- None
    written by                          :- Siva Mohan Reddy.

****************************************************************************************/

function fnClearTextBox() {
    for (var i = 0; i < arguments.length; i++) {
        fnEnableFields(arguments[i]);
        if (brIsIgCtl(arguments[i]) == true) {
            var ctl = ig_getWebControlById(brGetControlId(arguments[i]));
            if (ctl == null)
                ctl = igedit_getById(brGetControlId(arguments[i]));
            if (ctl == null) {
                ctl = fnGetControl(arguments[i]);
                fnSetValue(arguments[i], "");
                ctl.value = "";
                fnDisableFields(arguments[i]);
                continue;
            }
            fnSetValue(arguments[i], "");
            ctl.setValue("");
        }
        else {
            fnGetControl(arguments[i]).value = "";
        }
        fnDisableFields(arguments[i]);
    }
}

/****************************************************************************************
    Function/Procedure  Name            :- fnCheckIfFilled
    functionality                       :- Displays an Err message in Lable Control if field is not filled for all the given controls and put focus on the controls.
    Parameters                          :- (strControlName) All control Ids as a string separated by comma.
                                           (strErrMsg) Error Messages of corresponding controls separated by comma
                                           (strErrMsgCtlId) Label Id to display Error Messages.
                                           Ex("txtPhone1,txtPhone2","EnterPhone1,Enter Phone2","lblMessage")
    returns                             :- boolean
    written by                          :- Siva Mohan Reddy.

****************************************************************************************/
function fnCheckIfFilled(strControlName, strErrMsg, strErrMsgCtlId) {
    var iCount = 0;
    var strArrControlId = strControlName.split(",");
    var strArrErrMsg = strErrMsg.split(",");
    var strArrTofocus = new Array();
    strArrTofocus[0] = "null";
    gE(strErrMsgCtlId).innerHTML = "";
    for (var i = 0; i < strArrControlId.length; i++) {
        if (fnRequiredField(strArrControlId[i]) == false) {
            iCount = iCount + 1;
            gE(strErrMsgCtlId).innerHTML += "<li><b>" + strArrErrMsg[i] + "</b></li>";
            strArrTofocus[strArrTofocus.length] = strArrControlId[i];
        }
    }

    if ((strArrTofocus.length >= 1) && (strArrTofocus[1] != null)) {
        gE(strArrTofocus[1]).focus();
    }

    if (iCount > 0) {
        return false;
    }
}

/****************************************************************************************
    Function/Procedure  Name            :- fnCheckboolean
    functionality                       :- This function will return of boolean value
    Parameters                          :- Control Id  as a String
    returns                             :- boolean
    written by                          :- Siva Mohan Reddy.

****************************************************************************************/
function fnCheckboolean(textField) {
    return gE(textField).value;
}


/****************************************************************************************
    Function/Procedure  Name            :- fnCheckNumeric
    functionality                       :- this function will check whether given control contain is numeric or not.
    Parameters                          :- Control Value as a String.
    returns                             :- boolean
    written by                          :- Siva Mohan Reddy.

****************************************************************************************/
function fnCheckNumeric(ctlValue) {
    var strCharpos = ctlValue.search("[^0-9]");
    if (ctlValue.length > 0 && strCharpos >= 0) {
        return false;
    }
}

/****************************************************************************************
    Function/Procedure  Name            :- fnCheckEmail
    functionality                       :- This function will validate the email Id of given control.
    Parameters                          :- Control Value as a String.
    returns                             :- boolean
    written by                          :- Siva Mohan Reddy.

****************************************************************************************/

function fnCheckEmail(ctlValue) {
    var strObjValue = fnTrim(ctlValue);
    var strMail = fnTrim(ctlValue);
    if (strMail.length > 0) {
        if (!fnValidateEmail(strObjValue))
            return false;
    }
}

/****************************************************************************************
    Function/Procedure  Name            :- fnValidateEmail
    functionality                       :- This function will validate the email Id.
    Parameters                          :- String.
    returns                             :- boolean
    written by                          :- Siva Mohan Reddy.

****************************************************************************************/


function fnValidateEmail(str) {
    var i = 0;
    var Replstr = str.replace(" ", ";");
    Replstr = Replstr.replace(",", ";");
    Replstr = Replstr.replace(":", ";");
    str = Replstr;
    var str1 = str.split(';');
    for (var j = 0; j < str1.length; j++) {
        var emailRegxp = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3})(\W?[,;]\W?(?!$))?)+$/i;
        if (emailRegxp.test(str1[i]) != true)
            return false;
        else {
            i++;
            if (fnCheckNull(str1[i]) == "") {
                return true;
            }
        }
    }
}


/****************************************************************************************
    Function/Procedure  Name            :- fnTrim
    functionality                       :- this function will trim the string
    Parameters                          :- String.
    returns                             :- String
    written by                          :- Siva Mohan Reddy.

****************************************************************************************/
function fnTrim(str) {
    if (typeof (str) != "string") return str;
    var len = str.length;
    var cnt = 0;
    while (str.charAt(cnt) == " ") {
        cnt = cnt + 1;
        if (cnt >= len)
            break;
    }
    str = str.slice(cnt, len);
    len = str.length;
    cnt = len - 1;
    while (str.charAt(cnt) == " ") {
        cnt = cnt - 1;
        if (cnt <= 0)
            break;
    }
    str = str.slice(0, cnt + 1);
    str = str.replace(/\t/g, " ");
    return str;
}

function fnShowHelp(helpFile) {
    openHelpWindow(helpFile);
}
function openHelpWindow(strUrl) {
    var url = "../help/frmframe.htm"; // For default page
    if (strUrl != null && strUrl != "" && strUrl != "null") // for identifying the MainModules and Bookmarks(SubModule)
    {
        url = "../help/frmframe.htm?" + strUrl;
    }
    try {
        if (RepSubMdID != null && RepSubMdID != "" && RepSubMdID != "null") // for reports
        {
            /*This is done For Main ModuleID
            url = "../help/frmframe.htm?" + strUrl + "#" + RepSubMdID; */

            //This is done For SubModuleID ModuleID
            url = "../help/frmframe.htm?" + RepSubMdID + ".htm";
        }
    }
    catch (err) {
    }
    if (!newwindow.closed && newwindow.location) {
        newwindow.close();
    }
    newwindow = window.open(url, "BrHelp", "height=" + screen.height * 0.88 + ", width=" + (window.screen.availWidth - 10) + ", top=0, left=0, toolbar=no, status=yes, scrollbars=no, location=no, menubar=no, directories=no, resizable=no", true);

    if (newwindow.focus) {
        newwindow.focus();
    }
    return false;
}
function fnKeyPress(key, FileName) {
    if (key == 112) {
        fnShowHelp('../help/' + FileName);
    }
}
function fnAlphaNumeric(strParam) {
    var strNumaric = fnTrim(strParam);
    for (var j = 0; j < strNumaric.length; j++) {
        var charParam = strNumaric.charAt(j);
        var iChar = charParam.charCodeAt(0);
        if ((iChar == 32) || (iChar > 47 && iChar < 59) || (iChar > 64 && iChar < 91) || (iChar > 96 && iChar < 123)) {

        }
        else {
            return false;
        }
    }
    return true;
}
function fnAlphaNumericExtra(strParam) {
    var strNumaric = fnTrim(strParam);
    for (var j = 0; j < strNumaric.length; j++) {
        var charParam = strNumaric.charAt(j);
        var iChar = charParam.charCodeAt(0);
        if ((iChar == 32 || iChar == 35) || (iChar >= 45 || iChar <= 46) || (iChar > 47 && iChar < 59) || (iChar > 64 && iChar < 91) || (iChar > 96 && iChar < 123)) {

        }
        else {
            return false;
        }
    }
    return true;
}
function fnIsValidPhone(ctlValue) {
    var strName = fnTrim(ctlValue);
    var strCharpos = strName.search("[^0-9,(,),+,-,#, ]");
    if (strName.length > 0 && strCharpos >= 0) {
        return false;
    }
    return true;
}
function fnIsValidDate(ctlValue) {
    var strDateField = fnTrim(ctlValue);
    // MM/DD/YY   MM/DD/YYYY   MM-DD-YY   MM-DD-YYYY, this function will check these formats.
    if (strDateField != "") {
        var strDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{2}|\d{4})$/;
        var matchArray = strDateField.match(strDatePattern);
        if (matchArray == null) {
            return false;
        }
        month = matchArray[1];
        day = matchArray[3];
        year = matchArray[4];
        if (month < 1 || month > 12) {
            return false;
        }
        if (day < 1 || day > 31) {
            return false;
        }
        if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
            return false;
        }
        if (month == 2) { // check for february 29th
            var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
            if (day > 29 || (day == 29 && !isleap)) {
                return false;
            }
        }
        return true;
    }
}
function fnCheckSpaceChar(strFieldName) {
    var strEmpty = "";
    if ((strFieldName.indexOf("nbsp")) >= 0) {
        return strEmpty;
    }
    else {
        return strFieldName;
    }
}
//This function will uncheck the radio buttons in a gridview.
function fnDeselect() {
    var strform = document.forms[0];
    for (var i = 0; i < strform.elements.length; i++) {
        var strName = strform.elements[i].value;
        if ((strform.elements[i].type == "radio") && (strName.indexOf("Row", 0) > 0)) {
            strform.elements[i].checked = false;
        }
    }
}
/****************************************************************************************
    Function/Procedure  Name            :- fnComboSelectedValue
    functionality                       :- This function will select the text field of coresponding value field.
    Parameters                          :- ComboBox Id, ComboBox Value Field.
    returns                             :- String
    written by                          :- Siva Mohan Reddy.

****************************************************************************************/
function fnComboSelectedValue(strCboName, strCboValue) {
    var strLength = gE(brGetControlId(strCboName)).options.length;
    for (var i = 0; i < strLength; i++) {
        if (gE(brGetControlId(strCboName)).options[i].value == strCboValue) {
            gE(brGetControlId(strCboName)).options[i].selected = true;
        }
    }
}
function fnCheckAmount(strName) {
    var strCharpos = strName.search("[^-,^0-9,.]");
    if ((strName.length > 0 && strCharpos >= 0) || (strName.indexOf('.') != strName.lastIndexOf('.'))) {
        return false;
    }
    return true;
}
/****************************************************************************************
    Function/Procedure  Name            :- fnCheckIfCheckedThenRequired
    functionality                       :- This function will check weather the check box is checked or not if so
                                           next controls can not be blank
    Parameters                          :- (strCheckboxName) Check box control ID
                                           (strCheckForRequiredCtlIDs) All control Ids to be validated as a string separated by comma.
                                           Ex("chk","EnterPhone1,Enter Phone2","lblMessage")
                                           For the first control for which the value is filled this function
                                           will return immediately true otherwise false
    returns                             :- boolean
    written by                          :- Sudharsan M
    Modified By                         :- Pothirajan (For Infragistics)

****************************************************************************************/
function fnCheckIfCheckedThenRequired(strCheckboxName, strCheckForRequiredCtlIDs) {
    var strArrControlId = strCheckForRequiredCtlIDs.split(",");
    if (fnGetControl(strCheckboxName).checked == true) {
        for (var i = 0; i < strArrControlId.length; i++) {
            if (fnRequiredField(strArrControlId[i]) == false) {
                return false;
            }
        }
        return true;
    }
    return true;
}

/****************************************************************************************
    Function/Procedure  Name            :- fnBrGetShortDate
    functionality                       :- To Convert from Long Date Format to Short Date Format
    Parameters                          :- Date in Long Format
    return                              :- Date in Short Format
    written by                          :- Pothirajan C.
    Modified On                         :- 23-12-2005
    Modified By                         :- Pothirajan C.
    Modification                        :-  Done for the format (mm/dd/yyyy hh:mm:ssAM/PM)
    Modified By                         :- Pothirajan C On 02.01.2006
    Modification                        :-  Done for the UTC format

****************************************************************************************/
function fnBrGetShortDate(brDate) {
    if (!brDate)
        return " ";
    if (brDate.toString().indexOf("UTC") != -1) {
        return new Date(brDate);
    }

    if (brDate.toString().indexOf("GMT") != -1) {
        return new Date(brDate);
    }


    var brYear;
    var brDay;
    var brMonth;
    var strArray = new Array();
    strArray = brDate.split("-");
    if (strArray.length > 1) {
        brYear = strArray[0];
        brDay = strArray[2].substring(0, 2);
        brMonth = strArray[1];
        return brMonth + "/" + brDay + "/" + brYear;
    }
    if (strArray.length == 1) {
        //try for Slash Char
        strArray = brDate.split("/");
        if (strArray.length > 1) {
            brYear = strArray[2].substring(0, 4);
            brDay = strArray[1];//.substring(0,2);
            brMonth = strArray[0];
            return brMonth + "/" + brDay + "/" + brYear;
        }
    }

}
/****************************************************************************************
    Function/Procedure  Name            :- fnFetchValuesToControls
    functionality                       :- Fetch Values from Tables to controls
    Parameters                          :- 'N' Arguments
    return                              :- 'N' Arguments
    written by                          :- Pothirajan C.

****************************************************************************************/
function fnFetchValuesToControls() {
    for (var i = 0; i < arguments.length; i += 2) {
        fnSetValue(fnGetControl(arguments[i]), arguments[i + 1]);
    }
}
/****************************************************************************************
   Function/Procedure  Name            :- fnSetMessage
   functionality                       :- This function Set Error Message to lblMessage Label
   Example                             :- fnSetMessage("Client Added Successfully");
   return                              :- void
   written by                          :- Muthukannan.

****************************************************************************************/
function fnSetMessage(strMessage) {
    var lblMessg = gE("lblMessage") ? "lblMessage" : "ctl00_ContentPlaceHolder1_lblMessage";
    fnSetLabelMessage(lblMessg, strMessage);
}
function fnSetLabelMessage(label, strMessage) {
    gE(label).innerHTML = strMessage;
}
function fnRemoveigtxt(ctlName) {
    var str = brGetControlId(ctlName);
    if (str.substring(0, 5) == "igtxt")
        return str.substring(5, str.length);
    return false;
}
/****************************************************************************************
   Function/Procedure  Name            :- fnHeaderString
   functionality                       :- This function Align the Table Header:
   Parameters                          :- Any No Of Arguments
   Example                             :- fnHeaderString()
   Return                              :- string
   written by                          :- Muthukannan.

****************************************************************************************/
function fnHeaderString() {
    var strheader = "";
    for (var i = 0; i < arguments.length; i++) {
        strheader = strheader + "<th align='Left' class='DataTableTitle'>" + arguments[i] + "</th>";
    }
    return strheader;
}
/****************************************************************************************
Function Name : fnSetHeader
Parameter     : string
Return value  : None
Output        : Module Text --> Optional Page Text
Written By    : Pothirajan C
Created On    : 06.10.2005
/****************************************************************************************/
function fnSetHeader(strHeader) {
    var strModuleText = fnGetValueToMasterFromOptional('hdnModuleHeader');
    parent.document.forms[0].gE('ctl00_lblHeader').innerHTML = strModuleText + "-->" + strHeader;
}
function fnSetNoPostback(evt) {
    if (!evt)
        evt = window.event;
    if (evt) {
        if (evt.cancel)
            evt.cancel = true;
        else
            evt.returnValue = false;
    }
}
function fnSetErrorMsgColor() {
    gE('lblMessage').style.color = "red";
}
function fnSetMsgColor() {
    gE('lblMessage').style.color = "blue";
}
function fnCheckigtxt(ctlName) {
    var str = brGetControlId(ctlName);
    if (str.substring(0, 5) == "igtxt")
        return str.substring(5, str.length);
    else
        return str.substring(0, str.length - 6);
}
function fnSetValue(ctlName, value, desc) {
    try {
        value = fnCheckNull(fnTrim(value));
        if (arguments.length == 3) {
            desc = fnTrim(desc);
            ctlName.setValue(value);
            ctlName.setDescription(desc);
        }
        else if (gE(brGetControlId(ctlName)).tagName != 'SPAN' && gE(brGetControlId(ctlName)).tagName != 'TABLE') {
            var ctlType = gE(brGetControlId(ctlName)).type;
            var IsIgtxt;
            if (brIsIgCtl(ctlName) == true) {
                var str = brGetControlId(ctlName);
                if (str.substring(0, 5) == "igtxt") {
                    ctlName = str.substring(5, str.length);
                    igedit_getById(ctlName).update();
                    ctlType = gE(ctlName).type;
                }
                else {
                    ctlName = str.substring(0, str.length - 6);
                    ctlType = gE(ctlName).tagName;
                }
                IsIgtxt = true;
            }
            else {
                IsIgtxt = false;
            }
            switch (ctlType) {
                case "textarea": gE(brGetControlId(ctlName)).value = value; break;
                case "text": gE(brGetControlId(ctlName)).value = value; break;
                case "select-one":
                    if (value.length == 0) {
                        gE(brGetControlId(ctlName)).options[0].selected = true;
                        return;
                    }
                    //[Dinesh - Updated]
                    var options = gE(brGetControlId(ctlName)).options;
                    if (options.length > 0) {
                        //gE(options[0].selected = true;
                        //gE(options.selectedValue = value;
                        for (var i = 0; i < options.length; i++) {
                            if (options[i].value == value) {
                                options[i].selected = true;
                                break;
                            }
                        }
                    }
                    break;
                case "radio": if (value == "true" || value == true || value == "True")
                    gE(brGetControlId(ctlName)).checked = true;
                else
                    gE(brGetControlId(ctlName)).checked = false;
                    break;
                case "checkbox": if (value == "true" || value == true || value == "True")
                    gE(brGetControlId(ctlName)).checked = true;
                else
                    gE(brGetControlId(ctlName)).checked = false;
                    break;
                case "hidden": if (IsIgtxt) {
                    igedit_getById(ctlName).setValue(value);
                }
                else {
                    gE(brGetControlId(ctlName)).value = value;
                }
                    break;
                case "button": ig_getWebControlById(ctlName).setText(value);
                    break;
                case "TABLE": fnSetUIDate(ctlName, value); break;
                default: alert("NotImplemented"); break;
            }
        }
        else {
            if (gE(brGetControlId(ctlName)).tagName == 'SPAN')
                gE(brGetControlId(ctlName)).innerHTML = value;
            else if (gE(ctlName).tagName == 'TABLE')
                gE(ctlName + "_input").value = value;
            else if (gE(brGetControlId(ctlName)).tagName == 'TABLE')
                gE(brGetControlId(ctlName)).value = value;
        }
    }
    catch (ex) {
        return false;
    }
}
function fnGetComboText(ctlName) {
    if (gE(brGetControlId(ctlName)).value == "") {
        return gE(brGetControlId(ctlName)).selectedIndex = 0;
    }
    else
        return gE(brGetControlId(ctlName)).options[gE(brGetControlId(ctlName)).selectedIndex].text;
}
function fnGetValue() {
    for (var i = 0; i < arguments.length; i++) {
        if (gE(brGetControlId(arguments[i])).tagName != 'SPAN' && gE(brGetControlId(arguments[i])).tagName != 'TABLE') {
            var ctlType = gE(brGetControlId(arguments[i])).type;
            var IsIgtxt;
            if (brIsIgCtl(arguments[i]) == true) {
                var str = brGetControlId(arguments[i]);
                if (str.substring(0, 5) == "igtxt") {
                    arguments[i] = str.substring(5, str.length);
                    igedit_getById(arguments[i]).update();
                    ctlType = gE(arguments[i]).type;
                }
                else {
                    arguments[i] = str.substring(0, str.length - 6);
                    ctlType = gE(arguments[i]).tagName;
                }
                IsIgtxt = true;
            }
            else {
                IsIgtxt = false;
            }
            switch (ctlType) {
                case "textarea": return fnTrim(gE(brGetControlId(arguments[i])).value); break;
                case "text": return fnTrim(gE(brGetControlId(arguments[i])).value); break;
                case "password": return fnTrim(gE(brGetControlId(arguments[i])).value); break;
                case "select-one":
                    if (fnTrim(gE(brGetControlId(arguments[i]))).selectedIndex == "-1")
                        return null;
                    if (fnTrim(gE(brGetControlId(arguments[i])).options[gE(brGetControlId(arguments[i])).selectedIndex].value).toUpperCase() == "CBOSELECT")
                        return null;
                    else
                        return fnTrim(gE(brGetControlId(arguments[i])).options[gE(brGetControlId(arguments[i])).selectedIndex].value);
                    break;
                case "radio": return fnTrim(gE(brGetControlId(arguments[i])).checked); break;
                case "checkbox": return fnTrim(gE(brGetControlId(arguments[i])).checked); break;
                case "hidden": if (IsIgtxt)
                    return fnTrim(gE(arguments[i]).value);
                    return fnTrim(gE(brGetControlId(arguments[i])).value);
                    break;
                case "button": return false; break;
                case "TABLE": return fnGetUIDate(arguments[i]); break;
                default: return false; break;
            }
        }
        else {
            if (gE(brGetControlId(arguments[i])).tagName == 'SPAN')
                return gE(brGetControlId(arguments[i])).innerHTML;
            else if (gE(brGetControlId(arguments[i])).tagName == 'TABLE')
                return fnTrim(gE(brGetControlId(arguments[i])).value);
        }
    }
}
function br_ctl_val(ControlID, ErrorMsg, Required, ValidationType, MinValue, MaxValue, MaxLength, DepControlID, ValidationFormat) {
    if (ControlID == '' || ErrorMsg == '' || Required == '')
        return null;
    if (typeof (ControlID) == "string") {
        this.ControlID = fnGetControl(ControlID);
        this.ErrorMsg = ErrorMsg;
        this.Required = Required;
        this.ValidationType = ValidationType;
        this.MinValue = MinValue;
        this.MaxValue = MaxValue;
        this.MaxLength = MaxLength;
        this.CtlName = ControlID;
        if (DepControlID != '') {
            this.DepControlID = fnGetControl(DepControlID);//Optional
            this.DepCtlName = DepControlID;
        }
        this.ValidationFormat = ValidationFormat;//Optional
        if (this.ControlID.tagName != 'SPAN' && this.ControlID.tagName != 'TABLE') {
            this.ctlType = this.ControlID.type;
        }
        else if (ControlID.tagName == 'SPAN') {
            this.ctlType = "lbl";
        }
        else if (ControlID.tagName == 'TABLE') {
            this.ctlType = "Date";
        }
        this.IDDesc = "F";
        this.status = "F";//Optional
    }
    else {
        this.ControlID = ControlID;
        this.ctlType = "IDDesc";
        this.ErrorMsg = ErrorMsg;
        this.Required = Required;
        this.MaxLength = MaxLength;
        this.status = "F";
    }
    return this;
}
function fnDoValidate(brValidator) {
    arrErrorList = new Array();
    indexValue = 0;
    for (var i = 0; i < brValidator.length; i++) {
        //ID - Description Control
        if (brValidator[i].Required == 'T' && brValidator[i].ctlType == "IDDesc") {
            if (fnTrim(brValidator[i].ControlID[0].getValue()) == "" || brValidator[i].ControlID[0].IsValid == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'F' && brValidator[i].ctlType == "IDDesc") {
            if (fnTrim(brValidator[i].ControlID[0].getValue()) == "")
                brValidator[i].status = 'S';
            else if (fnTrim(brValidator[i].ControlID[0].getValue()) != "" && brValidator[i].ControlID[0].IsValid == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        //Required Field Combo
        if (brValidator[i].Required == 'T' && brValidator[i].ctlType == 'select-one') {
            if (fnRequiredCombo(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        //Required Field All TextBox
        if (brValidator[i].Required == 'T' && brValidator[i].ctlType == 'text') {
            if (fnRequiredField(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        //Required Field All TextBox and Type Password
        if (brValidator[i].Required == 'T' && brValidator[i].ctlType == 'password') {
            if (fnRequiredField(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        //Required Field Checked ListBox
        if (brValidator[i].Required == 'T' && brValidator[i].ValidationType == 'chkList') {
            brValidator[i].ctlType = "chkList";
            if (fnIsAnySelected(brValidator[i].DepControlID.id) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        // Required Field TextArea
        if (brValidator[i].Required == 'T' && brValidator[i].ctlType == 'textarea') {
            if (fnRequiredField(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        //Required Field for DateChooser
        if (brValidator[i].Required == 'T' && brValidator[i].ctlType == 'Date') {
            if (fnRequiredDateField(brValidator[i].CtlName) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        // To check mail ID with Mamdatory Cond.
        if (brValidator[i].Required == 'T' && brValidator[i].ValidationType == 'E') {
            if (fnTrim(brValidator[i].ControlID.value) == "")
                brValidator[i].status = 'F';
            else if (fnCheckEmail(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'T' && brValidator[i].ValidationType == 'N') {
            if (fnRequiredField(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else if (fnCheckNumeric(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'F' && brValidator[i].ValidationType == 'N') {
            if (fnTrim(brValidator[i].ControlID.value) == "")
                brValidator[i].status = 'S';
            else if (fnCheckNumeric(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'T' && brValidator[i].ValidationType == 'A') {
            if (fnRequiredField(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else if (fnAlphaNumeric(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'F' && brValidator[i].ValidationType == 'A') {
            if (fnTrim(brValidator[i].ControlID.value) == "")
                brValidator[i].status = 'S';
            else if (fnAlphaNumeric(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'T' && brValidator[i].ValidationType == 'AE') {
            if (fnRequiredField(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else if (fnAlphaNumericExtra(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'F' && brValidator[i].ValidationType == 'AE') {
            if (fnTrim(brValidator[i].ControlID.value) == "")
                brValidator[i].status = 'S';
            else if (fnAlphaNumericExtra(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'T' && brValidator[i].ValidationType == 'D') {
            if (fnDateCheck(brValidator[i].MinValue, brValidator[i].MaxValue, brValidator[i].CtlName) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'F' && brValidator[i].ValidationType == 'D') {
            if (brValidator[i].MaxLength == 1) {
                if (fnRequiredDateField(brValidator[i].CtlName) == false)
                    brValidator[i].status = 'S';
                else if (fnCheckTwoDate(brValidator[i].MinValue, fnGetDateObject(brValidator[i].DepCtlName), brValidator[i].CtlName, brValidator[i].MaxValue) == false)
                    brValidator[i].status = 'F';
                else
                    brValidator[i].status = 'S';
            }
            else {
                if (fnRequiredDateField(brValidator[i].CtlName) == false)
                    brValidator[i].status = 'S';
                else if (fnDateCheck(brValidator[i].MinValue, brValidator[i].MaxValue, brValidator[i].CtlName) == false)
                    brValidator[i].status = 'F';
                else
                    brValidator[i].status = 'S';
            }
        }
        if (brValidator[i].Required == 'T' && brValidator[i].ValidationType == 'NC') {
            if (fnCheckRange(brValidator[i].ControlID.value, brValidator[i].MinValue, brValidator[i].MaxValue) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'F' && brValidator[i].ValidationType == 'NC') {
            if (fnTrim(brValidator[i].ControlID.value) == "")
                brValidator[i].status = 'S';
            else if (fnCheckRange(fnGetValue(brValidator[i].CtlName), brValidator[i].MinValue, brValidator[i].MaxValue) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'T' && brValidator[i].ValidationType == 'FC') {
            if (fnCheckFloatRange(fnGetValue(brValidator[i].CtlName), brValidator[i].MinValue, brValidator[i].MaxValue) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'F' && brValidator[i].ValidationType == 'FC') {
            if (fnTrim(brValidator[i].ControlID.value) == "")
                brValidator[i].status = 'S';
            else if (fnCheckFloatRange(fnGetValue(brValidator[i].CtlName), brValidator[i].MinValue, brValidator[i].MaxValue) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'F' && brValidator[i].ValidationType == 'E') {
            if (fnTrim(brValidator[i].ControlID.value) == "")
                brValidator[i].status = 'S';
            else if (fnCheckEmail(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'F' && brValidator[i].ValidationType == 'PH') {
            if (fnTrim(brValidator[i].ControlID.value) == "")
                brValidator[i].status = 'S';
            else if (fnIsValidPhone(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'F' && brValidator[i].ValidationType == 'WEB') {
            if (fnTrim(brValidator[i].ControlID.value) == "")
                brValidator[i].status = 'S';
            else if (fnCheckWebURL(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'T' && brValidator[i].ValidationType == 'IP') {
            if (fnIsIPAddressValid(brValidator[i].ControlID.value) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'T' && brValidator[i].ValidationType == 'MapID') {
            if (fnRequiredField(fnTrim(brValidator[i].ControlID.value)) == false)
                brValidator[i].status = 'F';
            else if (fnCheckMaxLength(fnTrim(brValidator[i].ControlID.value), brValidator[i].MaxLength) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
        if (brValidator[i].Required == 'F' && brValidator[i].ValidationType == 'MapID') {
            if (fnTrim(brValidator[i].ControlID.value) == "")
                brValidator[i].status = 'S';
            else if (fnCheckMaxLength(fnTrim(brValidator[i].ControlID.value), brValidator[i].MaxLength) == false)
                brValidator[i].status = 'F';
            else
                brValidator[i].status = 'S';
        }
    }
    var strErrMsg = "";
    var j = 0;
    for (var i = 0; i < brValidator.length; i++) {
        if (brValidator[i].status == 'F' && brValidator[i].ctlType != "IDDesc") {
            var arrColumnList = new Array();
            if (typeof (brValidator[i].ErrorMsg) == "object") {
                if (fnRequiredDateField(brValidator[i].CtlName) == false)
                    arrColumnList[0] = brValidator[i].ErrorMsg[0];
                else
                    arrColumnList[0] = brValidator[i].ErrorMsg[1];
                if (strDateStatus == "T" && brValidator[i].ValidationType == 'D')
                    arrColumnList[0] = "1401";
            }
            else {
                if (brValidator[i].ValidationType == "MapID") //brValidator[i].ErrorMsg == "100057"
                {
                    arrColumnList[0] = GetMessageById(brValidator[i].ErrorMsg).Format(brValidator[i].MinValue, brValidator[i].MaxValue);
                }
                else {
                    arrColumnList[0] = brValidator[i].ErrorMsg;

                    if (strDateStatus == "T" && brValidator[i].ValidationType == 'D')
                        arrColumnList[0] = "1401";
                }
            }
            arrColumnList[1] = brValidator[i].ctlType != "chkList" ? brValidator[i].ControlID : gE(brValidator[i].ControlID.id + "_textbox");
            arrColumnList[2] = "Normal";
            arrColumnList[3] = brValidator[i].ValidationType;
            arrErrorList[j] = arrColumnList;
            j++;
        }
        else if (brValidator[i].ctlType == "IDDesc" && brValidator[i].status == 'F') {
            var arrColumnList = new Array();
            arrColumnList[0] = GetMessageById(brValidator[i].ErrorMsg);
            arrColumnList[0] = brValidator[i].ErrorMsg;
            arrColumnList[1] = brValidator[i].ControlID[0];
            arrColumnList[2] = "IDDesc";
            arrColumnList[3] = brValidator[i].ctlType;
            arrErrorList[j] = arrColumnList;
            j++;
        }
    }
    if (j > 0) {
        if (arrErrorList[0][3] == "MapID")
            fnSetLabelMessage("lblMessage", arrErrorList[0][0]);
        else
            fnErrorMessage(arrErrorList[0][0]);
    }
    if (arrErrorList.length < 2) {
        fnGetControl("Prev").style.visibility = "hidden";
        fnGetControl("Next").style.visibility = "hidden";
    }
    else {
        fnGetControl("Prev").style.visibility = "visible";
        fnGetControl("Next").style.visibility = "visible";
    }
    for (var i = 0; i < brValidator.length; i++) {
        if (brValidator[i].ctlType != "IDDesc") {
            if (brValidator[i].status == 'F') {
                brValidator[i].ControlID.style.backgroundColor = "#FFFFE9";
            }
        }
        else if (brValidator[i].ctlType == "IDDesc") {
            if (brValidator[i].status == 'F' || brValidator[i].ControlID[0].IsValid == false) {
                brValidator[i].ControlID[0].IDControl_ID.Element.style.backgroundColor = "#FFFFE9";
            }
        }
        if (brValidator[i].ctlType != "IDDesc") {
            if (brValidator[i].status == 'S')
                brValidator[i].ControlID.style.backgroundColor = "white";
        }
        else if (brValidator[i].ctlType == "IDDesc") {
            if (brValidator[i].status == 'S')
                brValidator[i].ControlID[0].IDControl_ID.Element.style.backgroundColor = "white";
        }
    }
    for (var i = 0; i < brValidator.length; i++) {
        switch (brValidator[i].ctlType) {
            case "chkList":
                if (brValidator[i].status == 'F') {
                    var obj = DDCL_GetObject(brValidator[i].CtlName);
                    if (obj) {
                        obj.divDisplayBox.style.backgroundColor = '#FFFFE9';
                        obj.HandleDisplayBoxClick();
                        obj.inCheckboxDiv = true;
                        return false;
                    }
                }
                else {
                    var obj = DDCL_GetObject(brValidator[i].CtlName);
                    if (obj) {
                        obj.divDisplayBox.style.backgroundColor = '#FFFFFF';
                    }
                }
                break;
            case "IDDesc":
                if (brValidator[i].status == 'F') {
                    fnSetTabFocus();
                    // brValidator[i].ControlID[0].setValue("");
                    brValidator[i].ControlID[0].setFocus();
                    return false;
                }
                break;
            default:
                if (brValidator[i].status == 'F') {
                    fnSetTabFocus();
                    fnSetErrorFocus(brValidator[i].ControlID);
                    return false;
                }
                break;
        }
    }
    return true;
}
// Navigate Error Message:
var indexValue = 0;
function fnErrorNavi(value) {
    var tabName = "";
    var tabIndex = 0;
    if (value == -1) {
        if (arrErrorList != null) {
            if (indexValue == 0) {
                fnErrorFocus();
                return false;
            }
            if (indexValue > 0) {
                if (arrErrorList.length < 2)
                    fnGetControl("Prev").style.visibility = "hidden";
                else
                    fnGetControl("Prev").style.visibility = "visible";
                --indexValue;
                if (arrErrorList[indexValue][3] == "MapID")
                    fnSetLabelMessage("lblMessage", arrErrorList[indexValue][0]);
                else
                    fnErrorMessage(arrErrorList[indexValue][0]);
                fnErrorFocus();
            }
        }
    }
    else if (value == 1) {
        if (arrErrorList != null) {
            if (indexValue == arrErrorList.length - 1) {
                fnErrorFocus();
                return false;
            }
            if (indexValue < arrErrorList.length - 1) {
                if (arrErrorList.length < 2)
                    fnGetControl("Next").style.visibility = "hidden";
                else
                    fnGetControl("Next").style.visibility = "visible";
                indexValue++;
                if (arrErrorList[indexValue][3] == "MapID")
                    fnSetLabelMessage("lblMessage", arrErrorList[indexValue][0]);
                else
                    fnErrorMessage(arrErrorList[indexValue][0]);
                fnErrorFocus();
            }
        }
    }
}
function fnErrorFocus() {
    fnSetTabFocus();
    if (arrErrorList[indexValue][2] == "IDDesc") {
        if (arrErrorList[indexValue][1].IDControl_ID.Element.disabled == false)
            arrErrorList[indexValue][1].setFocus();
    }
    else if (arrErrorList[indexValue][2] == "Normal") {
        if (arrErrorList[indexValue][1].disabled == false)
            arrErrorList[indexValue][1].focus();
    }
}
function fnSetTabFocus() {
    if (arrErrorList[indexValue][1].id != undefined) {
        var tabFocus = arrErrorList[indexValue][1].id.split("_");
        if (tabFocus.length != 3)
            tabFocus = arrErrorList[indexValue][1].id.split("$");
        if (tabFocus.length == 3 && tabFocus[0].substring(0, 3).toUpperCase() == "TAB") {
            tabName = tabFocus[0];
            if (tabName.substring(0, 5) == "igtxt") {
                tabName = tabName.substring(5, tabName.length);
            }
            tabIndex = parseInt(tabFocus[1].substring(tabFocus[1].length - 2, tabFocus[1].length));
            if (tabName == "tabClientMaster") {
                if (tabIndex == 5)
                    tabIndex = 0;
            }
            igtab_getTabById(tabName).setSelectedIndex(tabIndex);
        }
    }
}
function fnSetErrorColor() {
    for (var i = 0; i < arguments.length; i++) {
        if (typeof (arguments[i]) == "string") {
            fnGetControl(arguments[i]).style.backgroundColor = "#FFFFE9";
        }
        else {
            arguments[i].IDControl_ID.Element.style.backgroundColor = "#FFFFE9";
        }
    }
}
function fnClearToNormal() {
    for (var i = 0; i < arguments.length; i++) {
        if (typeof (arguments[i]) == "string") {
            fnGetControl(arguments[i]).style.backgroundColor = "white";
        }
        else {
            arguments[i].IDControl_ID.Element.style.backgroundColor = "white";
        }
    }
}
// Check DateChooser Valied or Not:
function fnRequiredDateField(ctlName) {
    ctlName = fnGetTabControlID(ctlName);
    if (fnGetUIDate(ctlName) == "")
        return false;
    else
        return true;
}

// Allow Numeric - OnKeydown call this Function(Infra TextBox)
function fnNumeric(oEdit, keyCode, oEvent, obj) {
    if (keyCode == 9 || (keyCode > 32 && keyCode < 41) || (keyCode > 44 && keyCode < 47) || (keyCode == 8 || keyCode == 13)) {
        oEvent.cancel = false;
        //return true;
    }
    else if ((oEvent.event.shiftKey == false && (keyCode > 47 && keyCode < 58)) || (keyCode > 95 && keyCode < 106)) {
        oEvent.cancel = false;
        //return true;
    }
    else {
        oEvent.cancel = true;
        //return false;
    }
    return;
}

function fnASPNumericCheck(e) {
    if (document.all) {
        keyCode = event.keyCode;
        e = window.event;
    }
    else {
        keyCode = e.which;
    }
    if (keyCode == 9 || (keyCode > 32 && keyCode < 41) || (keyCode > 44 && keyCode < 47) || (keyCode == 8 || keyCode == 13)) {
        return true;
    }
    else if ((e.shiftKey == false && (keyCode > 47 && keyCode < 58)) || (keyCode > 95 && keyCode < 106)) {
        return true;
    }
    else {
        if (document.all)
            window.event.returnValue = false;
        return false;
    }
}


// Allow Alpha Char. - OnKeydown call this Fucntion (Infra TextBox)
function fnAlphaKeyPress(oEdit, keyCode, oEvent, obj) {
    if ((keyCode > 64 && keyCode < 96) || keyCode == 8 || keyCode == 32 || keyCode == 35 || keyCode == 36 || keyCode == 9 || (keyCode == 37 || keyCode == 39) || (keyCode > 44 && keyCode < 47))
        oEvent.cancel = false;
    else
        oEvent.cancel = true;
}
// Allow Alpha Numeric - onKeydown Call this Function (TextBox)
function fnAlphaNumKeyPresstxt(keyCode, oEvent) {
    if (keyCode == 9 || (keyCode > 31 && keyCode < 41) || (keyCode > 44 && keyCode < 47) || (keyCode == 8 || keyCode == 13) || (keyCode > 64 && keyCode < 91) || keyCode == 17)
        oEvent.cancel = false;
    else if ((oEvent.shiftKey == false && (keyCode > 47 && keyCode < 58)) || (keyCode > 95 && keyCode < 106) || keyCode == 109)//|| keyCode ==189
        oEvent.cancel = false;
    else
        oEvent.cancel = true;
}
// Allow Alpha Numeric - onKeydown Call this Function (Infra TextBox)
function fnAlphaNumKeyPress(oEdit, keyCode, oEvent, obj) {
    if (keyCode == 9 || (keyCode > 31 && keyCode < 41) || (keyCode > 44 && keyCode < 47) || (keyCode == 8 || keyCode == 13) || (keyCode > 64 && keyCode < 91) || keyCode == 17)
        oEvent.cancel = false;
    else if ((oEvent.event.shiftKey == false && (keyCode > 47 && keyCode < 58)) || (keyCode > 95 && keyCode < 106) || keyCode == 109)//|| keyCode ==189
        oEvent.cancel = false;
    else
        oEvent.cancel = true;
}
function fnKeyDown(e) {
    var key;
    if (navigator.appName == 'Netscape')
        key = e.which;
    else
        key = e.keyCode;
    //var key =e.which;          //event.keyCode;
    if (key == 9 || (key > 44 && key < 45) || (key == 8 || key == 13) || (key > 64 && key < 91) || key == 46 || key == 37 || key == 190 || key == 110)
        return true;
    else if (e.shiftKey == false && ((key > 47 && key < 58) || (key >= 96 && key < 123)))
        return true;
    else
        return false;
}
function fnCheckWebURL(ctlValue) {
    ctlValue = ctlValue.toLowerCase();
    var urlRegxp = /^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.)+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{1,2})+$/;
    if (urlRegxp.test(ctlValue) != true)
        return false;
    return true;
}
function fnCheckMaxLength(ctlValue, MaxLength) {
    if (ctlValue.replace(" ", "").length == MaxLength)
        return true;
    return false;
}
function fnRemoveSpace(str) {
    if (typeof (str) != "string") return str;
    return (str.replace(/[\s]+/g, ''));
}
function fnCheckTwoDate(Min, DecDate, ctlName, ServerDate) {
    ctlName = fnGetTabControlID(ctlName);
    var date = fnGetDateObject(ctlName);
    if (date == null)
        return false;
    if (date.getFullYear() >= 2050 || date.getFullYear() <= 1900) {
        strDateStatus = "T";
        return false;
    }
    if (Min == 0) {
        if (DecDate > date)
            return false;
        if (date <= ServerDate)
            return true;
        else
            return false;
    }
}
function fnDateCheck(MinValue, MaxValue, ctlName) {
    strDateStatus = "F";
    ctlName = fnGetTabControlID(ctlName);
    var date = fnGetDateObject(ctlName);
    if (date == null)
        return false;
    if (typeof (MaxValue) == "string") {
        MaxValue = new Date(MaxValue);
    }
    if (date.getFullYear() == 2050 && date.getMonth() == 11 && date.getDate() > 31) {
        strDateStatus = "T";
        return false;
    }
    if (MinValue == 4) {
        if (date != null)
            return true;
        return false;
    }
    else if (MinValue == 3) {
        if (date <= MaxValue)
            return true;
        return false;
    }
    else if (MinValue == 2) {
        if (date >= MaxValue)
            return true;
        return false;
    }
    else if (MinValue == 1) {
        if (date > MaxValue)
            return true;
        return false;
    }
    else {
        if (date < MaxValue)
            return true;
        return false;
    }
}
function fnGetTabControlID(ctlName) {
    var str = brGetControlId(ctlName);
    if (str.substring(0, 5) == "igtxt")
        ctlName = str.substring(5, str.length);
    else if (str.substring(str.length - 6, str.length) == "_input")
        ctlName = str.substring(0, str.length - 6);
    return ctlName;
}
function fnDateObject(strDate) {
    if (strDate != "" || strDate == null) {
        var dateArray = strDate.split("-");
        return new DateTime(parseInt(dateArray[0]), parseInt(dateArray[1]), parseInt(dateArray[2]), 0, 0, 0);
    }
}
function fnCheckFloatRange(ctlValue, Min, Max) {
    var ctlValue = fnGetFloat(ctlValue);
    if (ctlValue == 0 && Min == 0)
        return true;
    if (ctlValue == false)
        return false;
    else if (ctlValue < Min || ctlValue > Max)
        return false;
    return true;
}
function fnGetFloat(ctlValue) {
    if (fnCheckAmount(ctlValue) == false)
        return parseFloat("0.00");
    if (ctlValue.length == 0)
        return false;
    return parseFloat(ctlValue);
}
function fnCheckRange(ctlValue, Min, Max) {
    if (fnConvertToNumber(ctlValue) < Min || fnConvertToNumber(ctlValue) > Max)
        return false;
    return true;
}
function fnConvertToNumber(ctlValue) {
    if (fnCheckNumeric(ctlValue) == false)
        return 0;
    if (ctlValue.length == 0)
        return 0;
    return parseFloat(ctlValue);
}
function fnRequiredCombo(ctlValue) {
    if (ctlValue.toUpperCase() == 'CBOSELECT' || ctlValue.toUpperCase() == "")
        return false;
    return true;
}
function fnRequiredField(ctlValue) {
    ctlValue = fnTrim(ctlValue);
    if (ctlValue == null || ctlValue == 'null')
        return false;
    if (ctlValue.length == 0)
        return false;
    return true;
}
function fnErrorMessage(msg) {
    fnShowMsg(msg, 'RED', false);
}
function fnSetErrorFocus(Obj) {
    Obj.focus();
}
function fnSetItemStyle(ctlItem, prop, val) {
    prop = prop.toUpperCase();
    gE(brGetControlId(ctlItem)).style.visibility = "visible";
    if (val == "T")
        gE(brGetControlId(ctlItem)).className = "Mandatory";
    else if (val == "F")
        gE(brGetControlId(ctlItem)).className = "Label";
    else if (val == "Mask") {
        if (brIsIgCtl(ctlItem) == true) {
            ctlItem = fnCheckigtxt(ctlItem);
            var editor = igedit_getById(ctlItem);
            for (var i = 0; i < prop.length; i++) {
                prop = prop.replace('X', "A");
                prop = prop.replace('9', "0");
            }
            editor.setInputMask(prop);
        }
    }
}
function fnsetCaptionChange(ctlItem, IsCaptionChange, FieldCaptionChange) {
    document.getElementById(ctlItem).innerHTML = FieldCaptionChange;
}

function fnsetDisableCtrl(ctlItem, strIsDisable) {
    var ctrlId = ctlItem;
    fnDisableFields(ctrlId);
}

//For ASP TextBox Out side Tab
function fnSetLengthASP(ctlItem, iLength) {
    gE(ctlItem).maxLength = iLength;
}

//For ASP TextBox In side Tab
function fnSetMaxLength(ctlItem, iLength) {
    gE(brGetControlId(ctlItem)).maxLength = iLength;
}
// for infragstic control only
function fnSetLength(ctrl, len) {
    if (igedit_getById(ctrl) == null) {
        gE(ctrl).maxLength = len;
    }
    else
        igedit_getById(ctrl).maxLength = len;

}
function fnFillCombo(strArr, cboID) {
    for (var i = 0; i < cboID.options.length; i++) {
        cboID.remove(i);
    }
    for (var i = 0; i < cboID.options.length; i++) {
        cboID.options[i] = null;
    }
    for (var i = 0; i < strArr.length; i++) {
        if (typeof (strArr[i]) == "string") {
            cboID.options[i] = new Option(strArr[i]);
            cboID.options[i].value = strArr[i];
        }
        else {
            cboID.options[i] = new Option(strArr[i][1] + "-" + strArr[i][0]);
            cboID.options[i].value = strArr[i][1] + "-" + strArr[i][0];
        }
    }
    return false;
}
/****************************************************************************************
    Function/Procedure  Name            :- fnCreateDiv/fnMouseOver/fnHideDiv/fnShowDiv
    functionality                       :- This function will help you to get loading during pageload time.
    returns                             :- None
    written by                          :- Muthu
    modified by                         :- Sankar Raj
****************************************************************************************/
function fnShowWaitDiv() {
    if (!dv) {
        fnCreateDiv();
    }
    dv.style.visibility = 'visible';
}
function fnHideWaitDiv() {
    if (dv)
        dv.style.visibility = 'hidden';
}
var dv;

function fnCreateDiv() {
    dv = document.createElement('div');
    dv.setAttribute('id', "LoadDiv");
    dv.style.backgroundColor = '#CFECFD';
    dv.style.borderRight = 'black thin dotted';
    dv.style.borderTop = 'black thin dotted';
    dv.style.borderLeft = 'black thin dotted';
    dv.style.borderBottom = 'black thin dotted';
    dv.className = "top";
    dv.style.position = "absolute";
    dv.style.left = "90%";
    dv.style.top = "10%";
    dv.style.textAlign = "center";

    dv.innerHTML = " " + INIGetMessageById("1301") + " ";
    dv.style.visibility = 'hidden';

    if (dv.addEventListener) {
        dv.addEventListener("mouseover", function () { fnMouseOver(); }, false);
        dv.addEventListener("mouseout", function () { fnMouseOut(); }, false);
    }
    else if (dv.attachEvent) {
        dv.attachEvent("onmouseover", function () { fnMouseOver(); });
        dv.attachEvent("onmouseout", function () { fnMouseOut(); });
    }

    document.forms[0].appendChild(dv);
}
function fnMouseOver() {
    dv.innerHTML = " " + INIGetMessageById("1302") + "...";
}
function fnMouseOut() {
    dv.innerHTML = " " + INIGetMessageById("1301") + " ";
}
function fnPopulateCombo(cboList, txtField, valField, tableName, selectText) {
    try {
        var cboID = gE(brGetControlId(cboList));
        var iCboIndex = 0;
        if (selectText) {
            iCboIndex = 1;
            cboID.options[0] = new Option(selectText);
            cboID.options[0].value = 'CBOSELECT'; //Combo Text -- Select -- then Value CBOSELECT
        }
        for (var i = 0; i < dsCboItem[tableName].Rows.length; i++, iCboIndex++) {
            cboID.options[iCboIndex] = new Option(dsCboItem[tableName].Rows[i][txtField]);
            cboID.options[iCboIndex].value = dsCboItem[tableName].Rows[i][valField];
            // This is to display the text in tool tip
            cboID.options[iCboIndex].title = dsCboItem[tableName].Rows[i][txtField];
            if (dsCboItem[tableName].Rows[i]['IsDefault'] == 'true') {
                cboID.options[iCboIndex].selected = true;
                cboID.options[iCboIndex].defaultSelected = true;
            }
        }
    }
    catch (ex) {
        return false;
    }
}
function fnPopulateChkListBox(cboList, txtField, valField, selectText) {
    try {
        var cboID = gE(brGetControlId(cboList));
        otitle = gE('title');
        oCboItemList = gE(brGetControlId('cboItemList'));
        strCboLst = "";
        cboTop = 0;
        var iCboIndex = 0;
        for (i = 0; i < dsCboItem.t_CodeDetails.Rows.length; i++) {
            strCboLst = strCboLst + "<span id='span" + i + "' style='width:100%;top:" + cboTop + "px;left:0%;position:absolute;'><input " +
                "type=checkbox style='left:10px;'  id='chk" + i + "' value=" + dsCboItem.t_CodeDetails.Rows[i][valField] + " />" + dsCboItem.t_CodeDetails.Rows[i][txtField] + "</span>";
            cboTop = cboTop + 20;
        }
        oCboItemList.innerHTML = strCboLst;
    }
    catch (ex) {
        alert("Exception " + ex);
        return false;
    }
}
function fnSetTabItems() {
    var ctlId = arguments[0];
    var bVisible = arguments[1];
    var ultraTab = igtab_getTabById(ctlId);
    for (var i = 2; i < arguments.length; i++) {
        ultraTab.Tabs[arguments[i]].setVisible(bVisible);
    }
}
function fnClearComboItems(cboList) {
    // To Remove all the combo box items
    var cboID = gE(brGetControlId(cboList));
    for (var i = 1; i < cboID.options.length; i++)  // First Item is select so delete  all others
        cboID.remove(i);
    fnSelectCombo(cboList);
}
/****************************************************************************************
    Function/Procedure  Name            :- fnFetchValuesFromGrid/fnSetValueToControl
    functionality                       :- This function will help you to loading the a Grid record to corresponding controls.
    returns                             :- None
    written by                          :- Rabindra
****************************************************************************************/
function fnFetchValuesFromGrid() {
    for (var i = 0; i < arguments.length; i += 2) {
        fnSetValueToControl(fnGetControl(arguments[i], true).id, arguments[i + 1]);
    }
}
function fnSetValueToControl(ctlName, text) {
    gE(ctlName).disabled = false;
    if (text != null)
        gE(ctlName).value = text;
    gE(ctlName).disabled = true;
}
//Ajax Response Helpers
function DisplayAjaxError(resObj) {
    if (gE("lblMessage") != null) {
        try {
            if (resObj.value.ErrorMessage != null && resObj.value.ErrorMessage != "") {
                gE('lblMessage').style.color = "red";
                fnSetLabelMessage("lblMessage", resObj.value.ErrorMessage);
            }
            else if (resObj.value.ErrorCode != null) {
                fnShowMsg(resObj.value.ErrorCode, 'Red', false);
            }
        }
        catch (e) {
            gE('lblMessage').style.color = "red";
            fnSetLabelMessage("lblMessage", resObj.error);
        }
    }
    else {
        if (resObj.value.ErrorCode != null)
            fnShowMsg(resObj.value.ErrorCode, 'Red', true);
        else
            alert(resObj.value.ErrorMessage);
    }
}
function GetAJAXRespVal(result) {
    if (result.error)//AJAX Errors
    {
        if (result.error.description == "1406") {
            alert(INIGetMessageById('1406'));
            fnOnLogoff();
            return false;
        }
        DisplayAjaxError(result);//result.error
        return false;
    }
    else if (result.value.ErrorMessage != "" && result.value.ErrorMessage != null) {
        if (result.value.ErrorMessage == "003421" || result.value.ErrorCode == "003421") {
            SessionValidator.ForceChkRightsPopUp();
            return false;
        }
        else if (result.value.ErrorMessage == "003434" || result.value.ErrorCode == "003434") {
            alert(result.value.ErrorMessage);
            fnOnLogoff();
            return false;
        }
        else if (result.value.ErrorMessage == "003496" || result.value.ErrorCode == "003496") {
            alert(result.value.ErrorMessage);
            fnOnLogoff();
            return false;
        }
        else if (result.value.ErrorMessage == "000282" || result.value.ErrorCode == "000282") {
            SessionValidator.ForceSesionPopUp();
            return false;
        }
        else if (result.value.ErrorMessage == "100307" || result.value.ErrorCode == "100307") {
            fnShowMsg("100307", "red", true);
            return false;
        }
        else if (result.value.ErrorCode == "1001") {
            fnShowMsg("1001", "red", true);
            return false;
        }
            //	    else if(result.value.ErrorCode == "000285")
            //	    {
            //	        alert(result.value.ErrorMessage);
            //	        fnOnLogoff();
            //	        return false;
            //	    }
        else
            DisplayAjaxError(result);
        return false;
    }
    else if (result.value.ErrorCode != null)//Code Behind Catch Errors
    {
        DisplayAjaxError(result);//GetMessageById(result.value.ErrorCode)
        return false;
    }
    else if (result.value.bResponse == false)//Business Logic Errors?
    {
        DisplayAjaxError(result);//GetMessageById(result.value.ErrorCode)
        return false;
    }
    return result.value.ResponseValue;
}
function GetBRError(result) {
    if (result.error)
        return "AJAX Error";
    return result.value.ErrorCode;
}

function fnGetControl(ctlName) {
    if (gE(brGetControlId(ctlName)) != null)
        return gE(brGetControlId(ctlName));
    else
        return gE(ctlName);
}
// IP Address Validation:
function fnGetPart(oEdit) {
    var iInd = oEdit.sel1;
    if (oEdit.getSelectedText().length > 0)
        iInd = iInd - 1;
    if ((iInd >= 0) && (iInd < 3))
        return 0;
    if ((iInd >= 3) && (iInd < 7))
        return 1;
    if ((iInd >= 7) && (iInd < 11))
        return 2;
    return 3;
}
function fnGetOffset(oEdit) {
    var iInd = oEdit.sel1;
    if (oEdit.getSelectedText().length > 0)
        iInd = iInd - 1;
    if ((iInd >= 0) && (iInd <= 2))
        return iInd;
    if ((iInd == 3) || (iInd == 7) || (iInd == 11))
        return 0;
    if ((iInd > 3) && (iInd < 7))
        return iInd - 4;
    if ((iInd > 7) && (iInd < 11))
        return iInd - 8;
    return iInd - 12;
}
function fnChangeString(strVal, offSet, charToChange) {
    var str = "";
    for (var i = 0; i < strVal.length; i++) {
        if (i == offSet)
            str += charToChange;
        else
            str += strVal.charAt(i);
    }
    return str;
}
function fnIPAddressFilter(oEdit, keyCode, oEvent) {
    var curVal = oEdit.text.split('.')[fnGetPart(oEdit)];
    curVal = curVal.replace(/_/g, '0');
    var curOffSet = fnGetOffset(oEdit);
    curVal = fnChangeString(curVal, curOffSet, String.fromCharCode(keyCode));

    if (parseInt(curVal) > 255)//string
    {
        oEvent.keyCode = 48;
        return;
    }
}
function fnOnLogoff(btf) {
    try {
        if (window.xm_Container['brStartMenu']) {
            gE('root').style.display = "none";
            window.xm_Container['brStartMenu$ctl00$LeftMenu'].DispatchEvent('onmouseover', event, 'brStartMenu$ctl00$LeftMenu_Item_0');
            window.xm_Container['brStartMenu'].DispatchEvent('onmouseover', event, 'brStartMenu_Item_0');
        }
    }
    catch (eee)
    { }
    try {
        var response = BRBasePage.CheckSessionIDValidity(fnGetSessionID()).value;//fnGetSessionID()
        if (response == "003434" || response == "003496") {
            btf = null;
        }

        if (btf) {
            if (!BRDialog(1, "1101")) {
                //return false;
                fnLogOff_NoClick('1101');
                return false;
            }
            else
                fnLogOff_YesClick('1101');
        }
        //if (!(document.getElementById('frmDashBord') == null))
        //    fnOnDBUnload();
        //if (arrDBInfo.length > 0) {
        //    try {
        //        frmWelcome.UpdateDBItemPosition(arrDBInfo);
        //    }
        //    catch (e) {
        //        alert(e);
        //    }
        //}
        if (!btf) btf = false;
        frmWelcome.DoLogOFF(gE('_OperatorID').value, gE('_BranchID').value, gE('_System').value, gE('_MachineIP').value, gE('_BankID').value, ParseToBool(gE('_IsAdmin').value), btf, gE('_OfficerID').value, gE('_OfficerName').value, _callbackLogOff);
    }
    catch (ex) {
        if (gE('_IsAdmin') != null) {
            if (ParseToBool(gE('_IsAdmin').value))
                var Redirect = 'window.location.href="../General/DefaultUser.html"';
            else {
                var stpath = gE('_RedirectURL').value;
                var Redirect = 'window.location.href="stpath"';
            }
        }
        else {
            var Redirect = 'window.location.href="../General/DefaultUser.html"';
            window.setTimeout(Redirect, 1000);
            return false;
        }
        window.name = "";
        try {
            document.getElementById('popupFrame').src = "Clear.aspx";
            if (ParseToBool(gE('_IsAdmin').value))
                window.setTimeout('window.location.href="../General/DefaultUser.html"', 1000);
            else {
                window.setTimeout(Redirect, 1000);
            }
        }
        catch (exx) {
            open_nobars();
            window.returnValue = null;
            self.close();
        }
        return false;
    }
}
function fnLogOff_NoClick(n) {
    return false;
}
function fnLogOff_YesClick(n) {
    if (fnCheckNull(n) == '1101') {
        if (!(document.getElementById('frmDashBord') == null))
            fnOnDBUnload();
        if (arrDBInfo.length > 0) {
            try {
                frmWelcome.UpdateDBItemPosition(arrDBInfo);
            }
            catch (e) {
                alert(e);
            }
        }
        btf = true;
        if (!btf) btf = false;
        frmWelcome.DoLogOFF(gE('_OperatorID').value, gE('_BranchID').value, gE('_System').value, gE('_MachineIP').value, gE('_BankID').value, ParseToBool(gE('_IsAdmin').value), btf, gE('_OfficerID').value, gE('_OfficerName').value, _callbackLogOff);
        //BRDialogClose();
    }
    else if (fnCheckNull(n) == '1102') {
        try {
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
popupwin = "";
var show_referer;
function open_nobars() {
    if (ParseToBool(gE('_IsAdmin').value))
        var Redirect = 'window.location.href="../General/Defaultuser.html"';
    else {
        var strPath = gE('_RedirectURL').value;
        var Redirect = 'window.location.href="strPath"';
    }
    if (window.opener) {
        document.getElementById('lnkfwd').click();
        return false;
    }
    else if (show_referer == "" || show_referer == null) {
        if (ParseToBool(gE('_IsAdmin').value))
            show_referer = window.open("../General/DefaultUser.html", "Welcome", "height=" + screen.height * 0.88 + ", width=" + (window.screen.availWidth - 10) + ", top=0, left=0, toolbar=no, status=yes, scrollbars=no, location=no, menubar=no, directories=no, resizable=no", true);
        else {
            window.setTimeout(Redirect, 1000);
        }
        window_close();
    }
}
function window_close() {
    if (window.name != "frmMain" || window.name == null) {
        var ua = window.navigator.appVersion;
        var msie = ua.indexOf("MSIE ");
        var version = ua.substring(msie + 5, msie + 8);

        if (version >= "7.0") {
            window.open('', '_parent', '');
            window.close();
        } else {
            window.opener = self;
            window.close();
        }
    }
}
function _callbackLogOff(response) {
    //      //var Redirect = 'window.location.href="../General/' + gE('_RedirectURL').value +'"';
    //    if(document.all)
    //    {
    //        if(ParseToBool(gE('_IsAdmin').value))
    //            window.setTimeout('window.location.href="../General/Default.htm"',1000);
    //        else
    //        {
    //            var HomeURL = "../General/"+gE('_RedirectURL').value+"?"+"&RetHome="+'FrmHome';
    //            window.open(HomeURL);
    //            self.close();
    //            //window.setTimeout(Redirect,1000);
    //        }
    //    }
    //    else
    //    {
    //        if(ParseToBool(gE('_IsAdmin').value))
    //            window.setTimeout('window.location.href="../General/Default.htm"',1000);
    //        else
    //        {
    //            //window.setTimeout(Redirect,1000);
    //            window.open(HomeURL);
    //            self.close();
    //        }
    //    }
    //   return false;
    var HomeURL = gE('_RedirectURL').value + "?" + "&RetHome=" + 'FrmHome';

    //var Redirect = 'window.location.href="../General/' + gE('_RedirectURL').value+"?"+"&RetHome="+'FrmHome'+'"';
    if (ParseToBool(gE('_IsAdmin').value) == true) {
        window.setTimeout('window.location.href="../General/DefaultUser.html"', 1000);
    }
    else {
        window.open(HomeURL);
        self.close();
    }
    //window.setTimeout(Redirect,1000);
    return;
}
function CheckSessionValidation() {
    var response = BRBasePage.CheckSessionIDValidity(fnGetSessionID()).value;//fnGetSessionID()
    if (response == "003421") {
        return SessionValidator.ForceChkRightsPopUp();
    }
    else if (response == "003434") {
        alert(INIGetMessageById('003434'));
        fnOnLogoff();
        return false;
    }
    else if (response == "003496") {
        alert(INIGetMessageById('003496'));
        fnOnLogoff();
        return false;
    }
    else if (response == "000282") {
        return SessionValidator.ForceSesionPopUp();
    }
    else if (response == null) {
        return SessionValidator.ForceSesionPopUp();
    }
    else
        return true;
}
function ForceSessionValidation() {
    return SessionValidator.ForceSesionPopUp();
}
var fp1;
; (function (name, context, definition) {
    if (typeof module !== 'undefined' && module.exports) { module.exports = definition(); }
    else if (typeof define === 'function' && define.amd) { define(definition); }
    else { context[name] = definition(); }
})('Fingerprint', this, function () {
    'use strict';

    var Fingerprint = function (options) {
        var nativeForEach, nativeMap;
        nativeForEach = Array.prototype.forEach;
        nativeMap = Array.prototype.map;

        this.each = function (obj, iterator, context) {
            if (obj === null) {
                return;
            }
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === +obj.length) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    if (iterator.call(context, obj[i], i, obj) === {}) return;
                }
            } else {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (iterator.call(context, obj[key], key, obj) === {}) return;
                    }
                }
            }
        };

        this.map = function (obj, iterator, context) {
            var results = [];
            // Not using strict equality so that this acts as a
            // shortcut to checking for `null` and `undefined`.
            if (obj == null) return results;
            if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
            this.each(obj, function (value, index, list) {
                results[results.length] = iterator.call(context, value, index, list);
            });
            return results;
        };

        if (typeof options == 'object') {
            this.hasher = options.hasher;
            this.screen_resolution = options.screen_resolution;
            this.screen_orientation = options.screen_orientation;
            this.canvas = options.canvas;
            this.ie_activex = options.ie_activex;
        } else if (typeof options == 'function') {
            this.hasher = options;
        }
    };

    Fingerprint.prototype = {
        get: function () {
            var keys = [];
            keys.push(navigator.userAgent);
            keys.push(navigator.language);
            keys.push(screen.colorDepth);
            if (this.screen_resolution) {
                var resolution = this.getScreenResolution();
                if (typeof resolution !== 'undefined') { // headless browsers, such as phantomjs
                    keys.push(resolution.join('x'));
                }
            }
            keys.push(new Date().getTimezoneOffset());
            keys.push(this.hasSessionStorage());
            keys.push(this.hasLocalStorage());
            keys.push(this.hasIndexDb());
            //body might not be defined at this point or removed programmatically
            if (document.body) {
                //keys.push(typeof (document.body.addBehavior));
                keys.push(typeof undefined);
            } else {
                keys.push(typeof undefined);
            }
            keys.push(typeof (window.openDatabase));
            keys.push(navigator.cpuClass);
            keys.push(navigator.platform);
            keys.push(navigator.doNotTrack);
            keys.push(this.getPluginsString());
            if (this.canvas && this.isCanvasSupported()) {
                keys.push(this.getCanvasFingerprint());
            }
            if (this.hasher) {
                return this.hasher(keys.join('###'), 31);
            } else {
                return this.murmurhash3_32_gc(keys.join('###'), 31);
            }
        },

        /**
         * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
         *
         * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
         * @see http://github.com/garycourt/murmurhash-js
         * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
         * @see http://sites.google.com/site/murmurhash/
         *
         * @param {string} key ASCII only
         * @param {number} seed Positive integer only
         * @return {number} 32-bit positive integer hash
         */

        murmurhash3_32_gc: function (key, seed) {
            var remainder, bytes, h1, h1b, c1, c2, k1, i;

            remainder = key.length & 3; // key.length % 4
            bytes = key.length - remainder;
            h1 = seed;
            c1 = 0xcc9e2d51;
            c2 = 0x1b873593;
            i = 0;

            while (i < bytes) {
                k1 =
                  ((key.charCodeAt(i) & 0xff)) |
                  ((key.charCodeAt(++i) & 0xff) << 8) |
                  ((key.charCodeAt(++i) & 0xff) << 16) |
                  ((key.charCodeAt(++i) & 0xff) << 24);
                ++i;

                k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
                k1 = (k1 << 15) | (k1 >>> 17);
                k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

                h1 ^= k1;
                h1 = (h1 << 13) | (h1 >>> 19);
                h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
                h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
            }

            k1 = 0;

            switch (remainder) {
                case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
                case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
                case 1: k1 ^= (key.charCodeAt(i) & 0xff);

                    k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
                    k1 = (k1 << 15) | (k1 >>> 17);
                    k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
                    h1 ^= k1;
            }

            h1 ^= key.length;

            h1 ^= h1 >>> 16;
            h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
            h1 ^= h1 >>> 13;
            h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
            h1 ^= h1 >>> 16;

            return h1 >>> 0;
        },

        // https://bugzilla.mozilla.org/show_bug.cgi?id=781447
        hasLocalStorage: function () {
            try {
                return !!window.localStorage;
            } catch (e) {
                return true; // SecurityError when referencing it means it exists
            }
        },

        hasSessionStorage: function () {
            try {
                return !!window.sessionStorage;
            } catch (e) {
                return true; // SecurityError when referencing it means it exists
            }
        },

        hasIndexDb: function () {
            try {
                return !!window.indexedDB;
            } catch (e) {
                return true; // SecurityError when referencing it means it exists
            }
        },

        isCanvasSupported: function () {
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        },

        isIE: function () {
            if (navigator.appName === 'Microsoft Internet Explorer') {
                return true;
            } else if (navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)) {// IE 11
                return true;
            }
            return false;
        },

        getPluginsString: function () {
            if (this.isIE() && this.ie_activex) {
                return this.getIEPluginsString();
            } else {
                return this.getRegularPluginsString();
            }
        },

        getRegularPluginsString: function () {
            return this.map(navigator.plugins, function (p) {
                var mimeTypes = this.map(p, function (mt) {
                    return [mt.type, mt.suffixes].join('~');
                }).join(',');
                return [p.name, p.description, mimeTypes].join('::');
            }, this).join(';');
        },

        getIEPluginsString: function () {
            if (window.ActiveXObject) {
                var names = ['ShockwaveFlash.ShockwaveFlash',//flash plugin
                  'AcroPDF.PDF', // Adobe PDF reader 7+
                  'PDF.PdfCtrl', // Adobe PDF reader 6 and earlier, brrr
                  'QuickTime.QuickTime', // QuickTime
                  // 5 versions of real players
                  'rmocx.RealPlayer G2 Control',
                  'rmocx.RealPlayer G2 Control.1',
                  'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
                  'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
                  'RealPlayer',
                  'SWCtl.SWCtl', // ShockWave player
                  'WMPlayer.OCX', // Windows media player
                  'AgControl.AgControl', // Silverlight
                  'Skype.Detection'];

                // starting to detect plugins in IE
                return this.map(names, function (name) {
                    try {
                        new ActiveXObject(name);
                        return name;
                    } catch (e) {
                        return null;
                    }
                }).join(';');
            } else {
                return ""; // behavior prior version 0.5.0, not breaking backwards compat.
            }
        },

        getScreenResolution: function () {
            var resolution;
            if (this.screen_orientation) {
                resolution = (screen.height > screen.width) ? [screen.height, screen.width] : [screen.width, screen.height];
            } else {
                resolution = [screen.height, screen.width];
            }
            return resolution;
        },

        getCanvasFingerprint: function () {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // https://www.browserleaks.com/canvas#how-does-it-work
            var txt = 'http://valve.github.io';
            ctx.textBaseline = "top";
            ctx.font = "14px 'Arial'";
            ctx.textBaseline = "alphabetic";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = "#069";
            ctx.fillText(txt, 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText(txt, 4, 17);
            return canvas.toDataURL();
        }
    };
    return Fingerprint;
});
var brsType = detectBrowser();
function detectBrowser() {
    var ua = window.navigator.userAgent.toLowerCase();
    var FingValue = new Fingerprint();
    fp1 = FingValue.get();
    var URLSessionID = null;
    var arraysession = null;
    if ((i = ua.indexOf('msie')) != -1 || !!navigator.userAgent.match(/Trident\/7\./)) {
        var urlParams = document.location.href;
        var arrayAttribute = urlParams.split('&');
        if (arrayAttribute.length > 3) {
            for (var j = 0; j < arrayAttribute.length; j++) {
                if (arrayAttribute[j].substring(0, 9) === "SessionID") {
                    URLSessionID = arrayAttribute[j];
                    URLSessionID = URLSessionID.replace('%7e', '~');
                }
            }
            if (URLSessionID != undefined) {
                if (URLSessionID.length > 1) {
                    arraysession = URLSessionID.split('~');
                    if (arraysession.length > 1) {
                        if (fp1 != arraysession[1]) {
                            window.open("../General/CustomErrorMsg.htm", "_self");
                            return false;
                        }
                    }
                }
            }
        }
    }
    else {
        try {
            var Query = window.location.search;
            var urlParams = new URLSearchParams(Query);
            var IsSessionValue = urlParams.has('SessionID');
            if (ParseToBool(IsSessionValue) == true) {
                URLSessionID = urlParams.get('SessionID');
                arraysession = URLSessionID.split('~');
                if (arraysession.length > 1) {
                    if (fp1 != arraysession[1]) {
                        window.open("../General/CustomErrorMsg.htm", "_self");
                        return false;
                    }
                }
            }
        }
        catch (err) {
            return 'godzilla';
        }
    }

    if ((i = ua.indexOf('msie')) != -1) {
        return 'ie';
    }
    else if (typeof (window.controllers) != 'undefined' &&
                        typeof (window.locationbar) != 'undefined') {
        return 'godzilla';
    }
    else if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
        return 'Chrome';
    }
    else if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        return 'safari';
    }
    else if (!!navigator.userAgent.match(/Trident\/7\./)) {
        return 'godzilla';
    }
    return 'notsupported';
}
function fnRestrictDecimals(oEdit, keyCode, oEvent) {
    var decArr = oEdit.text.split('.');
    var tLength = oEdit.text.length;
    if (keyCode == 46) {
        var allow = tLength - oEdit.sel1;
        if (oEdit.text.indexOf('.') != -1)
            allow -= 1;
        if (allow > oEdit.decimals)
            oEvent.cancel = true;
    }
    else if (decArr.length > 1) {
        if (keyCode >= 48 && keyCode <= 57) {
            if ((decArr[1].length == oEdit.decimals) //Check Max Length Reached
                && (oEdit.sel1 >= (tLength - oEdit.decimals)) //Check that user is typing in decimal area
                    && (oEdit.getSelectedText().length == 0)) //Check User Not Overwriting
            {
                oEvent.cancel = true;
            }
            else if (oEdit.sel1 < (tLength - oEdit.decimals)) // user is not typeing in decimal area
            {
                if (oEdit.maxLength <= tLength + (oEdit.decimals + 1) && (oEdit.getSelectedText().length == 0))
                    oEvent.cancel = true;
            }
        }
    }
    else {
        if (oEdit.maxLength <= tLength + (oEdit.decimals + 1) && (oEdit.getSelectedText().length == 0))
            oEvent.cancel = true;
        //return false;
    }
}
// Initializes a new instance of the StringBuilder class
// and appends the given value if supplied
function StringBuilder(value) {
    this.strings = new Array("");
    this.append(value);
}
// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value) {
    if (value) {
        this.strings.push(value);
    }
};
// Clears the string buffer
StringBuilder.prototype.clear = function () {
    this.strings.length = 1;
};
// Converts this instance to a String.
StringBuilder.prototype.toString = function () {
    return this.strings.join("");
};
// Used to get bool data object.
function ParseToBool(input) {
    switch (typeof (input)) {
        case "boolean": return input;
        case "string":
            switch (input.toLowerCase()) {
                case "true": return true;
                case "false": return false;
            }
    }
    return input;
}
//Block - Negative values
function fnBlockNegative(oEdit, keyCode, oEvent, obj) {
    if (oEvent.event.type == "keypress") {
        if (keyCode == 45)
            oEvent.cancel = true;
    }
    else {
        if (keyCode == 38 || keyCode == 40 || keyCode == 189 || keyCode == 109 || (oEvent.event.shiftKey == true && (keyCode == 56 || keyCode == 57))) {
            if (document.all)
                oEvent.cancel = true;
            else {
                oEvent.cancel = true;
                return false;
            }
        }
        return;

    }
}
// Check Null && Undefined
function fnCheckNull(itemValue) {
    if (itemValue == null || itemValue == 'null' || itemValue == 'undefined' || itemValue == undefined || itemValue == 'Null')
        return "";
    else
        return itemValue;
}
//to ignore -value in currency
function fnRejected(oEdit, keyCode, oEvent, obj) {
    if (keyCode == 40 || keyCode == 109 || keyCode == 110 || keyCode == 40 || keyCode == 189 || keyCode == 190 || (oEvent.event.shiftKey == true && keyCode == 56) || (oEvent.event.shiftKey == true && keyCode == 57))
        oEvent.cancel = true;
    return;
}
function fnGetDateObject(ctlName) {
    var oCombo = igdrp_getComboById(ctlName);
    oCombo.update();
    if (oCombo == null)
        return;
    if (oCombo.getValue() != null)
        return new Date(oCombo.getValue());
    else
        return null;
}
function fnGetJSDateObject(dVal) {
    if (typeof (dVal) == "number" || fnCheckNull(dVal) == "")
        return;
    if (dVal.indexOf("UTC") != -1) {
        return new Date(dVal);
    }
    else if (dVal.indexOf("GMT") != -1) {
        return new Date(dVal);
    }
    else {
        dVal = dVal.replace(/T/g, ' ');
        return new Date(dVal.split(' ')[0].replace(/-/g, '/'));
    }
}
function fnGetUIDate(CtrlName) {
    var obj = igdrp_getComboById(CtrlName);
    var tod_date = new Date(obj.getValue());
    if (obj.getValue() != null)
        return formatDateString(tod_date);
    else
        return '';
}
function fnSetUIDate(CtrlName, DBdateVal) {
    var oCombo = igdrp_getComboById(CtrlName);
    if (fnCheckDate(DBdateVal)) {
        var strDateVal = DBdateVal.toString();
        if (strDateVal.indexOf("UTC") != -1) {
            oCombo.setValue(new Date(strDateVal));
            return;
        }
        else if (strDateVal.indexOf("GMT") != -1) {
            oCombo.setValue(new Date(strDateVal));
            return;
        }
        else {
            var tod_date;
            if (strDateVal.indexOf('T') != -1) {
                strDateVal = strDateVal.replace(/T/g, ' ');
                tod_date = new Date(strDateVal.split(' ')[0].replace(/-/g, '/'));
            }
            else {
                strDateVal = castToInfDate(strDateVal.toLowerCase());
                tod_date = new Date(strDateVal);
            }
            oCombo.setValue(tod_date);
        }
    }
    else {
        oCombo.setNullDateLabel(INIGetMessageById("1403"));
        oCombo.setValue(null);
    }
}
function fnCheckDate(itemValueDate) {
    if (itemValueDate == null || itemValueDate == 'null' || itemValueDate == 'Null' || itemValueDate == "" || itemValueDate == 'undefined' || itemValueDate == undefined)
        return false;
    else
        return true;
}
function formatDateString(tod_date) {
    var dateString = tod_date.getFullYear();
    if (tod_date.getMonth() < 9)
        dateString += '-0' + (parseInt(tod_date.getMonth()) + 1);
    else
        dateString += '-' + (parseInt(tod_date.getMonth()) + 1);
    if (tod_date.getDate() < 10)
        dateString += '-0' + tod_date.getDate();
    else
        dateString += '-' + tod_date.getDate();
    dateString += 'T00:00:00';
    return dateString;
}
function fnClearDate() {
    for (var i = 0; i < arguments.length; i++) {
        var oCombo = igdrp_getComboById(arguments[i]);
        oCombo.setNullDateLabel(INIGetMessageById("1403"));
        oCombo.setValue(null);
    }
}
/**********************************************************************
Use This function To Set Any Date Value To Any Control. This Function
Will Take Care Of Current Culture Info.
Input : Date String.
Output: Culture Specific Date String.
**********************************************************************/
function fnSetGridDate(DBdateVal) {

    try {
        var oCombo = igdrp_getComboById('WebGridDate');
        if (fnCheckDate(DBdateVal)) {
            var strDateVal = DBdateVal.toString();
            if (strDateVal.indexOf("UTC") != -1)
                oCombo.setValue(new Date(strDateVal));
            else if (strDateVal.indexOf("GMT") != -1)
                oCombo.setValue(new Date(strDateVal));
            else {
                var tod_date;
                if (strDateVal.indexOf('T') != -1) {
                    strDateVal = strDateVal.replace(/T/g, ' ');
                    tod_date = new Date(strDateVal.split(' ')[0].replace(/-/g, '/'));
                }
                else {
                    strDateVal = castToInfDate(strDateVal.toLowerCase());
                    tod_date = new Date(strDateVal);
                }
                oCombo.setValue(tod_date);
            }
        }
        else {
            oCombo.setValue(null);
            oCombo.setNullDateLabel("");
            return oCombo.getNullDateLabel();
        }
        return oCombo.getText();
    }
    catch (e) {
    };
}

/**********************************************************************
Use This function To Set Any Date Value To Any Control. This Function
Will Take Care Of Current Culture Info.
Input : Date String.
Output: Culture Specific Date String.
**********************************************************************/
function fnSetPageGridDate(DBdateVal) {

    try {
        var oCombo = igdrp_getComboById('WebGridDate');
        if (gE("hdnDatePtr") != null) {
            if (fnCheckNull(fnGetValue("hdnDatePtr")) != "")
                oCombo.editor.info.ShortDatePattern = fnGetValue("hdnDatePtr");
        }
        if (fnCheckDate(DBdateVal)) {
            var strDateVal = DBdateVal.toString();
            if (strDateVal.indexOf("UTC") != -1)
                oCombo.setValue(new Date(strDateVal));
            else {
                var tod_date;
                if (strDateVal.indexOf('T') != -1) {
                    strDateVal = strDateVal.replace(/T/g, ' ');
                    tod_date = new Date(strDateVal.split(' ')[0].replace(/-/g, '/'));
                }
                else {
                    strDateVal = castToInfDate(strDateVal.toLowerCase());
                    tod_date = new Date(strDateVal);
                }
                oCombo.setValue(tod_date);
            }
        }
        else {
            oCombo.setValue(null);
            oCombo.setNullDateLabel("");
            return oCombo.getNullDateLabel();
        }
        return oCombo.getText();
    }
    catch (e) {
    };
}
/*********************************************************************
Use This function To Set Any Date Value of Format 2007-12-20. This Function
Will Take Care Of Current Culture Info.
Input : Date String.
Output: Culture Specific Date String.
*********************************************************************/
function fnSetPopUpGridDate(DBdateVal) {

    try {
        var oCombo = igdrp_getComboById('WebGridDate');
        if (gE("hdnDatePtr") != null) {
            if (fnCheckNull(fnGetValue("hdnDatePtr")) != "")
                oCombo.editor.info.ShortDatePattern = fnGetValue("hdnDatePtr");
        }
        if (fnCheckDate(DBdateVal)) {
            var strDateVal = DBdateVal.toString();
            var tod_date;
            tod_date = new Date(strDateVal.split(' ')[0].replace(/-/g, '/'));
            oCombo.setValue(tod_date);

        }
        else {
            oCombo.setValue(null);
            oCombo.setNullDateLabel("");
            return oCombo.getNullDateLabel();
        }
        return oCombo.getText();
    }
    catch (e) {
    };
}
/**********************************************************************
Use This function To Set Any Numeric Value Or Currency Value To Any Control. This Function
Will Take Care Of Current Culture Info. This Function Should be Used In the Behind the Scenes Page.
Input : Control ID And Currency Value OR Numeric Value.
Output: Culture Specific Currency Value OR Numeric Value.
**********************************************************************/
function fnGetCurRegVal(Currency_Value) {
    return fnSetGridCurrORNum("WebGridCurrencyEdit", Currency_Value);
}
function fnGetNumRegVal(Numeric_Value) {
    return fnSetGridCurrORNum("WebGridNumericEdit", Numeric_Value);
}
function fnSetGridCurrORNum(Cntrl, DBCurrOrNum) {
    if (DBCurrOrNum != undefined && DBCurrOrNum.length != 0) {
        var ret = DBCurrOrNum.toString();
        if (ret.indexOf(".") != -1) {
            ret = ret.split(".");
            if (ret[1].length == 6)
                return DBCurrOrNum;
            else {
                var edit = igedit_getById(Cntrl);
                if (DBCurrOrNum != undefined && DBCurrOrNum.length != 0)
                    edit.setValue(DBCurrOrNum);
                else
                    edit.setValue(0);
                if (edit.getText().indexOf(edit.decimalSeparator) == -1)
                    return edit.getText() + ".00";
                else if (edit.getText().split('.')[1].length == 1)  // code changes for page grid .30 display by ravi
                    return edit.getText() + "0";
                else return edit.getText();
            }

        }
        else {
            var edit = igedit_getById(Cntrl);
            if (DBCurrOrNum != undefined && DBCurrOrNum.length != 0)
                edit.setValue(DBCurrOrNum);
            else
                edit.setValue(0);
            if (edit.getText().indexOf(edit.decimalSeparator) == -1)
                return edit.getText() + ".00";
            else if (edit.getText().split('.')[1].length == 1)  // code changes for page grid .30 display by ravi
                return edit.getText() + "0";
            else return edit.getText();
        }
    }
}
function fnClearImage() {
    fnGetControl("Prev").style.visibility = "hidden";
    fnGetControl("Next").style.visibility = "hidden";
}
/****************************************************************************************
    Function/Procedure  Name            :- fnSetNextUpdateCount
    functionality                       :- This function will set the next possible Update count
    Parameters                          :- ControlId
    returns                             :- none
    written by                          :- Pothirajan C on 18/01/06
****************************************************************************************/
function fnSetNextUpdateCount(ctrl) {
    var iVal = fnGetValue(ctrl);
    iVal = parseInt(iVal, 10);
    if (iVal == 255 || iVal == 0)
        iVal = 2;
    else
        iVal = iVal + 1;
    fnSetValue(ctrl, iVal);
}
/****************************************************************************************
    Function/Procedure  Name            :- fnRejectNegativeValues
    functionality                       :- This function will not allow to enter negative values in currency control
    returns                             :- none
    written by                          :- Ravishankar
    created by                          :- Pothirajan C
****************************************************************************************/
function fnRejectNegativeValues(oEdit, keyCode, oEvent, obj) {
    if (keyCode == 40 || keyCode == 109 || keyCode == 189 || (oEvent.event.shiftKey == true && keyCode == 56) || (oEvent.event.shiftKey == true && keyCode == 57))
        oEvent.cancel = true;
    return;
}
/****************************************************************************************
    Function/Procedure  Name            :- fnAllowNegativeValues
    functionality                       :- This function will allow to enter negative values in currency control
    returns                             :- none
    written by                          :- Biswajit Dash
****************************************************************************************/
function fnAllowNegativeValues(oEdit, keyCode, oEvent, obj) {
    var decArr = oEdit.text.split('.');
    var tLength = oEdit.text.length;
    if (keyCode == 46) {
        var allow = tLength - oEdit.sel1;
        if (oEdit.text.indexOf('.') != -1)
            allow -= 1;
        if (allow > oEdit.decimals)
            oEvent.cancel = true;
        else if (decArr[0].length == 12 && allow != 0)
            oEvent.cancel = true;
    }
    else if (decArr.length > 1) {
        if (keyCode >= 48 && keyCode <= 57) {
            if ((decArr[1].length == oEdit.decimals) //Check Max Length Reached
                && (oEdit.sel1 >= (tLength - oEdit.decimals)) //Check that user is typing in decimal area
                    && (oEdit.getSelectedText().length == 0)) //Check User Not Overwriting
            {
                oEvent.cancel = true;
            }
        }
    }
    else
        if (tLength == oEdit.maxLength - oEdit.decimals - 1)
            oEvent.cancel = true;
}
/****************************************************************************************
    Function/Procedure  Name            :- fnClearCheckOrRadio
    Parameters                          :- 'N' number of arguments
    functionality                       :- This function will clear checkbox / radiobuttons
    returns                             :- none
    created & Written by                :- Pothirajan C
****************************************************************************************/
function fnClearCheckOrRadio() {
    for (var i = 0; i < arguments.length; i++) {
        fnSetValue(arguments[i], false);
    }
}
/****************************************************************************************
    Function/Procedure  Name            :- fnPhoneValid
    Parameters                          :- It Accepts 0-9 & special character like +,-,(,),#
    functionality                       :- This function will Validate Phone Mobile & Fax
    returns                             :- none
    created & Written by                :- Ravi Shankar
****************************************************************************************/
function fnPhoneValid(oEdit, keyCode, oEvent, obj) {
    if (keyCode == 9 || (keyCode > 31 && keyCode < 41) || (keyCode > 44 && keyCode < 47) || (keyCode == 8 || keyCode == 13) || (oEvent.event.shiftKey == false && keyCode == 189) || keyCode == 109 || keyCode == 107 || keyCode == 43)
        oEvent.cancel = false;
    else if ((oEvent.event.shiftKey == false && (keyCode > 47 && keyCode < 58)) || (keyCode > 95 && keyCode < 106))
        oEvent.cancel = false;
    else if (oEvent.event.shiftKey == true && (keyCode == 187 || keyCode == 51 || keyCode == 48 || keyCode == 57 || keyCode == 35))    // +,#,(,) sign
        oEvent.cancel = false;
    else
        oEvent.cancel = true;
}
//Sartaj [Added]
function fnPhoneValidFF(mEvent) {
    var oEvent;
    var KeyCode;
    if (document.all) {
        oEvent = window.event;
        KeyCode = window.event.keyCode;

        if (KeyCode == 9 || (KeyCode > 31 && KeyCode < 41) || (KeyCode > 44 && KeyCode < 47) ||
            (KeyCode == 8 || KeyCode == 13) || (oEvent.shiftKey == false && KeyCode == 189) || (KeyCode == 107) ||
            (oEvent.shiftKey == false && KeyCode == 109) || (oEvent.shiftKey == true && KeyCode == 107) || KeyCode == 43)
            return true;
        else if ((oEvent.shiftKey == false && (KeyCode > 47 && KeyCode < 58)) || (KeyCode > 95 && KeyCode < 106))
            return true;
        else if (oEvent.shiftKey == true && (KeyCode == 187 || KeyCode == 51 || KeyCode == 35))    // +,#,- sign
            return true;
        else {
            if (document.all)
                window.event.returnValue = false;
            return false;
        }
    }
    else {
        KeyCode = mEvent.which;
        oEvent = mEvent;

        if (KeyCode == 9 || (KeyCode > 31 && KeyCode < 41) || (KeyCode > 44 && KeyCode < 47) ||
            (KeyCode == 8 || KeyCode == 13) || (oEvent.shiftKey == false && KeyCode == 173) || (KeyCode == 107) ||
            (oEvent.shiftKey == false && KeyCode == 109) || (oEvent.shiftKey == true && KeyCode == 107) || KeyCode == 43)
            return true;
        else if ((oEvent.shiftKey == false && (KeyCode > 47 && KeyCode < 58)) || (KeyCode > 95 && KeyCode < 106))
            return true;
        else if (oEvent.shiftKey == true && (KeyCode == 61 || KeyCode == 51 || KeyCode == 35))    // +,#,- sign
            return true;
        else {
            if (document.all)
                window.event.returnValue = false;
            return false;
        }
    }
}

function fnMobileValidFF(mEvent) {
    var oEvent;
    var KeyCode;
    if (document.all) {
        oEvent = window.event;
        KeyCode = window.event.keyCode;

        if (KeyCode == 9 || (KeyCode > 31 && KeyCode < 41) || (KeyCode > 44 && KeyCode < 47) ||
            (KeyCode == 8 || KeyCode == 13) || (KeyCode == 107) || (oEvent.shiftKey == true && KeyCode == 107) || KeyCode == 43)
            return true;
        else if ((oEvent.shiftKey == false && (KeyCode > 47 && KeyCode < 58)) || (KeyCode > 95 && KeyCode < 106))
            return true;
        else if (oEvent.shiftKey == true && KeyCode == 187)    // + sign
            return true;
        else {
            if (document.all)
                window.event.returnValue = false;
            return false;
        }
    }
    else {
        KeyCode = mEvent.which;
        oEvent = mEvent;

        if (KeyCode == 9 || (KeyCode > 31 && KeyCode < 41) || (KeyCode > 44 && KeyCode < 47) ||
            (KeyCode == 8 || KeyCode == 13) || (KeyCode == 107) || (oEvent.shiftKey == true && KeyCode == 107) || KeyCode == 43)
            return true;
        else if ((oEvent.shiftKey == false && (KeyCode > 47 && KeyCode < 58)) || (KeyCode > 95 && KeyCode < 106))
            return true;
        else if (oEvent.shiftKey == true && KeyCode == 61)    // + sign
            return true;
        else {
            if (document.all)
                window.event.returnValue = false;
            return false;
        }
    }
}

/****************************************************************************************
    Function/Procedure  Name            :- fnAcceptOnlyNumbers
    functionality                       :- This function will not allow to enter negative values, comma in numeric control
    returns                             :- none
    written by                          :- Ravishankar
    created by                          :- Pothirajan C
****************************************************************************************/
function fnAcceptOnlyNumbers(oEdit, keyCode, oEvent, obj) {
    if (keyCode == 38 || keyCode == 40 || keyCode == 109 || keyCode == 190 || keyCode == 110 || (oEvent.event.shiftKey == true && keyCode == 57))//keyCode == 189 ||
        oEvent.cancel = true;
    return;
}
/****************************************************************************************
   pls donot touch this code its for internal use
****************************************************************************************/
function castToInfDate(objectToCast) {
    if (objectToCast == null || objectToCast == '') return;
    try {
        for (var i = 0; i < monNamArr.length; i++) {
            if (objectToCast.indexOf(monNamArr[i].toLowerCase()) != -1) {
                var tq = new Array(gE("hdnDatePtrn").value.toLowerCase().split("/")); var D; var M; var Y;
                if (tq[0][0].toString().indexOf("d") == 0) D = 0;
                else if (tq[0][1].toString().indexOf("d") == 0) D = 1;
                else if (tq[0][2].toString().indexOf("d") == 0) D = 2;
                if (tq[0][0].toString().indexOf("m") == 0) M = 0;
                else if (tq[0][1].toString().indexOf("m") == 0) M = 1;
                else if (tq[0][2].toString().indexOf("m") == 0) M = 2;
                if (tq[0][0].toString().indexOf("y") == 0) Y = 0;
                else if (tq[0][1].toString().indexOf("y") == 0) Y = 1;
                else if (tq[0][2].toString().indexOf("y") == 0) Y = 2;
                objectToCast = objectToCast.split(' ')[0];
                objectToCast = (i + 1).toString() + '/' + objectToCast.split('/')[D] + '/' + objectToCast.split('/')[Y];
                return objectToCast;
            }
        }
        return objectToCast;
    }
    catch (e) {
        var tq = new Array(document.getElementById("hdnDatePtrn").value.toLowerCase().split("/")); var D; var M; var Y;
        if (tq[0][0].toString().indexOf("d") == 0) D = 0;
        else if (tq[0][1].toString().indexOf("d") == 0) D = 1;
        else if (tq[0][2].toString().indexOf("d") == 0) D = 2;
        if (tq[0][0].toString().indexOf("m") == 0) M = 0;
        else if (tq[0][1].toString().indexOf("m") == 0) M = 1;
        else if (tq[0][2].toString().indexOf("m") == 0) M = 2;
        if (tq[0][0].toString().indexOf("y") == 0) Y = 0;
        else if (tq[0][1].toString().indexOf("y") == 0) Y = 1;
        else if (tq[0][2].toString().indexOf("y") == 0) Y = 2;
        objectToCast = objectToCast.split(' ')[0];
        objectToCast = objectToCast.split('/')[M] + '/' + objectToCast.split('/')[D] + '/' + objectToCast.split('/')[Y];
        return objectToCast;
    }
}

function replaceSubstring(inputString, fromString, toString) {
    var temp = inputString;
    if (fromString == "") { return inputString; }
    if (toString.indexOf(fromString) == -1) {
        while (temp.indexOf(fromString) != -1) {
            var toTheLeft = temp.substring(0, temp.indexOf(fromString));
            var toTheRight = temp.substring(temp.indexOf(fromString) + fromString.length, temp.length);
            temp = toTheLeft + toString + toTheRight;
        }
    } else {
        var midStrings = new Array("~", "`", "_", "^", "#");
        var midStringLen = 1;
        var midString = "";

        while (midString == "") {
            for (var i = 0; i < midStrings.length; i++) {
                var tempMidString = "";
                for (var j = 0; j < midStringLen; j++) { tempMidString += midStrings[i]; }
                if (fromString.indexOf(tempMidString) == -1) {
                    midString = tempMidString;
                    i = midStrings.length + 1;
                }
            }
        }
        while (temp.indexOf(fromString) != -1) {
            var toTheLeft = temp.substring(0, temp.indexOf(fromString));
            var toTheRight = temp.substring(temp.indexOf(fromString) + fromString.length, temp.length);
            temp = toTheLeft + midString + toTheRight;
        }
        while (temp.indexOf(midString) != -1) {
            var toTheLeft = temp.substring(0, temp.indexOf(midString));
            var toTheRight = temp.substring(temp.indexOf(midString) + midString.length, temp.length);
            temp = toTheLeft + toString + toTheRight;
        }
    }
    return temp;
}
/****************************************************************************************************/
// This Function will Create PopUp Container
function fnCreateElements(isParent, IsComboReq, customFunc, ISWFForm) {
    var PopUpElement = document.getElementById('popupContainer');
    if (!PopUpElement) {
        q = document.createElement("DIV");
        q.id = "popupMask";
        p = document.createElement("DIV");
        p.id = "popupContainer";
        var s = "";
        p.style.zIndex = 1000;
        if (ISWFForm) {
            s = '<div id="popupInner">' +
            '<div id="popupTitleBar" style="cursor:move;">' +
                '<div id="popupTitle"></div>' +
                '<div id="popupControls">' +
                '<img id="DialogCloseBtn" style="cursor:hand;" onclick="hidePopWin(true,' + isParent + ',\'' + customFunc + '\',' + IsComboReq + ',true);" align="right" src="../../Images/floatingPaneClose.gif" alt="Close" title="Close" />' +
                '<img id="DialogMinBtn" style="cursor:hand;" onclick=showHideContent("popupFrame"); align="right" src="../../Images/floatingPaneMinimize.gif" alt="Minimize" title="Minimize" />' +
                '</div>' +
            '</div>' +
            '<iframe tabindex="-1" src="" style="z-index:500; overflow:hidden; width:100%;height:100%;background-color:transparent;" +-scrolling="auto" frameborder="0" allowtransparency="true" id="popupFrame" name="popupFrame" width="100%" height="100%"></iframe>' +
            '</div>';
        }
        else {
            s = '<div id="popupInner">' +
            '<div id="popupTitleBar" style="cursor:move;">' +
                '<div id="popupTitle"></div>' +
                '<div id="popupControls">' +
                '<img id="DialogCloseBtn" style="cursor:hand;" onclick="hidePopWin(true,' + isParent + ',\'' + customFunc + '\',' + IsComboReq + ');" align="right" src="../Images/floatingPaneClose.gif" alt="Close" title="Close" />' +
                '<img id="DialogMinBtn" style="cursor:hand;" onclick=showHideContent("popupFrame"); align="right" src="../Images/floatingPaneMinimize.gif" alt="Minimize" title="Minimize" />' +
                '</div>' +
            '</div>' +
            '<iframe tabindex="-1" src="" style="z-index:500; overflow:hidden; width:100%;height:100%;background-color:transparent;" +-scrolling="auto" frameborder="0" allowtransparency="true" id="popupFrame" name="popupFrame" width="100%" height="100%"></iframe>' +
            '</div>';
        }
        p.innerHTML = s;
        document.forms[0].appendChild(p);
        document.forms[0].appendChild(q);
        if (isIE6)
            document.body.insertAdjacentHTML("beforeEnd", '<iframe id="tipShim" tabindex="-1" allowTransparency = true src="" style="width:0px;height:0px;position:absolute; left:0; top:0; z-index:500; visibility:visible" scrolling="no" frameborder="0"></iframe>');
        else {
            //Dinesh [Added]
            var iFrame = document.createElement('iframe');
            iFrame.setAttribute('src', '');
            iFrame.style.visibility = 'visible';
            iFrame.style.width = '0px';
            iFrame.style.height = '0px';
            iFrame.style.left = '0px';
            iFrame.style.top = '0px';
            //iFrame.style.z-index  = '500';
            iFrame.style.position = 'absolute';
            iFrame.style.border = 'none';

            iFrame.setAttribute('id', "tipShim");
            iFrame.setAttribute('name', "tipShim");
            iFrame.setAttribute('tabindex', "-1");
            iFrame.setAttribute('allowTransparency', true);
            iFrame.setAttribute('scrolling', "no");
            iFrame.setAttribute('frameborder', "0");
            document.body.appendChild(iFrame);
        }
        //bellow code for to prevent focusing to iframe.
        if (document.getElementById('brStartMenu_Menu_0_over'))
            document.getElementById('brStartMenu_Menu_0_over').tabIndex = "-1";
    }
    return PopUpElement;
}
// Function will Ask Promt before Close Your Browser
function fnAskUnload() {
    return false;
}
// Function for Show Dialogue Remarks
function fnSupervisionShowDialog() {
    var strRemarks = "";
    strRemarks = Windows.ShowDialogWindow("../General/frmSupervisionRemarks.aspx", "", 110, 550);
    return strRemarks;
}
// Functions for Add/Edit/Delete click
function fnbtnAddClick() {
    fnSetMessage("");
    fnUserRights("ADD");
    return false;
}
function fnbtnEditClick() {
    fnSetMessage("");
    fnUserRights("EDIT");
    return false;
}
function fnbtnDeleteClick() {
    fnSetMessage("");
    requestedMode = "DELETE";
    fnUserRights("DELETE");
    return false;
}
function fnbtnBackClick() {
    return fnGoBack();

}
/************************************************
1. Purpose  	:  To set message and color to label control
2. Parameters  	:
   1) Input  	: MessageName ,Color, IsMsgBox   eg. "10006","Red",false
   2) Output 	:
3. Return Value(s)
4. Writtenby : Ravi Shankar
5. Programmers’ Notes  : to clear the message you can pass MsgID  and color as   null.
‘*************************************************/
function fnShowMsg(MsgID, Color, IsMsgBox) {
    var lblMessg = gE("lblMessage") ? "lblMessage" : "ctl00_ContentPlaceHolder1_lblMessage";

    errorMsg = "";
    if (MsgID == "" || MsgID == null) {
        fnSetLabelMessage(lblMessg, "");
        fnClearImage();
        return;
    }
    if (ParseToBool(IsMsgBox) == false) {
        if (Color.toUpperCase() == "RED")
            gE(lblMessg).style.color = "red";
        else
            gE(lblMessg).style.color = "blue";
        if (GetMessageById(MsgID)) {
            errorMsg = GetMessageById(MsgID);
            for (var i = 3; i < (arguments.length) ; i++) {
                var regex = new RegExp("/{" + (i - 3) + "/}");
                for (j = 0; j < 4; j++) {
                    regex = regex.toString().replace('\\/', '').replace('\\/', '').replace('/', '').replace('/', '');
                }
                errorMsg = errorMsg.replace(regex, arguments[i]);
            }
        }
        else if (INIGetMessageById(MsgID)) {
            errorMsg = INIGetMessageById(MsgID);
            for (var i = 3; i < (arguments.length) ; i++) {
                var regex = new RegExp("/{" + (i - 3) + "/}");
                for (j = 0; j < 4; j++) {
                    regex = regex.toString().replace('\\/', '').replace('\\/', '').replace('/', '').replace('/', '');
                }
                errorMsg = errorMsg.replace(regex, arguments[i]);
            }
        }
        fnSetLabelMessage(lblMessg, errorMsg);
    }
    else
        BRDialog(3, MsgID);
}
/************************************************
 1. Purpose  	:  To Enter Amount Value,It restricts the deciaml part & integer part,whatever u assign in design mode
 2. Writtenby : Ravi Shankar
 3.Use this function ON keypress
 4.In Numeric & currency Control Infragistics.
 ‘*************************************************/
function fnRestrictDecimalsAmount(oEdit, keyCode, oEvent) {
    if ((oEvent.event.shiftKey == true && keyCode == 40) || keyCode == 45) {
        if (document.all)
            oEvent.cancel = true;
        else {
            oEvent.cancel = true;
            return true;
        }

    }
    var decArr = oEdit.text.split('.');
    var tLength = oEdit.text.length;
    if (keyCode == 46) {
        var allow = tLength - oEdit.sel1;
        if (oEdit.text.indexOf('.') != -1)
            allow -= 1;
        if (allow > oEdit.decimals)
            oEvent.cancel = true;
        else if (decArr[0].length == 12 && allow != 0)
            oEvent.cancel = true;
    }
    else if (decArr.length > 1) {
        if (keyCode >= 48 && keyCode <= 57) {
            if ((decArr[1].length == oEdit.decimals) //Check Max Length Reached
                && (oEdit.sel1 >= (tLength - oEdit.decimals)) //Check that user is typing in decimal area
                    && (oEdit.getSelectedText().length == 0)) //Check User Not Overwriting
            {
                oEvent.cancel = true;
            }
        }
    }
    else
        if (tLength == oEdit.maxLength - oEdit.decimals - 1)
            oEvent.cancel = true;
}
/*****************************************************************************************************************
    Function/Procedure  Name            :- BRDialog(iDialogCode,["error code"],[coma separated format arguments..])
    functionality                       :- To Display Confirm,Alert,Worning,Remarks,Input Dialogs
    returns                             :- Confirm Dialog => iDialogCode=1 true on YES,false on NO
                                           Warning Dialog => iDialogCode=2 None on OK
                                           ALERT Dialog   => iDialogCode=3,None on OK
                                           Remarks Dialog => iDialogCode=4  remarks on OK,null on Cancel
                                           Input Dialog   => iDialogCode=5  Input Text on Save,null on Cancel
    created & written by                :- VenkataSivaRamaKrishna.Movva
******************************************************************************************************************/
function BRDialog(iDialogCode, errorCode) {
    try {
        if (iDialogCode == 4) // For supervision Remarks , Add then Delete Remarks not required
        {
            if (fnGetValue("_IsSVDialog").toUpperCase() == 'TRUE') {
                return '';
            }
            else {
                if (parseInt(fnGetValue("hdnEventID")) == 2) {
                    if (requestedMode == "DELETE") {
                        requestedMode = null;
                        return '';
                    }
                }
            }
        }
        var strDialogArgs = new Array();
        if (arguments.length != 0) {
            strDialogArgs[0] = iDialogCode;
            if (strDialogArgs[0] < 5) {
                if (arguments.length == 1) {
                    strDialogArgs[1] = "";
                }
                else if (arguments.length >= 2) {
                    strDialogArgs[1] = "Error Code is Not Registered";
                    if (INIGetMessageById(errorCode)) {
                        errorMsg = INIGetMessageById(errorCode);
                        for (var i = 2; i < (arguments.length) ; i++) {
                            var regex = new RegExp("/{" + (i - 2) + "/}");
                            for (j = 0; j < 4; j++) {
                                regex = regex.toString().replace('/', '');
                            }
                            errorMsg = errorMsg.replace(regex, arguments[i]);
                        }
                        strDialogArgs[1] = errorMsg;
                    }

                    else if (GetMessageById(errorCode)) {
                        errorMsg = GetMessageById(errorCode);
                        for (var i = 2; i < (arguments.length) ; i++) {
                            var regex = new RegExp("/{" + (i - 2) + "/}");
                            for (j = 0; j < 4; j++) {
                                regex = regex.toString().replace('/', '');
                            }
                            if (document.all)
                                errorMsg = errorMsg.replace(regex, arguments[i]);
                            else
                                errorMsg = errorMsg.replace(regex.replace('\\', '').replace('\\', ''), arguments[i]);

                        }
                        strDialogArgs[1] = errorMsg;
                    }

                    else {
                        strDialogArgs[0] = 3;
                    }
                }
            }
            else {
                strDialogArgs[1] = errorCode;
            }

            var errorMsgWidth = strDialogArgs[1].toString().length;
            var dHeight = 145;
            var dWidth;
            if (errorMsgWidth <= 22) {
                if (strDialogArgs[0] == 4) {
                    dWidth = 355;
                    dHeight = 165;
                }
                else if (strDialogArgs[0] == 5) {
                    dWidth = 415;
                    dHeight = 165;
                }
                else {
                    dWidth = 265;
                    dHeight = 135;
                }
            }
            else if (errorMsgWidth > 22 && errorMsgWidth <= 44) {
                dWidth = 165 + (6 * 8) + (6 * (errorMsgWidth - 22));
                dHeight = 135;
            }
            else if (errorMsgWidth > 44 && errorMsgWidth <= 68) {
                dWidth = 165 + (6 * 32) + (6 * (errorMsgWidth - 44));
            }
            else if (errorMsgWidth > 68) {
                dHeight = 135 + ((errorMsgWidth / 68) * 12);
                dWidth = 165 + (6 * 56);
            }
            strDialogArgs[2] = dWidth;
            strDialogArgs[3] = dHeight;
            //Dinesh [added and updated]
            var Top = screen.height / 3 - dHeight / 2 + 50;
            var Left = screen.width / 2 - dWidth / 2;
            // var res = window.showModalDialog(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'help:no;dialogHeight:' + dHeight + 'px;dialogWidth:' + (dWidth + 50) + 'px;dialogTop:' + Top + ';dialogLeft:' + Left + ';status:no;scroll:no;resizable:0;');
            //        openModal(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID='+fnGetSessionID());
            //   In supervision popup  if we clieck cancel we have to send res value as null
            if (fnCheckNull(resdiag) != "" && !window.showModalDialog) {
                BRDialogClose();
            }
            if (brsType != 'Chrome') {
                resdiag = window.showModalDialog(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'help:no;dialogHeight:' + dHeight + 'px;dialogWidth:' + (dWidth + 50) + 'px;dialogTop:' + Top + ';dialogLeft:' + Left + ';status:no;scroll:no;resizable:0;');
                return resdiag;
            }
                //        openModal(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID='+fnGetSessionID());
                //   In supervision popup  if we clieck cancel we have to send res value as null
            else {
                strDialogArgs = strDialogArgs.join('*');
                resdiag = window.open(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'WebDialogPop", height=' + dHeight + ',width=' + (dWidth + 50) + ',left=' + Left + ',top=' + Top + ',help=no,scrollbars=no,status=no,resizable=0,alwaysLowered=no,z-lock=no;');

                //resdiag = window.open(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs,   'height=' + dHeight + ',width='+ (dWidth + 50) + ',left='+ Left +',top='+ Top +',help=no,scrollbars=no,status=no,resizable=yes,alwaysLowered=no,z-lock=no');
                //return resdiag;
            }
            // return res;
        }
    }
    catch (errObj) {
        var lblMessg = gE("lblMessage") ? "lblMessage" : "ctl00_ContentPlaceHolder1_lblMessage";
        fnSetLabelMessage(lblMessg, "Your Browser Setting has been changed,Please Re-login the Application");
        gE(lblMessg).style.color = "red";
        return false;
    }

}

//function openModal(uri)
//{
//  var a = new Array;
//  a[0] = 1;
//  a[1] = 4;

//  var r = window.showModalDialog(uri, a, "dialogwidth: 450; dialogheight: 300; resizable: yes");
//  document.getElementById('foo').textContent = r;
//  alert(r);
//}


/**********************************************************************************************************************************
    Function/Procedure  Name            :- BRScanDialog([Local File Path of the Image which is going to be get loded])
    functionality                       :- To Open Scanner Window Dialog.
    Description				            :-
					                       1)BRScanDialog('file://c:\\xyz.jpg')
						                    a)It opens a Dialog with this imagefile in in edit plane.
						                    b)It won't allow u to scan. Allows only for editing and Saving.
					                       2)BRScanDialog()
						                    a)Opens a Dialog which will allow to scan using Imaging Devices like webcam,scanner etc
    returns                             :-
					                       1) Temporary Path of the Image to be saved
					                       2) Actual Image bytes which are going to send to Data Base Image Field

    created & written by                :- VenkataSivaRamaKrishna.Movva
***********************************************************************************************************************************/
function BRScanDialog() {
    var strDialogArgs;
    if (arguments[0]) {
        strDialogArgs = arguments[0];
    }
    var dHeight = 470;
    var dWidth = 466;
    var res = window.showModalDialog('../General/BRScanDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'help:no;dialogHeight:' + dHeight + 'px;dialogWidth:' + dWidth + 'px;status:no;scroll:no');
    return res;
}
/**********************************************************************************************************************************
    Function/Procedure  Name            :- BRSignPhotoDialog(SignID,PhotoID)
    functionality                       :- To Open Dialog with Signature,Photo or Both
    Description				            :-
					                       1)BRSignPhotoDialog(null,'12')
						                        a)Opens a Dialog with  Photo Only.
					                       2)BRSignPhotoDialog('11',null)
						                        a)Opens a Dialog with Signature Only
						                   3)BRSignPhotoDialog('11','12')
						                        a)Opens a Dialog with Both Signature and Photo

    returns                             :- nothing
    created & written by                :- VenkataSivaRamaKrishna.Movva
***********************************************************************************************************************************/
function BRSignPhotoDialog() {
    var strDialogArgs = new Array();
    strDialogArgs[0] = arguments[0];
    strDialogArgs[1] = arguments[1];
    strDialogArgs[2] = gE('SessionID').value;
    strDialogArgs[3] = window.document.title;
    strDialogArgs[4] = isTempClient;
    var resolutionratio = screen.height / screen.width;
    var dWidth = screen.width * 3 / 4;
    //var dHeight = dWidth * resolutionratio*2/3;
    var dHeight = "520";
    if (!!navigator.userAgent.match(/Trident\/7\./))
        dHeight = "600";
    var res;
    if (brsType != 'Chrome')
        res = window.showModalDialog('../ImageAccounts/frmSignaturePhotoDialog.aspx?SessionID=' + fnGetSessionID() + "&Title=" + window.document.title + "&argArray=" + strDialogArgs, null, 'help:no;dialogHeight:' + dHeight + 'px;dialogLeft:150px;dialogTop:50px;dialogWidth:' + dWidth + 'px;status:no;scroll:no');
    else
        res = window.open('../ImageAccounts/frmSignaturePhotoDialog.aspx?SessionID=' + fnGetSessionID() + "&Title=" + window.document.title + "&argArray=" + strDialogArgs, null, 'help=no,height=580px,width=700px,left=260px,status=no,scroll=no');
    return res;
}
function fnGetLocalDate(strDate) {
    var strNewDate = fnCheckNull(strDate);
    if (strNewDate.toString().indexOf("UTC") != -1)
        strNewDate = formatDateString(strDate);
    else if (strNewDate.toString().indexOf("GMT") != -1)
        strNewDate = formatDateString(strDate);
    return strNewDate;
}
function fnMaximize() {
    gE("popupContainer").style.visibility = 'visible';
    gE("popupFrame").style.visibility = 'visible';
    gE('maxImg').style.visibility = 'hidden';
}
function DateAdd(PeriodType, Terms, dateObj) {
    // To Add Days,month,year to the given date
    // Fn will add the specified terms to the given date and return the new Date
    var newDate;
    switch (PeriodType) {
        case "M": newDate = new Date(dateObj.getFullYear(), dateObj.getMonth() + Terms, dateObj.getDate()); break;
        case "Q": newDate = new Date(dateObj.getFullYear(), dateObj.getMonth() + 3, dateObj.getDate() + Terms); break;
        case "H": newDate = new Date(dateObj.getFullYear(), dateObj.getMonth() + 6, dateObj.getDate() + Terms); break;
        case "Y": newDate = new Date(dateObj.getFullYear() + Terms, dateObj.getMonth(), dateObj.getDate()); break;
        case "D": newDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + Terms); break;
        case "W": newDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + (7 * Terms)); break;
    }
    return newDate;
}
function fnSetFocusOnEOF() {
    // To set the focus to Edit button if it is enabled, when EOF or BOF is reached.
    if (gE("btnEdit").disabled == false)
        fnSetFocus("btnEdit");
    else if (gE("btnCancel").disabled == false)
        fnSetFocus("btnCancel");
}
function txtOurBranchID_KeyDown(oEdit, oNewText, oEvent) {
    BRtxtOurBranchID.setControlStatusToFalse();
    if (BRtxtOurBranchID.IDControl_ID.Element.disabled == false)
    if (oNewText == 113) {
        fnShowMsg(null, null, false);
        BRtxtOurBranchID.BrModule = "BranchID";
        BRtxtOurBranchID.F2KeyHelp();
        return false;
    }
}
function txtOurBranchID_GetDescription(oEdit, oNewText, oEvent) {
    //fnClearToNormal(BRtxtOurBranchID);
    if (BRtxtOurBranchID.getValue() == "") {
        BRtxtOurBranchID.setDescription();
        return false;
    }
    if (!BRtxtOurBranchID.checkValidControl()) {
        BRtxtOurBranchID.BranchID = fnTrim(BRtxtOurBranchID.getValue());
        BRtxtOurBranchID.ControlType = "BranchID";
        gE('lblMessage').innerHTML = "";
        var ret = BRtxtOurBranchID.GetDescription();
        if (gE('lblMessage').innerHTML != "") {
            fnSetErrorColor(BRtxtOurBranchID);
            BRtxtOurBranchID.setFocus();
            fnClearImage();
            return false;
        }
        if (!BRtxtOurBranchID.GetDescription() && fnTrim(oNewText) != "") {
            fnSetErrorColor(BRtxtOurBranchID);
            fnShowMsg('1501', 'red', false);
            BRtxtOurBranchID.setFocus();
            return;
        }
        else {
            fnShowMsg(null, null, false);
            BRtxtOurBranchID.IDControl_ID.Element.style.backgroundColor = "white";
        }
    }
}
/**********************************************************************************************************************************
    Function/Procedure  Name           :- header
    functionality                      :- To Open Print Window Dialog.
    created & written by               :- For Print Voucher
***********************************************************************************************************************************/
function PrintHeader1(sb, dtPrintFormat) {
    sb.append('<div style=" height:100%; width:100%; align="left" >');
    sb.append("<table  width='100%'  cellpadding='0' cellspacing='0' align='left' style='text-indent:5px;' >");
    sb.append("<tr width='100%'>");
    sb.append("</tr>");
    sb.append("<tr><td style='font-weight:bold;font-size:" + dtPrintFormat.Rows[2].Font + "' colspan=4 align='center'>" + dtPrintFormat.Rows[2].CItem + "</td>");
    sb.append("</tr>");
    sb.append("<tr><td colspan=4  align=" + dtPrintFormat.Rows[1].DItem + " valign='bottom'><img src=" + dtPrintFormat.Rows[0].DItem + " style='WIDTH: " + dtPrintFormat.Rows[0].Font + "; HEIGHT: " + dtPrintFormat.Rows[0].Space + "; valign='bottom' align=" + dtPrintFormat.Rows[1].DItem + "/></td></tr>");
}
function PrintHeader(sb) {
    sb.append('<div style=" height:100%; width:100%; align="left" >');
    sb.append("<table  width='100%'  cellpadding='0' cellspacing='0' align='left' style='text-indent:5px;' >");
    sb.append("<tr width='100%'>");
    sb.append("</tr>");
    sb.append("<tr><td colspan=4  align='left' valign='bottom'><img src='../Images/BankLogo.jpeg' style='WIDTH: 80px; HEIGHT: 60px;' valign='bottom' align='left'/></td></tr>");
}
function body(sb, dtPrintFormat, k) {
    if (dtPrintFormat.Rows[k].HItem != null) {
        if (fnCheckNull(dtPrintFormat.Rows[k].FItem))
            sb.append("<td style=text-decoration:underline;text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].FItem + "</td>");
        else
            sb.append("<tr><td valign='top'><hr /></td> </tr> ");
    }
    sb.append("<tr>");
    if (fnCheckNull(dtPrintFormat.Rows[k].Heading)) {
        if (fnCheckNull(dtPrintFormat.Rows[k].Heading1)) {
            if (fnCheckNull(dtPrintFormat.Rows[k].DItem1)) {
                var strSpace = 1;
                if (dtPrintFormat.Rows[k].SuffixMaxSpace != null || dtPrintFormat.Rows[k].SuffixMaxSpace != "")
                    strSpace = space(dtPrintFormat.Rows[k].SuffixMaxSpace);
                else strSpace = space(1);
                dtPrintFormat.Rows[k].DItem = dtPrintFormat.Rows[k].DItem == "" ? "" : dtPrintFormat.Rows[k].DItem;
                if (fnCheckNull(dtPrintFormat.Rows[k].Heading2)) {
                    dtPrintFormat.Rows[k].Heading1 = dtPrintFormat.Rows[k].Heading1 == "" ? "" : dtPrintFormat.Rows[k].Heading1;
                    var strSpace = space(dtPrintFormat.Rows[k].SuffixMaxSpace);
                    if (dtPrintFormat.Rows[k].UItem != null)
                        sb.append("<td style=text-decoration:underline;text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].DItem + strSpace + dtPrintFormat.Rows[k].Heading1 + dtPrintFormat.Rows[k].DItem1 + strSpace + dtPrintFormat.Rows[k].Heading2 + "</td>");
                    else sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].DItem + strSpace + dtPrintFormat.Rows[k].Heading1 + dtPrintFormat.Rows[k].DItem1 + strSpace + dtPrintFormat.Rows[k].Heading2 + "</td>");
                }
                else if (dtPrintFormat.Rows[k].DItem == "")
                    sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + strSpace + dtPrintFormat.Rows[k].Heading1 + dtPrintFormat.Rows[k].DItem1 + "</td>");
                else
                    sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].DItem + strSpace + dtPrintFormat.Rows[k].Heading1 + dtPrintFormat.Rows[k].DItem1 + "</td>");
            }
            else if (fnCheckNull(dtPrintFormat.Rows[k].Heading2)) {
                dtPrintFormat.Rows[k].Heading1 = dtPrintFormat.Rows[k].Heading1 == "" ? "" : dtPrintFormat.Rows[k].Heading1;
                var strSpace = space(dtPrintFormat.Rows[k].SuffixMaxSpace);
                if (dtPrintFormat.Rows[k].CItem != null)
                    sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].CItem + strSpace + dtPrintFormat.Rows[k].Heading1 + strSpace + dtPrintFormat.Rows[k].Heading2 + "</td>");
                else if (dtPrintFormat.Rows[k].DItem != null)
                    sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].DItem + strSpace + dtPrintFormat.Rows[k].Heading1 + strSpace + dtPrintFormat.Rows[k].Heading2 + "</td>");
                else
                    sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + strSpace + dtPrintFormat.Rows[k].Heading1 + strSpace + dtPrintFormat.Rows[k].Heading2 + "</td>");
                //sb.append("<td valign='bottom' style=text-indent:"+dtPrintFormat.Rows[k].space+";font-size:"+dtPrintFormat.Rows[k].Font+">"+ dtPrintFormat.Rows[k].Heading + strSpace + dtPrintFormat.Rows[k].Heading1 +strSpace + dtPrintFormat.Rows[k].Heading2 +"</td>");
            }
            else if (dtPrintFormat.Rows[k].DItem1 == null || dtPrintFormat.Rows[k].DItem1 == "") {
                dtPrintFormat.Rows[k].DItem = dtPrintFormat.Rows[k].DItem == "" ? "" : dtPrintFormat.Rows[k].DItem;
                dtPrintFormat.Rows[k].DItem1 = dtPrintFormat.Rows[k].DItem1 == "" ? "" : dtPrintFormat.Rows[k].DItem1;
                if (dtPrintFormat.Rows[k].SuffixMaxSpace != null)
                    var strSpace = space(dtPrintFormat.Rows[k].SuffixMaxSpace);
                if (dtPrintFormat.Rows[k].DItem1 == "" && dtPrintFormat.Rows[k].DItem == "")
                    sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + strSpace + dtPrintFormat.Rows[k].Heading1 + "</td>");
                else if (dtPrintFormat.Rows[k].DItem1 == "") {
                    if (dtPrintFormat.Rows[k].UItem != null)
                        sb.append("<td style=text-decoration:underline;text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].DItem + strSpace + dtPrintFormat.Rows[k].Heading1 + "</td>");
                    else sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].DItem + strSpace + dtPrintFormat.Rows[k].Heading1 + "</td>");
                }
                else
                    sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].DItem + strSpace + dtPrintFormat.Rows[k].Heading1 + dtPrintFormat.Rows[k].DItem1 + "</td>");
            }
        }
        else if (fnCheckNull(dtPrintFormat.Rows[k].DItem)) {
            dtPrintFormat.Rows[k].DItem1 = dtPrintFormat.Rows[k].DItem1 == "" ? "" : dtPrintFormat.Rows[k].DItem1;
            var strSpace = 1;
            if (dtPrintFormat.Rows[k].SuffixMaxSpace != null || dtPrintFormat.Rows[k].SuffixMaxSpace != "")
                strSpace = space(dtPrintFormat.Rows[k].SuffixMaxSpace);
            else strSpace = space(1);
            if (dtPrintFormat.Rows[k].DItem1 == "" || dtPrintFormat.Rows[k].DItem1 == null)
                sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + strSpace + dtPrintFormat.Rows[k].DItem + "</td>");
            else
                sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + strSpace + dtPrintFormat.Rows[k].DItem + strSpace + dtPrintFormat.Rows[k].DItem1 + "</td>");
        }
        else if (dtPrintFormat.Rows[k].CItem != null)
            sb.append("<td valign='bottom' style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].CItem + "</td>");
        else if (dtPrintFormat.Rows[k].FItem != null)
            sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].FItem + "</td>");
        else if (dtPrintFormat.Rows[k].Item != null)
            sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].Item + "</td>");
        else
            sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + "</td>");
    }
    else if (dtPrintFormat.Rows[k].HItem != null)
        sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].HItem + "</td>");
    else if (dtPrintFormat.Rows[k].CItem != null)
        sb.append("<td valign='bottom' style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].CItem + " </td>");
    else if (dtPrintFormat.Rows[k].FItem != null)
        sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].FItem + "</td>");
    else if (dtPrintFormat.Rows[k].Item != null)
        sb.append("<td style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Item + " </td>");
    else
        sb.append("<td style=padding-left:" + dtPrintFormat.Rows[k].space + "px;font-size:" + dtPrintFormat.Rows[k].Font + "px;height:5px></td>");
    sb.append("</tr>");

    //if(dtPrintFormat.Rows[k].DItem!=null)
    //sb.append("<td style=text-indent:"+dtPrintFormat.Rows[k].space+";font-size:"+dtPrintFormat.Rows[k].Font+">"+  dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].DItem+"</td>");
}
function Transbody(sb, dtPrintFormat, k, bold) {
    if (dtPrintFormat.Rows[k].HItem != null)
        sb.append("<tr><td colspan=5><hr /></td> </tr> ");
    sb.append("<tr>");
    if (dtPrintFormat.Rows[k].Heading != null) {
        if (dtPrintFormat.Rows[k].Heading1 != null) {
            if (dtPrintFormat.Rows[k].DItem1 != null) {
                dtPrintFormat.Rows[k].DItem = dtPrintFormat.Rows[k].DItem == "" ? "" : dtPrintFormat.Rows[k].DItem;
                sb.append("<td  colspan=5 style=text-indent:" + dtPrintFormat.Rows[k].space + "; font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].DItem + dtPrintFormat.Rows[k].Heading1 + dtPrintFormat.Rows[k].DItem1 + "</td>");
            }
            else if (dtPrintFormat.Rows[k].Heading2 != null) {
                if (dtPrintFormat.Rows[k].Heading3 != null) {

                    sb.append("<td style=text-indent:15;font-weight:bold; font-size:15;width:5%>" + dtPrintFormat.Rows[k].Heading + "</td>");
                    sb.append("<td style=text-indent:15;font-weight:bold; font-size:15;width:20%>" + dtPrintFormat.Rows[k].Heading1 + "</td>");
                    sb.append("<td style=text-indent:15;font-weight:bold; font-size:15;width:35%>" + dtPrintFormat.Rows[k].Heading2 + "</td>");
                    sb.append("<td style=text-indent:15;font-weight:bold; font-size:15;width:40%>" + dtPrintFormat.Rows[k].Heading3 + "</td>");
                    sb.append("<td style=text-indent:15;font-weight:bold; font-size:15;width:40%>" + dtPrintFormat.Rows[k].Heading4 + "</td>");
                    //var strSpace= space(dtPrintFormat.Rows[k].SuffixMaxSpace);
                    //sb.append("<td style=text-indent:"+dtPrintFormat.Rows[k].space+";font-weight:"+bold+"; font-size:"+dtPrintFormat.Rows[k].Font+">"+ dtPrintFormat.Rows[k].Heading + strSpace + dtPrintFormat.Rows[k].Heading1 +strSpace + dtPrintFormat.Rows[k].Heading2 + strSpace + dtPrintFormat.Rows[k].Heading3 +"</td>");
                }
                else {
                    var strSpace = space(dtPrintFormat.Rows[k].SuffixMaxSpace);
                    if (dtPrintFormat.Rows[k].CItem != null)
                        sb.append("<td colspan=5 style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].CItem + strSpace + dtPrintFormat.Rows[k].Heading1 + strSpace + dtPrintFormat.Rows[k].Heading2 + "</td>");
                    else if (dtPrintFormat.Rows[k].DItem != null)
                        sb.append("<td colspan=5 style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].DItem + strSpace + dtPrintFormat.Rows[k].Heading1 + strSpace + dtPrintFormat.Rows[k].Heading2 + "</td>");
                    else
                        sb.append("<td colspan=5 style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + strSpace + dtPrintFormat.Rows[k].Heading1 + strSpace + dtPrintFormat.Rows[k].Heading2 + "</td>");
                }
            }
            else if (dtPrintFormat.Rows[k].CItem != null) {
                var strSpace = space(dtPrintFormat.Rows[k].SuffixMaxSpace);
                sb.append("<td colspan=5 style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].DItem + strSpace + dtPrintFormat.Rows[k].Heading1 + dtPrintFormat.Rows[k].CItem + "</td>");
            }
        }
        else if (dtPrintFormat.Rows[k].DItem != null)
            sb.append("<td colspan=5 style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].DItem + "</td>");
        else if (dtPrintFormat.Rows[k].CItem != null)
            sb.append("<td colspan=5 style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].CItem + "</td>");
        else if (dtPrintFormat.Rows[k].FItem != null)
            sb.append("<td colspan=5 style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].FItem + "</td>");
        else if (dtPrintFormat.Rows[k].Item != null)
            sb.append("<td colspan=5 style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + dtPrintFormat.Rows[k].Item + "</td>");
        else
            sb.append("<td colspan=5 style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Heading + "</td>");
    }
    else if (dtPrintFormat.Rows[k].HItem != null)
        sb.append("<td colspan=5 style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].HItem + "</td>");
    else if (dtPrintFormat.Rows[k].CItem != null)
        sb.append("<td colspan=5 style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].CItem + " </td>");
    else if (dtPrintFormat.Rows[k].FItem != null)
        sb.append("<td colspan=5 style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].FItem + "</td>");
    else if (dtPrintFormat.Rows[k].Item != null)
        sb.append("<td colspan=5 style=text-indent:" + dtPrintFormat.Rows[k].space + ";font-size:" + dtPrintFormat.Rows[k].Font + ">" + dtPrintFormat.Rows[k].Item + " </td>");
    else
        sb.append("<td colspan=5 style=padding-left:" + dtPrintFormat.Rows[k].space + "px;font-size:" + dtPrintFormat.Rows[k].Font + "px;height:5px></td>");
    sb.append("</tr>");
}

function fnDataFill(dtPrintFormat, strType, n) {
    var j = 1;
    for (var i = 0; i < dsTransactions.t_Transactions.Rows.length; i++) {
        if (dsTransactions.t_Transactions.Rows[i].TrxTypeID == strType) {
            dtPrintFormat.Rows[n].Heading = j;
            dtPrintFormat.Rows[n].Heading1 = dsTransactions.t_Transactions.Rows[i].AccountID;
            dtPrintFormat.Rows[n].Heading2 = dsTransactions.t_Transactions.Rows[i].AccountName.substring(0, 30).toUpperCase();
            dtPrintFormat.Rows[n].Heading3 = dsTransactions.t_Transactions.Rows[i].Narration;
            dtPrintFormat.Rows[n].Heading4 = fnGetNumRegVal(dsTransactions.t_Transactions.Rows[i].TrxAmount);
            Transbody(sb, dtPrintFormat, n, "normal");
            j++;
        }
    }
}

function Footer(sb) {
    sb.append("</table></div>");
    var content_vlue = sb.toString();
    var disp_setting = "toolbar=no,location=no,directories=no,menubar=no,";
    disp_setting += "scrollbars=yes,width=725, height=600, left=0, top=0,";
    var docprint = window.open("", "frmPrint", disp_setting);
    docprint.document.open();
    docprint.document.write('<html>');
    docprint.document.write('<body onLoad="self.print(false)"><center>');
    docprint.document.write(content_vlue);
    docprint.document.write('</center></body></html>');
    docprint.document.close();
    docprint.focus();
    return docprint;
}
function space(n) {
    var str = "";
    for (var k = 0; k < n; k++) {
        str = str + "&nbsp;";
    }
    return str;
}
function CommaFormatted(amount) {
    var delimiter = ","; // replace comma if desired
    var a = amount.split('.', 2);
    var d = a[1];
    if (d == null) d = "00";
    var i = parseInt(a[0]);
    if (isNaN(i)) { return ''; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    if (d.length < 1) { amount = n; }
    else { amount = n + '.' + d; }
    amount = minus + amount;
    return amount;
}
function toWords(s) {
    s = s.replace(/[\, ]/g, '');
    if (s != String(parseFloat(s)))
        return 'Not a Number';
    var x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 15) return 'Too Big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' '; i++; sk = 1;
            }
            else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' '; sk = 1;
            }
        }
        else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += 'Hundred '; sk = 1;
        } if ((x - i) % 3 == 1) { if (sk) str += th[(x - i - 1) / 3] + ' '; sk = 0; }
    } if (x != s.length) { var y = s.length; str += 'Point '; for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' '; } return str.replace(/\s+/g, ' ');
}

/*
Only for ESAF

var once = ['Zero', ' One', ' Two', ' Three', ' Four', ' Five', ' Six', ' Seven', ' Eight', ' Nine'];
var twos = ['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];
var tens = ['', 'Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety'];
function toWords(inputNumber) {

    inputNumber = inputNumber.replace(/[\, ]/g, '');
    if (inputNumber != String(parseFloat(inputNumber)))
        return 'Not a Number';
    var x = inputNumber.indexOf('.');
    if (x == -1) x = inputNumber.length;
    if (x > 15) return 'Too Big';

    var str = new String(inputNumber)
    var inputVal = str.split('.');
    var splt = inputVal[0].split("");
    var rev = splt.reverse();

    numLength = rev.length;
    var word = new Array();
    var j = 0;

    for (i = 0; i < numLength; i++) {
        switch (i) {

            case 0:
                if ((rev[i] == 0) || (rev[i + 1] == 1)) {
                    word[j] = '';
                }
                else {
                    word[j] = '' + once[rev[i]];
                }
                word[j] = word[j];
                break;

            case 1:
            case 4:
            case 6:
            case 8:
            case 11:
            case 13:
                if (rev[i] == 0) {
                    word[j] = '';
                }
                else if (rev[i] == 1) {
                    word[j] = twos[rev[i - 1]];
                }
                else {
                    word[j] = tens[rev[i]];
                };
                break;

            case 2:
            case 9:
            case 14:
                if (rev[i] == 0) {
                    word[j] = '';
                }
                else if ((rev[i - 1] == 0) || (rev[i - 2] == 0)) {
                    word[j] = once[rev[i]] + " Hundred ";
                }
                else {
                    word[j] = once[rev[i]] + " Hundred and";
                }
                break;

            case 3:
            case 10:
                if (rev[i] == 0 || rev[i + 1] == 1) {
                    word[j] = '';
                }
                else {
                    word[j] = once[rev[i]];
                }
                if ((rev[i + 1] != 0) || (rev[i] > 0)) {
                    word[j] = word[j] + " Thousand";
                }
                break;

            case 5:
            case 12:
                if ((rev[i] == 0) || (rev[i + 1] == 1)) {
                    word[j] = '';
                }
                else {
                    word[j] = once[rev[i]];
                }
                if (rev[i + 1] !== '0' || rev[i] > '0') {
                    word[j] = word[j] + " Lakh";
                }

                break;

            case 7:
                if ((rev[i] == 0) || (rev[i + 1] == 1)) {
                    word[j] = '';
                }
                else {
                    word[j] = once[rev[i]];
                }
                if (rev[i + 1] !== '0' || rev[i] > '0') {
                    word[j] = word[j] + " Crore";
                }
                break;

            default: break;
        }
        j++;
    }

    word.reverse();
    var finalOutput = '';
    for (i = 0; i < numLength; i++) {
        finalOutput = finalOutput + word[i];
    }

    if (inputVal.length > 1) {
        var decimalVal = inputVal[1].split('');
        finalOutput += ' Point ';
        for (var i = 0; i < decimalVal.length; i++)
            finalOutput += once[decimalVal[i]] + ' ';
    }
    return finalOutput.replace(/\s+/g, ' ');
}
*/

function fnConfirmPrinting(PrintWindow) {
    if (!BRDialog(1, "1102"))
        fnLogOff_NoClick('1102');
    else
        fnLogOff_YesClick('1102');
}

function FFormat(Format, DBdateVal) {
    try {
        var oCombo = igdrp_getComboById('WebGridDate');
        oCombo.editor.mask = Format.split(' ').join('/');
        oCombo.editor.info.ShortDatePattern = Format.split(' ').join('/');

        if (fnCheckDate(DBdateVal)) {
            var strDateVal = DBdateVal.toString();
            if (strDateVal.indexOf("UTC") != -1)
                oCombo.setValue(new Date(strDateVal));
            else if (strDateVal.indexOf("GMT") != -1)
                oCombo.setValue(new Date(strDateVal));
        }
        else {
            oCombo.setValue(null);
            oCombo.setNullDateLabel("");
            return oCombo.getNullDateLabel();
        }
        return oCombo.getText();
    }
    catch (e) {
    };
}
/**********************************************************************************************************************************
    Function/Procedure  Name           :- fnChkRemarkLength()
    functionality                      :- To restrict description length to 255 chars
    created & written by               :- VenkataSivaRamaKrishna .Movva
***********************************************************************************************************************************/
/* detcting browser version and changing BrCustomCombo style properties for IE7 version*/
function fnBRCustomComboSetUp() {
    var IE7 = ((document.all) && (navigator.appVersion.indexOf("MSIE 7.") != -1));
    if (IE7) {
        var objs = document.getElementById('divpage').getElementsByTagName('div');
        for (var i = 0; i < objs.length; i++) {
            if (objs[i].style.position == "static") {
                objs[i].style.position = "relative";
                objs[i].style.height = screen.availHeight - 150;
                objs[i].childNodes[0].height = "900px";
                objs[i].style.overflow = "auto";
            }
            if (objs[i].className == "BRComboStandard") {
                objs[i].className = "BRComboChanged";
                break;
            }
        }
    }
}
//This function is used to avoid posting of 2 Entries
//into Table when Save button is Clicked Twice
function fnChkbtnAlreadyClicked() {
    if (!btnStatus)
        btnStatus = true;
    else
        return false;
    return true;
}

function fnBtnDisable(Mode) {
    switch (Mode.toUpperCase()) {
        case "VIEW": fnDisableFields('btnView'); break;
        case "VIEWALL": fnDisableFields('btnViewAll'); break;
        case "ADD": fnDisableFields('btnAdd'); break;
        case "EDIT": fnDisableFields('btnEdit'); break;
        case "DELETE": fnDisableFields('btnDelete'); break;
        case "SAVE": fnDisableFields('btnSave'); break;
        case "WITHDRAW": fnDisableFields('btnWithdraw'); break;
        case "STOP": fnDisableFields('btnStop'); break;
        case "CLOSE": fnDisableFields('btnClose'); break;
        case "RESUME": fnDisableFields('btnResume'); break;
        case "DONE": fnDisableFields('btnDone'); break;
        case "GROUPDETAIL": fnDisableFields('btnGroupDetail'); break;
        case "APPROVE": fnDisableFields('btnApprove'); break;
        case "REJECT": fnDisableFields('btnReject'); break;
        case "RESIGN": fnDisableFields('btnResign'); break;
        case "SEARCH": fnDisableFields('btnSearch'); break;
        case "CONTINUE": fnDisableFields('btnContinue'); break;
        case "SELECT": fnDisableFields('btnSelect'); break;
        case "NEXT": fnDisableFields('btnNext'); break;
        case "GENERATE": fnDisableFields('btnGenerate'); break;
        case "PROCESS": fnDisableFields('btnProcess'); break;
        case "SUPERVISE": fnDisableFields('btnSupervise'); break;
        case "PROCEED": fnDisableFields('btnProceed'); break;
        case "SANCTION": fnDisableFields('btnSanction'); break;
        case "CHANGE": fnDisableFields('btnChange'); break;
        case "VERIFY": fnDisableFields('btnVerify'); break;
        case "ROLLBACK": fnDisableFields('btnRollBack'); break;
        case "BALANCE": fnDisableFields('btnBalance'); break;
    }
}

function fnBtnEnable(Mode) {
    switch (Mode.toUpperCase()) {
        case "VIEW": fnEnableFields('btnView');
            fnSetFocus("btnView");
            break;
        case "VIEWALL": fnEnableFields('btnViewAll');
            fnSetFocus("btnViewAll");
            break;
        case "ADD": fnEnableFields('btnAdd');
            fnSetFocus("btnAdd");
            break;
        case "EDIT": fnEnableFields('btnEdit');
            fnSetFocus("btnEdit");
            break;
        case "DELETE": fnEnableFields('btnDelete');
            fnSetFocus("btnDelete");
            break;
        case "SAVE": fnEnableFields('btnSave');
            fnSetFocus("btnSave");
            break;
        case "WITHDRAW": fnEnableFields('btnWithdraw');
            fnSetFocus("btnWithdraw");
            break;
        case "STOP": fnEnableFields('btnStop');
            fnSetFocus("btnStop");
            break;
        case "CLOSE": fnEnableFields('btnClose');
            fnSetFocus("btnClose");
            break;
        case "RESUME": fnEnableFields('btnResume');
            fnSetFocus("btnResume");
            break;
        case "SANCTION": fnEnableFields('btnSanction');
            fnSetFocus("btnSanction");
            break;
        case "REJECT": fnEnableFields('btnReject');
            fnSetFocus("btnReject");
            break;
        case "GROUPDETAIL": fnEnableFields('btnGroupDetail');
            fnSetFocus("btnGroupDetail");
            break;
        case "DONE": fnEnableFields('btnDone');
            fnSetFocus("btnDone");
            break;
        case "APPROVE": fnEnableFields('btnApprove');
            fnSetFocus("btnApprove");
            break;
        case "RESIGN": fnEnableFields('btnResign');
            fnSetFocus("btnResign");
            break;
        case "SEARCH": fnEnableFields('btnSearch');
            fnSetFocus("btnSearch");
            break;
        case "CONTINUE": fnEnableFields('btnContinue');
            fnSetFocus("btnContinue");
            break;
        case "SELECT": fnEnableFields('btnSelect');
            fnSetFocus("btnSelect");
            break;
        case "NEXT": fnEnableFields('btnNext');
            fnSetFocus("btnNext");
            break;
        case "CHANGE": fnEnableFields('btnChange');
            fnSetFocus("btnChange");
            break;
        case "GENERATE": fnEnableFields('btnGenerate');
            fnSetFocus("btnGenerate");
            break;
        case "PROCESS": fnEnableFields('btnProcess');
            fnSetFocus("btnProcess");
            break;
        case "SUPERVISE": fnEnableFields('btnSupervise');
            fnSetFocus("btnSupervise");
            break;
        case "PROCEED": fnEnableFields('btnProceed');
            fnSetFocus("btnProceed");
            break;
        case "VERIFY": fnEnableFields('btnVerify');
            fnSetFocus("btnVerify");
            break;
        case "ROLLBACK": fnEnableFields('btnRollBack');
            fnSetFocus("btnRollBack");
            break;
        case "BALANCE": fnEnableFields('btnBalance');
            fnSetFocus("btnBalance");
            break;
        case "CONVERTTOPROSPECT": fnEnableFields('btnConverttoProspect');
            fnSetFocus("btnConverttoProspect");
            break;
    }
}
/*
function setHeight(div) {
    if (document.all) {
        if (navigator.appVersion.indexOf("MSIE") != -1) {
            if (navigator.appVersion.indexOf("MSIE 7.0") != -1)
                document.getElementById(div).style.height = window.screen.height - 140 + "px";
            else
                document.getElementById(div).style.height = window.screen.height - 195 + "px";
        }
        else
            document.getElementById(div).style.height = "100%";
    }
    else
        document.getElementById(div).style.height = window.screen.height - 172 + "px";
}
*/
/**********************************************************************************************************************************
    Function/Procedure  Name           :- setHeight()
    functionality                      :- To Set Height of the MainDiv based on browser and system Resolution and Should Called in all Modules pageload function.
    created & written by               :-
***********************************************************************************************************************************/
/* detcting browser version and changing Height of the Master Page based on resolution
 If window.screen.height = 1024 For Resolution 1280px X 1024px
*/
function setHeight(div) {
    if (document.all) {
        if (navigator.appVersion.indexOf("MSIE") != -1) {
            //IE Browser In Compatibility View
            if (navigator.appVersion.indexOf("MSIE 7.0") != -1 || navigator.appVersion.indexOf("MSIE 8.0") != -1) {
                if (window.screen.height == 1024)
                    document.getElementById(div).style.height = window.screen.height - 212 + "px";
                else
                    document.getElementById(div).style.height = window.screen.height - 140 + "px";
            }
            else {
                //IE Browser version 10
                if (navigator.appVersion.indexOf("MSIE 10.0") != -1) {
                    if (div == 'tid1') {
                        if (window.screen.height == 1024) {/*For Resolution 1280x1024 */
                            document.getElementById(div).style.height = window.screen.height - 178 + "px";//212
                            document.getElementById(div).style.backgroundSize = "2048px 1024px";
                        }
                        else
                            document.getElementById(div).style.height = window.screen.height - 184 + "px";/*For Other Resolutions*/
                        document.getElementById(div).style.backgroundSize = "2400px 800px";
                    }
                    else {
                        if (window.screen.height == 1024)
                            document.getElementById(div).style.height = window.screen.height - 212 + "px";
                        else
                            document.getElementById(div).style.height = window.screen.height - 195 + "px";
                    }
                }
                    //IE Browser version 9
                else {
                    if (div == 'tid1') {
                        if (window.screen.height == 1024) {/*For Resolution 1280x1024 */
                            document.getElementById(div).style.height = window.screen.height - 194 + "px";//212
                            document.getElementById(div).style.backgroundSize = "2048px 1024px";
                        }
                        else
                            document.getElementById(div).style.height = window.screen.height - 178 + "px";/*For Other Resolutions*///184
                        document.getElementById(div).style.backgroundSize = "2400px 800px";
                    }
                    else {
                        if (window.screen.height == 1024)
                            document.getElementById(div).style.height = window.screen.height - 212 + "px";
                        else
                            document.getElementById(div).style.height = window.screen.height - 185 + "px";//195
                    }

                }
            }
        }
        else
            document.getElementById(div).style.height = "100%";
    }
    else if (!!navigator.userAgent.match(/Trident\/7\./)) {
        //IE Browser version 11
        if (div == 'tid1') {
            if (window.screen.height == 1024) {
                document.getElementById(div).style.height = window.screen.height - 124 + "px";//212
                document.getElementById(div).style.backgroundSize = "2048px 1024px";
            }
            else {
                document.getElementById(div).style.height = window.screen.height - 185 + "px";//174
                document.getElementById(div).style.backgroundSize = "2400px 800px";
            }
        }
        else {
            if (window.screen.height == 1024)
                document.getElementById(div).style.height = window.screen.height - 187 + "px";
            else
                document.getElementById(div).style.height = window.screen.height - 185 + "px";//178
        }
    }
    else {
        if (brsType.toUpperCase() == "GODZILLA") {
            if (div == 'tid1') {
                if (window.screen.height == 1024) {
                    document.getElementById(div).style.height = window.screen.height - 179 + "px";//mozilla
                    document.getElementById(div).style.backgroundSize = "2048px 1024px";
                }
                else
                    {
                    document.getElementById(div).style.height = window.screen.height - 155 + "px";//155
                    document.getElementById(div).style.backgroundSize = "2400px 800px";
                }
            }
            else {
                if (window.screen.height == 1024)
                    document.getElementById(div).style.height = window.screen.height - 179 + "px";//mozilla
                else
                    document.getElementById(div).style.height = window.screen.height - 148 + "px";//157
            }
        }
        else {
            if (div == 'tid1') {//for Chrome
                if (window.screen.height == 1024) {
                    document.getElementById(div).style.height = window.screen.height - 169 + "px";//Chrome
                    document.getElementById(div).style.backgroundSize = "2048px 1024px";
                }
                else
                {
                    var pert = window.screen.availHeight == 738 ? 81.77 : 80.6
                    document.getElementById(div).style.height = (((window.screen.height) * (pert)) / 100).toFixed(0) + "px";// window.screen.height - 140 + ;//155
                    //document.getElementById(div).style.height = window.screen.height - 140 + "px";//155
                    document.getElementById(div).style.backgroundSize = "2400px 800px";
                }   
            }
            else {
                if (window.screen.height == 1024)
                    document.getElementById(div).style.height = window.screen.height - 171 + "px";//Chrome
                else
                {
                    var pert = window.screen.availHeight == 738 ? 81.77 : 80.6
                    document.getElementById(div).style.height = (((window.screen.height) * (pert)) / 100).toFixed(0) + "px";// window.screen.height - 140 + ;//155
                }   
                //document.getElementById(div).style.height = window.screen.height - 140 + "px";//155
            }
        }
    }
}
function setHeightOpt(div) {
    if (document.all) {
        if (navigator.appVersion.indexOf("MSIE 10.0") != -1) {
            if (window.screen.height == 1024)/*  IE 10  */
                document.getElementById(div).style.height = window.screen.height - 234 + "px";
            else
                document.getElementById(div).style.height = window.screen.height - 128 + "px";
        }
        else if (navigator.appVersion.indexOf("MSIE 9.0") != -1) {
            if (window.screen.height == 1024)/*  IE 9  */
                document.getElementById(div).style.height = window.screen.height - 244 + "px";
            else
                document.getElementById(div).style.height = window.screen.height - 123 + "px";
        }
        else if (navigator.appVersion.indexOf("MSIE") != -1) {
            if (window.screen.height == 1024)/*  IE 7,8  */
                document.getElementById(div).style.height = window.screen.height - 244 + "px";
            else
                document.getElementById(div).style.height = window.screen.height - 128 + "px";
        }
        else
            document.getElementById(div).style.height = "100%";
    }
    else if (!!navigator.userAgent.match(/Trident\/7\./)) {
        if (window.screen.height == 1024) /*  IE 11  */
            document.getElementById(div).style.height = window.screen.height - 259 + "px";//394//785
        else
            document.getElementById(div).style.height = window.screen.height - 200 + "px";//255
    }
    else if (brsType.toUpperCase() == "GODZILLA") {
        {
            if (window.screen.height == 1024)//Mozilla
                document.getElementById(div).style.height = window.screen.height - 259 + "px";
            else
                document.getElementById(div).style.height = window.screen.height - 200 + "px";//
        }
    }
    else {
        if (window.screen.height == 1024)//Chrome
            document.getElementById(div).style.height = window.screen.height - 224 + "px";
        else
            document.getElementById(div).style.height = window.screen.height - 128 + "px";//
    }
}

function getWinSize() {
    if (window.innerWidth != undefined) {
        return window.innerHeight;
    }
    else {
        var B = document.body,
        D = document.documentElement;
        return Math.max(D.clientHeight, B.clientHeigh);
    }
}

function setHeightSearchForm(div) {
    if (document.all) {
        if (navigator.appVersion.indexOf("MSIE") != -1) {
            if (navigator.appVersion.indexOf("MSIE 9.0") != -1 || navigator.appVersion.indexOf("MSIE 10.0") != -1) {
                //for 1280x1024 Resolution
                if (window.screen.height == 1024) {
                    document.getElementById(div).style.height = window.screen.height - 179 + "px";
                } else {
                    document.getElementById(div).style.height = window.screen.height - 117 + "px";
                }
            }
            else
                document.getElementById(div).style.height = window.screen.height - 117 + "px";
        }
        else
            document.getElementById(div).style.height = "100%";
    }
    else
    {
        if (window.screen.height == 1024)//for 1280x1024 Resolution
            document.getElementById(div).style.height = window.screen.height - 179 + "px";
        else
            document.getElementById(div).style.height = window.screen.height - 120 + "px";
    }
}
function getWinSize() {
    if (window.innerWidth != undefined) {
        return window.innerHeight;
    }
    else {
        var B = document.body,
        D = document.documentElement;
        return  Math.max(D.clientHeight, B.clientHeigh);
    }
}
function fnRegExpCheck(strval) {
    if (strval.indexOf('<') != -1 || strval.indexOf('>') != -1 || strval.indexOf('@') != -1 || strval.indexOf('/') != -1)
        return false;
    return true;
}

function FirstNameKeyPress(oEdit, keyCode, oEvent, obj) {
    if (keyCode >= 97 && keyCode < 123) {
        oEvent.keyCode = keyCode - 32;
        gE('txtFirstName').value += oEvent.keyCode;
    }
    else if ((keyCode >= 65 && keyCode < 91) || (keyCode == 32))
        gE('txtFirstName').value += oEvent.keyCode;
    else
        oEvent.cancel = true;
}
function MiddleNameKeyPress(oEdit, keyCode, oEvent, obj) {
    if (keyCode >= 97 && keyCode < 123) {
        oEvent.keyCode = keyCode - 32;
        gE('txtMiddleName').value += oEvent.keyCode;
    }
    else if ((keyCode >= 65 && keyCode < 91) || (keyCode == 32))
        gE('txtMiddleName').value += oEvent.keyCode;
    else
        oEvent.cancel = true;
}
function LastNameKeyPress(oEdit, keyCode, oEvent, obj) {
    if (keyCode >= 97 && keyCode < 123) {
        oEvent.keyCode = keyCode - 32;
        gE('txtLastName').value += oEvent.keyCode;
    }
    else if ((keyCode >= 65 && keyCode < 91) || (keyCode == 32))
        gE('txtLastName').value += oEvent.keyCode;
    else
        oEvent.cancel = true;
}

function BRDialogForward(iDialogCode, errorCode, appno, stage) {
    if (iDialogCode == 4) // For supervision Remarks , Add then Delete Remarks not required
    {
        if (fnGetValue("_IsSVDialog").toUpperCase() == 'TRUE') {
            return '';
        }
        else {
            if (parseInt(fnGetValue("hdnEventID")) == 2) {
                if (requestedMode == "DELETE") {
                    requestedMode = null;
                    return '';
                }
            }
        }
    }
    var strDialogArgs = new Array();
    if (arguments.length != 0) {
        strDialogArgs[0] = iDialogCode;
        if (strDialogArgs[0] < 5) {
            if (arguments.length == 1) {
                strDialogArgs[1] = "";
            }
            else if (arguments.length >= 2) {
                strDialogArgs[1] = "Error Code is Not Registered";
                if (INIGetMessageById(errorCode)) {
                    errorMsg = INIGetMessageById(errorCode);
                    errorMsg = errorMsg.replace("#AppNo#", appno).replace("#stage#", stage);
                    for (var i = 2; i < (arguments.length) ; i++) {
                        var regex = new RegExp("/{" + (i - 2) + "/}");
                        for (j = 0; j < 4; j++) {
                            regex = regex.toString().replace('/', '');
                        }
                        errorMsg = errorMsg.replace(regex, arguments[i]);
                    }
                    strDialogArgs[1] = errorMsg;
                }

                else if (GetMessageById(errorCode)) {
                    errorMsg = GetMessageById(errorCode);
                    errorMsg = errorMsg.replace("#AppNo#", appno).replace("#stage#", stage);
                    for (var i = 2; i < (arguments.length) ; i++) {
                        var regex = new RegExp("/{" + (i - 2) + "/}");
                        for (j = 0; j < 4; j++) {
                            regex = regex.toString().replace('/', '');
                        }
                        if (document.all)
                            errorMsg = errorMsg.replace(regex, arguments[i]);
                        else
                            errorMsg = errorMsg.replace(regex.replace('\\', '').replace('\\', ''), arguments[i]);

                    }
                    strDialogArgs[1] = errorMsg;
                }

                else {
                    strDialogArgs[0] = 3;
                }
            }
        }
        else {
            //errorMsg=errorMsg.replace("#AppNo#", appno).replace("#stage#",stage);
            strDialogArgs[1] = errorCode;
        }

        var errorMsgWidth = strDialogArgs[1].toString().length;
        var dHeight = 145;
        var dWidth;
        if (errorMsgWidth <= 22) {
            if (strDialogArgs[0] == 4) {
                dWidth = 355;
                dHeight = 165;
            }
            else if (strDialogArgs[0] == 5) {
                dWidth = 415;
                dHeight = 165;
            }
            else {
                dWidth = 265;
                dHeight = 135;
            }
        }
        else if (errorMsgWidth > 22 && errorMsgWidth <= 44) {
            dWidth = 165 + (6 * 8) + (6 * (errorMsgWidth - 22));
            dHeight = 135;
        }
        else if (errorMsgWidth > 44 && errorMsgWidth <= 68) {
            dWidth = 165 + (6 * 32) + (6 * (errorMsgWidth - 44));
        }
        else if (errorMsgWidth > 68) {
            dHeight = 135 + ((errorMsgWidth / 68) * 12);
            dWidth = 165 + (6 * 56);
        }
        strDialogArgs[2] = dWidth;
        strDialogArgs[3] = dHeight;
        //Dinesh [added and updated]
        var Top = screen.height / 3 - dHeight / 2 + 50;
        var Left = screen.width / 2 - dWidth / 2;
        //var res = window.showModalDialog(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'help:no;dialogHeight:' + dHeight + 'px;dialogWidth:' + (dWidth + 50) + 'px;dialogTop:' + Top + ';dialogLeft:' + Left + ';status:no;scroll:no;resizable:0;');
        //        openModal(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID='+fnGetSessionID());
        //   In supervision popup  if we clieck cancel we have to send res value as null
        if (fnCheckNull(resdiag) != "" && !window.showModalDialog) {
            BRDialogClose();
        }
        if (brsType != 'Chrome') {
            resdiag = window.showModalDialog(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'help:no;dialogHeight:' + dHeight + 'px;dialogWidth:' + (dWidth + 50) + 'px;dialogTop:' + Top + ';dialogLeft:' + Left + ';status:no;scroll:no;resizable:0;');
            return resdiag;
        }
            //        openModal(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID='+fnGetSessionID());
            //   In supervision popup  if we clieck cancel we have to send res value as null
        else {
            strDialogArgs = strDialogArgs.join('*');
            resdiag = window.open(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'WebDialogPop1", height=' + dHeight + ',width=' + (dWidth + 50) + ',left=' + Left + ',top=' + Top + ',help=no,scrollbars=no,status=no,resizable=0,alwaysLowered=no,z-lock=no;');

            //resdiag = window.open(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs,   'height=' + dHeight + ',width='+ (dWidth + 50) + ',left='+ Left +',top='+ Top +',help=no,scrollbars=no,status=no,resizable=yes,alwaysLowered=no,z-lock=no');
            //return resdiag;
        }

    }
}

function BRDialogQuestion(iDialogCode, errorCode, QuestionID, Answer) {

    if (iDialogCode == 4) // For supervision Remarks , Add then Delete Remarks not required
    {
        if (fnGetValue("_IsSVDialog").toUpperCase() == 'TRUE') {
            return '';
        }
        else {
            if (parseInt(fnGetValue("hdnEventID")) == 2) {
                if (requestedMode == "DELETE") {
                    requestedMode = null;
                    return '';
                }
            }
        }
    }
    var strDialogArgs = new Array();
    if (arguments.length != 0) {
        strDialogArgs[0] = iDialogCode;
        if (strDialogArgs[0] < 5) {
            if (arguments.length == 1) {
                strDialogArgs[1] = "";
            }
            else if (arguments.length >= 2) {
                strDialogArgs[1] = "Error Code is Not Registered";
                if (INIGetMessageById(errorCode)) {
                    errorMsg = INIGetMessageById(errorCode);
                    errorMsg = errorMsg.replace("#Question#", QuestionID).replace("#Answer#", Answer);
                    for (var i = 2; i < (arguments.length) ; i++) {
                        var regex = new RegExp("/{" + (i - 2) + "/}");
                        for (j = 0; j < 4; j++) {
                            regex = regex.toString().replace('/', '');
                        }
                        errorMsg = errorMsg.replace(regex, arguments[i]);
                    }
                    strDialogArgs[1] = errorMsg;
                }

                else if (GetMessageById(errorCode)) {
                    errorMsg = GetMessageById(errorCode);
                    errorMsg = errorMsg.replace("#Question#", QuestionID).replace("#Answer#", Answer);
                    for (var i = 2; i < (arguments.length) ; i++) {
                        var regex = new RegExp("/{" + (i - 2) + "/}");
                        for (j = 0; j < 4; j++) {
                            regex = regex.toString().replace('/', '');
                        }
                        if (document.all)
                            errorMsg = errorMsg.replace(regex, arguments[i]);
                        else
                            errorMsg = errorMsg.replace(regex.replace('\\', '').replace('\\', ''), arguments[i]);

                    }
                    strDialogArgs[1] = errorMsg;
                }

                else {
                    strDialogArgs[0] = 3;
                }
            }
        }
        else {
            strDialogArgs[1] = errorCode;
        }

        var errorMsgWidth = strDialogArgs[1].toString().length;
        var dHeight = 145;
        var dWidth;
        if (errorMsgWidth <= 22) {
            if (strDialogArgs[0] == 4) {
                dWidth = 355;
                dHeight = 165;
            }
            else if (strDialogArgs[0] == 5) {
                dWidth = 415;
                dHeight = 165;
            }
            else {
                dWidth = 265;
                dHeight = 135;
            }
        }
        else if (errorMsgWidth > 22 && errorMsgWidth <= 44) {
            dWidth = 165 + (6 * 8) + (6 * (errorMsgWidth - 22));
            dHeight = 135;
        }
        else if (errorMsgWidth > 44 && errorMsgWidth <= 68) {
            dWidth = 165 + (6 * 32) + (6 * (errorMsgWidth - 44));
        }
        else if (errorMsgWidth > 68) {
            dHeight = 135 + ((errorMsgWidth / 68) * 12);
            dWidth = 165 + (6 * 56);
        }
        strDialogArgs[2] = dWidth;
        strDialogArgs[3] = dHeight;
        //Dinesh [added and updated]
        var Top = screen.height / 3 - dHeight / 2 + 50;
        var Left = screen.width / 2 - dWidth / 2;
        //var res = window.showModalDialog(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'help:no;dialogHeight:' + dHeight + 'px;dialogWidth:' + (dWidth + 50) + 'px;dialogTop:' + Top + ';dialogLeft:' + Left + ';status:no;scroll:no;resizable:0;');
        //        openModal(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID='+fnGetSessionID());
        //   In supervision popup  if we clieck cancel we have to send res value as null
        if (fnCheckNull(resdiag) != "" && !window.showModalDialog) {
            BRDialogClose();
        }
        if (brsType != 'Chrome') {
            resdiag = window.showModalDialog(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'help:no;dialogHeight:' + dHeight + 'px;dialogWidth:' + (dWidth + 50) + 'px;dialogTop:' + Top + ';dialogLeft:' + Left + ';status:no;scroll:no;resizable:0;');
            return resdiag;
        }
            //        openModal(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID='+fnGetSessionID());
            //   In supervision popup  if we clieck cancel we have to send res value as null
        else {
            strDialogArgs = strDialogArgs.join('*');
            resdiag = window.open(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'WebDialogPop2", "height=' + dHeight + ',width=' + (dWidth + 50) + ',left=10,top=10,help=no,scrollbars=no,status=no,resizable=yes,alwaysLowered=no,z-lock=no;');

            //resdiag = window.open(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs,   'height=' + dHeight + ',width='+ (dWidth + 50) + ',left='+ Left +',top='+ Top +',help=no,scrollbars=no,status=no,resizable=yes,alwaysLowered=no,z-lock=no');
            //return resdiag;
        }
        //        var res = window.showModalDialog(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'help:no;dialogHeight:' + dHeight + 'px;dialogWidth:' + (dWidth + 50) + 'px;dialogTop:' + Top + ';dialogLeft:' + Left + ';status:no;scroll:no;resizable:0;');
        //        //        openModal(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID='+fnGetSessionID());
        //        //   In supervision popup  if we clieck cancel we have to send res value as null

        //        return res;
    }
}
function BRDialogAudit(iDialogCode, errorCode, Audit) {

    if (iDialogCode == 4) // For supervision Remarks , Add then Delete Remarks not required
    {
        if (fnGetValue("_IsSVDialog").toUpperCase() == 'TRUE') {
            return '';
        }
        else {
            if (parseInt(fnGetValue("hdnEventID")) == 2) {
                if (requestedMode == "DELETE") {
                    requestedMode = null;
                    return '';
                }
            }
        }
    }
    var strDialogArgs = new Array();
    if (arguments.length != 0) {
        strDialogArgs[0] = iDialogCode;
        if (strDialogArgs[0] < 5) {
            if (arguments.length == 1) {
                strDialogArgs[1] = "";
            }
            else if (arguments.length >= 2) {
                strDialogArgs[1] = "Error Code is Not Registered";
                if (INIGetMessageById(errorCode)) {
                    errorMsg = INIGetMessageById(errorCode);
                    errorMsg = errorMsg.replace("#Audit#", Audit);
                    for (var i = 2; i < (arguments.length) ; i++) {
                        var regex = new RegExp("/{" + (i - 2) + "/}");
                        for (j = 0; j < 4; j++) {
                            regex = regex.toString().replace('/', '');
                        }
                        errorMsg = errorMsg.replace(regex, arguments[i]);
                    }
                    strDialogArgs[1] = errorMsg;
                }

                else if (GetMessageById(errorCode)) {
                    errorMsg = GetMessageById(errorCode);
                    errorMsg = errorMsg.replace("#Audit#", Audit);
                    for (var i = 2; i < (arguments.length) ; i++) {
                        var regex = new RegExp("/{" + (i - 2) + "/}");
                        for (j = 0; j < 4; j++) {
                            regex = regex.toString().replace('/', '');
                        }
                        if (document.all)
                            errorMsg = errorMsg.replace(regex, arguments[i]);
                        else
                            errorMsg = errorMsg.replace(regex.replace('\\', '').replace('\\', ''), arguments[i]);

                    }
                    strDialogArgs[1] = errorMsg;
                }

                else {
                    strDialogArgs[0] = 3;
                }
            }
        }
        else {
            strDialogArgs[1] = errorCode;
        }

        var errorMsgWidth = strDialogArgs[1].toString().length;
        var dHeight = 145;
        var dWidth;
        if (errorMsgWidth <= 22) {
            if (strDialogArgs[0] == 4) {
                dWidth = 355;
                dHeight = 165;
            }
            else if (strDialogArgs[0] == 5) {
                dWidth = 415;
                dHeight = 165;
            }
            else {
                dWidth = 265;
                dHeight = 135;
            }
        }
        else if (errorMsgWidth > 22 && errorMsgWidth <= 44) {
            dWidth = 165 + (6 * 8) + (6 * (errorMsgWidth - 22));
            dHeight = 135;
        }
        else if (errorMsgWidth > 44 && errorMsgWidth <= 68) {
            dWidth = 165 + (6 * 32) + (6 * (errorMsgWidth - 44));
        }
        else if (errorMsgWidth > 68) {
            dHeight = 135 + ((errorMsgWidth / 68) * 12);
            dWidth = 165 + (6 * 56);
        }
        strDialogArgs[2] = dWidth;
        strDialogArgs[3] = dHeight;
        //Dinesh [added and updated]
        var Top = screen.height / 3 - dHeight / 2 + 50;
        var Left = screen.width / 2 - dWidth / 2;
        //var res = window.showModalDialog(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'help:no;dialogHeight:' + dHeight + 'px;dialogWidth:' + (dWidth + 50) + 'px;dialogTop:' + Top + ';dialogLeft:' + Left + ';status:no;scroll:no;resizable:0;');
        //        openModal(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID='+fnGetSessionID());
        //   In supervision popup  if we clieck cancel we have to send res value as null
        if (fnCheckNull(resdiag) != "" && !window.showModalDialog) {
            BRDialogClose();
        }
        if (brsType != 'Chrome') {
            resdiag = window.showModalDialog(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'help:no;dialogHeight:' + dHeight + 'px;dialogWidth:' + (dWidth + 50) + 'px;dialogTop:' + Top + ';dialogLeft:' + Left + ';status:no;scroll:no;resizable:0;');
            return resdiag;
        }
            //        openModal(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID='+fnGetSessionID());
            //   In supervision popup  if we clieck cancel we have to send res value as null
        else {
            strDialogArgs = strDialogArgs.join('*');
            resdiag = window.open(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'WebDialogPop3", "height=' + dHeight + ',width=' + (dWidth + 50) + ',left=10,top=10,help=no,scrollbars=no,status=no,resizable=yes,alwaysLowered=no,z-lock=no;');

            // resdiag = window.open(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs,   'height=' + dHeight + ',width='+ (dWidth + 50) + ',left='+ Left +',top='+ Top +',help=no,scrollbars=no,status=no,resizable=yes,alwaysLowered=no,z-lock=no');
            //return resdiag;
        }
        //        var res = window.showModalDialog(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID=' + fnGetSessionID(), strDialogArgs, 'help:no;dialogHeight:' + dHeight + 'px;dialogWidth:' + (dWidth + 50) + 'px;dialogTop:' + Top + ';dialogLeft:' + Left + ';status:no;scroll:no;resizable:0;');
        //        //        openModal(fnCheckNull(parentPage) + '../General/WebDialog.aspx?SessionID='+fnGetSessionID());
        //        //   In supervision popup  if we clieck cancel we have to send res value as null

        //        return res;
    }
}

function fnOnChangeBranch() {
    var isValid = SessionValidator.ValidateSession(fnGetSessionID());
    if (!isValid) {
        return false;
    }

    strDialog = null;
    if (brsType != 'Chrome') {
        if (brsType != "godzilla") {
            if (window.screen.height == 1024)
                strDialog = window.showModalDialog("frmChangeBranch.aspx?DynamicLoad='true'&SessionID=" + fnGetSessionID() + "&ClikModuleID=7900&Title=Change Branch", "Title", "dialogHeight:150px;dialogWidth:500px;help:no;scroll:yes;resizable:yes;status:no");
            else if (window.screen.height == 808 || window.screen.height == 768)
                strDialog = window.showModalDialog("frmChangeBranch.aspx?DynamicLoad='true'&SessionID=" + fnGetSessionID() + "&ClikModuleID=7900&Title=Change Branch", "Title", "dialogHeight:170px;dialogWidth:500px;help:no;scroll:yes;resizable:yes;status:no");
            else
                strDialog = window.showModalDialog("frmChangeBranch.aspx?DynamicLoad='true'&SessionID=" + fnGetSessionID() + "&ClikModuleID=7900&Title=Change Branch", "Title", "dialogHeight:100px;dialogWidth:500px;help:no;scroll:yes;resizable:yes;status:no");
        }
        else if (!!navigator.userAgent.match(/Trident\/7\./)) {
            if (window.screen.height == 1024)
                strDialog = window.showModalDialog("frmChangeBranch.aspx?DynamicLoad='true'&SessionID=" + fnGetSessionID() + "&ClikModuleID=7900&Title=Change Branch", "Title", "dialogHeight:150px;dialogWidth:500px;help:no;scroll:yes;resizable:yes;status:no");
            else
                strDialog = window.showModalDialog("frmChangeBranch.aspx?DynamicLoad='true'&SessionID=" + fnGetSessionID() + "&ClikModuleID=7900&Title=Change Branch", "Title", "dialogHeight:100px;dialogWidth:500px;help:no;scroll:yes;resizable:yes;status:no");
        }
        else {
            if (window.screen.height == 1024)
                strDialog = window.showModalDialog("frmChangeBranch.aspx?DynamicLoad='true'&SessionID=" + fnGetSessionID() + "&ClikModuleID=7900&Title=Change Branch", "Title", "dialogHeight:150px;dialogWidth:500px;help:no;scroll:yes;resizable:yes;status:no");
            else
                strDialog = window.showModalDialog("frmChangeBranch.aspx?DynamicLoad='true'&SessionID=" + fnGetSessionID() + "&ClikModuleID=7900&Title=Change Branch", "Title", "dialogHeight:100px;dialogWidth:500px;help:no;scroll:yes;resizable:yes;status:no");
        }
        if (strDialog[0]) {
            gE('btnReLogin').click();
        }
    }
    else {
        if (window.screen.height == 1024)
            strDialog = window.open("frmChangeBranch.aspx?DynamicLoad='true'&SessionID=" + fnGetSessionID() + "&ClikModuleID=7900&Title=Change Branch", "Title", "height=100px,width=500px, top=0, left=0, toolbar=no, status=yes, scrollbars=no, location=no, menubar=no, directories=no, resizable=yes", false);
        else
            strDialog = window.open("frmChangeBranch.aspx?DynamicLoad='true'&SessionID=" + fnGetSessionID() + "&ClikModuleID=7900&Title=Change Branch", "Title", "height=100px,width=500px, top=0, left=0, toolbar=no, status=yes, scrollbars=no, location=no, menubar=no, directories=no, resizable=yes", false);
    }
}

function fnRetChangeBranch(strDialog) {
    if (strDialog[0])
        gE('btnReLogin').click();
}
/**********************************************************************************************************************************
function to close BRDialog from main module
**********************************************************************************************************************************/

function BRDialogClose() {
    if (!window.showModalDialog) {
        if (fnCheckNull(resdiag) != "") {
            resdiag.close();
            resdiag = null;
        }
        else
            return false;
    }
}
function closeWindow() {
    if (brsType == 'Chrome')
        closeWindow1();
    else
        return false;
}
function closeWindow1() {
    closeWindow3();
    closeWindow2();
    if (fnCheckNull(str) != "") {
        if (fnCheckNull(str) != "undefined") {
            str.close();
        }
    }
    else
        return false;
}
function closeWindow3()
{
    if (fnCheckNull(strDialog) != "") {
        if (fnCheckNull(strDialog) != "undefined") {
            strDialog.close();
        }
    }
    else
        return false;
}
/**********************************************************************************************************************************
    Function/Procedure  Name           :- initDateChooser(dc)
    functionality                      :- Infragistic DateChooser will work for MSIE 10 version
    created & written by               :- Biswajit Dash
***********************************************************************************************************************************/

function initDateChooser(dc) {
    if (ig_shared.IsIE && ig_csom.AgentName.indexOf("msie 10.0") != -1)
        dc.ExpandEffects.applyFilter = function () { };
}

function fnCheckIDFormat(value, format) {
    for (var i = 0; i < value.length; i++) {
        switch (format.substring(i, i + 1).toUpperCase()) {
            case 'X':
                if (/^[a-zA-Z]*$/.test(value.substring(i, i + 1)) == false)
                    return false;
                break;
            case '9':
                if (/^[0-9]*$/.test(value.substring(i, i + 1)) == false)
                    return false;
                break;
            case '/':
                if (value.substring(i, i + 1) != "/")
                    return false;
                break;
            case '-':
                if (value.substring(i, i + 1) != "-")
                    return false;
                break;
            case '_':
                if (value.substring(i, i + 1) != "_")
                    return false;
                break;
        }
    }
    return true;
}

function fnCheckPanCardFormat(value, strLastName) {
    if (/^[a-zA-Z]*$/.test(value.substring(0, 3)) == false)
        return false;

    if (/^[CPHFATBLJG]*$/.test(value.substring(3, 4)) == false)
        return false;

    if (value.substring(4, 5) != strLastName.substring(0, 1))
        return false;

    if (/^[0-9]*$/.test(value.substring(5, 9)) == false)
        return false;

    if (/^[a-zA-Z]*$/.test(value.substring(9, 10)) == false)
        return false;

    return true;
}

/**********************************************************************************************************************************
//This Function returns true, If the string contains Backslash or Reverse Solidus (\)
**********************************************************************************************************************************/
function fnCheckBackslash(strValue) {
    if (strValue.indexOf('\\') != -1)
        return true;
    else
        return false;
}

//Decript Response
function DecriptResponse(encryptedData) {

    var key = "90033E3984CEF5A659C44BBB47299B4208374FB5DC495C96";
    var iv = "E6B9AFA7A282A0CA";

    key = CryptoJS.enc.Hex.parse(key);
    iv = CryptoJS.enc.Hex.parse(iv);


    var decrypted = CryptoJS.TripleDES.decrypt({
        ciphertext: CryptoJS.enc.Hex.parse(encryptedData)
    }, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

//Aadhar Validation
function VaidateAadhaar(adrNo) {
    var aadr = adrNo.substring(0, adrNo.length - (adrNo.length - 1));
    if (/^[0-1]*$/.test(parseInt(aadr)) == true)
    {
        return false;
    }
    var d = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
             [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
             [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
             [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
             [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
             [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
             [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
             [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
             [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]];
    var p = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
             [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
             [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
             [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
             [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
             [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
             [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]];

    var c = 0;
    var myArray = StringToReversedIntArray(adrNo);
    for (var i = 0; i < myArray.length; i++) {
        c = d[c][p[(i % 8)][myArray[i]]];
    }
    return (c === 0);
}

function StringToReversedIntArray(num) {
    var myArray = [];
    var revArray = [];
    for (var i = 0; i < num.length; i++) {
        myArray.push(parseInt(num.substring(i, i + 1)));
    }
    for (var j = 0, k = myArray.length - 1; j < myArray.length; j++, k--) {
        revArray.push(myArray[k]);
    }
    return revArray;
}