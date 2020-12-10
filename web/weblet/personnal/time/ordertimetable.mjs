//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/personnal/time/ordertimetable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneInput     from '/js/basic/input.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'

import MneDbTableView from '/weblet/db/table/view.mjs'

class MneErpPersonnalTimeOrdertimetable extends MneDbTableView
{
  getPrintParam(data)
  {
    var p = {};
    var where = this.parent.obj.weblets.where;
    
    p.macro0 = 'ordernumber,' + where.obj.outputs.ordernumber.getValue();
    p.macro1 = 'startdate,'+ MneInput.mkCdate(where.obj.inputs.startdate.getValue());
    p.macro2 = 'enddate,'  + MneInput.mkCdate(where.obj.inputs.enddate.getValue());
    
    p.macro3 = 'orderdescription,' + where.obj.outputs.orderdescription.getValue();
    p.macro4 = 'owntime,'  + where.obj.inputs.my.getValue();

    p.wcol = where.wcol;
    p.wop  = where.wop;
    p.wval = where.wval;
    
    return super.getPrintParam({report : this.initpar['report_' + ((where.obj.inputs.my.getValue() ) ? 'single' : 'all')], param : p });

  }

  async values(param)
  {
    await super.values(param);
    this.obj.buttons.print.disabled = ( this.obj.tbody.children.length == 0 );
  }
}

export default MneErpPersonnalTimeOrdertimetable;
