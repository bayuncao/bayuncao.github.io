# GitHub Pages 部署指南

本文档提供了将此 Next.js 技术博客项目部署到 GitHub Pages 的详细步骤。

## 目录

1. [前提条件](#前提条件)
2. [项目准备](#项目准备)
3. [配置 Next.js](#配置-nextjs)
4. [创建部署脚本](#创建部署脚本)
5. [设置 GitHub Actions](#设置-github-actions)
6. [配置 GitHub Pages](#配置-github-pages)
7. [故障排除](#故障排除)

## 前提条件

- GitHub 账户
- Git 已安装在本地环境
- Node.js (v14.x 或更高版本)
- 项目已经推送到 GitHub 仓库

## 项目准备

1. 确保你的项目已经推送到 GitHub 仓库。如果还没有，请执行以下操作：

```bash
# 初始化 Git 仓库（如果尚未初始化）
git init

# 添加远程仓库
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 推送到 GitHub
git push -u origin main

```

## 配置 Next.js

1. 在项目根目录创建一个 `next.config.mjs` 文件（如果已存在则修改），添加以下内容:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 启用静态导出
  images: {
    unoptimized: true,  // 对于 GitHub Pages 需要禁用图像优化
  },
  // 如果你的仓库名不是你的用户名.github.io，则需要设置 basePath
  // 例如，如果你的仓库名是 tech-blog，则设置：
  basePath: '/tech-blog',
  // 同样，如果你的仓库名不是你的用户名.github.io，则需要设置 assetPrefix
  assetPrefix: '/tech-blog',
};

export default nextConfig;
```

**注意**：将 `/tech-blog` 替换为你的实际仓库名称。如果你的仓库名是 `username.github.io`，则可以删除 `basePath` 和 `assetPrefix` 行。

## 创建部署脚本

1. 在项目根目录创建一个名为 `deploy.sh` 的脚本文件，内容如下：

```sh

#!/bin/bash

# 构建应用
npm run build

# 进入输出目录
cd out

# 创建 .nojekyll 文件以绕过 Jekyll 处理
touch .nojekyll

# 如果你使用自定义域名，创建 CNAME 文件
# echo "yourdomain.com" > CNAME

# 初始化 Git 仓库
git init
git add .
git commit -m "Deploy to GitHub Pages"

# 推送到 GitHub Pages 分支
git push -f https://github.com/你的用户名/你的仓库名.git main:gh-pages

# 返回项目根目录
cd ..

```

2. 使脚本可执行：


```shellscript

chmod +x deploy.sh

```


## 设置 GitHub Actions

为了自动化部署过程，我们可以设置 GitHub Actions。

1. 在项目根目录创建 `.github/workflows` 目录：


```shellscript
mkdir -p .github/workflows
```

2. 在该目录中创建一个名为 `deploy.yml` 的文件，内容如下：

```yaml

name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]  # 当推送到 main 分支时触发
  workflow_dispatch:    # 允许手动触发

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v3

      - name: Setup Node.js ⚙️
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies 📦
        run: npm ci

      - name: Build 🔧
        run: npm run build

      - name: Add .nojekyll file 📄
        run: touch out/.nojekyll

      - name: Deploy to GitHub Pages 🚀
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages  # 部署到 gh-pages 分支
          folder: out       # 要部署的文件夹
          clean: true       # 自动删除旧文件

```


## 配置 GitHub Pages

1. 推送所有更改到 GitHub：


```shellscript
git add .
git commit -m "Add GitHub Pages deployment configuration"
git push
```

2. 在 GitHub 仓库页面，点击 "Settings"。
3. 在左侧导航栏中，点击 "Pages"。
4. 在 "Source" 部分，选择 "Deploy from a branch"。
5. 在 "Branch" 下拉菜单中，选择 "gh-pages"，然后点击 "Save"。
6. 等待几分钟，你的网站将在 `https://你的用户名.github.io/你的仓库名` 上可用。


## 故障排除

### 图片不显示

如果部署后图片不显示，请检查：

1. 确保 `next.config.mjs` 中的 `images.unoptimized` 设置为 `true`。
2. 确保图片路径正确，考虑到 `basePath` 的影响。
3. 对于外部图片，确保它们在 `next.config.mjs` 的 `images.domains` 中列出。


### 路由问题

GitHub Pages 不支持 Next.js 的客户端路由。为了解决这个问题：

1. 在 `out` 目录中为每个路由创建一个 `404.html` 文件，内容与 `index.html` 相同。
2. 添加一个简单的重定向脚本到 `index.html`，以处理客户端路由。


### 自定义域名

如果你想使用自定义域名：

1. 在 GitHub 仓库的 "Settings" > "Pages" 中，在 "Custom domain" 字段中输入你的域名。
2. 在你的 DNS 提供商处添加适当的 DNS 记录。
3. 确保在部署脚本中创建了 `CNAME` 文件（取消注释相关行）。


## 其他资源

- [Next.js 静态导出文档](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

