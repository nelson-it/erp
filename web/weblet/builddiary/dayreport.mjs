//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/builddiary/dayreport.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'

import MneErpPersonnalDayreport  from '/weblet/personnal/time/dayreport.mjs'

class MneErpBuilddiaryDayreport extends MneErpPersonnalDayreport
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        css : 'builddiary/day.css',
        tableweblet  : 'builddiary/dayreporttable',

        schema      : 'mne_builddiary',
        query       : 'time',
        cols        : "have_bd,count_bd,present,timeid,orderproducttimeid,presentid,start,bstart,bdtimeid,orderid,ordernumber,orderdescription,productnumber,productname,stepdescription,clocktime,clocktimeend,duration,comment,bclocktime,bclocktimeend,bduration,weather,temperature",

        tablerowstyle    : ['bd','bdc','bdp'],
        tablerowstylecol : ['have_bd','count_bd','present'],
        tablecolstyle    : { bclocktime : '#bd', bclocktimeend : '#bd', weather : '#bd', temperature : '#bd' },

        okfunction : 'time_mod',
        okcols     : [ 'presentid', 'timeid', 'orderproducttimeid', 'personid', 'start', 'duration', 'comment', 'bstart', 'bduration', 'weather', 'temperature'],
        okids      : [ 'timeid' ],
        oktyps     : { start : 'long', duration : 'long', bstart : 'long', bduration : 'long', temperature : 'long' },

        selectlists : { weather : 'builddiary_weather' },
        defvalues   : { weather : 'sun' }
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }
  
  reset()
  {
    this.initorig.tablehidecols = this.initorig.tablehidecols.concat(['have_bd','count_bd','present', 'presentid', 'bstart', 'bdtimeid', 'bduration']);
    super.reset();
    this.initpar.tablecoltype = Object.assign(this.initpar.tablecoltype, { bclocktime : 'text', bclocktimeend : 'text', weather : 'selection' ,temperature: 'text' });
  }
}

export default MneErpBuilddiaryDayreport;
