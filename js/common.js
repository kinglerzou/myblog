window.onload=function(){
			   	// �ٶȵ�ͼAPI����
		       //var map = new BMap.Map("map");
			   //var point = new BMap.Point(116.331398,39.897445);
			    //map.centerAndZoom(point,12);
			    function myFun(result){
			    	var cityName = result.name;
				//map.setCenter(cityName);
				//alert("��ǰ��λ����:"+result);
				//return cityName;
				document.getElementsByClassName("city")[0].innerHTML=cityName;
			}
			var myCity = new BMap.LocalCity();
			myCity.get(myFun);

			  	             if(window.console&&window.console.log) {
                console.log(
                	"��ӭ�ȵ��ҵĲ��ͣ��Ҿ��ñ����һ���ǳ��������飬more coding more love\n github:https://github.com/kingzou");
            }
		}


		      //��������ҳ������¼�
		      EventUtil.addHandler(window,"scroll",function(event){
		      	var fixelement=document.getElementsByClassName("banner")[0],
		      	navTop=fixelement.offsetTop,
		      	scrollTop=document.body.scrollTop||document.documentElement.scrollTop,logoTop=66,claName=fixelement.className;
				var addLine=document.getElementById("navigation");
		      	if(scrollTop>(navTop-logoTop)){
		      		if(claName.indexOf(" fixed")<0){
		      			fixelement.className+=" fixed";
						var nodeOra=document.createElement("div");
						 nodeOra.setAttribute("class","move_remark");
						EventUtil.insertAfter(nodeOra,addLine);
		      		}
		      	}
		      	if(scrollTop==0)
		      	{	
					var moveremark=document.getElementsByClassName("move_remark")[0];
		      		fixelement.className=fixelement.className.replace(" fixed","");
					if(moveremark){
					fixelement.removeChild(moveremark);
					}
		      	}

			  //backtopͼ���Ƿ�����
			  var backtop=document.getElementsByClassName("u-backtop")[0];
			  var top = document.body.scrollTop | document.documentElement.scrollTop;
			  var hei=document.documentElement.clientHeight;
			  if(top>hei)
			  {
			  	backtop.style.display="block";
			  }
			  else{
			  	backtop.style.display="none";
			  }

			});
           //����������li �ı��²�������λ��
           var navi=document.getElementById("navigation");
           var navili=document.querySelectorAll("#navigation li");
           var movemark=document.getElementsByClassName("move_mark")[0];
           EventUtil.addHandler(navi,"mouseover",function(event){
           	var event=event?event:window.event;
           	var src=event.target||event.srcElement;
           	// switch(src.innerText){
           	// 	case "��̸":
           	// 	movemark.style.marginLeft="9.8%";
           	// 	break;
           	// 	case "���":
           	// 	movemark.style.marginLeft="15.7%";
           	// 	break;
           	// 	case "����":
           	// 	movemark.style.marginLeft="21.6%";
           	// 	break;
           	// 	default:
           	// 	movemark.style.marginLeft="4%";
           	// 	break;
           	// }
           });
        //load_more
        var loadMore=document.getElementsByClassName("load_more")[0];
		var parent=document.getElementsByClassName("left")[0];
        EventUtil.addHandler(loadMore,"click",function(event){
              var fragment=document.createDocumentFragment();

			  for(var i=0;i<4;i++){
				 var div=document.createElement("div");
				 div.setAttribute("class","day");
			      var html='<div class="time"><a href="" class="title_link">mark jquery ��ʽ���õ�jsԭ��</a><div><span class="wtime newfont">2015/01/01</span><span class="mark newfont">javascript,html</span></div></div>';
                  html+='<div class="article_body">ժҪ: ������ʹ��jquery��ʱ����õ�����$("#id").css("color","red").show(200); ����д�е���ٴ��������������𲽲�ѯDOM��������ģ�'; 
				  html+='js ԭ��ʵ�֣� function demo(){}demo.prototype={ first:function...<a href="#" class="more" title="�鿴����">more</a></div><div class="article_end"></div></div>';
				  div.innerHTML=html;
				  fragment.appendChild(div);
				 }
				parent.insertBefore(fragment,loadMore);
				loadMore.style.display="none";

        });

//�ٶȷ�����ʵ��
window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"2","bdPos":"right","bdTop":"174.5"},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"������","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];