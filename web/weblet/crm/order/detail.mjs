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

class MneErpOrderDetail extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema : 'mne_crm',
        query  : 'order_detail',
        table  : "order",
      showids       : ['orderid'],
      
      okschema   : 'mne_crm',
      okfunction : 'order_ok',
      okcols     : [ 'orderid', 'ownerid', 'contactid', 'refid', 'ordernumber', 'description', 'xtext', 'language', 'withvat', 'lumpsum', 'open', 'closed', 'color'] , 
      oktyps     : { withvat :  "long", lumpsum :  "long", open : "bool", closed : "bool" },

      delschema     : 'mne_crm',
      delfunction   : 'order_del',
      delcols       : [ 'orderid'],
      delconfirmids : [ 'ordernumber', 'description'],
      
      report : 'mne_orderdetail',

      
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
    
    /*this.obj.mkbuttons.push( { id : "version", value : MneText.getText("#mne_lang#neue Version#"), space : 'before' });
    this.obj.mkbuttons.push( { id : "copy", value : MneText.getText("#mne_lang#Angebot kopieren#",) });
    this.obj.mkbuttons.push( { id : "oadd", value : MneText.getText("#mne_lang#Angebot hinzufügen#") });
    this.obj.mkbuttons.push( { id : "calculate", value : MneText.getText("#mne_lang#Kosten berechnen#") , space : 'before' });
    this.obj.mkbuttons.push( { id : "standard", value : MneText.getText("#mne_lang#Produktstandard übernehmen#") });
    this.obj.mkbuttons.push( { id : "order", value : MneText.getText("#mne_lang#Auftrag#"), space : 'before' });
*/
  }
  
  async load()
  {
    await super.load();
    this.obj.checkboxs.view.checked = (this.obj.run.viewnum == 1);
  }
  
  async view(data, obj, evt)
  {
    var text;
    if ( this.obj.inputs.text )
    {
      this.obj.inputs.xtext.modValue(this.obj.inputs.text.getValue());
      text = this.obj.inputs.text.editor.getValue(true);
    }
    else
    {
      text = this.obj.htmlvalue;
    }

    await super.view(data, obj, evt);
    
    if ( text && this.obj.inputs.text )
      this.obj.inputs.text.modValue(text);
    else
      this.obj.htmlvalue = text;

    return false;
  }
  
  async ok()
  {
    if ( this.obj.inputs.text )
      this.obj.inputs.xtext.modValue(this.obj.inputs.text.getValue());
    
    return super.ok();
  }
  
  print()
  {
    var p =
    {
        wval : this.obj.run.values.orderid,
        wop  : "=",
        wcol : 'orderid',
        sort : '',
        language : this.obj.inputs.language.value,
        xml0   : "lettercontent," + (( this.obj.inputs.text  ) ? this.obj.inputs.text.getValue() : this.obj.inputs.xtext.getValue()),
        macro0 : 'havelettercontent,1',
        sqlstart : 1,
        sqlend : 1
    };

      if ( this.obj.inputs.text && this.obj.inputs.text.getModify() )
        p.macro1 = 'watermark,' + MneText.getText('#mne_lang#Entwurf');

    return super.print({ param : p });
  }


}

export default MneErpOrderDetail;
