/**
 * @author ������
 * @github https://github.com/bh-lay/toucher
 * @modified 2015-3-7 01:02
 * 
 */

 
(function(global,doc,factoryFn){
	//��ʼ��toucher������
	var factory = factoryFn(global,doc);
	
	//�ṩwindow.util.toucher()�ӿ�
	global.util = global.util || {};
	global.util.toucher = global.util.toucher || factory;
	
	//�ṩCommonJS�淶�Ľӿ�
	global.define && define(function(require,exports,module){
		//����ӿ�
		return factory;
	});
})(this,document,function(window,document){
	/**
	 * �ж��Ƿ�ӵ��ĳ��class
	 */
	function hasClass(dom,classSingle){
		return dom.className.match(new RegExp('(\\s|^)' + classSingle +'(\\s|$)'));
	}

	/**
	 * @method �������ڶ��������¼�����
	 * @description ֧����ʽ����
	 * 
	 * @param string �¼���
	 * @param [string] �¼�ί����ĳ��class����ѡ��
	 * @param function �����������¼�������ʱ��Ҫִ�еĻص����� 
	 * 
	 */
	function ON(eventStr,a,b){
		this._events = this._events || {};
		var className,fn;
		if(typeof(a) == 'string'){
			className = a.replace(/^\./,'');
			fn = b;
		}else{
			className = null;
			fn = a;
		}
		//���callback�Ƿ�Ϸ�,�¼��������Ƿ���ڡ�
		if(typeof(fn) == 'function' && eventStr && eventStr.length){
			var eventNames = eventStr.split(/\s+/);
			for(var i=0,total=eventNames.length;i<total;i++){
			
				var eventName = eventNames[i];
				//�¼����޸��¼�������һ���¼���
				if(!this._events[eventName]){
					this._events[eventName] = [];
				}
				this._events[eventName].push({
					'className' : className,
					'fn' : fn
				});
			}
		}

		//�ṩ��ʽ���õ�֧��
		return this;
	}

	/**
	 * @method �¼�������
	 * @description �����¼���ԭʼ��������target��������׷���¼���
	 * 
	 * @param string �¼���
	 * @param object ԭ���¼�����
	 */
	function EMIT(eventName,e){
		this._events = this._events || {};
		//�¼����޸��¼�����������
		if(!this._events[eventName]){
			return
		}
		//��¼��δ��ִ�е����¼���
		var rest_events = this._events[eventName];
		
		//���¼�Դ��target��ʼ����ð��
		var target = e.target;
		while (1) {
			//��û����Ҫִ�е��¼�������ð��
			if(rest_events.length ==0){
				return;
			}
			//���Ѿ�ð����������ⶥ���󶨣�����ð��
			if(target == this.dom || !target){
				//����ʣ�������¼���
				for(var i=0,total=rest_events.length;i<total;i++){
					var classStr = rest_events[i]['className'];
					var callback = rest_events[i]['fn'];
					//δָ���¼�ί�У�ֱ��ִ��
					if(classStr == null){
						event_callback(eventName,callback,target,e);
					}
				}
				return;
			}
			
			//��ǰ��ҪУ����¼���
			var eventsList = rest_events;
			//�ÿ���δִ�е����¼���
			rest_events = [];

			//�����¼����а�
			for(var i=0,total=eventsList.length;i<total;i++){
				var classStr = eventsList[i]['className'];
				var callback = eventsList[i]['fn'];
				//�����¼�ί�У�ִ��
				if(hasClass(target,classStr)){
					//����falseֹͣ�¼�ð�ݼ������¼����������ִ��
					if(event_callback(eventName,callback,target,e) == false){
						return
					}
				}else{
					//������ִ��������ѹ�ص���δִ�е����б���
					rest_events.push(eventsList[i]);
				}
			}
			//����ð��
			target = target.parentNode;
		}
	}
	
	/**
	 * ִ�а󶨵Ļص�������������һ���¼�����
	 * @param[string]�¼���
	 * @param[function]��ִ�е��ĺ���
	 * @param[object]ָ���dom
	 * @param[object]ԭ��event����
	 */
	function event_callback(name,fn,dom,e){
		var touch = e.touches.length ? e.touches[0] : {};
		
		var newE = {
			'type' : name,
			'target' : e.target,
			'pageX' : touch.clientX || 0,
			'pageY' : touch.clientY || 0
		};
		//Ϊswipe�¼����ӽ�����ʼλ�ü��ƶ�����
		if(name.match(/^swipe/) && e.startPosition){
			newE.startX = e.startPosition['pageX'],
			newE.startY = e.startPosition['pageY'],
			newE.moveX = newE.pageX - newE.startX,
			newE.moveY = newE.pageY - newE.startY
		}
		var call_result = fn.call(dom,newE);
		//���󶨷�������false����ֹ�����Ĭ���¼�
		if(call_result == false){
			e.preventDefault();
			e.stopPropagation();
		}
		
		return call_result;
	}
	/**
	 * �ж�swipe����
	 */
	function swipeDirection(x1, x2, y1, y2) {
		return Math.abs(x1 - x2) >=
			Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
	}

	/**
	 * ����ԭ�����¼�����������ģ���¼�
	 * 
	 */
	function eventListener(DOM){
		var this_touch = this;

		//�����ʼʱ��
		var touchStartTime = 0;
		
		//��¼��һ�ε��ʱ��
		var lastTouchTime = 0;
		
		//��¼��ʼ�����λ��
		var x1,y1,x2,y2;
		
		//����¼�����ʱ��
		var touchDelay;
		
		//���Գ����¼�����ʱ��
		var longTap;
		
		//��¼��ǰ�¼��Ƿ���Ϊ�ȴ�������״̬
		var isActive = false;
		//��¼��������Ϣ���¼�
		var eventMark = null;
		//�����û���������
		function actionOver(e){
			isActive = false;
			clearTimeout(longTap);
			clearTimeout(touchDelay);
		}
		
		//������ʼ
		function touchStart(e){
			//�����¼�
			eventMark = e;
		
			x1 = e.touches[0].pageX;
			y1 = e.touches[0].pageY;
			x2 = 0;
			y2 = 0;
			isActive = true;
			touchStartTime = new Date();
			EMIT.call(this_touch,'swipeStart',e);
			//����Ƿ�Ϊ����
			clearTimeout(longTap);
			longTap = setTimeout(function(){
				actionOver(e);
				//�϶��˴��¼�Ϊ�����¼�
				EMIT.call(this_touch,'longTap',e);
			},500);
		}
		//��������
		function touchend(e){
			//touchend�У��ò�������λ����Ϣ����ʹ��ȫ�ֱ����µ��¼�
			EMIT.call(this_touch,'swipeEnd',eventMark);
			if(!isActive){
				return
			}
			var now = new Date();
			if(now - lastTouchTime > 260){
				touchDelay = setTimeout(function(){
					//�϶��˴��¼�Ϊ����¼�
					actionOver();
					EMIT.call(this_touch,'singleTap',eventMark);
				},250);
			}else{
				clearTimeout(touchDelay);
				actionOver(e);
				//�϶��˴��¼�Ϊ������������¼�
				EMIT.call(this_touch,'doubleTap',eventMark);
			}
			lastTouchTime = now;
		}
		
		//��ָ�ƶ�
		function touchmove(e){
			//�����¼�
			eventMark = e;
			//��ԭ���¼������ϼ�¼��ʼλ�ã�Ϊswipe�¼����Ӳ������ݣ�
			e.startPosition = {
				pageX : x1,
				pageY : y1
			};
			//�϶��˴��¼�Ϊ�ƶ��¼�
			EMIT.call(this_touch,'swipe',e);

			if(!isActive){
				return
			}
  	  x2 = e.touches[0].pageX
      y2 = e.touches[0].pageY
			if(Math.abs(x1-x2)>2 || Math.abs(y1-y2)>2){
				//�϶��˴��¼�Ϊ�ƶ�����
				var direction = swipeDirection(x1, x2, y1, y2);
				EMIT.call(this_touch,'swipe' + direction,e);
			}else{
				//�϶��˴��¼�Ϊ����¼�
				actionOver(e);
				EMIT.call(this_touch,'singleTap',e);
			}
			actionOver(e);
		}

		/**
		 * �Կ�ʼ���Ƶļ���
		 */
		DOM.addEventListener('touchstart',touchStart);
		DOM.addEventListener('MSPointerDown',touchStart);
		DOM.addEventListener('pointerdown',touchStart);

		/**
		 * �����ƽ����ļ����������
		 */
		DOM.addEventListener('touchend',touchend);
		DOM.addEventListener('MSPointerUp',touchend);
		DOM.addEventListener('pointerup',touchend);

		/**
		 * ���ƶ����Ƶļ���
		 */
		DOM.addEventListener('touchmove',touchmove);
		DOM.addEventListener('MSPointerMove',touchmove);
		DOM.addEventListener('pointermove',touchmove);

		/**
		 * ���ƶ������ļ���
		 */
		DOM.addEventListener('touchcancel',actionOver);
		DOM.addEventListener('MSPointerCancel',actionOver);
		DOM.addEventListener('pointercancel',actionOver);
	}
	
	/**
	 * touch��
	 * 
	 */
	function touch(DOM,param){
		var param = param || {};

		this.dom = DOM;
		//����DOMԭ���¼�
		eventListener.call(this,this.dom);
	}
	//��չ�¼��󶨷���
	touch.prototype['on'] = ON;
	
	//�����ṩ�ӿ�
	return function (dom){
		return new touch(dom);
	};
});
