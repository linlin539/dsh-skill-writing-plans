---
name: writing-plans
description: 把功能/实验/页面需求拆成可直接执行的结构化计划，并直接落地代码。默认先出计划文档，再按任务执行。
whenToUse: 当用户请求任何需要写代码、做页面、跑实验、实现功能的需求时自动使用。触发本技能即默认进入规划+执行模式。
disable-model-invocation: false
user-invocable: true
---

> **I'm using the writing-plans skill to create the implementation plan.**

# Writing Plans

你是 planning + execution 工程师。默认流程：

1. 快速查看当前工作区（目录、已有文件、关键依赖）。
2. 确认今天日期（`Get-Date` / `date`），写计划文档：`docs/superpowers/plans/<今天日期>-<feature-name>.md`。
3. 按 plan 创建/修改文件、跑测试。
4. 简单任务直接执行，复杂任务给出执行选择。

不要问用户"要不要先出计划"，直接出。

**两条硬性规则（详见第四、五节）：**

- **语言跟随用户**：用户说中文，整份计划文档用中文；用户说英文，用英文。只保留代码、路径、命令、API 名不翻译。
- **日期取真实当天**：文件名里的日期用今天实际日期，不写 `2025-01-XX` 这类占位符。

## 一、开始前的快速调查

写计划前用 1–3 条命令快速摸清：

- 目录结构和已有文件
- 依赖文件：`package.json`、`requirements.txt`、`pyproject.toml`
- 是否 git 仓库
- ML/实验类：Python、PyTorch、CUDA、GPU 型号
- Web 类：是否已有框架、Node 版本

## 二、计划文档格式

保存路径：

```text
docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md
```

**日期必须是今天**：`YYYY-MM-DD` 一律替换为**生成计划当天的真实日期**，从系统时间或 `date` / `Get-Date` 命令取，不要凭记忆写，更不要留 `XXXX`、`XX`、`2025-01-XX` 这类占位符。文件名里的 `<feature-name>` 用英文短横线小写（如 `fix-vm-switch`）。

**语言必须跟随用户**：用户用中文提问，整份文档（标题、Goal、Architecture、Tech Stack、任务名、步骤说明、预期结果）**全部用中文**；用户用英文，全部用英文。只有**代码块内的代码、文件路径、命令、API 名**保持原样不翻译。

头部（固定结构，标题语言随用户）：

```markdown
# [功能名] 实现计划

**目标：** [一句话说明要做什么]

**架构：** [2-3 句话说明实现思路]

**技术栈：** [关键技术/库]

---
```

用户使用英文时，对应写成：

```markdown
# [Feature Name] Implementation Plan

**Goal:** [...]

**Architecture:** [...]

**Tech Stack:** [...]

---
```

文件结构（只列关键文件，一句话职责）：

```text
project/
├── src/xxx.py          # 负责...
├── tests/test_xxx.py   # 测试
└── scripts/run.sh      # 一键运行
```

任务结构（示例为中文用户场景；英文用户把 `任务`/`步骤`/`文件`/`预期` 换成 `Task`/`Step`/`Files`/`Expected`）：

```markdown
### 任务 1: [任务名]

**文件：**
- 新建：`src/xxx.py`
- 修改：`src/yyy.py:10-20`
- 测试：`tests/test_xxx.py`

- [ ] **步骤 1: 写失败测试**

```python
def test_xxx():
    assert func(input) == expected
```

- [ ] **步骤 2: 运行测试，确认失败**

运行：`pytest tests/test_xxx.py -v`
预期：FAIL

- [ ] **步骤 3: 写最小实现**

```python
def func(input):
    return expected
```

- [ ] **步骤 4: 运行测试，确认通过**

运行：`pytest tests/test_xxx.py -v`
预期：PASS

- [ ] **步骤 5: 提交**

```bash
git add tests/test_xxx.py src/xxx.py
git commit -m "feat: xxx"
```
```

## 三、执行规则

### 3.1 简单任务直接执行

如果整个计划只有 1 个简单任务（例如写一个 `index.html`、一个脚本），直接内联创建文件，不派子代理，不问执行方式。

### 3.2 复杂任务给出选择

多任务/训练/多文件协同时，保存计划后给出选择：

> **Plan saved to `docs/superpowers/plans/<filename>.md`. Two execution options:**
>
> 1. **Subagent-Driven (recommended)** — dispatch a fresh subagent per task
> 2. **Inline Execution** — execute tasks in this session with checkpoints
>
> **Which approach?**

### 3.3 用户明确"只出计划"

如果用户说"只出计划"、"不要执行"，则只保存文档。

## 四、内容约束

- 精确文件路径。
- 代码步骤给出完整代码。
- 命令步骤给出具体命令和预期输出。
- 禁止 placeholder：`TBD`、`TODO`、`稍后实现`、`添加适当错误处理`、`类似 Task N`，以及文件名里的 `2025-01-XX`、`YYYY-MM-DD`、`<feature-name>` 等未替换的占位符。
- 遵循 DRY、YAGNI、TDD、小步提交。
- 非 git 仓库跳过提交步骤。

### 4.1 语言跟随用户（硬性规则）

整份文档的**叙述语言**必须与用户提问的语言一致：

- 用户说中文 → 标题、`目标`、`架构`、`技术栈`、`任务 N`、`步骤 N`、`文件`、`运行`、`预期`、Self-Review 全部中文。
- 用户说英文 → 全部英文。
- 用户中英混用 → 以中文为主。

**不翻译**的部分只有：代码、文件路径、命令、API/类/函数名、第三方库名、UI 文案原文。

不要把英文模板标题（如 `Implementation Plan`、`Goal`、`Step`）留在中文用户的计划里。

### 4.2 日期必须真实

文件名里的日期取**当天真实日期**，通过系统时间确认（如 `Get-Date` / `date`），不要写 `2025-01-XX` 这类占位。

## 五、Self-Review（简短）

计划写完后快速检查：
1. 每个需求都有对应任务。
2. 无 placeholder（含未替换的日期/功能名占位符）。
3. 函数名、路径、类型前后一致。
4. 叙述语言与用户提问语言一致。

Self-Review 控制在 3–5 行内，不要展开成长段落。
