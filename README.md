# 全栈博客系统

一个基于 Next.js 16 + TypeScript + Tailwind CSS + Prisma 构建的现代化全栈博客系统。

## 功能特性

### 核心功能

- 📝 **文章管理**: 支持文章的创建、编辑、发布、删除全流程
- 🏷️ **标签系统**: 文章分类标签，支持多标签关联
- 🔍 **搜索功能**: 支持按标题、内容搜索文章
- 📱 **响应式设计**: 完美适配桌面端和移动端
- 🌙 **暗黑模式**: 支持亮色/暗色主题切换
- ⚡ **高性能**: 基于 Next.js App Router，支持服务端渲染

### 技术栈

- **框架**: [Next.js 16](https://nextjs.org/) + React 19
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/)
- **数据库**: [Prisma](https://www.prisma.io/) + SQLite
- **部署**: [Vercel](https://vercel.com/) + GitHub Actions

## 快速开始

### 1. 克隆项目

```bash
git clone git@github.com:llq0802/blog.git
cd blog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，配置数据库连接：

```env
DATABASE_URL="file:./dev.db"
```

### 4. 初始化数据库

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看博客。

## 项目结构

```
blog/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API 路由
│   │   ├── admin/          # 管理后台
│   │   ├── posts/          # 文章相关页面
│   │   ├── about/          # 关于页面
│   │   ├── layout.tsx      # 根布局
│   │   ├── page.tsx        # 首页
│   │   └── globals.css     # 全局样式
│   ├── components/         # React 组件
│   │   ├── Header.tsx      # 导航头部
│   │   ├── Footer.tsx      # 页脚
│   │   ├── PostCard.tsx    # 文章卡片
│   │   ├── PostEditor.tsx  # 文章编辑器
│   │   └── MarkdownContent.tsx  # Markdown 渲染
│   └── lib/                # 工具函数
│       ├── prisma.ts       # Prisma 客户端
│       └── utils.ts        # 通用工具
├── prisma/
│   └── schema.prisma       # 数据库模型
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 部署配置
├── public/                 # 静态资源
├── next.config.ts          # Next.js 配置
├── tailwind.config.ts      # Tailwind CSS 配置
└── package.json
```

## 部署指南

### Vercel 部署

1. 在 [Vercel](https://vercel.com/) 创建新项目
2. 连接你的 GitHub 仓库
3. 配置环境变量：
   - `DATABASE_URL`: 数据库连接字符串
4. 点击部署

### GitHub Actions 自动部署

项目已配置 GitHub Actions 工作流，推送到 `master` 分支时会自动部署到 Vercel。

需要在 GitHub 仓库的 Secrets 中配置以下变量：

- `VERCEL_TOKEN`: Vercel API Token
- `VERCEL_ORG_ID`: Vercel 组织 ID
- `VERCEL_PROJECT_ID`: Vercel 项目 ID
- `DATABASE_URL`: 数据库连接字符串

获取方式：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录并获取信息
vercel login
vercel teams list  # 获取 ORG_ID
vercel projects list  # 获取 PROJECT_ID
vercel tokens create  # 创建 TOKEN
```

## 使用说明

### 写文章

1. 点击导航栏的"写文章"按钮
2. 填写文章标题、内容等信息
3. 选择或创建标签
4. 点击"发布文章"或"保存草稿"

### 管理文章

1. 访问 `/admin/posts` 进入管理后台
2. 可以查看所有文章列表
3. 支持编辑、删除、预览操作

### Markdown 支持

文章编辑器支持完整的 Markdown 语法：

- 标题、段落、列表
- 代码块（支持语法高亮）
- 链接、图片
- 表格
- 引用块
- 等等

## 自定义配置

### 修改网站信息

编辑 `src/app/layout.tsx` 中的 metadata：

```typescript
export const metadata: Metadata = {
  title: '你的博客名称',
  description: '博客描述',
};
```

### 修改主题颜色

编辑 `src/app/globals.css` 中的 CSS 变量。

### 添加新页面

在 `src/app/` 目录下创建新的文件夹和 `page.tsx` 文件。

## 开发计划

- [ ] 用户认证系统
- [ ] 评论功能
- [ ] 文章分类
- [ ] RSS 订阅
- [ ] 站点地图
- [ ] SEO 优化
- [ ] 数据分析

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

[MIT](LICENSE)

## 致谢

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Vercel](https://vercel.com/)
