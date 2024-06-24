$(function() {
	// 从localStorage获取goods的id
	const goodsId = localStorage.getItem('selectedProductId');

	// 检查goodsId是否存在
	if (!goodsId) {
			alert('商品ID未找到，请刷新页面或重新登录。');
			return;
	}

	// 使用axios发送GET请求获取商品详情
	axios.get(`http://localhost:9000/goods/item/${goodsId}`)
			.then(function(response) {
					// 检查响应码
					if (response.data.code === 1) {
							const goods = response.data.info;

							// 使用jQuery更新DOM元素
							$('.middleimg').attr('src', goods.img_big_logo);
							$('.title').text(goods.title);
							$('.old').text(goods.price || '未知'); 
							$('.discount').text(goods.sale_type || '无'); 
							$('.curPrice').text(goods.current_price);
							$('.desc').html(goods.goods_introduce || '暂无介绍'); // 假设goods_introduce是可选的
					} else {
							// 响应码不是1，显示错误信息
							showError(response.data.message);
					}
			})
			.catch(function(error) {
					// 请求失败，显示错误信息
					console.error('请求失败:', error);
					showError('请求商品详情失败，请稍后再试。');
			});

	function showError(message) {
			alert(message);
	}
});