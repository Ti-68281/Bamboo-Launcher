import { Cat, Flower2, Leaf, Sprout, TreePine } from 'lucide-react'

const ICONS = { sprout: Sprout, bamboo: TreePine, panda: Cat, leaf: Leaf, flower: Flower2 }

export function InstanceGlyph({
  icon,
  size = 44,
  className = '',
}: {
  icon?: string
  size?: number
  className?: string
}) {
  if (icon?.startsWith('data:image')) {
    return (
      <span className={`instance-glyph image ${className}`} style={{ width: size, height: size }}>
        <img src={icon} alt="" draggable={false} />
      </span>
    )
  }
  const Icon = ICONS[(icon as keyof typeof ICONS) ?? 'sprout'] ?? Sprout
  return (
    <span className={`instance-glyph ${className}`} style={{ width: size, height: size }}>
      <Icon size={size * 0.46} strokeWidth={1.6} />
    </span>
  )
}
