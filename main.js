function UltraPin(pin){
this.id = pin;this.value = 0;
}
function UltraRequest(url,isExternal){
this.url = url;this.external = isExternal;this.response = {text: "", json: null, blob: null, formData: null, arrayBuffer: null};
}
function UltraLang(s){
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
}};
}
function u(selector){return new UltraLang(selector)}
UltraLang.forAll = function (list,call){
for(var i = 0;i < list.length;i++){call(list[i],list,i)};
}
UltraLang.prototype.set = function (v){
if(this.type === "element"){UltraLang.forAll(this.content,function (elem){elem.innerHTML = v})};
if(this.type === "gpioPin"){this.content.value = v};
}
UltraLang.prototype.get = function (){
if(this.type === "element"){var all = "";UltraLang.forAll(this.content,function (elem){all += elem.innerHTML});return all};
if(this.type === "gpio"){return this.content.value};
if(this.type.endsWith("Request")){return this.content.response}
}
