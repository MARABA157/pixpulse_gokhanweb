var Ua={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const su=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},vd=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=n[t++];e[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=n[t++],a=n[t++],u=n[t++],l=((i&7)<<18|(o&63)<<12|(a&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const o=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return e.join("")},ou={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const o=n[i],a=i+1<n.length,u=a?n[i+1]:0,l=i+2<n.length,d=l?n[i+2]:0,p=o>>2,y=(o&3)<<4|u>>4;let w=(u&15)<<2|d>>6,P=d&63;l||(P=64,a||(w=64)),r.push(t[p],t[y],t[w],t[P])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(su(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):vd(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const o=t[n.charAt(i++)],u=i<n.length?t[n.charAt(i)]:0;++i;const d=i<n.length?t[n.charAt(i)]:64;++i;const y=i<n.length?t[n.charAt(i)]:64;if(++i,o==null||u==null||d==null||y==null)throw new Ed;const w=o<<2|u>>4;if(r.push(w),d!==64){const P=u<<4&240|d>>2;if(r.push(P),y!==64){const k=d<<6&192|y;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ed extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Td=function(n){const e=su(n);return ou.encodeByteArray(e,!0)},Kr=function(n){return Td(n).replace(/\./g,"")},au=function(n){try{return ou.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Id(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wd=()=>Id().__FIREBASE_DEFAULTS__,Ad=()=>{if(typeof process>"u"||typeof Ua>"u")return;const n=Ua.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Rd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&au(n[1]);return e&&JSON.parse(e)},li=()=>{try{return wd()||Ad()||Rd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},cu=n=>{var e,t;return(t=(e=li())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},uu=n=>{const e=cu(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},lu=()=>{var n;return(n=li())===null||n===void 0?void 0:n.config},hu=n=>{var e;return(e=li())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function du(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Kr(JSON.stringify(t)),Kr(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function bd(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(we())}function Sd(){var n;const e=(n=li())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Cd(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function kd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Dd(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Nd(){const n=we();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Vd(){return!Sd()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Od(){try{return typeof indexedDB=="object"}catch{return!1}}function Ld(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var o;e(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Md="FirebaseError";class $e extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Md,Object.setPrototypeOf(this,$e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Zn.prototype.create)}}class Zn{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,o=this.errors[e],a=o?xd(o,r):"Error",u=`${this.serviceName}: ${a} (${i}).`;return new $e(i,u,r)}}function xd(n,e){return n.replace(Ud,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Ud=/\{\$([^}]+)}/g;function Fd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Gr(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const o=n[i],a=e[i];if(Fa(o)&&Fa(a)){if(!Gr(o,a))return!1}else if(o!==a)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Fa(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function er(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Bd(n,e){const t=new jd(n,e);return t.subscribe.bind(t)}class jd{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");qd(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=ts),i.error===void 0&&(i.error=ts),i.complete===void 0&&(i.complete=ts);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function qd(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ts(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(n){return n&&n._delegate?n._delegate:n}class vt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ct="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Pd;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Hd(e))try{this.getOrInitializeService({instanceIdentifier:Ct})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(e=Ct){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ct){return this.instances.has(e)}getOptions(e=Ct){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[o,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);r===u&&a.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(i,o);const a=this.instances.get(i);return a&&e(a,i),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:zd(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Ct){return this.component?this.component.multipleInstances?e:Ct:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function zd(n){return n===Ct?void 0:n}function Hd(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new $d(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var H;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(H||(H={}));const Kd={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},Gd=H.INFO,Qd={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},Xd=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Qd[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Fs{constructor(e){this.name=e,this._logLevel=Gd,this._logHandler=Xd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Kd[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}}const Yd=(n,e)=>e.some(t=>n instanceof t);let Ba,ja;function Jd(){return Ba||(Ba=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Zd(){return ja||(ja=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const fu=new WeakMap,ps=new WeakMap,pu=new WeakMap,ns=new WeakMap,Bs=new WeakMap;function ef(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(pt(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&fu.set(t,n)}).catch(()=>{}),Bs.set(e,n),e}function tf(n){if(ps.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});ps.set(n,e)}let ms={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ps.get(n);if(e==="objectStoreNames")return n.objectStoreNames||pu.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return pt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function nf(n){ms=n(ms)}function rf(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(rs(this),e,...t);return pu.set(r,e.sort?e.sort():[e]),pt(r)}:Zd().includes(n)?function(...e){return n.apply(rs(this),e),pt(fu.get(this))}:function(...e){return pt(n.apply(rs(this),e))}}function sf(n){return typeof n=="function"?rf(n):(n instanceof IDBTransaction&&tf(n),Yd(n,Jd())?new Proxy(n,ms):n)}function pt(n){if(n instanceof IDBRequest)return ef(n);if(ns.has(n))return ns.get(n);const e=sf(n);return e!==n&&(ns.set(n,e),Bs.set(e,n)),e}const rs=n=>Bs.get(n);function of(n,e,{blocked:t,upgrade:r,blocking:i,terminated:o}={}){const a=indexedDB.open(n,e),u=pt(a);return r&&a.addEventListener("upgradeneeded",l=>{r(pt(a.result),l.oldVersion,l.newVersion,pt(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),u.then(l=>{o&&l.addEventListener("close",()=>o()),i&&l.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}const af=["get","getKey","getAll","getAllKeys","count"],cf=["put","add","delete","clear"],is=new Map;function qa(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(is.get(e))return is.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=cf.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||af.includes(t)))return;const o=async function(a,...u){const l=this.transaction(a,i?"readwrite":"readonly");let d=l.store;return r&&(d=d.index(u.shift())),(await Promise.all([d[t](...u),i&&l.done]))[0]};return is.set(e,o),o}nf(n=>({...n,get:(e,t,r)=>qa(e,t)||n.get(e,t,r),has:(e,t)=>!!qa(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(lf(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function lf(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const gs="@firebase/app",$a="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ye=new Fs("@firebase/app"),hf="@firebase/app-compat",df="@firebase/analytics-compat",ff="@firebase/analytics",pf="@firebase/app-check-compat",mf="@firebase/app-check",gf="@firebase/auth",_f="@firebase/auth-compat",yf="@firebase/database",vf="@firebase/data-connect",Ef="@firebase/database-compat",Tf="@firebase/functions",If="@firebase/functions-compat",wf="@firebase/installations",Af="@firebase/installations-compat",Rf="@firebase/messaging",Pf="@firebase/messaging-compat",bf="@firebase/performance",Sf="@firebase/performance-compat",Cf="@firebase/remote-config",kf="@firebase/remote-config-compat",Df="@firebase/storage",Nf="@firebase/storage-compat",Vf="@firebase/firestore",Of="@firebase/vertexai-preview",Lf="@firebase/firestore-compat",Mf="firebase",xf="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s="[DEFAULT]",Uf={[gs]:"fire-core",[hf]:"fire-core-compat",[ff]:"fire-analytics",[df]:"fire-analytics-compat",[mf]:"fire-app-check",[pf]:"fire-app-check-compat",[gf]:"fire-auth",[_f]:"fire-auth-compat",[yf]:"fire-rtdb",[vf]:"fire-data-connect",[Ef]:"fire-rtdb-compat",[Tf]:"fire-fn",[If]:"fire-fn-compat",[wf]:"fire-iid",[Af]:"fire-iid-compat",[Rf]:"fire-fcm",[Pf]:"fire-fcm-compat",[bf]:"fire-perf",[Sf]:"fire-perf-compat",[Cf]:"fire-rc",[kf]:"fire-rc-compat",[Df]:"fire-gcs",[Nf]:"fire-gcs-compat",[Vf]:"fire-fst",[Lf]:"fire-fst-compat",[Of]:"fire-vertex","fire-js":"fire-js",[Mf]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr=new Map,Ff=new Map,ys=new Map;function za(n,e){try{n.container.addComponent(e)}catch(t){Ye.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Vt(n){const e=n.name;if(ys.has(e))return Ye.debug(`There were multiple attempts to register component ${e}.`),!1;ys.set(e,n);for(const t of Qr.values())za(t,n);for(const t of Ff.values())za(t,n);return!0}function hi(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ke(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},mt=new Zn("app","Firebase",Bf);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jf{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new vt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw mt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt=xf;function qf(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:_s,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw mt.create("bad-app-name",{appName:String(i)});if(t||(t=lu()),!t)throw mt.create("no-options");const o=Qr.get(i);if(o){if(Gr(t,o.options)&&Gr(r,o.config))return o;throw mt.create("duplicate-app",{appName:i})}const a=new Wd(i);for(const l of ys.values())a.addComponent(l);const u=new jf(t,r,a);return Qr.set(i,u),u}function js(n=_s){const e=Qr.get(n);if(!e&&n===_s&&lu())return qf();if(!e)throw mt.create("no-app",{appName:n});return e}function xe(n,e,t){var r;let i=(r=Uf[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const o=i.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const u=[`Unable to register library "${i}" with version "${e}":`];o&&u.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&a&&u.push("and"),a&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ye.warn(u.join(" "));return}Vt(new vt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $f="firebase-heartbeat-database",zf=1,Hn="firebase-heartbeat-store";let ss=null;function mu(){return ss||(ss=of($f,zf,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Hn)}catch(t){console.warn(t)}}}}).catch(n=>{throw mt.create("idb-open",{originalErrorMessage:n.message})})),ss}async function Hf(n){try{const t=(await mu()).transaction(Hn),r=await t.objectStore(Hn).get(gu(n));return await t.done,r}catch(e){if(e instanceof $e)Ye.warn(e.message);else{const t=mt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ye.warn(t.message)}}}async function Ha(n,e){try{const r=(await mu()).transaction(Hn,"readwrite");await r.objectStore(Hn).put(e,gu(n)),await r.done}catch(t){if(t instanceof $e)Ye.warn(t.message);else{const r=mt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Ye.warn(r.message)}}}function gu(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wf=1024,Kf=30*24*60*60*1e3;class Gf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Xf(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Wa();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const u=new Date(a.date).valueOf();return Date.now()-u<=Kf}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Ye.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Wa(),{heartbeatsToSend:r,unsentEntries:i}=Qf(this._heartbeatsCache.heartbeats),o=Kr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Ye.warn(t),""}}}function Wa(){return new Date().toISOString().substring(0,10)}function Qf(n,e=Wf){const t=[];let r=n.slice();for(const i of n){const o=t.find(a=>a.agent===i.agent);if(o){if(o.dates.push(i.date),Ka(t)>e){o.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Ka(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Xf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Od()?Ld().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Hf(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Ha(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Ha(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Ka(n){return Kr(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yf(n){Vt(new vt("platform-logger",e=>new uf(e),"PRIVATE")),Vt(new vt("heartbeat",e=>new Gf(e),"PRIVATE")),xe(gs,$a,n),xe(gs,$a,"esm2017"),xe("fire-js","")}Yf("");function qs(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function _u(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Jf=_u,yu=new Zn("auth","Firebase",_u());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr=new Fs("@firebase/auth");function Zf(n,...e){Xr.logLevel<=H.WARN&&Xr.warn(`Auth (${jt}): ${n}`,...e)}function Ur(n,...e){Xr.logLevel<=H.ERROR&&Xr.error(`Auth (${jt}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(n,...e){throw $s(n,...e)}function Ue(n,...e){return $s(n,...e)}function vu(n,e,t){const r=Object.assign(Object.assign({},Jf()),{[e]:t});return new Zn("auth","Firebase",r).create(e,{appName:n.name})}function gt(n){return vu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function $s(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return yu.create(n,...e)}function M(n,e,...t){if(!n)throw $s(e,...t)}function Ge(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ur(e),new Error(e)}function Ze(n,e){n||Ge(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vs(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function ep(){return Ga()==="http:"||Ga()==="https:"}function Ga(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ep()||kd()||"connection"in navigator)?navigator.onLine:!0}function np(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ze(t>e,"Short delay should be less than long delay!"),this.isMobile=bd()||Dd()}get(){return tp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zs(n,e){Ze(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ge("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ge("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ge("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ip=new tr(3e4,6e4);function nr(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function wt(n,e,t,r,i={}){return Tu(n,i,async()=>{let o={},a={};r&&(e==="GET"?a=r:o={body:JSON.stringify(r)});const u=er(Object.assign({key:n.config.apiKey},a)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:l},o);return Cd()||(d.referrerPolicy="no-referrer"),Eu.fetch()(wu(n,n.config.apiHost,t,u),d)})}async function Tu(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},rp),e);try{const i=new op(n),o=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw Dr(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const u=o.ok?a.errorMessage:a.error.message,[l,d]=u.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Dr(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw Dr(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw Dr(n,"user-disabled",a);const p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw vu(n,p,d);Je(n,p)}}catch(i){if(i instanceof $e)throw i;Je(n,"network-request-failed",{message:String(i)})}}async function Iu(n,e,t,r,i={}){const o=await wt(n,e,t,r,i);return"mfaPendingCredential"in o&&Je(n,"multi-factor-auth-required",{_serverResponse:o}),o}function wu(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?zs(n.config,i):`${n.config.apiScheme}://${i}`}function sp(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class op{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ue(this.auth,"network-request-failed")),ip.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Dr(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Ue(n,e,r);return i.customData._tokenResponse=t,i}function Qa(n){return n!==void 0&&n.enterprise!==void 0}class ap{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return sp(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function cp(n,e){return wt(n,"GET","/v2/recaptchaConfig",nr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function up(n,e){return wt(n,"POST","/v1/accounts:delete",e)}async function Au(n,e){return wt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function lp(n,e=!1){const t=se(n),r=await t.getIdToken(e),i=Hs(r);M(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const o=typeof i.firebase=="object"?i.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:i,token:r,authTime:Fn(os(i.auth_time)),issuedAtTime:Fn(os(i.iat)),expirationTime:Fn(os(i.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function os(n){return Number(n)*1e3}function Hs(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ur("JWT malformed, contained fewer than 3 sections"),null;try{const i=au(t);return i?JSON.parse(i):(Ur("Failed to decode base64 JWT payload"),null)}catch(i){return Ur("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Xa(n){const e=Hs(n);return M(e,"internal-error"),M(typeof e.exp<"u","internal-error"),M(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof $e&&hp(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function hp({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Fn(this.lastLoginAt),this.creationTime=Fn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yr(n){var e;const t=n.auth,r=await n.getIdToken(),i=await nn(n,Au(t,{idToken:r}));M(i==null?void 0:i.users.length,t,"internal-error");const o=i.users[0];n._notifyReloadListener(o);const a=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?Ru(o.providerUserInfo):[],u=pp(n.providerData,a),l=n.isAnonymous,d=!(n.email&&o.passwordHash)&&!(u!=null&&u.length),p=l?d:!1,y={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new Es(o.createdAt,o.lastLoginAt),isAnonymous:p};Object.assign(n,y)}async function fp(n){const e=se(n);await Yr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function pp(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Ru(n){return n.map(e=>{var{providerId:t}=e,r=qs(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mp(n,e){const t=await Tu(n,{},async()=>{const r=er({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:o}=n.config,a=wu(n,i,"/v1/token",`key=${o}`),u=await n._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",Eu.fetch()(a,{method:"POST",headers:u,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function gp(n,e){return wt(n,"POST","/v2/accounts:revokeToken",nr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){M(e.idToken,"internal-error"),M(typeof e.idToken<"u","internal-error"),M(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Xa(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){M(e.length!==0,"internal-error");const t=Xa(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(M(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:o}=await mp(e,t);this.updateTokensAndExpiration(r,i,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:o}=t,a=new Jt;return r&&(M(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(M(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),o&&(M(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Jt,this.toJSON())}_performRefresh(){return Ge("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(n,e){M(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Qe{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,o=qs(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new dp(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Es(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await nn(this,this.stsTokenManager.getToken(this.auth,e));return M(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return lp(this,e)}reload(){return fp(this)}_assign(e){this!==e&&(M(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Qe(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){M(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Yr(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ke(this.auth.app))return Promise.reject(gt(this.auth));const e=await this.getIdToken();return await nn(this,up(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,o,a,u,l,d,p;const y=(r=t.displayName)!==null&&r!==void 0?r:void 0,w=(i=t.email)!==null&&i!==void 0?i:void 0,P=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,k=(a=t.photoURL)!==null&&a!==void 0?a:void 0,N=(u=t.tenantId)!==null&&u!==void 0?u:void 0,C=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,B=(d=t.createdAt)!==null&&d!==void 0?d:void 0,q=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:j,emailVerified:$,isAnonymous:le,providerData:Y,stsTokenManager:E}=t;M(j&&E,e,"internal-error");const m=Jt.fromJSON(this.name,E);M(typeof j=="string",e,"internal-error"),at(y,e.name),at(w,e.name),M(typeof $=="boolean",e,"internal-error"),M(typeof le=="boolean",e,"internal-error"),at(P,e.name),at(k,e.name),at(N,e.name),at(C,e.name),at(B,e.name),at(q,e.name);const _=new Qe({uid:j,auth:e,email:w,emailVerified:$,displayName:y,isAnonymous:le,photoURL:k,phoneNumber:P,tenantId:N,stsTokenManager:m,createdAt:B,lastLoginAt:q});return Y&&Array.isArray(Y)&&(_.providerData=Y.map(v=>Object.assign({},v))),C&&(_._redirectEventId=C),_}static async _fromIdTokenResponse(e,t,r=!1){const i=new Jt;i.updateFromServerResponse(t);const o=new Qe({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Yr(o),o}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];M(i.localId!==void 0,"internal-error");const o=i.providerUserInfo!==void 0?Ru(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(o!=null&&o.length),u=new Jt;u.updateFromIdToken(r);const l=new Qe({uid:i.localId,auth:e,stsTokenManager:u,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Es(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(o!=null&&o.length)};return Object.assign(l,d),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya=new Map;function Xe(n){Ze(n instanceof Function,"Expected a class definition");let e=Ya.get(n);return e?(Ze(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ya.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Pu.type="NONE";const Ja=Pu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fr(n,e,t){return`firebase:${n}:${e}:${t}`}class Zt{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:o}=this.auth;this.fullUserKey=Fr(this.userKey,i.apiKey,o),this.fullPersistenceKey=Fr("persistence",i.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Qe._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Zt(Xe(Ja),e,r);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let o=i[0]||Xe(Ja);const a=Fr(r,e.config.apiKey,e.name);let u=null;for(const d of t)try{const p=await d._get(a);if(p){const y=Qe._fromJSON(e,p);d!==o&&(u=y),o=d;break}}catch{}const l=i.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!l.length?new Zt(o,e,r):(o=l[0],u&&await o._set(a,u.toJSON()),await Promise.all(t.map(async d=>{if(d!==o)try{await d._remove(a)}catch{}})),new Zt(o,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Za(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ku(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(bu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Nu(e))return"Blackberry";if(Vu(e))return"Webos";if(Su(e))return"Safari";if((e.includes("chrome/")||Cu(e))&&!e.includes("edge/"))return"Chrome";if(Du(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function bu(n=we()){return/firefox\//i.test(n)}function Su(n=we()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Cu(n=we()){return/crios\//i.test(n)}function ku(n=we()){return/iemobile/i.test(n)}function Du(n=we()){return/android/i.test(n)}function Nu(n=we()){return/blackberry/i.test(n)}function Vu(n=we()){return/webos/i.test(n)}function Ws(n=we()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function _p(n=we()){var e;return Ws(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function yp(){return Nd()&&document.documentMode===10}function Ou(n=we()){return Ws(n)||Du(n)||Vu(n)||Nu(n)||/windows phone/i.test(n)||ku(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lu(n,e=[]){let t;switch(n){case"Browser":t=Za(we());break;case"Worker":t=`${Za(we())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${jt}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=o=>new Promise((a,u)=>{try{const l=e(o);a(l)}catch(l){u(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ep(n,e={}){return wt(n,"GET","/v2/passwordPolicy",nr(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tp=6;class Ip{constructor(e){var t,r,i,o;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:Tp,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,o,a,u;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(o=l.containsUppercaseLetter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNumericCharacter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(u=l.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wp{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ec(this),this.idTokenSubscription=new ec(this),this.beforeStateQueue=new vp(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=yu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Xe(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Zt.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Au(this,{idToken:e}),r=await Qe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ke(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===u)&&(l!=null&&l.user)&&(i=l.user,o=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return M(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Yr(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=np()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ke(this.app))return Promise.reject(gt(this));const t=e?se(e):null;return t&&M(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&M(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ke(this.app)?Promise.reject(gt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ke(this.app)?Promise.reject(gt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Xe(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Ep(this),t=new Ip(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Zn("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await gp(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Xe(e)||this._popupRedirectResolver;M(t,this,"argument-error"),this.redirectPersistenceManager=await Zt.create(this,[Xe(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(M(u,this,"internal-error"),u.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,i);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return M(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Lu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Zf(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function hn(n){return se(n)}class ec{constructor(e){this.auth=e,this.observer=null,this.addObserver=Bd(t=>this.observer=t)}get next(){return M(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let di={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ap(n){di=n}function Mu(n){return di.loadJS(n)}function Rp(){return di.recaptchaEnterpriseScript}function Pp(){return di.gapiScript}function bp(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const Sp="recaptcha-enterprise",Cp="NO_RECAPTCHA";class kp{constructor(e){this.type=Sp,this.auth=hn(e)}async verify(e="verify",t=!1){async function r(o){if(!t){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(a,u)=>{cp(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const d=new ap(l);return o.tenantId==null?o._agentRecaptchaConfig=d:o._tenantRecaptchaConfigs[o.tenantId]=d,a(d.siteKey)}}).catch(l=>{u(l)})})}function i(o,a,u){const l=window.grecaptcha;Qa(l)?l.enterprise.ready(()=>{l.enterprise.execute(o,{action:e}).then(d=>{a(d)}).catch(()=>{a(Cp)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((o,a)=>{r(this.auth).then(u=>{if(!t&&Qa(window.grecaptcha))i(u,o,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=Rp();l.length!==0&&(l+=u),Mu(l).then(()=>{i(u,o,a)}).catch(d=>{a(d)})}}).catch(u=>{a(u)})})}}async function tc(n,e,t,r=!1){const i=new kp(n);let o;try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const a=Object.assign({},e);return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Dp(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await tc(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await tc(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Np(n,e){const t=hi(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),o=t.getOptions();if(Gr(o,e??{}))return i;Je(i,"already-initialized")}return t.initialize({options:e})}function Vp(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Xe);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Op(n,e,t){const r=hn(n);M(r._canInitEmulator,r,"emulator-config-failed"),M(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,o=xu(e),{host:a,port:u}=Lp(e),l=u===null?"":`:${u}`;r.config.emulator={url:`${o}//${a}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})}),Mp()}function xu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Lp(n){const e=xu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const o=i[1];return{host:o,port:nc(r.substr(o.length+1))}}else{const[o,a]=r.split(":");return{host:o,port:nc(a)}}}function nc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Mp(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ge("not implemented")}_getIdTokenResponse(e){return Ge("not implemented")}_linkToIdToken(e,t){return Ge("not implemented")}_getReauthenticationResolver(e){return Ge("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function en(n,e){return Iu(n,"POST","/v1/accounts:signInWithIdp",nr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xp="http://localhost";class Ot extends Uu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Ot(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Je("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,o=qs(t,["providerId","signInMethod"]);if(!r||!i)return null;const a=new Ot(r,i);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return en(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,en(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,en(e,t)}buildRequest(){const e={requestUri:xp,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=er(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr extends Fu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct extends rr{constructor(){super("facebook.com")}static credential(e){return Ot._fromParams({providerId:ct.PROVIDER_ID,signInMethod:ct.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ct.credentialFromTaggedObject(e)}static credentialFromError(e){return ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ct.credential(e.oauthAccessToken)}catch{return null}}}ct.FACEBOOK_SIGN_IN_METHOD="facebook.com";ct.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut extends rr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ot._fromParams({providerId:ut.PROVIDER_ID,signInMethod:ut.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ut.credentialFromTaggedObject(e)}static credentialFromError(e){return ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return ut.credential(t,r)}catch{return null}}}ut.GOOGLE_SIGN_IN_METHOD="google.com";ut.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt extends rr{constructor(){super("github.com")}static credential(e){return Ot._fromParams({providerId:lt.PROVIDER_ID,signInMethod:lt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return lt.credentialFromTaggedObject(e)}static credentialFromError(e){return lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return lt.credential(e.oauthAccessToken)}catch{return null}}}lt.GITHUB_SIGN_IN_METHOD="github.com";lt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht extends rr{constructor(){super("twitter.com")}static credential(e,t){return Ot._fromParams({providerId:ht.PROVIDER_ID,signInMethod:ht.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ht.credentialFromTaggedObject(e)}static credentialFromError(e){return ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return ht.credential(t,r)}catch{return null}}}ht.TWITTER_SIGN_IN_METHOD="twitter.com";ht.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Up(n,e){return Iu(n,"POST","/v1/accounts:signUp",nr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const o=await Qe._fromIdTokenResponse(e,r,i),a=rc(r);return new Lt({user:o,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=rc(r);return new Lt({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function rc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr extends $e{constructor(e,t,r,i){var o;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Jr.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Jr(e,t,r,i)}}function Bu(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?Jr._fromErrorAndOperation(n,o,e,r):o})}async function Fp(n,e,t=!1){const r=await nn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Lt._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bp(n,e,t=!1){const{auth:r}=n;if(Ke(r.app))return Promise.reject(gt(r));const i="reauthenticate";try{const o=await nn(n,Bu(r,i,e,n),t);M(o.idToken,r,"internal-error");const a=Hs(o.idToken);M(a,r,"internal-error");const{sub:u}=a;return M(n.uid===u,r,"user-mismatch"),Lt._forOperation(n,i,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&Je(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jp(n,e,t=!1){if(Ke(n.app))return Promise.reject(gt(n));const r="signIn",i=await Bu(n,r,e),o=await Lt._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(o.user),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qp(n){const e=hn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function hE(n,e,t){if(Ke(n.app))return Promise.reject(gt(n));const r=hn(n),a=await Dp(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Up).catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&qp(n),l}),u=await Lt._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(u.user),u}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $p(n,e){return wt(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dE(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=se(n),o={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await nn(r,$p(r.auth,o));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;const u=r.providerData.find(({providerId:l})=>l==="password");u&&(u.displayName=r.displayName,u.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}function zp(n,e,t,r){return se(n).onIdTokenChanged(e,t,r)}function Hp(n,e,t){return se(n).beforeAuthStateChanged(e,t)}const Zr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Zr,"1"),this.storage.removeItem(Zr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wp=1e3,Kp=10;class qu extends ju{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ou(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,u,l)=>{this.notifyListeners(a,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},o=this.storage.getItem(r);yp()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Kp):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Wp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}qu.type="LOCAL";const Gp=qu;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u extends ju{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}$u.type="SESSION";const zu=$u;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qp(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new fi(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:o}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const u=Array.from(a).map(async d=>d(t.origin,o)),l=await Qp(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}fi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ks(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xp{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let o,a;return new Promise((u,l)=>{const d=Ks("",20);i.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(y){const w=y;if(w.data.eventId===d)switch(w.data.status){case"ack":clearTimeout(p),o=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),u(w.data.response);break;default:clearTimeout(p),clearTimeout(o),l(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(){return window}function Yp(n){Fe().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hu(){return typeof Fe().WorkerGlobalScope<"u"&&typeof Fe().importScripts=="function"}async function Jp(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Zp(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function em(){return Hu()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wu="firebaseLocalStorageDb",tm=1,ei="firebaseLocalStorage",Ku="fbase_key";class ir{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function pi(n,e){return n.transaction([ei],e?"readwrite":"readonly").objectStore(ei)}function nm(){const n=indexedDB.deleteDatabase(Wu);return new ir(n).toPromise()}function Ts(){const n=indexedDB.open(Wu,tm);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ei,{keyPath:Ku})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ei)?e(r):(r.close(),await nm(),e(await Ts()))})})}async function ic(n,e,t){const r=pi(n,!0).put({[Ku]:e,value:t});return new ir(r).toPromise()}async function rm(n,e){const t=pi(n,!1).get(e),r=await new ir(t).toPromise();return r===void 0?null:r.value}function sc(n,e){const t=pi(n,!0).delete(e);return new ir(t).toPromise()}const im=800,sm=3;class Gu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ts(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>sm)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Hu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=fi._getInstance(em()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Jp(),!this.activeServiceWorker)return;this.sender=new Xp(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Zp()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ts();return await ic(e,Zr,"1"),await sc(e,Zr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>ic(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>rm(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>sc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const o=pi(i,!1).getAll();return new ir(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:o}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(o)&&(this.notifyListeners(i,o),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),im)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Gu.type="LOCAL";const om=Gu;new tr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function am(n,e){return e?Xe(e):(M(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs extends Uu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return en(e,this._buildIdpRequest())}_linkToIdToken(e,t){return en(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return en(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function cm(n){return jp(n.auth,new Gs(n),n.bypassAuthState)}function um(n){const{auth:e,user:t}=n;return M(t,e,"internal-error"),Bp(t,new Gs(n),n.bypassAuthState)}async function lm(n){const{auth:e,user:t}=n;return M(t,e,"internal-error"),Fp(t,new Gs(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(e,t,r,i,o=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:o,error:a,type:u}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return cm;case"linkViaPopup":case"linkViaRedirect":return lm;case"reauthViaPopup":case"reauthViaRedirect":return um;default:Je(this.auth,"internal-error")}}resolve(e){Ze(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ze(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hm=new tr(2e3,1e4);class Yt extends Qu{constructor(e,t,r,i,o){super(e,t,i,o),this.provider=r,this.authWindow=null,this.pollId=null,Yt.currentPopupAction&&Yt.currentPopupAction.cancel(),Yt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return M(e,this.auth,"internal-error"),e}async onExecution(){Ze(this.filter.length===1,"Popup operations only handle one event");const e=Ks();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ue(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ue(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Yt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ue(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,hm.get())};e()}}Yt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dm="pendingRedirect",Br=new Map;class fm extends Qu{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Br.get(this.auth._key());if(!e){try{const r=await pm(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Br.set(this.auth._key(),e)}return this.bypassAuthState||Br.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function pm(n,e){const t=_m(e),r=gm(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function mm(n,e){Br.set(n._key(),e)}function gm(n){return Xe(n._redirectPersistence)}function _m(n){return Fr(dm,n.config.apiKey,n.name)}async function ym(n,e,t=!1){if(Ke(n.app))return Promise.reject(gt(n));const r=hn(n),i=am(r,e),a=await new fm(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vm=10*60*1e3;class Em{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Tm(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Xu(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ue(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=vm&&this.cachedEventUids.clear(),this.cachedEventUids.has(oc(e))}saveEventToCache(e){this.cachedEventUids.add(oc(e)),this.lastProcessedEventTime=Date.now()}}function oc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Xu({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Tm(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Xu(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Im(n,e={}){return wt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wm=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Am=/^https?/;async function Rm(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Im(n);for(const t of e)try{if(Pm(t))return}catch{}Je(n,"unauthorized-domain")}function Pm(n){const e=vs(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Am.test(t))return!1;if(wm.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bm=new tr(3e4,6e4);function ac(){const n=Fe().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Sm(n){return new Promise((e,t)=>{var r,i,o;function a(){ac(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ac(),t(Ue(n,"network-request-failed"))},timeout:bm.get()})}if(!((i=(r=Fe().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((o=Fe().gapi)===null||o===void 0)&&o.load)a();else{const u=bp("iframefcb");return Fe()[u]=()=>{gapi.load?a():t(Ue(n,"network-request-failed"))},Mu(`${Pp()}?onload=${u}`).catch(l=>t(l))}}).catch(e=>{throw jr=null,e})}let jr=null;function Cm(n){return jr=jr||Sm(n),jr}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const km=new tr(5e3,15e3),Dm="__/auth/iframe",Nm="emulator/auth/iframe",Vm={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Om=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Lm(n){const e=n.config;M(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?zs(e,Nm):`https://${n.config.authDomain}/${Dm}`,r={apiKey:e.apiKey,appName:n.name,v:jt},i=Om.get(n.config.apiHost);i&&(r.eid=i);const o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),`${t}?${er(r).slice(1)}`}async function Mm(n){const e=await Cm(n),t=Fe().gapi;return M(t,n,"internal-error"),e.open({where:document.body,url:Lm(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Vm,dontclear:!0},r=>new Promise(async(i,o)=>{await r.restyle({setHideOnLeave:!1});const a=Ue(n,"network-request-failed"),u=Fe().setTimeout(()=>{o(a)},km.get());function l(){Fe().clearTimeout(u),i(r)}r.ping(l).then(l,()=>{o(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xm={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Um=500,Fm=600,Bm="_blank",jm="http://localhost";class cc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function qm(n,e,t,r=Um,i=Fm){const o=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const l=Object.assign(Object.assign({},xm),{width:r.toString(),height:i.toString(),top:o,left:a}),d=we().toLowerCase();t&&(u=Cu(d)?Bm:t),bu(d)&&(e=e||jm,l.scrollbars="yes");const p=Object.entries(l).reduce((w,[P,k])=>`${w}${P}=${k},`,"");if(_p(d)&&u!=="_self")return $m(e||"",u),new cc(null);const y=window.open(e||"",u,p);M(y,n,"popup-blocked");try{y.focus()}catch{}return new cc(y)}function $m(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zm="__/auth/handler",Hm="emulator/auth/handler",Wm=encodeURIComponent("fac");async function uc(n,e,t,r,i,o){M(n.config.authDomain,n,"auth-domain-config-required"),M(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:jt,eventId:i};if(e instanceof Fu){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Fd(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,y]of Object.entries({}))a[p]=y}if(e instanceof rr){const p=e.getScopes().filter(y=>y!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const u=a;for(const p of Object.keys(u))u[p]===void 0&&delete u[p];const l=await n._getAppCheckToken(),d=l?`#${Wm}=${encodeURIComponent(l)}`:"";return`${Km(n)}?${er(u).slice(1)}${d}`}function Km({config:n}){return n.emulator?zs(n,Hm):`https://${n.authDomain}/${zm}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const as="webStorageSupport";class Gm{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=zu,this._completeRedirectFn=ym,this._overrideRedirectResult=mm}async _openPopup(e,t,r,i){var o;Ze((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const a=await uc(e,t,r,vs(),i);return qm(e,a,Ks())}async _openRedirect(e,t,r,i){await this._originValidation(e);const o=await uc(e,t,r,vs(),i);return Yp(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:o}=this.eventManagers[t];return i?Promise.resolve(i):(Ze(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Mm(e),r=new Em(e);return t.register("authEvent",i=>(M(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(as,{type:as},i=>{var o;const a=(o=i==null?void 0:i[0])===null||o===void 0?void 0:o[as];a!==void 0&&t(!!a),Je(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Rm(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ou()||Su()||Ws()}}const Qm=Gm;var lc="@firebase/auth",hc="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){M(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ym(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Jm(n){Vt(new vt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=r.options;M(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Lu(n)},d=new wp(r,i,o,l);return Vp(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Vt(new vt("auth-internal",e=>{const t=hn(e.getProvider("auth").getImmediate());return(r=>new Xm(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),xe(lc,hc,Ym(n)),xe(lc,hc,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zm=5*60,eg=hu("authIdTokenMaxAge")||Zm;let dc=null;const tg=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>eg)return;const i=t==null?void 0:t.token;dc!==i&&(dc=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function fE(n=js()){const e=hi(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Np(n,{popupRedirectResolver:Qm,persistence:[om,Gp,zu]}),r=hu("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const a=tg(o.toString());Hp(t,a,()=>a(t.currentUser)),zp(t,u=>a(u))}}const i=cu("auth");return i&&Op(t,`http://${i}`),t}function ng(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Ap({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const o=Ue("internal-error");o.customData=i,t(o)},r.type="text/javascript",r.charset="UTF-8",ng().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Jm("Browser");var rg="firebase",ig="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */xe(rg,ig,"app");var fc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Dt,Yu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,m){function _(){}_.prototype=m.prototype,E.D=m.prototype,E.prototype=new _,E.prototype.constructor=E,E.C=function(v,T,A){for(var g=Array(arguments.length-2),ze=2;ze<arguments.length;ze++)g[ze-2]=arguments[ze];return m.prototype[T].apply(v,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,m,_){_||(_=0);var v=Array(16);if(typeof m=="string")for(var T=0;16>T;++T)v[T]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(T=0;16>T;++T)v[T]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=E.g[0],_=E.g[1],T=E.g[2];var A=E.g[3],g=m+(A^_&(T^A))+v[0]+3614090360&4294967295;m=_+(g<<7&4294967295|g>>>25),g=A+(T^m&(_^T))+v[1]+3905402710&4294967295,A=m+(g<<12&4294967295|g>>>20),g=T+(_^A&(m^_))+v[2]+606105819&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(m^T&(A^m))+v[3]+3250441966&4294967295,_=T+(g<<22&4294967295|g>>>10),g=m+(A^_&(T^A))+v[4]+4118548399&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(T^m&(_^T))+v[5]+1200080426&4294967295,A=m+(g<<12&4294967295|g>>>20),g=T+(_^A&(m^_))+v[6]+2821735955&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(m^T&(A^m))+v[7]+4249261313&4294967295,_=T+(g<<22&4294967295|g>>>10),g=m+(A^_&(T^A))+v[8]+1770035416&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(T^m&(_^T))+v[9]+2336552879&4294967295,A=m+(g<<12&4294967295|g>>>20),g=T+(_^A&(m^_))+v[10]+4294925233&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(m^T&(A^m))+v[11]+2304563134&4294967295,_=T+(g<<22&4294967295|g>>>10),g=m+(A^_&(T^A))+v[12]+1804603682&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(T^m&(_^T))+v[13]+4254626195&4294967295,A=m+(g<<12&4294967295|g>>>20),g=T+(_^A&(m^_))+v[14]+2792965006&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(m^T&(A^m))+v[15]+1236535329&4294967295,_=T+(g<<22&4294967295|g>>>10),g=m+(T^A&(_^T))+v[1]+4129170786&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(m^_))+v[6]+3225465664&4294967295,A=m+(g<<9&4294967295|g>>>23),g=T+(m^_&(A^m))+v[11]+643717713&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(T^A))+v[0]+3921069994&4294967295,_=T+(g<<20&4294967295|g>>>12),g=m+(T^A&(_^T))+v[5]+3593408605&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(m^_))+v[10]+38016083&4294967295,A=m+(g<<9&4294967295|g>>>23),g=T+(m^_&(A^m))+v[15]+3634488961&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(T^A))+v[4]+3889429448&4294967295,_=T+(g<<20&4294967295|g>>>12),g=m+(T^A&(_^T))+v[9]+568446438&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(m^_))+v[14]+3275163606&4294967295,A=m+(g<<9&4294967295|g>>>23),g=T+(m^_&(A^m))+v[3]+4107603335&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(T^A))+v[8]+1163531501&4294967295,_=T+(g<<20&4294967295|g>>>12),g=m+(T^A&(_^T))+v[13]+2850285829&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(m^_))+v[2]+4243563512&4294967295,A=m+(g<<9&4294967295|g>>>23),g=T+(m^_&(A^m))+v[7]+1735328473&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(T^A))+v[12]+2368359562&4294967295,_=T+(g<<20&4294967295|g>>>12),g=m+(_^T^A)+v[5]+4294588738&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^T)+v[8]+2272392833&4294967295,A=m+(g<<11&4294967295|g>>>21),g=T+(A^m^_)+v[11]+1839030562&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^m)+v[14]+4259657740&4294967295,_=T+(g<<23&4294967295|g>>>9),g=m+(_^T^A)+v[1]+2763975236&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^T)+v[4]+1272893353&4294967295,A=m+(g<<11&4294967295|g>>>21),g=T+(A^m^_)+v[7]+4139469664&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^m)+v[10]+3200236656&4294967295,_=T+(g<<23&4294967295|g>>>9),g=m+(_^T^A)+v[13]+681279174&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^T)+v[0]+3936430074&4294967295,A=m+(g<<11&4294967295|g>>>21),g=T+(A^m^_)+v[3]+3572445317&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^m)+v[6]+76029189&4294967295,_=T+(g<<23&4294967295|g>>>9),g=m+(_^T^A)+v[9]+3654602809&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^T)+v[12]+3873151461&4294967295,A=m+(g<<11&4294967295|g>>>21),g=T+(A^m^_)+v[15]+530742520&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^m)+v[2]+3299628645&4294967295,_=T+(g<<23&4294967295|g>>>9),g=m+(T^(_|~A))+v[0]+4096336452&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~T))+v[7]+1126891415&4294967295,A=m+(g<<10&4294967295|g>>>22),g=T+(m^(A|~_))+v[14]+2878612391&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~m))+v[5]+4237533241&4294967295,_=T+(g<<21&4294967295|g>>>11),g=m+(T^(_|~A))+v[12]+1700485571&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~T))+v[3]+2399980690&4294967295,A=m+(g<<10&4294967295|g>>>22),g=T+(m^(A|~_))+v[10]+4293915773&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~m))+v[1]+2240044497&4294967295,_=T+(g<<21&4294967295|g>>>11),g=m+(T^(_|~A))+v[8]+1873313359&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~T))+v[15]+4264355552&4294967295,A=m+(g<<10&4294967295|g>>>22),g=T+(m^(A|~_))+v[6]+2734768916&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~m))+v[13]+1309151649&4294967295,_=T+(g<<21&4294967295|g>>>11),g=m+(T^(_|~A))+v[4]+4149444226&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~T))+v[11]+3174756917&4294967295,A=m+(g<<10&4294967295|g>>>22),g=T+(m^(A|~_))+v[2]+718787259&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~m))+v[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(T+(g<<21&4294967295|g>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+A&4294967295}r.prototype.u=function(E,m){m===void 0&&(m=E.length);for(var _=m-this.blockSize,v=this.B,T=this.h,A=0;A<m;){if(T==0)for(;A<=_;)i(this,E,A),A+=this.blockSize;if(typeof E=="string"){for(;A<m;)if(v[T++]=E.charCodeAt(A++),T==this.blockSize){i(this,v),T=0;break}}else for(;A<m;)if(v[T++]=E[A++],T==this.blockSize){i(this,v),T=0;break}}this.h=T,this.o+=m},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;var _=8*this.o;for(m=E.length-8;m<E.length;++m)E[m]=_&255,_/=256;for(this.u(E),E=Array(16),m=_=0;4>m;++m)for(var v=0;32>v;v+=8)E[_++]=this.g[m]>>>v&255;return E};function o(E,m){var _=u;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=m(E)}function a(E,m){this.h=m;for(var _=[],v=!0,T=E.length-1;0<=T;T--){var A=E[T]|0;v&&A==m||(_[T]=A,v=!1)}this.g=_}var u={};function l(E){return-128<=E&&128>E?o(E,function(m){return new a([m|0],0>m?-1:0)}):new a([E|0],0>E?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return y;if(0>E)return C(d(-E));for(var m=[],_=1,v=0;E>=_;v++)m[v]=E/_|0,_*=4294967296;return new a(m,0)}function p(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return C(p(E.substring(1),m));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(m,8)),v=y,T=0;T<E.length;T+=8){var A=Math.min(8,E.length-T),g=parseInt(E.substring(T,T+A),m);8>A?(A=d(Math.pow(m,A)),v=v.j(A).add(d(g))):(v=v.j(_),v=v.add(d(g)))}return v}var y=l(0),w=l(1),P=l(16777216);n=a.prototype,n.m=function(){if(N(this))return-C(this).m();for(var E=0,m=1,_=0;_<this.g.length;_++){var v=this.i(_);E+=(0<=v?v:4294967296+v)*m,m*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(k(this))return"0";if(N(this))return"-"+C(this).toString(E);for(var m=d(Math.pow(E,6)),_=this,v="";;){var T=$(_,m).g;_=B(_,T.j(m));var A=((0<_.g.length?_.g[0]:_.h)>>>0).toString(E);if(_=T,k(_))return A+v;for(;6>A.length;)A="0"+A;v=A+v}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function k(E){if(E.h!=0)return!1;for(var m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function N(E){return E.h==-1}n.l=function(E){return E=B(this,E),N(E)?-1:k(E)?0:1};function C(E){for(var m=E.g.length,_=[],v=0;v<m;v++)_[v]=~E.g[v];return new a(_,~E.h).add(w)}n.abs=function(){return N(this)?C(this):this},n.add=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],v=0,T=0;T<=m;T++){var A=v+(this.i(T)&65535)+(E.i(T)&65535),g=(A>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);v=g>>>16,A&=65535,g&=65535,_[T]=g<<16|A}return new a(_,_[_.length-1]&-2147483648?-1:0)};function B(E,m){return E.add(C(m))}n.j=function(E){if(k(this)||k(E))return y;if(N(this))return N(E)?C(this).j(C(E)):C(C(this).j(E));if(N(E))return C(this.j(C(E)));if(0>this.l(P)&&0>E.l(P))return d(this.m()*E.m());for(var m=this.g.length+E.g.length,_=[],v=0;v<2*m;v++)_[v]=0;for(v=0;v<this.g.length;v++)for(var T=0;T<E.g.length;T++){var A=this.i(v)>>>16,g=this.i(v)&65535,ze=E.i(T)>>>16,gn=E.i(T)&65535;_[2*v+2*T]+=g*gn,q(_,2*v+2*T),_[2*v+2*T+1]+=A*gn,q(_,2*v+2*T+1),_[2*v+2*T+1]+=g*ze,q(_,2*v+2*T+1),_[2*v+2*T+2]+=A*ze,q(_,2*v+2*T+2)}for(v=0;v<m;v++)_[v]=_[2*v+1]<<16|_[2*v];for(v=m;v<2*m;v++)_[v]=0;return new a(_,0)};function q(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function j(E,m){this.g=E,this.h=m}function $(E,m){if(k(m))throw Error("division by zero");if(k(E))return new j(y,y);if(N(E))return m=$(C(E),m),new j(C(m.g),C(m.h));if(N(m))return m=$(E,C(m)),new j(C(m.g),m.h);if(30<E.g.length){if(N(E)||N(m))throw Error("slowDivide_ only works with positive integers.");for(var _=w,v=m;0>=v.l(E);)_=le(_),v=le(v);var T=Y(_,1),A=Y(v,1);for(v=Y(v,2),_=Y(_,2);!k(v);){var g=A.add(v);0>=g.l(E)&&(T=T.add(_),A=g),v=Y(v,1),_=Y(_,1)}return m=B(E,T.j(m)),new j(T,m)}for(T=y;0<=E.l(m);){for(_=Math.max(1,Math.floor(E.m()/m.m())),v=Math.ceil(Math.log(_)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),A=d(_),g=A.j(m);N(g)||0<g.l(E);)_-=v,A=d(_),g=A.j(m);k(A)&&(A=w),T=T.add(A),E=B(E,g)}return new j(T,E)}n.A=function(E){return $(this,E).h},n.and=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)&E.i(v);return new a(_,this.h&E.h)},n.or=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)|E.i(v);return new a(_,this.h|E.h)},n.xor=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)^E.i(v);return new a(_,this.h^E.h)};function le(E){for(var m=E.g.length+1,_=[],v=0;v<m;v++)_[v]=E.i(v)<<1|E.i(v-1)>>>31;return new a(_,E.h)}function Y(E,m){var _=m>>5;m%=32;for(var v=E.g.length-_,T=[],A=0;A<v;A++)T[A]=0<m?E.i(A+_)>>>m|E.i(A+_+1)<<32-m:E.i(A+_);return new a(T,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Yu=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,Dt=a}).apply(typeof fc<"u"?fc:typeof self<"u"?self:typeof window<"u"?window:{});var Nr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ju,Ln,Zu,qr,Is,el,tl,nl;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,c,h){return s==Array.prototype||s==Object.prototype||(s[c]=h.value),s};function t(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Nr=="object"&&Nr];for(var c=0;c<s.length;++c){var h=s[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(s,c){if(c)e:{var h=r;s=s.split(".");for(var f=0;f<s.length-1;f++){var I=s[f];if(!(I in h))break e;h=h[I]}s=s[s.length-1],f=h[s],c=c(f),c!=f&&c!=null&&e(h,s,{configurable:!0,writable:!0,value:c})}}function o(s,c){s instanceof String&&(s+="");var h=0,f=!1,I={next:function(){if(!f&&h<s.length){var R=h++;return{value:c(R,s[R]),done:!1}}return f=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}i("Array.prototype.values",function(s){return s||function(){return o(this,function(c,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},u=this||self;function l(s){var c=typeof s;return c=c!="object"?c:s?Array.isArray(s)?"array":c:"null",c=="array"||c=="object"&&typeof s.length=="number"}function d(s){var c=typeof s;return c=="object"&&s!=null||c=="function"}function p(s,c,h){return s.call.apply(s.bind,arguments)}function y(s,c,h){if(!s)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,f),s.apply(c,I)}}return function(){return s.apply(c,arguments)}}function w(s,c,h){return w=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:y,w.apply(null,arguments)}function P(s,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),s.apply(this,f)}}function k(s,c){function h(){}h.prototype=c.prototype,s.aa=c.prototype,s.prototype=new h,s.prototype.constructor=s,s.Qb=function(f,I,R){for(var D=Array(arguments.length-2),X=2;X<arguments.length;X++)D[X-2]=arguments[X];return c.prototype[I].apply(f,D)}}function N(s){const c=s.length;if(0<c){const h=Array(c);for(let f=0;f<c;f++)h[f]=s[f];return h}return[]}function C(s,c){for(let h=1;h<arguments.length;h++){const f=arguments[h];if(l(f)){const I=s.length||0,R=f.length||0;s.length=I+R;for(let D=0;D<R;D++)s[I+D]=f[D]}else s.push(f)}}class B{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function q(s){return/^[\s\xa0]*$/.test(s)}function j(){var s=u.navigator;return s&&(s=s.userAgent)?s:""}function $(s){return $[" "](s),s}$[" "]=function(){};var le=j().indexOf("Gecko")!=-1&&!(j().toLowerCase().indexOf("webkit")!=-1&&j().indexOf("Edge")==-1)&&!(j().indexOf("Trident")!=-1||j().indexOf("MSIE")!=-1)&&j().indexOf("Edge")==-1;function Y(s,c,h){for(const f in s)c.call(h,s[f],f,s)}function E(s,c){for(const h in s)c.call(void 0,s[h],h,s)}function m(s){const c={};for(const h in s)c[h]=s[h];return c}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(s,c){let h,f;for(let I=1;I<arguments.length;I++){f=arguments[I];for(h in f)s[h]=f[h];for(let R=0;R<_.length;R++)h=_[R],Object.prototype.hasOwnProperty.call(f,h)&&(s[h]=f[h])}}function T(s){var c=1;s=s.split(":");const h=[];for(;0<c&&s.length;)h.push(s.shift()),c--;return s.length&&h.push(s.join(":")),h}function A(s){u.setTimeout(()=>{throw s},0)}function g(){var s=Di;let c=null;return s.g&&(c=s.g,s.g=s.g.next,s.g||(s.h=null),c.next=null),c}class ze{constructor(){this.h=this.g=null}add(c,h){const f=gn.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var gn=new B(()=>new Uh,s=>s.reset());class Uh{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let _n,yn=!1,Di=new ze,Uo=()=>{const s=u.Promise.resolve(void 0);_n=()=>{s.then(Fh)}};var Fh=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(h){A(h)}var c=gn;c.j(s),100>c.h&&(c.h++,s.next=c.g,c.g=s)}yn=!1};function rt(){this.s=this.s,this.C=this.C}rt.prototype.s=!1,rt.prototype.ma=function(){this.s||(this.s=!0,this.N())},rt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ge(s,c){this.type=s,this.g=this.target=c,this.defaultPrevented=!1}ge.prototype.h=function(){this.defaultPrevented=!0};var Bh=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var s=!1,c=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const h=()=>{};u.addEventListener("test",h,c),u.removeEventListener("test",h,c)}catch{}return s}();function vn(s,c){if(ge.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var h=this.type=s.type,f=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=c,c=s.relatedTarget){if(le){e:{try{$(c.nodeName);var I=!0;break e}catch{}I=!1}I||(c=null)}}else h=="mouseover"?c=s.fromElement:h=="mouseout"&&(c=s.toElement);this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:jh[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&vn.aa.h.call(this)}}k(vn,ge);var jh={2:"touch",3:"pen",4:"mouse"};vn.prototype.h=function(){vn.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var dr="closure_listenable_"+(1e6*Math.random()|0),qh=0;function $h(s,c,h,f,I){this.listener=s,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=I,this.key=++qh,this.da=this.fa=!1}function fr(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function pr(s){this.src=s,this.g={},this.h=0}pr.prototype.add=function(s,c,h,f,I){var R=s.toString();s=this.g[R],s||(s=this.g[R]=[],this.h++);var D=Vi(s,c,f,I);return-1<D?(c=s[D],h||(c.fa=!1)):(c=new $h(c,this.src,R,!!f,I),c.fa=h,s.push(c)),c};function Ni(s,c){var h=c.type;if(h in s.g){var f=s.g[h],I=Array.prototype.indexOf.call(f,c,void 0),R;(R=0<=I)&&Array.prototype.splice.call(f,I,1),R&&(fr(c),s.g[h].length==0&&(delete s.g[h],s.h--))}}function Vi(s,c,h,f){for(var I=0;I<s.length;++I){var R=s[I];if(!R.da&&R.listener==c&&R.capture==!!h&&R.ha==f)return I}return-1}var Oi="closure_lm_"+(1e6*Math.random()|0),Li={};function Fo(s,c,h,f,I){if(Array.isArray(c)){for(var R=0;R<c.length;R++)Fo(s,c[R],h,f,I);return null}return h=qo(h),s&&s[dr]?s.K(c,h,d(f)?!!f.capture:!!f,I):zh(s,c,h,!1,f,I)}function zh(s,c,h,f,I,R){if(!c)throw Error("Invalid event type");var D=d(I)?!!I.capture:!!I,X=xi(s);if(X||(s[Oi]=X=new pr(s)),h=X.add(c,h,f,D,R),h.proxy)return h;if(f=Hh(),h.proxy=f,f.src=s,f.listener=h,s.addEventListener)Bh||(I=D),I===void 0&&(I=!1),s.addEventListener(c.toString(),f,I);else if(s.attachEvent)s.attachEvent(jo(c.toString()),f);else if(s.addListener&&s.removeListener)s.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Hh(){function s(h){return c.call(s.src,s.listener,h)}const c=Wh;return s}function Bo(s,c,h,f,I){if(Array.isArray(c))for(var R=0;R<c.length;R++)Bo(s,c[R],h,f,I);else f=d(f)?!!f.capture:!!f,h=qo(h),s&&s[dr]?(s=s.i,c=String(c).toString(),c in s.g&&(R=s.g[c],h=Vi(R,h,f,I),-1<h&&(fr(R[h]),Array.prototype.splice.call(R,h,1),R.length==0&&(delete s.g[c],s.h--)))):s&&(s=xi(s))&&(c=s.g[c.toString()],s=-1,c&&(s=Vi(c,h,f,I)),(h=-1<s?c[s]:null)&&Mi(h))}function Mi(s){if(typeof s!="number"&&s&&!s.da){var c=s.src;if(c&&c[dr])Ni(c.i,s);else{var h=s.type,f=s.proxy;c.removeEventListener?c.removeEventListener(h,f,s.capture):c.detachEvent?c.detachEvent(jo(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=xi(c))?(Ni(h,s),h.h==0&&(h.src=null,c[Oi]=null)):fr(s)}}}function jo(s){return s in Li?Li[s]:Li[s]="on"+s}function Wh(s,c){if(s.da)s=!0;else{c=new vn(c,this);var h=s.listener,f=s.ha||s.src;s.fa&&Mi(s),s=h.call(f,c)}return s}function xi(s){return s=s[Oi],s instanceof pr?s:null}var Ui="__closure_events_fn_"+(1e9*Math.random()>>>0);function qo(s){return typeof s=="function"?s:(s[Ui]||(s[Ui]=function(c){return s.handleEvent(c)}),s[Ui])}function _e(){rt.call(this),this.i=new pr(this),this.M=this,this.F=null}k(_e,rt),_e.prototype[dr]=!0,_e.prototype.removeEventListener=function(s,c,h,f){Bo(this,s,c,h,f)};function Ae(s,c){var h,f=s.F;if(f)for(h=[];f;f=f.F)h.push(f);if(s=s.M,f=c.type||c,typeof c=="string")c=new ge(c,s);else if(c instanceof ge)c.target=c.target||s;else{var I=c;c=new ge(f,s),v(c,I)}if(I=!0,h)for(var R=h.length-1;0<=R;R--){var D=c.g=h[R];I=mr(D,f,!0,c)&&I}if(D=c.g=s,I=mr(D,f,!0,c)&&I,I=mr(D,f,!1,c)&&I,h)for(R=0;R<h.length;R++)D=c.g=h[R],I=mr(D,f,!1,c)&&I}_e.prototype.N=function(){if(_e.aa.N.call(this),this.i){var s=this.i,c;for(c in s.g){for(var h=s.g[c],f=0;f<h.length;f++)fr(h[f]);delete s.g[c],s.h--}}this.F=null},_e.prototype.K=function(s,c,h,f){return this.i.add(String(s),c,!1,h,f)},_e.prototype.L=function(s,c,h,f){return this.i.add(String(s),c,!0,h,f)};function mr(s,c,h,f){if(c=s.i.g[String(c)],!c)return!0;c=c.concat();for(var I=!0,R=0;R<c.length;++R){var D=c[R];if(D&&!D.da&&D.capture==h){var X=D.listener,he=D.ha||D.src;D.fa&&Ni(s.i,D),I=X.call(he,f)!==!1&&I}}return I&&!f.defaultPrevented}function $o(s,c,h){if(typeof s=="function")h&&(s=w(s,h));else if(s&&typeof s.handleEvent=="function")s=w(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:u.setTimeout(s,c||0)}function zo(s){s.g=$o(()=>{s.g=null,s.i&&(s.i=!1,zo(s))},s.l);const c=s.h;s.h=null,s.m.apply(null,c)}class Kh extends rt{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:zo(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function En(s){rt.call(this),this.h=s,this.g={}}k(En,rt);var Ho=[];function Wo(s){Y(s.g,function(c,h){this.g.hasOwnProperty(h)&&Mi(c)},s),s.g={}}En.prototype.N=function(){En.aa.N.call(this),Wo(this)},En.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Fi=u.JSON.stringify,Gh=u.JSON.parse,Qh=class{stringify(s){return u.JSON.stringify(s,void 0)}parse(s){return u.JSON.parse(s,void 0)}};function Bi(){}Bi.prototype.h=null;function Ko(s){return s.h||(s.h=s.i())}function Go(){}var Tn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ji(){ge.call(this,"d")}k(ji,ge);function qi(){ge.call(this,"c")}k(qi,ge);var Rt={},Qo=null;function gr(){return Qo=Qo||new _e}Rt.La="serverreachability";function Xo(s){ge.call(this,Rt.La,s)}k(Xo,ge);function In(s){const c=gr();Ae(c,new Xo(c))}Rt.STAT_EVENT="statevent";function Yo(s,c){ge.call(this,Rt.STAT_EVENT,s),this.stat=c}k(Yo,ge);function Re(s){const c=gr();Ae(c,new Yo(c,s))}Rt.Ma="timingevent";function Jo(s,c){ge.call(this,Rt.Ma,s),this.size=c}k(Jo,ge);function wn(s,c){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){s()},c)}function An(){this.g=!0}An.prototype.xa=function(){this.g=!1};function Xh(s,c,h,f,I,R){s.info(function(){if(s.g)if(R)for(var D="",X=R.split("&"),he=0;he<X.length;he++){var K=X[he].split("=");if(1<K.length){var ye=K[0];K=K[1];var ve=ye.split("_");D=2<=ve.length&&ve[1]=="type"?D+(ye+"="+K+"&"):D+(ye+"=redacted&")}}else D=null;else D=R;return"XMLHTTP REQ ("+f+") [attempt "+I+"]: "+c+`
`+h+`
`+D})}function Yh(s,c,h,f,I,R,D){s.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+I+"]: "+c+`
`+h+`
`+R+" "+D})}function zt(s,c,h,f){s.info(function(){return"XMLHTTP TEXT ("+c+"): "+Zh(s,h)+(f?" "+f:"")})}function Jh(s,c){s.info(function(){return"TIMEOUT: "+c})}An.prototype.info=function(){};function Zh(s,c){if(!s.g)return c;if(!c)return null;try{var h=JSON.parse(c);if(h){for(s=0;s<h.length;s++)if(Array.isArray(h[s])){var f=h[s];if(!(2>f.length)){var I=f[1];if(Array.isArray(I)&&!(1>I.length)){var R=I[0];if(R!="noop"&&R!="stop"&&R!="close")for(var D=1;D<I.length;D++)I[D]=""}}}}return Fi(h)}catch{return c}}var _r={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Zo={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},$i;function yr(){}k(yr,Bi),yr.prototype.g=function(){return new XMLHttpRequest},yr.prototype.i=function(){return{}},$i=new yr;function it(s,c,h,f){this.j=s,this.i=c,this.l=h,this.R=f||1,this.U=new En(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ea}function ea(){this.i=null,this.g="",this.h=!1}var ta={},zi={};function Hi(s,c,h){s.L=1,s.v=Ir(He(c)),s.m=h,s.P=!0,na(s,null)}function na(s,c){s.F=Date.now(),vr(s),s.A=He(s.v);var h=s.A,f=s.R;Array.isArray(f)||(f=[String(f)]),ga(h.i,"t",f),s.C=0,h=s.j.J,s.h=new ea,s.g=Oa(s.j,h?c:null,!s.m),0<s.O&&(s.M=new Kh(w(s.Y,s,s.g),s.O)),c=s.U,h=s.g,f=s.ca;var I="readystatechange";Array.isArray(I)||(I&&(Ho[0]=I.toString()),I=Ho);for(var R=0;R<I.length;R++){var D=Fo(h,I[R],f||c.handleEvent,!1,c.h||c);if(!D)break;c.g[D.key]=D}c=s.H?m(s.H):{},s.m?(s.u||(s.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,c)):(s.u="GET",s.g.ea(s.A,s.u,null,c)),In(),Xh(s.i,s.u,s.A,s.l,s.R,s.m)}it.prototype.ca=function(s){s=s.target;const c=this.M;c&&We(s)==3?c.j():this.Y(s)},it.prototype.Y=function(s){try{if(s==this.g)e:{const ve=We(this.g);var c=this.g.Ba();const Kt=this.g.Z();if(!(3>ve)&&(ve!=3||this.g&&(this.h.h||this.g.oa()||wa(this.g)))){this.J||ve!=4||c==7||(c==8||0>=Kt?In(3):In(2)),Wi(this);var h=this.g.Z();this.X=h;t:if(ra(this)){var f=wa(this.g);s="";var I=f.length,R=We(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Pt(this),Rn(this);var D="";break t}this.h.i=new u.TextDecoder}for(c=0;c<I;c++)this.h.h=!0,s+=this.h.i.decode(f[c],{stream:!(R&&c==I-1)});f.length=0,this.h.g+=s,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=h==200,Yh(this.i,this.u,this.A,this.l,this.R,ve,h),this.o){if(this.T&&!this.K){t:{if(this.g){var X,he=this.g;if((X=he.g?he.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(X)){var K=X;break t}}K=null}if(h=K)zt(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ki(this,h);else{this.o=!1,this.s=3,Re(12),Pt(this),Rn(this);break e}}if(this.P){h=!0;let Ne;for(;!this.J&&this.C<D.length;)if(Ne=ed(this,D),Ne==zi){ve==4&&(this.s=4,Re(14),h=!1),zt(this.i,this.l,null,"[Incomplete Response]");break}else if(Ne==ta){this.s=4,Re(15),zt(this.i,this.l,D,"[Invalid Chunk]"),h=!1;break}else zt(this.i,this.l,Ne,null),Ki(this,Ne);if(ra(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ve!=4||D.length!=0||this.h.h||(this.s=1,Re(16),h=!1),this.o=this.o&&h,!h)zt(this.i,this.l,D,"[Invalid Chunked Response]"),Pt(this),Rn(this);else if(0<D.length&&!this.W){this.W=!0;var ye=this.j;ye.g==this&&ye.ba&&!ye.M&&(ye.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),Zi(ye),ye.M=!0,Re(11))}}else zt(this.i,this.l,D,null),Ki(this,D);ve==4&&Pt(this),this.o&&!this.J&&(ve==4?ka(this.j,this):(this.o=!1,vr(this)))}else _d(this.g),h==400&&0<D.indexOf("Unknown SID")?(this.s=3,Re(12)):(this.s=0,Re(13)),Pt(this),Rn(this)}}}catch{}finally{}};function ra(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function ed(s,c){var h=s.C,f=c.indexOf(`
`,h);return f==-1?zi:(h=Number(c.substring(h,f)),isNaN(h)?ta:(f+=1,f+h>c.length?zi:(c=c.slice(f,f+h),s.C=f+h,c)))}it.prototype.cancel=function(){this.J=!0,Pt(this)};function vr(s){s.S=Date.now()+s.I,ia(s,s.I)}function ia(s,c){if(s.B!=null)throw Error("WatchDog timer not null");s.B=wn(w(s.ba,s),c)}function Wi(s){s.B&&(u.clearTimeout(s.B),s.B=null)}it.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(Jh(this.i,this.A),this.L!=2&&(In(),Re(17)),Pt(this),this.s=2,Rn(this)):ia(this,this.S-s)};function Rn(s){s.j.G==0||s.J||ka(s.j,s)}function Pt(s){Wi(s);var c=s.M;c&&typeof c.ma=="function"&&c.ma(),s.M=null,Wo(s.U),s.g&&(c=s.g,s.g=null,c.abort(),c.ma())}function Ki(s,c){try{var h=s.j;if(h.G!=0&&(h.g==s||Gi(h.h,s))){if(!s.K&&Gi(h.h,s)&&h.G==3){try{var f=h.Da.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var I=f;if(I[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<s.F)Sr(h),Pr(h);else break e;Ji(h),Re(18)}}else h.za=I[1],0<h.za-h.T&&37500>I[2]&&h.F&&h.v==0&&!h.C&&(h.C=wn(w(h.Za,h),6e3));if(1>=aa(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else St(h,11)}else if((s.K||h.g==s)&&Sr(h),!q(c))for(I=h.Da.g.parse(c),c=0;c<I.length;c++){let K=I[c];if(h.T=K[0],K=K[1],h.G==2)if(K[0]=="c"){h.K=K[1],h.ia=K[2];const ye=K[3];ye!=null&&(h.la=ye,h.j.info("VER="+h.la));const ve=K[4];ve!=null&&(h.Aa=ve,h.j.info("SVER="+h.Aa));const Kt=K[5];Kt!=null&&typeof Kt=="number"&&0<Kt&&(f=1.5*Kt,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const Ne=s.g;if(Ne){const kr=Ne.g?Ne.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(kr){var R=f.h;R.g||kr.indexOf("spdy")==-1&&kr.indexOf("quic")==-1&&kr.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Qi(R,R.h),R.h=null))}if(f.D){const es=Ne.g?Ne.g.getResponseHeader("X-HTTP-Session-Id"):null;es&&(f.ya=es,J(f.I,f.D,es))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-s.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var D=s;if(f.qa=Va(f,f.J?f.ia:null,f.W),D.K){ca(f.h,D);var X=D,he=f.L;he&&(X.I=he),X.B&&(Wi(X),vr(X)),f.g=D}else Sa(f);0<h.i.length&&br(h)}else K[0]!="stop"&&K[0]!="close"||St(h,7);else h.G==3&&(K[0]=="stop"||K[0]=="close"?K[0]=="stop"?St(h,7):Yi(h):K[0]!="noop"&&h.l&&h.l.ta(K),h.v=0)}}In(4)}catch{}}var td=class{constructor(s,c){this.g=s,this.map=c}};function sa(s){this.l=s||10,u.PerformanceNavigationTiming?(s=u.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function oa(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function aa(s){return s.h?1:s.g?s.g.size:0}function Gi(s,c){return s.h?s.h==c:s.g?s.g.has(c):!1}function Qi(s,c){s.g?s.g.add(c):s.h=c}function ca(s,c){s.h&&s.h==c?s.h=null:s.g&&s.g.has(c)&&s.g.delete(c)}sa.prototype.cancel=function(){if(this.i=ua(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function ua(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let c=s.i;for(const h of s.g.values())c=c.concat(h.D);return c}return N(s.i)}function nd(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(l(s)){for(var c=[],h=s.length,f=0;f<h;f++)c.push(s[f]);return c}c=[],h=0;for(f in s)c[h++]=s[f];return c}function rd(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(l(s)||typeof s=="string"){var c=[];s=s.length;for(var h=0;h<s;h++)c.push(h);return c}c=[],h=0;for(const f in s)c[h++]=f;return c}}}function la(s,c){if(s.forEach&&typeof s.forEach=="function")s.forEach(c,void 0);else if(l(s)||typeof s=="string")Array.prototype.forEach.call(s,c,void 0);else for(var h=rd(s),f=nd(s),I=f.length,R=0;R<I;R++)c.call(void 0,f[R],h&&h[R],s)}var ha=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function id(s,c){if(s){s=s.split("&");for(var h=0;h<s.length;h++){var f=s[h].indexOf("="),I=null;if(0<=f){var R=s[h].substring(0,f);I=s[h].substring(f+1)}else R=s[h];c(R,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function bt(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof bt){this.h=s.h,Er(this,s.j),this.o=s.o,this.g=s.g,Tr(this,s.s),this.l=s.l;var c=s.i,h=new Sn;h.i=c.i,c.g&&(h.g=new Map(c.g),h.h=c.h),da(this,h),this.m=s.m}else s&&(c=String(s).match(ha))?(this.h=!1,Er(this,c[1]||"",!0),this.o=Pn(c[2]||""),this.g=Pn(c[3]||"",!0),Tr(this,c[4]),this.l=Pn(c[5]||"",!0),da(this,c[6]||"",!0),this.m=Pn(c[7]||"")):(this.h=!1,this.i=new Sn(null,this.h))}bt.prototype.toString=function(){var s=[],c=this.j;c&&s.push(bn(c,fa,!0),":");var h=this.g;return(h||c=="file")&&(s.push("//"),(c=this.o)&&s.push(bn(c,fa,!0),"@"),s.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&s.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&s.push("/"),s.push(bn(h,h.charAt(0)=="/"?ad:od,!0))),(h=this.i.toString())&&s.push("?",h),(h=this.m)&&s.push("#",bn(h,ud)),s.join("")};function He(s){return new bt(s)}function Er(s,c,h){s.j=h?Pn(c,!0):c,s.j&&(s.j=s.j.replace(/:$/,""))}function Tr(s,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);s.s=c}else s.s=null}function da(s,c,h){c instanceof Sn?(s.i=c,ld(s.i,s.h)):(h||(c=bn(c,cd)),s.i=new Sn(c,s.h))}function J(s,c,h){s.i.set(c,h)}function Ir(s){return J(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function Pn(s,c){return s?c?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function bn(s,c,h){return typeof s=="string"?(s=encodeURI(s).replace(c,sd),h&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function sd(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var fa=/[#\/\?@]/g,od=/[#\?:]/g,ad=/[#\?]/g,cd=/[#\?@]/g,ud=/#/g;function Sn(s,c){this.h=this.g=null,this.i=s||null,this.j=!!c}function st(s){s.g||(s.g=new Map,s.h=0,s.i&&id(s.i,function(c,h){s.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=Sn.prototype,n.add=function(s,c){st(this),this.i=null,s=Ht(this,s);var h=this.g.get(s);return h||this.g.set(s,h=[]),h.push(c),this.h+=1,this};function pa(s,c){st(s),c=Ht(s,c),s.g.has(c)&&(s.i=null,s.h-=s.g.get(c).length,s.g.delete(c))}function ma(s,c){return st(s),c=Ht(s,c),s.g.has(c)}n.forEach=function(s,c){st(this),this.g.forEach(function(h,f){h.forEach(function(I){s.call(c,I,f,this)},this)},this)},n.na=function(){st(this);const s=Array.from(this.g.values()),c=Array.from(this.g.keys()),h=[];for(let f=0;f<c.length;f++){const I=s[f];for(let R=0;R<I.length;R++)h.push(c[f])}return h},n.V=function(s){st(this);let c=[];if(typeof s=="string")ma(this,s)&&(c=c.concat(this.g.get(Ht(this,s))));else{s=Array.from(this.g.values());for(let h=0;h<s.length;h++)c=c.concat(s[h])}return c},n.set=function(s,c){return st(this),this.i=null,s=Ht(this,s),ma(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[c]),this.h+=1,this},n.get=function(s,c){return s?(s=this.V(s),0<s.length?String(s[0]):c):c};function ga(s,c,h){pa(s,c),0<h.length&&(s.i=null,s.g.set(Ht(s,c),N(h)),s.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],c=Array.from(this.g.keys());for(var h=0;h<c.length;h++){var f=c[h];const R=encodeURIComponent(String(f)),D=this.V(f);for(f=0;f<D.length;f++){var I=R;D[f]!==""&&(I+="="+encodeURIComponent(String(D[f]))),s.push(I)}}return this.i=s.join("&")};function Ht(s,c){return c=String(c),s.j&&(c=c.toLowerCase()),c}function ld(s,c){c&&!s.j&&(st(s),s.i=null,s.g.forEach(function(h,f){var I=f.toLowerCase();f!=I&&(pa(this,f),ga(this,I,h))},s)),s.j=c}function hd(s,c){const h=new An;if(u.Image){const f=new Image;f.onload=P(ot,h,"TestLoadImage: loaded",!0,c,f),f.onerror=P(ot,h,"TestLoadImage: error",!1,c,f),f.onabort=P(ot,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=P(ot,h,"TestLoadImage: timeout",!1,c,f),u.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=s}else c(!1)}function dd(s,c){const h=new An,f=new AbortController,I=setTimeout(()=>{f.abort(),ot(h,"TestPingServer: timeout",!1,c)},1e4);fetch(s,{signal:f.signal}).then(R=>{clearTimeout(I),R.ok?ot(h,"TestPingServer: ok",!0,c):ot(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(I),ot(h,"TestPingServer: error",!1,c)})}function ot(s,c,h,f,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),f(h)}catch{}}function fd(){this.g=new Qh}function pd(s,c,h){const f=h||"";try{la(s,function(I,R){let D=I;d(I)&&(D=Fi(I)),c.push(f+R+"="+encodeURIComponent(D))})}catch(I){throw c.push(f+"type="+encodeURIComponent("_badmap")),I}}function wr(s){this.l=s.Ub||null,this.j=s.eb||!1}k(wr,Bi),wr.prototype.g=function(){return new Ar(this.l,this.j)},wr.prototype.i=function(s){return function(){return s}}({});function Ar(s,c){_e.call(this),this.D=s,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Ar,_e),n=Ar.prototype,n.open=function(s,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=c,this.readyState=1,kn(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(c.body=s),(this.D||u).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Cn(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,kn(this)),this.g&&(this.readyState=3,kn(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;_a(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function _a(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var c=s.value?s.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!s.done}))&&(this.response=this.responseText+=c)}s.done?Cn(this):kn(this),this.readyState==3&&_a(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,Cn(this))},n.Qa=function(s){this.g&&(this.response=s,Cn(this))},n.ga=function(){this.g&&Cn(this)};function Cn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,kn(s)}n.setRequestHeader=function(s,c){this.u.append(s,c)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,s.push(h[0]+": "+h[1]),h=c.next();return s.join(`\r
`)};function kn(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Ar.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function ya(s){let c="";return Y(s,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function Xi(s,c,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=ya(h),typeof s=="string"?h!=null&&encodeURIComponent(String(h)):J(s,c,h))}function te(s){_e.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(te,_e);var md=/^https?$/i,gd=["POST","PUT"];n=te.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);c=c?c.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():$i.g(),this.v=this.o?Ko(this.o):Ko($i),this.g.onreadystatechange=w(this.Ea,this);try{this.B=!0,this.g.open(c,String(s),!0),this.B=!1}catch(R){va(this,R);return}if(s=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var I in f)h.set(I,f[I]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const R of f.keys())h.set(R,f.get(R));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),I=u.FormData&&s instanceof u.FormData,!(0<=Array.prototype.indexOf.call(gd,c,void 0))||f||I||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,D]of h)this.g.setRequestHeader(R,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ia(this),this.u=!0,this.g.send(s),this.u=!1}catch(R){va(this,R)}};function va(s,c){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=c,s.m=5,Ea(s),Rr(s)}function Ea(s){s.A||(s.A=!0,Ae(s,"complete"),Ae(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,Ae(this,"complete"),Ae(this,"abort"),Rr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Rr(this,!0)),te.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Ta(this):this.bb())},n.bb=function(){Ta(this)};function Ta(s){if(s.h&&typeof a<"u"&&(!s.v[1]||We(s)!=4||s.Z()!=2)){if(s.u&&We(s)==4)$o(s.Ea,0,s);else if(Ae(s,"readystatechange"),We(s)==4){s.h=!1;try{const D=s.Z();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var f;if(f=D===0){var I=String(s.D).match(ha)[1]||null;!I&&u.self&&u.self.location&&(I=u.self.location.protocol.slice(0,-1)),f=!md.test(I?I.toLowerCase():"")}h=f}if(h)Ae(s,"complete"),Ae(s,"success");else{s.m=6;try{var R=2<We(s)?s.g.statusText:""}catch{R=""}s.l=R+" ["+s.Z()+"]",Ea(s)}}finally{Rr(s)}}}}function Rr(s,c){if(s.g){Ia(s);const h=s.g,f=s.v[0]?()=>{}:null;s.g=null,s.v=null,c||Ae(s,"ready");try{h.onreadystatechange=f}catch{}}}function Ia(s){s.I&&(u.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function We(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<We(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var c=this.g.responseText;return s&&c.indexOf(s)==0&&(c=c.substring(s.length)),Gh(c)}};function wa(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function _d(s){const c={};s=(s.g&&2<=We(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<s.length;f++){if(q(s[f]))continue;var h=T(s[f]);const I=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const R=c[I]||[];c[I]=R,R.push(h)}E(c,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Dn(s,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[s]||c}function Aa(s){this.Aa=0,this.i=[],this.j=new An,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Dn("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Dn("baseRetryDelayMs",5e3,s),this.cb=Dn("retryDelaySeedMs",1e4,s),this.Wa=Dn("forwardChannelMaxRetries",2,s),this.wa=Dn("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new sa(s&&s.concurrentRequestLimit),this.Da=new fd,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Aa.prototype,n.la=8,n.G=1,n.connect=function(s,c,h,f){Re(0),this.W=s,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=Va(this,null,this.W),br(this)};function Yi(s){if(Ra(s),s.G==3){var c=s.U++,h=He(s.I);if(J(h,"SID",s.K),J(h,"RID",c),J(h,"TYPE","terminate"),Nn(s,h),c=new it(s,s.j,c),c.L=2,c.v=Ir(He(h)),h=!1,u.navigator&&u.navigator.sendBeacon)try{h=u.navigator.sendBeacon(c.v.toString(),"")}catch{}!h&&u.Image&&(new Image().src=c.v,h=!0),h||(c.g=Oa(c.j,null),c.g.ea(c.v)),c.F=Date.now(),vr(c)}Na(s)}function Pr(s){s.g&&(Zi(s),s.g.cancel(),s.g=null)}function Ra(s){Pr(s),s.u&&(u.clearTimeout(s.u),s.u=null),Sr(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&u.clearTimeout(s.s),s.s=null)}function br(s){if(!oa(s.h)&&!s.s){s.s=!0;var c=s.Ga;_n||Uo(),yn||(_n(),yn=!0),Di.add(c,s),s.B=0}}function yd(s,c){return aa(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=c.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=wn(w(s.Ga,s,c),Da(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const I=new it(this,this.j,s);let R=this.o;if(this.S&&(R?(R=m(R),v(R,this.S)):R=this.S),this.m!==null||this.O||(I.H=R,R=null),this.P)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,4096<c){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=ba(this,I,c),h=He(this.I),J(h,"RID",s),J(h,"CVER",22),this.D&&J(h,"X-HTTP-Session-Id",this.D),Nn(this,h),R&&(this.O?c="headers="+encodeURIComponent(String(ya(R)))+"&"+c:this.m&&Xi(h,this.m,R)),Qi(this.h,I),this.Ua&&J(h,"TYPE","init"),this.P?(J(h,"$req",c),J(h,"SID","null"),I.T=!0,Hi(I,h,null)):Hi(I,h,c),this.G=2}}else this.G==3&&(s?Pa(this,s):this.i.length==0||oa(this.h)||Pa(this))};function Pa(s,c){var h;c?h=c.l:h=s.U++;const f=He(s.I);J(f,"SID",s.K),J(f,"RID",h),J(f,"AID",s.T),Nn(s,f),s.m&&s.o&&Xi(f,s.m,s.o),h=new it(s,s.j,h,s.B+1),s.m===null&&(h.H=s.o),c&&(s.i=c.D.concat(s.i)),c=ba(s,h,1e3),h.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Qi(s.h,h),Hi(h,f,c)}function Nn(s,c){s.H&&Y(s.H,function(h,f){J(c,f,h)}),s.l&&la({},function(h,f){J(c,f,h)})}function ba(s,c,h){h=Math.min(s.i.length,h);var f=s.l?w(s.l.Na,s.l,s):null;e:{var I=s.i;let R=-1;for(;;){const D=["count="+h];R==-1?0<h?(R=I[0].g,D.push("ofs="+R)):R=0:D.push("ofs="+R);let X=!0;for(let he=0;he<h;he++){let K=I[he].g;const ye=I[he].map;if(K-=R,0>K)R=Math.max(0,I[he].g-100),X=!1;else try{pd(ye,D,"req"+K+"_")}catch{f&&f(ye)}}if(X){f=D.join("&");break e}}}return s=s.i.splice(0,h),c.D=s,f}function Sa(s){if(!s.g&&!s.u){s.Y=1;var c=s.Fa;_n||Uo(),yn||(_n(),yn=!0),Di.add(c,s),s.v=0}}function Ji(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=wn(w(s.Fa,s),Da(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,Ca(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=wn(w(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Re(10),Pr(this),Ca(this))};function Zi(s){s.A!=null&&(u.clearTimeout(s.A),s.A=null)}function Ca(s){s.g=new it(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var c=He(s.qa);J(c,"RID","rpc"),J(c,"SID",s.K),J(c,"AID",s.T),J(c,"CI",s.F?"0":"1"),!s.F&&s.ja&&J(c,"TO",s.ja),J(c,"TYPE","xmlhttp"),Nn(s,c),s.m&&s.o&&Xi(c,s.m,s.o),s.L&&(s.g.I=s.L);var h=s.g;s=s.ia,h.L=1,h.v=Ir(He(c)),h.m=null,h.P=!0,na(h,s)}n.Za=function(){this.C!=null&&(this.C=null,Pr(this),Ji(this),Re(19))};function Sr(s){s.C!=null&&(u.clearTimeout(s.C),s.C=null)}function ka(s,c){var h=null;if(s.g==c){Sr(s),Zi(s),s.g=null;var f=2}else if(Gi(s.h,c))h=c.D,ca(s.h,c),f=1;else return;if(s.G!=0){if(c.o)if(f==1){h=c.m?c.m.length:0,c=Date.now()-c.F;var I=s.B;f=gr(),Ae(f,new Jo(f,h)),br(s)}else Sa(s);else if(I=c.s,I==3||I==0&&0<c.X||!(f==1&&yd(s,c)||f==2&&Ji(s)))switch(h&&0<h.length&&(c=s.h,c.i=c.i.concat(h)),I){case 1:St(s,5);break;case 4:St(s,10);break;case 3:St(s,6);break;default:St(s,2)}}}function Da(s,c){let h=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(h*=2),h*c}function St(s,c){if(s.j.info("Error code "+c),c==2){var h=w(s.fb,s),f=s.Xa;const I=!f;f=new bt(f||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Er(f,"https"),Ir(f),I?hd(f.toString(),h):dd(f.toString(),h)}else Re(2);s.G=0,s.l&&s.l.sa(c),Na(s),Ra(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),Re(2)):(this.j.info("Failed to ping google.com"),Re(1))};function Na(s){if(s.G=0,s.ka=[],s.l){const c=ua(s.h);(c.length!=0||s.i.length!=0)&&(C(s.ka,c),C(s.ka,s.i),s.h.i.length=0,N(s.i),s.i.length=0),s.l.ra()}}function Va(s,c,h){var f=h instanceof bt?He(h):new bt(h);if(f.g!="")c&&(f.g=c+"."+f.g),Tr(f,f.s);else{var I=u.location;f=I.protocol,c=c?c+"."+I.hostname:I.hostname,I=+I.port;var R=new bt(null);f&&Er(R,f),c&&(R.g=c),I&&Tr(R,I),h&&(R.l=h),f=R}return h=s.D,c=s.ya,h&&c&&J(f,h,c),J(f,"VER",s.la),Nn(s,f),f}function Oa(s,c,h){if(c&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=s.Ca&&!s.pa?new te(new wr({eb:h})):new te(s.pa),c.Ha(s.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function La(){}n=La.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Cr(){}Cr.prototype.g=function(s,c){return new Ce(s,c)};function Ce(s,c){_e.call(this),this.g=new Aa(c),this.l=s,this.h=c&&c.messageUrlParams||null,s=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(s?s["X-WebChannel-Content-Type"]=c.messageContentType:s={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(s?s["X-WebChannel-Client-Profile"]=c.va:s={"X-WebChannel-Client-Profile":c.va}),this.g.S=s,(s=c&&c.Sb)&&!q(s)&&(this.g.m=s),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!q(c)&&(this.g.D=c,s=this.h,s!==null&&c in s&&(s=this.h,c in s&&delete s[c])),this.j=new Wt(this)}k(Ce,_e),Ce.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ce.prototype.close=function(){Yi(this.g)},Ce.prototype.o=function(s){var c=this.g;if(typeof s=="string"){var h={};h.__data__=s,s=h}else this.u&&(h={},h.__data__=Fi(s),s=h);c.i.push(new td(c.Ya++,s)),c.G==3&&br(c)},Ce.prototype.N=function(){this.g.l=null,delete this.j,Yi(this.g),delete this.g,Ce.aa.N.call(this)};function Ma(s){ji.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var c=s.__sm__;if(c){e:{for(const h in c){s=h;break e}s=void 0}(this.i=s)&&(s=this.i,c=c!==null&&s in c?c[s]:void 0),this.data=c}else this.data=s}k(Ma,ji);function xa(){qi.call(this),this.status=1}k(xa,qi);function Wt(s){this.g=s}k(Wt,La),Wt.prototype.ua=function(){Ae(this.g,"a")},Wt.prototype.ta=function(s){Ae(this.g,new Ma(s))},Wt.prototype.sa=function(s){Ae(this.g,new xa)},Wt.prototype.ra=function(){Ae(this.g,"b")},Cr.prototype.createWebChannel=Cr.prototype.g,Ce.prototype.send=Ce.prototype.o,Ce.prototype.open=Ce.prototype.m,Ce.prototype.close=Ce.prototype.close,nl=function(){return new Cr},tl=function(){return gr()},el=Rt,Is={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},_r.NO_ERROR=0,_r.TIMEOUT=8,_r.HTTP_ERROR=6,qr=_r,Zo.COMPLETE="complete",Zu=Zo,Go.EventType=Tn,Tn.OPEN="a",Tn.CLOSE="b",Tn.ERROR="c",Tn.MESSAGE="d",_e.prototype.listen=_e.prototype.K,Ln=Go,te.prototype.listenOnce=te.prototype.L,te.prototype.getLastError=te.prototype.Ka,te.prototype.getLastErrorCode=te.prototype.Ba,te.prototype.getStatus=te.prototype.Z,te.prototype.getResponseJson=te.prototype.Oa,te.prototype.getResponseText=te.prototype.oa,te.prototype.send=te.prototype.ea,te.prototype.setWithCredentials=te.prototype.Ha,Ju=te}).apply(typeof Nr<"u"?Nr:typeof self<"u"?self:typeof window<"u"?window:{});const pc="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Te.UNAUTHENTICATED=new Te(null),Te.GOOGLE_CREDENTIALS=new Te("google-credentials-uid"),Te.FIRST_PARTY=new Te("first-party-uid"),Te.MOCK_USER=new Te("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dn="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mt=new Fs("@firebase/firestore");function Vn(){return Mt.logLevel}function O(n,...e){if(Mt.logLevel<=H.DEBUG){const t=e.map(Qs);Mt.debug(`Firestore (${dn}): ${n}`,...t)}}function et(n,...e){if(Mt.logLevel<=H.ERROR){const t=e.map(Qs);Mt.error(`Firestore (${dn}): ${n}`,...t)}}function rn(n,...e){if(Mt.logLevel<=H.WARN){const t=e.map(Qs);Mt.warn(`Firestore (${dn}): ${n}`,...t)}}function Qs(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(n="Unexpected state"){const e=`FIRESTORE (${dn}) INTERNAL ASSERTION FAILED: `+n;throw et(e),new Error(e)}function Q(n,e){n||x()}function F(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends $e{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class sg{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Te.UNAUTHENTICATED))}shutdown(){}}class og{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class ag{constructor(e){this.t=e,this.currentUser=Te.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Q(this.o===void 0);let r=this.i;const i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let o=new _t;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new _t,e.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const l=o;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},u=l=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>u(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?u(l):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new _t)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Q(typeof r.accessToken=="string"),new rl(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Q(e===null||typeof e=="string"),new Te(e)}}class cg{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=Te.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class ug{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new cg(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Te.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class lg{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class hg{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){Q(this.o===void 0);const r=o=>{o.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,O("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>r(o))};const i=o=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?i(o):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Q(typeof t.token=="string"),this.R=t.token,new lg(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dg(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=dg(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<t&&(r+=e.charAt(i[o]%e.length))}return r}}function G(n,e){return n<e?-1:n>e?1:0}function sn(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new V(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ce.fromMillis(Date.now())}static fromDate(e){return ce.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new ce(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?G(this.nanoseconds,e.nanoseconds):G(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.timestamp=e}static fromTimestamp(e){return new U(e)}static min(){return new U(new ce(0,0))}static max(){return new U(new ce(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(e,t,r){t===void 0?t=0:t>e.length&&x(),r===void 0?r=e.length-t:r>e.length-t&&x(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Wn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Wn?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const o=e.get(i),a=t.get(i);if(o<a)return-1;if(o>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Z extends Wn{construct(e,t,r){return new Z(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(b.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new Z(t)}static emptyPath(){return new Z([])}}const fg=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class fe extends Wn{construct(e,t,r){return new fe(e,t,r)}static isValidIdentifier(e){return fg.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),fe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new fe(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const o=()=>{if(r.length===0)throw new V(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;i<e.length;){const u=e[i];if(u==="\\"){if(i+1===e.length)throw new V(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new V(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else u==="`"?(a=!a,i++):u!=="."||a?(r+=u,i++):(o(),i++)}if(o(),a)throw new V(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new fe(t)}static emptyPath(){return new fe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(Z.fromString(e))}static fromName(e){return new L(Z.fromString(e).popFirst(5))}static empty(){return new L(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Z.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Z.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new Z(e.slice()))}}function pg(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=U.fromTimestamp(r===1e9?new ce(t+1,0):new ce(t,r));return new Et(i,L.empty(),e)}function mg(n){return new Et(n.readTime,n.key,-1)}class Et{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Et(U.min(),L.empty(),-1)}static max(){return new Et(U.max(),L.empty(),-1)}}function gg(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:G(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _g="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class yg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sr(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==_g)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&x(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new S((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof S?t:S.resolve(t)}catch(t){return S.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):S.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):S.reject(t)}static resolve(e){return new S((t,r)=>{t(e)})}static reject(e){return new S((t,r)=>{r(e)})}static waitFor(e){return new S((t,r)=>{let i=0,o=0,a=!1;e.forEach(u=>{++i,u.next(()=>{++o,a&&o===i&&t()},l=>r(l))}),a=!0,o===i&&t()})}static or(e){let t=S.resolve(!1);for(const r of e)t=t.next(i=>i?S.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,o)=>{r.push(t.call(this,i,o))}),this.waitFor(r)}static mapArray(e,t){return new S((r,i)=>{const o=e.length,a=new Array(o);let u=0;for(let l=0;l<o;l++){const d=l;t(e[d]).next(p=>{a[d]=p,++u,u===o&&r(a)},p=>i(p))}})}static doWhile(e,t){return new S((r,i)=>{const o=()=>{e()===!0?t().next(()=>{o()},i):r()};o()})}}function vg(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function or(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Xs.oe=-1;function mi(n){return n==null}function ti(n){return n===0&&1/n==-1/0}function Eg(n){return typeof n=="number"&&Number.isInteger(n)&&!ti(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function qt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function sl(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(e,t){this.comparator=e,this.root=t||de.EMPTY}insert(e,t){return new ee(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,de.BLACK,null,null))}remove(e){return new ee(this.comparator,this.root.remove(e,this.comparator).copy(null,null,de.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Vr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Vr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Vr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Vr(this.root,e,this.comparator,!0)}}class Vr{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&i&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class de{constructor(e,t,r,i,o){this.key=e,this.value=t,this.color=r??de.RED,this.left=i??de.EMPTY,this.right=o??de.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,o){return new de(e??this.key,t??this.value,r??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const o=r(e,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(e,t,r),null):o===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return de.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return de.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,de.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,de.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw x();const e=this.left.check();if(e!==this.right.check())throw x();return e+(this.isRed()?0:1)}}de.EMPTY=null,de.RED=!0,de.BLACK=!1;de.EMPTY=new class{constructor(){this.size=0}get key(){throw x()}get value(){throw x()}get color(){throw x()}get left(){throw x()}get right(){throw x()}copy(e,t,r,i,o){return this}insert(e,t,r){return new de(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e){this.comparator=e,this.data=new ee(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new gc(this.data.getIterator())}getIteratorFrom(e){return new gc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof pe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new pe(this.comparator);return t.data=e,t}}class gc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.fields=e,e.sort(fe.comparator)}static empty(){return new ke([])}unionWith(e){let t=new pe(fe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new ke(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return sn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new ol("Invalid base64 string: "+o):o}}(e);return new me(t)}static fromUint8Array(e){const t=function(i){let o="";for(let a=0;a<i.length;++a)o+=String.fromCharCode(i[a]);return o}(e);return new me(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return G(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}me.EMPTY_BYTE_STRING=new me("");const Tg=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Tt(n){if(Q(!!n),typeof n=="string"){let e=0;const t=Tg.exec(n);if(Q(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ie(n.seconds),nanos:ie(n.nanos)}}function ie(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function xt(n){return typeof n=="string"?me.fromBase64String(n):me.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ys(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Js(n){const e=n.mapValue.fields.__previous_value__;return Ys(e)?Js(e):e}function Kn(n){const e=Tt(n.mapValue.fields.__local_write_time__.timestampValue);return new ce(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ig{constructor(e,t,r,i,o,a,u,l,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=l,this.useFetchStreams=d}}class Gn{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Gn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Gn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Or={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Ut(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ys(n)?4:Ag(n)?9007199254740991:wg(n)?10:11:x()}function qe(n,e){if(n===e)return!0;const t=Ut(n);if(t!==Ut(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Kn(n).isEqual(Kn(e));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const a=Tt(i.timestampValue),u=Tt(o.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,o){return xt(i.bytesValue).isEqual(xt(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,o){return ie(i.geoPointValue.latitude)===ie(o.geoPointValue.latitude)&&ie(i.geoPointValue.longitude)===ie(o.geoPointValue.longitude)}(n,e);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return ie(i.integerValue)===ie(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const a=ie(i.doubleValue),u=ie(o.doubleValue);return a===u?ti(a)===ti(u):isNaN(a)&&isNaN(u)}return!1}(n,e);case 9:return sn(n.arrayValue.values||[],e.arrayValue.values||[],qe);case 10:case 11:return function(i,o){const a=i.mapValue.fields||{},u=o.mapValue.fields||{};if(mc(a)!==mc(u))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(u[l]===void 0||!qe(a[l],u[l])))return!1;return!0}(n,e);default:return x()}}function Qn(n,e){return(n.values||[]).find(t=>qe(t,e))!==void 0}function on(n,e){if(n===e)return 0;const t=Ut(n),r=Ut(e);if(t!==r)return G(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return G(n.booleanValue,e.booleanValue);case 2:return function(o,a){const u=ie(o.integerValue||o.doubleValue),l=ie(a.integerValue||a.doubleValue);return u<l?-1:u>l?1:u===l?0:isNaN(u)?isNaN(l)?0:-1:1}(n,e);case 3:return _c(n.timestampValue,e.timestampValue);case 4:return _c(Kn(n),Kn(e));case 5:return G(n.stringValue,e.stringValue);case 6:return function(o,a){const u=xt(o),l=xt(a);return u.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(o,a){const u=o.split("/"),l=a.split("/");for(let d=0;d<u.length&&d<l.length;d++){const p=G(u[d],l[d]);if(p!==0)return p}return G(u.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,a){const u=G(ie(o.latitude),ie(a.latitude));return u!==0?u:G(ie(o.longitude),ie(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return yc(n.arrayValue,e.arrayValue);case 10:return function(o,a){var u,l,d,p;const y=o.fields||{},w=a.fields||{},P=(u=y.value)===null||u===void 0?void 0:u.arrayValue,k=(l=w.value)===null||l===void 0?void 0:l.arrayValue,N=G(((d=P==null?void 0:P.values)===null||d===void 0?void 0:d.length)||0,((p=k==null?void 0:k.values)===null||p===void 0?void 0:p.length)||0);return N!==0?N:yc(P,k)}(n.mapValue,e.mapValue);case 11:return function(o,a){if(o===Or.mapValue&&a===Or.mapValue)return 0;if(o===Or.mapValue)return 1;if(a===Or.mapValue)return-1;const u=o.fields||{},l=Object.keys(u),d=a.fields||{},p=Object.keys(d);l.sort(),p.sort();for(let y=0;y<l.length&&y<p.length;++y){const w=G(l[y],p[y]);if(w!==0)return w;const P=on(u[l[y]],d[p[y]]);if(P!==0)return P}return G(l.length,p.length)}(n.mapValue,e.mapValue);default:throw x()}}function _c(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return G(n,e);const t=Tt(n),r=Tt(e),i=G(t.seconds,r.seconds);return i!==0?i:G(t.nanos,r.nanos)}function yc(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const o=on(t[i],r[i]);if(o)return o}return G(t.length,r.length)}function an(n){return ws(n)}function ws(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Tt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return xt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return L.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const o of t.values||[])i?i=!1:r+=",",r+=ws(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",o=!0;for(const a of r)o?o=!1:i+=",",i+=`${a}:${ws(t.fields[a])}`;return i+"}"}(n.mapValue):x()}function vc(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function As(n){return!!n&&"integerValue"in n}function Zs(n){return!!n&&"arrayValue"in n}function Ec(n){return!!n&&"nullValue"in n}function Tc(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function $r(n){return!!n&&"mapValue"in n}function wg(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Bn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return qt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Bn(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Bn(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Ag(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.value=e}static empty(){return new Se({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!$r(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Bn(t)}setAll(e){let t=fe.emptyPath(),r={},i=[];e.forEach((a,u)=>{if(!t.isImmediateParentOf(u)){const l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=u.popLast()}a?r[u.lastSegment()]=Bn(a):i.push(u.lastSegment())});const o=this.getFieldsMap(t);this.applyChanges(o,r,i)}delete(e){const t=this.field(e.popLast());$r(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return qe(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];$r(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){qt(t,(i,o)=>e[i]=o);for(const i of r)delete e[i]}clone(){return new Se(Bn(this.value))}}function al(n){const e=[];return qt(n.fields,(t,r)=>{const i=new fe([t]);if($r(r)){const o=al(r.mapValue).fields;if(o.length===0)e.push(i);else for(const a of o)e.push(i.child(a))}else e.push(i)}),new ke(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e,t,r,i,o,a,u){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=o,this.data=a,this.documentState=u}static newInvalidDocument(e){return new Ie(e,0,U.min(),U.min(),U.min(),Se.empty(),0)}static newFoundDocument(e,t,r,i){return new Ie(e,1,t,U.min(),r,i,0)}static newNoDocument(e,t){return new Ie(e,2,t,U.min(),U.min(),Se.empty(),0)}static newUnknownDocument(e,t){return new Ie(e,3,t,U.min(),U.min(),Se.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Se.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Se.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ie&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ie(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e,t){this.position=e,this.inclusive=t}}function Ic(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const o=e[i],a=n.position[i];if(o.field.isKeyField()?r=L.comparator(L.fromName(a.referenceValue),t.key):r=on(a,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function wc(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!qe(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e,t="asc"){this.field=e,this.dir=t}}function Rg(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{}class ae extends cl{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new bg(e,t,r):t==="array-contains"?new kg(e,r):t==="in"?new Dg(e,r):t==="not-in"?new Ng(e,r):t==="array-contains-any"?new Vg(e,r):new ae(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Sg(e,r):new Cg(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(on(t,this.value)):t!==null&&Ut(this.value)===Ut(t)&&this.matchesComparison(on(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return x()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Le extends cl{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new Le(e,t)}matches(e){return ul(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function ul(n){return n.op==="and"}function ll(n){return Pg(n)&&ul(n)}function Pg(n){for(const e of n.filters)if(e instanceof Le)return!1;return!0}function Rs(n){if(n instanceof ae)return n.field.canonicalString()+n.op.toString()+an(n.value);if(ll(n))return n.filters.map(e=>Rs(e)).join(",");{const e=n.filters.map(t=>Rs(t)).join(",");return`${n.op}(${e})`}}function hl(n,e){return n instanceof ae?function(r,i){return i instanceof ae&&r.op===i.op&&r.field.isEqual(i.field)&&qe(r.value,i.value)}(n,e):n instanceof Le?function(r,i){return i instanceof Le&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((o,a,u)=>o&&hl(a,i.filters[u]),!0):!1}(n,e):void x()}function dl(n){return n instanceof ae?function(t){return`${t.field.canonicalString()} ${t.op} ${an(t.value)}`}(n):n instanceof Le?function(t){return t.op.toString()+" {"+t.getFilters().map(dl).join(" ,")+"}"}(n):"Filter"}class bg extends ae{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class Sg extends ae{constructor(e,t){super(e,"in",t),this.keys=fl("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Cg extends ae{constructor(e,t){super(e,"not-in",t),this.keys=fl("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function fl(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>L.fromName(r.referenceValue))}class kg extends ae{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Zs(t)&&Qn(t.arrayValue,this.value)}}class Dg extends ae{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Qn(this.value.arrayValue,t)}}class Ng extends ae{constructor(e,t){super(e,"not-in",t)}matches(e){if(Qn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Qn(this.value.arrayValue,t)}}class Vg extends ae{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Zs(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Qn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Og{constructor(e,t=null,r=[],i=[],o=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=a,this.endAt=u,this.ue=null}}function Ac(n,e=null,t=[],r=[],i=null,o=null,a=null){return new Og(n,e,t,r,i,o,a)}function eo(n){const e=F(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Rs(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),mi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>an(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>an(r)).join(",")),e.ue=t}return e.ue}function to(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Rg(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!hl(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!wc(n.startAt,e.startAt)&&wc(n.endAt,e.endAt)}function Ps(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e,t=null,r=[],i=[],o=null,a="F",u=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=a,this.startAt=u,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Lg(n,e,t,r,i,o,a,u){return new fn(n,e,t,r,i,o,a,u)}function no(n){return new fn(n)}function Rc(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function pl(n){return n.collectionGroup!==null}function jn(n){const e=F(n);if(e.ce===null){e.ce=[];const t=new Set;for(const o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new pe(fe.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(u=u.add(d.field))})}),u})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new Xn(o,r))}),t.has(fe.keyField().canonicalString())||e.ce.push(new Xn(fe.keyField(),r))}return e.ce}function Be(n){const e=F(n);return e.le||(e.le=Mg(e,jn(n))),e.le}function Mg(n,e){if(n.limitType==="F")return Ac(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const o=i.dir==="desc"?"asc":"desc";return new Xn(i.field,o)});const t=n.endAt?new ni(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new ni(n.startAt.position,n.startAt.inclusive):null;return Ac(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function bs(n,e){const t=n.filters.concat([e]);return new fn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ri(n,e,t){return new fn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function gi(n,e){return to(Be(n),Be(e))&&n.limitType===e.limitType}function ml(n){return`${eo(Be(n))}|lt:${n.limitType}`}function Gt(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>dl(i)).join(", ")}]`),mi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>an(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>an(i)).join(",")),`Target(${r})`}(Be(n))}; limitType=${n.limitType})`}function _i(n,e){return e.isFoundDocument()&&function(r,i){const o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):L.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,e)&&function(r,i){for(const o of jn(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const o of r.filters)if(!o.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,u,l){const d=Ic(a,u,l);return a.inclusive?d<=0:d<0}(r.startAt,jn(r),i)||r.endAt&&!function(a,u,l){const d=Ic(a,u,l);return a.inclusive?d>=0:d>0}(r.endAt,jn(r),i))}(n,e)}function xg(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function gl(n){return(e,t)=>{let r=!1;for(const i of jn(n)){const o=Ug(i,e,t);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function Ug(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):function(o,a,u){const l=a.data.field(o),d=u.data.field(o);return l!==null&&d!==null?on(l,d):x()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return x()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,o]of r)if(this.equalsFn(i,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],e))return void(i[o]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){qt(this.inner,(t,r)=>{for(const[i,o]of r)e(i,o)})}isEmpty(){return sl(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fg=new ee(L.comparator);function tt(){return Fg}const _l=new ee(L.comparator);function Mn(...n){let e=_l;for(const t of n)e=e.insert(t.key,t);return e}function yl(n){let e=_l;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function kt(){return qn()}function vl(){return qn()}function qn(){return new pn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Bg=new ee(L.comparator),jg=new pe(L.comparator);function z(...n){let e=jg;for(const t of n)e=e.add(t);return e}const qg=new pe(G);function $g(){return qg}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ro(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ti(e)?"-0":e}}function El(n){return{integerValue:""+n}}function zg(n,e){return Eg(e)?El(e):ro(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{constructor(){this._=void 0}}function Hg(n,e,t){return n instanceof ii?function(i,o){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&Ys(o)&&(o=Js(o)),o&&(a.fields.__previous_value__=o),{mapValue:a}}(t,e):n instanceof Yn?Il(n,e):n instanceof Jn?wl(n,e):function(i,o){const a=Tl(i,o),u=Pc(a)+Pc(i.Pe);return As(a)&&As(i.Pe)?El(u):ro(i.serializer,u)}(n,e)}function Wg(n,e,t){return n instanceof Yn?Il(n,e):n instanceof Jn?wl(n,e):t}function Tl(n,e){return n instanceof si?function(r){return As(r)||function(o){return!!o&&"doubleValue"in o}(r)}(e)?e:{integerValue:0}:null}class ii extends yi{}class Yn extends yi{constructor(e){super(),this.elements=e}}function Il(n,e){const t=Al(e);for(const r of n.elements)t.some(i=>qe(i,r))||t.push(r);return{arrayValue:{values:t}}}class Jn extends yi{constructor(e){super(),this.elements=e}}function wl(n,e){let t=Al(e);for(const r of n.elements)t=t.filter(i=>!qe(i,r));return{arrayValue:{values:t}}}class si extends yi{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Pc(n){return ie(n.integerValue||n.doubleValue)}function Al(n){return Zs(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Kg(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Yn&&i instanceof Yn||r instanceof Jn&&i instanceof Jn?sn(r.elements,i.elements,qe):r instanceof si&&i instanceof si?qe(r.Pe,i.Pe):r instanceof ii&&i instanceof ii}(n.transform,e.transform)}class Gg{constructor(e,t){this.version=e,this.transformResults=t}}class Ve{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ve}static exists(e){return new Ve(void 0,e)}static updateTime(e){return new Ve(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function zr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class vi{}function Rl(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new bl(n.key,Ve.none()):new ar(n.key,n.data,Ve.none());{const t=n.data,r=Se.empty();let i=new pe(fe.comparator);for(let o of e.fields)if(!i.has(o)){let a=t.field(o);a===null&&o.length>1&&(o=o.popLast(),a=t.field(o)),a===null?r.delete(o):r.set(o,a),i=i.add(o)}return new At(n.key,r,new ke(i.toArray()),Ve.none())}}function Qg(n,e,t){n instanceof ar?function(i,o,a){const u=i.value.clone(),l=Sc(i.fieldTransforms,o,a.transformResults);u.setAll(l),o.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):n instanceof At?function(i,o,a){if(!zr(i.precondition,o))return void o.convertToUnknownDocument(a.version);const u=Sc(i.fieldTransforms,o,a.transformResults),l=o.data;l.setAll(Pl(i)),l.setAll(u),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(i,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function $n(n,e,t,r){return n instanceof ar?function(o,a,u,l){if(!zr(o.precondition,a))return u;const d=o.value.clone(),p=Cc(o.fieldTransforms,l,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof At?function(o,a,u,l){if(!zr(o.precondition,a))return u;const d=Cc(o.fieldTransforms,l,a),p=a.data;return p.setAll(Pl(o)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(y=>y.field))}(n,e,t,r):function(o,a,u){return zr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(n,e,t)}function Xg(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),o=Tl(r.transform,i||null);o!=null&&(t===null&&(t=Se.empty()),t.set(r.field,o))}return t||null}function bc(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&sn(r,i,(o,a)=>Kg(o,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ar extends vi{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class At extends vi{constructor(e,t,r,i,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Pl(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Sc(n,e,t){const r=new Map;Q(n.length===t.length);for(let i=0;i<t.length;i++){const o=n[i],a=o.transform,u=e.data.field(o.field);r.set(o.field,Wg(a,u,t[i]))}return r}function Cc(n,e,t){const r=new Map;for(const i of n){const o=i.transform,a=t.data.field(i.field);r.set(i.field,Hg(o,a,e))}return r}class bl extends vi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Yg extends vi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jg{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(e.key)&&Qg(o,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=$n(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=$n(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=vl();return this.mutations.forEach(i=>{const o=e.get(i.key),a=o.overlayedDocument;let u=this.applyToLocalView(a,o.mutatedFields);u=t.has(i.key)?null:u;const l=Rl(a,u);l!==null&&r.set(i.key,l),a.isValidDocument()||a.convertToNoDocument(U.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),z())}isEqual(e){return this.batchId===e.batchId&&sn(this.mutations,e.mutations,(t,r)=>bc(t,r))&&sn(this.baseMutations,e.baseMutations,(t,r)=>bc(t,r))}}class io{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){Q(e.mutations.length===r.length);let i=function(){return Bg}();const o=e.mutations;for(let a=0;a<o.length;a++)i=i.insert(o[a].key,r[a].version);return new io(e,t,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oe,W;function t_(n){switch(n){default:return x();case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0}}function Sl(n){if(n===void 0)return et("GRPC error has no .code"),b.UNKNOWN;switch(n){case oe.OK:return b.OK;case oe.CANCELLED:return b.CANCELLED;case oe.UNKNOWN:return b.UNKNOWN;case oe.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case oe.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case oe.INTERNAL:return b.INTERNAL;case oe.UNAVAILABLE:return b.UNAVAILABLE;case oe.UNAUTHENTICATED:return b.UNAUTHENTICATED;case oe.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case oe.NOT_FOUND:return b.NOT_FOUND;case oe.ALREADY_EXISTS:return b.ALREADY_EXISTS;case oe.PERMISSION_DENIED:return b.PERMISSION_DENIED;case oe.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case oe.ABORTED:return b.ABORTED;case oe.OUT_OF_RANGE:return b.OUT_OF_RANGE;case oe.UNIMPLEMENTED:return b.UNIMPLEMENTED;case oe.DATA_LOSS:return b.DATA_LOSS;default:return x()}}(W=oe||(oe={}))[W.OK=0]="OK",W[W.CANCELLED=1]="CANCELLED",W[W.UNKNOWN=2]="UNKNOWN",W[W.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",W[W.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",W[W.NOT_FOUND=5]="NOT_FOUND",W[W.ALREADY_EXISTS=6]="ALREADY_EXISTS",W[W.PERMISSION_DENIED=7]="PERMISSION_DENIED",W[W.UNAUTHENTICATED=16]="UNAUTHENTICATED",W[W.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",W[W.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",W[W.ABORTED=10]="ABORTED",W[W.OUT_OF_RANGE=11]="OUT_OF_RANGE",W[W.UNIMPLEMENTED=12]="UNIMPLEMENTED",W[W.INTERNAL=13]="INTERNAL",W[W.UNAVAILABLE=14]="UNAVAILABLE",W[W.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n_(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r_=new Dt([4294967295,4294967295],0);function kc(n){const e=n_().encode(n),t=new Yu;return t.update(e),new Uint8Array(t.digest())}function Dc(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),o=e.getUint32(12,!0);return[new Dt([t,r],0),new Dt([i,o],0)]}class so{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new xn(`Invalid padding: ${t}`);if(r<0)throw new xn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new xn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new xn(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Dt.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(Dt.fromNumber(r)));return i.compare(r_)===1&&(i=new Dt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=kc(e),[r,i]=Dc(t);for(let o=0;o<this.hashCount;o++){const a=this.Ee(r,i,o);if(!this.de(a))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,o=new Uint8Array(Math.ceil(e/8)),a=new so(o,i,t);return r.forEach(u=>a.insert(u)),a}insert(e){if(this.Ie===0)return;const t=kc(e),[r,i]=Dc(t);for(let o=0;o<this.hashCount;o++){const a=this.Ee(r,i,o);this.Ae(a)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class xn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e,t,r,i,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,cr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Ei(U.min(),i,new ee(G),tt(),z())}}class cr{constructor(e,t,r,i,o){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new cr(r,t,z(),z(),z())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}}class Cl{constructor(e,t){this.targetId=e,this.me=t}}class kl{constructor(e,t,r=me.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class Nc{constructor(){this.fe=0,this.ge=Oc(),this.pe=me.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=z(),t=z(),r=z();return this.ge.forEach((i,o)=>{switch(o){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:x()}}),new cr(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=Oc()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Q(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class i_{constructor(e){this.Le=e,this.Be=new Map,this.ke=tt(),this.qe=Vc(),this.Qe=new ee(G)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:x()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,i)=>{this.ze(i)&&t(i)})}He(e){const t=e.targetId,r=e.me.count,i=this.Je(t);if(i){const o=i.target;if(Ps(o))if(r===0){const a=new L(o.path);this.Ue(t,a,Ie.newNoDocument(a,U.min()))}else Q(r===1);else{const a=this.Ye(t);if(a!==r){const u=this.Ze(e),l=u?this.Xe(u,e,a):1;if(l!==0){this.je(t);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,d)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:o=0}=t;let a,u;try{a=xt(r).toUint8Array()}catch(l){if(l instanceof ol)return rn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{u=new so(a,i,o)}catch(l){return rn(l instanceof xn?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return u.Ie===0?null:u}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let i=0;return r.forEach(o=>{const a=this.Le.tt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;e.mightContain(u)||(this.Ue(t,o,null),i++)}),i}rt(e){const t=new Map;this.Be.forEach((o,a)=>{const u=this.Je(a);if(u){if(o.current&&Ps(u.target)){const l=new L(u.target.path);this.ke.get(l)!==null||this.it(a,l)||this.Ue(a,l,Ie.newNoDocument(l,e))}o.be&&(t.set(a,o.ve()),o.Ce())}});let r=z();this.qe.forEach((o,a)=>{let u=!0;a.forEachWhile(l=>{const d=this.Je(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(r=r.add(o))}),this.ke.forEach((o,a)=>a.setReadTime(e));const i=new Ei(e,t,this.Qe,this.ke,r);return this.ke=tt(),this.qe=Vc(),this.Qe=new ee(G),i}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Nc,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new pe(G),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Nc),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function Vc(){return new ee(L.comparator)}function Oc(){return new ee(L.comparator)}const s_={asc:"ASCENDING",desc:"DESCENDING"},o_={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},a_={and:"AND",or:"OR"};class c_{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ss(n,e){return n.useProto3Json||mi(e)?e:{value:e}}function oi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Dl(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function u_(n,e){return oi(n,e.toTimestamp())}function je(n){return Q(!!n),U.fromTimestamp(function(t){const r=Tt(t);return new ce(r.seconds,r.nanos)}(n))}function oo(n,e){return Cs(n,e).canonicalString()}function Cs(n,e){const t=function(i){return new Z(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Nl(n){const e=Z.fromString(n);return Q(xl(e)),e}function ks(n,e){return oo(n.databaseId,e.path)}function cs(n,e){const t=Nl(e);if(t.get(1)!==n.databaseId.projectId)throw new V(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(Ol(t))}function Vl(n,e){return oo(n.databaseId,e)}function l_(n){const e=Nl(n);return e.length===4?Z.emptyPath():Ol(e)}function Ds(n){return new Z(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Ol(n){return Q(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Lc(n,e,t){return{name:ks(n,e),fields:t.value.mapValue.fields}}function h_(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:x()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],o=function(d,p){return d.useProto3Json?(Q(p===void 0||typeof p=="string"),me.fromBase64String(p||"")):(Q(p===void 0||p instanceof Buffer||p instanceof Uint8Array),me.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&function(d){const p=d.code===void 0?b.UNKNOWN:Sl(d.code);return new V(p,d.message||"")}(a);t=new kl(r,i,o,u||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=cs(n,r.document.name),o=je(r.document.updateTime),a=r.document.createTime?je(r.document.createTime):U.min(),u=new Se({mapValue:{fields:r.document.fields}}),l=Ie.newFoundDocument(i,o,a,u),d=r.targetIds||[],p=r.removedTargetIds||[];t=new Hr(d,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=cs(n,r.document),o=r.readTime?je(r.readTime):U.min(),a=Ie.newNoDocument(i,o),u=r.removedTargetIds||[];t=new Hr([],u,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=cs(n,r.document),o=r.removedTargetIds||[];t=new Hr([],o,i,null)}else{if(!("filter"in e))return x();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:o}=r,a=new e_(i,o),u=r.targetId;t=new Cl(u,a)}}return t}function d_(n,e){let t;if(e instanceof ar)t={update:Lc(n,e.key,e.value)};else if(e instanceof bl)t={delete:ks(n,e.key)};else if(e instanceof At)t={update:Lc(n,e.key,e.data),updateMask:T_(e.fieldMask)};else{if(!(e instanceof Yg))return x();t={verify:ks(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(o,a){const u=a.transform;if(u instanceof ii)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Yn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Jn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof si)return{fieldPath:a.field.canonicalString(),increment:u.Pe};throw x()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:u_(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:x()}(n,e.precondition)),t}function f_(n,e){return n&&n.length>0?(Q(e!==void 0),n.map(t=>function(i,o){let a=i.updateTime?je(i.updateTime):je(o);return a.isEqual(U.min())&&(a=je(o)),new Gg(a,i.transformResults||[])}(t,e))):[]}function p_(n,e){return{documents:[Vl(n,e.path)]}}function m_(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Vl(n,i);const o=function(d){if(d.length!==0)return Ml(Le.create(d,"and"))}(e.filters);o&&(t.structuredQuery.where=o);const a=function(d){if(d.length!==0)return d.map(p=>function(w){return{field:Qt(w.field),direction:y_(w.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const u=Ss(n,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{_t:t,parent:i}}function g_(n){let e=l_(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){Q(r===1);const p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let o=[];t.where&&(o=function(y){const w=Ll(y);return w instanceof Le&&ll(w)?w.getFilters():[w]}(t.where));let a=[];t.orderBy&&(a=function(y){return y.map(w=>function(k){return new Xn(Xt(k.field),function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(w))}(t.orderBy));let u=null;t.limit&&(u=function(y){let w;return w=typeof y=="object"?y.value:y,mi(w)?null:w}(t.limit));let l=null;t.startAt&&(l=function(y){const w=!!y.before,P=y.values||[];return new ni(P,w)}(t.startAt));let d=null;return t.endAt&&(d=function(y){const w=!y.before,P=y.values||[];return new ni(P,w)}(t.endAt)),Lg(e,i,a,o,u,"F",l,d)}function __(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return x()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Ll(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Xt(t.unaryFilter.field);return ae.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Xt(t.unaryFilter.field);return ae.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Xt(t.unaryFilter.field);return ae.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Xt(t.unaryFilter.field);return ae.create(a,"!=",{nullValue:"NULL_VALUE"});default:return x()}}(n):n.fieldFilter!==void 0?function(t){return ae.create(Xt(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return x()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Le.create(t.compositeFilter.filters.map(r=>Ll(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return x()}}(t.compositeFilter.op))}(n):x()}function y_(n){return s_[n]}function v_(n){return o_[n]}function E_(n){return a_[n]}function Qt(n){return{fieldPath:n.canonicalString()}}function Xt(n){return fe.fromServerFormat(n.fieldPath)}function Ml(n){return n instanceof ae?function(t){if(t.op==="=="){if(Tc(t.value))return{unaryFilter:{field:Qt(t.field),op:"IS_NAN"}};if(Ec(t.value))return{unaryFilter:{field:Qt(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Tc(t.value))return{unaryFilter:{field:Qt(t.field),op:"IS_NOT_NAN"}};if(Ec(t.value))return{unaryFilter:{field:Qt(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Qt(t.field),op:v_(t.op),value:t.value}}}(n):n instanceof Le?function(t){const r=t.getFilters().map(i=>Ml(i));return r.length===1?r[0]:{compositeFilter:{op:E_(t.op),filters:r}}}(n):x()}function T_(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function xl(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e,t,r,i,o=U.min(),a=U.min(),u=me.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=l}withSequenceNumber(e){return new ft(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ft(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I_{constructor(e){this.ct=e}}function w_(n){const e=g_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ri(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_{constructor(){this.un=new R_}addToCollectionParentIndex(e,t){return this.un.add(t),S.resolve()}getCollectionParents(e,t){return S.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return S.resolve()}deleteFieldIndex(e,t){return S.resolve()}deleteAllFieldIndexes(e){return S.resolve()}createTargetIndexes(e,t){return S.resolve()}getDocumentsMatchingTarget(e,t){return S.resolve(null)}getIndexType(e,t){return S.resolve(0)}getFieldIndexes(e,t){return S.resolve([])}getNextCollectionGroupToUpdate(e){return S.resolve(null)}getMinOffset(e,t){return S.resolve(Et.min())}getMinOffsetFromCollectionGroup(e,t){return S.resolve(Et.min())}updateCollectionGroup(e,t,r){return S.resolve()}updateIndexEntries(e,t){return S.resolve()}}class R_{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new pe(Z.comparator),o=!i.has(r);return this.index[t]=i.add(r),o}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new pe(Z.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new cn(0)}static kn(){return new cn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_{constructor(){this.changes=new pn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ie.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?S.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b_{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S_{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&$n(r.mutation,i,ke.empty(),ce.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,z()).next(()=>r))}getLocalViewOfDocuments(e,t,r=z()){const i=kt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(o=>{let a=Mn();return o.forEach((u,l)=>{a=a.insert(u,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=kt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,z()))}populateOverlays(e,t,r){const i=[];return r.forEach(o=>{t.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(e,i).next(o=>{o.forEach((a,u)=>{t.set(a,u)})})}computeViews(e,t,r,i){let o=tt();const a=qn(),u=function(){return qn()}();return t.forEach((l,d)=>{const p=r.get(d.key);i.has(d.key)&&(p===void 0||p.mutation instanceof At)?o=o.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),$n(p.mutation,d,p.mutation.getFieldMask(),ce.now())):a.set(d.key,ke.empty())}),this.recalculateAndSaveOverlays(e,o).next(l=>(l.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>{var y;return u.set(d,new b_(p,(y=a.get(d))!==null&&y!==void 0?y:null))}),u))}recalculateAndSaveOverlays(e,t){const r=qn();let i=new ee((a,u)=>a-u),o=z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const u of a)u.keys().forEach(l=>{const d=t.get(l);if(d===null)return;let p=r.get(l)||ke.empty();p=u.applyToLocalView(d,p),r.set(l,p);const y=(i.get(u.batchId)||z()).add(l);i=i.insert(u.batchId,y)})}).next(()=>{const a=[],u=i.getReverseIterator();for(;u.hasNext();){const l=u.getNext(),d=l.key,p=l.value,y=vl();p.forEach(w=>{if(!o.has(w)){const P=Rl(t.get(w),r.get(w));P!==null&&y.set(w,P),o=o.add(w)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,y))}return S.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return L.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):pl(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(o=>{const a=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-o.size):S.resolve(kt());let u=-1,l=o;return a.next(d=>S.forEach(d,(p,y)=>(u<y.largestBatchId&&(u=y.largestBatchId),o.get(p)?S.resolve():this.remoteDocumentCache.getEntry(e,p).next(w=>{l=l.insert(p,w)}))).next(()=>this.populateOverlays(e,d,o)).next(()=>this.computeViews(e,l,d,z())).next(p=>({batchId:u,changes:yl(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(r=>{let i=Mn();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const o=t.collectionGroup;let a=Mn();return this.indexManager.getCollectionParents(e,o).next(u=>S.forEach(u,l=>{const d=function(y,w){return new fn(w,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)}(t,l.child(o));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(p=>{p.forEach((y,w)=>{a=a.insert(y,w)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,i))).next(a=>{o.forEach((l,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,Ie.newInvalidDocument(p)))});let u=Mn();return a.forEach((l,d)=>{const p=o.get(l);p!==void 0&&$n(p.mutation,d,ke.empty(),ce.now()),_i(t,d)&&(u=u.insert(l,d))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return S.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:je(i.createTime)}}(t)),S.resolve()}getNamedQuery(e,t){return S.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(i){return{name:i.name,query:w_(i.bundledQuery),readTime:je(i.readTime)}}(t)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(){this.overlays=new ee(L.comparator),this.Ir=new Map}getOverlay(e,t){return S.resolve(this.overlays.get(t))}getOverlays(e,t){const r=kt();return S.forEach(t,i=>this.getOverlay(e,i).next(o=>{o!==null&&r.set(i,o)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,o)=>{this.ht(e,t,o)}),S.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(r)),S.resolve()}getOverlaysForCollection(e,t,r){const i=kt(),o=t.length+1,a=new L(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const l=u.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===o&&l.largestBatchId>r&&i.set(l.getKey(),l)}return S.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let o=new ee((d,p)=>d-p);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=o.get(d.largestBatchId);p===null&&(p=kt(),o=o.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const u=kt(),l=o.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,p)=>u.set(d,p)),!(u.size()>=i)););return S.resolve(u)}ht(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Zg(t,r));let o=this.Ir.get(t);o===void 0&&(o=z(),this.Ir.set(t,o)),this.Ir.set(t,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D_{constructor(){this.sessionToken=me.EMPTY_BYTE_STRING}getSessionToken(e){return S.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(){this.Tr=new pe(ue.Er),this.dr=new pe(ue.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new ue(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new ue(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new L(new Z([])),r=new ue(t,e),i=new ue(t,e+1),o=[];return this.dr.forEachInRange([r,i],a=>{this.Vr(a),o.push(a.key)}),o}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new L(new Z([])),r=new ue(t,e),i=new ue(t,e+1);let o=z();return this.dr.forEachInRange([r,i],a=>{o=o.add(a.key)}),o}containsKey(e){const t=new ue(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ue{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return L.comparator(e.key,t.key)||G(e.wr,t.wr)}static Ar(e,t){return G(e.wr,t.wr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new pe(ue.Er)}checkEmpty(e){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Jg(o,t,r,i);this.mutationQueue.push(a);for(const u of i)this.br=this.br.add(new ue(u.key,o)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return S.resolve(a)}lookupMutationBatch(e,t){return S.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.vr(r),o=i<0?0:i;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ue(t,0),i=new ue(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([r,i],a=>{const u=this.Dr(a.wr);o.push(u)}),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new pe(G);return t.forEach(i=>{const o=new ue(i,0),a=new ue(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,a],u=>{r=r.add(u.wr)})}),S.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let o=r;L.isDocumentKey(o)||(o=o.child(""));const a=new ue(new L(o),0);let u=new pe(G);return this.br.forEachWhile(l=>{const d=l.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(u=u.add(l.wr)),!0)},a),S.resolve(this.Cr(u))}Cr(e){const t=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){Q(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return S.forEach(t.mutations,i=>{const o=new ue(i.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new ue(t,0),i=this.br.firstAfterOrEqual(r);return S.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,S.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V_{constructor(e){this.Mr=e,this.docs=function(){return new ee(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),o=i?i.size:0,a=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return S.resolve(r?r.document.mutableCopy():Ie.newInvalidDocument(t))}getEntries(e,t){let r=tt();return t.forEach(i=>{const o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():Ie.newInvalidDocument(i))}),S.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let o=tt();const a=t.path,u=new L(a.child("")),l=this.docs.getIteratorFrom(u);for(;l.hasNext();){const{key:d,value:{document:p}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||gg(mg(p),r)<=0||(i.has(p.key)||_i(t,p))&&(o=o.insert(p.key,p.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(e,t,r,i){x()}Or(e,t){return S.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new O_(this)}getSize(e){return S.resolve(this.size)}}class O_ extends P_{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),S.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L_{constructor(e){this.persistence=e,this.Nr=new pn(t=>eo(t),to),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.Lr=0,this.Br=new ao,this.targetCount=0,this.kr=cn.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,i)=>t(i)),S.resolve()}getLastRemoteSnapshotVersion(e){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return S.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),S.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new cn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,S.resolve()}updateTargetData(e,t){return this.Kn(t),S.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,S.resolve()}removeTargets(e,t,r){let i=0;const o=[];return this.Nr.forEach((a,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.Nr.delete(a),o.push(this.removeMatchingKeysForTargetId(e,u.targetId)),i++)}),S.waitFor(o).next(()=>i)}getTargetCount(e){return S.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return S.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),S.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const i=this.persistence.referenceDelegate,o=[];return i&&t.forEach(a=>{o.push(i.markPotentiallyOrphaned(e,a))}),S.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),S.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return S.resolve(r)}containsKey(e,t){return S.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Xs(0),this.Kr=!1,this.Kr=!0,this.$r=new D_,this.referenceDelegate=e(this),this.Ur=new L_(this),this.indexManager=new A_,this.remoteDocumentCache=function(i){return new V_(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new I_(t),this.Gr=new C_(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new k_,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new N_(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const i=new x_(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(o=>this.referenceDelegate.jr(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Hr(e,t){return S.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class x_ extends yg{constructor(e){super(),this.currentSequenceNumber=e}}class co{constructor(e){this.persistence=e,this.Jr=new ao,this.Yr=null}static Zr(e){return new co(e)}get Xr(){if(this.Yr)return this.Yr;throw x()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),S.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),S.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),S.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(o=>this.Xr.add(o.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.Xr,r=>{const i=L.fromPath(r);return this.ei(e,i).next(o=>{o||t.removeEntry(i,U.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return S.or([()=>S.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=i}static Wi(e,t){let r=z(),i=z();for(const o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new uo(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U_{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return Vd()?8:vg(we())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,i){const o={result:null};return this.Yi(e,t).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.Zi(e,t,i,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new U_;return this.Xi(e,t,a).next(u=>{if(o.result=u,this.zi)return this.es(e,t,a,u.size)})}).next(()=>o.result)}es(e,t,r,i){return r.documentReadCount<this.ji?(Vn()<=H.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",Gt(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),S.resolve()):(Vn()<=H.DEBUG&&O("QueryEngine","Query:",Gt(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(Vn()<=H.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",Gt(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Be(t))):S.resolve())}Yi(e,t){if(Rc(t))return S.resolve(null);let r=Be(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=ri(t,null,"F"),r=Be(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(o=>{const a=z(...o);return this.Ji.getDocuments(e,a).next(u=>this.indexManager.getMinOffset(e,r).next(l=>{const d=this.ts(t,u);return this.ns(t,d,a,l.readTime)?this.Yi(e,ri(t,null,"F")):this.rs(e,d,t,l)}))})))}Zi(e,t,r,i){return Rc(t)||i.isEqual(U.min())?S.resolve(null):this.Ji.getDocuments(e,r).next(o=>{const a=this.ts(t,o);return this.ns(t,a,r,i)?S.resolve(null):(Vn()<=H.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Gt(t)),this.rs(e,a,t,pg(i,-1)).next(u=>u))})}ts(e,t){let r=new pe(gl(e));return t.forEach((i,o)=>{_i(e,o)&&(r=r.add(o))}),r}ns(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}Xi(e,t,r){return Vn()<=H.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",Gt(t)),this.Ji.getDocumentsMatchingQuery(e,t,Et.min(),r)}rs(e,t,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(o=>(t.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B_{constructor(e,t,r,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new ee(G),this._s=new pn(o=>eo(o),to),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new S_(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function j_(n,e,t,r){return new B_(n,e,t,r)}async function Ul(n,e){const t=F(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(o=>(i=o,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],u=[];let l=z();for(const d of i){a.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}for(const d of o){u.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(d=>({hs:d,removedBatchIds:a,addedBatchIds:u}))})})}function q_(n,e){const t=F(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),o=t.cs.newChangeBuffer({trackRemovals:!0});return function(u,l,d,p){const y=d.batch,w=y.keys();let P=S.resolve();return w.forEach(k=>{P=P.next(()=>p.getEntry(l,k)).next(N=>{const C=d.docVersions.get(k);Q(C!==null),N.version.compareTo(C)<0&&(y.applyToRemoteDocument(N,d),N.isValidDocument()&&(N.setReadTime(d.commitVersion),p.addEntry(N)))})}),P.next(()=>u.mutationQueue.removeMutationBatch(l,y))}(t,r,e,o).next(()=>o.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let l=z();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(l=l.add(u.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function Fl(n){const e=F(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function $_(n,e){const t=F(n),r=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const u=[];e.targetChanges.forEach((p,y)=>{const w=i.get(y);if(!w)return;u.push(t.Ur.removeMatchingKeys(o,p.removedDocuments,y).next(()=>t.Ur.addMatchingKeys(o,p.addedDocuments,y)));let P=w.withSequenceNumber(o.currentSequenceNumber);e.targetMismatches.get(y)!==null?P=P.withResumeToken(me.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):p.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(p.resumeToken,r)),i=i.insert(y,P),function(N,C,B){return N.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=3e8?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0}(w,P,p)&&u.push(t.Ur.updateTargetData(o,P))});let l=tt(),d=z();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(o,p))}),u.push(z_(o,a,e.documentUpdates).next(p=>{l=p.Ps,d=p.Is})),!r.isEqual(U.min())){const p=t.Ur.getLastRemoteSnapshotVersion(o).next(y=>t.Ur.setTargetsMetadata(o,o.currentSequenceNumber,r));u.push(p)}return S.waitFor(u).next(()=>a.apply(o)).next(()=>t.localDocuments.getLocalViewOfDocuments(o,l,d)).next(()=>l)}).then(o=>(t.os=i,o))}function z_(n,e,t){let r=z(),i=z();return t.forEach(o=>r=r.add(o)),e.getEntries(n,r).next(o=>{let a=tt();return t.forEach((u,l)=>{const d=o.get(u);l.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(u)),l.isNoDocument()&&l.version.isEqual(U.min())?(e.removeEntry(u,l.readTime),a=a.insert(u,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),a=a.insert(u,l)):O("LocalStore","Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",l.version)}),{Ps:a,Is:i}})}function H_(n,e){const t=F(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function W_(n,e){const t=F(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Ur.getTargetData(r,e).next(o=>o?(i=o,S.resolve(i)):t.Ur.allocateTargetId(r).next(a=>(i=new ft(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r})}async function Ns(n,e,t){const r=F(n),i=r.os.get(e),o=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!or(a))throw a;O("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function Mc(n,e,t){const r=F(n);let i=U.min(),o=z();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,p){const y=F(l),w=y._s.get(p);return w!==void 0?S.resolve(y.os.get(w)):y.Ur.getTargetData(d,p)}(r,a,Be(e)).next(u=>{if(u)return i=u.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,u.targetId).next(l=>{o=l})}).next(()=>r.ss.getDocumentsMatchingQuery(a,e,t?i:U.min(),t?o:z())).next(u=>(K_(r,xg(e),u),{documents:u,Ts:o})))}function K_(n,e,t){let r=n.us.get(e)||U.min();t.forEach((i,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.us.set(e,r)}class xc{constructor(){this.activeTargetIds=$g()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class G_{constructor(){this.so=new xc,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new xc,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q_{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uc{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){O("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){O("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Lr=null;function us(){return Lr===null?Lr=function(){return 268435456+Math.round(2147483648*Math.random())}():Lr++,"0x"+Lr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X_={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y_{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ee="WebChannelConnection";class J_ extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${i}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${o}`}get Fo(){return!1}Mo(t,r,i,o,a){const u=us(),l=this.xo(t,r.toUriEncodedString());O("RestConnection",`Sending RPC '${t}' ${u}:`,l,i);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,o,a),this.No(t,l,d,i).then(p=>(O("RestConnection",`Received RPC '${t}' ${u}: `,p),p),p=>{throw rn("RestConnection",`RPC '${t}' ${u} failed with error: `,p,"url: ",l,"request:",i),p})}Lo(t,r,i,o,a,u){return this.Mo(t,r,i,o,a)}Oo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+dn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((o,a)=>t[a]=o),i&&i.headers.forEach((o,a)=>t[a]=o)}xo(t,r){const i=X_[t];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,i){const o=us();return new Promise((a,u)=>{const l=new Ju;l.setWithCredentials(!0),l.listenOnce(Zu.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case qr.NO_ERROR:const p=l.getResponseJson();O(Ee,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),a(p);break;case qr.TIMEOUT:O(Ee,`RPC '${e}' ${o} timed out`),u(new V(b.DEADLINE_EXCEEDED,"Request time out"));break;case qr.HTTP_ERROR:const y=l.getStatus();if(O(Ee,`RPC '${e}' ${o} failed with status:`,y,"response text:",l.getResponseText()),y>0){let w=l.getResponseJson();Array.isArray(w)&&(w=w[0]);const P=w==null?void 0:w.error;if(P&&P.status&&P.message){const k=function(C){const B=C.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(B)>=0?B:b.UNKNOWN}(P.status);u(new V(k,P.message))}else u(new V(b.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new V(b.UNAVAILABLE,"Connection failed."));break;default:x()}}finally{O(Ee,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(i);O(Ee,`RPC '${e}' ${o} sending request:`,i),l.send(t,"POST",d,r,15)})}Bo(e,t,r){const i=us(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=nl(),u=tl(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Oo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const p=o.join("");O(Ee,`Creating RPC '${e}' stream ${i}: ${p}`,l);const y=a.createWebChannel(p,l);let w=!1,P=!1;const k=new Y_({Io:C=>{P?O(Ee,`Not sending because RPC '${e}' stream ${i} is closed:`,C):(w||(O(Ee,`Opening RPC '${e}' stream ${i} transport.`),y.open(),w=!0),O(Ee,`RPC '${e}' stream ${i} sending:`,C),y.send(C))},To:()=>y.close()}),N=(C,B,q)=>{C.listen(B,j=>{try{q(j)}catch($){setTimeout(()=>{throw $},0)}})};return N(y,Ln.EventType.OPEN,()=>{P||(O(Ee,`RPC '${e}' stream ${i} transport opened.`),k.yo())}),N(y,Ln.EventType.CLOSE,()=>{P||(P=!0,O(Ee,`RPC '${e}' stream ${i} transport closed`),k.So())}),N(y,Ln.EventType.ERROR,C=>{P||(P=!0,rn(Ee,`RPC '${e}' stream ${i} transport errored:`,C),k.So(new V(b.UNAVAILABLE,"The operation could not be completed")))}),N(y,Ln.EventType.MESSAGE,C=>{var B;if(!P){const q=C.data[0];Q(!!q);const j=q,$=j.error||((B=j[0])===null||B===void 0?void 0:B.error);if($){O(Ee,`RPC '${e}' stream ${i} received error:`,$);const le=$.status;let Y=function(_){const v=oe[_];if(v!==void 0)return Sl(v)}(le),E=$.message;Y===void 0&&(Y=b.INTERNAL,E="Unknown error status: "+le+" with message "+$.message),P=!0,k.So(new V(Y,E)),y.close()}else O(Ee,`RPC '${e}' stream ${i} received:`,q),k.bo(q)}}),N(u,el.STAT_EVENT,C=>{C.stat===Is.PROXY?O(Ee,`RPC '${e}' stream ${i} detected buffering proxy`):C.stat===Is.NOPROXY&&O(Ee,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{k.wo()},0),k}}function ls(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ti(n){return new c_(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(e,t,r=1e3,i=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=i,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-r);i>0&&O("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl{constructor(e,t,r,i,o,a,u,l){this.ui=e,this.Ho=r,this.Jo=i,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=l,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Bl(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(et(t.toString()),et("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===t&&this.P_(r,i)},r=>{e(()=>{const i=new V(b.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return O("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(O("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Z_ extends jl{constructor(e,t,r,i,o,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=o}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=h_(this.serializer,e),r=function(o){if(!("targetChange"in o))return U.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?U.min():a.readTime?je(a.readTime):U.min()}(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=Ds(this.serializer),t.addTarget=function(o,a){let u;const l=a.target;if(u=Ps(l)?{documents:p_(o,l)}:{query:m_(o,l)._t},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=Dl(o,a.resumeToken);const d=Ss(o,a.expectedCount);d!==null&&(u.expectedCount=d)}else if(a.snapshotVersion.compareTo(U.min())>0){u.readTime=oi(o,a.snapshotVersion.toTimestamp());const d=Ss(o,a.expectedCount);d!==null&&(u.expectedCount=d)}return u}(this.serializer,e);const r=__(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=Ds(this.serializer),t.removeTarget=e,this.a_(t)}}class ey extends jl{constructor(e,t,r,i,o,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=o}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return Q(!!e.streamToken),this.lastStreamToken=e.streamToken,Q(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Q(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=f_(e.writeResults,e.commitTime),r=je(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=Ds(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>d_(this.serializer,r))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ty extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new V(b.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Mo(e,Cs(t,r),i,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(b.UNKNOWN,o.toString())})}Lo(e,t,r,i,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.Lo(e,Cs(t,r),i,a,u,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(b.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class ny{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(et(t),this.D_=!1):O("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(e,t,r,i,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(a=>{r.enqueueAndForget(async()=>{$t(this)&&(O("RemoteStore","Restarting streams for network reachability change."),await async function(l){const d=F(l);d.L_.add(4),await ur(d),d.q_.set("Unknown"),d.L_.delete(4),await Ii(d)}(this))})}),this.q_=new ny(r,i)}}async function Ii(n){if($t(n))for(const e of n.B_)await e(!0)}async function ur(n){for(const e of n.B_)await e(!1)}function ql(n,e){const t=F(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),po(t)?fo(t):mn(t).r_()&&ho(t,e))}function lo(n,e){const t=F(n),r=mn(t);t.N_.delete(e),r.r_()&&$l(t,e),t.N_.size===0&&(r.r_()?r.o_():$t(t)&&t.q_.set("Unknown"))}function ho(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}mn(n).A_(e)}function $l(n,e){n.Q_.xe(e),mn(n).R_(e)}function fo(n){n.Q_=new i_({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),mn(n).start(),n.q_.v_()}function po(n){return $t(n)&&!mn(n).n_()&&n.N_.size>0}function $t(n){return F(n).L_.size===0}function zl(n){n.Q_=void 0}async function iy(n){n.q_.set("Online")}async function sy(n){n.N_.forEach((e,t)=>{ho(n,e)})}async function oy(n,e){zl(n),po(n)?(n.q_.M_(e),fo(n)):n.q_.set("Unknown")}async function ay(n,e,t){if(n.q_.set("Online"),e instanceof kl&&e.state===2&&e.cause)try{await async function(i,o){const a=o.cause;for(const u of o.targetIds)i.N_.has(u)&&(await i.remoteSyncer.rejectListen(u,a),i.N_.delete(u),i.Q_.removeTarget(u))}(n,e)}catch(r){O("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await ai(n,r)}else if(e instanceof Hr?n.Q_.Ke(e):e instanceof Cl?n.Q_.He(e):n.Q_.We(e),!t.isEqual(U.min()))try{const r=await Fl(n.localStore);t.compareTo(r)>=0&&await function(o,a){const u=o.Q_.rt(a);return u.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const p=o.N_.get(d);p&&o.N_.set(d,p.withResumeToken(l.resumeToken,a))}}),u.targetMismatches.forEach((l,d)=>{const p=o.N_.get(l);if(!p)return;o.N_.set(l,p.withResumeToken(me.EMPTY_BYTE_STRING,p.snapshotVersion)),$l(o,l);const y=new ft(p.target,l,d,p.sequenceNumber);ho(o,y)}),o.remoteSyncer.applyRemoteEvent(u)}(n,t)}catch(r){O("RemoteStore","Failed to raise snapshot:",r),await ai(n,r)}}async function ai(n,e,t){if(!or(e))throw e;n.L_.add(1),await ur(n),n.q_.set("Offline"),t||(t=()=>Fl(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await Ii(n)})}function Hl(n,e){return e().catch(t=>ai(n,t,e))}async function wi(n){const e=F(n),t=It(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;cy(e);)try{const i=await H_(e.localStore,r);if(i===null){e.O_.length===0&&t.o_();break}r=i.batchId,uy(e,i)}catch(i){await ai(e,i)}Wl(e)&&Kl(e)}function cy(n){return $t(n)&&n.O_.length<10}function uy(n,e){n.O_.push(e);const t=It(n);t.r_()&&t.V_&&t.m_(e.mutations)}function Wl(n){return $t(n)&&!It(n).n_()&&n.O_.length>0}function Kl(n){It(n).start()}async function ly(n){It(n).p_()}async function hy(n){const e=It(n);for(const t of n.O_)e.m_(t.mutations)}async function dy(n,e,t){const r=n.O_.shift(),i=io.from(r,e,t);await Hl(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await wi(n)}async function fy(n,e){e&&It(n).V_&&await async function(r,i){if(function(a){return t_(a)&&a!==b.ABORTED}(i.code)){const o=r.O_.shift();It(r).s_(),await Hl(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,i)),await wi(r)}}(n,e),Wl(n)&&Kl(n)}async function Fc(n,e){const t=F(n);t.asyncQueue.verifyOperationInProgress(),O("RemoteStore","RemoteStore received new credentials");const r=$t(t);t.L_.add(3),await ur(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Ii(t)}async function py(n,e){const t=F(n);e?(t.L_.delete(2),await Ii(t)):e||(t.L_.add(2),await ur(t),t.q_.set("Unknown"))}function mn(n){return n.K_||(n.K_=function(t,r,i){const o=F(t);return o.w_(),new Z_(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Eo:iy.bind(null,n),Ro:sy.bind(null,n),mo:oy.bind(null,n),d_:ay.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),po(n)?fo(n):n.q_.set("Unknown")):(await n.K_.stop(),zl(n))})),n.K_}function It(n){return n.U_||(n.U_=function(t,r,i){const o=F(t);return o.w_(),new ey(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:ly.bind(null,n),mo:fy.bind(null,n),f_:hy.bind(null,n),g_:dy.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await wi(n)):(await n.U_.stop(),n.O_.length>0&&(O("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mo{constructor(e,t,r,i,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new _t,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,o){const a=Date.now()+r,u=new mo(e,t,a,i,o);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function go(n,e){if(et("AsyncQueue",`${e}: ${n}`),or(n))return new V(b.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e){this.comparator=e?(t,r)=>e(t,r)||L.comparator(t.key,r.key):(t,r)=>L.comparator(t.key,r.key),this.keyedMap=Mn(),this.sortedSet=new ee(this.comparator)}static emptySet(e){return new tn(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof tn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,o=r.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new tn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bc{constructor(){this.W_=new ee(L.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):x():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,r)=>{e.push(r)}),e}}class un{constructor(e,t,r,i,o,a,u,l,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,o){const a=[];return t.forEach(u=>{a.push({type:0,doc:u})}),new un(e,t,tn.emptySet(t),a,r,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&gi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class my{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class gy{constructor(){this.queries=jc(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const i=F(t),o=i.queries;i.queries=jc(),o.forEach((a,u)=>{for(const l of u.j_)l.onError(r)})})(this,new V(b.ABORTED,"Firestore shutting down"))}}function jc(){return new pn(n=>ml(n),gi)}async function Gl(n,e){const t=F(n);let r=3;const i=e.query;let o=t.queries.get(i);o?!o.H_()&&e.J_()&&(r=2):(o=new my,r=e.J_()?0:1);try{switch(r){case 0:o.z_=await t.onListen(i,!0);break;case 1:o.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){const u=go(a,`Initialization of query '${Gt(e.query)}' failed`);return void e.onError(u)}t.queries.set(i,o),o.j_.push(e),e.Z_(t.onlineState),o.z_&&e.X_(o.z_)&&_o(t)}async function Ql(n,e){const t=F(n),r=e.query;let i=3;const o=t.queries.get(r);if(o){const a=o.j_.indexOf(e);a>=0&&(o.j_.splice(a,1),o.j_.length===0?i=e.J_()?0:1:!o.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function _y(n,e){const t=F(n);let r=!1;for(const i of e){const o=i.query,a=t.queries.get(o);if(a){for(const u of a.j_)u.X_(i)&&(r=!0);a.z_=i}}r&&_o(t)}function yy(n,e,t){const r=F(n),i=r.queries.get(e);if(i)for(const o of i.j_)o.onError(t);r.queries.delete(e)}function _o(n){n.Y_.forEach(e=>{e.next()})}var Vs,qc;(qc=Vs||(Vs={})).ea="default",qc.Cache="cache";class Xl{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new un(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=un.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Vs.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(e){this.key=e}}class Jl{constructor(e){this.key=e}}class vy{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=z(),this.mutatedKeys=z(),this.Aa=gl(e),this.Ra=new tn(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new Bc,i=t?t.Ra:this.Ra;let o=t?t.mutatedKeys:this.mutatedKeys,a=i,u=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,y)=>{const w=i.get(p),P=_i(this.query,y)?y:null,k=!!w&&this.mutatedKeys.has(w.key),N=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let C=!1;w&&P?w.data.isEqual(P.data)?k!==N&&(r.track({type:3,doc:P}),C=!0):this.ga(w,P)||(r.track({type:2,doc:P}),C=!0,(l&&this.Aa(P,l)>0||d&&this.Aa(P,d)<0)&&(u=!0)):!w&&P?(r.track({type:0,doc:P}),C=!0):w&&!P&&(r.track({type:1,doc:w}),C=!0,(l||d)&&(u=!0)),C&&(P?(a=a.add(P),o=N?o.add(p):o.delete(p)):(a=a.delete(p),o=o.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),o=o.delete(p.key),r.track({type:1,doc:p})}return{Ra:a,fa:r,ns:u,mutatedKeys:o}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const o=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort((p,y)=>function(P,k){const N=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return x()}};return N(P)-N(k)}(p.type,y.type)||this.Aa(p.doc,y.doc)),this.pa(r),i=i!=null&&i;const u=t&&!i?this.ya():[],l=this.da.size===0&&this.current&&!i?1:0,d=l!==this.Ea;return this.Ea=l,a.length!==0||d?{snapshot:new un(this.query,e.Ra,o,a,e.mutatedKeys,l===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:u}:{wa:u}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Bc,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=z(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const t=[];return e.forEach(r=>{this.da.has(r)||t.push(new Jl(r))}),this.da.forEach(r=>{e.has(r)||t.push(new Yl(r))}),t}ba(e){this.Ta=e.Ts,this.da=z();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return un.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class Ey{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Ty{constructor(e){this.key=e,this.va=!1}}class Iy{constructor(e,t,r,i,o,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new pn(u=>ml(u),gi),this.Ma=new Map,this.xa=new Set,this.Oa=new ee(L.comparator),this.Na=new Map,this.La=new ao,this.Ba={},this.ka=new Map,this.qa=cn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function wy(n,e,t=!0){const r=ih(n);let i;const o=r.Fa.get(e);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.Da()):i=await Zl(r,e,t,!0),i}async function Ay(n,e){const t=ih(n);await Zl(t,e,!0,!1)}async function Zl(n,e,t,r){const i=await W_(n.localStore,Be(e)),o=i.targetId,a=n.sharedClientState.addLocalQueryTarget(o,t);let u;return r&&(u=await Ry(n,e,o,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&ql(n.remoteStore,i),u}async function Ry(n,e,t,r,i){n.Ka=(y,w,P)=>async function(N,C,B,q){let j=C.view.ma(B);j.ns&&(j=await Mc(N.localStore,C.query,!1).then(({documents:E})=>C.view.ma(E,j)));const $=q&&q.targetChanges.get(C.targetId),le=q&&q.targetMismatches.get(C.targetId)!=null,Y=C.view.applyChanges(j,N.isPrimaryClient,$,le);return zc(N,C.targetId,Y.wa),Y.snapshot}(n,y,w,P);const o=await Mc(n.localStore,e,!0),a=new vy(e,o.Ts),u=a.ma(o.documents),l=cr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=a.applyChanges(u,n.isPrimaryClient,l);zc(n,t,d.wa);const p=new Ey(e,t,a);return n.Fa.set(e,p),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),d.snapshot}async function Py(n,e,t){const r=F(n),i=r.Fa.get(e),o=r.Ma.get(i.targetId);if(o.length>1)return r.Ma.set(i.targetId,o.filter(a=>!gi(a,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Ns(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&lo(r.remoteStore,i.targetId),Os(r,i.targetId)}).catch(sr)):(Os(r,i.targetId),await Ns(r.localStore,i.targetId,!0))}async function by(n,e){const t=F(n),r=t.Fa.get(e),i=t.Ma.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),lo(t.remoteStore,r.targetId))}async function Sy(n,e,t){const r=Ly(n);try{const i=await function(a,u){const l=F(a),d=ce.now(),p=u.reduce((P,k)=>P.add(k.key),z());let y,w;return l.persistence.runTransaction("Locally write mutations","readwrite",P=>{let k=tt(),N=z();return l.cs.getEntries(P,p).next(C=>{k=C,k.forEach((B,q)=>{q.isValidDocument()||(N=N.add(B))})}).next(()=>l.localDocuments.getOverlayedDocuments(P,k)).next(C=>{y=C;const B=[];for(const q of u){const j=Xg(q,y.get(q.key).overlayedDocument);j!=null&&B.push(new At(q.key,j,al(j.value.mapValue),Ve.exists(!0)))}return l.mutationQueue.addMutationBatch(P,d,B,u)}).next(C=>{w=C;const B=C.applyToLocalDocumentSet(y,N);return l.documentOverlayCache.saveOverlays(P,C.batchId,B)})}).then(()=>({batchId:w.batchId,changes:yl(y)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,u,l){let d=a.Ba[a.currentUser.toKey()];d||(d=new ee(G)),d=d.insert(u,l),a.Ba[a.currentUser.toKey()]=d}(r,i.batchId,t),await lr(r,i.changes),await wi(r.remoteStore)}catch(i){const o=go(i,"Failed to persist write");t.reject(o)}}async function eh(n,e){const t=F(n);try{const r=await $_(t.localStore,e);e.targetChanges.forEach((i,o)=>{const a=t.Na.get(o);a&&(Q(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.va=!0:i.modifiedDocuments.size>0?Q(a.va):i.removedDocuments.size>0&&(Q(a.va),a.va=!1))}),await lr(t,r,e)}catch(r){await sr(r)}}function $c(n,e,t){const r=F(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Fa.forEach((o,a)=>{const u=a.view.Z_(e);u.snapshot&&i.push(u.snapshot)}),function(a,u){const l=F(a);l.onlineState=u;let d=!1;l.queries.forEach((p,y)=>{for(const w of y.j_)w.Z_(u)&&(d=!0)}),d&&_o(l)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Cy(n,e,t){const r=F(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Na.get(e),o=i&&i.key;if(o){let a=new ee(L.comparator);a=a.insert(o,Ie.newNoDocument(o,U.min()));const u=z().add(o),l=new Ei(U.min(),new Map,new ee(G),a,u);await eh(r,l),r.Oa=r.Oa.remove(o),r.Na.delete(e),yo(r)}else await Ns(r.localStore,e,!1).then(()=>Os(r,e,t)).catch(sr)}async function ky(n,e){const t=F(n),r=e.batch.batchId;try{const i=await q_(t.localStore,e);nh(t,r,null),th(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await lr(t,i)}catch(i){await sr(i)}}async function Dy(n,e,t){const r=F(n);try{const i=await function(a,u){const l=F(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return l.mutationQueue.lookupMutationBatch(d,u).next(y=>(Q(y!==null),p=y.keys(),l.mutationQueue.removeMutationBatch(d,y))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,p,u)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>l.localDocuments.getDocuments(d,p))})}(r.localStore,e);nh(r,e,t),th(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await lr(r,i)}catch(i){await sr(i)}}function th(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function nh(n,e,t){const r=F(n);let i=r.Ba[r.currentUser.toKey()];if(i){const o=i.get(e);o&&(t?o.reject(t):o.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function Os(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(r=>{n.La.containsKey(r)||rh(n,r)})}function rh(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(lo(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),yo(n))}function zc(n,e,t){for(const r of t)r instanceof Yl?(n.La.addReference(r.key,e),Ny(n,r)):r instanceof Jl?(O("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||rh(n,r.key)):x()}function Ny(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||(O("SyncEngine","New document in limbo: "+t),n.xa.add(r),yo(n))}function yo(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new L(Z.fromString(e)),r=n.qa.next();n.Na.set(r,new Ty(t)),n.Oa=n.Oa.insert(t,r),ql(n.remoteStore,new ft(Be(no(t.path)),r,"TargetPurposeLimboResolution",Xs.oe))}}async function lr(n,e,t){const r=F(n),i=[],o=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach((u,l)=>{a.push(r.Ka(l,e,t).then(d=>{var p;if((d||t)&&r.isPrimaryClient){const y=d?!d.fromCache:(p=t==null?void 0:t.targetChanges.get(l.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(l.targetId,y?"current":"not-current")}if(d){i.push(d);const y=uo.Wi(l.targetId,d);o.push(y)}}))}),await Promise.all(a),r.Ca.d_(i),await async function(l,d){const p=F(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",y=>S.forEach(d,w=>S.forEach(w.$i,P=>p.persistence.referenceDelegate.addReference(y,w.targetId,P)).next(()=>S.forEach(w.Ui,P=>p.persistence.referenceDelegate.removeReference(y,w.targetId,P)))))}catch(y){if(!or(y))throw y;O("LocalStore","Failed to update sequence numbers: "+y)}for(const y of d){const w=y.targetId;if(!y.fromCache){const P=p.os.get(w),k=P.snapshotVersion,N=P.withLastLimboFreeSnapshotVersion(k);p.os=p.os.insert(w,N)}}}(r.localStore,o))}async function Vy(n,e){const t=F(n);if(!t.currentUser.isEqual(e)){O("SyncEngine","User change. New user:",e.toKey());const r=await Ul(t.localStore,e);t.currentUser=e,function(o,a){o.ka.forEach(u=>{u.forEach(l=>{l.reject(new V(b.CANCELLED,a))})}),o.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await lr(t,r.hs)}}function Oy(n,e){const t=F(n),r=t.Na.get(e);if(r&&r.va)return z().add(r.key);{let i=z();const o=t.Ma.get(e);if(!o)return i;for(const a of o){const u=t.Fa.get(a);i=i.unionWith(u.view.Va)}return i}}function ih(n){const e=F(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=eh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Oy.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Cy.bind(null,e),e.Ca.d_=_y.bind(null,e.eventManager),e.Ca.$a=yy.bind(null,e.eventManager),e}function Ly(n){const e=F(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ky.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Dy.bind(null,e),e}class ci{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ti(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return j_(this.persistence,new F_,e.initialUser,this.serializer)}Ga(e){return new M_(co.Zr,this.serializer)}Wa(e){return new G_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ci.provider={build:()=>new ci};class Ls{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>$c(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Vy.bind(null,this.syncEngine),await py(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new gy}()}createDatastore(e){const t=Ti(e.databaseInfo.databaseId),r=function(o){return new J_(o)}(e.databaseInfo);return function(o,a,u,l){return new ty(o,a,u,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,o,a,u){return new ry(r,i,o,a,u)}(this.localStore,this.datastore,e.asyncQueue,t=>$c(this.syncEngine,t,0),function(){return Uc.D()?new Uc:new Q_}())}createSyncEngine(e,t){return function(i,o,a,u,l,d,p){const y=new Iy(i,o,a,u,l,d);return p&&(y.Qa=!0),y}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const o=F(i);O("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await ur(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ls.provider={build:()=>new Ls};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sh{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):et("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My{constructor(e,t,r,i,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=Te.UNAUTHENTICATED,this.clientId=il.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{O("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(O("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new _t;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=go(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function hs(n,e){n.asyncQueue.verifyOperationInProgress(),O("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Ul(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Hc(n,e){n.asyncQueue.verifyOperationInProgress();const t=await xy(n);O("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Fc(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>Fc(e.remoteStore,i)),n._onlineComponents=e}async function xy(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O("FirestoreClient","Using user provided OfflineComponentProvider");try{await hs(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===b.FAILED_PRECONDITION||i.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;rn("Error using user provided cache. Falling back to memory cache: "+t),await hs(n,new ci)}}else O("FirestoreClient","Using default OfflineComponentProvider"),await hs(n,new ci);return n._offlineComponents}async function oh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O("FirestoreClient","Using user provided OnlineComponentProvider"),await Hc(n,n._uninitializedComponentsProvider._online)):(O("FirestoreClient","Using default OnlineComponentProvider"),await Hc(n,new Ls))),n._onlineComponents}function Uy(n){return oh(n).then(e=>e.syncEngine)}async function Ms(n){const e=await oh(n),t=e.eventManager;return t.onListen=wy.bind(null,e.syncEngine),t.onUnlisten=Py.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Ay.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=by.bind(null,e.syncEngine),t}function Fy(n,e,t={}){const r=new _t;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,u,l,d){const p=new sh({next:w=>{p.Za(),a.enqueueAndForget(()=>Ql(o,y)),w.fromCache&&l.source==="server"?d.reject(new V(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(w)},error:w=>d.reject(w)}),y=new Xl(u,p,{includeMetadataChanges:!0,_a:!0});return Gl(o,y)}(await Ms(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ah(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ch(n,e,t){if(!t)throw new V(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function By(n,e,t,r){if(e===!0&&r===!0)throw new V(b.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Kc(n){if(!L.isDocumentKey(n))throw new V(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Gc(n){if(L.isDocumentKey(n))throw new V(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ai(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":x()}function Oe(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ai(n);throw new V(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new V(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new V(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}By("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ah((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new V(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new V(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new V(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ri{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Qc({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Qc(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new sg;switch(r.type){case"firstParty":return new ug(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Wc.get(t);r&&(O("ComponentProvider","Removing Datastore"),Wc.delete(t),r.terminate())}(this),Promise.resolve()}}function jy(n,e,t,r={}){var i;const o=(n=Oe(n,Ri))._getSettings(),a=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&rn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),r.mockUserToken){let u,l;if(typeof r.mockUserToken=="string")u=r.mockUserToken,l=Te.MOCK_USER;else{u=du(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new V(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new Te(d)}n._authCredentials=new og(new rl(u,l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new nt(this.firestore,e,this._query)}}class be{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new yt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new be(this.firestore,e,this._key)}}class yt extends nt{constructor(e,t,r){super(e,t,no(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new be(this.firestore,null,new L(e))}withConverter(e){return new yt(this.firestore,e,this._path)}}function _E(n,e,...t){if(n=se(n),ch("collection","path",e),n instanceof Ri){const r=Z.fromString(e,...t);return Gc(r),new yt(n,null,r)}{if(!(n instanceof be||n instanceof yt))throw new V(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(e,...t));return Gc(r),new yt(n.firestore,null,r)}}function qy(n,e,...t){if(n=se(n),arguments.length===1&&(e=il.newId()),ch("doc","path",e),n instanceof Ri){const r=Z.fromString(e,...t);return Kc(r),new be(n,null,new L(r))}{if(!(n instanceof be||n instanceof yt))throw new V(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(e,...t));return Kc(r),new be(n.firestore,n instanceof yt?n.converter:null,new L(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Bl(this,"async_queue_retry"),this.Vu=()=>{const r=ls();r&&O("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=ls();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=ls();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new _t;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!or(e))throw e;O("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(a){let u=a.message||"";return a.stack&&(u=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),u}(r);throw et("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=mo.createAndSchedule(this,e,t,r,o=>this.yu(o));return this.Tu.push(i),i}fu(){this.Eu&&x()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function Yc(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const o of r)if(o in i&&typeof i[o]=="function")return!0;return!1}(n,["next","error","complete"])}class Ft extends Ri{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new Xc,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Xc(e),this._firestoreClient=void 0,await e}}}function yE(n,e){const t=typeof n=="object"?n:js(),r=typeof n=="string"?n:"(default)",i=hi(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const o=uu("firestore");o&&jy(i,...o)}return i}function vo(n){if(n._terminated)throw new V(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||$y(n),n._firestoreClient}function $y(n){var e,t,r;const i=n._freezeSettings(),o=function(u,l,d,p){return new Ig(u,l,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,ah(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new My(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(u){const l=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(l),_online:l}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ln(me.fromBase64String(e))}catch(t){throw new V(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ln(me.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new fe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return G(this._lat,e._lat)||G(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zy=/^__.*__$/;class Hy{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new At(e,this.data,this.fieldMask,t,this.fieldTransforms):new ar(e,this.data,t,this.fieldTransforms)}}class uh{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new At(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function lh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x()}}class wo{constructor(e,t,r,i,o,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,o===void 0&&this.vu(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new wo(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return ui(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(lh(this.Cu)&&zy.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Wy{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ti(e)}Qu(e,t,r,i=!1){return new wo({Cu:e,methodName:t,qu:r,path:fe.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function bi(n){const e=n._freezeSettings(),t=Ti(n._databaseId);return new Wy(n._databaseId,!!e.ignoreUndefinedProperties,t)}function hh(n,e,t,r,i,o={}){const a=n.Qu(o.merge||o.mergeFields?2:0,e,t,i);Ao("Data must be an object, but it was:",a,r);const u=dh(r,a);let l,d;if(o.merge)l=new ke(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const p=[];for(const y of o.mergeFields){const w=xs(e,y,t);if(!a.contains(w))throw new V(b.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);ph(p,w)||p.push(w)}l=new ke(p),d=a.fieldTransforms.filter(y=>l.covers(y.field))}else l=null,d=a.fieldTransforms;return new Hy(new Se(u),l,d)}class Si extends Eo{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Si}}function Ky(n,e,t,r){const i=n.Qu(1,e,t);Ao("Data must be an object, but it was:",i,r);const o=[],a=Se.empty();qt(r,(l,d)=>{const p=Ro(e,l,t);d=se(d);const y=i.Nu(p);if(d instanceof Si)o.push(p);else{const w=hr(d,y);w!=null&&(o.push(p),a.set(p,w))}});const u=new ke(o);return new uh(a,u,i.fieldTransforms)}function Gy(n,e,t,r,i,o){const a=n.Qu(1,e,t),u=[xs(e,r,t)],l=[i];if(o.length%2!=0)throw new V(b.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<o.length;w+=2)u.push(xs(e,o[w])),l.push(o[w+1]);const d=[],p=Se.empty();for(let w=u.length-1;w>=0;--w)if(!ph(d,u[w])){const P=u[w];let k=l[w];k=se(k);const N=a.Nu(P);if(k instanceof Si)d.push(P);else{const C=hr(k,N);C!=null&&(d.push(P),p.set(P,C))}}const y=new ke(d);return new uh(p,y,a.fieldTransforms)}function Qy(n,e,t,r=!1){return hr(t,n.Qu(r?4:3,e))}function hr(n,e){if(fh(n=se(n)))return Ao("Unsupported field value:",e,n),dh(n,e);if(n instanceof Eo)return function(r,i){if(!lh(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const o=[];let a=0;for(const u of r){let l=hr(u,i.Lu(a));l==null&&(l={nullValue:"NULL_VALUE"}),o.push(l),a++}return{arrayValue:{values:o}}}(n,e)}return function(r,i){if((r=se(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return zg(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=ce.fromDate(r);return{timestampValue:oi(i.serializer,o)}}if(r instanceof ce){const o=new ce(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:oi(i.serializer,o)}}if(r instanceof To)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ln)return{bytesValue:Dl(i.serializer,r._byteString)};if(r instanceof be){const o=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw i.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:oo(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Io)return function(a,u){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(l=>{if(typeof l!="number")throw u.Bu("VectorValues must only contain numeric values.");return ro(u.serializer,l)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${Ai(r)}`)}(n,e)}function dh(n,e){const t={};return sl(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):qt(n,(r,i)=>{const o=hr(i,e.Mu(r));o!=null&&(t[r]=o)}),{mapValue:{fields:t}}}function fh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ce||n instanceof To||n instanceof ln||n instanceof be||n instanceof Eo||n instanceof Io)}function Ao(n,e,t){if(!fh(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const r=Ai(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function xs(n,e,t){if((e=se(e))instanceof Pi)return e._internalPath;if(typeof e=="string")return Ro(n,e);throw ui("Field path arguments must be of type string or ",n,!1,void 0,t)}const Xy=new RegExp("[~\\*/\\[\\]]");function Ro(n,e,t){if(e.search(Xy)>=0)throw ui(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Pi(...e.split("."))._internalPath}catch{throw ui(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ui(n,e,t,r,i){const o=r&&!r.isEmpty(),a=i!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let l="";return(o||a)&&(l+=" (found",o&&(l+=` in field ${r}`),a&&(l+=` in document ${i}`),l+=")"),new V(b.INVALID_ARGUMENT,u+n+l)}function ph(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(e,t,r,i,o){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new be(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Yy(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Ci("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Yy extends mh{data(){return super.data()}}function Ci(n,e){return typeof e=="string"?Ro(n,e):e instanceof Pi?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gh(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Po{}class bo extends Po{}function vE(n,e,...t){let r=[];e instanceof Po&&r.push(e),r=r.concat(t),function(o){const a=o.filter(l=>l instanceof So).length,u=o.filter(l=>l instanceof ki).length;if(a>1||a>0&&u>0)throw new V(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class ki extends bo{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ki(e,t,r)}_apply(e){const t=this._parse(e);return _h(e._query,t),new nt(e.firestore,e.converter,bs(e._query,t))}_parse(e){const t=bi(e.firestore);return function(o,a,u,l,d,p,y){let w;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new V(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Zc(y,p);const P=[];for(const k of y)P.push(Jc(l,o,k));w={arrayValue:{values:P}}}else w=Jc(l,o,y)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Zc(y,p),w=Qy(u,a,y,p==="in"||p==="not-in");return ae.create(d,p,w)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function EE(n,e,t){const r=e,i=Ci("where",n);return ki._create(i,r,t)}class So extends Po{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new So(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Le.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,o){let a=i;const u=o.getFlattenedFilters();for(const l of u)_h(a,l),a=bs(a,l)}(e._query,t),new nt(e.firestore,e.converter,bs(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Co extends bo{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Co(e,t)}_apply(e){const t=function(i,o,a){if(i.startAt!==null)throw new V(b.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new V(b.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Xn(o,a)}(e._query,this._field,this._direction);return new nt(e.firestore,e.converter,function(i,o){const a=i.explicitOrderBy.concat([o]);return new fn(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function TE(n,e="asc"){const t=e,r=Ci("orderBy",n);return Co._create(r,t)}class ko extends bo{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new ko(e,t,r)}_apply(e){return new nt(e.firestore,e.converter,ri(e._query,this._limit,this._limitType))}}function IE(n){return ko._create("limit",n,"F")}function Jc(n,e,t){if(typeof(t=se(t))=="string"){if(t==="")throw new V(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!pl(e)&&t.indexOf("/")!==-1)throw new V(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Z.fromString(t));if(!L.isDocumentKey(r))throw new V(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return vc(n,new L(r))}if(t instanceof be)return vc(n,t._key);throw new V(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ai(t)}.`)}function Zc(n,e){if(!Array.isArray(n)||n.length===0)throw new V(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function _h(n,e){const t=function(i,o){for(const a of i)for(const u of a.getFlattenedFilters())if(o.indexOf(u.op)>=0)return u.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Jy{convertValue(e,t="none"){switch(Ut(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ie(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(xt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw x()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return qt(e,(i,o)=>{r[i]=this.convertValue(o,t)}),r}convertVectorValue(e){var t,r,i;const o=(i=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>ie(a.doubleValue));return new Io(o)}convertGeoPoint(e){return new To(ie(e.latitude),ie(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Js(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Kn(e));default:return null}}convertTimestamp(e){const t=Tt(e);return new ce(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Z.fromString(e);Q(xl(r));const i=new Gn(r.get(1),r.get(3)),o=new L(r.popFirst(5));return i.isEqual(t)||et(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yh(n,e,t){let r;return r=n?n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class vh extends mh{constructor(e,t,r,i,o,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Wr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Ci("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class Wr extends vh{data(e={}){return super.data(e)}}class Eh{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Un(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Wr(this._firestore,this._userDataWriter,r.key,r,new Un(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(u=>{const l=new Wr(i._firestore,i._userDataWriter,u.doc.key,u.doc,new Un(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);return u.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(u=>o||u.type!==3).map(u=>{const l=new Wr(i._firestore,i._userDataWriter,u.doc.key,u.doc,new Un(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,p=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),p=a.indexOf(u.doc.key)),{type:Zy(u.type),doc:l,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function Zy(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return x()}}class Do extends Jy{constructor(e){super(),this.firestore=e}convertBytes(e){return new ln(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new be(this.firestore,null,t)}}function wE(n){n=Oe(n,nt);const e=Oe(n.firestore,Ft),t=vo(e),r=new Do(e);return gh(n._query),Fy(t,n._query).then(i=>new Eh(e,r,n,i))}function AE(n,e,t){n=Oe(n,be);const r=Oe(n.firestore,Ft),i=yh(n.converter,e);return No(r,[hh(bi(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Ve.none())])}function RE(n,e,t,...r){n=Oe(n,be);const i=Oe(n.firestore,Ft),o=bi(i);let a;return a=typeof(e=se(e))=="string"||e instanceof Pi?Gy(o,"updateDoc",n._key,e,t,r):Ky(o,"updateDoc",n._key,e),No(i,[a.toMutation(n._key,Ve.exists(!0))])}function PE(n,e){const t=Oe(n.firestore,Ft),r=qy(n),i=yh(n.converter,e);return No(t,[hh(bi(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Ve.exists(!1))]).then(()=>r)}function bE(n,...e){var t,r,i;n=se(n);let o={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Yc(e[a])||(o=e[a],a++);const u={includeMetadataChanges:o.includeMetadataChanges,source:o.source};if(Yc(e[a])){const y=e[a];e[a]=(t=y.next)===null||t===void 0?void 0:t.bind(y),e[a+1]=(r=y.error)===null||r===void 0?void 0:r.bind(y),e[a+2]=(i=y.complete)===null||i===void 0?void 0:i.bind(y)}let l,d,p;if(n instanceof be)d=Oe(n.firestore,Ft),p=no(n._key.path),l={next:y=>{e[a]&&e[a](ev(d,n,y))},error:e[a+1],complete:e[a+2]};else{const y=Oe(n,nt);d=Oe(y.firestore,Ft),p=y._query;const w=new Do(d);l={next:P=>{e[a]&&e[a](new Eh(d,w,y,P))},error:e[a+1],complete:e[a+2]},gh(n._query)}return function(w,P,k,N){const C=new sh(N),B=new Xl(P,C,k);return w.asyncQueue.enqueueAndForget(async()=>Gl(await Ms(w),B)),()=>{C.Za(),w.asyncQueue.enqueueAndForget(async()=>Ql(await Ms(w),B))}}(vo(d),p,u,l)}function No(n,e){return function(r,i){const o=new _t;return r.asyncQueue.enqueueAndForget(async()=>Sy(await Uy(r),i,o)),o.promise}(vo(n),e)}function ev(n,e,t){const r=t.docs.get(e._key),i=new Do(n);return new vh(n,i,e._key,r,new Un(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(i){dn=i})(jt),Vt(new vt("firestore",(r,{instanceIdentifier:i,options:o})=>{const a=r.getProvider("app").getImmediate(),u=new Ft(new ag(r.getProvider("auth-internal")),new hg(r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new V(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Gn(d.options.projectId,p)}(a,i),a);return o=Object.assign({useFetchStreams:t},o),u._setSettings(o),u},"PUBLIC").setMultipleInstances(!0)),xe(pc,"4.7.3",e),xe(pc,"4.7.3","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th="firebasestorage.googleapis.com",Ih="storageBucket",tv=2*60*1e3,nv=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re extends $e{constructor(e,t,r=0){super(ds(e),`Firebase Storage: ${t} (${ds(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,re.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return ds(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ne;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ne||(ne={}));function ds(n){return"storage/"+n}function Vo(){const n="An unknown error occurred, please check the error payload for server response.";return new re(ne.UNKNOWN,n)}function rv(n){return new re(ne.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function iv(n){return new re(ne.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function sv(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new re(ne.UNAUTHENTICATED,n)}function ov(){return new re(ne.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function av(n){return new re(ne.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function cv(){return new re(ne.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function uv(){return new re(ne.CANCELED,"User canceled the upload/download.")}function lv(n){return new re(ne.INVALID_URL,"Invalid URL '"+n+"'.")}function hv(n){return new re(ne.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function dv(){return new re(ne.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Ih+"' property when initializing the app?")}function fv(){return new re(ne.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function pv(){return new re(ne.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function mv(n){return new re(ne.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Us(n){return new re(ne.INVALID_ARGUMENT,n)}function wh(){return new re(ne.APP_DELETED,"The Firebase app was deleted.")}function gv(n){return new re(ne.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function zn(n,e){return new re(ne.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function On(n){throw new re(ne.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=De.makeFromUrl(e,t)}catch{return new De(e,"")}if(r.path==="")return r;throw hv(e)}static makeFromUrl(e,t){let r=null;const i="([A-Za-z0-9.\\-_]+)";function o($){$.path.charAt($.path.length-1)==="/"&&($.path_=$.path_.slice(0,-1))}const a="(/(.*))?$",u=new RegExp("^gs://"+i+a,"i"),l={bucket:1,path:3};function d($){$.path_=decodeURIComponent($.path)}const p="v[A-Za-z0-9_]+",y=t.replace(/[.]/g,"\\."),w="(/([^?#]*).*)?$",P=new RegExp(`^https?://${y}/${p}/b/${i}/o${w}`,"i"),k={bucket:1,path:3},N=t===Th?"(?:storage.googleapis.com|storage.cloud.google.com)":t,C="([^?#]*)",B=new RegExp(`^https?://${N}/${i}/${C}`,"i"),j=[{regex:u,indices:l,postModify:o},{regex:P,indices:k,postModify:d},{regex:B,indices:{bucket:1,path:2},postModify:d}];for(let $=0;$<j.length;$++){const le=j[$],Y=le.regex.exec(e);if(Y){const E=Y[le.indices.bucket];let m=Y[le.indices.path];m||(m=""),r=new De(E,m),le.postModify(r);break}}if(r==null)throw lv(e);return r}}class _v{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yv(n,e,t){let r=1,i=null,o=null,a=!1,u=0;function l(){return u===2}let d=!1;function p(...C){d||(d=!0,e.apply(null,C))}function y(C){i=setTimeout(()=>{i=null,n(P,l())},C)}function w(){o&&clearTimeout(o)}function P(C,...B){if(d){w();return}if(C){w(),p.call(null,C,...B);return}if(l()||a){w(),p.call(null,C,...B);return}r<64&&(r*=2);let j;u===1?(u=2,j=0):j=(r+Math.random())*1e3,y(j)}let k=!1;function N(C){k||(k=!0,w(),!d&&(i!==null?(C||(u=2),clearTimeout(i),y(0)):C||(u=1)))}return y(0),o=setTimeout(()=>{a=!0,N(!0)},t),N}function vv(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ev(n){return n!==void 0}function Tv(n){return typeof n=="object"&&!Array.isArray(n)}function Oo(n){return typeof n=="string"||n instanceof String}function eu(n){return Lo()&&n instanceof Blob}function Lo(){return typeof Blob<"u"}function tu(n,e,t,r){if(r<e)throw Us(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Us(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mo(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function Ah(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}var Nt;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Nt||(Nt={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iv(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,o=e.indexOf(n)!==-1;return t||i||o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wv{constructor(e,t,r,i,o,a,u,l,d,p,y,w=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=o,this.additionalRetryCodes_=a,this.callback_=u,this.errorCallback_=l,this.timeout_=d,this.progressCallback_=p,this.connectionFactory_=y,this.retry=w,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((P,k)=>{this.resolve_=P,this.reject_=k,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new Mr(!1,null,!0));return}const o=this.connectionFactory_();this.pendingConnection_=o;const a=u=>{const l=u.loaded,d=u.lengthComputable?u.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,d)};this.progressCallback_!==null&&o.addUploadProgressListener(a),o.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&o.removeUploadProgressListener(a),this.pendingConnection_=null;const u=o.getErrorCode()===Nt.NO_ERROR,l=o.getStatus();if(!u||Iv(l,this.additionalRetryCodes_)&&this.retry){const p=o.getErrorCode()===Nt.ABORT;r(!1,new Mr(!1,null,p));return}const d=this.successCodes_.indexOf(l)!==-1;r(!0,new Mr(d,o))})},t=(r,i)=>{const o=this.resolve_,a=this.reject_,u=i.connection;if(i.wasSuccessCode)try{const l=this.callback_(u,u.getResponse());Ev(l)?o(l):o()}catch(l){a(l)}else if(u!==null){const l=Vo();l.serverResponse=u.getErrorText(),this.errorCallback_?a(this.errorCallback_(u,l)):a(l)}else if(i.canceled){const l=this.appDelete_?wh():uv();a(l)}else{const l=cv();a(l)}};this.canceled_?t(!1,new Mr(!1,null,!0)):this.backoffId_=yv(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&vv(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Mr{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function Av(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function Rv(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Pv(n,e){e&&(n["X-Firebase-GMPID"]=e)}function bv(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function Sv(n,e,t,r,i,o,a=!0){const u=Ah(n.urlParams),l=n.url+u,d=Object.assign({},n.headers);return Pv(d,e),Av(d,t),Rv(d,o),bv(d,r),new wv(l,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cv(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function kv(...n){const e=Cv();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Lo())return new Blob(n);throw new re(ne.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Dv(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nv(n){if(typeof atob>"u")throw mv("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class fs{constructor(e,t){this.data=e,this.contentType=t||null}}function Vv(n,e){switch(n){case Me.RAW:return new fs(Rh(e));case Me.BASE64:case Me.BASE64URL:return new fs(Ph(n,e));case Me.DATA_URL:return new fs(Lv(e),Mv(e))}throw Vo()}function Rh(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const o=r,a=n.charCodeAt(++t);r=65536|(o&1023)<<10|a&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function Ov(n){let e;try{e=decodeURIComponent(n)}catch{throw zn(Me.DATA_URL,"Malformed data URL.")}return Rh(e)}function Ph(n,e){switch(n){case Me.BASE64:{const i=e.indexOf("-")!==-1,o=e.indexOf("_")!==-1;if(i||o)throw zn(n,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case Me.BASE64URL:{const i=e.indexOf("+")!==-1,o=e.indexOf("/")!==-1;if(i||o)throw zn(n,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=Nv(e)}catch(i){throw i.message.includes("polyfill")?i:zn(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}class bh{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw zn(Me.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=xv(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function Lv(n){const e=new bh(n);return e.base64?Ph(Me.BASE64,e.rest):Ov(e.rest)}function Mv(n){return new bh(n).contentType}function xv(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e,t){let r=0,i="";eu(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(eu(this.data_)){const r=this.data_,i=Dv(r,e,t);return i===null?null:new dt(i)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new dt(r,!0)}}static getBlob(...e){if(Lo()){const t=e.map(r=>r instanceof dt?r.data_:r);return new dt(kv.apply(null,t))}else{const t=e.map(a=>Oo(a)?Vv(Me.RAW,a).data:a.data_);let r=0;t.forEach(a=>{r+=a.byteLength});const i=new Uint8Array(r);let o=0;return t.forEach(a=>{for(let u=0;u<a.length;u++)i[o++]=a[u]}),new dt(i,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sh(n){let e;try{e=JSON.parse(n)}catch{return null}return Tv(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uv(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Fv(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function Ch(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bv(n,e){return e}class Pe{constructor(e,t,r,i){this.server=e,this.local=t||e,this.writable=!!r,this.xform=i||Bv}}let xr=null;function jv(n){return!Oo(n)||n.length<2?n:Ch(n)}function kh(){if(xr)return xr;const n=[];n.push(new Pe("bucket")),n.push(new Pe("generation")),n.push(new Pe("metageneration")),n.push(new Pe("name","fullPath",!0));function e(o,a){return jv(a)}const t=new Pe("name");t.xform=e,n.push(t);function r(o,a){return a!==void 0?Number(a):a}const i=new Pe("size");return i.xform=r,n.push(i),n.push(new Pe("timeCreated")),n.push(new Pe("updated")),n.push(new Pe("md5Hash",null,!0)),n.push(new Pe("cacheControl",null,!0)),n.push(new Pe("contentDisposition",null,!0)),n.push(new Pe("contentEncoding",null,!0)),n.push(new Pe("contentLanguage",null,!0)),n.push(new Pe("contentType",null,!0)),n.push(new Pe("metadata","customMetadata",!0)),xr=n,xr}function qv(n,e){function t(){const r=n.bucket,i=n.fullPath,o=new De(r,i);return e._makeStorageReference(o)}Object.defineProperty(n,"ref",{get:t})}function $v(n,e,t){const r={};r.type="file";const i=t.length;for(let o=0;o<i;o++){const a=t[o];r[a.local]=a.xform(r,e[a.server])}return qv(r,n),r}function Dh(n,e,t){const r=Sh(e);return r===null?null:$v(n,r,t)}function zv(n,e,t,r){const i=Sh(e);if(i===null||!Oo(i.downloadTokens))return null;const o=i.downloadTokens;if(o.length===0)return null;const a=encodeURIComponent;return o.split(",").map(d=>{const p=n.bucket,y=n.fullPath,w="/b/"+a(p)+"/o/"+a(y),P=Mo(w,t,r),k=Ah({alt:"media",token:d});return P+k})[0]}function Hv(n,e){const t={},r=e.length;for(let i=0;i<r;i++){const o=e[i];o.writable&&(t[o.server]=n[o.local])}return JSON.stringify(t)}class Nh{constructor(e,t,r,i){this.url=e,this.method=t,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vh(n){if(!n)throw Vo()}function Wv(n,e){function t(r,i){const o=Dh(n,i,e);return Vh(o!==null),o}return t}function Kv(n,e){function t(r,i){const o=Dh(n,i,e);return Vh(o!==null),zv(o,i,n.host,n._protocol)}return t}function Oh(n){function e(t,r){let i;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?i=ov():i=sv():t.getStatus()===402?i=iv(n.bucket):t.getStatus()===403?i=av(n.path):i=r,i.status=t.getStatus(),i.serverResponse=r.serverResponse,i}return e}function Gv(n){const e=Oh(n);function t(r,i){let o=e(r,i);return r.getStatus()===404&&(o=rv(n.path)),o.serverResponse=i.serverResponse,o}return t}function Qv(n,e,t){const r=e.fullServerUrl(),i=Mo(r,n.host,n._protocol),o="GET",a=n.maxOperationRetryTime,u=new Nh(i,o,Kv(n,t),a);return u.errorHandler=Gv(e),u}function Xv(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function Yv(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=Xv(null,e)),r}function Jv(n,e,t,r,i){const o=e.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function u(){let j="";for(let $=0;$<2;$++)j=j+Math.random().toString().slice(2);return j}const l=u();a["Content-Type"]="multipart/related; boundary="+l;const d=Yv(e,r,i),p=Hv(d,t),y="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+p+`\r
--`+l+`\r
Content-Type: `+d.contentType+`\r
\r
`,w=`\r
--`+l+"--",P=dt.getBlob(y,r,w);if(P===null)throw fv();const k={name:d.fullPath},N=Mo(o,n.host,n._protocol),C="POST",B=n.maxUploadRetryTime,q=new Nh(N,C,Wv(n,t),B);return q.urlParams=k,q.headers=a,q.body=P.uploadData(),q.errorHandler=Oh(e),q}class Zv{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Nt.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Nt.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Nt.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,i){if(this.sent_)throw On("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw On("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw On("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw On("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw On("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class eE extends Zv{initXhr(){this.xhr_.responseType="text"}}function Lh(){return new eE}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,t){this._service=e,t instanceof De?this._location=t:this._location=De.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Bt(e,t)}get root(){const e=new De(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Ch(this._location.path)}get storage(){return this._service}get parent(){const e=Uv(this._location.path);if(e===null)return null;const t=new De(this._location.bucket,e);return new Bt(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw gv(e)}}function tE(n,e,t){n._throwIfRoot("uploadBytes");const r=Jv(n.storage,n._location,kh(),new dt(e,!0),t);return n.storage.makeRequestWithTokens(r,Lh).then(i=>({metadata:i,ref:n}))}function nE(n){n._throwIfRoot("getDownloadURL");const e=Qv(n.storage,n._location,kh());return n.storage.makeRequestWithTokens(e,Lh).then(t=>{if(t===null)throw pv();return t})}function rE(n,e){const t=Fv(n._location.path,e),r=new De(n._location.bucket,t);return new Bt(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iE(n){return/^[A-Za-z]+:\/\//.test(n)}function sE(n,e){return new Bt(n,e)}function Mh(n,e){if(n instanceof xo){const t=n;if(t._bucket==null)throw dv();const r=new Bt(t,t._bucket);return e!=null?Mh(r,e):r}else return e!==void 0?rE(n,e):n}function oE(n,e){if(e&&iE(e)){if(n instanceof xo)return sE(n,e);throw Us("To use ref(service, url), the first argument must be a Storage instance.")}else return Mh(n,e)}function nu(n,e){const t=e==null?void 0:e[Ih];return t==null?null:De.makeFromBucketSpec(t,n)}function aE(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:du(i,n.app.options.projectId))}class xo{constructor(e,t,r,i,o){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=o,this._bucket=null,this._host=Th,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=tv,this._maxUploadRetryTime=nv,this._requests=new Set,i!=null?this._bucket=De.makeFromBucketSpec(i,this._host):this._bucket=nu(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=De.makeFromBucketSpec(this._url,e):this._bucket=nu(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){tu("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){tu("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Bt(this,e)}_makeRequest(e,t,r,i,o=!0){if(this._deleted)return new _v(wh());{const a=Sv(e,this._appId,r,i,t,this._firebaseVersion,o);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,t){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}}const ru="@firebase/storage",iu="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xh="storage";function SE(n,e,t){return n=se(n),tE(n,e,t)}function CE(n){return n=se(n),nE(n)}function kE(n,e){return n=se(n),oE(n,e)}function DE(n=js(),e){n=se(n);const r=hi(n,xh).getImmediate({identifier:e}),i=uu("storage");return i&&cE(r,...i),r}function cE(n,e,t,r={}){aE(n,e,t,r)}function uE(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new xo(t,r,i,e,jt)}function lE(){Vt(new vt(xh,uE,"PUBLIC").setMultipleInstances(!0)),xe(ru,iu,""),xe(ru,iu,"esm2017")}lE();export{ce as T,yE as a,DE as b,hE as c,CE as d,dE as e,qy as f,fE as g,PE as h,qf as i,_E as j,wE as k,IE as l,RE as m,bE as n,TE as o,vE as q,kE as r,AE as s,SE as u,EE as w};
//# sourceMappingURL=firebase-Zsi029o3.js.map
