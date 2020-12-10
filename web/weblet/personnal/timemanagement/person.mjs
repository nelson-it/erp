//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/personnal/timemanagement/person.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneView    from '/weblet/basic/view.mjs'

class MneErpTimemanagementPerson extends MneView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  reset()
  {
    super.reset();
    this.obj.mkbuttons = [];
    Object.keys(this.obj.enablebuttons).forEach((item) => { this.obj.enablebuttons[item] = []});

    this.obj.htmlcontent = '<div><div><div class="inputarea"><div class="inputgroup"><div class="inputsingle"><span id="allLabel">#mne_lang#Alle Personen</span><input id="allInput" type="checkbox"/></div></div></div></div><div id="timeContainer"></div></div></div><div><div id="selectContainer"></div><div id="monthContainer"></div></div>';
  }
  
  async getTimeWeblet(path, par = '')
  {
    var self = this;
    let { default: Weblet } =  await MneRequest.import(path + '.mjs' + par);
    class MyTimeWeblet extends Weblet
    {
      constructor(parent, frame, id, initpar = {}, config = {} )
      {
        var ivalues = 
        {
          nowebletframe : true,
        };

        super(parent, frame, id, Object.assign(ivalues, initpar), config );
      }
    }
    return MyTimeWeblet;
  }

  async getSelectWeblet(path, par = '')
  {
    var self = this;
    let { default: Weblet } =  await MneRequest.import(path + '.mjs' + par);
    class MySelectWeblet extends Weblet
    {
      constructor(parent, frame, id, initpar = {}, config = {} )
      {
        var ivalues = 
        {
            schema : 'mne_personnal',
            query  : 'personskill',
            cols   : 'personid,color,lastname,firstname,fullname',
            scols  : 'lastname,firstname',
            wcol   : '',
            wval   : '',
            wop    : '',
            
            distinct : true,
            
            tablehidecols : ['personid', 'fullname'],

          
          nowebletframe : true,
          hinput        : false
        };

        super(parent, frame, id, Object.assign(ivalues, initpar), config );
      }

      async reset()
      {
        super.reset();
        this.obj.mkbuttons = [];
        Object.keys(this.obj.enablebuttons).forEach((item) => { this.obj.enablebuttons[item] = []});
      }
      
      async load()
      {
        return super.load();
      }
      
      async values()
      {
          return super.values();
      }
    }
    return MySelectWeblet;
  }
  
  async getMonthWeblet(path, par = '')
  {
    var self = this;
    let { default: Weblet } =  await MneRequest.import(path + '.mjs' + par);
    class MyMonthWeblet extends Weblet
    {
      constructor(parent, frame, id, initpar = {}, config = {} )
      {
        var ivalues = 
        {
            schema : 'mne_personnal',
            query : 'persontimemanagement',
            
            cols : 'start,end,color,timemanagementid,personid,timetyp,timetypname,duration,orderproducttimeid,orderid,description,productname,steptext,note',
            scols : 'start',
            
            wcol : 'personid,end,start',
            wop  : '=,>=,<=',
            
            distinct : true,

            okschema   : 'mne_personnal',
            okfunction : 'timemanagement_mod',
            okcols     : [ 'timemanagementid', 'timetyp', 'personid', 'start', 'duration', 'orderproducttimeid', 'note' ],
            oktyps     : { timetyp : 'long', start : 'long', duration : 'long' },

            delschema     : 'mne_personnal',
            delfunction   : 'timemanagement_del',
            delcols       : ['timemanagementid'],
            delconfirmids : [ 'start', 'duration'],
            
            dragid     : "mnetimemanagementproject",

            nowebletframe : true,
            hinput        : false
        };

        super(parent, frame, id, Object.assign(ivalues, initpar), config );
      }

      async reset()
      {
        super.reset();
        Object.keys(this.obj.enablebuttons).forEach((item) => { this.obj.enablebuttons[item] = []});
      }

      async readtimevalues(id)
      {
        var p = 
          {
            schema : this.initpar.schema,
            query : this.initpar.query,
            
            cols : this.initpar.cols,
            scols : this.initpar.scols,
            
            wcol : this.initpar.wcol,
            wop  : this.initpar.wop,

            wval : id + ',' + this.obj.firsttime + ',' + this.obj.lasttime,
            
            distinct : true,
            
            sqlstart : 1,
            sqlend   : 1
          }
        
        var res = await MneRequest.fetch('/db/utils/query/data.json', p);
        res.rids.id = res.rids.orderid;
        res.hides = [ 'personid', 'color', 'timemanagementid', 'timetyp', 'end', 'orderid', 'orderproducttimeid', 'note' ];
        return res;
      }
      
      async ok()
      {
        if ( this.obj.run.okaction == 'add' )
        {
          this.obj.run.values.timemanagementid = '################';
          this.obj.run.values.personid = this.obj.run.values.id;
          this.obj.run.values.timetyp = '0';
          this.obj.run.values.note = '';
        }
        return super.ok();
      }
      
     }
    return MyMonthWeblet;
  }

  async load()
  {
    await super.load();
    
    this.obj.inputs.all.nextSibling.addEventListener('click', (evt) => { this.btnClick('all'); });
    
    var reload = this.config.reload;
    var path = '/weblet/db/table/view';
    
    var configtime   = Object.assign(Object.assign({},  this.config ), { path : '/weblet/allg/etc/selectdate', depend : [], composeparent : this } );
    var configselect = Object.assign(Object.assign({},  this.config ), { path : '/weblet/db/table/view',       depend : [], composeparent : this } );
    var configmonth  = Object.assign(Object.assign({},  this.config ), { path : '/weblet/db/table/month',      depend : this.config.depend, composeparent : this } );

    var inittime   = Object.assign({},  this.initpar.timeinit ?? {} );
    var initselect = Object.assign({},  this.initpar.selectinit ?? {} );
    var initmonth  = Object.assign({},  this.initpar.monthinit ?? {} );

    var TimeWeblet =  await this.getTimeWeblet(configtime.path, ( reload ) ? '?date=' + Date.now() : '');
    this.obj.weblets.time = new TimeWeblet(this, this.obj.container.time, 'time', inittime, configtime);
    this.obj.weblets.time.obj.run.newvalues = true;

    var SelectWeblet =  await this.getSelectWeblet(configselect.path, ( reload ) ? '?date=' + Date.now() : '');
    this.obj.weblets.select = new SelectWeblet(this, this.obj.container.select, 'select', initselect, configselect );
    this.obj.weblets.select.obj.run.newvalues = true;

    var MonthWeblet =  await this.getMonthWeblet(configmonth.path, ( reload ) ? '?date=' + Date.now() : '');
    this.obj.weblets.month = new MonthWeblet(this, this.obj.container.month, 'month', initmonth, configmonth );
    this.obj.weblets.month.obj.run.newvalues = true;

    this.config.depend.push(this.obj.weblets.select);
    this.obj.weblets.select.config.depend.push(this.obj.weblets.month);
    
    this.obj.weblets.month.config.dependweblet = this.obj.weblets.time;
    this.obj.weblets.month.initpar.rowweblet  = this.obj.weblets.select;
    this.obj.weblets.month.initpar.infoweblet = this.config.composeparent.obj.weblets[this.initpar.infoweblet];
    this.obj.weblets.month.initpar.infoid     = this.initpar.infoid;

    this.obj.weblets.time.config.depend.push(this.obj.weblets.month);
    
    this.obj.webletsort = [ 'time', 'select', 'month'];
    this.obj.popups = this.config.composeparent.obj.popups;
    
    await this.obj.weblets.time.load();
    await this.obj.weblets.select.load();
    await this.obj.weblets.month.load();

  }
  
  setInfo(value)
  {
    this.obj.weblets.month.setInfo(value);
  }
  
  async all()
  {
    this.newvalues = true;
  }
  
  async values(param)
  {
    this.obj.run.origvalues = Object.assign({}, (( this.config.dependweblet ) ? this.config.dependweblet.obj.run.values : {}));
    this.obj.run.values = Object.assign({}, this.obj.run.origvalues);

    if ( this.obj.run.dependweblet && this.obj.run.dependweblet.obj.run.values.skillid )
      this.obj.skillid = this.obj.run.dependweblet.obj.run.values.skillid;
    
    this.obj.run.dependweblet = undefined;
    
    if ( ! this.obj.inputs.all.getValue() && this.obj.skillid  )
    {
      this.obj.weblets.select.initpar.wcol = 'skillid';
      this.obj.weblets.select.initpar.wop  = '=';
      this.obj.weblets.select.initpar.wval = this.obj.skillid;
    }
    else
    {
      this.obj.weblets.select.initpar.wcol = '';
      this.obj.weblets.select.initpar.wop  = '';
      this.obj.weblets.select.initpar.wval = '';
    }
    
    for ( var i in this.obj.inputs ) this.obj.inputs[i].modClear();

  }
}

export default MneErpTimemanagementPerson;
