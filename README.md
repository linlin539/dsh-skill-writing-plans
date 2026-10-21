# dsh-skill-writing-plans

[![npm version](https://img.shields.io/npm/v/dsh-skill-writing-plans?color=blue)](https://www.npmjs.com/package/dsh-skill-writing-plans)
[![npm downloads](https://img.shields.io/npm/dm/dsh-skill-writing-plans)](https://www.npmjs.com/package/dsh-skill-writing-plans)
[![license](https://img.shields.io/npm/l/dsh-skill-writing-plans)](LICENSE)

**给 DeepSeek Harness 加上「先写计划，再动手」的习惯。**

装上这个插件，Agent 在接到写代码、做页面、跑实验的请求时，会先产出一份结构化的实现计划，再开始动手——而不是直接埋头写代码。

> A DeepSeek Harness skill plugin that adds the `plan-first` skill: the agent writes a structured implementation plan before coding, executes simple tasks inline, and offers an execution choice for complex work.

---

## ⚠️ 重要：技能名是 `plan-first`，不是 `writing-plans`

**v0.2.0 起，本插件注册的技能名为 `plan-first`。** 如果你在旧版本里用 `/writing-plans` 触发，请改用 `/plan-first`。

### 为什么改名

如果你同时装了 `dsh-connect-trae`，会遇到这个问题：

`dsh-connect-trae` 会把 Trae 的技能目录（`~/.trae-cn/skills/`）接进 DSH。Trae 里有个**同名**的 `writing-plans` 技能（obra/superpowers 原版，英文、结构冗长）。

两个技能同名时，DSH 只会保留一个。实际结果是 **Trae 那份抢先注册，本插件的技能被静默丢弃**——你改了本插件的 `SKILL.md`，运行时却完全没有生效，输出的计划仍是英文、多任务、带 `For agentic workers` banner 的原版结构。

改名后两者可以共存：

| 触发方式 | 用的是哪个技能 |
|---|---|
| `/plan-first` | 本插件（中文、精简、简单需求直接执行） |
| `/writing-plans` | Trae 的原版（如果你装了 dsh-connect-trae） |

Trae 里的原版技能**不受影响**，可以继续在 Trae 中使用。

---

## 它为你做什么

| | |
|---|---|
| **不用提醒它做计划** | 只要请求涉及写代码、做页面、跑实验，Agent 会自己先规划 |
| **计划有固定去处** | 总是写到 `docs/superpowers/plans/YYYY-MM-DD-<功能名>.md`，方便你回看和归档 |
| **小事不啰嗦** | 只写一个 `index.html` 这种单文件任务，计划控制在 15–30 行、单个任务，写完直接做完 |
| **大事给你选择权** | 多文件、多任务、训练类需求，保存计划后会问你是派子代理并行执行，还是当前会话里逐步执行 |
| **计划能直接照着做** | 每个任务都有具体文件路径、完整代码、可执行命令和预期结果，没有 `TBD`、`TODO`、"稍后实现"这类占位 |

---

## 安装

### 从 npm 安装（推荐）

```bash
npm install dsh-skill-writing-plans
```

或在 DSH 里直接装：

```bash
dsh plugin add dsh-skill-writing-plans@0.2.0
```

> **DSH 桌面客户端用户请用这一种。** 桌面客户端的安装边界只接受已发布到 npm 的包，纯 GitHub 源的插件在桌面端装不了。

### 从插件市场安装

1. 打开 DeepSeek Harness → 插件市场
2. 搜索 `plan-first` 或 `dsh-skill-writing-plans`
3. 点击安装，按提示重启 DSH

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

不想装插件的话，把 `assets/plan-first/SKILL.md` 放到下面任一位置也可以：

- 项目级：`{你的项目}/.dsh/skills/plan-first/SKILL.md`
- 用户级：`{DSH_HOME}/skills/plan-first/SKILL.md`

---

## 用起来是什么样

### 简单需求：直接做完

你说：

```text
/plan-first 帮我写一个 index.html，页面中央显示 'Hello World'
```

Agent 会：

1. 声明正在使用 `plan-first` 技能
2. 快速看一眼当前工作区
3. 把一份 20 行左右的计划写到 `docs/superpowers/plans/2026-10-21-hello-world-page.md`
4. 因为只有单一步骤，**直接创建 `index.html`**，不问你要选哪种执行方式
5. 一句话告诉你做完了，以及计划文件在哪

### 复杂需求：让你选怎么执行

你说：

```text
/plan-first 帮我实现一个学生信息管理系统，包含增删改查和数据库
```

Agent 会先把完整计划写好并保存，然后问你：

> **计划已保存到 `docs/superpowers/plans/2026-10-21-student-management-system.md`。两种执行方式：**
>
> 1. **子代理驱动（推荐）** — 每个任务派一个子代理独立执行
> 2. **当前会话执行** — 在当前会话中逐步执行，每步有检查点
>
> **选哪种？**

### 只想看计划

```text
/plan-first 只出计划，先不要写代码
```

Agent 就只保存计划文档，不动任何代码。

---

## 计划文档长什么样

简单需求的计划就是这样，约 20 行：

````markdown
# Hello World 页面实现计划

**目标：** 交付一个静态页面，在浏览器视口正中央显示 `hello world`。

**架构：** 单文件纯静态实现，`body` 用 grid 做双向居中。

**技术栈：** HTML5 + CSS

---

## 任务 1: 创建页面

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

复杂需求的计划会更长，可以包含多个任务和 TDD 循环——但只用于**有可测逻辑**的场景（函数、API、数据转换、状态机、业务规则）。静态页面不写测试。

---

## 常见问题

**我用 `/writing-plans` 触发，出来的是英文长篇计划？**

那说明你用的是 Trae 的原版技能（通过 `dsh-connect-trae` 接入），不是本插件。改用 `/plan-first`。

**装完之后在 DSH 主界面没看到这个插件？**

这是正常的。本插件只往 Host 侧注册技能，不带任何界面组件，所以不会出现在主插件列表里。可以在插件市场的已安装列表中确认，或查看 DSH 日志。

**DSH 桌面客户端从 GitHub 源装不了？**

桌面客户端的安装边界只接受已发布到 npm 的、带精确版本号的包（`name@x.y.z`），纯 GitHub 源会被拒绝。请改用 npm 安装方式：

```bash
dsh plugin add dsh-skill-writing-plans@0.2.0
```

**计划文档还是又长又啰嗦？**

请确认你看的是 `plan-first` 生成的、且是重启 DSH 之后新生成的文件。工作区里早先版本留下的旧计划不会被自动删除。

**它会不会每次都问我要不要先做计划？**

不会。触发即进入规划模式，简单和中等需求直接执行完。

**能关掉它吗？**

可以，在插件市场里禁用或卸载即可。

**怎么更新到新版本？**

```bash
npm install dsh-skill-writing-plans@latest
```

或查看当前版本：

```bash
npm view dsh-skill-writing-plans version
```

---

## 更新日志

### 0.2.0

- **技能改名为 `plan-first`**，避免与 `dsh-connect-trae` 接入的 Trae `writing-plans` 技能同名冲突。此前同名导致本插件技能被静默丢弃，所有内容修改都不生效。
- `whenToUse` 字段现在会传给宿主，技能触发条件不再只对读 `SKILL.md` 的人可见。
- 计划格式改为按复杂度分档：简单需求 15–30 行、单个任务，写完直接执行；中等 2–4 个任务；复杂才给执行选择。

### 0.1.x

- 语言跟随用户、日期取当天真实日期、错误兜底、npm 发布。

---

## 许可

[MIT](LICENSE) © [linlin539](https://github.com/linlin539)
