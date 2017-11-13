import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';
const Terminal = connect(state => state)(({
	style, 
}) => (
	<div className="terminal message" style={style}>
		<Handle/>
		<Body/>
	</div>
));
export default Terminal;
const Handle = connect(state => state)(({
	connecting, 
	connected, 
}) => (
	<div className="handle message-header">
		<p>
			<span className="icon">
				<i className="fa fa-arrows"></i>
			</span>
			<span>
				Terminal
			</span>
		</p>

		<p>
			<Icon fa={connecting ? 'circle-o-notch spin' : 'commenting-o'}/>
			<Icon fa={connected ? 'feed' : 'exclamation'}/>
		</p>

	</div>
));
const Body = ({
}) => (
	<div className="body message-body">

		<Buttons/>
		
		<Messages/>

	</div>
);
const Icon = ({
	fa, 
}) => (
	<span className="icon-item icon">
		<i className={classnames('fa', _.split(fa, ' ').map(fa => `fa-${fa}`))}></i>
	</span>
);
const Buttons = connect(state => state)(({
	connecting, 
	connected, 
}) => (
	<div className="buttons field">
		<Button fa="play-circle-o"/>
		<Button fa="ban"/>
	</div>
));
const Button = ({
	fa, 
}) => (
	<p className="control">
		<a className="button">
			<span className="icon">
				<i className={classnames('fa', _.split(fa, ' ').map(fa => `fa-${fa}`))}></i>
			</span>
		</a>
	</p>
);
const Messages = connect(state => state)(({
	messages, 
}) => (
	<div className="box" style={{
		overflow: 'scroll', 
		width: 500, 
		height: 300, 
	}}>
	{(messages||[]).map((message, key) => 
		<Message key={key} message={message}/>
	)}
	</div>
));
const Message = class extends React.Component
{
	componentDidMount = () =>
	{
		findDOMNode(this).acrollIntoView();
	}
	render = () =>
	{
		return (
			<div className="message-item">
				{this.props.message}
			</div>
		);
	}
};