//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/builddiary/dayreporttable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneInput     from '/js/basic/input.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'

import MneErpPersonnalDayreportTable  from '/weblet/personnal/time/dayreporttable.mjs'

class MneErpBuilddiaryDayreportTable extends MneErpPersonnalDayreportTable
{
  async selectRow(data, row, evt)
  {
    var val;
    var ele;
    
    var result = await super.selectRow(data, row, evt);

    if ( data.type == 'ok' )
    {
      var val = this.config.dependweblet.obj.run.values.date + this.obj.inputs.bclocktime.getValue();
      var ele = this.obj.inputs.bstart ?? this.obj.outputs.bstart;
      ele.modValue(val);

      var val = this.obj.inputs.bclocktimeend.getValue() - this.obj.inputs.bclocktime.getValue();
      var ele = this.obj.inputs.bduration ?? this.obj.outputs.bduration;
      ele.modValue(val);
     /*if ( ( this.obj.outputs.present.getValue() != '0' || this.obj.inputs.bclocktimeend.getModify() || this.obj.inputs.bclocktime.getModify() ||this.obj.inputs.weather.getModify() ||this.obj.inputs.temperature.getModify() )
           && this.obj.inputs.bclocktime.getValue() != '' && this.obj.inputs.bclocktimeend.getValue() != '' )
      {
      }
      else
      {
        var ele = this.obj.inputs.bduration ?? this.obj.outputs.bduration;
        ele.modValue(0);
      }
      */
    }
    return result;
  }
}

export default MneErpBuilddiaryDayreportTable;
