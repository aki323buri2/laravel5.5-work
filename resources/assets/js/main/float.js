import React from 'react';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';
export default class Float extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			style: {
				position: 'fixed', 
				zIndex: 100, 
				...this.props.style, 
			}, 
		};
	}
	render = () =>
	{
		return React.cloneElement(React.Children.only(this.props.children), {
			style: {
				...this.state.style, 
			}, 
		});
	}
	dom = () =>
	{
		return findDOMNode(this);
	}
	componentDidMount = () =>
	{
		this.handle = this.dom().querySelector(this.props.handle||'.handle')||this.dom();
		this.handle.style.cursor = 'pointer';
		this.dom().on(events.start, this.start, true);
		document.on(events.end, this.end, true);
	}
	componentWillUnmount = () =>
	{
		this.dom().off(events.start, this.start, true);
		document.off(events.end, this.end, true);
		document.off(events.move, this.move, true);
	}
	start = e =>
	{

		const { clientX: x, clientY: y } = e.touch ? e.touch[0] : e;
		if (!this.handle.hittest(x, y)) return;
		e.preventDefault();
		this.from = { x, y };
		document.on(events.move, this.move, true);
	}
	end = e =>
	{
		document.off(events.move, this.move, true);
		this.dom().style[`${vendor}Transform`] = `translate3d(0,0,0)`;
		if (!this.from) return;
		if (!this.delta) return;
		const { style } = this.state;
		if (style.right  !== undefined) style.right  -= this.delta.x;
		if (style.bottom !== undefined) style.bottom -= this.delta.y;
		if (style.right  === undefined) style.left = (style.left||0) + this.delta.x;
		if (style.bottom === undefined) style.top  = (style.top ||0) + this.delta.y;
		this.setState({ style });
		this.from = null;
		this.delta = null;
	}
	move = e =>
	{
		if (!this.from) return;
		const { clientX: x, clientY: y } = e.touch ? e.touch[0] : e;
		this.delta = { x, y };
		this.delta.x -= this.from.x;
		this.delta.y -= this.from.y;
		this.dom().style[`${vendor}Transform`] = `translate3d(
			${this.delta.x}px, 
			${this.delta.y}px, 
			0)`;
	}
};
const vendor = window.navigator.userAgent.match(/msie/i) ? 'ms' : 'webkit';
const events = {
	start: [
		"mousedown", 
		"touchstart", 
	], 
	end: [
		"mouseup", 
		"touchend", 
		"touchcancel", 
	], 
	move: [
		"mousemove", 
		"touchmove", 
	], 
};

Node.prototype.on = function (e, handler)
{
	_.castArray(e).every(e => this.addEventListener(e, handler));
};
Node.prototype.off = function (e, handler)
{
	_.castArray(e).every(e => this.removeEventListener(e, handler));
};
Node.prototype.hittest = function (x, y)
{
	return (r => 
		_.inRange(x, r.left, r.right) && 
		_.inRange(y, r.top, r.bottom)
		)(this.getBoundingClientRect());
};