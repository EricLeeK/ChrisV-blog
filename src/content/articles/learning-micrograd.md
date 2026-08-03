---
title: "反向传播到底是怎么运作的"
description: "用可视化方式走进 micrograd —— Karpathy 那个只有 150 行的自动求导引擎。没有矩阵，只有标量、一张计算图，以及你已经会用的链式法则。"
date: 2026-08-03
category: "AI 理论"
tags: ["深度学习", "反向传播", "自动求导", "micrograd", "可视化"]
cover: "/images/learning-micrograd-cover.png"
externalUrl: "/lectures/micrograd/learn.html"
---

《反向传播到底是怎么运作的》交互式教学页面，基于 Andrej Karpathy 的 micrograd，用一个贯穿全文的例子 `e = (a+b)·(a·b)` 逐步演示前向传播、局部梯度、`+=` 累加与拓扑排序，并可亲手一步步触发反向传播动画。
