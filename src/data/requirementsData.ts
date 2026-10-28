export interface Requirement {
  id: string;
  code: string;
  title: string;
  category: 'Multi-Tenancy' | 'Catálogo & Inventario' | 'Checkout & Carrito' | 'Pasarelas de Pago' | 'Seguridad & Webhooks' | 'Operación & Auditoría';
  priority: 'Alta' | 'Media' | 'Crítica';
  status: 'Completado' | 'En Validación' | 'Planificado';
  description: string;
  implementationDetail: string;
  acceptanceCriteria: string[];
  referenceModule: string;
}

export const REQUIREMENTS: Requirement[] = [
  {
    id: 'rf-01',
    code: 'RF-01',
    title: 'Aislamiento Multi-Tenant en Edge (Cloudflare D1)',
    category: 'Multi-Tenancy',
    priority: 'Crítica',
    status: 'Completado',
    description: 'La plataforma debe soportar múltiples tiendas/marcas alojadas en el mismo backend, garantizando que los datos de catálogo y ventas estén particionados lógicamente por tenant_slug.',
    implementationDetail: 'Base de datos Cloudflare D1 con índice compuesto (tenant_slug). Consultas acotadas por tienda sin cruce de datos.',
    acceptanceCriteria: [
      'Al consultar /api/tenants/:slug/products solo se retornan productos de esa tienda.',
      'Las órdenes de una tienda no son visibles ni accesibles por otra tienda.',
      'Soporte para monedas diferenciadas (USD, CLP, EUR) por tienda.'
    ],
    referenceModule: 'backend/src/db/repository.ts'
  },
  {
    id: 'rf-02',
    code: 'RF-02',
    title: 'Aprovisionamiento de Tiendas en Caliente',
    category: 'Multi-Tenancy',
    priority: 'Alta',
    status: 'Completado',
    description: 'Permitir registrar nuevas tiendas al vuelo mediante API y formulario visual sin requerir despliegues ni migraciones manuales.',
    implementationDetail: 'Endpoint POST /api/tenants que valida slug y parámetros básicos e inserta el nuevo registro en D1.',
    acceptanceCriteria: [
      'Validación de slug en minúsculas y caracteres alfanuméricos.',
      'Inmediata disponibilidad de la tienda para cargar catálogo y recibir pedidos.',
      'Aparición automática en el selector de tiendas del frontend.'
    ],
    referenceModule: 'backend/src/index.ts'
  },
  {
    id: 'rf-03',
    code: 'RF-03',
    title: 'Catálogo de Productos y Filtro por Categorías',
    category: 'Catálogo & Inventario',
    priority: 'Alta',
    status: 'Completado',
    description: 'Gestión completa de productos con título, precio, stock, imagen, categoría y descripción.',
    implementationDetail: 'CRUD de productos vía Hono y D1 con filtros por query params ?category=... y orden descendente.',
    acceptanceCriteria: [
      'Visualización en cuadrícula responsiva con badges de categoría y stock.',
      'Filtros rápidos mediante pills interactivos de categorías.',
      'Actualización inmediata al crear o modificar un producto.'
    ],
    referenceModule: 'frontend/src/App.tsx'
  },
  {
    id: 'rf-04',
    code: 'RF-04',
    title: 'Carrito de Compras Reactivo',
    category: 'Checkout & Carrito',
    priority: 'Alta',
    status: 'Completado',
    description: 'Carrito de compras flotante con ajuste de cantidades, validación de stock máximo disponible y cálculo en tiempo real de subtotales y total.',
    implementationDetail: 'Estado de carrito en React con controles de incremento y tope condicionado por el stock real reportado.',
    acceptanceCriteria: [
      'No permite agregar más unidades que las existentes en bodega.',
      'Cálculo exacto del total en la moneda del tenant activo.',
      'Limpieza automática del carrito al completar la orden o cambiar de tienda.'
    ],
    referenceModule: 'frontend/src/App.tsx'
  },
  {
    id: 'rf-05',
    code: 'RF-05',
    title: 'Reserva Atómica de Stock y Anti-Sobrevanta (db.batch)',
    category: 'Checkout & Carrito',
    priority: 'Crítica',
    status: 'Completado',
    description: 'Garantizar que compras simultáneas no generen sobreventa (overselling) del último artículo en stock.',
    implementationDetail: 'Uso de db.batch() en Cloudflare D1 ejecutando UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ? en la misma transacción atómica que el INSERT de la orden.',
    acceptanceCriteria: [
      'Si dos solicitudes compran el último ítem, una es aprobada y la otra rechazada con error de stock insuficiente.',
      'Reversión completa si cualquier ítem del carrito no cuenta con existencias.',
      'La orden se genera inicialmente con estado "pending".'
    ],
    referenceModule: 'backend/src/db/repository.ts'
  },
  {
    id: 'rf-06',
    code: 'RF-06',
    title: 'Pasarela Mercado Pago (Checkout Pro)',
    category: 'Pasarelas de Pago',
    priority: 'Alta',
    status: 'Completado',
    description: 'Integración oficial con Mercado Pago para cobros con tarjetas de crédito, débito, Redcompra, Webpay Plus y saldo MP (basado en flowEx).',
    implementationDetail: 'Llamada a POST https://api.mercadopago.com/checkout/preferences con items, back_urls, notification_url y metadata de orden.',
    acceptanceCriteria: [
      'Monto en CLP redondeado a entero sin decimales según regla de pasarela.',
      'Generación de preferenceId e initPoint para el comprador.',
      'Metadata adjunta con orderId y tenantSlug para conciliación.'
    ],
    referenceModule: 'backend/src/services/mercadopago.ts'
  },
  {
    id: 'rf-07',
    code: 'RF-07',
    title: 'Validación Criptográfica de Webhooks de Mercado Pago',
    category: 'Seguridad & Webhooks',
    priority: 'Crítica',
    status: 'Completado',
    description: 'Validar la firma HMAC-SHA256 de todas las notificaciones recibidas en el webhook antes de asentar el pago.',
    implementationDetail: 'Extracción de x-signature (ts, v1) y x-request-id; construcción de cadena canónica y verificación con crypto.timingSafeEqual.',
    acceptanceCriteria: [
      'Rechazo de solicitudes con firmas alteradas o sin secreto configurado.',
      'Comparación en tiempo constante para mitigar ataques de canal lateral.',
      'Transición automática de la orden a estado "paid".'
    ],
    referenceModule: 'backend/src/services/mercadopago.ts'
  },
  {
    id: 'rf-08',
    code: 'RF-08',
    title: 'Pasarela Fintoc (Transferencias Cuenta a Cuenta)',
    category: 'Pasarelas de Pago',
    priority: 'Alta',
    status: 'Completado',
    description: 'Integración con Fintoc para pagos directos entre cuentas bancarias chilenas sin salir del flujo de compra (basado en flowEx).',
    implementationDetail: 'Llamada a POST https://api.fintoc.com/v2/checkout_sessions con ui_mode: "embedded" y tipo bank_transfer.',
    acceptanceCriteria: [
      'Generación de sessionId y sessionToken.',
      'Soporte para los principales bancos de Chile (Banco de Chile, Santander, BCI, BancoEstado, etc.).',
      'Asignación del payment_gateway "fintoc" en el registro de la orden.'
    ],
    referenceModule: 'backend/src/services/fintoc.ts'
  },
  {
    id: 'rf-09',
    code: 'RF-09',
    title: 'Validación Criptográfica de Webhooks de Fintoc',
    category: 'Seguridad & Webhooks',
    priority: 'Crítica',
    status: 'Completado',
    description: 'Validar la firma HMAC-SHA256 del encabezado Fintoc-Signature y controlar la antigüedad del evento.',
    implementationDetail: 'Firma de <timestamp>.<cuerpo_crudo> con FINTOC_WEBHOOK_SECRET y descarte de eventos con antigüedad superior a 5 minutos.',
    acceptanceCriteria: [
      'Prevención de ataques de repetición (replay attacks) mediante ventana de 300 segundos.',
      'Verificación exitosa ante eventos payment_intent.succeeded.',
      'Consolidación del ID de transacción y marca de tiempo en la orden.'
    ],
    referenceModule: 'backend/src/services/fintoc.ts'
  },
  {
    id: 'rf-10',
    code: 'RF-10',
    title: 'Historial de Órdenes y Auditoría de Pagos',
    category: 'Operación & Auditoría',
    priority: 'Media',
    status: 'Completado',
    description: 'Panel de consulta de pedidos realizados con detalle de ítems, totales, medio de pago utilizado, estado y estampilla de tiempo.',
    implementationDetail: 'Endpoint GET /api/tenants/:slug/orders y visualización en el frontend con badges informativos por pasarela.',
    acceptanceCriteria: [
      'Visualización clara de órdenes pendientes vs pagadas.',
      'Detalle del ID de transacción emitido por la pasarela.',
      'Historial 100% aislado entre diferentes tiendas.'
    ],
    referenceModule: 'backend/src/db/repository.ts'
  },
  {
    id: 'rf-11',
    code: 'RF-11',
    title: 'Simulador de Pagos en Entorno de Desarrollo Local',
    category: 'Operación & Auditoría',
    priority: 'Media',
    status: 'Completado',
    description: 'Facilitar la iteración en local permitiendo simular la llegada de webhooks aprobados sin requerir túneles públicos o tarjetas reales.',
    implementationDetail: 'Endpoint POST /api/tenants/:slug/orders/:id/simulate-payment integrado directamente en la interfaz del checkout.',
    acceptanceCriteria: [
      'Permite confirmar y probar la transición de stock y orden en 1 solo clic en local.',
      'Fallback transparente si no hay credenciales cargadas en .dev.vars.',
      'Notificaciones toast de confirmación al usuario.'
    ],
    referenceModule: 'backend/src/index.ts'
  },
  {
    id: 'rf-12',
    code: 'RF-12',
    title: 'Documentación Técnica OpenAPI 3.1 y Portal Scalar',
    category: 'Operación & Auditoría',
    priority: 'Alta',
    status: 'Completado',
    description: 'Publicación de la especificación técnica OpenAPI 3.1.0 completa y consola interactiva de pruebas estilo flowEx.',
    implementationDetail: 'Archivos openapi.json y reference.html con motor @scalar/api-reference y guías de arquitectura.',
    acceptanceCriteria: [
      'Especificación estructurada con todos los endpoints, query params y schemas.',
      'Consola visual para probar peticiones en vivo contra el backend local.',
      'Diagramas de secuencia y flujos de arquitectura documentados en Markdown.'
    ],
    referenceModule: 'docs/openapi.json'
  }
];
