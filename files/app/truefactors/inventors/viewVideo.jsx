var _compViewVideo = function(me, Root) {
	this.showVideoMenu = function() {
		return (<span>	
		<button type="button" className="btn btn-info" onClick={me.compData.loadVideos.bind(me)}>Load Data</button>
		</span>)
	};
	this.setSubModule = function(v) {
		me.setState({subModule : v});
	};
	this.showDigitizeStream = function() {
		var list = me.DigitizeStreamList;
		return (
			<div className="container">
				<div className="row">
					{list.map(function(m) {
						return (<div className="col-sm-3 p-1">
							{Root.commUI.show({
								code: 'infoBox', 
								parent : me, 
								data : <img style={{height:'100px'}} 
									       src={'/api/platoplan/demoAPI.api?code=cutImage&fn=' + me.state.cVideo}/, 
								setting : {
									noshadow :false,
									type: 'light',
									style : {'min-height' : '9em'}
								}
							})}
							</div>)
						})}
					}
				</div>
			</div>)
	};
	this.showSubModule = function () {
		switch(me.state.subModule) {
			case 'DigitizeStream' :
				return me.DigitizeStreamList.join(',');
				break;
			case 'PlaySection' :
				return 'Section Play (5-15 secs)';
				break;				
			case 'ProgrammingPlay' :
				return 'Programming Play';
				break;				
		}
	}
	this.showVideoPage = function (fn) {
		setTimeout(function() {
			$('#_video_play')[0].play();
		});
		return (
			<div className="container">
				<div className="row ">
				{Root.lib.spinAnchor(me, 'AB')}
					<div className="col-sm-12 p-1">	
					{Root.commUI.show({
							code: 'infoBox', 
							parent : me, 
							data : (
							<span>
							<button type="button" className="btn btn-secondary m-1" onClick={me.setCurrentVideo.bind(me, null)}>Go Back</button>
							<button type="button" className="btn btn-warning  m-1 border border-default pull-right" onClick={this.setSubModule.bind(me, 'DigitizeStream')}>Digitize Stream</button>
							<button type="button" className="btn btn-success  m-1 border border-default pull-right" onClick={this.setSubModule.bind(me, 'PlaySection')}>Section Play (5-15 secs)</button>
							<button type="button" className="btn btn-info  m-1 border border-default pull-right" onClick={this.setSubModule.bind(me, 'ProgrammingPlay')}>Programming Play</button>
							</span>), 
							setting : {
								class : ' alert-secondary text-left ',
								noshadow :  true,
								rounded : true,
								style : {'min-height' : '2em'}
							}
						})}
					</div>
					<div className="col-sm-4 p-1">	
						<video id="_video_play" width="320"  controls autoplay>
							<source src={'/api/platoplan/demoAPI.api?code=playVideo&fn=' + fn}/>
							Your browser does not support the video tag.
						</video>						
					</div>
					<div className="col-sm-8 p-1">	
						{this.showSubModule()}						
					</div>
				</div>
			</div>	
		)
	};
	this.showVideos = function () {
		return  (
			<div className="container">
				{Root.lib.spinAnchor(me, 'AA')}
				<div className="row ">
					<div className="col-sm-12 p-1">	
					{Root.commUI.show({
							code: 'infoBox', 
							parent : me, 
							data : me.compViewVideo.showVideoMenu(), 
							setting : {
								class : ' alert-secondary text-right ',
								noshadow :  true,
								rounded : true,
								style : {'min-height' : '2em'}
							}
						})}
					</div>
				</div>
				<div className="row mt-2">				
					{me.list.map(function(m) {
					return (<div className="col-sm-3 p-1">
						{Root.commUI.show({
							code: 'infoBox', 
							parent : me, 
							data : me.compViewVideo.showImagePage(m), 
							setting : {
								noshadow :false,
								type: 'light',
								style : {'min-height' : '9em'}
							}
						})}
						</div>)
					})}							
				</div>
			</div>)	
	}
	this.showImagePage = function(m) {
		return (<span><a href="JavaScript: void(0)" onClick={me.setCurrentVideo.bind(me, m)}>
				<i className="fa fa-scissors" aria-hidden="true"></i></a>
				<br/>
				<img style={{height:'160px'}} src={'/api/platoplan/demoAPI.api?code=cutImage&fn=' + m}/>
			</span>);
	}
};
