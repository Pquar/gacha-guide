import { clsx } from 'clsx'
import { Image } from '~/components/ui/image'

export function HeroCover({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="break-inside-avoid">
      <div className="relative">
        <Image src={image} alt={alt} width={1000} height={1500} className="w-full rounded-r-md" />
      </div>
    </div>
  )
}
