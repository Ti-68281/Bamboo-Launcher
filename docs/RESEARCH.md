# Bamboo 启动器前期调研

> 调研时间：2026-10-25  
> 目标：了解主流 Minecraft Java 版启动器的功能边界、交互取向与技术路线，为 Bamboo 的功能取舍提供依据。

## 1. 调研范围与方法

本轮调研覆盖两类对象：

1. **玩家侧主流启动器**：PCL2 / PCL CE、BakaXL、HMCL、XMCL、Prism Launcher、ATLauncher、GDLauncher、MultiMC、Mojang 官方启动器。
2. **上游能力提供方**：Mojang 版本元数据、Forge / Fabric / Quilt / NeoForge / LiteLoader 的安装来源、Modrinth 与 CurseForge 的公开 API、authlib-injector 的本地登录/皮肤规范、BMCLAPI 镜像。

方法：阅读各项目的官方站点、功能页、源码仓库与使用文档，结合本机实际操作验证关键路径。功能矩阵中的“部分”表示需要插件、外部服务、特定平台或并未在所有场景中提供。

## 2. 横向功能矩阵

| 启动器 | 平台与技术 | 源码 | 多实例 | 账户 | Mod / 整合包 | Java 管理 | 联机 | 崩溃分析 | UI 取向 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **PCL2** | Windows / .NET | 闭源；PCL CE 社区版开源 | 支持版本隔离 | 微软、离线、外置 | CurseForge、Modrinth、整合包、模组管理 | 自动下载与匹配 | 部分（依赖外部方案） | 有崩溃分析 | 高密度、卡片化、极简易上手 |
| **BakaXL** | Windows / .NET | 闭源 | 支持 | 微软、离线、外置 | CurseForge、整合包、模组 | 支持 | 有联机入口 / 网络服务 | 有 | 活泼、动效丰富、强品牌化 |
| **HMCL** | Windows / macOS / Linux / JavaFX | 开源（GPLv3） | 支持 | 微软、离线、authlib-injector | CurseForge、Modrinth、整合包、模组 | 自动检测与下载 | 服务器列表，非内置穿透 | 有 | 实用、信息密度高、跨平台 |
| **XMCL** | Windows / macOS / Linux / Electron | 开源 | 支持 | 微软、离线、外置 | CurseForge、Modrinth、整合包、资源包 | 支持 | 服务器与多人入口 | 有 | Web 化、现代、动画和可定制 |
| **Prism Launcher** | Windows / macOS / Linux / Qt | 开源（GPLv3） | 强隔离 | 微软、离线 | Modrinth、CurseForge、FTB、整合包导入导出 | 自动检测 | 无内置穿透 | 部分 | 克制、工具化、信息密度高 |
| **ATLauncher** | Windows / macOS / Linux / Java | 开源 | 支持 | 微软、离线 | 自有整合包库、Modrinth、CurseForge | 支持 | 无内置穿透 | 部分 | 传统桌面、功能优先 |
| **GDLauncher** | Windows / macOS / Linux / Electron | 开源项目为主 | 支持 | 微软、离线 | 整合包 / CurseForge 导向 | 支持 | 无内置穿透 | 部分 | 网页式、整合包友好 |
| **MultiMC** | Windows / macOS / Linux / Qt | 开源 | 强隔离、实例导入导出 | 离线为主 | 依赖插件 / 手动 | 手动或插件 | 无 | 无 | 极简、工具化 |
| **Mojang 官方** | 全平台原生 | 闭源 | 无 | 微软 | 无 | 自动 | 无 | 无 | 极简、只负责原版 |

## 3. 关键观察

### 3.1 核心安装与启动已是“基础设施”

主流启动器都把下列能力视为基线：

- 从 Mojang `version_manifest_v2.json` 获取版本；
- 下载 client jar、libraries、assets；
- 解析继承版本（Forge / Fabric 等）；
- 用正确的 Java 与参数启动；
- 多实例与版本隔离。

这意味着新启动器不应把“能启动原版”当作卖点，而应在**体验、可靠性、社区生态与差异化能力**上竞争。Bamboo 因此直接使用 xmcl 的成熟安装/启动实现，把工程重心放在 UI、实例模型、任务体验、联机、皮肤与诊断上。

### 3.2 账户体系存在平台壁垒

- 微软登录需要 OAuth 应用；各启动器通常使用自己的 Azure 应用或设备代码流。
- 离线账户在离线服务器生态中仍然重要。
- 外置登录（authlib-injector）是连接第三方皮肤站与服务器的标准方案。
- 离线皮肤若要进入游戏，通常需要外置登录、皮肤补丁或 mod；原版客户端本身没有“本地皮肤文件”入口。

Bamboo 的选择：

- 离线账户完整支持并生成与离线服务端一致的 UUID；
- Microsoft 使用标准设备代码流，但不硬编码他人的 Azure 客户端 ID，要求用户配置一次；
- 离线皮肤改为**本地 Yggdrasil + authlib-injector**，避免依赖某个皮肤站，同时保留“可在实例中关闭”的退路。

### 3.3 Mod 平台是分裂的

- **Modrinth** 提供开放、无需密钥的公开 API，适合作为默认体验；
- **CurseForge** 的官方 API 需要 API Key，且部分作者禁止第三方下载；
- 整合包格式也分裂为 Modrinth `.mrpack`、CurseForge `manifest.json`、MultiMC / Prism `mmc-pack.json`。

Bamboo 的选择：

- Modrinth 开箱即用；
- CurseForge 通过可配置 API Key 接入，缺失时给出明确引导而非静默失败；
- 整合包解析三种格式，拖入即自动创建独立实例；
- 对必需依赖做递归安装，降低“装了一个 mod 启动崩溃”的概率。

### 3.4 Java 是启动失败的头号来源

玩家最常见的启动问题包括：

- Java 版本过高/过低；
- 32 位 Java 无法分配足够内存；
- 多版本 Java 混用；
- 旧版 Forge 安装器需要特定 Java。

Bamboo 的选择：

- 扫描常见目录并缓存结果；
- 启动前读取版本 JSON 的 `javaVersion.majorVersion`；
- 无匹配时自动下载 Mojang 运行时；
- 覆盖 Java 8 / 16 / 17 / 21 / 25，并跟随 Minecraft 26.x 的 Java 25 变化。

### 3.5 联机不是“启动器的一键功能”，而是网络问题

主流启动器大多只提供服务器列表或外部联机方案。真正的一键联机通常依赖第三方中继（例如 Terracotta 类服务），存在可用性、隐私与延迟问题。

Bamboo 不做第三方中继，而是解决**同一局域网**的真实痛点：

- 自动监听 Minecraft LAN 广播；
- 从 `latest.log` 自动识别“Open to LAN”的随机端口；
- 展示本机内网地址与可复制的 `IP:端口`；
- 对支持 UPnP 的路由器尝试 TCP 端口映射，并明确提示 CGNAT/防火墙限制。

这是更诚实、也更符合“本地联机”原始需求的方案。

### 3.6 UI 趋势：从“工具”走向“空间”

- PCL2 以极低学习成本和高信息密度取胜；
- BakaXL 强调品牌、动效与个性；
- XMCL 用 Web 技术实现现代视觉；
- Prism / MultiMC 则保持工具化。

Bamboo 的定位是“安静、通透、可久坐”的第三方启动器：深色竹青、毛玻璃、低对比背景、克制的动效、可隐藏的功能入口。它不追求信息密度最大化，而是让下载、启动、装 mod 这些高频动作路径更短。

## 4. Bamboo 功能映射

| 调研结论 | Bamboo 落地 |
| --- | --- |
| 核心安装是基线 | Mojang 清单 + xmcl installer + 官方/BMCLAPI 双源 |
| 加载器安装复杂 | 下载页与实例页双入口；Fabric/Forge/Quilt/NeoForge/LiteLoader |
| Mod 平台分裂 | Modrinth 默认 + CurseForge API Key |
| 整合包格式分裂 | mrpack / CurseForge / MultiMC 拖入安装 |
| Java 是主要故障源 | 扫描、下载、版本映射、启动前自动选择 |
| 多实例是刚需 | 独立 gameDir + 共享 assets/libraries |
| 崩溃信息难读 | 规则库 + 模组 jar 元数据 + 中文建议 |
| 联机是网络问题 | LAN 广播 + 日志端口 + UPnP + 明确边界 |
| 玩家想“自己的样子” | 离线皮肤本地桥接 + 皮肤预览 |
| 不同玩家要不同功能 | 7 个功能入口可隐藏 + 侧栏收起 + 减少动效 |

## 5. 设计取舍与风险

1. **不硬编码微软客户端 ID**：避免使用未授权凭据；代价是首次配置成本。
2. **CurseForge 不绕过授权**：没有 API Key 时只提示并允许 Modrinth，不抓取网页。
3. **离线皮肤使用 javaagent**：兼容性好，但个别服务端/整合包可能限制 agent；提供实例级开关。
4. **UPnP 不保证公网可达**：不宣称“必然联机成功”，只提供映射和诊断信息。
5. **不内置第三方中继**：隐私与长期可用性不可控；当前版本只做局域网。
6. **加载器版本由官方元数据决定**：Minecraft 最新快照可能暂时没有对应加载器，UI 会显示错误而不是假装成功。

## 6. 参考来源

### 启动器

- PCL2 / PCL CE 版本差异（第三方整理）：[pcl2.ijinshan.com](https://pcl2.ijinshan.com/pages/download/variants/pcl1-pcl3/)
- PCL CE 社区源码：[github.com/PCL-Community/PCL2-CE](https://github.com/PCL-Community/PCL2-CE)
- BakaXL 官网：[bakaxl.com](https://www.bakaxl.com/)
- BakaXL 使用指南：[guidemc.github.io](https://guidemc.github.io/Launcher/3.BakaXL/1.Guide)
- HMCL 官网：[hmcl.cc](https://hmcl.cc/cn/index.html)
- HMCL 手册：[hmcl.cc/guides.html](https://hmcl.cc/guides.html)
- XMCL 功能页：[xmcl.app/features](https://www.xmcl.app/en/features/)
- XMCL Core 文档：[xmcl.app/core](https://xmcl.app/en/core/)
- Prism Launcher：[prismlauncher.org](https://prismlauncher.org/)
- ATLauncher：[atlauncher.com/about](https://atlauncher.com/about)
- GDLauncher：[gdlauncher.com](https://gdlauncher.com/)
- MultiMC：[multimc.org](https://multimc.org/)

### 技术与平台

- Minecraft 版本清单：[piston-meta.mojang.com](https://piston-meta.mojang.com/mc/game/version_manifest_v2.json)
- Mojang Java 运行时清单：[launchermeta.mojang.com](https://launchermeta.mojang.com/v1/products/java-runtime/2ec0cc96c44e5a76b9c8b7c39df7210883d12871/all.json)
- Modrinth API 文档：[docs.modrinth.com](https://docs.modrinth.com/)
- CurseForge API 文档：[docs.curseforge.com](https://docs.curseforge.com/)
- Microsoft 设备代码流：[learn.microsoft.com](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-device-code)
- authlib-injector 规范：[github.com/yushijinhun/authlib-injector](https://github.com/yushijinhun/authlib-injector)
- authlib-injector Wiki：[yushijinhun.github.io/authlib-injector](https://yushijinhun.github.io/authlib-injector/)
- BMCLAPI 文档：[bmclapidoc.bangbang93.com](https://bmclapidoc.bangbang93.com/)
- xmcl 安装/启动库：[github.com/Voxelum/minecraft-launcher-core-node](https://github.com/Voxelum/minecraft-launcher-core-node)
- Fabric Meta：[meta.fabricmc.net](https://meta.fabricmc.net/)
- Quilt Meta：[meta.quiltmc.org](https://meta.quiltmc.org/)
- Forge Maven：[maven.minecraftforge.net](https://maven.minecraftforge.net/)
