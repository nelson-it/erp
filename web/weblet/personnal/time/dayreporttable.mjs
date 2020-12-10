//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/personnal/time/dayreporttable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneInput     from '/js/basic/input.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'

import MneDbTableView from '/weblet/db/table/view.mjs'

class MneErpPersonnalDayreportTable extends MneDbTableView
{
  reset()
  {
    super.reset();
    this.obj.run.slotstart = 0;
  }
  
  async load()
  {
    await super.load();
    var param =
    {
        "schema" : this.initpar.slotstartschema,
        "table"  : this.initpar.slotstarttable,
        "cols"   : "slotstart",

        sqlstart : 1,
        sqlend   : 1
    };

    var res = await MneRequest.fetch("/db/utils/table/data.json",  param );
    
    if ( res.values.length > 0 )
      this.obj.run.slotstart = res.values[0][0];
    
  }
  
  async mkRow(row)
  {
    if ( row.obj == undefined )
    {
      await super.mkRow(row);

      var clocktime = row.obj.inputs.clocktime;
      clocktime.addEventListener('focus', () => { if ( ! clocktime.getValue(false)) clocktime.modValue(this.obj.run.nexttime) });

      var clocktimeend = row.obj.inputs.clocktimeend;
      clocktimeend.addEventListener('blur', () =>
      {
        var maxtime = this.obj.run.nexttime;
        Array.from(this.obj.tbody.rows).forEach((item) => { var t; if (( t = item.obj.inputs.clocktimeend.getValue(false)) > maxtime ) maxtime = t; } );
        this.obj.run.nexttime = maxtime;
      });

      var ordernumber = row.obj.inputs.ordernumber;
      ordernumber.addEventListener('focus', (evt) =>
      {
         if ( ordernumber.closest('tr') != this.obj.run.act_row )
           this.selectRow( {}, row );
      });

      ordernumber.addEventListener('blur', (evt) =>
      {
        if ( !( MneElement.hasClass(ordernumber,'modifyok') || MneElement.hasClass(ordernumber,'modifyno')) )
        {
          row.obj.inputs.productnumber.modValue('');
          row.obj.inputs.stepdescription.modValue('');
          row.obj.inputs.comment.modValue('');
        }
      });

      var productnumber = row.obj.inputs.productnumber;
      productnumber.addEventListener('blur', (evt) =>
      {
        if ( !( MneElement.hasClass(productnumber,'modifyok') || MneElement.hasClass(productnumber,'modifyno')) )
        {
          row.obj.inputs.stepdescription.modValue('');
          row.obj.inputs.comment.modValue('');
        }
      });
    }
  }
  
  async selectRow(data, row, evt)
  {
    var val;
    var ele;
    
    var result = await super.selectRow(data, row, evt);

    if ( data.type == 'ok' )
    {
      var val = this.obj.inputs.clocktimeend.getValue() - this.obj.inputs.clocktime.getValue();
      var ele = this.obj.inputs.duration ?? this.obj.outputs.duration;
      ele.modValue(val);

      var val = this.config.dependweblet.obj.run.values.date + this.obj.inputs.clocktime.getValue();
      var ele = this.obj.inputs.start ?? this.obj.outputs.start;
      ele.modValue(val);
    }

    return result;
  }
  
  async add(data)
  {
    var i;
    
    this.unselectRows();
    this.obj.run.selectedkeys = [];
    
    await super.add(data);

    for ( i=0; i<this.obj.cols.length; ++i)
    {
      if ( this.obj.run.act_row.obj.inputs[this.obj.cols[i]] ) { this.obj.run.act_row.obj.inputs[this.obj.cols[i]].modClear(); }
      if ( this.obj.run.act_row.obj.outputs[this.obj.cols[i]] ) { this.obj.run.act_row.obj.outputs[this.obj.cols[i]].modClear(); }
    }

  }

  async values()
  {
    var i;
    await super.values();
    
    var res = this.obj.run.result;
    i = this.obj.tbody.children.length;
    this.obj.run.nexttime = ( i ) ? this.obj.tbody.children[i-1].values[res.rids['clocktimeend']] : this.obj.run.slotstart;
    var rows = this.obj.tbody.querySelectorAll('tr.active');
    
    for ( i = this.obj.tbody.children.length; i < 10; i++)
      await this.add();

    this.unselectRows();
    for ( i=0; i<rows.length; i++ )
      await this.selectRow({type : 'values'}, rows[i], { ctrlKey : true });
  }
}

export default MneErpPersonnalDayreportTable;
