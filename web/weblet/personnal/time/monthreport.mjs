//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/personnal/time/monthreport.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'
import MneElement  from '/weblet/basic/element.mjs'

import MneFixTable from '/weblet/allg/table/fix.mjs'

class MneErpPersonnalMonthreport extends MneFixTable
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        css      : '/styles/weblet/personnal/time/day.css',
        schema   : 'mne_personnal',
        query    : 'persontime_dayall',
        cols     : 'sortcol,needtime,vday,vmonth,vyear,loginname,dayname,vfullday,duration,wtime',
        scols    : 'sortcol,vday',
        showids  : ['loginname', "vmonth", "vyear"],
        distinct : true,

            tablehidecols: ['sortcol','needtime','vday','vmonth','vyear','loginname'],
            tablerowstyle: ['sum',''],
        tablerowstylecol : ['sortcol','needtime'],

    };
    
    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }
}

export default MneErpPersonnalMonthreport;
