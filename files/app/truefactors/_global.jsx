var _global = {
	langs : {
		en : 'English',
		cn : '中文',
		sp : 'Española',
		fr : 'française',
		jp : '日本語の',
		kr : '한국어',
		ge : 'Deutsche'
	},
	roles : {
		inventor :	{caption: 'Inventor'},
	/*	attorney :	{caption: 'Attorney'},
		factorie :	{caption: 'Factory'}, */
		investor :	{caption: 'Investor'}
	},
	menuItems : {
		about 			: 'About Plato Plan',
		contactUs 		: 'Contact Us',
		howToStart 		: 'How to start',
		howToStartInvention 	: 'How to start',
		howToStartInvestment	: 'How to start',
		faq 			: 'FAQ',
		myVideos 		: 'My Videos', 
		myInventions 		: 'My Inventions',
		inventions		: 'Inventions',
		myRequest		: 'My Requests',
		publicSearch 		: 'Public Search',
	},
	menuTree : {
		common	 	: ['contactUs'],
		_publicMenu	: ['publicSearch', 'howToStart', 'faq'],
		inventor 	: ['myInventions', 'myVideos', 'howToStartInvention', 'faq'], 
		investor 	: ['howToStartInvestment', 'myRequest', 'inventions', 'faq']
	}
};
