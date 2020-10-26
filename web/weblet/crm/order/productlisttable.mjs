//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/order/productlisttable.mjs
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

    this.obj.enablebuttons.buttons.push('up');
    this.obj.enablebuttons.buttons.push('down');

    this.obj.enablebuttons.select.push('up');
    this.obj.enablebuttons.select.push('down');

  }
  
  async writesort()
  {
    var p = 
      {
        schema : this.initpar.schema,
        table  : this.initpar.table,
      }
    
    var res = this.fillres(this.obj.tbody.querySelectorAll('tr'));
    await Promise.all(res.values.map( async ( item, index ) =>
    {
      p.positionInput = index;
      p[this.initpar.primarykey[0] + "Input.old"] = item[res.rids[this.initpar.primarykey[0]]];
      
      await MneRequest.fetch('/db/utils/table/modify.json', p);
    }));
  }
  
  async up()
  {
    this.obj.tbody.querySelectorAll('tr.active').forEach ( (item) => { if ( item.previousSibling ) this.obj.tbody.insertBefore(item, item.previousSibling); });
    await this.writesort();
  }

  async down()
  {
    this.obj.tbody.querySelectorAll('tr.active').forEach ( (item) => { if ( item.nextSibling && item.nextSibling.className.indexOf('sum2') == -1 ) this.obj.tbody.insertBefore(item.nextSibling, item); });
    await this.writesort();
  }
  
}

export default MneErpOfferProductlistTable;
