//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/offer/productlisttable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'
import MneInput     from '/js/basic/input.mjs'

import MneDbTableView from '/weblet/db/table/view.mjs'

class MneErpOfferProductlistTable extends MneDbTableView
{
  reset()
  {
    super.reset();
    
    this.obj.mkbuttons.push( { id : 'up', value : unescape("%uf077"), font : 'SymbolFont1', behind : 'detaildel', space : 'before' } );
    this.obj.mkbuttons.push( { id : 'down', value : unescape("%uf078"), font : 'SymbolFont1',  behind : 'up' });
    this.obj.mkbuttons.push( { id : 'calculate', value : MneText.getText("#mne_lang#Kosten berechnen"), behind : 'down', space : 'before', show : ( ! this.initpar.calcfunction ) != true });
    this.obj.mkbuttons.push( { id : 'calculateall', value : MneText.getText("#mne_lang#Alle Kosten berechnen"), behind : 'calculate', show : ( ! this.initpar.calcfunctionall )  != true });

    this.obj.enablebuttons.buttons.push('up');
    this.obj.enablebuttons.buttons.push('down');
    this.obj.enablebuttons.buttons.push('calculate');

    this.obj.enablebuttons.select.push('up');
    this.obj.enablebuttons.select.push('down');
    this.obj.enablebuttons.select.push('calculate');

  }
  
  async writesort()
  {
    var p = 
      {
        schema : this.initpar.schema,
        table  : this.initpar.table,
      }
    
    var res = this.fillres(this.obj.tbody.querySelectorAll('tr.sum1'));
    await Promise.all(res.values.map( async ( item, index ) =>
    {
      p.positionInput = index;
      p[this.initpar.primarykey[0] + "Input.old"] = item[res.rids[this.initpar.primarykey[0]]];
      
      await MneRequest.fetch('/db/utils/table/modify.json', p);
    }));
  }
  
  async up()
  {
    this.obj.tbody.querySelectorAll('tr.sum1.active').forEach ( (item) => { if ( item.previousSibling ) this.obj.tbody.insertBefore(item, item.previousSibling); });
    await this.writesort();
  }

  async down()
  {
    this.obj.tbody.querySelectorAll('tr.sum1.active').forEach ( (item) => { if ( item.nextSibling && item.nextSibling.className.indexOf('sum2') == -1 ) this.obj.tbody.insertBefore(item.nextSibling, item); });
    await this.writesort();
  }
  
  async calculate()
  {
    var res = this.select;
    await Promise.all(res.values.map( async ( item, index ) =>
    {
      var p =
      {
          schema : this.initpar.schema,
          name : this.initpar.calcfunction,
          par0 : item[res.rids.offerproductid],
          sqlstart : 1,
          sqlend : 1
      }
      await MneRequest.fetch('/db/utils/connect/func/execute.json', p);
    }));
    
    this.newvalues = 1;
  } 

  async calculateall()
  {
    var p =
    {
        schema : this.initpar.schema,
        name : this.initpar.calcfunctionall,
        par0 : this.obj.run.values.offerid,
        par1 : this.obj.run.values.offerproducttype,
        sqlstart : 1,
        sqlend : 1
    }
    await MneRequest.fetch('/db/utils/connect/func/execute.json', p);

    this.newvalues = 1;
  } 
}

export default MneErpOfferProductlistTable;
