//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/order/productdetail.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpOrderProduct extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema      : 'mne_crm',
        query       : 'orderproduct',
        table       : 'orderproduct',

        typeselect  : 'orderproducttype',

      showids       : ['orderproductid'],

      okfunction : 'orderproduct_ok',
      okcols     : [ 'orderproductid', 'offerproductid', 'position', 'withworkingstep', 'xproductdescription', 'productcurrencyid', 'productid', 'orderproducttype', 'timeauto', 'showdeliver', 'productcostrecalc', 'productpricecalc', 'productcostcalc', 'productvat', 'ready', 'productname', 'productnumber', 'count', 'actcount', 'productunit', 'productprice', 'productcost'] , 
      oktyps     : { position : "long", withworkingstep : "bool", timeauto : "bool", showdeliver : "bool", productcostrecalc : "bool", productpricecalc : "double", productcostcalc : "double", productvat : "double", ready : "bool", count : "double", actcount : "double", productprice : "double", productcost : "double" }, 

      addfunction : 'orderproduct_add',
      addcols     : [ 'orderid', 'orderproducttype', 'productid' ],
      addpopup    : 'productselect',
      
      delfunction : 'orderproduct_del',
      delcols : [ 'orderproductid' ],
      deltyps : {},

      delconfirmids : [ 'productname'],

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url).replace(/\.html$/, this.obj.run.viewnum + ".html")  }
  getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  reset()
  {
    super.reset();
    this.obj.run.viewnum = 2;

    this.obj.mkbuttons.push( { id : 'calculate', value : MneText.getText("#mne_lang#Kosten berechnen"), space : 'before', show : this.initpar.calcfunction });
    this.obj.mkbuttons.push( { id : 'calcmod',   value : MneText.getText("#mne_lang#Kal. Kosten ändern"),  });

    this.obj.enablebuttons.buttons.push('calculate');
    this.obj.enablebuttons.values.push('calculate');
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
        "query"  : "ordercost",
        "cols"   : "orderproductcost",
        "orderproductidInput.old" : this.obj.run.values.orderproductid,
        "sqlstart" : 1,
        "sqlend" : 1
    };

    var res = await MneRequest.fetch("/db/utils/query/data.json",  p);
    this.obj.inputs.productcost.modValue(res.values[0][res.rids.orderproductcost]);
    
    return false;
  }
  
  async calcmod()
  {
    this.obj.inputs.productpricecalc.disabled = false;
    this.obj.inputs.productcostcalc.disabled = false;
    return false; 
  }

  async add(data)
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

      p = this.addParam(p, "par0", this.config.dependweblet.obj.run.values['orderid']);
      p = this.addParam(p, "par1", this.config.dependweblet.obj.run.values['orderproducttype']);
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
  
  async values()
  {
    this.obj.inputs.productpricecalc.disabled = true;
    this.obj.inputs.productcostcalc.disabled = true;
    
    return super.values();
  }

}

export default MneErpOrderProduct;
