//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/mail/imap/mailbox.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneTemplate extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema    : 'mne_mail',
      query     : 'imapmailbox',
      showids   : [ 'imapmailboxid'],

      okschema    : 'mne_mail',
      okfunction  : 'imapmailbox_ok',
      okcols      : [ 'imapmailboxid', 'server', 'login', 'passwd' ],

      delschema   : 'mne_mail',
      delfunction : 'imapmailbox_del',
      delcols     : [ 'imapmailboxid' ],
      delconfirmids : [ 'server', 'login'],
        
      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  async ok()
  {
    if ( this.obj.inputs.passwd.getValue() != this.obj.inputs.passwdcheck.getValue() )
      throw '#mne_lang#Passworte sind nicht gleich'
    
    return super.ok();
  }
}

export default MneTemplate;
