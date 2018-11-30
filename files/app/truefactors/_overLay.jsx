var _overLay = React.createClass({
		    render : function () { 
			var me = this;
			var classType = (!me.props.setting || !me.props.setting.type) ? 'info' : me.props.setting.type;
			var shadow = (!me.props.setting || !me.props.setting.noshadow) ? ' shadow ' : '';
			var className = shadow + 
				   ((!me.props.setting || !me.props.setting.class) ? 
				    ('border border-' + classType + ' alert-' + classType) : me.props.setting.class + ' ') +
				    ((!me.props.setting || !me.props.setting.rounded) ? '' : ' rounded') +
				    ' p-2 m-1';
			var style = (!me.props.setting || !me.props.setting.style) ? {'min-height' : '2em'} : me.props.setting.style;
			return (
				<div className={className} style={style} >{me.props.data}
				    {/*(typeof me.props.data === 'string' && me.props.data !== '') ? (<span dangerouslySetInnerHTML={{__html: me.props.data}}/>)
				    : me.props.data*/}
				</div>                     
			)
		    }
		})
