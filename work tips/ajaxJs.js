function crateXMLHTTPRequest(){
	var xmlHttpRequest;
	if(widow.XMLHttpRequest){
		xmlHttpRequest=new XMLHttpRequest();
		//针对某些特定版本的mozillar浏览器的BUG进行修正
		if(xmlHttpRequest.overrideMimeType){
			xmlHttpRequest.overrideMimeType('text/xml');
		}
	}
	else if(widow.ActiveXObject()){
		var activeName=['Msxml2.XMLHTTP','Microsoft.XMLHTTP'];
		for(var i=0;i<activeName.length;i++){
			try{
				xmlHttpRequest=new ActiveXObject(activeName[i]);
				if(xmlHttpRequest){
					break;
				}
			}
			catch(e){

			}
	}
	}
	return xmlHttpRequest;
}

//get
function get(){
     var req=crateXMLHTTPRequest();
     if(req){
     	req.open('get','url?keyword=xxx',true);
     	req.onreadystatechange=function(){
     		if(req.readyState==4){
     			if(req.status==200){

     			}
     			else{
     				
     			}
     		}
     	}
     	req.send(null);
     }
}
//post
function post(){
	var req=createXMLHTTPRequest();
	if(req){
		req.open('post','url',true);
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded;charset=gbk');
		req.send('keyword=xxx');
		req.onreadystatechange=function(){
			if(req.readyState==4){
				if(req.status==200){

				}
				else{

				}
			}
		}
	}

}