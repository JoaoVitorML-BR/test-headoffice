import { useState } from 'react';
import { AgentFilters } from '../types/agent-filters';
import { AgentStatus } from '../types/agent';

interface AgentsFiltersProps {
    filters: AgentFilters;
    onFilterChange: (field: keyof AgentFilters, value: string | AgentStatus | undefined) => void;
    onApply: () => void;
    onClear: () => void;
}

export default function AgentsFilters({ filters, onFilterChange, onApply, onClear }: AgentsFiltersProps) {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-6 overflow-hidden">
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
                </div>
                <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {showFilters && (
                <div className="px-6 pb-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        {/* Search Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Buscar
                            </label>
                            <input
                                type="text"
                                value={filters.search || ''}
                                onChange={(e) => onFilterChange('search', e.target.value)}
                                placeholder="Nome, email, cargo..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                value={filters.status || ''}
                                onChange={(e) => onFilterChange('status', e.target.value ? e.target.value as AgentStatus : undefined)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                                <option value="">Todos</option>
                                <option value={AgentStatus.ACTIVE}>Ativo</option>
                                <option value={AgentStatus.INACTIVE}>Inativo</option>
                            </select>
                        </div>

                        {/* Department Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Departamento
                            </label>
                            <input
                                type="text"
                                value={filters.department || ''}
                                onChange={(e) => onFilterChange('department', e.target.value)}
                                placeholder="Ex: TI, RH..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Position Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cargo
                            </label>
                            <input
                                type="text"
                                value={filters.position || ''}
                                onChange={(e) => onFilterChange('position', e.target.value)}
                                placeholder="Ex: Desenvolvedor..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Filter Actions */}
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={onApply}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Aplicar Filtros
                        </button>
                        <button
                            onClick={onClear}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Limpar Filtros
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
