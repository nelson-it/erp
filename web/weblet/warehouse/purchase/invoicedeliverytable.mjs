//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/purchase/invoicedeliverytable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'
import MneInput     from '/js/basic/input.mjs'

import MneDbView from '/weblet/db/view.mjs'
import MneDbTableView from '/weblet/db/table/view.mjs'

class MneErpWarehousePurchaseInvoicedeliveryTable extends MneDbTableView
{
  getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  reset()
  {
    super.reset();

    this.obj.mkbuttons =
      [
        { id : 'refresh',      value : MneText.getText('#mne_lang#Aktualisieren'), space : 'behind' },
        { id : 'add',          value : MneText.getText('#mne_lang#Hinzufügen'), show : ( this.obj.run.btnrequest.add != undefined ), },
        { id : 'del',          value : MneText.getText('#mne_lang#Löschen'),    show : ( this.obj.run.btnrequest.del != undefined ) }
      ];
    
    this.obj.enablebuttons.add      = [];
    this.obj.enablebuttons.del      = [];
    this.obj.enablebuttons.values   = [];
    this.obj.enablebuttons.selected = ['add', 'del'];
 
  }
  
  async add()
  {
    var func = async () => 
    {
      if ( this.obj.outputs.purchaseinvoicedeliveryid.getValue() )
        await MneDbView.prototype.del.call(this, { noask : true});

      this.obj.outputs.purchaseinvoicedeliveryid.modValue('################');
      this.obj.run.okaction = 'add';
      return MneDbView.prototype.ok.call(this);
    };
    
    await this.execute_selected(func);
    this.newvalues = true;
  }

  async toggle()
  {
    if ( this.obj.outputs.purchaseinvoicedeliveryid.getValue() )
      return MneDbView.prototype.del.call(this, { noask : true});
    
    this.obj.outputs.purchaseinvoicedeliveryid.modValue('################');
    this.obj.run.okaction = 'add';
    return MneDbView.prototype.ok.call(this);
  }

  async enter()
  {
    var func = async () => { await this.toggle() };
    await this.execute_selected(func);
    this.newvalues = true;
  }
  
  async dblclick()
  {
    var func = async () => { await this.toggle() };
    await this.execute_selected(func);
    this.newvalues = true;
  }
 
}

export default MneErpWarehousePurchaseInvoicedeliveryTable
