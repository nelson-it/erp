//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/offer/detail.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpCrmOfferDetail extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema        : 'mne_crm',
      query         : 'offer_detail',
      showids       : ['offerid'],
      
      okfunction : 'offer_ok',
      okcols : ['offerid', 'ownerid', 'contactid', 'refid', 'offernumber', 'version', 'description', 'xtext', 'language', 'withvat', 'lumpsum'],
      oktyps : { version : 'long', withvat : 'long', lumpsum : 'long' },

      delfunction : 'offer_del',
      delcols : [ 'offerid' ],
      deltyps : {},
      delconfirmids : [ 'description'],

      copyfunction : 'offer_copy',
      oaddfunction : 'offer_add',
      calcfunction : 'offerproduct_calculate_all',
      stdfunction : 'offerproduct_standard',
      orderfunction : 'offer_order',

      links  : {},
      report : 'mne_offerdetail',
      
      orderscreen : 'crm_order',
      
      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url).replace(/\.html$/, this.obj.run.viewnum + ".html")  }

  reset()
  {
    super.reset();

    this.obj.run.viewnum = 2;
    
    this.obj.mkbuttons.push( { id : "version", value : MneText.getText("#mne_lang#neue Version#"), space : 'before' });
    this.obj.mkbuttons.push( { id : "copy", value : MneText.getText("#mne_lang#Angebot kopieren#",) });
    this.obj.mkbuttons.push( { id : "oadd", value : MneText.getText("#mne_lang#Angebot hinzufügen#") });
    this.obj.mkbuttons.push( { id : "calculate", value : MneText.getText("#mne_lang#Kosten berechnen#") , space : 'before' });
    this.obj.mkbuttons.push( { id : "standard", value : MneText.getText("#mne_lang#Produktstandard übernehmen#") });
    this.obj.mkbuttons.push( { id : "order", value : MneText.getText("#mne_lang#Auftrag#"), space : 'before' });

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
  
  async version()
  {
    var p =
    {
        schema : this.initpar.schema,
        name : this.initpar.copyfunction,
        par0 : this.obj.run.values.offerid,
        typ0 : "text",
        sqlstart : 1,
        sqlend : 1   
    }
    var res = await MneRequest.fetch('/db/utils/connect/func/execute.json', p);
    this.obj.run.values.offerid = res.result;
    this.dependweblet = this;

  }
  
  async copy ()
  {
    var p =
    {
        schema : this.initpar.schema,
        name : this.initpar.copyfunction,
        par0 : this.obj.run.values.offerid,
        typ0 : "text",
        sqlstart : 1,
        rollback : true
    }

    var res = await MneRequest.errfetch('/db/utils/connect/func/execute.json', p );

    this.obj.run.values.offerid = res.result;
    this.dependweblet = this;
    await this.values({sqlstart : 0 });
    
    this.obj.inputs.description.modValue("#mne_lang#Kopie von " + this.obj.run.values.description);
    this.obj.inputs.offernumber.modValue("#mne_lang#Kopie von " + this.obj.run.values.offernumber);
    this.obj.inputs.version.modValue(1);
    
    return this.ok({sqlstart : 0 });
  }
  
  async oadd()
  {
    this.openpopup(this.id + 'addselect', {}, { selectok : async (res) =>
    {
      if ( res.values.length == 0 ) return;
      
      var p =
      {
          schema : this.initpar.schema,
          name : this.initpar.oaddfunction,
          par0 : this.obj.run.values.offerid,
          par1 : res.values[0][res.rids.offerid],
        sqlstart : 1,
          sqlend : 1   
      }
      var res = await MneRequest.fetch('/db/utils/connect/func/execute.json', p);
      this.newvalues = true;
      return true;
    }});
  }
  
  async calculate ()
  {
    var p =
    {
        schema : this.initpar.schema,
        name : this.initpar.calcfunction,
        par0 : this.obj.run.values.offerid,
        typ0 : "text",
        par1 : "null",
        typ1 : "long",
        sqlstart : 1,
        sqlend : 1   
    }

    if ( this.confirm("#mne_lang#Wirklich alle manuell veränderten Kosten der Produkte überschreiben?" ) != true )
      return;

    await MneRequest.fetch('/db/utils/connect/func/execute.xml', p);
    this.newvalues = true;
  }

  standard ()
  {
    var p =
    {
        schema : this.initpar.schema,
        name : this.initpar.stdfunction,
        par0 : this.obj.run.values.offerid,
        typ0 : "text",
        sqlstart : 1,
        sqlend : 1   
    }

    if ( this.confirm("#mne_lang#Wirklich alle indiduellen Einstellungen der Produkte überschreiben?" ) != true )
      return false;

    MneRequest.fetch('/db/utils/connect/func/execute.json', p);
    this.newvalues = true;
  }
  
  print()
  {
    var p =
    {
        wval : this.obj.run.values.offerid,
        wop  : "=",
        wcol : 'offerid',
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
  
  async order()
  {
    var res;
    var values = {};
    var p =
    {
        schema : this.initpar.schema,
        name : this.initpar.orderfunction,
        par0 : this.obj.run.values.offerid,
        typ0 : "text",
        sqlstart : 1,
        sqlend : 1   
    }

    if ( this.confirm(MneText.sprintf(MneText.getText("#mne_lang#Angebot <$1> wirklich zu einem Auftrag machen"), this.obj.run.values[this.initpar.delconfirmids[0]])) != true )
      return false;

    res = await MneRequest.fetch('/db/utils/connect/func/execute.json', p);
    values['orderid'] = res.result;
    this.showweblet(this.initpar.orderscreen, values, {});

    return false;
  }

  async add()
  {
    this.initpar.links.refname = undefined;
    return super.add();
  }

  async ok()
  {
    if ( this.obj.inputs.text ) this.obj.inputs.xtext.modValue(this.obj.inputs.text.getValue());
    return super.ok();
  }
  
  async values(param)
  {
    await super.values(param);
    
    if ( this.obj.run.values.refid && this.obj.run.values.refid != '' )
      this.initpar.links.refname  = ( this.obj.run.values.refiscompany ) ? { name : 'crm_company', values : { companyid : 'refid' }} : { name : 'crm_person', values : { personid : 'refid' }};
  }
  
}

export default MneErpCrmOfferDetail;
