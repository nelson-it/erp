//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/shipment/invoiceauto.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpShipmentInvoiceauto extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema  : 'mne_shipment',
      query   : 'invoicemanagement_auto',
      showids : [ 'invoiceauto'],
      distinct : true,
      
      invoiceprint   : "invoiceprint",
      reminder1print : "reminder1print",
      reminder2print : "reminder2print",
      reminder3print : "reminder3print",

      invoiceopen    : "invoiceopen",
      reminder1open  : "reminder1open",
      reminder2open  : "reminder2open",
      reminder3open  : "reminder3open",

      invoice      : "invoice",
      reminder1    : "reminder1",
      reminder2    : "reminder2",
      reminder3    : "reminder3",
      
      delbutton : 'cancel',
      
      regexp : { invoiceauto : 'ok' },
      
      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }
 
  reset()
  {
    super.reset();
    
    this.obj.run.title.add = this.config.label;
    this.obj.run.title.mod = this.config.label;

  }

  async print()
  {
    this.printparam = Array();
    this.printparam[0] = { schema : this.initpar.schema, autoreport : this.initpar.invoiceprint,   selwcol : "invoiceauto", selwop : "=", selwval : this.obj.inputs.invoiceauto.getValue() };
    this.printparam[1] = { schema : this.initpar.schema, autoreport : this.initpar.reminder1print, selwcol : "invoiceauto", selwop : "=", selwval : this.obj.inputs.invoiceauto.getValue() };
    this.printparam[2] = { schema : this.initpar.schema, autoreport : this.initpar.reminder2print, selwcol : "invoiceauto", selwop : "=", selwval : this.obj.inputs.invoiceauto.getValue() };
    this.printparam[3] = { schema : this.initpar.schema, autoreport : this.initpar.reminder3print, selwcol : "invoiceauto", selwop : "=", selwval : this.obj.inputs.invoiceauto.getValue() };

    this.initpar.report = 'autoreport';
    var param = this.printparam[this.obj.run.values.ntyp];
    return super.print({ param : param });
  }
  
  async autotext()
  {
    this.initpar.report = 'autoreport';
    var param = { schema : this.initpar.schema, autoreport : this.initpar.invoiceopen, rowwarning : "false", rowwarningtext : '#mne_lang#Keine Rechnungen zum versenden vorhanden' };
    
    return super.print({ param : param });
  }

  async autostart()
  {
    this.initpar.report = 'autoreport';
    var param = { schema : this.initpar.schema, autoreport : this.initpar.invoice, rowwarning : "false", rowwarningtext : '#mne_lang#Keine Rechnungen zum versenden vorhanden' };
    
    return super.print({ param : param });
  }


  async reminder1open()
  {
    this.initpar.report = 'autoreport';
    var param = { schema : this.initpar.schema, autoreport : this.initpar.reminder1open, rowwarning : "false", rowwarningtext : '#mne_lang#Keine Mahnungen zum versenden vorhanden'  };
    
    return super.print({ param : param });
  }
  
  async reminder2open()
  {
    this.initpar.report = 'autoreport';
    var param = { schema : this.initpar.schema, autoreport : this.initpar.reminder2open, rowwarning : "false", rowwarningtext : '#mne_lang#Keine Mahnungen zum versenden vorhanden'  };
    
    return super.print({ param : param });
  }
  
  async reminder3open()
  {
    this.initpar.report = 'autoreport';
    var param = { schema : this.initpar.schema, autoreport : this.initpar.reminder3open, rowwarning : "false", rowwarningtext : '#mne_lang#Keine Mahnungen zum versenden vorhanden'  };
    
    return super.print({ param : param });
  }

  async reminder1()
  {
    this.initpar.report = 'autoreport';
    var param = { schema : this.initpar.schema, autoreport : this.initpar.reminder1, rowwarning : "false", rowwarningtext : '#mne_lang#Keine Mahnungen zum versenden vorhanden'  };
    
    return super.print({ param : param });
  }
  
  async reminder2()
  {
    this.initpar.report = 'autoreport';
    var param = { schema : this.initpar.schema, autoreport : this.initpar.reminder2, rowwarning : "false", rowwarningtext : '#mne_lang#Keine Mahnungen zum versenden vorhanden'  };
    
    return super.print({ param : param });
  }
  
  async reminder3()
  {
    this.initpar.report = 'autoreport';
    var param = { schema : this.initpar.schema, autoreport : this.initpar.reminder3, rowwarning : "false", rowwarningtext : '#mne_lang#Keine Mahnungen zum versenden vorhanden'  };
    
    return super.print({ param : param });
  }

  async values()
  {
    await super.values();
    
    this.obj.buttons.print.disabled = ( ! this.obj.run.values.invoiceauto  || this.obj.run.values.invoiceauto == '################' );
  }

}

export default MneErpShipmentInvoiceauto;
