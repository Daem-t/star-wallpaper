// 星空动画脚本
// 确保DOM加载完成后再执行脚本
window.addEventListener('DOMContentLoaded', function () {
    // 获取canvas元素
    const canvas = document.getElementById('starCanvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // 星空属性
    const stars = [];
    const numStars = 280;
    const maxLineDistance = 150; // 最大连线距离

    // 添加鼠标位置跟踪
    let mouseX = null;
    let mouseY = null;

    // 初始化鼠标监听器
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // 如果没有鼠标活动，保持mouseX和mouseY为null
    window.addEventListener('mouseout', () => {
        mouseX = null;
        mouseY = null;
    });

    // 初始化星星
    for (let i = 0; i < numStars; i++) {
        // 生成随机颜色
        const randomColor = {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        };

        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5, // x方向速度
            vy: (Math.random() - 0.5) * 0.5, // y方向速度
            radius: Math.random() * 2, // 半径大小
            alpha: Math.random() * 0.5 + 0.5, // 透明度
            twinkleTime: Math.random() * 1000 + 10 * 1000, // 闪烁时间
            twinkleSpeed: 0.05 + Math.random() * 0.2, // 闪烁速度（随机范围更大）
            twinkleScale: 0.3 + Math.random() * 0.1, // 闪烁幅度
            baseLifeTime: 600 + Math.random() * 1000, // 基础生命时间（至少10秒）
            lifeTime: 0, // 当前生命时间
            alive: true, // 是否存活
            fadeOut: false, // 是否正在淡出
            fadeAlpha: 1, // 淡出时的透明度
            respawnTime: 0, // 复活倒计时
            respawnDelay: 50 + Math.random() * 100, // 复活延迟时间
            color: randomColor // 随机颜色
        });

        // 初始化生命时间为基础生命时间
        stars[i].lifeTime = stars[i].baseLifeTime;
    }

    // 动画函数
    let time = 0; // 修复：添加let关键字声明变量
    function animate() {
        requestAnimationFrame(animate);

        // 清除画布
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);

        // 绘制和更新星星
        drawStars(ctx, stars);

        time += 0.01;
    }

    let drawStars = (ctx, stars) => {
        // 更新和绘制星星
        for (let star of stars) {
            // 如果星星不存在，则跳过
            if (!star.alive) {
                // 如果处于复活倒计时
                if (star.respawnTime > 0) {
                    star.respawnTime--;
                    continue;
                } else {
                    // 重置星星属性
                    star.x = Math.random() * width;
                    star.y = Math.random() * height;
                    star.vx = (Math.random() - 0.5) * 0.5;
                    star.vy = (Math.random() - 0.5) * 0.5;
                    star.radius = Math.random() * 2;
                    star.alpha = Math.random() * 0.5 + 0.5;
                    star.twinkleTime = Math.random() * 1000 + 10 * 1000; // 修复初始化
                    star.twinkleSpeed = 0.05 + Math.random() * 0.2;
                    star.twinkleScale = 0.3 + Math.random() * 0.1;
                    star.baseLifeTime = 600 + Math.random() * 1000;
                    star.lifeTime = star.baseLifeTime;
                    star.alive = true;
                    star.fadeOut = false;
                    star.fadeAlpha = 1;
                    star.respawnTime = 0;
                }
            }

            // 减少生命时间
            if (!star.fadeOut) {
                star.lifeTime--;

                // 如果生命结束，开始淡出
                if (star.lifeTime <= 0) {
                    star.fadeOut = true;
                }
            }

            // 计算闪烁效果
            star.twinkleTime += star.twinkleSpeed;
            const twinkleEffect = Math.sin(star.twinkleTime) * star.twinkleScale + (1 - star.twinkleScale) + 0.9; // 闪烁效果，范围在0.5到1之间

            // 更新透明度
            if (star.fadeOut) {
                star.fadeAlpha -= 0.01;
                if (star.fadeAlpha <= 0) {
                    star.fadeAlpha = 0;
                    star.alive = false;
                    star.respawnTime = star.respawnDelay;
                }
            }

            // 移动星星
            star.x += star.vx;
            star.y += star.vy;

            // 添加鼠标引力效果
            if (mouseX !== null && mouseY !== null) {
                const dx = star.x - mouseX;
                const dy = star.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // 如果在引力范围内
                if (dist < maxLineDistance) {
                    // 计算引力方向
                    const gravityStrength = 0.001 / (dist * 0.1 + 1); // 防止除以0，并让引力随距离增加而减弱
                    star.vx -= dx * gravityStrength;
                    star.vy -= dy * gravityStrength;
                }
            }

            // 屏幕环绕
            if (star.x < 0) star.x = width;
            if (star.x > width) star.x = 0;
            if (star.y < 0) star.y = height;
            if (star.y > height) star.y = 0;

            // 绘制连接线
            for (let otherStar of stars) {
                if (star.alive && otherStar.alive && star !== otherStar) {
                    const dx = star.x - otherStar.x;
                    const dy = star.y - otherStar.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxLineDistance) {
                        const opacity = 1 - dist / maxLineDistance;
                        const lineWidth = opacity;

                        ctx.beginPath();
                        ctx.moveTo(star.x, star.y);
                        ctx.lineTo(otherStar.x, otherStar.y);

                        const strokeColor = {
                            r: Math.floor(Math.random() * 256),
                            g: Math.floor(Math.random() * 256),
                            b: Math.floor(Math.random() * 256)
                        };
                        ctx.strokeStyle = `rgba(${strokeColor.r}, ${strokeColor.g}, ${strokeColor.b}, ${opacity})`;
                        ctx.lineWidth = lineWidth;
                        ctx.stroke();
                    }
                }
            }

            // 如果鼠标存在且与星星的距离小于最大连线距离，则绘制连接线
            if (mouseX !== null && mouseY !== null) {
                const dx = star.x - mouseX;
                const dy = star.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxLineDistance) {
                    const opacity = 1 - dist / maxLineDistance;

                    ctx.beginPath();
                    ctx.moveTo(star.x, star.y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = opacity * 0.5; // 线条略细一些
                    ctx.stroke();
                }
            }

            // 绘制星星
            if (star.alive) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius * twinkleEffect, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${star.alpha * star.fadeAlpha * twinkleEffect})`;
                ctx.fill();
            }
        }
    };

    // Start animation
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
});