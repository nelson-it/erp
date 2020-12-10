//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/builddiary/detail.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpBuilddairyDetail extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema    : 'mne_builddiary',
      query     : 'time_detail',
      showids   : ['timeid'],

      okschema   : 'mne_builddiary',
      okfunction : 'bdtime_ok',
      okcols     : [ 'timeid', 'orderid', 'start', 'duration', 'weather', 'temperature' ],
      oktyps     : { start : 'long', duration : 'long', temperature : 'long' },

      delschema     : 'mne_builddiary',
      delfunction   : 'bdtime_del',
      delcols       : [ 'timeid' ],
      delconfirmids : ['orderdescription', 'start', 'duration'],

      report : 'mne_builddiary_detail',

      weatherlist : 'builddiary_weather',

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  async ok( param )
  {
     this.obj.inputs.start.modValue( this.obj.outputs.date.getValue() + this.obj.inputs.clocktime.getValue());
     this.obj.inputs.duration.modValue(this.obj.inputs.clocktimeend.getValue() - this.obj.inputs.clocktime.getValue());
     
     return super.ok( param );
  }
}

export default MneErpBuilddairyDetail;
