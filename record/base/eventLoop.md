<!-- # 事件循环：浏览器的核心机制 -->

🔄 事件循环（Event Loop）是浏览器的核心机制，它就像浏览器的"心脏"一样不断跳动，驱动着整个浏览器的运行。要深入理解这个重要机制，我们首先需要从浏览器的基础架构开始了解。

## 浏览器的进程模型

### 进程 (Process)

- 📦 **内存空间分配**
  - 每个程序运行都需要独立的内存空间
  - 可以将进程理解为一个独立的内存容器
- 🔒 **进程隔离**
  - 各个进程之间相互独立运行
  - 确保系统稳定性和安全性
- 🤝 **进程通信**
  - 进程间通信需要双方授权
  - 采用特定的通信机制

### 线程 (Thread)

- 🔄 **执行单元**
  - 负责代码的实际读取和执行
  - 是程序运行的最小单位
- ⚡ **进程与线程**
  - 每个进程必须包含至少一个线程
  - 线程依附于进程存在
- 🎯 **主线程**

  - 随进程启动而创建的第一个线程
  - 主线程结束会导致其他线程终止

## 🌐 浏览器的多进程架构

浏览器是一个复杂的多进程多线程应用程序。为了提升稳定性和安全性，现代浏览器采用多进程架构，有效防止单个页面的崩溃影响整个浏览器的运行。

### 🔍 核心进程概览

在任务管理器中，我们可以清晰地看到浏览器的主要进程构成：

#### 1. 🎯 浏览器进程（Browser Process）

- 界面渲染：管理浏览器窗口、标签页标题、工具栏等 UI 元素
- 用户交互：处理点击、滚动、键盘等输入事件
- 进程调度：统筹管理其他子进程的运行

#### 2. 🌐 网络进程（Network Process）

- 负责所有网络资源的加载
- 维护多个线程以并行处理网络请求
- 实现安全连接和数据传输

#### 3. 🎨 渲染进程（Renderer Process）

每个标签页独立运行一个渲染进程，其核心是渲染主线程，主要职责包括：

##### 渲染主线程任务清单：

- 📝 HTML 解析与 DOM 树构建
- 🎨 CSS 解析与样式计算
- 📐 页面布局计算（Layout）
  - 精确计算每个元素的位置和尺寸
- 🗺️ 图层处理（Layer）
  - 处理 z-index 等层叠上下文
- 🎬 页面渲染（60FPS）
- 🔄 JavaScript 相关任务
  - 执行全局 JavaScript 代码
  - 处理各类事件回调
  - 运行定时器函数

### ⚙️ 任务调度机制

面对如此多样的任务，自然会产生两个关键问题：

1. 为什么不采用多线程并行处理？
2. 如何有效调度这些任务？

浏览器采用了一个优雅的解决方案：**事件循环（Event Loop）机制**

#### 事件循环的工作流程：

1. 🔄 渲染主线程启动后进入永久循环状态
2. 📥 持续检查消息队列：
   - 有任务：取出首个任务执行，完成后进入下一轮循环
   - 无任务：进入休眠状态，等待新任务
3. 📤 其他线程可以随时向消息队列添加任务

这种基于消息队列的任务调度机制，就是著名的 **事件循环（Event Loop）**

## 🔄 异步任务的产生及处理

在代码执行的过程中，我们经常会遇到一些无法立即处理的任务：

⏰ **定时任务**

- 需要等待特定时间后执行的计时器回调
- setTimeout/setInterval 等定时器操作

🌐 **网络请求**

- AJAX 数据获取
- WebSocket 实时通信
- 文件上传下载

👆 **用户交互**

- 点击事件处理
- 表单提交
- 键盘输入响应

如果让渲染主线程同步等待这些任务完成，将会导致以下问题：

- ⚠️ 线程长期处于**阻塞**状态
- 🚫 页面失去响应能力
- ❌ 浏览器出现**假死**现象

### 🚀 异步任务处理机制

为了优雅地解决这个问题，浏览器引入了强大的**异步任务处理机制**：

1. 🔄 **任务委派**

   - 将耗时操作交由专门的工作线程处理
   - 主线程无需等待，继续执行后续代码

2. 📬 **回调管理**

   - 预先设置的回调函数被精心包装
   - 任务完成后自动加入消息队列末尾

3. ⚡ **高效调度**
   - 主线程通过事件循环机制
   - 按序处理队列中的回调任务

这种精妙的设计让浏览器始终保持响应，确保了单线程模型下的流畅用户体验。🎯

## 🔄 事件循环的本质

### 💡 核心定义

事件循环（Event Loop）是浏览器渲染主线程的核心工作机制，它通过精密的任务调度系统来保证页面的流畅运行。

### ⚙️ 运行机制

就像一个永不停歇的工作者，事件循环不断地：

1. 📥 从消息队列中获取首个待处理任务
2. ⚡ 执行当前任务直至完成
3. 🔄 等待其他线程在适当时机添加新任务到队列末尾

### 🎯 任务队列的演进

#### 过去的简单模型

- 宏队列（Macrotask Queue）
- 微队列（Microtask Queue）

#### 现代的复杂架构

根据 W3C 规范的最新定义：

- 📦 **任务分类**：每种任务都有其特定类型
- 🗂️ **队列管理**：同类型任务必须在同一队列中处理
- ⚡ **优先级系统**：不同队列拥有不同的处理优先级
- 🔝 **微任务特权**：微任务队列始终保持最高优先级，确保优先执行
