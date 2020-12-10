//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/geometrie/personnal_day.mjs
//================================================================================
'use strict';
import { MneVSlider, MneHSlider }  from '/js/geometrie/slider.mjs'
import MneElement from '/weblet/basic/element.mjs'

class MneTemplatePersonalDay
{
  static mkTemplate( weblet )
  {
    weblet.obj.container = {};
    weblet.obj.slider = {};

    var s0 = weblet.obj.slider.slider0 = new MneHSlider(weblet.frame, 'auto', 'invis');
    var s1 = weblet.obj.slider.slider1 = new MneHSlider(s0.container1, '50%', 'move');

    weblet.obj.container['top']     = s0.container0
    weblet.obj.container['detail']  = s1.container0
    weblet.obj.container['detail'].single = true;
    
    weblet.obj.container['bottom']  = s1.container1

  }
}

export default MneTemplatePersonalDay
