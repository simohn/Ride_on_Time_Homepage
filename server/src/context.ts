import { User } from './entities/User';

export class Context {
    req: Request;
    user?: User;

    isAdmin(): boolean {
        return this.user && this.user.admin;
    }

    isAuthenticated(): boolean {
        return !!this.user;
    }
}

export async function createContext({request}: { request: Request}): Promise<Context> {
    const context = new Context();
    context.req = request;

    // @ts-ignore
    context.user = request.user;

    return context;
}