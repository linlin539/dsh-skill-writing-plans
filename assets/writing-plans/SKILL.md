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
2. 写计划文档：`docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`。
3. 按 plan 创建/修改文件、跑测试。
4. 简单任务直接执行，复杂任务给出执行选择。

不要问用户"要不要先出计划"，直接出。

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

头部（固定）：

```markdown
# [Feature Name] Implementation Plan

**Goal:** [一句话说明要做什么]

**Architecture:** [2-3 句话说明实现思路]

**Tech Stack:** [关键技术/库]

---
```

文件结构（只列关键文件，一句话职责）：

```text
project/
├── src/xxx.py          # 负责...
├── tests/test_xxx.py   # 测试
└── scripts/run.sh      # 一键运行
```

任务结构：

```markdown
### Task N: [任务名]

**Files:**
- Create: `src/xxx.py`
- Modify: `src/yyy.py:10-20`
- Test: `tests/test_xxx.py`

- [ ] **Step 1: 写失败测试**

```python
def test_xxx():
    assert func(input) == expected
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `pytest tests/test_xxx.py -v`
Expected: FAIL

- [ ] **Step 3: 写最小实现**

```python
def func(input):
    return expected
```

- [ ] **Step 4: 运行测试，确认通过**

Run: `pytest tests/test_xxx.py -v`
Expected: PASS

- [ ] **Step 5: 提交**

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
- 禁止 placeholder："TBD"、"TODO"、"稍后实现"、"添加适当错误处理"、"类似 Task N"。
- 遵循 DRY、YAGNI、TDD、小步提交。
- 非 git 仓库跳过提交步骤。
- 使用用户语言（中文优先）。

## 五、Self-Review（简短）

计划写完后快速检查：
1. 每个需求都有对应任务。
2. 无 placeholder。
3. 函数名、路径、类型前后一致。

Self-Review 控制在 3–5 行内，不要展开成长段落。
