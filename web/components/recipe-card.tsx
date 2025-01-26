import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface RecipeCardProps {
  title: string
  rating: number
}

export function RecipeCard({ title, rating }: RecipeCardProps) {
  return (
    <div className="absolute bottom-16 right-32 bg-white rounded-xl shadow-lg p-3 z-10">
      <div className="flex flex-col gap-2">
        <div className="relative w-[120px] h-[80px] rounded-lg overflow-hidden">
          <Image src="/assets/pad-thai.jpg" alt="Pad Thai" fill className="object-cover" sizes="120px" />
        </div>
        <div className="space-y-1">
          <h3 className="font-everbright font-medium text-sm">{title}</h3>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
            ))}
          </div>
          <Button size="sm" className="w-full bg-[#42B5E7] text-white text-xs hover:bg-[#3AA1D1] rounded-full h-8">
            ADD TO MEAL PLAN
          </Button>
        </div>
      </div>
    </div>
  )
}

