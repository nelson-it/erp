//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/personnal/time/dayreport.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'
import MneElement  from '/weblet/basic/element.mjs'

import MneFixTable from '/weblet/allg/table/fix.mjs'

class MneErpPersonnalDayreport extends MneFixTable
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      tableweblet  : 'personnal/time/dayreporttable',
        
      schema      : 'mne_personnal',
      query       : 'time',
      cols        : "timeid,start,orderproducttimeid,orderid,ordernumber,orderdescription,productnumber,productname,stepdescription,clocktime,clocktimeend,duration,comment,refname",
      scols       : "start",
      distinct    : 1,

      tablehidecols : [ 'timeid','start','orderproducttimeid','orderid','duration'],
      tablecoltype  : { start : 'text', ordernumber : 'text', productnumber : 'text', stepdescription : 'text', clocktime : 'text', clocktimeend : 'text', duration : 'text', comment : 'mtext' },

      showids       : [ 'userid',  'date' ],
      showalias     : [ 'personid', 'date'],
      primarykey    : [ 'timeid'],
      
      okfunction : 'time_mod',
      okcols     : [ 'timeid', 'orderproducttimeid', 'personid', 'start', 'duration', 'comment'],
      okids      : [ 'timeid'],
      oktyps     : { start : 'long', duration : 'long' },
      
      delfunction   : 'time_del',
      delcols       : [ 'timeid'],
      delconfirmids : [ 'stepdescription','clocktime' ],

      slotstartschema : 'mne_personnal',
      slotstarttable  : 'timemanagement_param',
      
      defvalues : { duration : '' },
      
      delbutton : [ 'refresh'],
      nofocus : true,
      notitle : true
    };
    
    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }
}

export default MneErpPersonnalDayreport;
