import { useState, useMemo } from 'react';
import { REQUIREMENTS } from './data/requirementsData';
import { RequirementCard } from './components/RequirementCard';
import { FlowSimulator } from './components/FlowSimulator';
import {
  CheckCircle2,
  BookOpen,
  ShoppingBag,
  ExternalLink,
  Search,
  Database,
  Workflow
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'simulator' | 'architecture'>('matrix');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = useMemo(() => {
    const set = new Set(REQUIREMENTS.map((r) => r.category));
    return ['Todas', ...Array.from(set)];
  }, []);

  const filteredRequirements = useMemo(() => {
    return REQUIREMENTS.filter((r) => {
      const matchCat = selectedCategory === 'Todas' || r.category === selectedCategory;
      const matchSearch =
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Superior */}
      <header style={{ background: '#0d1117', borderBottom: '1px solid #21262d', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                padding: '0.65rem',
                borderRadius: '10px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Workflow size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }}>E-Commerce Requerimientos & PMV</h1>
                <span className="badge badge-orange">Módulo Requerimientos (Estilo flowEx)</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#8b949e' }}>
                Matriz de Especificación Funcional, Criterios de Aceptación y Simulador Transaccional
              </p>
            </div>
          </div>

          {/* Enlaces Rápidos a la Tienda y la Documentación */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ fontSize: '0.82rem', padding: '0.45rem 0.8rem', textDecoration: 'none' }}
            >
              <ShoppingBag size={14} /> Tienda Local (:5173) <ExternalLink size={12} />
            </a>

            <a
              href="http://localhost:4010/reference.html"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ fontSize: '0.82rem', padding: '0.45rem 0.8rem', textDecoration: 'none' }}
            >
              <BookOpen size={14} /> API Docs Scalar (:4010) <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Sub-navegación por Pestañas */}
        <div style={{ borderTop: '1px solid #21262d', background: '#11161d' }}>
          <div className="container" style={{ display: 'flex', gap: '1rem', padding: '0.35rem 1.5rem' }}>
            <button
              onClick={() => setActiveTab('matrix')}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeTab === 'matrix' ? '#f97316' : '#8b949e',
                fontWeight: activeTab === 'matrix' ? 700 : 500,
                borderBottom: activeTab === 'matrix' ? '2px solid #f97316' : '2px solid transparent',
                padding: '0.5rem 0.6rem',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <CheckCircle2 size={15} /> Matriz de Requerimientos ({REQUIREMENTS.length})
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeTab === 'simulator' ? '#f97316' : '#8b949e',
                fontWeight: activeTab === 'simulator' ? 700 : 500,
                borderBottom: activeTab === 'simulator' ? '2px solid #f97316' : '2px solid transparent',
                padding: '0.5rem 0.6rem',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Workflow size={15} /> Simulador Transaccional
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeTab === 'architecture' ? '#f97316' : '#8b949e',
                fontWeight: activeTab === 'architecture' ? 700 : 500,
                borderBottom: activeTab === 'architecture' ? '2px solid #f97316' : '2px solid transparent',
                padding: '0.5rem 0.6rem',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Database size={15} /> Arquitectura & D1
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <div className="container">
          
          {/* Métricas KPI de Requerimientos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div className="card" style={{ padding: '1.2rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#8b949e', marginBottom: '0.2rem' }}>Total Requerimientos (PMV)</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f0f6fc' }}>12 / 12</div>
              <div style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: 600, marginTop: '0.2rem' }}>100% Implementados</div>
            </div>

            <div className="card" style={{ padding: '1.2rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#8b949e', marginBottom: '0.2rem' }}>Persistencia Edge</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fb923c' }}>Cloudflare D1</div>
              <div style={{ fontSize: '0.75rem', color: '#8b949e', marginTop: '0.2rem' }}>SQLite Distribuido + db.batch()</div>
            </div>

            <div className="card" style={{ padding: '1.2rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#8b949e', marginBottom: '0.2rem' }}>Pasarelas Operativas</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#38bdf8' }}>MP + Fintoc</div>
              <div style={{ fontSize: '0.75rem', color: '#8b949e', marginTop: '0.2rem' }}>Tarjetas, Webpay y Bancos</div>
            </div>

            <div className="card" style={{ padding: '1.2rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#8b949e', marginBottom: '0.2rem' }}>Seguridad de Webhooks</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#c084fc' }}>HMAC-SHA256</div>
              <div style={{ fontSize: '0.75rem', color: '#8b949e', marginTop: '0.2rem' }}>timingSafeEqual + Tolerancia 5m</div>
            </div>
          </div>

          {/* TAB 1: MATRIZ DE REQUERIMIENTOS */}
          {activeTab === 'matrix' && (
            <div>
              {/* Buscador y Filtros */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ position: 'relative', minWidth: '300px', flex: 1, maxWidth: '500px' }}>
                  <Search size={16} color="#8b949e" style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Buscar por código, título o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', paddingLeft: '2.4rem' }}
                  />
                </div>

                {/* Filtro por Categoría */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        background: selectedCategory === cat ? '#f97316' : '#161b22',
                        color: selectedCategory === cat ? '#fff' : '#c9d1d9',
                        border: selectedCategory === cat ? '1px solid #f97316' : '1px solid #30363d',
                        borderRadius: '999px',
                        padding: '0.35rem 0.8rem',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista de Requerimientos */}
              <div>
                {filteredRequirements.map((req) => (
                  <RequirementCard key={req.id} req={req} />
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SIMULADOR TRANSACCIONAL */}
          {activeTab === 'simulator' && <FlowSimulator />}

          {/* TAB 3: ARQUITECTURA & D1 */}
          {activeTab === 'architecture' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.8rem', color: '#f0f6fc' }}>
                  Esquema Relacional en Cloudflare D1
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#8b949e', marginBottom: '1.2rem' }}>
                  El motor relacional utiliza índices compuestos por <code>tenant_slug</code> para asegurar aislamiento lógico y alto desempeño en lecturas concurrentes sin costo de servidor.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  <div style={{ background: '#0d1117', border: '1px solid #21262d', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#fb923c', marginBottom: '0.4rem' }}>Tabla: tenants</div>
                    <ul style={{ fontSize: '0.8rem', color: '#8b949e', paddingLeft: '1.2rem' }}>
                      <li><code>slug TEXT PRIMARY KEY</code></li>
                      <li><code>name TEXT NOT NULL</code></li>
                      <li><code>currency TEXT DEFAULT 'USD'</code></li>
                      <li><code>description TEXT</code></li>
                    </ul>
                  </div>

                  <div style={{ background: '#0d1117', border: '1px solid #21262d', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#38bdf8', marginBottom: '0.4rem' }}>Tabla: products</div>
                    <ul style={{ fontSize: '0.8rem', color: '#8b949e', paddingLeft: '1.2rem' }}>
                      <li><code>id INTEGER PRIMARY KEY</code></li>
                      <li><code>tenant_slug TEXT (FK)</code></li>
                      <li><code>title TEXT, price REAL</code></li>
                      <li><code>stock INTEGER (Atómico)</code></li>
                    </ul>
                  </div>

                  <div style={{ background: '#0d1117', border: '1px solid #21262d', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#4ade80', marginBottom: '0.4rem' }}>Tabla: orders</div>
                    <ul style={{ fontSize: '0.8rem', color: '#8b949e', paddingLeft: '1.2rem' }}>
                      <li><code>id TEXT PRIMARY KEY</code></li>
                      <li><code>tenant_slug TEXT (FK)</code></li>
                      <li><code>status (pending | paid)</code></li>
                      <li><code>payment_gateway, payment_id</code></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
