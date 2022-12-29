type RouteConfig = {
  path: string
  protected: ProtectedRouteType | null
}

export enum ProtectedRouteType {
  AdminOnly,
  GuestOnly,
}

export const routes: RouteConfig[] = [
  {
    // ログインページ
    path: '/signin',
    protected: ProtectedRouteType.GuestOnly,
  },
  {
    // トップページ
    path: '/',
    protected: ProtectedRouteType.AdminOnly,
  },
]
