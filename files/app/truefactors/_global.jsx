var _global = {
	langs : {
		en : 'English',
		cn : '中文' //,
/*		sp : 'Española',
		fr : 'française',
		jp : '日本語の',
		kr : '한국어',
		ge : 'Deutsche'*/
	},
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
		common	 	: ['contact'],
		_publicMenu	: ['howToStart', 'faq'],
		inventor 	: ['myVideos', 'howToStart', 'myInvention', 'faq'], 
		investor 	: ['faq', 'inventions', 'myRequest']
	}
};
