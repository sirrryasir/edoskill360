import { UserDocument } from '../../models/User';

declare global {
    namespace Express {
        interface Request {
            user?: any; // or UserDocument if I can import it comfortably
        }
    }
}
