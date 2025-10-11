'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useLoading } from '../components/LoadingProvider';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

export default function CreateFund() {
    const router = useRouter();
    const { user } = useUser();
    const { setIsLoading: setGlobalLoading } = useLoading();
    const [isLoading, setIsLoading] = useState(false);
    const [customerDecidesAmount, setCustomerDecidesAmount] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target);
        const data = {
            title: formData.get('title'),
            description: formData.get('description') || '',
            goal: formData.get('goal') ? parseFloat(formData.get('goal')) : null,
            contributionAmount: customerDecidesAmount ? null : (formData.get('contributionAmount') ? parseFloat(formData.get('contributionAmount')) : null),
            customerDecidesAmount: customerDecidesAmount,
            createdBy: user.id,
        };

        try {
            const response = await fetch('/api/funds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create fund');
            }

            toast.success('Fund created successfully!');
            setGlobalLoading(true);
            router.push('/dashboard');
        } catch (error) {
            toast.error('Failed to create fund. Please try again.');
            console.error('Error creating fund:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Fund</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Fund Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-400 text-gray-900"
                                placeholder="Enter fund title"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-400 text-gray-900"
                                placeholder="Describe your fund's purpose (optional)"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="customerDecidesAmount"
                                    checked={customerDecidesAmount}
                                    onChange={(e) => setCustomerDecidesAmount(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="customerDecidesAmount" className="ml-2 block text-sm text-gray-700">
                                    Let customers decide their contribution amount
                                </label>
                            </div>

                            {!customerDecidesAmount ? (
                                <div>
                                    <label htmlFor="contributionAmount" className="block text-sm font-medium text-gray-700 mb-2">
                                        Fixed Contribution Amount (₹)
                                    </label>
                                    <input
                                        type="number"
                                        id="contributionAmount"
                                        name="contributionAmount"
                                        min="1"
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-400 text-gray-900"
                                        placeholder="Enter fixed contribution amount"
                                    />
                                </div>
                            ) : (
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm text-blue-700">
                                        ✓ Contributors will be able to choose their own contribution amount
                                    </p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
                                Fund Goal (₹)
                            </label>
                            <input
                                type="number"
                                id="goal"
                                name="goal"
                                min="1"
                                step="0.01"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-400 text-gray-900"
                                placeholder="Enter amount (optional)"
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setGlobalLoading(true);
                                    router.back();
                                }}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating...' : 'Create Fund'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 