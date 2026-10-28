import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Zap, RefreshCw, ShieldCheck } from 'lucide-react';

export const FlowSimulator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [tenant, setTenant] = useState<string>('tech-hub');
  const [product, setProduct] = useState<string>('Teclado Mecánico RGB ($89.99)');
  const [gateway, setGateway] = useState<'mercadopago' | 'fintoc'>('mercadopago');
  const [stock, setStock] = useState<number>(12);
  const [orderId, setOrderId] = useState<string>('ord_sim_9281');
  const [orderStatus, setOrderStatus] = useState<'pending' | 'paid'>('pending');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const resetFlow = () => {
    setStep(1);
    setOrderStatus('pending');
    setStock(12);
  };

  const executeReservation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setStock((prev) => Math.max(0, prev - 1));
      setOrderId('ord_' + Math.random().toString(36).substring(2, 10));
      setStep(3);
      setIsProcessing(false);
    }, 600);
  };

  const executeWebhook = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setOrderStatus('paid');
      setStep(4);
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f0f6fc' }}>
            Simulador de Trazabilidad Transaccional en Vivo
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#8b949e' }}>
            Prueba cómo interactúan los requerimientos de Multi-Tenancy, D1 Batch y Webhooks HMAC paso a paso.
          </p>
        </div>
        <button className="btn-secondary" onClick={resetFlow} style={{ fontSize: '0.8rem' }}>
          <RefreshCw size={14} /> Reiniciar Simulación
        </button>
      </div>

      {/* Stepper visual */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem', marginBottom: '2rem' }}>
        <div style={{ background: step >= 1 ? 'rgba(249,115,22,0.15)' : '#0d1117', border: step >= 1 ? '1px solid #f97316' : '1px solid #30363d', padding: '0.8rem', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.72rem', color: step >= 1 ? '#fb923c' : '#8b949e', fontWeight: 700 }}>PASO 1</div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Seleccionar Tienda</div>
        </div>
        <div style={{ background: step >= 2 ? 'rgba(249,115,22,0.15)' : '#0d1117', border: step >= 2 ? '1px solid #f97316' : '1px solid #30363d', padding: '0.8rem', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.72rem', color: step >= 2 ? '#fb923c' : '#8b949e', fontWeight: 700 }}>PASO 2</div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Reserva Atómica D1</div>
        </div>
        <div style={{ background: step >= 3 ? 'rgba(249,115,22,0.15)' : '#0d1117', border: step >= 3 ? '1px solid #f97316' : '1px solid #30363d', padding: '0.8rem', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.72rem', color: step >= 3 ? '#fb923c' : '#8b949e', fontWeight: 700 }}>PASO 3</div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Pasarela & Webhook</div>
        </div>
        <div style={{ background: step >= 4 ? 'rgba(34,197,94,0.15)' : '#0d1117', border: step >= 4 ? '1px solid #22c55e' : '1px solid #30363d', padding: '0.8rem', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.72rem', color: step >= 4 ? '#4ade80' : '#8b949e', fontWeight: 700 }}>PASO 4</div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Orden Asentada</div>
        </div>
      </div>

      {/* Contenido interactivo según el paso */}
      {step === 1 && (
        <div style={{ background: '#0d1117', padding: '1.5rem', borderRadius: '10px', border: '1px solid #21262d' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.8rem' }}>1. Configuración de Tienda y Producto</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#8b949e', marginBottom: '0.3rem' }}>Tienda (Tenant)</label>
              <select value={tenant} onChange={(e) => setTenant(e.target.value)} style={{ width: '100%' }}>
                <option value="tech-hub">tech-hub (Tech Hub Store - USD)</option>
                <option value="moda-urbana">moda-urbana (Moda Urbana - CLP)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#8b949e', marginBottom: '0.3rem' }}>Producto a Comprar</label>
              <select value={product} onChange={(e) => setProduct(e.target.value)} style={{ width: '100%' }}>
                <option value="Teclado Mecánico RGB ($89.99)">Teclado Mecánico RGB ($89.99)</option>
                <option value="Monitor UltraWide 34 ($499.00)">Monitor UltraWide 34 ($499.00)</option>
                <option value="Hoodie Oversize ($65.00)">Hoodie Oversize ($65.00)</option>
              </select>
            </div>
          </div>
          <button className="btn-primary" onClick={() => setStep(2)}>
            Continuar a Checkout <ArrowRight size={15} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ background: '#0d1117', padding: '1.5rem', borderRadius: '10px', border: '1px solid #21262d' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.8rem' }}>2. Selección de Pasarela y Transacción Atómica</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#8b949e', marginBottom: '0.3rem' }}>Pasarela de Pago</label>
              <select value={gateway} onChange={(e: any) => setGateway(e.target.value)} style={{ width: '100%' }}>
                <option value="mercadopago">Mercado Pago (Checkout Pro - Tarjetas/Webpay)</option>
                <option value="fintoc">Fintoc (Transferencia Bancaria Directa)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#8b949e', marginBottom: '0.3rem' }}>Stock Actual en D1</label>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4ade80', paddingTop: '0.4rem' }}>
                {stock} unidades disponibles
              </div>
            </div>
          </div>

          <div style={{ background: '#161b22', padding: '0.9rem', borderRadius: '8px', marginBottom: '1.2rem', fontSize: '0.82rem', border: '1px solid #30363d' }}>
            <span style={{ color: '#fb923c', fontWeight: 700 }}>Operación SQL db.batch():</span>
            <pre style={{ color: '#8b949e', marginTop: '0.3rem', fontSize: '0.78rem' }}>
              {`UPDATE products SET stock = stock - 1 WHERE id = 1 AND stock >= 1;\nINSERT INTO orders (id, tenant_slug, status) VALUES ('${orderId}', '${tenant}', 'pending');`}
            </pre>
          </div>

          <button className="btn-primary" onClick={executeReservation} disabled={isProcessing}>
            <Zap size={15} /> {isProcessing ? 'Ejecutando db.batch() en D1...' : 'Confirmar Reserva en D1'}
          </button>
        </div>
      )}

      {step === 3 && (
        <div style={{ background: '#0d1117', padding: '1.5rem', borderRadius: '10px', border: '1px solid #21262d' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem' }}>3. Simulación del Webhook de {gateway === 'mercadopago' ? 'Mercado Pago' : 'Fintoc'}</h4>
          <p style={{ fontSize: '0.85rem', color: '#8b949e', marginBottom: '1.2rem' }}>
            La orden <strong>{orderId}</strong> está registrada en estado <span className="badge badge-orange">{orderStatus.toUpperCase()}</span> con stock reservado ({stock} restantes).
          </p>

          <div style={{ background: '#161b22', padding: '0.9rem', borderRadius: '8px', marginBottom: '1.2rem', fontSize: '0.82rem', border: '1px solid #30363d' }}>
            <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '0.3rem' }}>Validación Criptográfica (Estándar flowEx):</div>
            {gateway === 'mercadopago' ? (
              <div style={{ color: '#8b949e', fontSize: '0.78rem' }}>
                Header <code>x-signature: ts=1793...,v1=4a9f...</code> | Cadena canónica firmada con <code>MP_WEBHOOK_SECRET</code> vía HMAC-SHA256 y <code>timingSafeEqual()</code>.
              </div>
            ) : (
              <div style={{ color: '#8b949e', fontSize: '0.78rem' }}>
                Header <code>fintoc-signature: t=1793...,v1=8b21...</code> | Mensaje firmado <code>&lt;timestamp&gt;.&lt;cuerpo&gt;</code> con ventana máxima de 300 segundos.
              </div>
            )}
          </div>

          <button className="btn-primary" onClick={executeWebhook} disabled={isProcessing}>
            <ShieldCheck size={16} /> {isProcessing ? 'Validando HMAC y asentando...' : 'Disparar Webhook Firmado'}
          </button>
        </div>
      )}

      {step === 4 && (
        <div style={{ background: '#0d1117', padding: '1.5rem', borderRadius: '10px', border: '1px solid #22c55e', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '0.8rem', borderRadius: '999px', marginBottom: '0.8rem' }}>
            <CheckCircle2 size={36} />
          </div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.3rem' }}>¡Transacción Finalizada y Auditada!</h4>
          <p style={{ fontSize: '0.88rem', color: '#8b949e', marginBottom: '1.2rem' }}>
            La orden <strong>{orderId}</strong> transicionó a <span className="badge badge-green">PAGADO</span> en D1. El inventario quedó consolidado sin posibilidad de sobreventa.
          </p>

          <div style={{ display: 'inline-flex', gap: '0.8rem', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={resetFlow}>
              Ejecutar Otra Simulación
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
