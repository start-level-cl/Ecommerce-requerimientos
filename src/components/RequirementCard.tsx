import React, { useState } from 'react';
import { Requirement } from '../data/requirementsData';
import { CheckCircle2, ChevronDown, ChevronUp, Code2, ShieldCheck, Tag } from 'lucide-react';

interface Props {
  req: Requirement;
}

export const RequirementCard: React.FC<Props> = ({ req }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span style={{ fontWeight: 800, color: '#fb923c', fontSize: '0.95rem' }}>{req.code}</span>
            <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{req.category}</span>
            <span
              className={`badge ${
                req.priority === 'Crítica'
                  ? 'badge-red'
                  : req.priority === 'Alta'
                  ? 'badge-orange'
                  : 'badge-blue'
              }`}
              style={{ fontSize: '0.7rem' }}
            >
              Prioridad {req.priority}
            </span>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: '#f0f6fc' }}>
            {req.title}
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#8b949e', marginBottom: '0.6rem' }}>
            {req.description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span className="badge badge-green">
            <CheckCircle2 size={13} /> {req.status}
          </span>
          <button
            className="btn-secondary"
            onClick={() => setExpanded(!expanded)}
            style={{ padding: '0.35rem 0.7rem', fontSize: '0.8rem' }}
          >
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            {expanded ? 'Menos detalles' : 'Ver Criterios'}
          </button>
        </div>
      </div>

      {/* Detalle expandible */}
      {expanded && (
        <div
          style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #21262d',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            fontSize: '0.85rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: '#c9d1d9', marginBottom: '0.3rem' }}>
              <Code2 size={15} color="#38bdf8" /> Implementación Técnica:
            </div>
            <p style={{ color: '#8b949e', marginLeft: '1.3rem' }}>{req.implementationDetail}</p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: '#c9d1d9', marginBottom: '0.3rem' }}>
              <ShieldCheck size={15} color="#4ade80" /> Criterios de Aceptación (Gherkin / QA):
            </div>
            <ul style={{ paddingLeft: '2rem', color: '#8b949e', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {req.acceptanceCriteria.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8b949e', fontSize: '0.78rem', marginTop: '0.3rem' }}>
            <Tag size={13} /> Archivo fuente de referencia:{' '}
            <code style={{ background: '#0d1117', padding: '0.15rem 0.4rem', borderRadius: '4px', color: '#fb923c' }}>
              {req.referenceModule}
            </code>
          </div>
        </div>
      )}
    </div>
  );
};
