function getGroupItem() {
	const participants = [];
	const subtotal = [];
	const orders = [];
	$$("div.cart-summary-item__toggle__participant span.cart-summary-item__toggle__participant__title").forEach((name) => {
		participants.push(name.innerText);
	});
	$$("div.cart-summary-item__toggle__participant span.cart-summary-item__toggle__participant__total").forEach((name) => {
		subtotal.push(name.innerText);
	});
	
	let orderList = [];
	let orderIndex = -1;
	$("div.cart-summary-items").childNodes.forEach((index) => {
		if (index.className === 'cart-summary-item__toggle') {
			orderIndex += 1;
			orderList.push(false);
		} else {
			orderList[orderList.length-1] = true;
		}
	});

	$$("ul.cart-summary-item-list").forEach((person) =>
		{
			const order = [];
			person.childNodes.forEach((item) => 
				{ 	let orderItem = item.innerText.split('\n');
					if (orderItem.length < 4) {
						orderItem.splice(2, 0, '');
					} else if (orderItem.length > 4) {
						orderItem = orderItem.slice(0,2).concat([orderItem.slice(2,-1).join(' ')]).concat([orderItem[orderItem.length-1]])
					}
					order.push(orderItem);
				}
			);
			orders.push(order);
		}
	);

	const results = [];
	if (participants.length > 0) {
		for (let i = 0; i < participants.length; i += 1) {
			results.push({
				name: participants[i],
				price: orderList[i] ? subtotal.shift() : 0,
				orders: orderList[i] ? orders.shift() : {},
			});
		}
	} else {
		orders.forEach((item) => {
			results.push({
				orders: item,
			});
		});
	}
	
	// return results;
	return console.log(JSON.stringify(results));
}
