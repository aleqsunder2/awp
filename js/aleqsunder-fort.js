function change_height (event) {
	event.target.style.setProperty('height', `${event.target.scrollHeight - 4}px`);
}

function qsa (path, obj) {
	obj = obj || document;
	return obj.querySelectorAll(path);
}

function qs (path, obj) { return qsa (path, obj)[0] }

function dom (tag, array, appendChild, endclass) {
	tag = tag || 'div';
	let el = document.createElement(tag);
	
	for (item in array) {
		let i = '',
			type = '';
		
		switch (item) {
			case 'style':
				for (name in array[item]) { i += `${name}: ${array[item][name]};` }
				type = 'style';
			break;
			case 'class':
				i = array['class'];
				type = 'className';
			break;
			case 'body':
				i = array['body'];
				type = 'innerHTML';
			break;
			case 'click':
			case 'hover':
			case 'mouseenter':
			case 'mouseleave':
				el.addEventListener(item, array[item]);
				type = null;
			default:
				i = array[item];
				type = item;
			break;
		}
		
		if (type != null) el[type] = i;
	}
	
	if (appendChild === true) {
		document.body.appendChild(el);
		
		if (endclass) {
			setTimeout (() => {
				el.classList.add(endclass);
			});
		}
	}
	
	return el;
}