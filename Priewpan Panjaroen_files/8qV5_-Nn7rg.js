/*!CK:1171309795!*//*1412564029,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["+5\/x1"]); }

__d("UnicodeUppercase",[],function(a,b,c,d,e,f){e.exports={uppercase:"\\u0041-\\u005a\\u03fd-\\u042f\\u00c0-\\u00d6\\u0531-\\u0556\\u0110\\u00d8-\\u00de\\u011e\\u0130\\u015e\\u01ae-\\u01af\\uff21-\\uff3a\\u1ea2\\u0391-\\u03a1\\u03a3-\\u03ab"};},null);
__d("UFIOrderingModeSelector.react",["InlineBlock.react","Link.react","LoadingIndicator.react","React","Image.react","ReactXUIMenu","PopoverMenu.react","cx","ix"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var p=l.SelectableMenu,q=l.SelectableItem,r=j.createClass({displayName:'UFIOrderingModeSelector',propTypes:{currentOrderingMode:j.PropTypes.string,onOrderChanged:j.PropTypes.func,orderingmodes:j.PropTypes.array.isRequired},getInitialState:function(){var s=null;this.props.orderingmodes.map(function(t){if(t.selected)s=t;});return {selectedMode:s};},onMenuItemClick:function(s,t){var u=t.item.getValue();this.props.orderingmodes.map(function(v){if(v.value===u)this.setState({selectedMode:v});}.bind(this));this.props.onOrderChanged(u);},render:function(){var s=null;if(this.props.currentOrderingMode!=this.state.selectedMode.value)s=j.createElement(i,{className:"UFIOrderingModeSelectorLoading",color:"white",size:"small"});var t=j.createElement(p,{onItemClick:this.onMenuItemClick},this.props.orderingmodes.map(function(u){return (j.createElement(q,{key:u.value,value:u.value,selected:u.value===this.state.selectedMode.value},u.name));}.bind(this)));return (j.createElement(j.DOM.div,{className:"UFIOrderingModeSelector"},s,j.createElement(g,null,j.createElement(m,{className:"UFIOrderingModeSelectorPopover",menu:t,alignh:"right"},j.createElement(h,null,this.state.selectedMode.name,j.createElement(k,{className:"UFIOrderingModeSelectorDownCaret",src:o('/images/ui/xhp/link/more/down_caret.gif')}))))));}});e.exports=r;},null);
__d("legacy:connect-login",["ConnectLogin"],function(a,b,c,d){a.ConnectLogin=b('ConnectLogin');},3);
__d("MentionsInputMatchers",["MentionsAlphabetExperiment","UnicodeUppercase"],function(a,b,c,d,e,f,g,h){var i,j;if(g.use_non_latin_characters){i='(?:^|\\s)';j=h.uppercase;}else{i='\\b';j='A-Z';}var k=['@','\\uff20'].join(''),l='.,+*?$|#{}()\\^\\-\\[\\]\\\\\/!%\'"~=<>_:;\n\r',m=i+'['+j+'][^ '+j+l+']',n='(?:[^'+k+l+']|['+l+'][^ '+l+'])',o='(?:^|\\s)(?:['+k+']('+n+'{0,20}))',p='(?:(?:^|[^#])('+m+'+)|'+o+')',q='(?:'+m+'{4,})',r='#\\uFF03',s={trigger:new RegExp('['+k+']$'),hashtagTrigger:new RegExp('['+r+']'),mainMatcher:new RegExp(o+'$'),autoMatcher:new RegExp(p+'$'),userMatcher:new RegExp(q+'$')};e.exports=s;},null);
__d("htmlize",["htmlSpecialChars"],function(a,b,c,d,e,f,g){function h(i){return g(i).replace(/\r\n|[\r\n]/g,'<br/>');}e.exports=h;},null);
__d("MentionsInput",["Arbiter","ArbiterMixin","Bootloader","CSS","DataStore","DOM","Event","Input","InputSelection","Keys","MentionsInputMatchers","Parent","Style","TokenizeUtil","UserAgent_DEPRECATED","htmlize","mixin","removeFromArray","repeatString"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y){var z='\uFEFF',aa=new RegExp(z,'g'),ba=function(na){return na+z;},ca='\uFFFD',da=/@+\[[0-9]+\:([^\]]|\\\])*\]+/g,ea=/[\\\]:]/g;function fa(na,oa){return na.replace(oa,y(' ',oa.length));}function ga(na,oa){return na.substring(0,oa)+na.substring(oa+1);}function ha(na){var oa=na.lastIndexOf('>');if(oa>=0){var pa=na.indexOf(' ',oa);return pa>=0?na.substr(0,pa+1):na;}else return '';}function ia(na,oa,pa){var qa=pa.lastIndexOf('<',oa)>pa.lastIndexOf('>',oa);return qa?' ':'&nbsp;<wbr />';}var ja=w(h);for(var ka in ja)if(ja.hasOwnProperty(ka))ma[ka]=ja[ka];var la=ja===null?null:ja.prototype;ma.prototype=Object.create(la);ma.prototype.constructor=ma;ma.__superConstructor__=ja;function ma(na,oa,pa,qa,ra,sa){"use strict";k.set(na,'MentionsInput',this);this._root=na;this._typeahead=oa;this._input=pa;this._offsets=[];var ta=null,ua=this.init.bind(this,qa,ra,sa);try{ta=document.activeElement===this._input;}catch(va){}if(ta){setTimeout(ua,0);}else var wa=m.listen(this._input,'focus',function(){setTimeout(ua,0);wa.remove();});this._hasHashtags=qa.hashtags;this._autoSuggestPages=qa.autosuggest_pages;this._lastHighlighterHTML='';this._hashtags=[];}ma.prototype.init=function(na,oa,pa){"use strict";if(this._initialized)return;this._initialized=true;this._highlighter=l.find(this._root,'.highlighter');this._highlighterInner=this._highlighter.firstChild;this._highlighterContent=l.find(this._root,'.highlighterContent');this._hiddenInput=l.find(this._root,'.mentionsHidden');this._placeholder=this._input.getAttribute('placeholder')||'';this._metrics=pa;if(!this._hiddenInput.name){var qa=this._input.name;this._input.name=qa+'_text';this._hiddenInput.name=qa;}this._initEvents();this._initTypeahead();if(oa===null){this._setup();}else this.reset(oa);this.inform('init',null,g.BEHAVIOR_STATE);};ma.prototype._setup=function(){"use strict";this._mentioned={};this._orderedUIDs=[];this._numMentioned=0;this._filterData=null;this._highlighterContent&&l.empty(this._highlighterContent);this._highlighterAuxContent&&l.remove(this._highlighterAuxContent);this._highlighterAuxContent=null;n.setPlaceholder(this._input,this._placeholder);s.set(this._typeahead.getElement(),'height','auto');};ma.prototype.reset=function(na){"use strict";if(!this._initialized)return;this._setup();var oa=na&&na.value||'';this._value=oa;this._hiddenInput&&(this._hiddenInput.value=oa);if(this._input&&na)n.setValue(this._input,na.value);var pa=na&&na.mentions;if(pa&&pa.length){var qa=[];pa.forEach(function(ra){qa.push(ra.offset+ra.length);delete ra.offset;delete ra.length;this._addToken(ra);},this);qa.reverse().forEach(function(ra){oa=oa.substring(0,ra)+z+oa.substring(ra);});}n.setValue(this._input,oa);this._update();};ma.prototype.getValue=function(){"use strict";return n.getValue(this._input).replace(aa,'');};ma.prototype._getMarkedValue=function(){"use strict";return n.getValueRaw(this._input);};ma.prototype.getRawValue=function(){"use strict";this._update();return n.getValue(this._hiddenInput);};ma.prototype.checkValue=function(){"use strict";var na=this._typeahead.getCore().getValue();if(q.trigger.exec(na)||na==='')this.inform('sessionEnd',{});};ma.prototype.getTypeahead=function(){"use strict";return this._typeahead;};ma.prototype._initEvents=function(){"use strict";var na=this._update.bind(this);m.listen(this._input,{input:na,keyup:na,change:na,blur:this._handleBlur.bind(this),focus:this._handleFocus.bind(this),keydown:this._handleKeydown.bind(this)});if(this._metrics){this._metrics.init(this._typeahead);this._metrics._reset();this._metrics.bindSessionStart(this._typeahead,'render',true);this._metrics.bindSessionEnd(this._typeahead.getView(),'select',true);this._metrics.bindSessionEnd(this,'sessionEnd',false);m.listen(this._input,'keyup',function(event){setTimeout(this.checkValue.bind(this),0);}.bind(this));}};ma.prototype._initTypeahead=function(){"use strict";this._typeahead.subscribe('select',function(sa,ta){var ua=ta.selected;this._addToken({uid:ua.uid,text:ua.text,type:ua.type,weakreference:ua.weak_reference});this.updateValue();}.bind(this));var na=this._input,oa=null;function pa(){if(oa===null){oa=n.getSubmitOnEnter(na);n.setSubmitOnEnter(na,false);}}function qa(){if(oa!==null){n.setSubmitOnEnter(na,oa);oa=null;}}this._typeahead.subscribe('reset',qa);this._typeahead.subscribe('render',pa);this._typeahead.subscribe('highlight',function(sa,ta){ta.index>=0?pa():qa();});this._typeahead.subscribe('query',function(){this._filterData=null;}.bind(this));var ra=this._typeahead.getCore();ra.suffix=z;this._handleFocus();};ma.prototype._handleBlur=function(){"use strict";if(this._filterToken){this._filterToken.remove();this._filterToken=null;}};ma.prototype._handleFocus=function(){"use strict";if(!this._filterToken)this._filterToken=this._typeahead.getData().addFilter(this._filterResults.bind(this));this._updateWidth();};ma.prototype._handleKeydown=function(event){"use strict";var na=event.keyCode;if(na==p.BACKSPACE||na==p.DELETE)this._handleBackspaceAndDelete(event,na);if(na==p.LEFT||na==p.RIGHT)setTimeout(this._handleLeftAndRight.bind(this,na),10);};ma.prototype._handleLeftAndRight=function(na){"use strict";var oa=this._getMarkedValue(),pa=o.get(this._input),qa=pa.start,ra=pa.end,sa=na==p.LEFT,ta=na==p.RIGHT;if(qa==ra){var ua=sa?-1:1;if(oa.charAt(qa)==z)o.set(this._input,qa+ua);}else if(sa&&oa.charAt(qa)==z){o.set(this._input,qa-1,ra);}else if(sa&&oa.charAt(ra)==z){o.set(this._input,qa,ra-1);}else if(ta&&oa.charAt(ra)==z){o.set(this._input,qa,ra+1);}else if(ta&&oa.charAt(qa)==z)o.set(this._input,qa+1,ra);};ma.prototype._handleBackspaceAndDelete=function(event,na){"use strict";var oa=o.get(this._input),pa=false;if(oa.start!==oa.end)if(this._offsetIsInsideMention(oa.start+1)&&this._offsetIsInsideMention(oa.end)){pa=(na===p.BACKSPACE);}else return;var qa=na===p.DELETE?1:-1,ra=qa+(pa?oa.end:oa.start),sa=this._getMarkedValue(),ta=sa;for(var ua=0;ua<this._orderedUIDs.length;++ua){var va=this._mentioned[this._orderedUIDs[ua]],wa=va.text,xa=ba(wa),ya=ta.indexOf(xa),za=ya+xa.length;if(ra<ya||ra>=za){ta=fa(ta,xa);continue;}var ab,bb;if(va.type!='user'){ab=0;bb=[wa];}else{ab=xa.substring(0,ra-ya).split(' ').length-1;bb=wa.split(' ');}var cb=bb.splice(ab,1)[0],db=bb.join(' '),eb=ab===0?ya:za-cb.length-1;if(db){va.text=db;db=ba(db);}else this._removeToken(va.uid);var fb=sa.substring(0,ya)+db+sa.substring(za);n.setValue(this._input,fb);o.set(this._input,eb);this._update();event.kill();break;}};ma.prototype._offsetIsInsideMention=function(na){"use strict";for(var oa=0;oa<this._offsets.length;oa++)if(na>this._offsets[oa][0]&&na<=this._offsets[oa][1])return true;return false;};ma.prototype._filterResults=function(na){"use strict";if(this._filterData===null){var oa=o.get(this._input).start;if(this._offsetIsInsideMention(oa)){this._filterData={caretIsInsideMention:true};return false;}var pa=this._typeahead.getCore();this._filterData={value:pa.getValue(),rawValue:pa.getRawValue()};}if(this._filterData.caretIsInsideMention)return false;if(q.mainMatcher.test(this._filterData.rawValue))return true;if(na.type!='user'&&!this._shouldIncludeNonUserItem(na))return false;if(na.disable_autosuggest)return false;if(q.userMatcher.test(this._filterData.value))return true;return t.isExactMatch(this._filterData.value,this._typeahead.getData().getTextToIndex(na));};ma.prototype._shouldIncludeNonUserItem=function(na){"use strict";if(this._autoSuggestPages!='false'&&na.connected_page)return true;if(this._autoSuggestPages=='include_authoritative'&&na.is_authoritative_person)return true;return false;};ma.prototype._addToken=function(na){"use strict";var oa=na.uid;if(!this._mentioned.hasOwnProperty(oa)){this._mentioned[oa]=na;this._orderedUIDs.push(oa);this._numMentioned++;this._update();}};ma.prototype._removeToken=function(na){"use strict";if(this._mentioned.hasOwnProperty(na)){delete this._mentioned[na];x(this._orderedUIDs,na);this._numMentioned--;this._update();}};ma.prototype._update=function(){"use strict";var na=this._getMarkedValue();if(na==this._value)return;this._value=na;this._updateTypeahead();this._updateMentions();this._updateWidth();setTimeout(this._updateDirection.bind(this),0);this.updateValue();};ma.prototype._updateMentions=function(){"use strict";this._offsets=[];var na=this._getMarkedValue(),oa=na;for(var pa=0;pa<this._orderedUIDs.length;++pa){var qa=this._orderedUIDs[pa],ra=ba(this._mentioned[qa].text),sa=oa.indexOf(ra);if(sa==-1)this._removeToken(qa);oa=fa(oa,ra);this._offsets.push([sa,sa+ra.length]);}var ta=na;while((sa=oa.indexOf(z))>-1){ta=ga(ta,sa);oa=ga(oa,sa);}if(na!==ta){var ua=o.get(this._input);n.setValue(this._input,ta);o.set(this._input,ua.start);this._value=ta;}};ma.prototype._renderHashtags=function(na){"use strict";if(!this._hasHashtags)return v(na);if(!this._hashtagParser){if(q.hashtagTrigger.exec(na))this.bootloadHashtagParser();if(!this._hashtagParser)return v(na);}this._hashtags=this._hashtagParser.parse(na);var oa=[],pa=0;for(var qa=0;qa<this._hashtags.length;qa++){var ra=this._hashtags[qa];oa.push(v(na.substring(pa,ra.rawOffset)),'<b>',ra.marker,ra.tag,'</b>');pa=ra.rawOffset+ra.marker.length+ra.tag.length;}oa.push(v(na.substring(pa)));return oa.join('');};ma.prototype.updateValue=function(){"use strict";var na=this._value=this._getMarkedValue(),oa=this._orderedUIDs,pa=na.replace(da,ca);for(var qa=0;qa<oa.length;++qa){var ra='@['+oa[qa]+':]',sa=ba(this._mentioned[oa[qa]].text);pa=pa.replace(sa,ra);na=na.replace(sa,ra);}var ta=this._renderHashtags(na);for(var qa=0;qa<oa.length;++qa){var ua=oa[qa],va=this._mentioned[ua],wa=va.text,xa=va.weakreference?'<b class="weak">':'<b>';ta=ta.replace('@['+ua+':]',xa+v(ba(wa))+'</b>');wa=wa.replace(ea,function(za){return '\\'+za;});pa=pa.replace('@['+ua+':]','@['+ua+':'+wa+']');}var ya=ha(ta);if(this._highlighterAuxContent||ya!==this._lastHighlighterHTML){if(u.ie()<9)ta=ta.replace(/ /g,ia);this._highlighterContent.innerHTML=ta;this._updateHighlighter();this._lastHighlighterHTML=ya;}this._hiddenInput.value=pa;this._updateHeight();};ma.prototype._updateDirection=function(){"use strict";var na=s.get(this._input,'direction');if(na==this._dir)return;this._dir=na;s.set(this._highlighter,'direction',na);if(na=='rtl'){s.set(this._highlighter,'text-align','right');}else s.set(this._highlighter,'text-align','left');};ma.prototype._updateWidth=function(){"use strict";var na=this._input.offsetWidth;if(na===this._lastInputWidth)return;this._lastInputWidth=na;var oa=s.getFloat.bind(null,this._input),pa=na-oa('paddingLeft')-oa('paddingRight')-oa('borderLeftWidth')-oa('borderRightWidth');this._highlighterInner.style.width=Math.max(pa,0)+'px';};ma.prototype._updateHeight=function(){"use strict";if(this._highlighterAuxContent){var na=this._highlighter.offsetHeight,oa=this._typeahead.getElement();if(na>oa.offsetHeight){s.set(oa,'height',na+'px');g.inform('reflow');}}};ma.prototype._updateTypeahead=function(){"use strict";var na=this._typeahead.getCore();na.matcher=q.autoMatcher;na.setExclusions(this._orderedUIDs);this.inform('update',{mentioned:this._mentioned});};ma.prototype.setPlaceholder=function(na){"use strict";this._placeholder=na;if(!this.hasAuxContent())n.setPlaceholder(this._input,na);};ma.prototype._updateHighlighter=function(){"use strict";if(this._highlighterContent)j.conditionShow(this._highlighterContent,this._numMentioned>0||this.hasAuxContent()||this._hashtags.length);};ma.prototype.setAuxContent=function(na){"use strict";if(this._highlighterContent){if(!this._highlighterAuxContent){this._highlighterAuxContent=l.create('span',{className:'highlighterAuxContent'});l.insertAfter(this._highlighterContent,this._highlighterAuxContent);}l.setContent(this._highlighterAuxContent,na);if(na){n.setPlaceholder(this._input,'');}else n.setPlaceholder(this._input,this._placeholder);this._value=null;this._update();this._updateHighlighter();this._updateHeight();}};ma.prototype.hasAuxContent=function(){"use strict";var na=this.getAuxContentRoot();return na&&j.shown(na)&&na.innerHTML.length>0;};ma.prototype.getAuxContentRoot=function(){"use strict";return this._highlighterAuxContent;};ma.prototype.addMention=function(na,oa){"use strict";oa=(typeof oa==='undefined')?true:oa;var pa=oa===false?'':' ',qa=this._getMarkedValue();if(qa!=='')qa+=' ';n.setValue(this._input,qa+ba(na.text)+pa);this._addToken(na);this._update();};ma.prototype.getMentions=function(){"use strict";return this._mentioned;};ma.prototype.bootloadHashtagParser=function(){"use strict";if(!this._hashtagParser)i.loadModules(["HashtagParser"],function(na){this._hashtagParser=na;if(this._initialized){this._value=null;this._update();}}.bind(this));};ma.getInstance=function(na){"use strict";var oa=r.byClass(na,'uiMentionsInput');return oa?k.get(oa,'MentionsInput'):null;};e.exports=ma;},null);
__d("legacy:feedback",["Feedback"],function(a,b,c,d){a.Feedback=b('Feedback');},3);
__d("legacy:dom",["DOM"],function(a,b,c,d){a.DOM=b('DOM');},3);
__d("ReferrerTools",[],function(a,b,c,d,e,f){e.exports.storeAncestorOrigins=function(g){if(!location||!location.ancestorOrigins)return;for(var h=0;h<location.ancestorOrigins.length;h++){var i=document.createElement('input');i.type='hidden';i.name='ancestor_origins[]';i.value=location.ancestorOrigins.item(h);g.appendChild(i);}};},null);
__d("PluginResize",["Locale","Log","UnverifiedXD","copyProperties","getOffsetParent","getStyleProperty"],function(a,b,c,d,e,f,g,h,i,j,k,l){function m(q){q=q||document.body;var r=0,s=k(q);if(g.isRTL()&&s){r=s.offsetWidth-q.offsetLeft-q.offsetWidth;}else if(!g.isRTL())r=q.offsetLeft;return n(q)+r;}function n(q){return Math.ceil(parseFloat(l(q,'width')))||q.offsetWidth;}function o(q){q=q||document.body;return q.offsetHeight+q.offsetTop;}function p(q,r,event,s){this.calcWidth=q||m;this.calcHeight=r||o;this.width=undefined;this.height=undefined;this.reposition=!!s;this.event=event||'resize';}j(p.prototype,{resize:function(){var q=this.calcWidth(),r=this.calcHeight();if(q!==this.width||r!==this.height){h.debug('Resizing Plugin: (%s, %s, %s, %s)',q,r,this.event,this.reposition);this.width=q;this.height=r;i.send({type:this.event,width:q,height:r,reposition:this.reposition});}return this;},auto:function(q){setInterval(this.resize.bind(this),q||250);return this;}});p.auto=function(q,event,r){return new p(m.bind(null,q),o.bind(null,q),event).resize().auto(r);};p.autoHeight=function(q,r,event,s){return new p(function(){return q;},o.bind(null,r),event).resize().auto(s);};e.exports=p;},null);
__d("legacy:MentionsInput",["MentionsInput"],function(a,b,c,d){a.MentionsInput=b('MentionsInput');},3);
__d("TypeaheadAreaCore",["InputSelection","TypeaheadCore","copyProperties","emptyFunction"],function(a,b,c,d,e,f,g,h,i,j){for(var k in h)if(h.hasOwnProperty(k))m[k]=h[k];var l=h===null?null:h.prototype;m.prototype=Object.create(l);m.prototype.constructor=m;m.__superConstructor__=h;function m(n){"use strict";h.call(this,n);this.matcher=new RegExp(this.matcher+'$');this.preventFocusChangeOnTab=true;}m.prototype.select=function(n){"use strict";l.select.call(this,n);var o=this.element.value,p=this.prefix+n.text+this.suffix;this.expandBounds(o,p);var q=o.substring(0,this.start),r=o.substring(this.end);this.element.value=q+p+r;g.set(this.element,q.length+p.length);};m.prototype.expandBounds=function(n,o){"use strict";n=n.toLowerCase();o=o.toLowerCase();var p,q,r,s,t=/\s/;q=n.substring(this.start,this.end);r=o.indexOf(q);p=this.start;while(p>=0&&r>=0){s=n.charAt(p-1);if(!s||t.test(s))this.start=p;q=s+q;r=o.indexOf(q);p--;}q=n.substring(this.start,this.end);r=o.indexOf(q);p=this.end;while(p<=n.length&&r>=0){s=n.charAt(p);if(!s||t.test(s))this.end=p;q=q+s;r=o.indexOf(q);p++;}};m.prototype.getRawValue=function(){"use strict";var n=g.get(this.element).start||0;return l.getValue.call(this).substring(0,n);};m.prototype.getValue=function(){"use strict";var n=this.matcher&&this.matcher.exec(this.getRawValue());if(!n)return '';var o=n[0],p=n.index+o.length;o=o.replace(/^\s/,'');var q=o.length;o=o.replace(/\s$/,'');var r=q-o.length;this.start=p-q;this.end=p+r;return n[2]||n[1]||n[0];};i(m.prototype,{prefix:'',suffix:', ',matcher:"\\b[^,]*",click:j});e.exports=m;},null);
__d("TypeaheadHoistFriends",["copyProperties"],function(a,b,c,d,e,f,g){function h(i){"use strict";this._typeahead=i;}h.prototype.enable=function(){"use strict";var i=this._typeahead.getView();this._subscription=i.subscribe('beforeRender',function(j,k){var l=[],m=[],n=[];for(var o=0;o<k.results.length;++o){var p=k.results[o];if(p.type=='header'){n=n.concat(m,l);n.push(p);m=[];l=[];}else if(p.type=='user'&&p.bootstrapped){m.push(p);}else l.push(p);}k.results=n.concat(m,l);});};h.prototype.disable=function(){"use strict";this._typeahead.getView().unsubscribe(this._subscription);this._subscription=null;};g(h.prototype,{_subscription:null});e.exports=h;},null);
__d("legacy:HoistFriendsTypeaheadBehavior",["TypeaheadHoistFriends"],function(a,b,c,d,e,f,g){if(!a.TypeaheadBehaviors)a.TypeaheadBehaviors={};a.TypeaheadBehaviors.hoistFriends=function(h){h.enableBehavior(g);};},3);
__d("QueriesHistory",[],function(a,b,c,d,e,f){function g(h){"use strict";this.$QueriesHistory0=h;this.reset();}g.prototype.getQueries=function(){"use strict";return this.$QueriesHistory1;};g.prototype.getCurrentLength=function(){"use strict";return this.$QueriesHistory2;};g.prototype.add=function(h){"use strict";this.$QueriesHistory1.push(h);this.$QueriesHistory2+=h.length;while(this.$QueriesHistory1.length!==0&&this.$QueriesHistory2>this.$QueriesHistory0){var i=this.$QueriesHistory1.shift();this.$QueriesHistory2-=i.length;}};g.prototype.reset=function(){"use strict";this.$QueriesHistory2=0;this.$QueriesHistory1=[];};e.exports=g;},null);
__d("TypeaheadMetrics",["AsyncRequest","Event","QueriesHistory","copyProperties","emptyFunction"],function(a,b,c,d,e,f,g,h,i,j,k){var l=1000;function m(n){"use strict";this.extraData={};j(this,n);}m.prototype.init=function(n){"use strict";this.init=k;this.core=n.getCore();this.view=n.getView();this.data=n.getData();this.queriesHistory=new i(l);this.stats={};this.sessionActive=false;this._sessionStartEvents=[];this._sessionEndEvents=[];this._reset();this.initEvents();};m.prototype._reset=function(){"use strict";this.stats={};this.avgStats={};this.sessionActive=false;this.sid=Math.floor(Date.now()*Math.random());this.data.setQueryData({sid:this.sid});this.data.setBootstrapData({sid:this.sid});this.request_ids=[];this.lastNotBackspacedQuery='';this.queriesHistory.reset();};m.prototype.recordSelect=function(n){"use strict";var o=n.selected;if(o.uid==null){this.recordStat('selected_id','SELECT_NULL');}else this.recordStat('selected_id',o.uid);this.recordStat('selected_type',o.type);this.recordStat('selected_position',n.index);this.recordStat('selected_with_mouse',n.clicked?1:0);this.recordStat('selected_query',n.query);this._sessionEnd();};m.prototype.bindSessionStart=function(n,event,o){"use strict";if(o)for(var p=0;p<this._sessionStartEvents.length;++p){var q=this._sessionStartEvents[p];q.obj.unsubscribe(q.token);}this._sessionStartEvents.push({obj:n,token:n.subscribe(event,function(r,s){this._sessionStart();}.bind(this))});};m.prototype.bindSessionEnd=function(n,event,o){"use strict";if(o)for(var p=0;p<this._sessionEndEvents.length;++p){var q=this._sessionEndEvents[p];q.obj.unsubscribe(q.token);}this._sessionEndEvents.push({obj:n,token:n.subscribe(event,function(r,s){this._sessionEnd();}.bind(this))});};m.prototype.initEvents=function(){"use strict";this.bindSessionStart(this.core,'focus',false);this.bindSessionEnd(this.core,'blur',false);this.view.subscribe('select',function(n,o){this.recordSelect(o);}.bind(this));this.bindSessionEnd(this.view,'select',false);this.view.subscribe('render',function(n,o){this.results=o;}.bind(this));this.data.subscribe('beforeQuery',function(n,o){this.query=o.value;this.queriesHistory.add(this.query);if(this.lastNotBackspacedQuery.indexOf(this.query)!==0)this.lastNotBackspacedQuery=this.query;if(!o.value)return;this.recordCountStat('num_queries');}.bind(this));this.data.subscribe('beforeFetch',function(n,o){if(o.fetch_context.bootstrap){this.bootstrapBegin=Date.now();}else o.fetch_context.queryBegin=Date.now();}.bind(this));this.data.subscribe('fetchComplete',function(n,o){if(o.fetch_context.bootstrap){this.recordAvgStat('bootstrap_latency',Date.now()-this.bootstrapBegin);var p={};o.response.payload.entries.forEach(function(q){if(!p[q.type]){p[q.type]=1;}else p[q.type]++;});this.recordStat('bootstrap_response_types',p);this.bootstrapped=true;}else{if('filtered_count' in o.response.payload)this.recordStat('filtered_count',o.response.payload.filtered_count);this.recordAvgStat('avg_query_latency',Date.now()-o.fetch_context.queryBegin);}}.bind(this));this.data.subscribe('respond',function(n,o){var p=this.data.tokenizeBackend(o.value||'').flatValue,q=this.data.findBestPreviousQuery(p),r=this.data.getQueryIDs()[q];this.normalized_backend_query=q;this.request_id=r;this.request_ids.push(r);}.bind(this));this.data.subscribe('dirty',function(n,o){this.bootstrapped=false;}.bind(this));};m.prototype._sessionStart=function(){"use strict";if(this.sessionActive)return;this.sessionActive=true;};m.prototype._sessionEnd=function(){"use strict";if(!this.sessionActive)return;this.sessionActive=false;this.submit();this._reset();};m.prototype.recordStat=function(n,o){"use strict";this.stats[n]=o;};m.prototype.recordCountStat=function(n){"use strict";var o=this.stats[n];this.stats[n]=o?o+1:1;};m.prototype.recordAvgStat=function(n,o){"use strict";if(this.avgStats[n]){this.avgStats[n][0]+=o;++this.avgStats[n][1];}else this.avgStats[n]=[o,1];};m.prototype.hasStats=function(){"use strict";return !!Object.keys(this.stats).length;};m.prototype.submit=function(){"use strict";if(this.hasStats()){j(this.stats,this.extraData);if(this.results){var n=(this.results).map(function(q,r){return q.uid;});this.recordStat('candidate_results',JSON.stringify(n));}if(this.query)this.recordStat('query',this.query);if(this.lastNotBackspacedQuery)this.recordStat('last_not_backspaced_query',this.lastNotBackspacedQuery);this.recordStat('queries_history',JSON.stringify(this.queriesHistory.getQueries()));if(this.normalized_backend_query)this.recordStat('normalized_backend_query',this.normalized_backend_query);if(this.request_id)this.recordStat('request_id',this.request_id);if(this.request_ids.length)this.recordStat('request_ids',this.request_ids);if(this.sid)this.recordStat('sid',this.sid);if(this.bootstrapped)this.recordStat('bootstrapped',1);for(var o in this.avgStats){var p=this.avgStats[o];this.stats[o]=p[0]/p[1];}new g().setURI(this.endPoint).setMethod('POST').setData({stats:this.stats}).setErrorHandler(k).send();this._reset();}};m.register=function(n,o,p){"use strict";if(document.activeElement===n){o.init(p);}else var q=h.listen(n,'focus',function(){o.init(p);q.remove();});};j(m.prototype,{endPoint:'/ajax/typeahead/record_basic_metrics.php'});e.exports=m;},null);