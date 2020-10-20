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
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpHoaiCompute extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        law      : '2013_35',
        feetable : 'fee',
        
        workschema  : 'mne_hoai',
        workquery   : 'workphase',
        
        delbutton : 'add,del',
        defvalues : { year : '2013', law : '2013_35', zone : '3', ansatz : '1.00' },
        
        selectlists : { zone : 'hoai_zone', ansatz : 'hoai_ansatz' },
        
      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }

  async reset()
  {
    super.reset();
    
    this.obj.mkbuttons.push({ id : 'compute', value : MneText.getText('#mne_lang#Berechnen'), space : 'before'});
  }

  async findIOParam()
  {
    var valname = [ 'leistung', 'zuschlagr', 'nebenkostenr', 'gesammt' ];
    
    this.obj.inputs.pauschal.noautoread = true;
    this.obj.inputs.pauschal.setTyp('bool', MneInput.checktype.ok, '');
    
    valname.forEach( (item) => { this.obj.inputs[item].noautoread = true; });
    [ 1,2,3,4,5,6,7,8,9 ].forEach( ( item ) => { this.obj.outputs[item + 'r'].noautoread = true, this.obj.inputs['l' + item].addEventListener('input', (evt) => { this.obj.buttons.ok.disabled = true; }); });

    await super.findIOParam();
    valname.forEach( (item) => { this.obj.inputs[item].setTyp('double', MneInput.checktype.ok, ''); });
  }

  async load()
  {
    await super.load();
    this.obj.inputs.year.addEventListener('change', (evt) => { this.change_year() } );
    this.obj.inputs.law.addEventListener('change', (evt) => { this.btnClick('change_law', this.obj.inputs.law, evt); } );
  }
  
  change_year()
  {
    var checkvalue = ( this.obj.inputs.year.getValue() == 2013 ) ? 0 : -1;
    var law = this.obj.inputs.law.getValue();
    var newlaw = false;
    
    Array.from(this.obj.inputs.law.children).forEach( ( item, index) =>
    {
      item.style.display = ( item.value.indexOf('2013') == checkvalue ) ? 'unset' : 'none';
      if ( item.value == law && item.style.display == 'none' ) newlaw = true;
    });

    if ( newlaw )
    {
      this.obj.inputs.law.modValue( ( checkvalue == 0 ) ? '2013_35' : '34_1' );
      this.btnClick('change_law', this.obj.inputs.law );
    }
  }

  async change_law()
  {
    var i;
    var param =
    {
        schema : this.initpar.schema,
        table  : this.initpar.feetable,

        cols : 'zone',
        scols : 'zone',

        distinct : '1',

        sqlstart : 1,
        sqlend : 1
    }
    this.addParam(param, "lawInput.old", this.obj.inputs.law);

    var res = await MneRequest.fetch('/db/utils/table/data.json', param )
    var endzone = ( res.values.length > 0 ) ? endzone = res.values[res.values.length-1][0] : 0;

    for ( i = 0; i< this.obj.inputs.zone.childNodes.length; i++)
      this.obj.inputs.zone.childNodes[i].style.display = ( i < endzone ) ? 'unset' : 'none';

    param = 
    {
        schema : this.initpar.workschema,
        query  : this.initpar.workquery,
        cols : 'phasename1,value1,phasename2,value2,phasename3,value3,phasename4,value4,phasename5,value5,phasename6,value6,phasename7,value7,phasename8,value8,phasename9,value9',

        sqlstart : 1,
        sqlend : 1
    }
    this.addParam(param, "lawInput.old", this.obj.inputs.law);

    res = await MneRequest.fetch('/db/utils/query/data.json', param);

    for ( i = 0; i < 9; i++)
    {
      this.obj.inputs['l' + ( i + 1)].setValue(res.values[0][2 * i + 1]);
      this.obj.outputs['phasename' + (i + 1 )].setValue(res.values[0][2 * i]);
      this.obj.outputs[(i + 1) + 'r'].setValue('');
    }
    
    this.obj.buttons.ok.disabled = true;

  }
  
  async compute()
  {
    var i;
    var result;
    var prozent;
    

    var param = 
    {
        schema : this.initpar.schema,
        table  : this.initpar.feetable,

        cols   : 'startfee,endfee,cost',
        wcol   : 'law,cost,zone',
        scols  : '!cost',

        sqlstart : "1",
        sqlend : "1"
    }

    var k = MneInput.getValue(this.obj.inputs.kosten.getValue(),'long');

    param.wop = '=,<,=';
    param.wval = this.obj.inputs.law.getValue() + ',' + k + ',' + this.obj.inputs.zone.getValue();


    var res = await MneRequest.fetch('/db/utils/table/data.json', param );

    if ( res.values.length == 0 )
    {
      MneLog.warning("Honorar kann frei vereinbart werden");
      return;
    }

    var lmin  = MneInput.getValue(res.values[0][0], 'double');
    var lmax  = MneInput.getValue(res.values[0][1], 'double');
    var lcost = MneInput.getValue(res.values[0][2], 'double');

    param.wop = '=,>=,=';
    param.scols = 'cost';

    var res = await MneRequest.fetch('/db/utils/table/data.json', param );

    if ( res.values.length == 0 )
    {
      MneLog.warning("Honorar kann frei vereinbart werden");
      return;
    }

    var umin  = MneInput.getValue(res.values[0][0], 'double');
    var umax  = MneInput.getValue(res.values[0][1], 'double');
    var ucost = MneInput.getValue(res.values[0][2], 'double');

    var cost = this.obj.inputs.kosten.getValue();

    var minsatz = lmin + (( umin - lmin ) / ( ucost - lcost )) * ( cost - lcost );
    var maxsatz = lmax + (( umax - lmax ) / ( ucost - lcost )) * ( cost - lcost );

    var satz = minsatz + (( maxsatz - minsatz ) * parseFloat(this.obj.inputs.ansatz.value));

    this.obj.inputs.pauschal.modValue(satz < 10000);

    this.obj.inputs.leistung.modValue( parseInt(parseInt(satz * 100.0) / 100));
    this.obj.inputs.zuschlagr.modValue(parseInt(parseInt((this.obj.inputs.zuschlag.getValue() / 100.0 * satz ) * 100 ) / 100.0));
    this.obj.inputs.nebenkostenr.modValue( parseInt( parseInt((this.obj.inputs.neben.getValue() / 100.0 ) * ( satz + (this.obj.inputs.zuschlag.getValue() / 100.0 * satz ) + this.obj.inputs.zusatz.getValue() + this.obj.inputs.besonders.getValue() + this.obj.inputs.zeit.getValue()) * 100) / 100));
    this.obj.inputs.gesammt.modValue(parseInt(parseInt(( satz + this.obj.inputs.zuschlagr.getValue() + this.obj.inputs.zusatz.getValue() + this.obj.inputs.besonders.getValue() + this.obj.inputs.zeit.getValue() + this.obj.inputs.nebenkostenr.getValue()) * 100) / 100));

    prozent = 0.0;
    [ 1,2,3,4,5,6,7,8,9 ].forEach( (item ) =>
    {
      if ( this.obj.inputs['l' + item].value != '' )
      {
        this.obj.outputs[item + 'r'].modValue('= ' + parseInt(parseInt(( satz * parseFloat(MneInput.mkNull(this.obj.inputs['l' + item].getValue())) / 100.0 ) * 100 + 0.5) / 100));
        prozent += this.obj.inputs['l' + item].getValue()
      }
    });
   
      [ 1,2,3,4,5,6,7,8,9 ].forEach( ( item) => { MneElement.mkClass(this.obj.outputs['phasename' + item], ( prozent != 100 ) ? 'modifywrong' : 'modifyno', true, 'modify')});
    if ( prozent != 100 )
      {
      MneLog.warning(MneText.getText('#mne_lang#Prozentsumme ist ungleich 100'));
      }
    
    this.obj.buttons.ok.disabled = false;
  }
  
  async enter()
  {
    return this.compute();
  }

  async ok()
  {
    var p =
    {
      sqlstart : 1,
        schema : this.initpar.schema,
        name  : this.initpar.vokfunction,
        typ0  : "text",
        typ1  : "text",
        typ2  : "double",
        typ3  : "double",
        typ4  : "double",
        typ5  : "double",
        typ6  : "double",
        typ7  : "double",
        typ8  : "double",
        typ9  : "double",
        typ10 : "double",
        typ11 : "double",
        typ12 : "double",
        typ13 : "double",
        typ14 : "double",
        typ15 : "double",
        typ16 : "double",
        typ17 : "bool"
    }

    p = this.addParam(p, "par0",  this.obj.inputs.refid);
    p = this.addParam(p, "par1",  this.obj.inputs.law);
    p = this.addParam(p, "par2",  this.obj.inputs.leistung);
    p = this.addParam(p, "par3",  this.obj.inputs.zuschlagr);
    p = this.addParam(p, "par4",  this.obj.inputs.zeit);
    p = this.addParam(p, "par5",  this.obj.inputs.besonders);
    p = this.addParam(p, "par6",  this.obj.inputs.zusatz);
    p = this.addParam(p, "par7",  this.obj.inputs.nebenkostenr);
    p = this.addParam(p, "par8",  this.obj.outputs['1r'].getValue().substr(2));
    p = this.addParam(p, "par9",  this.obj.outputs['2r'].getValue().substr(2));
    p = this.addParam(p, "par10", this.obj.outputs['3r'].getValue().substr(2));
    p = this.addParam(p, "par11", this.obj.outputs['4r'].getValue().substr(2));
    p = this.addParam(p, "par12", this.obj.outputs['5r'].getValue().substr(2));
    p = this.addParam(p, "par13", this.obj.outputs['6r'].getValue().substr(2));
    p = this.addParam(p, "par14", this.obj.outputs['7r'].getValue().substr(2));
    p = this.addParam(p, "par15", this.obj.outputs['8r'].getValue().substr(2));
    p = this.addParam(p, "par16", this.obj.outputs['9r'].getValue().substr(2));
    p = this.addParam(p, "par17", this.obj.inputs.pauschal.getValue());

    var res = await MneRequest.errfetch('/db/utils/connect/func/execute.json', p );

    var val = {};
    val['law'] = this.obj.inputs.law.getValue();
    val[this.initpar.refid] = this.obj.inputs.refid.getValue();

    p = 
    {
        schema : this.initpar.schema,
        table  : this.initpar.table,

        l1Input : this.obj.inputs.l1.getValue(),
        l2Input : this.obj.inputs.l2.getValue(),
        l3Input : this.obj.inputs.l3.getValue(),
        l4Input : this.obj.inputs.l4.getValue(),
        l5Input : this.obj.inputs.l5.getValue(),
        l6Input : this.obj.inputs.l6.getValue(),
        l7Input : this.obj.inputs.l7.getValue(),
        l8Input : this.obj.inputs.l8.getValue(),
        l9Input : this.obj.inputs.l9.getValue(),

        ansatzInput    : this.obj.inputs.ansatz.getValue(),
        besondersInput : this.obj.inputs.besonders.getValue(),
        kostenInput    : this.obj.inputs.kosten.getValue(),
        lawInput       : this.obj.inputs.law.getValue(),
        nebenInput     : this.obj.inputs.neben.getValue(),
        zeitInput      : this.obj.inputs.zeit.getValue(),
        zoneInput      : this.obj.inputs.zone.getValue(),
        zusatzInput    : this.obj.inputs.zusatz.getValue(),
        zuschlagInput  : this.obj.inputs.zuschlag.getValue(),
        pauschalInput  : this.obj.inputs.pauschal.getValue(),

        modifyinsert   : 1,
        sqlend : 1
    };

    p[this.initpar.refid + "Input"]     = this.obj.inputs.refid.getValue();
    p[this.initpar.refid + "Input.old"] = this.obj.inputs.refid.getValue();

    res = await MneRequest.errfetch( this.obj.run.btnrequest[this.obj.run.okaction],  p );
    this.newvalues = true;
  }

  async add(data)
  {
    await super.add(data);
    this.obj.doadd = true;
    
    this.change_year();
    this.btnClick('change_law', this.obj.inputs.law );
    this.obj.buttons.ok.disabled = true;
  }
  
  async values()
  {
    this.obj.doadd = false;
    this.obj.defvalues.refid = this.config.dependweblet.obj.run.values[this.initpar.refid];
    
    await super.values();

    if ( this.obj.doadd == false )
    {
      await this.change_law();
      [ 'l1','l2','l3','l4','l5','l6','l7','l8','l9'].forEach( ( item ) => { this.obj.inputs[item].setValue(this.obj.run.values[item])});
      await this.compute();
      this.modClear();
    }
  }
}

export default MneErpHoaiCompute;
