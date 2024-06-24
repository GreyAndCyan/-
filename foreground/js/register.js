$(function () {
	$("form").on("submit", function (e) {
		e.preventDefault();

		// 验证表单字段
		const validationResult = validateFields();
		if (!validationResult.isValid) {
			return;
		}

		// 发送注册请求
		sendRegisterRequest(validationResult.data);
	});

	// 验证字段的函数
	function validateFields() {
		const username = $(".username").val()
		const password = $(".password").val()
		const rpassword = $(".rpassword").val()
		const nickname = $(".nickname").val()

		const usernameRegex = /^[a-z0-9]\w{3,11}$/;
		const passwordRegex = /\w{6,12}/;
		const nicknameRegex = /^[\u4e00-\u9fa5]{2,5}$/;

		// 验证用户名
		if (!usernameRegex.test(username)) {
			displayError("用户名格式错误。");
			return { isValid: false };
		}

		// 验证密码格式和一致性
		if (!passwordRegex.test(password)) {
			displayError("密码格式错误，密码必须为6-12位字母或数字。");
			return { isValid: false };
		}
		if (password !== rpassword) {
			displayError("两次密码不一致。");
			return { isValid: false };
		}

		// 验证昵称
		if (!nicknameRegex.test(nickname)) {
			displayError("昵称格式错误，昵称必须为2-5个中文字符。");
			return { isValid: false };
		}

		// 如果所有验证通过
		return { isValid: true, data: { username, password, rpassword, nickname } };
	}
	// 显示错误信息的函数
	function displayError(message) {
		$(".error").text(message).show();
	}

	// 发送注册请求的函数
	function sendRegisterRequest(data) {
		axios
			.post("http://localhost:9000/users/register", data)
			.then(function (response) {
				if (response.data.code === 1) {
					alert("注册成功，点击确定跳转到登录页面");
					window.location.href = "login.html";
				} else {
					alert("注册失败，请稍后重试");
				}
			})
			.catch(function (error) {
				console.error("注册失败:", error);
				alert("注册过程中发生错误");
			});
	}
});
