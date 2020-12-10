//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/person/detail.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'
import MneConfig   from '/js/basic/config.mjs'
import MneInput    from '/js/basic/input.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView   from '/weblet/db/view.mjs'

class MneCrmPersonDetail extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema  : 'mne_crm',
        query   : 'person_detail',
        showids : ['personid'],
        
        picschema : 'mne_crm',
        pictable  : 'personpicture',
        picid     : 'personpictureid',
        
        addfunction : 'person_add',
        addcols : [ "firstname", "lastname", "ownerid", "sex", "sign", "sorting", "birthday", "email", "http", "role", "telephonoffice", "telephonpriv", "telephonmobil", "language", "addressid", "refid", "postbox", "street", "cityid", "picture" ],
        addtyps : { sex : 'long', birthday : 'long' },

        modfunction : 'person_mod',
        modcols : [ "personid", "firstname", "lastname", "ownerid", "sex", "sign", "sorting", "birthday", "email", "http", "role", "telephonoffice", "telephonpriv", "telephonmobil", "language", "addressid", "refid", "postbox", "street", "cityid", "picture" ],
        modtyps : { sex : 'long', birthday : 'long' },

        delfunction : 'person_del',
        delcols : [ 'personid' ],
        deltyps : [],
        delconfirmids : [ 'fullname' ],
        
        defvalues : { language : 'de' },
        
        links : { refname : { name : 'crm_company', values : { companyid : 'refid' }} },
        
        selectlists : { categorie : 'companycategorie' },

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }

  reset()
  {
    super.reset();
    
    this.obj.mkbuttons.push( { id : 'oaddr', value : MneText.getText("#mne_lang#eigene Adresse#"), space : 'before'});
    this.obj.mkbuttons.push( { id : 'raddr', value : MneText.getText("#mne_lang#geerbte Adresse#") });
    this.obj.mkbuttons.push( { id : 'vcard', value : MneText.getText("#mne_lang#Vcard")})
    this.obj.mkbuttons.push( { id : 'delpic', value : MneText.getText("#mne_lang#Bild löschen#"), space : 'before' });
    
    this.obj.defvalues.language = MneConfig.language;
    this.obj.defvalues.ownerid = MneConfig.personid;
    this.obj.defvalues.ownername = MneConfig.fullname;
    
    this.obj.filecontent = null;
    
  }
  
  async load ()
  {
    await super.load();
    this.obj.observer.refid = new MutationObserver( (muts) => { this.check_address( { addressid : this.obj.inputs.addressid.getValue(false), refid : this.obj.inputs.refid.getValue(false) }); });
    this.obj.observer.refid.observe ( this.obj.inputs.refid,  { subtree : true, attributes: true } );

    this.obj.files.picture.addEventListener('change', (evt) =>
    {
      this.obj.filecontent = MneInput.readfile(evt.target.files[0]);
    });
 
  }
  
  check_address (values)
  {
    if ( values.addressid != '' || values.refid == '' )
    {
      this.obj.buttons.oaddr.disabled = true;
      this.obj.buttons.raddr.disabled = false;

      this.obj.inputs.street.disabled = false;
      this.obj.inputs.postbox.disabled = false;

      MneElement.mkClass(this.obj.outputs.city.parentNode, 'disabled', false);
      MneElement.mkClass(this.obj.outputs.city, 'disabled', false);
      MneElement.mkClass(this.obj.outputs.postcode, 'disabled', false);
      MneElement.mkClass(this.obj.outputs.country, 'disabled', false);
    }
    else
    {
      this.obj.buttons.oaddr.disabled = false;
      this.obj.buttons.raddr.disabled = true;

      this.obj.inputs.street.disabled = true;
      this.obj.inputs.postbox.disabled = true;

      MneElement.mkClass(this.obj.outputs.city.parentNode, 'disabled', true);
      MneElement.mkClass(this.obj.outputs.city, 'disabled', true);
      MneElement.mkClass(this.obj.outputs.postcode, 'disabled', true);
      MneElement.mkClass(this.obj.outputs.country, 'disabled', true);
    }
    
    if ( values.refid == '' )
      this.obj.buttons.raddr.disabled = true;
  }
  
  async oaddr()
  {
    this.obj.inputs.addressid.modValue('################');
    this.obj.inputs.street.clearValue();
    this.obj.inputs.postbox.clearValue();
    this.obj.outputs.city.clearValue();
    this.obj.outputs.postcode.clearValue();
    this.check_address({addressid : '################', refid : this.obj.run.values.refid })
  }
  
  async raddr()
  {
    this.obj.inputs.addressid.modValue('');
    this.obj.inputs.street.modValue('');
    this.obj.inputs.postbox.modValue('');
    this.obj.outputs.city.modValue('');
    this.obj.outputs.postcode.modValue('');
    
    this.check_address({addressid : '', refid : this.obj.run.values.refid })
  }
  
  async delpic()
  {
    if ( this.confirm( MneText.getText("#mne_lang#Bild wirklich löschen ?")) )
    {
      var p = { schema : this.initpar.picschema, table : this.initpar.pictable, sqlstart : 1, sqlend : 1 }
      p[this.initpar.picid + "Input.old"] = this.obj.run.values.personid;
      await MneRequest.fetch('/db/utils/table/delete.json', p);
      this.newvalues = true;
    }
  }
  
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

  
  async ok()
  {
    var val = await this.obj.filecontent;
    this.obj.inputs.picture.modValue( ( this.obj.filecontent ) ? this.obj.files.picture.files[0].type + ':' + val : '');

    console.log(this.obj.inputs.picture.getValue())
    return super.ok();  
  }
  
  async values()
  {
    await super.values();

    this.obj.filecontent = null;
    this.check_address(this.obj.run.values);
    var img = ( this.obj.run.values.havepicture ) ? "url('/db/utils/table/file.data?schema=mne_crm&table=personpicture&cols=picture&personpictureidInput.old="
                                                    + this.obj.run.values.personid
                                                    + "&count="
                                                    + (new Date()).getTime()
                                                    + "&sqlstart=1&sqlend=1')"
              : (this.obj.run.values.sex == "1") ? "url('weblet/crm/person/male.png')" : "url('weblet/crm/person/female.png')";
    
    this.obj.container.content.querySelector('#pictureImage').style.backgroundImage = img;                                            
  }

}

export default MneCrmPersonDetail;
