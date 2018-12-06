var _global = {
	roles : {
		inventor :	{caption: 'Inventor'},
		attorney :	{caption: 'Attorney'},
		factorie :	{caption: 'Factory'}, 
		investor :	{caption: 'Investor'}
	},
	menuItems : {
		about 		: 'About Plato Plan',
		contact 	: 'Contact Us',
		howToStart 	: 'How to start',
		faq 		: 'FAQ',
		myVideos 	: 'My Videos', 
		myInvention 	: 'My Inventions',
		inventions	: 'Inventions',
		myRequest	: 'My Requests'
	},
	menuTree : {
		common	 : ['about', 'contact'],
		publicMenu: ['howToStart', 'faq'],
		inventor : ['myVideos', 'myInvention'], 
		investor : ['invention', 'myRequest']
	}
};
