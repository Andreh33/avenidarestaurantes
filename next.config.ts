import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirecciones del sitio antiguo (§13.3) — activas cuando el dominio
  // restaurantesavenida.com apunte aquí.
  async redirects() {
    return [
      { source: "/inicio", destination: "/", permanent: true },
      {
        source: "/plaza-lavadero",
        destination: "/restaurantes/lavadero",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
