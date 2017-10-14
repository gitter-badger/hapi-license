import { format } from '../utility';
import { healthStatus, createDependencyHandler } from './health.handler';

const createHealthStatus = () => {
    const healthDependency = createDependencyHandler();

    return ([
        {
            method: 'GET',
            path: '/healthCheck',
            handler: healthStatus,
            config: {
                auth: false,
                tags: ['api', 'Server Utilities'],
                description: 'Get up status of server',
                notes: [
                    'Returns success status if the server is online'
                ],
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            ...format.healthCheck
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/healthCheck/all',
            handler: healthDependency,
            config: {
                auth: false,
                tags: ['api', 'Server Utilities'],
                description: 'Get up status of server dependencies',
                notes: [
                    'Returns an array of each server dependency with up status and latency'
                ],
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            ...format.checkDependency,
                            ...format.internalError,
                            ...format.notImplemented
                        }
                    }
                }
            }
        }
    ]);
};

export default createHealthStatus;