//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/mail/imap/foldertable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'
import MneInput     from '/js/basic/input.mjs'

import MneDbTableView from '/weblet/db/table/view.mjs'

class MneErpHoaiAdminFee extends MneDbTableView
{
  async values()
  {
    await super.values();
    this.title = (( this.obj.tbody.rows.length > 0 ) ? this.obj.tbody.rows[0].values[this.obj.run.result.rids.law] : this.config.label);
  }
  
}

export default MneErpHoaiAdminFee
