React.createClass({
        getInitialState: function() {
		var me = this;
		me.roles = {};
          	return {}
        },
        componentDidMount:function() {
               var me = this;
		me.init();
        },
        componentDidUpdate:function() {
               var me = this;
        },	
	asyncAdbox : function(v) {
		var me = this;
		return <_asyncModule plugin={{extend: {
							includes : [],
							main : 'https://dev.shusiou.win/app/truefactors/adbox/main.jsx'
						}, 
						master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
					data={{role: me.state.role, v : me.state.v, sk:v}}
					parent={me} />
	},
	asyncSalesForce : function() {
		var me = this;
		return 	<_asyncModule plugin={{extend: {
				includes : [],
				main : 'https://dev.shusiou.win/app/truefactors/salesForce/main.jsx'
			}, 
			master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
			data={{}} parent={me} />
	},
        init : function(code) {
                var me = this;
		me.roles = Root.global.roles;
		me.setState({role: ''});
        },
        showBody : function() {
                var me = this;
		if (!me.state.role) return (<span/>);
		else {
			switch (me.state.role) {
				case 'inventor' :  return (<_sectionInventors/>);
				case 'investor' : return (<_sectionInvestors/>);
				default :
					return 'Error: undefined section <' + me.state.role + '/>';
			}
		}
        }, 
	videoBox : function(v) {
		var _videoBox = Root.commUI.videoBox;
		return <_videoBox data={v} />
	},
	infoBox : function(data, class) {
		var _infoBox = Root.commUI.infoBox;
		return <_infoBox data={data} class={class} />
	},
        render: function() {
          var me = this;
          return  (
		<span>
			<_rolesMenu parent={me}/>
			<_secondMenu parent={me}/>

			<div className="container">
			<div className="row">
				<div className="col-sm-12 mt-2" style={{'min-height' : '32em'}}>
					<div className="container">
						<div className="row ">
							{me.videoBox('')}
							{me.videoBox('')}
							{me.videoBox('')}
							{me.videoBox('')}
							{me.videoBox('')}
							{me.videoBox('')}
							{me.videoBox('')}
							{me.videoBox('')}
							{me.videoBox('')}
							{me.videoBox('')}
							{me.videoBox('')}
							{me.videoBox('')}
							{me.videoBox('')}
							{me.videoBox('')}
							
							{/*me.videoBox(me.asyncAdbox('2'))}
							{me.videoBox(me.asyncAdbox('1'))}
							{me.videoBox(me.asyncAdbox('3'))}
							{me.videoBox(me.asyncAdbox('2'))}
							{me.videoBox(me.asyncAdbox('1'))}
							{me.videoBox(me.asyncAdbox('3'))}
							{me.videoBox(me.asyncAdbox('2'))}
							{me.videoBox(me.asyncAdbox('1'))}
							{me.videoBox(me.asyncAdbox('3'))}

							{me.videoBox(me.asyncAdbox('2'))}
							{me.videoBox(me.asyncAdbox('1'))}
							{me.videoBox(me.asyncAdbox('3'))}
							{me.videoBox(me.asyncAdbox('2'))}
							{me.videoBox(me.asyncAdbox('1'))}
							{me.videoBox(me.asyncAdbox('3'))}
							{me.videoBox(me.asyncAdbox('2'))}
							{me.videoBox(me.asyncAdbox('1'))}
							{me.videoBox(me.asyncAdbox('3'))*/}							
						</div>
					</div>
				</div>
			</div>
			</div>
			  
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
					<div className="row">
						{me.infoBox(me.asyncSalesForce(), {type: 'success'})}
					</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<div className="row ">
						<div className="col-sm-12 p-1">	
							<div className="border border-secondary bg-secondary 
									text-center align-bottom rounded p-1 m-1 mx-3" 
								style={{'height' : '2.25em', 'color' : '#fff'}}>
								&#169; {new Date().getFullYear()} Polo Alto Project
							</div>
						</div>
						</div>
					</div>
				</div>
			</div>
		</span>
          )
        }
})
