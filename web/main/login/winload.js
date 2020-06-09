import Bowser from '/main/login/bowser/bowser.js';
window.onload = function()
{
    const browser = Bowser.getParser(window.navigator.userAgent);

    document.getElementById("supported").className = ( browser.satisfies(
    {
         desktop : { firefox: '>=72', chromium : '>=79', chrome : '>=79', safari : '>=13', edge : '>=80' },
         mobile :  { firefox: '>=23', chromium : '>=79', chrome : '>=79', safari : '>=13', edge : '>=80' },
         
    } )) ? '' : 'nosupport';
    
    document.getElementById("browsernavigator").innerText = browser.parsedResult.browser.name;
    document.getElementById("browserversion").innerText = browser.parsedResult.browser.version;
    document.getElementById("browseros").innerText = browser.parsedResult.os.name;
    document.getElementById("browserplugin").innerText = '#mne_lang#ja';

    document.getElementById("location").value = window.location.href;
    var cookies = document.cookie.split(';');
    var i;
    for ( i = 0; i< cookies.length; i++)
      {
      var c = cookies[i].split('=');
      if ( c.length > 0 && c[0].replace(/ /g,"") == "MneHttpSessionLoginWrong" && c[1] == '1')
      {
       document.getElementById("error").innerHTML = "Username oder Password ist falsch";
      }
    }
    document.cookie = "MneHttpSessionLoginWrong=; expires=Thu, 01-Jan-70 00:00:01 GMT; sameSite=Strict";
    document.getElementById('user').focus();
    
}
