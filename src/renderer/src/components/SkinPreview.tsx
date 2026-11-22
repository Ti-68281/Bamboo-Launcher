import { useEffect, useRef, useState } from 'react'
import { Sprout } from 'lucide-react'

interface SkinFaceProps {
  dataUrl?: string
  name: string
  size?: number
  round?: boolean
  className?: string
}

export function SkinFace({ dataUrl, name, size = 40, round, className = '' }: SkinFaceProps) {
  const [is64, setIs64] = useState(false)
  if (!dataUrl) {
    return (
      <span
        className={`skin-face fallback ${round ? 'round' : ''} ${className}`}
        style={{ width: size, height: size, fontSize: Math.max(10, size * 0.32) }}
        title={name}
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    )
  }
  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: round ? '36%' : 10,
  }
  return (
    <span className={`skin-face ${round ? 'round' : ''} ${className}`} style={style} title={name}>
      <img
        src={dataUrl}
        alt=""
        draggable={false}
        onLoad={(event) => {
          const img = event.currentTarget
          setIs64(img.naturalHeight >= 64)
        }}
        style={{
          width: size * 8,
          height: 'auto',
          left: -size,
          top: -size,
          imageRendering: 'pixelated',
        }}
      />
      {is64 && (
        <img
          src={dataUrl}
          alt=""
          draggable={false}
          className="skin-face-hat"
          style={{
            width: size * 8,
            height: 'auto',
            left: -size * 5,
            top: -size,
            imageRendering: 'pixelated',
          }}
        />
      )}
    </span>
  )
}

interface SkinPreviewProps {
  dataUrl?: string
  model?: 'classic' | 'slim'
  name: string
  width?: number
  height?: number
}

export function SkinPreview({
  dataUrl,
  model = 'classic',
  name,
  width = 192,
  height = 288,
}: SkinPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!dataUrl || !canvasRef.current) return
    const image = new Image()
    image.onload = () => {
      setLoaded(true)
      drawSkin(canvasRef.current, image, model)
    }
    image.onerror = () => setLoaded(false)
    image.src = dataUrl
  }, [dataUrl, model])

  if (!dataUrl) {
    return (
      <div className="skin-preview-empty" style={{ width, height }}>
        <div className="skin-preview-silhouette">
          <Sprout size={38} strokeWidth={1.2} />
        </div>
        <span>{name}</span>
        <small>还没有上传皮肤</small>
      </div>
    )
  }

  return (
    <div className="skin-preview" style={{ width, height }}>
      <canvas ref={canvasRef} width={width} height={height} aria-label={`${name} 的皮肤预览`} />
      {!loaded && <div className="skin-preview-loading" />}
    </div>
  )
}

function drawSkin(canvas: HTMLCanvasElement | null, image: HTMLImageElement, model: 'classic' | 'slim') {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const width = canvas.width
  const height = canvas.height
  ctx.clearRect(0, 0, width, height)

  // Ground glow and shadow
  const glow = ctx.createRadialGradient(width / 2, height - 32, 2, width / 2, height - 40, width * 0.42)
  glow.addColorStop(0, 'rgba(165, 218, 149, 0.22)')
  glow.addColorStop(1, 'rgba(165, 218, 149, 0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, height - 120, width, 120)
  ctx.save()
  ctx.translate(width / 2, height - 22)
  ctx.scale(1, 0.25)
  const shadow = ctx.createRadialGradient(0, 0, 1, 0, 0, 44)
  shadow.addColorStop(0, 'rgba(0, 0, 0, 0.45)')
  shadow.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = shadow
  ctx.beginPath()
  ctx.arc(0, 0, 44, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  const scale = Math.min((width * 0.64) / 16, (height * 0.82) / 34)
  const armWidth = model === 'slim' ? 3 : 4
  const charWidth = 8 + armWidth * 2
  const charHeight = 32
  const originX = (width - charWidth * scale) / 2
  const originY = height - 34 - charHeight * scale + 12
  const hasOverlay = image.naturalHeight >= 64
  ctx.imageSmoothingEnabled = false

  const draw = (
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    flip = false,
  ) => {
    ctx.save()
    if (flip) {
      ctx.translate(dx + sw * scale, dy)
      ctx.scale(-1, 1)
      ctx.drawImage(image, sx, sy, sw, sh, 0, 0, sw * scale, sh * scale)
    } else {
      ctx.drawImage(image, sx, sy, sw, sh, dx, dy, sw * scale, sh * scale)
    }
    ctx.restore()
  }

  const bodyX = originX + armWidth * scale
  const headX = bodyX
  const rightArmX = originX
  const leftArmX = bodyX + 8 * scale
  let y = originY

  // head has a 0.5 pixel forward offset for a bit of depth
  const headY = y - 2
  const bodyY = y + 8 * scale
  const legsY = bodyY + 12 * scale

  // legs
  draw(4, 20, 4, 12, bodyX, legsY)
  if (hasOverlay) draw(4, 36, 4, 12, bodyX, legsY)
  if (hasOverlay) draw(20, 52, 4, 12, bodyX + 4 * scale, legsY)
  else draw(4, 20, 4, 12, bodyX + 4 * scale, legsY, true)
  if (hasOverlay) draw(4, 52, 4, 12, bodyX + 4 * scale, legsY)

  // body
  draw(20, 20, 8, 12, bodyX, bodyY)
  if (hasOverlay) draw(20, 36, 8, 12, bodyX, bodyY)

  // right arm (viewer left)
  draw(44, 20, armWidth, 12, rightArmX, bodyY)
  if (hasOverlay) draw(44, 36, armWidth, 12, rightArmX, bodyY)

  // left arm (viewer right)
  if (hasOverlay) draw(36, 52, armWidth, 12, leftArmX, bodyY)
  else draw(44, 20, armWidth, 12, leftArmX, bodyY, true)
  if (hasOverlay) draw(52, 52, armWidth, 12, leftArmX, bodyY)

  // head
  draw(8, 8, 8, 8, headX, headY)
  // facial shading on the side
  const shade = ctx.createLinearGradient(headX, headY, headX + 8 * scale, headY)
  shade.addColorStop(0, 'rgba(0,0,0,0.16)')
  shade.addColorStop(0.45, 'rgba(0,0,0,0)')
  shade.addColorStop(1, 'rgba(0,0,0,0.1)')
  ctx.fillStyle = shade
  ctx.fillRect(headX, headY, 8 * scale, 8 * scale)
  if (hasOverlay) draw(40, 8, 8, 8, headX, headY)

  // Hair-like top highlight, purely decorative
  const topLight = ctx.createLinearGradient(headX, headY, headX, headY + 8 * scale)
  topLight.addColorStop(0, 'rgba(255,255,255,0.12)')
  topLight.addColorStop(0.45, 'rgba(255,255,255,0)')
  ctx.fillStyle = topLight
  ctx.fillRect(headX, headY, 8 * scale, 8 * scale)
}
