import React from 'react';
import { connect } from 'react-redux';
const User = connect(state => state)(({
	style, 
	user, 
}) => (
	<div className="user box" style={style}>
		<span className="icon">
			<i className="fa fa-user"></i>
		</span>
		<span>
			{user}
		</span>
	</div>
));
export default User;