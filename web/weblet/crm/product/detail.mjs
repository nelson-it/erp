//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/templ/templ.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneTemplate extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      url           : '',
      schema        : 'mne_crm',
      query         : 'product',
      table         : '',
      showids       : ['productid'],

      addfunction : 'product_add',
      addcols : ['name', 'productnumber', 'xdescription', 'withworkingstep', 'treeparentid'],
      addtyps : { withworkingstep : 'bool' },

      modfunction : 'product_mod',
      modcols : ['productid', 'name', 'productnumber', 'xdescription', 'withworkingstep', 'treeparentid'],
      modtyps : { withworkingstep : 'bool' },

      delfunction : 'product_del',
      delcols : [ 'productid' ],
      deltyps : {},
      delconfirmids : [ 'name'],


      hinput : false 
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url).replace(/\.html$/, this.obj.run.viewnum + ".html")  }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  reset()
  {
    super.reset();
    this.obj.run.viewnum = 2;
  }
  
  async load()
  {
    await super.load();
    this.obj.checkboxs.view.checked = (this.obj.run.viewnum == 1);
  }
  
  async view(data, obj, evt)
  {
    var text;
    if ( this.obj.inputs.description )
    {
      this.obj.inputs.xdescription.modValue(this.obj.inputs.description.getValue());
      text = this.obj.inputs.description.editor.getValue(true);
    }
    else
    {
      text = this.obj.htmlvalue;
    }

    await super.view(data, obj, evt);
    
    if ( text && this.obj.inputs.description )
      this.obj.inputs.description.modValue(text);
    else
      this.obj.htmlvalue = text;

    return false;
  }
  async ok()
  {
    if ( this.obj.inputs.description ) this.obj.inputs.xdescription.modValue(this.obj.inputs.description.getValue());
    return super.ok();
  }
  
}

export default MneTemplate;
