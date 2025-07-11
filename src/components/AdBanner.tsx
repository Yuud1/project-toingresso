import React from "react"
import { ExternalLink } from "lucide-react"
import axios from "axios"

const AdBanner: React.FC = () => {
  const [banner, setBanner] = React.useState<any>(null);

  React.useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_BANNER_GET}`)
      .then((res) => {
        if (res.data.banners && res.data.banners.length > 0) {
          setBanner(res.data.banners[0]);
        }
      })
      .catch((err) => console.error("Erro ao buscar banner:", err));
  }, []);

  if (!banner) return null;

  return (
    <div className="w-full">
      <a
        href={banner.redirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="relative">
          <img
            src={banner.urlImage || "/placeholder.svg"}
            alt="Banner promocional"
            className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
              <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-medium">Clique para acessar</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Patrocinado
        </div>
      </a>
    </div>
  )
}

export default AdBanner
