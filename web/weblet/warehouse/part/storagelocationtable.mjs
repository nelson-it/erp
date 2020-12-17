//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/part/storagelocationtable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'
import MneInput     from '/js/basic/input.mjs'

import MneDbTableView from '/weblet/db/table/view.mjs'

class MneErpWarehousePartStoragelocationTable extends MneDbTableView
{

  reset()
  {
    super.reset();
    
    this.setbuttonpar('detail', 'value', MneText.getText('Umlagern'));
    this.delbutton('detaildel');
    
    this.obj.enablebuttons.values = [];
    this.obj.enablebuttons.select = ['detail'];
    
  }
  
}

export default MneErpWarehousePartStoragelocationTable;
