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
git push -f https://github.com/bayuncao/bayuncao.github.io.git main:gh-pages

# 返回项目根目录
cd ..