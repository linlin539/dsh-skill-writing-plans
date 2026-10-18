# dsh-skill-writing-plans

[![npm version](https://img.shields.io/npm/v/dsh-skill-writing-plans?color=blue)](https://www.npmjs.com/package/dsh-skill-writing-plans)
[![npm downloads](https://img.shields.io/npm/dm/dsh-skill-writing-plans)](https://www.npmjs.com/package/dsh-skill-writing-plans)
[![license](https://img.shields.io/npm/l/dsh-skill-writing-plans)](LICENSE)

**缁?DeepSeek Harness 鍔犱笂銆屽厛鍐欒鍒掞紝鍐嶅姩鎵嬨€嶇殑涔犳儻銆?*

瑁呬笂杩欎釜鎻掍欢锛孉gent 鍦ㄦ帴鍒颁换浣曞啓浠ｇ爜銆佸仛椤甸潰銆佽窇瀹為獙鐨勮姹傛椂锛屼細鍏堜骇鍑轰竴浠界粨鏋勫寲鐨勫疄鐜拌鍒掞紝鍐嶅紑濮嬪姩鎵嬧€斺€旇€屼笉鏄洿鎺ュ煁澶村啓浠ｇ爜銆?
> A DeepSeek Harness skill plugin that adds the `writing-plans` skill: the agent writes a structured implementation plan before coding, executes simple tasks inline, and offers an execution choice for complex work.

---

## 瀹冧负浣犲仛浠€涔?
| | |
|---|---|
| **涓嶇敤鎻愰啋瀹冨仛璁″垝** | 鍙璇锋眰娑夊強鍐欎唬鐮併€佸仛椤甸潰銆佽窇瀹為獙锛孉gent 浼氳嚜宸卞厛瑙勫垝 |
| **璁″垝鏈夊浐瀹氬幓澶?* | 鎬绘槸鍐欏埌 `docs/superpowers/plans/YYYY-MM-DD-<鍔熻兘鍚?.md`锛屾柟渚夸綘鍥炵湅鍜屽綊妗?|
| **灏忎簨涓嶅暟鍡?* | 鍙啓涓€涓?`index.html` 杩欑鍗曟浠诲姟锛孉gent 鐩存帴鍋氬畬锛屼笉浼氭嬁"瑕侀€夊摢绉嶆墽琛屾柟寮?鏉ョ儲浣?|
| **澶т簨缁欎綘閫夋嫨鏉?* | 澶氭枃浠躲€佸浠诲姟銆佽缁冪被闇€姹傦紝淇濆瓨璁″垝鍚庝細闂綘鏄淳瀛愪唬鐞嗗苟琛屾墽琛岋紝杩樻槸褰撳墠浼氳瘽閲岄€愭鎵ц |
| **璁″垝鑳界洿鎺ョ収鐫€鍋?* | 姣忎釜浠诲姟閮芥湁鍏蜂綋鏂囦欢璺緞銆佸畬鏁翠唬鐮併€佸彲鎵ц鍛戒护鍜岄鏈熺粨鏋滐紝娌℃湁 `TBD`銆乣TODO`銆?绋嶅悗瀹炵幇"杩欑被鍗犱綅 |

---

## 瀹夎

### 浠?npm 瀹夎锛堟帹鑽愶級

[![npm](https://img.shields.io/npm/v/dsh-skill-writing-plans)](https://www.npmjs.com/package/dsh-skill-writing-plans)

```bash
npm install dsh-skill-writing-plans
```

鎴栧湪 DSH 閲岀洿鎺ヨ锛?
```bash
dsh plugin add dsh-skill-writing-plans@0.1.1
```

> **DSH 妗岄潰瀹㈡埛绔敤鎴疯鐢ㄨ繖涓€绉嶃€?* 妗岄潰瀹㈡埛绔殑瀹夎杈圭晫鍙帴鍙楀凡鍙戝竷鍒?npm 鐨勫寘锛岀函 GitHub 婧愮殑鎻掍欢鍦ㄦ闈㈢瑁呬笉浜嗐€?
### 浠庢彃浠跺競鍦哄畨瑁?
1. 鎵撳紑 DeepSeek Harness 鈫?鎻掍欢甯傚満
2. 鎼滅储 `writing-plans` 鎴?`dsh-skill-writing-plans`
3. 鐐瑰嚮瀹夎锛屾寜鎻愮ず閲嶅惎 DSH

甯傚満鏉＄洰鏀跺綍鍚庡嵆鍙悳鍒帮紱鏀跺綍鍓嶈鐢ㄤ笂闈㈢殑 npm 鏂瑰紡銆?
### 浠?GitHub 婧愮爜瀹夎锛堜粎鏅€?dsh web / CLI锛?
```bash
git clone https://github.com/linlin539/dsh-skill-writing-plans.git
```

鐒跺悗鍦ㄤ綘浣跨敤鐨?DSH profile 鐩綍涓嬶紝鎶婁粨搴撴斁鍒?`packages/dsh-skill-writing-plans`锛屽苟鍦?profile 鐨?`package.json` 閲屽姞涓€琛屼緷璧栵細

```json
{
  "dependencies": {
    "dsh-skill-writing-plans": "link:packages\\dsh-skill-writing-plans"
  }
}
```

鍐嶅湪 profile 鐨?`cordis.patch.yml` 鏈熬鍔犱笂锛?
```yaml
- insert:
    - id: skill-writing-plans
      name: dsh-skill-writing-plans
```

閲嶅惎 DeepSeek Harness 鍗冲彲鐢熸晥銆?
### 鍙兂鐢ㄦ妧鑳芥枃浠?
涓嶆兂瑁呮彃浠剁殑璇濓紝鎶?`assets/writing-plans/SKILL.md` 鏀惧埌涓嬮潰浠讳竴浣嶇疆涔熷彲浠ワ細

- 椤圭洰绾э細`{浣犵殑椤圭洰}/.dsh/skills/writing-plans/SKILL.md`
- 鐢ㄦ埛绾э細`{DSH_HOME}/skills/writing-plans/SKILL.md`

---

## 鐢ㄨ捣鏉ユ槸浠€涔堟牱

### 绠€鍗曢渶姹傦細鐩存帴鍋氬畬

浣犺锛?
```text
甯垜鍐欎竴涓?index.html锛岄〉闈腑澶樉绀?'Hello World'
```

Agent 浼氾細

1. 澹版槑姝ｅ湪浣跨敤 `writing-plans` 鎶€鑳?2. 蹇€熺湅涓€鐪煎綋鍓嶅伐浣滃尯
3. 鎶婅鍒掑啓鍒?`docs/superpowers/plans/2026-10-17-hello-world-page.md`
4. 鍥犱负鍙湁鍗曚竴姝ラ锛岀洿鎺ュ垱寤?`index.html`锛屼笉闂綘浠讳綍闂
5. 鍛婅瘔浣犲仛瀹屼簡锛屼互鍙婅鍒掓枃浠跺湪鍝?
### 澶嶆潅闇€姹傦細璁╀綘閫夋€庝箞鎵ц

浣犺锛?
```text
甯垜瀹炵幇涓€涓鐢熶俊鎭鐞嗙郴缁燂紝鍖呭惈澧炲垹鏀规煡鍜屾暟鎹簱
```

Agent 浼氬厛鎶婂畬鏁磋鍒掑啓濂藉苟淇濆瓨锛岀劧鍚庨棶浣狅細

> **Plan saved to `docs/superpowers/plans/2026-10-17-student-management-system.md`. Two execution options:**
>
> 1. **Subagent-Driven锛堟帹鑽愶級** 鈥?姣忎釜浠诲姟娲句竴涓瓙浠ｇ悊鐙珛鎵ц
> 2. **Inline Execution** 鈥?鍦ㄥ綋鍓嶄細璇濅腑閫愭鎵ц锛屾瘡姝ユ湁妫€鏌ョ偣
>
> **Which approach?**

### 鍙兂鐪嬭鍒?
```text
鍙嚭璁″垝锛屽厛涓嶈鍐欎唬鐮?```

Agent 灏卞彧淇濆瓨璁″垝鏂囨。锛屼笉鍔ㄤ换浣曚唬鐮併€?
---

## 璁″垝鏂囨。闀夸粈涔堟牱

````markdown
# Hello World 椤甸潰 Implementation Plan

**Goal:** 浜や粯涓€涓潤鎬侀〉闈紝鍦ㄦ祻瑙堝櫒瑙嗗彛姝ｄ腑澶樉绀?`Hello World`銆?
**Architecture:** 鍗曟枃浠剁函闈欐€佸疄鐜帮紝鐢?Flexbox 鍦?`body` 涓婂仛鍙屽悜灞呬腑銆?
**Tech Stack:** HTML5 + CSS3

---

## Task 1: 鍒涘缓灞呬腑鐨?Hello World 椤甸潰

**Files:**
- Create: `index.html`
- Modify: 鏃?- Test: 鏃?
- [ ] **Step 1: 鍐欏叆 `index.html`**

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

- [ ] **Step 2: 鍦ㄦ祻瑙堝櫒涓墦寮€楠岃瘉**

Run: 鍙屽嚮 `index.html`
Expected: 椤甸潰姝ｄ腑澶樉绀?`Hello World`

---

## Self-Review

1. 闇€姹傝鐩栵細鏂囦欢鍚嶄笌灞呬腑鏄剧ず鍧囧凡瑕嗙洊銆?2. 鏃犲崰浣嶅唴瀹广€?3. 璺緞涓庢枃浠跺悕鍓嶅悗涓€鑷淬€?````

---

## 甯歌闂

**瑁呭畬涔嬪悗鍦?DSH 涓荤晫闈㈡病鐪嬪埌杩欎釜鎻掍欢锛?*

杩欐槸姝ｅ父鐨勩€傛湰鎻掍欢鍙線 Host 渚ф敞鍐屾妧鑳斤紝涓嶅甫浠讳綍鐣岄潰缁勪欢锛屾墍浠ヤ笉浼氬嚭鐜板湪涓绘彃浠跺垪琛ㄩ噷銆傚彲浠ュ湪鎻掍欢甯傚満鐨勫凡瀹夎鍒楄〃涓‘璁わ紝鎴栨煡鐪?DSH 鏃ュ織銆?
**DSH 妗岄潰瀹㈡埛绔粠 GitHub 婧愯涓嶄簡锛?*

妗岄潰瀹㈡埛绔殑瀹夎杈圭晫鍙帴鍙楀凡鍙戝竷鍒?npm 鐨勩€佸甫绮剧‘鐗堟湰鍙风殑鍖咃紙`name@x.y.z`锛夛紝绾?GitHub 婧愪細琚嫆缁濄€傝鏀圭敤 npm 瀹夎鏂瑰紡锛?
```bash
dsh plugin add dsh-skill-writing-plans@0.1.1
```

**璁″垝鏂囨。杩樻槸鍙堥暱鍙堝暟鍡︼紵**

璇风‘璁や綘鐪嬬殑鏄柊鐢熸垚鐨勬枃浠躲€傚伐浣滃尯閲屾棭鍏堢増鏈暀涓嬬殑鏃ц鍒掍笉浼氳鑷姩鍒犻櫎銆?
**瀹冧細涓嶄細姣忔閮介棶鎴戣涓嶈鍏堝仛璁″垝锛?*

涓嶄細銆傝Е鍙戝嵆杩涘叆瑙勫垝妯″紡锛岀洿鎺ュ紑濮嬪仛銆?
**鑳藉叧鎺夊畠鍚楋紵**

鍙互锛屽湪鎻掍欢甯傚満閲岀鐢ㄦ垨鍗歌浇鍗冲彲銆備篃鍙互鍙湪涓埆浼氳瘽閲屼笉浣跨敤鈥斺€斿畠涓嶄細寮哄埗鎺ョ鎵€鏈夎姹傘€?
**鎬庝箞鏇存柊鍒版柊鐗堟湰锛?*

```bash
npm install dsh-skill-writing-plans@latest
```

鎴栨煡鐪嬪綋鍓嶇増鏈細

```bash
npm view dsh-skill-writing-plans version
```

---

## 璁稿彲

[MIT](LICENSE) 漏 [linlin539](https://github.com/linlin539)
