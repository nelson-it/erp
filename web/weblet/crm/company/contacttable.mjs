//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/company/contacttable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'

import MneDbTableView from '/weblet/db/table/view.mjs'

class MneCrmCompanyContactTable extends MneDbTableView
{
  reset()
  {
    super.reset();
    
    this.setbuttonpar('detailscreen', 'value', MneText.getText('#mne_lang#Mitarbeiter hinzufügen/bearbeiten'));
    this.obj.mkbuttons.push ( { id : 'assoz', value : MneText.getText('#mne_lang#assoziierten Kontakt hinzufügen'), behind : 'ok', space : 'before'});
  }
  
  async selectRow(data, row, evt )
  {
    await super.selectRow(data, row, evt );
    this.obj.buttons.del.disabled = ( ! this.obj.run.values.companypersonid );
    this.obj.buttons.ok.disabled = ( ! this.obj.run.values.companypersonid );
  }

  async employee()
  {
    var val = this.config.dependweblet.obj.run.values;
    this.showweblet('crm_person', {}, { detail : { defvalues : { refid : val.companyid, refname : val.company }}});
    return false;
  }

  async assoz()
  {
    await this.openpopup(this.initpar.detailassoz, {},  { selectok : async (sel) => 
    {
      await this.add();
      sel.ids.forEach( (item,index) => 
      {
        if ( this.obj.inputs[item] )
          this.obj.inputs[item].modValue(sel.values[0][index]);
        if ( this.obj.outputs[item] )
          this.obj.outputs[item].modValue(sel.values[0][index]);
      });
    }});

      return false;
  }
  
  async values(param)
  {
    await super.values(param);
    
    this.obj.run.values.companyid = this.config.dependweblet.obj.run.values.companyid;
    this.obj.run.values.company = this.config.dependweblet.obj.run.values.company;
    
  }
}

export default MneCrmCompanyContactTable;
