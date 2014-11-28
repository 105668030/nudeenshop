/*!CK:3749899686!*//*1401285455,178198827*/

if (self.CavalryLogger) { CavalryLogger.start_js(["CGRqy"]); }

__d("TimeSpentLoggerDebug",["UserActivity","copyProperties","Banzai","pageID","setTimeoutAcrossTransitions","isInIframe"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m={},n=0,o={active:0,tos_id:j,ms_into_session:0},p,q,r=Math.random()*600,s=Math.ceil(r)*1000;function t(w){n=w;}var u={delay:0,retry:true};function v(){var w=Date.now(),x=w-n;if(x<1000)o.active=1;o.ms_into_session=w-q;if(i.isEnabled('time_spent_debug'))i.post('time_spent_debug',h({},o),u);g.unsubscribe(p);}if(!l()){p=g.subscribe(function(w,x){t(x.last_inform);});k(v,s);q=Date.now();}e.exports=m;},null);