import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { agentSchema, type AgentFormData } from '../schemas/agent.schema';
import { AgentStatus } from '../types/agent';
import { agentsService } from '../services/agents.service';

export default function AgentForm() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditing = !!id;

    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(isEditing);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<AgentFormData>({
        resolver: zodResolver(agentSchema),
    });

    useEffect(() => {
        if (isEditing && id) {
            loadAgent(id);
        }
    }, [id, isEditing]);

    const loadAgent = async (agentId: string) => {
        try {
            setIsLoadingData(true);
            const agent = await agentsService.getById(agentId);
            setValue('name', agent.name);
            setValue('email', agent.email);
            setValue('phone', agent.phone);
            setValue('position', agent.position);
            setValue('department', agent.department);
            setValue('status',
                String(agent.status).toLowerCase() === 'active' ? 'active' : 'inactive'
            );
            setValue('hireDate', agent.hireDate ? formatDate(agent.hireDate) : '');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao carregar agente');
        } finally {
            setIsLoadingData(false);
        }
    };

    function formatDate(dateStr: string) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
           return d.toISOString().split('T')[0];
    }

    function toBackendPayload(data: AgentFormData) {
        return {
            name: data.name,
            email: data.email,
            phone: data.phone,
            position: data.position,
            department: data.department,
            status: data.status === 'active' ? AgentStatus.ACTIVE : AgentStatus.INACTIVE,
                ...(data.hireDate && { hireDate: data.hireDate }),
        };
    }

    const onSubmit = async (data: AgentFormData) => {
        try {
            setIsLoading(true);
            setError('');

            const payload = toBackendPayload(data);
            console.log('📤 Payload enviado ao backend:', payload);

            if (isEditing && id) {
                await agentsService.update(id, payload);
            } else {
                await agentsService.create(payload);
            }

            navigate('/agents');
        } catch (err: any) {
            console.error('Erro do backend:', err.response?.data);
            const message = err.response?.data?.message || `Erro ao ${isEditing ? 'atualizar' : 'criar'} agente`;
            setError(Array.isArray(err.response?.data?.message)
                ? err.response?.data?.message.join(', ')
                : message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoadingData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/agents')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEditing ? 'Editar Agente' : 'Novo Agente'}
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-shake">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-red-700 font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                Nome Completo
                            </label>
                            <input
                                {...register('name')}
                                type="text"
                                id="name"
                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="João da Silva"
                                disabled={isLoading}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email and Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    id="email"
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="joao@email.com"
                                    disabled={isLoading}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Telefone
                                </label>
                                <input
                                    {...register('phone')}
                                    type="tel"
                                    id="phone"
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="(11) 99999-9999"
                                    disabled={isLoading}
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Position and Department */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="position" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Cargo
                                </label>
                                <input
                                    {...register('position')}
                                    type="text"
                                    id="position"
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Desenvolvedor"
                                    disabled={isLoading}
                                />
                                {errors.position && (
                                    <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Departamento
                                </label>
                                <input
                                    {...register('department')}
                                    type="text"
                                    id="department"
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="TI"
                                    disabled={isLoading}
                                />
                                {errors.department && (
                                    <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Status and Hire Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    {...register('status')}
                                    id="status"
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    disabled={isLoading}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="active">Ativo</option>
                                    <option value="inactive">Inativo</option>
                                </select>
                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="hireDate" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Data de Contratação
                                </label>
                                <input
                                        {...register('hireDate')}
                                        type="date"
                                    id="hireDate"
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        disabled={isLoading}
                                />
                                {errors.hireDate && (
                                    <p className="mt-1 text-sm text-red-600">{errors.hireDate.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => navigate('/agents')}
                                className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                                disabled={isLoading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Salvando...' : isEditing ? 'Atualizar' : 'Criar'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
