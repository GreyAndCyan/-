$(function () {
	const nickname = localStorage.getItem("nickname");

	// 切换开关状态
	const switchClass = !nickname ? "off" : "on";
	$("." + switchClass)
		.addClass("active")
		.siblings()
		.removeClass("active");

	// 显示昵称
	if (nickname) {
		$(".nickname").text(nickname);
	}

	axios.get("http://localhost:9000/carousel/list").then(response => {
		const images = response.data.list
			.map(item => `<div><img src="http://localhost:9000/${item.name}"></div>`)
			.join("");
		const carouselHtml = `<div carousel-item>${images}</div>`;

		$("#carousel").html(carouselHtml);

		layui.carousel.render({
			elem: "#carousel",
			width: "1200px",
			height: "600px",
			arrow: "hover",
			anim: "fade",
		});
	});

	// 自定义页面跳转
	$(".self").on("click", function () {
		window.location.href = "./self.html";
	});

	// 登出功能
	$(".logout").on("click", function () {
		const userId = localStorage.getItem("id");
		const token = localStorage.getItem("token");
		axios
			.get(`http://localhost:9000/users/logout?id=${userId}`, {
				headers: {
					Authorization: token,
				},
			})
			.then(logoutResponse => {
				if (logoutResponse.data.code === 1) {
					// 清空localStorage中的user数据
					localStorage.clear();
					window.location.href = "./index.html";
				}
			});
	});
});
