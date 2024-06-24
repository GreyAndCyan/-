$(function () {
	const id = localStorage.getItem("id");
	const token = localStorage.getItem("token");
	axios
		.get(`http://localhost:9000/users/info?id=${id}`, {
			headers: { authorization: token },
		})
		.then(res => {
			if (res.data.code === 1) {
				$(".username").val(res.data.user.username);
				$(".age").val(res.data.user.age);
				$(".gender").val(res.data.user.gender);
				$(".nickname").val(res.data.user.nickname);
			}
		});

	$("form").on("submit", function (e) {
		e.preventDefault(); // 阻止表单的默认提交行为

		// 正则表达式验证密码和昵称
		const nicknameRegex = /^[\u4e00-\u9fa5]{2,5}$/; // 昵称必须为2-5个中文字符

		// 获取表单数
		var age = $(".age").val().trim();
		var gender = $(".gender").val().trim();
		var nickname = $(".nickname").val().trim();

		// 密码和昵称验证结果
		let nicknameValid = nicknameRegex.test(nickname);

		if (!nicknameValid) {
			alert("昵称格式错误，昵称必须为2-5个中文字符。");
			return false; // 终止表单提交
		}

		// 如果校验通过，发送更新请求
		axios
			.post(
				"http://localhost:9000/users/update",
				{
					id: id,
					age: age,
					gender: gender,
					nickname: nickname,
				},
				{
					headers: {
						authorization: token,
					},
				}
			)
			.then(function (response) {
				if (response.data.code === 1) {
					// 更新成功，使用 localStorage 存储新的昵称
					localStorage.setItem("nickname", response.data.user.nickname);
					alert(response.data.message); // 使用 alert 显示成功信息
				} else {
					alert(response.data.message); // 使用 alert 显示失败信息
				}
			})
			.catch(function (error) {
				console.error("请求失败:", error);
				alert("更新用户信息失败，请稍后再试。");
			});

		return false; // 阻止表单提交
	});
});
