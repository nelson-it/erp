//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/builddiary/presenttable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneInput     from '/js/basic/input.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'

import MneDbViewTable  from '/weblet/db/table/view.mjs'

class MneErpBuilddiaryPresentTable extends MneDbViewTable
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        comment  : 'bdcomment',
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  reset()
  {
    super.reset();

    this.obj.mkbuttons.push( { id : 'comment', value : MneText.getText('#mne_lang#Komentare'), behind : 'add', space : 'before'} );

    this.obj.enablebuttons.buttons.push('comment');
    this.obj.enablebuttons.select.push('comment');
  }
  
  async comment()
  {
    return this.openpopup(this.initpar.comment);
  }
  
  async values( param )
  {
    await super.values( param );
    this.obj.defvalues.timeid = this.parent.obj.weblets.where.obj.inputs.timeid.getValue(false);
  }
}

export default MneErpBuilddiaryPresentTable;
