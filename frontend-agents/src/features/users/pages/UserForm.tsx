import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usersService } from '../services/users.service';
import { userSchema, type UserFormData } from '../schemas/user.schema';
import { UserRole } from '../types/user';
import { maskCPF } from '../../../utils/cpf.validator';

export default function UserForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        control,
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
    });

    useEffect(() => {
        if (id) {
            loadUser(id);
        }
    }, [id]);

    const loadUser = async (userId: string) => {
        try {
            setIsLoadingData(true);
            const user = await usersService.getById(userId);
            setValue('name', user.name);
            setValue('cpf', user.cpf);
            setValue('email', user.email);
            setValue('role',
                String(user.role).toLowerCase() === 'admin' ? 'admin' : 'user'
            );
            setValue('password', '');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao carregar usuário');
        } finally {
            setIsLoadingData(false);
        }
    };

    function toBackendPayload(data: UserFormData) {
        const payload: any = {
            name: data.name,
            cpf: data.cpf,
            email: data.email,
            role: data.role === 'admin' ? UserRole.ADMIN :
                data.role === 'user' ? UserRole.USER : UserRole.USER,
        };

        if (data.password && data.password.trim() !== '') {
            payload.password = data.password;
        }

        return payload;
    }

    const onSubmit = async (data: UserFormData) => {
        try {
            setIsLoading(true);
            setError('');

            const payload = toBackendPayload(data);

            console.log('📤 Payload enviado:', payload);

            if (id) {
                await usersService.update(id, payload);
            } else {
                if (!data.password || data.password.trim() === '') {
                    setError('Senha é obrigatória ao criar um usuário');
                    return;
                }
                await usersService.create(payload);
            }

            navigate('/users');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao salvar usuário');
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/users')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEditMode ? 'Editar Usuário' : 'Novo Usuário'}
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
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Nome Completo
                            </label>
                            <input
                                {...register('name')}
                                type="text"
                                id="name"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Ex: João Silva"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        {/* CPF */}
                        <div>
                            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">
                                CPF
                            </label>
                            <Controller
                                name="cpf"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="cpf"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.cpf ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="000.000.000-00"
                                        value={maskCPF(field.value || '')}
                                        onChange={(e) => {
                                            const masked = maskCPF(e.target.value);
                                            field.onChange(masked);
                                        }}
                                        maxLength={14}
                                    />
                                )}
                            />
                            {errors.cpf && (
                                <p className="mt-1 text-sm text-red-600">{errors.cpf.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                id="email"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Ex: joao@exemplo.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Senha {isEditMode && <span className="text-gray-500 text-xs">(deixe em branco para manter a atual)</span>}
                            </label>
                            <input
                                {...register('password')}
                                type="password"
                                id="password"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder={isEditMode ? "Deixe em branco para não alterar" : "Mínimo 6 caracteres"}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Role */}
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                Tipo de Usuário
                            </label>
                            <select
                                {...register('role')}
                                id="role"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.role ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Selecione...</option>
                                <option value="user">Usuário</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/users')}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Salvando...
                                    </>
                                ) : (
                                    isEditMode ? 'Salvar Alterações' : 'Criar Usuário'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
