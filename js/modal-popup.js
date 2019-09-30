class popupWindow {
	constructor ({header, items}) {
		this.header = header;
		this.items = items;
		this.text = 
			`<div class="popup-form">
				<div class="popup-title">${this.header}</div>
				<div class="popup-main">
					${this.combine()}
				</div>
			</div>`;
		
		this.create();
	}
	
	combine () {
		let text = '';
		
		console.log(this.items);
		
		this.items.forEach((item, index) => {
			text += `<div class="item" mean>${this.items[index]}</div>`
		});
		
		return text;
	}
	
	create () {
		this.dom = dom('div', {class: `popup-modal-window`, body: this.text, click: () => { this.remove() }});
		this.dom.setAttribute('active', '');
		setTimeout(() => {
			this.dom.classList.add('to-top');
		}, 1);
		qs('#main-app').appendChild(this.dom);
		
		location.hash = "#menu";
	}
	
	remove () {
		this.dom.classList.remove('to-top');
		setTimeout(() => {
			this.dom.outerHTML = '';
		}, 300);
		
		history.back();
	}
}

class menuWindow {
	constructor ({header, items}) {
		this.header = header;
		this.items = items;
		this.text = 
			`<div class="menu-form">
				<div class="menu-title">
					<div class="menu-avatar">${this.header[0]}</div>
					<div class="menu-user">${this.header}</div>
				</div>
				<div class="menu-main">
					${this.combine()}
				</div>
			</div>`;
		
		this.create();
	}
	
	combine () {
		let text = '';
		
		console.log(this.items);
		
		this.items.forEach((item) => {
			text += `<div class='cathegory'>`;
			
			for (name in item) {
				text += `<div class="item" onclick="${item[name]}">${name}</div>`
			}
			
			text += `</div>`;
		});
		
		return text;
	}
	
	create () {
		this.dom = dom('div', {class: `menu-modal-window`, body: this.text, click: () => { this.remove() }});
		this.dom.setAttribute('active', '');
		setTimeout(() => {
			this.dom.classList.add('to-right');
		}, 1);
		qs('#main-app').appendChild(this.dom);
		
		location.hash = "#main-menu";
	}
	
	remove () {
		this.dom.classList.remove('to-right');
		setTimeout(() => {
			this.dom.outerHTML = '';
		}, 300);
		
		history.back();
	}
}