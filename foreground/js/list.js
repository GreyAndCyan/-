$(function () {
	// 初始化获取商品分类
	fetchCategories();

	// 获取商品分类并显示
	function fetchCategories() {
		axios.get("http://localhost:9000/goods/category").then(function (res) {
			if (res.data.code === 1) {
				let categoriesHtml = '<li class="active">全部</li>'; // 添加"全部"选项
				res.data.list.forEach(function (item) {
					categoriesHtml += `<li>${item}</li>`;
				});
				$(".category").html(categoriesHtml);
			} else {
				alert(res.data.message); // 使用alert显示消息
			}
		});
	}

	// 初始化参数
	let params = {
		current: 1,
		pagesize: 12,
		category: '',
		filter: '',
		saleType: 10,
		sortType: 'id',
		sortMethod: 'ASC',
		search: ''
	};

	// 绑定点击事件
	$('.category').on('click', 'li', function () {
		$('.category li').removeClass('active');
		$(this).addClass('active');
		params.category = $(this).text();
		if (params.category === '全部') {
			params.category = '';
		}
		params.current = 1;
		loadGoodsList();
	});

	// 加载商品列表
	function loadGoodsList() {
		axios.get("http://localhost:9000/goods/list", { params: params }).then(function (res) {
			if (res.data.code === 1) {
				let productsHtml = '';
				res.data.list.forEach(function (product) {
					productsHtml += `
											<li data-id="${product.goods_id}">
													<div class="show">
															<img src="${product.img_big_logo}">
															${product.is_hot ? `<span class="hot">热销</span>` : ''}
															${product.is_sale ? `<span>折扣</span>` : ''}
													</div>
													<div class="info">
															<p class="title">${product.title}</p>
															<p class="price">
																	<span class="curr">¥ ${product.current_price}</span>
																	<span class="old">¥ ${product.price}</span>
															</p>
													</div>
											</li>
									`;
				});
				$('.list.container').html(productsHtml);
				$('.total').text(`第 ${params.current} 页 / 共 ${res.data.total} 页`);
				totalPage = res.data.total;
				firstDisable()
				lastDisable()
			} else {
				alert(res.data.message);
			}
		});
	}

	// 为.saleBox内的li元素绑定点击事件
	$(".saleBox li").on("click", function () {
		$(".saleBox li").removeClass("active");
		$(this).addClass("active");
		params.saleType = $(this).data("type");
		params.current = 1;
		loadGoodsList();
	});

	// 为.hotBox内的li元素绑定点击事件
	$(".hotBox li").on("click", function () {
		$(".hotBox li").removeClass("active");
		$(this).addClass("active");
		params.filter = $(this).data("type");
		params.current = 1;
		loadGoodsList();
	});

	// 为.sortBox内的li元素绑定点击事件
	$(".sortBox li").on("click", function () {
		$(".sortBox li").removeClass("active");
		$(this).addClass("active");
		params.sortType = $(this).data("type");
		params.sortMethod = $(this).data("method");
		params.current = 1;
		loadGoodsList();
	});

	// 搜索框事件
	$(".search").on("blur", function () {
		params.search = $(this).val();
		loadGoodsList();
	});

	// 跳转按钮
	$('.go').on('click', function () {
		let pageNum = parseInt($('.jump').val(), 10);
		if (!isNaN(pageNum)) {
			params.current = pageNum;
			loadGoodsList();
		} else {
			alert('请输入有效的页码');
		}
	});

	// 每页显示数量变更
	$('.pagesize').on('click', function () {
		params.pagesize = parseInt($(this).val(), 10);
		params.current = 1;
		loadGoodsList();
	});

	// 上一页和下一页
	$('.prev, .next').on('click', function () {
		let pageNum = params.current + ($(this).hasClass('next') ? 1 : -1);
		if (pageNum > 0) {
			params.current = pageNum;
			loadGoodsList();
		} else {
			alert('已经是第一页');
		}
	});


	$(".first").on("click", function () {
		params.current = 1;
		loadGoodsList();
		$(this).addClass("disable");
	});

	$(".last").on("click", function () {
		params.current = totalPage;
		loadGoodsList();
		$(this).addClass("disable");
	});

	// 初始加载商品列表
	loadGoodsList();

	// 商品详情点击事件
	$('.list.container').on('click', 'li', function () {
		let id = $(this).data('id');
		localStorage.setItem('selectedProductId', id); // 存储商品ID到localStorage
		window.location.href = './detail.html';
	});

	function firstDisable() {
		if (params.current === 1) {
			$(".first").addClass("disable");
			$('.prev').addClass('disable')
		} else {
			$(".first").removeClass("disable");
			$('.prev').removeClass('disable')
		}
	}

	function lastDisable() {
		if (params.current !== totalPage) {
			$(".last").removeClass("disable");
			$(".next").removeClass("disable");
		} else {
			$(".last").addClass("disable");
			$(".next").addClass("disable");
		}
	}
});