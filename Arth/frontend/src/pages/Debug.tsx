import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function Debug() {
    const [status, setStatus] = useState({
        env: false,
        db: false,
        loading: true
    });
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        checkBackendStatus();
    }, []);

    const addMessage = (message: string) => {
        setMessages(prev => [...prev, message]);
    };

    const checkBackendStatus = async () => {
        setStatus(prev => ({ ...prev, loading: true, messages: [] }));
        setMessages([]);

        try {
            // Check backend API health
            try {
                const response = await fetch('http://localhost:5000/api/health');
                const data = await response.json();

                if (response.ok) {
                    addMessage('✅ Backend API is running');
                    setStatus(prev => ({ ...prev, env: true }));
                } else {
                    addMessage(`❌ Backend API error: ${data.error || 'Unknown error'}`);
                    setStatus(prev => ({ ...prev, env: false }));
                }
            } catch (apiError: any) {
                addMessage('❌ Backend API not accessible. Make sure the backend server is running on port 5000');
                addMessage('💡 Run: cd backend && npm run dev');
                setStatus(prev => ({ ...prev, env: false }));
                setStatus(prev => ({ ...prev, loading: false }));
                return;
            }

            // Check database connection through API
            try {
                const contents = await fetch('https://arth-rl9l.onrender.com/api/contents');
                if (contents.ok) {
                    const data = await contents.json();
                    addMessage(`✅ Database connection successful. Found ${data.length} content items.`);
                    setStatus(prev => ({ ...prev, db: true }));
                } else {
                    const error = await contents.json();
                    addMessage(`❌ Database error: ${error.error}`);
                    setStatus(prev => ({ ...prev, db: false }));
                }
            } catch (dbError: any) {
                addMessage(`❌ Database connection failed: ${dbError.message}`);
                setStatus(prev => ({ ...prev, db: false }));
            }

        } catch (error: any) {
            addMessage(`❌ Unexpected error: ${error.message}`);
        } finally {
            setStatus(prev => ({ ...prev, loading: false }));
        }
    };

    return (
        <div className="max-w-4xl px-4 py-12 mx-auto">
            <div className="p-8 bg-white shadow-lg rounded-2xl">
                <h1 className="mb-8 text-3xl font-bold text-gray-900">Backend Debug Status</h1>

                {status.loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 mr-3 text-blue-600 animate-spin" />
                        <span className="text-lg text-gray-600">Checking backend status...</span>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <StatusCard
                                title="Environment Variables"
                                status={status.env}
                                icon={status.env ? CheckCircle : XCircle}
                            />
                            <StatusCard
                                title="Database Connection"
                                status={status.db}
                                icon={status.db ? CheckCircle : XCircle}
                            />
                        </div>

                        <div className="p-6 rounded-lg bg-gray-50">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">Status Details</h2>
                            <div className="space-y-2">
                                {messages.map((message, index) => (
                                    <div key={index} className="flex items-start">
                                        <span className="font-mono text-sm text-gray-700">{message}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={checkBackendStatus}
                                className="px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Re-run Check
                            </button>

                            <a
                                href="/"
                                className="px-6 py-3 font-medium text-gray-800 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Back to Home
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatusCard({ title, status, icon: Icon }: { title: string; status: boolean; icon: any }) {
    return (
        <div className={`p-6 rounded-xl border-2 ${status ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <Icon className={`w-6 h-6 ${status ? 'text-green-600' : 'text-red-600'}`} />
            </div>
            <p className={`mt-2 text-sm ${status ? 'text-green-700' : 'text-red-700'}`}>
                {status ? 'Working' : 'Issue detected'}
            </p>
        </div>
    );
}