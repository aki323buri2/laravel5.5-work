<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Main</title>
	<link rel="stylesheet" href="{{ url('/css/main.css') }}">
</head>
<body>
	<nav class="navbar">
		<div class="container">
			<div class="navbar-brand">
				<span class="icon"><i class="fa fa-home"></i></span>
				<span>めいん</span>
				<a class="button navbar-burger">
					<span></span>
					<span></span>
					<span></span>
				</a>
			</div>
			<div class="navbar-menu">
				<div class="navbar-end">
					<a class="navbar-item">
						<span class="icon" style="color:#333333"><i class="fa fa-github"></i></span>
					</a>
					<a class="navbar-item">
						<span class="icon" style="color:#55acee"><i class="fa fa-twitter"></i></span>
					</a>
					<div class="navbar-item">
						<div class="field is-grouped">
							<p class="control"><a class="button is-info">
								<span class="icon"><i class="fa fa-twitter"></i></span>
								<span>Tweet</span>
							</a></p>
							<p class="control"><a class="button is-primary">
								<span class="icon"><i class="fa fa-download"></i></span>
								<span>Download</span>
							</a></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<div>&nbsp;</div>

	<div class="container">
		<div id="app"></div>
		<div id="err"></div>
	</div>
	
	<script>
		var burger = document.querySelector('.navbar-burger');
		var menu   = document.querySelector('.navbar-menu');
		burger.addEventListener('click', function (e)
		{
			burger.classList.toggle('is-active');
			menu  .classList.toggle('is-active');
		});
	</script>
	<script src="{{ url('/js/main.js') }}"></script>
</body>
</html>