# 诗词弹窗 (Poetry Popups)

中文古诗词随机弹窗展示系统 - React + Tailwind CSS + Bun

## 开发环境

### 安装依赖

```bash
bun install
```

### 启动开发服务器

```bash
bun dev
```

### 生产环境运行

```bash
bun start
```

## 部署到 Netlify

### 前置条件
- 将项目推送到 GitHub、GitLab 或 Bitbucket
- 安装 [Netlify CLI](https://docs.netlify.com/cli/get-started/)：
  ```bash
  npm install -g netlify-cli
  ```

### 方法 1：通过 Netlify Dashboard（推荐）

1. 访问 [app.netlify.com](https://app.netlify.com)
2. 点击 **"Add new site"** → **"Import an existing project"**
3. 连接你的 Git 账户并选择仓库
4. 配置设置：
   - **Build command**: `bun run build`
   - **Publish directory**: `dist`
5. 点击 **"Deploy site"**

**注意**：Netlify 会自动检测 `netlify.toml` 配置文件，上述设置应该已经预填充。

### 方法 2：本地部署（使用 Netlify CLI）

```bash
# 登录 Netlify
netlify login

# 部署（首次）
netlify deploy --prod

# 如果只想预览（不发布）
netlify deploy --prod --dir dist
```

### 环境配置

`netlify.toml` 已配置：
- **Build command**: `bun run build` - 运行 Bun 构建脚本
- **Publish directory**: `dist` - 输出目录
- **SPA routing**: 自动重定向到 `index.html`（SPA 兼容）

## 构建

```bash
bun run build
```

输出文件生成到 `dist/` 目录。

## 项目特性

- ✨ 15 首古典中文诗词
- 🎨 19 种主题颜色
- 🎭 8 种弹入动画
- 🔤 竖排文字显示（古诗词风格）
- 😊 随机 Emoji 和颜文字
- ⏱️ 进度条追踪
- 🎯 完全响应式设计

## 调试模式

访问 `?debug` 参数启用调试控制面板：

```
http://localhost:3000/?debug
```

---

This project was created using `bun init` in bun v1.2.11. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
