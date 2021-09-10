import axios, { AxiosResponse } from 'axios'

const get = (url: string, params: any) => {
  return axios.get(url, { params })
}
const post = (url: string, params: any) => {
  return axios.post(url, params)
}
const BASE_URL = 'http://localhost:3000'

const ApiUrls = {
  getArticles: `${BASE_URL}/getArticles`,
  getCategories: `${BASE_URL}/getCategories`,
  login: `${BASE_URL}/users/login`,
  createArticle: `${BASE_URL}/createArticle`,
  createCategory: `${BASE_URL}/createCategory`,
  delArticle: `${BASE_URL}/delArticle`,
  getArticleDetail: `${BASE_URL}/getArticleDetail`
}

export const getArticles = (params: any): Promise<AxiosResponse> => {
  return get(ApiUrls.getArticles, params)
}
export const getCategories = (params: any): Promise<AxiosResponse> => {
  return get(ApiUrls.getCategories, params)
}
export const getArticleDetail = (params: any): Promise<AxiosResponse> => {
  return get(ApiUrls.getArticleDetail, params)
}
export const login = (params: any): Promise<AxiosResponse> => {
  return post(ApiUrls.login, params)
}
export const createArticle = (params: any): Promise<AxiosResponse> => {
  return post(ApiUrls.createArticle, params)
}
export const createCategory = (params: any): Promise<AxiosResponse> => {
  return post(ApiUrls.createCategory, params)
}
export const delArticle = (params: any): Promise<AxiosResponse> => {
  return post(ApiUrls.delArticle, params)
}
