---
name: plan-first
description: 先写计划再动手：把功能/页面/脚本需求拆成可直接执行的结构化计划，简单需求写完计划立即执行。
whenToUse: 当用户要求写代码、做页面、写脚本、跑实验、实现功能，或明确要求先出计划时使用。触发本技能即进入「先规划、再执行」模式。
disable-model-invocation: false
user-invocable: true
---

# 先写计划

> 我在使用 plan-first 技能生成实现计划。

---

## 输出格式：照抄下面的结构，不要改动

计划文档**必须**是下面这个形状。`#` 标题、`**目标：**`、`**架构：**`、`**技术栈：**` 四行，然后一条 `---`，然后一个 `## 任务 1`。

**不要**在标题和 `**目标：**` 之间插入任何引用块、banner、说明段落。文档的第二个非空行必须是 `**目标：**`。

````markdown
# [功能名] 实现计划

**目标：** 一句话说明要做什么。

**架构：** 一句话说明实现思路。

**技术栈：** HTML5 + CSS

---

## 任务 1: [任务名]

**文件：** 新建 `index.html`

- [ ] **步骤 1: 创建 `index.html`**

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hello World</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: system-ui, "Microsoft YaHei", sans-serif;
    }
  </style>
</head>
<body>
  <p>hello world</p>
</body>
</html>
```

- [ ] **步骤 2: 浏览器打开确认**

双击 `index.html`，预期页面正中央显示 `hello world`。

---

**自检：** 需求已覆盖；无占位符；路径与文件名一致。
````

**整份计划就这么多，约 20 行。写完后立刻创建文件，然后一句话报告结果 —— 不要停下来问。**

---

## 需求级别

| 级别 | 判断标准 | 计划长度 | 执行 |
|---|---|---|---|
| **简单** | 单文件、无外部依赖、无逻辑分支 | **15–30 行，1 个任务** | 写完立刻执行 |
| **中等** | 2–5 个文件，模块清晰 | 40–80 行，2–4 个任务 | 写完立刻执行 |
| **复杂** | 多模块协同、训练实验、重构 | 按需 | 保存后给选择 |

**绝大多数请求是简单级。拿不准就按简单处理。**

中等和复杂需求仍然沿用上面的四行头部，只是任务数增加、每个任务可以有多个步骤。复杂需求保存后才给执行选择：

> **计划已保存到 `docs/superpowers/plans/<filename>.md`。两种执行方式：**
>
> 1. **子代理驱动（推荐）** —— 每个任务派一个子代理独立执行
> 2. **当前会话执行** —— 在当前会话中逐步执行，每步有检查点
>
> **选哪种？**

---

## 写文件的规则

- 路径：`docs/superpowers/plans/<今天日期>-<feature-name>.md`
- 日期取**当天真实日期**（`Get-Date` / `date`），不写 `2025-01-XX`、`YYYY-MM-DD` 这类占位符。
- `<feature-name>` 用英文短横线小写，如 `world1-hello-world`。
- 叙述语言与用户提问语言一致；只有代码、路径、命令、API 名不翻译。

---

## 禁止清单

简单需求**不许**出现：

- 多个任务
- 测试文件、验收脚本、截图度量
- `git init`、`.gitignore`、提交步骤
- 「前置说明」「File Structure 表」「职责边界表」「Self-Review 表格」
- 文档开头的引用块 banner
- 结尾反问「要我现在执行吗」「你选哪种」

**TDD 只用于有可测逻辑的场景**（函数、API、数据转换、状态机、业务规则）。静态 HTML/CSS 页面、配置、文案改动**不要**写测试。

**判断标准：用户一句话能说清的需求，计划不该超过一屏。**
