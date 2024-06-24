$(function() {
	// 预先定义的正则表达式
	var usernameRegex = /^[a-z0-9]\w{3,11}$/;
	var passwordRegex = /\w{6,12}/;

	$('form').on('submit', function(e) {
			e.preventDefault(); // 阻止表单默认提交行为

			var isValid = true; // 假设表单验证通过
			var username = $('input[name="username"]').val();
			var password = $('input[name="password"]').val();

			// 清空之前的错误信息
			$('.error').text('');

			// 校验用户名
			if (!username) {
					displayError('用户名不能为空');
					isValid = false;
			} else if (!usernameRegex.test(username)) {
					displayError('用户名格式错误');
					isValid = false;
			}

			// 如果用户名验证失败，则不再继续校验密码
			if (!isValid) {
					return;
			}

			// 校验密码
			if (!password) {
					displayError('密码不能为空');
					return;
			} else if (!passwordRegex.test(password)) {
					displayError('密码格式错误，必须为6-12位字母或数字。');
					return;
			}

			// 如果校验通过，发送登录请求
			axios.post('http://localhost:9000/users/login', {
					username: username,
					password: password
			})
			.then(function(response) {
					if (response.data.code === 1) {
							// 登录成功，保存用户信息到localStorage
							localStorage.setItem('nickname', response.data.user.nickname);
							localStorage.setItem('id', response.data.user.id);
							localStorage.setItem('token', response.data.token);
							// 跳转到首页
							window.location.href = './index.html';
					} else {
							// 登录失败，显示错误信息
							displayError(response.data.message);
					}
			})
			.catch(function(error) {
					// 网络或其他错误，显示错误信息
					displayError('登录失败，请检查网络或稍后再试。');
			});
	});

	// 显示第一个错误信息的函数
	function displayError(message) {
			$('.error').text(message).show(); // 显示错误信息
	}
});