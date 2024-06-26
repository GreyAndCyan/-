以太坊前端开发实验报告
前端开发的代码在原有的静态页面加了与服务器的交互功能，引用了server的api文档进行开发。


主要文件说明
detail.js

detail.js用于处理和展示商品的详细页面。它负责从服务器获取特定商品的详细信息，并在用户界面上展示这些信息。

获取商品ID: 从浏览器的 localStorage 中获取用户通过点击操作传递过来的商品ID。
检查商品ID: 验证商品ID是否存在，如果不存在则提示用户并退出操作。
发送请求: 使用 axios 库向服务器发送一个GET请求，获取特定商品ID的详细信息。
响应处理: 根据服务器的响应状态，更新页面上的DOM元素以展示商品的图片、标题、价格、折扣类型、当前价格和商品介绍。
错误处理: 如果请求失败或服务器返回错误状态，通过弹窗向用户显示错误信息。


detail.js


index.js用于增强首页的交互性，包括用户登录状态的显示、轮播图的初始化和页面的一些交互逻辑。
用户登录状态检测: 通过检查 localStorage 中的 nickname 来确定用户是否已经登录，并据此显示或隐藏特定的 UI 元素。
轮播图初始化: 使用 axios 获取轮播图数据，并使用 layui 插件来渲染轮播图。
页面跳转: 为页面上的特定元素绑定点击事件，实现点击跳转到其他页面的功能。
用户登出: 提供登出功能，清除 localStorage 中的用户信息，并重定向到首页。


list.js

list.js负责管理商品列表页面的逻辑，包括商品的分类筛选、排序、分页以及列表的动态加载。
商品分类获取: 从服务器获取商品分类，并在页面上展示供用户选择。
商品列表加载: 根据用户选择的分类、筛选条件、排序方式和分页信息，动态加载商品列表。
分页控制: 提供用户界面上的分页按钮，允许用户在不同页面间导航。
筛选和排序: 允许用户根据销售类型、是否热销、价格等条件筛选商品，以及按照不同的方式排序。
搜索功能: 用户可以通过搜索框输入关键词来搜索商品。

login.js

login.js用于处理用户登录的逻辑。它负责收集用户输入的登录凭证，与服务器进行通信，并根据响应更新用户界面。
表单验证: 检查用户输入的用户名和密码是否符合正则表达式的格式要求。
登录请求: 通过 axios 发送 POST 请求到服务器，包含用户名和密码。
响应处理: 根据服务器的响应，更新 localStorage 并处理登录成功或失败的逻辑。
错误显示: 如果登录失败，显示错误信息给用户。

5.register.html

register.js



register.js用于处理新用户注册的前端逻辑。它负责验证用户输入的注册信息，与服务器通信，并处理注册结果。
表单验证: 对用户输入的用户名、密码、重复密码和昵称进行格式和逻辑验证。
数据收集: 收集用户在注册表单中输入的信息。
注册请求: 通过 axios 发送 POST 请求到服务器，提交用户注册信息。
响应处理: 根据服务器的响应，给出注册成功或失败的反馈。
错误提示: 如果注册过程中出现错误，向用户显示相应的错误信息。


rpwd.js

rpwd.js用于处理用户密码重置的前端逻辑。它允许已登录的用户更改自己的密码，并通过与服务器的通信来完成密码更新。
密码验证: 验证用户输入的旧密码和两次新密码是否符合格式要求，并检查两次新密码是否一致。
数据收集: 收集用户输入的旧密码和新密码。
密码重置请求: 通过 axios 发送 POST 请求到服务器，提交密码更新信息。
响应处理: 根据服务器的响应，给出密码重置成功或失败的反馈。
用户重定向: 如果密码重置成功，清除用户在 localStorage 中的登录信息，并将用户重定向到登录页面。


self.js

self.js用于处理用户个人中心页面的逻辑。它允许用户查看和更新自己的个人信息，如昵称、年龄和性别。
个人信息加载: 在页面加载时，从服务器获取当前用户的个人信息并显示在表单中。
表单验证: 对用户输入的新昵称进行格式验证，确保昵称符合规定的格式。
信息更新请求: 当用户提交表单时，通过 axios 发送 POST 请求到服务器，提交更新的个人信息。
响应处理: 根据服务器的响应，给出信息更新成功或失败的反馈。
用户信息同步: 如果信息更新成功，更新 localStorage 中的用户昵称。
