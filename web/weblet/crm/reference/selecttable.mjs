//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/reference/selecttable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'

import MneDbTableSelect from '/weblet/db/table/select.mjs'

class MneErpCrmReferenceSelectTable extends MneDbTableSelect
{
  reset()
  {
    super.reset();
    
    this.obj.mkbuttons.push( { id : 'company', value : MneText.getText("#mne_lang#Firma hinzufügen"), space : 'before'} );
    this.obj.mkbuttons.push( { id : 'person',  value : MneText.getText("#mne_lang#Person hinzufügen"), space : 'before'} );
    
    this.obj.selectok = this.initpar.selectok;
    
  }

  async company ()
  {
    this.obj.run.values.companyid = '################';
    this.obj.run.values.ref = 'company';
    this.initpar.selectok = async (res) =>
    {
      if ( res.values.length == 0 ) return;
      
      res.rids.refid = res.ids.length;
      res.ids.push('refid'); 
      res.rids.refname = res.ids.length;
      res.ids.push('refname'); 

      res.values[0][res.rids.refid] = res.values[0][res.rids.companyid];
      res.values[0][res.rids.refname] = res.values[0][res.rids.company];
      
      return this.initorig.selectok(res);
    }
    this.opendetail(this.parent.id + 'company');
    
    return false;
  }
  
  async person ()
  {
    this.obj.run.values.personid = '################';
    this.obj.run.values.ref = 'person';
    this.initpar.selectok = async (res) =>
    {
      if ( res.values.length == 0 ) return;
      
      res.rids.refid = res.ids.length;
      res.ids.push('refid'); 
      res.rids.refname = res.ids.length;
      res.ids.push('refname'); 

      res.values[0][res.rids.refid] = res.values[0][res.rids.personid];
      res.values[0][res.rids.refname] = res.values[0][res.rids.fullname];
      
      return this.initorig.selectok(res);
    }
    this.opendetail(this.parent.id + 'person');
    
    return false;
  }
  
  async values()
  {
    this.initpar.selectok = this.initorig.selectok;
    return super.values();
  }

}

export default MneErpCrmReferenceSelectTable;
