# star-wallpaper
基于lively壁纸引擎的星星壁纸

## 项目简介

这是一个基于Lively壁纸引擎的动态星空壁纸项目。通过HTML5 Canvas技术实现了一个充满动感和美感的星空效果，星星会闪烁、移动，并且会随着鼠标移动产生引力反应。

## 功能特性

- 动态星空效果：星星随机生成并持续运动
- 闪烁效果：每颗星星都有独立的闪烁动画
- 鼠标交互：星星会对鼠标位置产生引力反应
- 自适应尺寸：自动适配窗口大小变化
- 连线效果：近距离的星星之间会显示渐变透明度的连线

## 技术实现

- HTML5 Canvas：用于高性能的2D图形渲染
- JavaScript动画：requestAnimationFrame实现平滑动画
- 粒子系统：每颗星星都是一个具有生命期和物理属性的粒子
- 向量运算：实现星星的运动和引力效果
- 响应式设计：监听窗口大小变化并调整画布尺寸

## 使用说明

1. 确保已安装Lively壁纸引擎
2. 将本项目文件夹复制到Lively的壁纸目录
3. 在Lively客户端中选择该壁纸
4. 可以通过修改`project.json`调整壁纸设置

## 文件结构

- `index.html`：主页面文件
- `style.css`：样式表文件
- `script.js`：基础脚本（如窗口大小适配）
- `js/star-animation.js`：核心动画逻辑
- `project.json`：Lively壁纸配置文件

## 许可协议

本项目采用GNU General Public License v3.0许可，详情请参见LICENSE文件。
