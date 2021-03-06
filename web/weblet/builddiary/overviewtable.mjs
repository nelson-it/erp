//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/builddiary/overviewtable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneInput     from '/js/basic/input.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'

import MneDbViewTable  from '/weblet/db/table/view.mjs'

class MneErpBuilddiaryOverviewTable extends MneDbViewTable
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        report  : 'report',
        report1  : 'mne_builddiary_personsum',
        report2 : 'mne_builddiary_detail',
        
        singleselect : true
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  reset()
  {
    super.reset();

    this.setbuttonpar('print', 'space', 'before');
    
    this.obj.mkbuttons.push( { id : 'print2', value : MneText.getText('#mne_lang#Bautagebuch drucken'), behind : 'print' } );
    this.obj.mkbuttons.push( { id : 'print3', value : MneText.getText('#mne_lang#Blatt drucken'), behind : 'print2'} );
       
    this.obj.enablebuttons.buttons.push('print2');
    this.obj.enablebuttons.buttons.push('print3');

    this.obj.enablebuttons.values.push('print');
    this.obj.enablebuttons.values.push('print2');
    
    this.obj.enablebuttons.select.push('print2');
    this.obj.enablebuttons.select.push('print3');
  }
  
  getPrintParam(data)
  {
    switch(this.obj.report)
    {
      case 1:
        this.obj.printparam = { wcol : 'orderid', wop : '=', wval : this.parent.obj.weblets.where.obj.inputs.orderid.getValue() };
        break;
        
      case 2:
        this.obj.printparam = { wcol : 'orderid,timeid', wop : '=,is not null', wval : this.parent.obj.weblets.where.obj.inputs.orderid.getValue() + ','};
        break;
        
      case 3:
        this.obj.printparam = { wcol : 'orderid,timeid', wop : '=,=', wval : this.parent.obj.weblets.where.obj.inputs.orderid.getValue() + ',' + this.obj.outputs.timeid.getValue()};
        break;
    }
    return super.getPrintParam();
  }
  
  async print()
  {
      this.initpar.report = this.initpar.report1;
      this.obj.report = 1;
      super.print();
  }

  async print2()
  {
      this.initpar.report = this.initpar.report2;
      this.obj.report = 2;
      super.print();
  }

  async print3()
  {
      this.initpar.report = this.initpar.report2;
      this.obj.report = 3;
      super.print();
  }
  
  async selectRow(data, row, evt = {})
  {
    var retval = await super.selectRow(data, row, evt);
    this.config.composeparent.obj.weblets['top'].setday(MneInput.mkCdate(this.obj.run.values.date))

    return retval;
  }

  
  async ok(param)
  {
    await this.execute_modified( async () =>
    {
      this.obj.outputs.starttime.modValue(this.obj.inputs.date.getValue() + this.obj.inputs.startclocktime.getValue() );
      this.obj.outputs.duration.modValue(this.obj.inputs.endclocktime.getValue() - this.obj.inputs.startclocktime.getValue() );
    });
    await super.ok(param);
  }
  
  async values()
  {
    await super.values();
        
    this.obj.defvalues.orderid = this.parent.obj.weblets.where.obj.inputs.orderid.getValue();
    if ( ! this.obj.tbody.children.length )
      this.obj.buttons.print.disabled = this.obj.buttons.print2.disabled = this.obj.buttons.print3.disabled = true; 
  }
}

export default MneErpBuilddiaryOverviewTable;
