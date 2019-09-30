let canList = ['login', 'greeting', 'first-page', 'create-task'],
	hist = ['login'],
	obj = [qs('#login')];

const tasks = {
	'Тип': (el) => {
		let modal = new popupWindow({
			'header': 'Выберите тип автомобиля',
			'items': [
				'Легковой автомобиль',
				'Грузовой автомобиль',
				'Третий вариант'
			]
		});
	},
	
	'Цель': (el) => {
		let modal = new popupWindow({
			'header': 'Выберите пожелания водителя',
			'items': [
				'Колёса',
				'Кузов',
				'Крыша',
				'Салон',
				'Пятый вариант'
			]
		});
	}
}

document.addEventListener("deviceready", onDocumentReady, false);

function onDocumentReady(){
    document.addEventListener("backbutton", backHistory, true);
}

function sendHistory (last) {
	if (hist[hist.length - 1] !== last && canList.indexOf(last) !== -1 ) {
		hist.push(last);
		if (obj.length > 0) {
			obj[obj.length - 1].classList.remove('active');
			obj[obj.length - 1].removeAttribute('active');
		}
		
		if (last === "first-page") {
			qs('#main').setAttribute('active', '');
			setTimeout(() => {
				qs('#main').classList.add('active');
			})
		}
		
		obj.push(qs(`#${last}`));
		qs(`#${last}`).setAttribute('active', '');
		setTimeout(() => {
			qs(`#${last}`).classList.add('active');
		}, 1);
	}
}

function backHistory () {
	if (location.hash === "#menu") {
		qsa('.popup-modal-window').forEach((pmw) => {
			pmw.outerHTML = '';
		});
		
		history.back();
	} else if (location.hash === "#main-menu") {
		qsa('.menu-modal-window').forEach((mmw) => {
			mmw.outerHTML = '';
		});
		
		history.back();
	} else {
		let last = hist.pop(),
			lobj = obj.pop();
			
		console.log(lobj);	
		
		lobj.classList.remove('active');
		setTimeout(() => {
			lobj.removeAttribute('active');
		}, 300);
		
		if (last === "first-page") {
			navigator.app.exitApp();
		} else {
			obj[obj.length - 1].setAttribute('active', '');
			setTimeout(() => {
				obj[obj.length - 1].classList.add('active');
			}, 1);
		}
	}
}

function openMenu () {
	let modal = new menuWindow({
		'header': 'Username',
		'items': [{
			'<i class="far fa-history"></i> История работы': `sendHistory('history-task')`,
			'<i class="far fa-plus-circle"></i> Создать новое задание': `sendHistory('create-task')`,
		},{
			'<i class="far fa-users"></i> Список пользователей': `sendHistory('list-user')`,
			'<i class="far fa-user-plus"></i> Создать пользователя': `sendHistory('create-user')`
		},{
			'<i class="far fa-sign-out-alt"></i> Выход с аккаунта': `sendHistory('logout')`,
			'<i class="far fa-door-open"></i> Выход с приложения': `sendHistory('exit')`
		}]
	});
}

qsa('[popup-type]').forEach((popup) => {
	popup.addEventListener('click', (event) => {
		let target = event.target,
			type = target.getAttribute('popup-type');
		
		if (typeof tasks[type] !== "undefined") {
			tasks[type](target);
		}
	});
});