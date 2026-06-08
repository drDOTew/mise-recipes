export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  recipes: {
    list: "/recipes",
    create: "/recipes",
    detail: (id: string) => `/recipes/${id}`,
    update: (id: string) => `/recipes/${id}`,
    delete: (id: string) => `/recipes/${id}`,
    share: (id: string) => `/recipes/${id}/share`,
    unshare: (id: string) => `/recipes/${id}/share`,
  },
  public: {
    recipe: (token: string) => `/r/${token}`,
  },
  tags: {
    list: "/tags",
    create: "/tags",
    delete: (id: number) => `/tags/${id}`,
  },
};