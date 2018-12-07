var _compModule = function(me, Root) {
    this.loadInventors = function() {
				return Root.lib.asyncModule({
					setting:{	extend: {
								includes : [
									'https://dev.shusiou.win/app/truefactors/inventors/data.jsx',
									'https://dev.shusiou.win/app/truefactors/inventors/view.jsx'	
								],
								main : 'https://dev.shusiou.win/app/truefactors/inventors/main.jsx'
							}, 
							master: '//master1_dev.shusiou.win/api/JSXhub.api'
						},
					data : '',
					parent : me
				})
    }
};
