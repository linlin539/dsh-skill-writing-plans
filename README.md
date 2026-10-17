# dsh-skill-writing-plans

> 把 Trae 的「编写计划」技能带到 DeepSeek Harness（DSH）。

安装本插件后，DSH Agent 会在接到任何编码/页面/功能需求时，**先自动生成一份结构化的实现计划**，再按情况选择直接执行或把选择权交给用户。

---

## 它能做什么

| 行为 | 说明 |
|------|------|
| 自动触发 | 只要请求涉及写代码、做页面、跑实验、实现功能，Agent 会自动使用本技能 |
| 先出计划 | 总是先把计划写入 `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md` |
| 简单任务直接做 | 计划只有单个简单任务时（如写一个 `index.html`），直接创建文件，不询问 |
| 复杂任务给选择 | 多任务/多文件/训练等场景，保存计划后让用户选执行方式 |
| 精确无占位 | 计划里不出现 `TBD` / `TODO` / 「稍后实现」/ 「添加适当错误处理」 |

计划文档风格贴近 Trae 原版：头部简洁、文件结构清晰、任务可执行、Self-Review 简短。

---

## 安装

### 方式一：DSH 插件市场（dsh-market）

如果市场已收录本插件：

1. 打开 DeepSeek Harness → 插件市场
2. 搜索 `writing-plans` 或 `dsh-skill-writing-plans`
3. 点击安装并重启 DSH

### 方式二：本地链接（开发/测试）

1. 把本仓库克隆到本地：

```bash
git clone https://github.com/linlin539/dsh-skill-writing-plans.git
```

2. 在 DSH 的 profile 目录下创建 `packages/dsh-skill-writing-plans`，把仓库内容复制进去
3. 在 profile 的 `package.json` 中添加依赖：

```json
{
  "dependencies": {
    "dsh-skill-writing-plans": "link:packages\\dsh-skill-writing-plans"
  }
}
```

4. 在 profile 的 `cordis.patch.yml` 中添加：

```yaml
- insert:
    - id: skill-writing-plans
      name: dsh-skill-writing-plans
```

5. 重启 DeepSeek Harness

### 方式三：npm 包

如果你已把本包发布到 npm（见下文），可在 DSH 中使用：

```text
plugin_manager install_bundle dsh-skill-writing-plans
```

---

## 使用示例

安装并启用插件后，在任意会话中输入：

```text
帮我写一个 index.html，页面中央显示 'Hello World'
```

Agent 会自动：

1. 声明正在使用 `writing-plans` 技能
2. 快速检查当前工作区
3. 生成计划：`docs/superpowers/plans/2026-10-17-hello-world-page.md`
4. 由于这是单一步骤的简单任务，直接创建 `index.html`
5. 告知用户完成结果

对于复杂需求，例如：

```text
帮我实现一个学生信息管理系统，包含增删改查和数据库
```

Agent 会：

1. 生成完整计划文档
2. 保存后询问执行方式：
   - **Subagent-Driven（推荐）**：每个任务派一个子代理执行
   - **Inline Execution**：在当前会话中逐步执行

---

## 插件结构

```text
dsh-skill-writing-plans/
├── package.json
├── README.md
├── lib/
│   └── index.js              # Cordis 插件入口，注册 bundled skill provider
└── assets/
    └── writing-plans/
        └── SKILL.md          # 技能正文（系统提示）
```

- 纯 Host 端插件，没有 Client UI 组件
- 安装后不会在 DSH 主插件列表里显示，但在 `dsh-market` 的已安装列表中可见

---

## 与 Trae 原版的差异

| 项 | Trae 原版 | 本插件 |
|---|---|---|
| 运行机制 | Trae 内置 | DSH 原生 Skill 机制 |
| 计划保存 | Trae 工作区 | `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md` |
| 执行工具 | Trae subagent | DSH `subagent` / `subagent_fork` / `workflow` |
| 触发方式 | 自动或手动 | 自动 + `/writing-plans` 手动 |

---

## 常见问题

**Q：安装后 DSH 里没有看到插件？**

A：本插件是纯 Host 端 skill 插件，没有 UI 组件，所以不会出现在主插件 UI。可以通过 `dsh-market` 的已安装列表或 DSH 日志确认是否加载成功。

**Q：计划文档还是和以前一样冗长？**

A：请确认工作区里的计划文件是新生成的。旧文件是之前版本留下的，不会被自动删除。

**Q：可以不安装插件，只用一个 skill 文件吗？**

A：可以。把 `assets/writing-plans/SKILL.md` 复制到项目级或用户级 skill 目录即可：

- 项目级：`{project-root}/.dsh/skills/writing-plans/SKILL.md`
- 用户级：`{DSH_HOME}/skills/writing-plans/SKILL.md`

---

## 发布到 npm

如果你也想让别人通过 npm 安装，需要：

1. 注册 [npm](https://www.npmjs.com/signup) 账号
2. 本地登录：`npm login`
3. 确保 `package.json` 中 `version` 正确
4. 执行：`npm publish`

详细步骤见下方「npm 注册与发布流程」。

---

## License

MIT © [linlin539](https://github.com/linlin539)
