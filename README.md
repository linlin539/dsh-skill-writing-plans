# dsh-skill-writing-plans

[![npm version](https://img.shields.io/npm/v/dsh-skill-writing-plans?color=blue)](https://www.npmjs.com/package/dsh-skill-writing-plans)
[![npm downloads](https://img.shields.io/npm/dm/dsh-skill-writing-plans)](https://www.npmjs.com/package/dsh-skill-writing-plans)
[![license](https://img.shields.io/npm/l/dsh-skill-writing-plans)](LICENSE)

**给 DeepSeek Harness 加上「先写计划，再动手」的习惯。**

装上这个插件，Agent 在接到任何写代码、做页面、跑实验的请求时，会先产出一份结构化的实现计划，再开始动手——而不是直接埋头写代码。

> A DeepSeek Harness skill plugin that adds the `writing-plans` skill: the agent writes a structured implementation plan before coding, executes simple tasks inline, and offers an execution choice for complex work.

---

## 它为你做什么

| | |
|---|---|
| **不用提醒它做计划** | 只要请求涉及写代码、做页面、跑实验，Agent 会自己先规划 |
| **计划有固定去处** | 总是写到 `docs/superpowers/plans/YYYY-MM-DD-<功能名>.md`，方便你回看和归档 |
| **小事不啰嗦** | 只写一个 `index.html` 这种单步任务，Agent 直接做完，不会拿"要选哪种执行方式"来烦你 |
| **大事给你选择权** | 多文件、多任务、训练类需求，保存计划后会问你是派子代理并行执行，还是当前会话里逐步执行 |
| **计划能直接照着做** | 每个任务都有具体文件路径、完整代码、可执行命令和预期结果，没有 `TBD`、`TODO`、"稍后实现"这类占位 |

---

## 安装

### 从 npm 安装（推荐）

[![npm](https://img.shields.io/npm/v/dsh-skill-writing-plans)](https://www.npmjs.com/package/dsh-skill-writing-plans)

```bash
npm install dsh-skill-writing-plans
```

或在 DSH 里直接装：

```bash
dsh plugin add dsh-skill-writing-plans@0.1.2
```

> **DSH 桌面客户端用户请用这一种。** 桌面客户端的安装边界只接受已发布到 npm 的包，纯 GitHub 源的插件在桌面端装不了。

### 从插件市场安装

1. 打开 DeepSeek Harness → 插件市场
2. 搜索 `writing-plans` 或 `dsh-skill-writing-plans`
3. 点击安装，按提示重启 DSH

市场条目收录后即可搜到；收录前请用上面的 npm 方式。

### 从 GitHub 源码安装（仅普通 dsh web / CLI）

```bash
git clone https://github.com/linlin539/dsh-skill-writing-plans.git
```

然后在你使用的 DSH profile 目录下，把仓库放到 `packages/dsh-skill-writing-plans`，并在 profile 的 `package.json` 里加一行依赖：

```json
{
  "dependencies": {
    "dsh-skill-writing-plans": "link:packages\\dsh-skill-writing-plans"
  }
}
```

再在 profile 的 `cordis.patch.yml` 末尾加上：

```yaml
- insert:
    - id: skill-writing-plans
      name: dsh-skill-writing-plans
```

重启 DeepSeek Harness 即可生效。

### 只想用技能文件

不想装插件的话，把 `assets/writing-plans/SKILL.md` 放到下面任一位置也可以：

- 项目级：`{你的项目}/.dsh/skills/writing-plans/SKILL.md`
- 用户级：`{DSH_HOME}/skills/writing-plans/SKILL.md`

---

## 用起来是什么样

### 简单需求：直接做完

你说：

```text
帮我写一个 index.html，页面中央显示 'Hello World'
```

Agent 会：

1. 声明正在使用 `writing-plans` 技能
2. 快速看一眼当前工作区
3. 把计划写到 `docs/superpowers/plans/2026-10-17-hello-world-page.md`
4. 因为只有单一步骤，直接创建 `index.html`，不问你任何问题
5. 告诉你做完了，以及计划文件在哪

### 复杂需求：让你选怎么执行

你说：

```text
帮我实现一个学生信息管理系统，包含增删改查和数据库
```

Agent 会先把完整计划写好并保存，然后问你：

> **Plan saved to `docs/superpowers/plans/2026-10-17-student-management-system.md`. Two execution options:**
>
> 1. **Subagent-Driven（推荐）** — 每个任务派一个子代理独立执行
> 2. **Inline Execution** — 在当前会话中逐步执行，每步有检查点
>
> **Which approach?**

### 只想看计划

```text
只出计划，先不要写代码
```

Agent 就只保存计划文档，不动任何代码。

---

## 计划文档长什么样

````markdown
# Hello World 页面 Implementation Plan

**Goal:** 交付一个静态页面，在浏览器视口正中央显示 `Hello World`。

**Architecture:** 单文件纯静态实现，用 Flexbox 在 `body` 上做双向居中。

**Tech Stack:** HTML5 + CSS3

---

## Task 1: 创建居中的 Hello World 页面

**Files:**
- Create: `index.html`
- Modify: 无
- Test: 无

- [ ] **Step 1: 写入 `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Hello World</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

- [ ] **Step 2: 在浏览器中打开验证**

Run: 双击 `index.html`
Expected: 页面正中央显示 `Hello World`

---

## Self-Review

1. 需求覆盖：文件名与居中显示均已覆盖。
2. 无占位内容。
3. 路径与文件名前后一致。
````

---

## 常见问题

**装完之后在 DSH 主界面没看到这个插件？**

这是正常的。本插件只往 Host 侧注册技能，不带任何界面组件，所以不会出现在主插件列表里。可以在插件市场的已安装列表中确认，或查看 DSH 日志。

**DSH 桌面客户端从 GitHub 源装不了？**

桌面客户端的安装边界只接受已发布到 npm 的、带精确版本号的包（`name@x.y.z`），纯 GitHub 源会被拒绝。请改用 npm 安装方式：

```bash
dsh plugin add dsh-skill-writing-plans@0.1.2
```

**计划文档还是又长又啰嗦？**

请确认你看的是新生成的文件。工作区里早先版本留下的旧计划不会被自动删除。

**它会不会每次都问我要不要先做计划？**

不会。触发即进入规划模式，直接开始做。

**能关掉它吗？**

可以，在插件市场里禁用或卸载即可。也可以只在个别会话里不使用——它不会强制接管所有请求。

**怎么更新到新版本？**

```bash
npm install dsh-skill-writing-plans@latest
```

或查看当前版本：

```bash
npm view dsh-skill-writing-plans version
```

---

## 许可

[MIT](LICENSE) © [linlin539](https://github.com/linlin539)
