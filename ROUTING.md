# 路由系统说明文档

## 概述

项目现在支持基于 URL 路径的路由匹配，不同的路由可以显示不同的内容。

## 现有路由

### 1. `/poems` - 古诗词
- **URL**: `http://localhost:3000/poems`
- **欢迎信息**: "送给你的礼物 📜"
- **内容**: 15 首古典中文诗词
- **特点**: 传统古诗文格式

### 2. `/chen` - 给 Chen 的祝福
- **URL**: `http://localhost:3000/chen`
- **欢迎信息**: "给 Chen 的祝福 ✨"
- **内容**: 10 条个性化祝福语
- **特点**: 温暖、励志的祝福内容

### 3. 根路径 `/`
- **默认跳转到**: `/poems`

## 如何添加新路由

### 第 1 步：在 `src/hooks/usePopupManager.ts` 中定义内容

```typescript
// 添加你的内容数组
const NEW_ROUTE_CONTENT: PoemData[] = [
  { 
    content: '你的内容 1', 
    origin: '来源或标题',
    author: '作者或来自',
    category: '分类'
  },
  { 
    content: '你的内容 2', 
    origin: '来源或标题',
    author: '作者或来自',
    category: '分类'
  },
  // ... 更多内容
];
```

### 第 2 步：在 `ROUTE_CONTENT_MAP` 中注册新路由

编辑 `src/hooks/usePopupManager.ts` 中的 `ROUTE_CONTENT_MAP`:

```typescript
const ROUTE_CONTENT_MAP: Record<RouteKey, PoemData[]> = {
  poems: POEMS,
  chen: CHEN_BLESSINGS,
  your_route_name: NEW_ROUTE_CONTENT,  // ← 添加这一行
};
```

### 第 3 步：在 `src/App.tsx` 中添加路由配置

编辑 `src/App.tsx` 中的 `ROUTES` 对象：

```typescript
const ROUTES: Record<string, RouteConfig> = {
  poems: {
    name: 'poems',
    title: '送给你的礼物',
    subtitle: '古诗词漂流瓶',
    emoji: '📜',
    buttonText: '✨ 开始阅读',
    description: '一份特别的诗词惊喜',
  },
  chen: { /* ... */ },
  your_route_name: {  // ← 添加新路由
    name: 'your_route_name',
    title: '标题文案',
    subtitle: '副标题文案',
    emoji: '😊',  // 选择合适的 emoji
    buttonText: '按钮文案',
    description: '描述文案',
  },
};
```

## 示例：添加"李华的祝福"路由

### 步骤 1：定义内容

```typescript
// src/hooks/usePopupManager.ts 中添加
const LIHUA_BLESSINGS: PoemData[] = [
  { content: '每一天都是新的开始！', origin: '日常鼓励', author: 'From 李华', category: '祝福-励志' },
  { content: '你的坚持会闪闪发光', origin: '成长祝福', author: 'From 李华', category: '祝福-成长' },
  // ... 更多内容
];
```

### 步骤 2：注册到路由映射

```typescript
// src/hooks/usePopupManager.ts 中修改
const ROUTE_CONTENT_MAP: Record<RouteKey, PoemData[]> = {
  poems: POEMS,
  chen: CHEN_BLESSINGS,
  lihua: LIHUA_BLESSINGS,  // ← 添加
};
```

### 步骤 3：添加路由配置

```typescript
// src/App.tsx 中修改
const ROUTES: Record<string, RouteConfig> = {
  poems: { /* ... */ },
  chen: { /* ... */ },
  lihua: {  // ← 添加
    name: 'lihua',
    title: '给李华的祝福',
    subtitle: '来自朋友的问候',
    emoji: '💌',
    buttonText: '💖 查看祝福',
    description: '一份温暖的陪伴',
  },
};
```

现在你可以访问 `http://localhost:3000/lihua` 来查看新路由！

## URL 访问方式

| 路由 | 完整 URL | 是否显示欢迎对话框 |
|------|---------|------------------|
| `/poems` | `http://localhost:3000/poems` | ✅ 是 |
| `/chen` | `http://localhost:3000/chen` | ✅ 是 |
| `/` | `http://localhost:3000/` | ✅ 是（默认为 poems） |
| 任何路由 + `?debug` | `http://localhost:3000/poems?debug` | ❌ 否（显示调试控制面板） |

## 调试模式

在任何路由后添加 `?debug` 参数以启用调试模式：

```
http://localhost:3000/poems?debug
http://localhost:3000/chen?debug
http://localhost:3000/lihua?debug
```

调试模式会显示：
- 路由选择器（快速切换不同路由）
- 添加弹窗按钮
- 开始/停止自动生成
- 清空所有弹窗
- 当前弹窗计数

## 技术细节

### 路由匹配逻辑

`getRouteFromPath()` 函数：
1. 从浏览器 URL 的 `pathname` 中提取路由名称
2. 验证路由是否存在于 `ROUTES` 配置中
3. 如果路由不存在，默认返回 `'poems'`

### 内容获取逻辑

`getContentByRoute()` 函数：
1. 根据路由名称从 `ROUTE_CONTENT_MAP` 中获取对应的内容数组
2. 如果路由不存在，默认返回 `POEMS` 数组
3. `usePopupManager` hook 根据获取的内容数组循环生成弹窗

## 常见问题

**Q: 如何修改现有路由的内容？**
A: 直接编辑 `src/hooks/usePopupManager.ts` 中对应的数组，例如修改 `CHEN_BLESSINGS` 数组。

**Q: 可以有多少个路由？**
A: 没有限制，理论上可以无限添加，但建议保持在合理数量（< 20）以提高性能。

**Q: 新添加的路由如何立即生效？**
A: 由于使用了 Bun 的热重载，编辑文件后浏览器会自动刷新，新路由立即生效。

**Q: 如何禁用某个路由？**
A: 从 `ROUTES` 对象中删除该路由配置，或从 `ROUTE_CONTENT_MAP` 中删除映射即可。

---

**最后更新**: 2025-11-02
**项目**: popups - 诗词弹窗展示系统
