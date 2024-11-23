
import { UserRoutes } from "./User";
import { AccountRoutes } from "./Acoount";
import { LoanRoutes } from "./Loan";
import { AmortizationRoutes } from "./Amortization";
import { warrantyRoutes } from "./Warranty";
import { TypeAccountRoutes } from "./Type_Account";
import { TypeLoanRoutes } from "./Loan_Type";
import { RoleRoutes } from './role';
import { RoleUserRoutes } from './role_user';
import { AuthRoutes } from './auth';
import { RefreshTokenRoutes } from './refresh_token';

export class Routes {

    UserRoutes: UserRoutes = new UserRoutes()
    TypeAccountRoutes: TypeAccountRoutes = new TypeAccountRoutes()
    AccountRoutes: AccountRoutes = new AccountRoutes()
    LoanRoutes: LoanRoutes = new LoanRoutes()
    AmortizationRoutes: AmortizationRoutes = new AmortizationRoutes()
    warrantyRoutes: warrantyRoutes = new warrantyRoutes()
    TypeLoanRoutes: TypeLoanRoutes = new TypeLoanRoutes()
    roleRoutes: RoleRoutes = new RoleRoutes();
    roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
    authRoutes: AuthRoutes = new AuthRoutes();
    refreshTokenRoutes: RefreshTokenRoutes = new RefreshTokenRoutes();
}