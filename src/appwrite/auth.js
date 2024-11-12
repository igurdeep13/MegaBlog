import conf from "../conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteProjectId).setProject(conf.projectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, passsword, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        passsword,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, session });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions("current");
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const auhService = new AuthService();

export default AuthService;
