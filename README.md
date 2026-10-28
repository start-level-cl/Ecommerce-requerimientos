# 📋 E-Commerce Multi-Tenant - Matriz de Requerimientos y Prototipo (PMV)

Este repositorio contiene la aplicación de **especificación de requerimientos de software (PMV)**, matriz funcional interactiva y simulador de trazabilidad transaccional, diseñada con el mismo estándar que `Flowex-requerimiento`.

---

## 🌐 URLs de Acceso en Vivo (Vercel)

* **Portal de Requerimientos y Prototipo PMV en Vivo:**  
  👉 **[https://requerimientos-beige.vercel.app](https://requerimientos-beige.vercel.app)**
* **Documentación Técnica & API Reference (Scalar en Vivo):**  
  👉 **[https://docs-nu-three-75.vercel.app](https://docs-nu-three-75.vercel.app)**
* **Repositorios del Ecosistema en GitHub:**  
  * Requerimientos: [start-level-cl/ecommerce-requerimientos](https://github.com/start-level-cl/ecommerce-requerimientos)
  * API Docs: [start-level-cl/ecommerce-docs](https://github.com/start-level-cl/ecommerce-docs)
  * Backend API: [start-level-cl/ecommerce-backend](https://github.com/start-level-cl/ecommerce-backend)
  * Frontend Store: [start-level-cl/ecommerce-frontend](https://github.com/start-level-cl/ecommerce-frontend)

---

## 🎯 Contenido y Módulos

1. **Matriz de Requerimientos Funcionales (RF-01 a RF-12):**
   - **Multi-Tenancy:** Aislamiento lógico, monedas múltiples y aprovisionamiento en caliente.
   - **Catálogo & Inventario:** CRUD de productos, categorías y stock.
   - **Checkout & Carrito:** Reserva atómica anti-sobreventa con `db.batch()` en Cloudflare D1.
   - **Pasarelas de Pago:** Integración de Mercado Pago (Checkout Pro) y Fintoc (Transferencia Bancaria).
   - **Seguridad:** Firmas criptográficas HMAC-SHA256 con `timingSafeEqual` y control de ventanas temporales.
   - **Auditoría:** Registro de transacciones y estados de orden.

2. **Simulador Transaccional en Vivo:**
   - Permite recorrer de punta a punta el ciclo de vida de una orden:
     `Tenant -> Selección de Producto -> Reserva Atómica D1 -> Webhook HMAC -> Asentamiento`.

3. **Criterios de Aceptación y QA:**
   - Cada requerimiento cuenta con sus criterios de verificación y el archivo fuente de implementación asociado.

---

## 🚀 Cómo Actualizar los Requerimientos

Cualquier cambio en la matriz de requerimientos o en el simulador se despliega automáticamente en Vercel con un commit a `main`:

```bash
git add .
git commit -m "feat: actualizar requerimientos y matriz de aceptación"
git push origin main
```
