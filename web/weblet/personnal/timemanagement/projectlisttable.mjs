//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/personnal/timemanagement/projectlisttable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'
import MneInput     from '/js/basic/input.mjs'

import MneDbTableView from '/weblet/db/table/view.mjs'

class MneErpPersonnalTimemanagementProjectlistTable extends MneDbTableView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  reset()
  {
    super.reset();
  }

  async load()
  {
    await super.load();
    this.obj.container.content.setAttribute('draggable', false);
  }

  async selectRow(data, row, evt = {})
  {
    await super.selectRow(data, row, evt);
    this.config.composeparent.obj.weblets['person'].newvalues = true;
    this.config.composeparent.obj.weblets['person'].obj.run.dependweblet = this;
  }
  
  async values()
  {
    await super.values();
    this.obj.tbody.querySelectorAll('tr').forEach( ( item) =>
    {
      item.setAttribute('draggable', true);
      item.addEventListener('dragstart', (evt) =>
      {
        var res = Object.assign({}, this.obj.run.result);
        res.hides = this.initpar.draghidecols ?? this.initpar.tablehidecols;
        res.values = [ ... item.values];

        document.mnedragend = [];

        evt.dataTransfer.setData('mnetimemanagementproject', JSON.stringify(res));
        evt.dataTransfer.setDragImage(item.querySelector('span[shortid="' + this.initpar.dragid + '"]'), 0, 0);
      });
      
      item.addEventListener('dragend', (evt) =>
      {
         document.mnedragend.forEach( (item) => { item.dragend(evt) } );
      });
      
    })
  }
  
}

export default MneErpPersonnalTimemanagementProjectlistTable;
