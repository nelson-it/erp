//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/company/detail.mjs
//================================================================================
'use strict';

import MneElement from '/weblet/basic/element.mjs'
import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneDbView   from '/weblet/db/view.mjs'

class MneCrmCompanyDetail extends MneDbView
{
    constructor(parent, frame, id, initpar = {}, config = {} )
    {
      var ivalues = 
      {
        readurl : '',
        schema  : 'mne_crm',
        query   : 'company',
        showids : ['companyid'],
        
        addfunction : 'company_add',
        addcols : ['company', 'sorting', 'ownerid', 'categorie', 'email', 'fax', 'http', 'language', 'telefon', 'mobile', 'postbox', 'street','cityid'],
        addtyps : {},

        modfunction : 'company_mod',
        modcols : ['companyid', 'company', 'sorting', 'ownerid', 'categorie', 'email', 'fax', 'http', 'language', 'telefon', 'mobile', 'postbox', 'street','cityid'],
        modtyps : {},

        delfunction : 'company_del',
        delcols : [ 'companyid' ],
        deltyps : [],
        delconfirmids : [ 'company' ],
        
        selectlists : { categorie : 'companycategorie' },
        
        report : 'mne_company_detail',
        
        drop : true,
        hinput : false
      };
           
      super(parent, frame, id, Object.assign(ivalues, initpar), config );
    }
    
    reset()
    {
      super.reset();
      
      this.obj.mkbuttons.push( { id : 'vcard', value : MneText.getText("#mne_lang#Vcard"), behind : 'report', space : 'before'})
    }
    
    getViewPath() { return this.getView(import.meta.url) }

    async vcard()
    {
      await this.openpopup('vcardimport');
    }
    
    setVcard (name, value)
    {
      if ( name == 'city' && this.obj.inputs.cityid.getValue(false) != '' )
        this.obj.outputs.city.modValue(value);
      
      else if ( name == 'postcode' && this.obj.inputs.cityid.getValue(false) != '' )
        this.obj.outputs.postcode.modValue(value);
    }
}

export default MneCrmCompanyDetail;
