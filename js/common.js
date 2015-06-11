window.onload=function(){
			   	// 百度地图API功能
		       //var map = new BMap.Map("map");
			   //var point = new BMap.Point(116.331398,39.897445);
			    //map.centerAndZoom(point,12);
			    function myFun(result){
			    	var cityName = result.name;
				//map.setCenter(cityName);
				//alert("当前定位城市:"+result);
				//return cityName;
				document.getElementsByClassName("city")[0].innerHTML=cityName;
			}
			var myCity = new BMap.LocalCity();
			myCity.get(myFun);

			  	             if(window.console&&window.console.log) {
                console.log(
                	"欢迎踩点我的博客，我觉得编程是一件非常愉快的事情，more coding more love\n github:https://github.com/kingzou");
            }
		}
		      //导航栏随页面滚动事件
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

			  //backtop图标是否隐藏
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
           //监听导航栏li 改变下部承托条位置
           // var navi=document.getElementById("navigation");
           // var navili=document.querySelectorAll("#navigation li");
           // var movemark=document.getElementsByClassName("move_mark")[0];
           // EventUtil.addHandler(navi,"mouseover",function(event){
           // 	var event=event?event:window.event;
           // 	var src=event.target||event.srcElement;
           // 	switch(src.innerText){
           // 		case "杂谈":
           // 		movemark.style.marginLeft="9.8%";
           // 		break;
           // 		case "随笔":
           // 		movemark.style.marginLeft="15.7%";
           // 		break;
           // 		case "个人":
           // 		movemark.style.marginLeft="21.6%";
           // 		break;
           // 		default:
           // 		movemark.style.marginLeft="4%";
           // 		break;
           // 	}
           // });
        //load_more
        var loadMore=document.getElementsByClassName("load_more")[0];
		var parent=document.getElementsByClassName("left")[0];
		if(loadMore&&parent){
        EventUtil.addHandler(loadMore,"click",function(event){
              var fragment=document.createDocumentFragment();

			  for(var i=0;i<4;i++){
				 var div=document.createElement("div");
				 div.setAttribute("class","day");
			      var html='<div class="time"><a href="" class="title_link">mark jquery 链式调用的js原理</a><div><span class="wtime newfont">2015/01/01</span><span class="mark newfont">javascript,html</span></div></div>';
                  html+='<div class="article_body">摘要: 我们在使用jquery的时候会用到类似$("#id").css("color","red").show(200); 这样写有点减少代码量，减少了逐步查询DOM的性能损耗；'; 
				  html+='js 原理实现： function demo(){}demo.prototype={ first:function...<a href="#" class="more" title="查看更多">more</a></div><div class="article_end"></div></div>';
				  div.innerHTML=html;
				  fragment.appendChild(div);
				 }
				parent.insertBefore(fragment,loadMore);
				loadMore.style.display="none";

        });
    }

//百度分享功能实现
window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"2","bdPos":"right","bdTop":"174.5"},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];