//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/mail/imap/foldertable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'
import MneInput     from '/js/basic/input.mjs'

import MneDbTableView from '/weblet/db/table/view.mjs'

class MneErpMailImapFolderTable extends MneDbTableView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      hinput : false
    };

    initpar.showids   = ['imapmailboxid', 'checkit'],
    initpar.showalias = [ 'imapmailboxid', '#true' ],
 
    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  reset()
  {
    super.reset();
    
    this.obj.mkbuttons.push({ id : 'rescan', value : MneText.getText("#mne_lang#Server neu lesen" ), before : 'del'});
    this.obj.mkbuttons.push({ id : 'check', value : MneText.getText("#mne_lang#Überprüfen" ), space : 'before', before : 'del' });
    this.obj.mkbuttons.push({ id : 'sended', value : MneText.getText("#mne_lang#Sende-/Empfangsbox" ), before : 'del' });
    
    this.obj.enablebuttons.buttons.push('sended');
    this.obj.enablebuttons.select.push('sended');

    this.obj.enablebuttons.buttons.push('check');
    this.obj.enablebuttons.select.push('check');
    
    this.delbutton('add,cancel,ok')

  }
  
  async rescan()
  {
    var i;
    var pp = [];
    var imapmailboxid = this.obj.run.values.imapmailboxid;
    var p =
    {
        imapmailboxid : imapmailboxid,
        sqlend : 1
    };
    
    var res = await MneRequest.fetch('/db/utils/imap/folder.json', p);
    for ( i=0; i<res.values.length; i++ )
    {
      var p =
      {
          schema : this.initpar.rescanschema,
          name : this.initpar.rescanfunction,
          par0 : imapmailboxid,
          par1 : res.values[i][0],
          par2 : res.values[i][1],
          sqlend : 1
      };
      pp.push(MneRequest.fetch('/db/utils/connect/func/execute.xml', p ));
    }
    
    await Promise.all(pp);
    
    this.dependweblet = this;
  }
  
  async sended()
  {
    var p =
    {
        schema : this.initpar.schema,
        table  : this.initpar.table,
        sqlend : 1
    }

    var func = async () =>
    {
      p ["sendInput"] = ! this.obj.run.values.send;
      p ["imapfolderidInput.old"] = this.obj.run.values.imapfolderid;
      
      await MneRequest.fetch(this.obj.run.btnrequest['mod'],  p);
    }
    
    await this.execute_selected(func);
    this.newvalues = true;
  }

  async check()
  {
    var p =
    {
        schema : this.initpar.schema,
        table  : this.initpar.table,
        sqlend : 1
    }

    var func = async () =>
    {
      p ["checkitInput"] = ! this.obj.run.values.checkit;
      p ["imapfolderidInput.old"] = this.obj.run.values.imapfolderid;
      
      await MneRequest.fetch(this.obj.run.btnrequest['mod'],  p);
    }
    
    await this.execute_selected(func);
    this.dependweblet = this;
  }


  async values()
  {
    this.initpar.showids = ( this.obj.run.dependweblet == undefined ) ? ['imapmailboxid', 'checkit'] : ['imapmailboxid'];
    await super.values();
    
    this.obj.buttons.rescan.disabled =( ( ! this.obj.run.values.imapmailboxid ) || this.obj.run.values.imapmailboxid == '################' );
  }
  
}

export default MneErpMailImapFolderTable
