import { useEffect, useRef, useState } from 'react'
import { Leaf, Loader2, UploadCloud } from 'lucide-react'
import { useBamboo, messageOf } from '../store'

export function DropOverlay() {
  const [active, setActive] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [message, setMessage] = useState('')
  const dragDepth = useRef(0)
  const addToast = useBamboo((s) => s.addToast)
  const refresh = useBamboo((s) => s.refresh)

  useEffect(() => {
    const hasFiles = (event: DragEvent) =>
      Array.from(event.dataTransfer?.types ?? []).includes('Files')

    const onDragEnter = (event: DragEvent) => {
      if (!hasFiles(event)) return
      event.preventDefault()
      dragDepth.current++
      setActive(true)
    }
    const onDragOver = (event: DragEvent) => {
      if (!hasFiles(event)) return
      event.preventDefault()
      if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy'
    }
    const onDragLeave = (event: DragEvent) => {
      if (!hasFiles(event)) return
      dragDepth.current = Math.max(0, dragDepth.current - 1)
      if (dragDepth.current === 0) setActive(false)
    }
    const onDrop = async (event: DragEvent) => {
      if (!hasFiles(event)) return
      event.preventDefault()
      dragDepth.current = 0
      const files = Array.from(event.dataTransfer?.files ?? [])
      if (!files.length) {
        setActive(false)
        return
      }
      setProcessing(true)
      setMessage('')
      try {
        const filePath = window.bamboo.getPathForFile(files[0])
        if (!filePath) throw new Error('无法获取文件路径，请改用页面内按钮选择文件。')
        const result = await window.bamboo.handleDrop(filePath)
        setMessage(result.message)
        addToast({
          kind: 'success',
          title: result.kind === 'modpack' ? '整合包已接管' : result.kind === 'skin' ? '皮肤已接管' : '文件已接管',
          message: result.message,
        })
        if (files.length > 1) {
          addToast({
            kind: 'info',
            title: '一次一个就好',
            message: '其余文件未处理，稍后可以再拖入。',
          })
        }
        setTimeout(() => {
          setActive(false)
          setProcessing(false)
          void refresh()
        }, 900)
      } catch (error) {
        addToast({ kind: 'error', title: '这个文件没有被种下', message: messageOf(error) })
        setActive(false)
        setProcessing(false)
      }
    }
    window.addEventListener('dragenter', onDragEnter)
    window.addEventListener('dragover', onDragOver)
    window.addEventListener('dragleave', onDragLeave)
    window.addEventListener('drop', onDrop)
    return () => {
      window.removeEventListener('dragenter', onDragEnter)
      window.removeEventListener('dragover', onDragOver)
      window.removeEventListener('dragleave', onDragLeave)
      window.removeEventListener('drop', onDrop)
    }
  }, [addToast, refresh])

  if (!active) return null
  return (
    <div className="drop-overlay">
      <div className="drop-glow" />
      <div className={`drop-card ${processing ? 'processing' : ''}`}>
        <div className="drop-leaf leaf-a">
          <Leaf size={40} strokeWidth={1.2} />
        </div>
        <div className="drop-leaf leaf-b">
          <Leaf size={26} strokeWidth={1.2} />
        </div>
        <div className="drop-icon">
          {processing ? <Loader2 size={30} className="spin" /> : <UploadCloud size={30} />}
        </div>
        <h2>{processing ? '正在辨认这枚种子…' : '松手，把它种进竹林'}</h2>
        <p>
          {processing
            ? message || '检查文件格式、游戏版本与加载器…'
            : '整合包会自动安装；模组会放进当前实例；PNG 会设置为离线皮肤。'}
        </p>
        <div className="drop-formats">
          <span>.mrpack</span>
          <span>.zip</span>
          <span>.jar</span>
          <span>.png</span>
        </div>
      </div>
    </div>
  )
}
