# 📋 Ecommerce-requerimientos (Matriz de Requerimientos & Simulador PMV)

Aplicación interactiva desarrollada en **React**, **TypeScript** y **Vite**, que expone la matriz de especificaciones funcionales, casos de uso de negocio y un simulador interactivo para validar las reglas transaccionales del Producto Mínimo Viable (PMV) del ecosistema multi-tenant.

---

## 🌐 URLs de la Plataforma

| Servicio | URL Pública | Plataforma |
| :--- | :--- | :--- |
| **Simulador PMV & Matriz en Vivo** | [https://requerimientos-beige.vercel.app](https://requerimientos-beige.vercel.app) | React SPA |

---

## 🚀 Alcance Funcional del PMV

1. **Matriz de Requerimientos:**
   - Detalle de requerimientos funcionales (RF) y no funcionales (RNF) ordenados por prioridad MoSCoW.
   - Criterios de aceptación para transacciones atómicas de stock, pasarelas de pago chilenas y aislamiento de tiendas.
2. **Simulador de Reglas de Negocio:**
   - Simulación de compras concurrentes para verificar el comportamiento anti-sobreventa con `db.batch()` en Cloudflare D1.
   - Validación de firmas criptográficas HMAC para webhooks de Mercado Pago y Fintoc.
   - Simulación de conmutación de tenants (`blackdrop` café vs. `pcfactory` hardware gamer).
3. **Casos de Prueba Verificables:**
   - Casos de prueba automatizados vinculados con la suite de [Bruno (`Ecommerce-bruno`)](https://github.com/start-level-cl/Ecommerce-bruno).

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo en Vite (puerto 5174)
pnpm run dev

# Compilar bundle de producción
pnpm run build
```

---

## 🔄 Integración Continua (CI/CD)

El workflow `.github/workflows/ci.yml` ejecuta ante cada push a `develop` y `main`:
1. Compilación del bundle estático con Vite (`pnpm run build`).
2. Comprobación de disponibilidad HTTP 200 en el portal en vivo.
3. Emisión de informe en `$GITHUB_STEP_SUMMARY`.
