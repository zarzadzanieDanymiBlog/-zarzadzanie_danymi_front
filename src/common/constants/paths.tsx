export const ROUTES = {
  HOME: "/",
  CMS: "/cms",
  CMS_LOGIN: "/cms/login",
  POST: (postId: string) => `/posts/${postId}`,
  EDIT_POST: (postId: string) => `/cms/posts/${postId}/edit`,
};
