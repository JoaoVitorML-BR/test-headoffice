import { useState } from 'react';

export interface FilterField {
    key: string;
    label: string;
    type: 'text' | 'select' | 'cpf';
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
}

interface GenericFiltersProps<T> {
    filters: T;
    fields: FilterField[];
    onFilterChange: (field: keyof T, value: string | undefined) => void;
    onApply: () => void;
    onClear: () => void;
}

export default function GenericFilters<T extends Record<string, any>>({
    filters,
    fields,
    onFilterChange,
    onApply,
    onClear
}: GenericFiltersProps<T>) {
    const [showFilters, setShowFilters] = useState(false);

    const renderField = (field: FilterField) => {
        const value = filters[field.key as keyof T] || '';

        switch (field.type) {
            case 'select':
                return (
                    <select
                        value={String(value)}
                        onChange={(e) => onFilterChange(field.key as keyof T, e.target.value || undefined)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                        <option value="">Todos</option>
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'cpf':
                return (
                    <input
                        type="text"
                        value={String(value)}
                        onChange={(e) => {
                            const cleaned = e.target.value.replace(/\D/g, '');
                            onFilterChange(field.key as keyof T, cleaned || undefined);
                        }}
                        placeholder={field.placeholder || 'Ex: 123.456.789-00'}
                        maxLength={14}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                );

            case 'text':
            default:
                return (
                    <input
                        type="text"
                        value={String(value)}
                        onChange={(e) => onFilterChange(field.key as keyof T, e.target.value || undefined)}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                );
        }
    };

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
                        {fields.map((field) => (
                            <div key={field.key}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {field.label}
                                </label>
                                {renderField(field)}
                            </div>
                        ))}
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
