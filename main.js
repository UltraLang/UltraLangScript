function UltraPin(pin){
this.id = pin;this.value = 0;
}
function UltraRequest(url,isExternal){
this.url = url;this.external = isExternal;this.response = {text: "", json: null, blob: null, formData: null, arrayBuffer: null};
}
function UltraLang(s){
if(typeof s === "string"){
if(s.indexOf(":") > 1 && s.indexOf(":") < 10){if(s.toLowerCase().startsWith("gpio:")){this.type = "gpioPin";this.content = new UltraPin(s.slice(5))}else if(s.indexOf(":") > 1 && s.indexOf(":") < 10){this.type = "externalRequest";this.content = new UltraRequest(s,true)}};
if(s.startsWith("/") || s.startsWith("./") || s.startsWith("../") || s.startsWith("../../")){this.type = "internalRequest";this.content = new UltraRequest(s,false)};
if(s.startsWith(".") || s.startsWith("#") || s.startsWith("<") || !this.type){this.type = "element";if(s.startsWith(".")){
this.content = document.getElementsByClassName(s.slice(1));
}else if(s.startsWith("#")){
this.content = [document.getElementById(s.slice(1))];
}else if(s.startsWith("<")){
var testelem = document.createElement("div");testelem.innerHTML = s;this.content = testelem.children;
}else{
this.content = document.getElementsByTagName(s);
}}}else if(Array.isArray(s)){this.content = s;this.type = "element"}else{this.content = [s];this.type = "element"}
}
function u(selector){return new UltraLang(selector)}
UltraLang.forAll = function (list,call){
for(var i = 0;i < list.length;i++){call(list[i],list,i)};
}
UltraLang.prototype.set = function (v,a){
if(this.type === "element"){if(a){this.content[0].setAttrtribute(v,a)}else{UltraLang.forAll(this.content,function (elem){elem.innerHTML = v})}};
if(this.type === "gpioPin"){this.content.value = v};
}
UltraLang.prototype.get = function (a){
if(this.type === "element"){if(a){if(typeof a === "string"){return this.content[0].getAttribute(a)}else{return new UltraLang(this.content[a])}}else{var all = "";UltraLang.forAll(this.content,function (elem){all += elem.innerHTML});return all}};
if(this.type === "gpio"){return this.content.value};
if(this.type.endsWith("Request")){return this.content.response}
}
UltraLang.prototype.on = function (e,c){
if(this.type === "element"){UltraLang.forAll(this.content,function (elem){elem.addEventListener(e,c)})};
}
UltraLang.prototype.style = function (s){
if(Array.isArray(s)){
var styleObj = {};
for(var i = 0;i < s.length;i++){
var style = s[i].replace(/(-)[a-z]/g,function (m){return m.charAt(1).toUpperCase()});
styleObj[s[i]] = this.content[0].style[style];
};
return styleObj;
}else if(typeof s === "string"){
var s = s.replace(/(-)[a-z]/g,function (m){return m.charAt(1).toUpperCase()});
return this.content[0].style[s];
}else{
var styles = Object.keys(s);
for(var i = 0;i < styles.length;i++){
if(styles[i].indexOf("-") > -1){
var style = styles[i].replace(/(-)[a-z]/g,function (m){return m.charAt(1).toUpperCase()});
}else{style = styles[i]};
UltraLang.forAll(this.content,function (elem){elem.style[style] = s[styles[i]]})
}}};
UltraLang.prototype.add = function (c){
if(typeof c === "string"){UltraLang.forAll(this.content,function (elem){elem.classList.add(c.slice(1))})}
if(c.content){UltraLang.forAll(c.content,function (elem){this.content[0].appendChild(elem)})}
};
UltraLang.prototype.remove = function (c){
if(c.startsWith(".")){UltraLang.forAll(this.content,function (elem){elem.classList.remove(c.slice(1))})}
};
UltraLang.prototype.exists = function (c){
if(c.startsWith(".")){return this.content[0].classList.contains(c.slice(1))}
};
UltraLang.prototype.toggle = function (c){
if(c.startsWith(".")){UltraLang.forAll(this.content,function (elem){elem.classList.toggle(c.slice(1))})}
};
UltraLang.prototype.search = function (q){
var elems = [];
UltraLang.forAll(this.content,function (elem){if(elem.innerText.indexOf(q) > -1){elems.push(elem)}});
return new UltraLang(elems)
};
