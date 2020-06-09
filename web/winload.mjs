// ================================================================================
//
// Copyright: M.Nelson - technische Informatik
//            Die Software darf unter den Bedingungen 
//            der APGL ( Affero Gnu Public Licence ) genutzt werden
//            
//    datei: winload.js
//================================================================================
'use strict';
import Bowser from '/js/bowser/bowser.js';
import MneMainWeblet from '/weblet/basic/main.mjs'

window.addEventListener('load', function(evt)
{
    const browser = Bowser.getParser(window.navigator.userAgent);
    document.body.setAttribute("aria-view-mode",browser.parsedResult.platform.type);
    document.body.setAttribute("aria-view-engine",browser.parsedResult.engine.name.toLowerCase());
    
    const main_weblet = new MneMainWeblet(document.body.firstChild, window.mne_application, window.mne_application == 'erp');
    main_weblet.show();
});