import { User } from 'models'
import { UserRole } from 'types/api/user-role'

export enum Pages {
  Home = 'Home',
  SignIn = 'SignIn',
  ForbiddenAccess = 'ForbiddenAccess',
}

export type Page = {
  path: string
  url: ((params: Record<string, unknown>) => string) | (() => string)
  title: string
  roles?: UserRole[]
  validate?: (user: User) => boolean
}

export const pages: Record<Pages, Page> = {
  [Pages.Home]: {
    path: '/',
    url: () => '/',
    title: 'Home',
  },
  [Pages.SignIn]: {
    path: '/auth/sign-in',
    url: () => '/auth/sign-in',
    title: 'Sign in',
  },
  [Pages.ForbiddenAccess]: {
    path: '/forbidden-access',
    url: () => '/forbidden-access',
    title: 'Forbidden Access',
  },
}
