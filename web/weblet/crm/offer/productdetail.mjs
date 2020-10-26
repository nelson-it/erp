//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/offer/productdetail.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpOfferProduct extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema      : 'mne_crm',
        query       : 'offerproduct',
        table       : 'offerproduct',

        typeselect  : 'offerproducttype',

      showids       : ['offerproductid'],

      okfunction : 'offerproduct_ok',
      okcols     : [ 'offerproductid', 'offerproducttype', 'withworkingstep', 'position', 'productid', 'productoptid', 'productcurrencyid', 'productcurrencyrate', 'xproductdescription', 'productname', 'productnumber', 'count', 'productprice', 'productcost', 'productcostrecalc', 'productunit', 'productvat'],
      oktyps     : { 'withworkingstep' : 'bool', 'position' : 'long', 'productcurrencyrate' : 'double', 'count' : 'double', 'productprice' : 'double', 'productcost' : 'double', 'productcostrecalc' : 'bool', 'productvat' : 'double' },

      addfunction : 'offerproduct_add',
      addcols     : [ 'offerid', 'offerproducttype', 'productid' ],
      addpopup    : 'productselect',
      
      delfunction : 'offerproduct_del',
      delcols : [ 'offerproductid' ],
      deltyps : {},

      delconfirmids : [ 'productname'],

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

    this.obj.mkbuttons.push( { id : 'calculate', value : MneText.getText("#mne_lang#Kosten berechnen"), space : 'before', show : this.initpar.calcfunction });

    this.obj.enablebuttons.buttons.push('calculate');
    this.obj.enablebuttons.value.push('calculate');
  }
  
  async load()
  {
    await super.load();
    this.obj.checkboxs.view.checked = (this.obj.run.viewnum == 1);
  }
  
  async view(data, obj, evt)
  {
    var text;
    if ( this.obj.inputs.productdescription )
    {
      this.obj.inputs.xproductdescription.modValue(this.obj.inputs.productdescription.getValue());
      text = this.obj.inputs.productdescription.editor.getValue(true);
    }
    else
    {
      text = this.obj.htmlvalue;
    }

    await super.view(data, obj, evt);
    
    if ( text && this.obj.inputs.productdescription )
      this.obj.inputs.productdescription.modValue(text);
    else
      this.obj.htmlvalue = text;

    return false;
  }
  
  async calculate()
  {
    var p =
    {
        "schema" : "mne_crm",
        "query"  : "offercost",
        "cols"   : "offerproductcost",
        "offerproductidInput.old" : this.obj.run.values.offerproductid,
        "sqlstart" : 1,
        "sqlend" : 1
    };

    var res = await MneRequest.fetch("/db/utils/query/data.json",  p);
    this.obj.inputs.productcost.modValue(res.values[0][res.rids.offerproductcost]);
    
    return false;
  }

  async add()
  {
    await this.openpopup(this.initpar.addpopup, {}, { noclose : true, selectok : async (res) =>
    {
      var p =
      {
          schema : this.initpar.addschema ?? this.initpar.okschema ?? this.initpar.schema,
          name   : this.initpar.addfunction,

        sqlstart : 1,
          sqlend : 1
      };

      p = this.addParam(p, "par0", this.config.dependweblet.obj.run.values['offerid']);
      p = this.addParam(p, "par1", this.config.dependweblet.obj.run.values['offerproducttype']);
      p = this.addParam(p, "par2", res.values[0][res.rids.productid]);

      await MneRequest.fetch('/db/utils/connect/func/execute.json', p);

      this.parent.newvalues = true;
      return true;
    }});
    
    this.close();
    return false;
  }

  async ok()
  {
    if ( this.obj.inputs.productdescription ) this.obj.inputs.xproductdescription.modValue(this.obj.inputs.productdescription.getValue());
    return super.ok();
  }

}

export default MneErpOfferProduct;
