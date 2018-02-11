function UltraPin(pin){
this.id = pin;this.status = 0;
}
function UltraRequest(url,isExternal){
this.url = url;this.external = isExternal
}
function UltraLang(s){
if(s.indexOf(":") < 10){if(s.toLowerCase().startsWith("gpio:")){this.type = "gpioPin";this.content = new UltraPin(s.slice(5))}else if(s.indexOf(":") < 10){this.type = "externalRequest";this.content = new UltraRequest(s,true)}};
if(s.startsWith("/")){this.type = "internalRequest";this.content = new UltraRequest(s,false)};
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
