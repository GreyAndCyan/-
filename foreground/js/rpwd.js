$(function () {
	var id = localStorage.getItem("id");
	var token = localStorage.getItem("token");
	
	$("form").on("submit", function (e) {
		e.preventDefault(); // 阻止表单的默认提交行为

		// 获取表单数据
		var oldpassword = $(".oldpassword").val().trim();
		var newpassword = $(".newpassword").val().trim();
		var rnewpassword = $(".rnewpassword").val().trim();

		// 正则表达式验证密码
		const passwordRegex = /\w{6,12}/; // 密码必须为6-12位字母或数字
		var passwordsMatch = newpassword === rnewpassword;
		var validNewPassword = passwordRegex.test(newpassword);

		// 密码验证结果
		if (!validNewPassword) {
			alert("新密码格式错误，密码必须为6-12位字母或数字。");
			return false;
		}
		if (!passwordsMatch) {
			alert("两次输入的新密码不匹配。");
			return false;
		}

		// 如果校验通过，发送重置密码请求
		axios
			.post(
				`http://localhost:9000/users/rpwd`,
				{
					id: id,
					oldPassword: oldpassword,
					newPassword: newpassword,
					rNewPassword: rnewpassword,
				},
				{
					headers: {
						authorization: token,
					},
				}
			)
			.then(function (response) {
				if (response.data.code === 1) {
					alert(response.data.message); // 使用 alert 显示成功信息
					localStorage.clear(); // 从 localStorage 中移除用户信息
					window.location.href = "./login.html"; // 重定向到登录页面
				} else {
					alert(response.data.message); // 使用 alert 显示失败信息
				}
			})
			.catch(function (error) {
				console.error("请求失败:", error);
				alert("重置密码失败，请稍后再试。");
			});

		return false; // 阻止表单提交
	});
});
