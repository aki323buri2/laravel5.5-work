import React from 'react';
import { render } from 'react-dom';
import { saga, createApp } from './saga';
import Float from './float';
import User from './user';
import Terminal from './terminal';
global.debug = true;
Promise.resolve().then(e =>
{
	const app = createApp(App);
	render(app, document.querySelector('#app'));
	app.run(saga);
})
.catch(e =>
{
	render(<div className="err">{e.toString()}</div>, document.querySelector('#err'));
	console.error(e);
});
const App = ({
}) => (
	<div className="app">
		<Float style={{ left: 10, top: 10 }}>
			<User/>
		</Float>
		<Float style={{ left: 200, top: 80 }}>
			<Terminal/>
		</Float>
	</div>
);