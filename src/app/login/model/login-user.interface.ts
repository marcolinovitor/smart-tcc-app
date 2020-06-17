export interface LoginUser {
    authenticatedUser: string;
    authenticatedRole: string;
    authenticatedFrom: string;
    authenticatedTo: string;
    clientDocument?: string;
    token: string;
  }