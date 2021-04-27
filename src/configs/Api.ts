import axios from "axios";
import { Admin } from "../models/Admin";
import { Alternative } from "../models/Alternative";
import { ArmedForce } from "../models/ArmedForce";
import { AuthenticateModel } from "../models/Authenticate";
import { Contest } from "../models/Contest";
import { ContestSubject } from "../models/ContestSubject";
import { Coupon } from "../models/Coupon";
import { Patent } from "../models/Patent";
import { Plan } from "../models/Plan";
import { Question } from "../models/Question";
import { QuestionAnswer } from "../models/QuestionAnswer";
import { QuestionText } from "../models/QuestionText";
import { Scholarity } from "../models/Scholarity";
import { Shopping } from "../models/Shopping";
import { Subject } from "../models/Subject";
import { SubjectMatter } from "../models/SubjectMatter";
import { User } from "../models/User";
import { Session } from "./Session";

export class Api {

    BASE_URL = "https://sermilitar-api.herokuapp.com";
    // BASE_URL = "http://localhost:5000";

    accessToken = Session.getToken() !== 'undefined' && Session.getToken() !== null ? 
                  Session.getToken() : Session.getTokenAdmin();

    //#region User

    getUser = async () => {

        return await axios.get(`${this.BASE_URL}/user`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getUserById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertUser = async (model: User) => {

        return await axios.post(`${this.BASE_URL}/user`, model)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    authenticateUser = async (model: AuthenticateModel) => {

        return await axios.post(`${this.BASE_URL}/user/login`, model)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    updateUser = async (model: User) => {

        return await axios.put(`${this.BASE_URL}/user/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deleteUser = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    resetPasswordUser = async (id: string, newPassword: string) => {

        return await axios.post(`${this.BASE_URL}/user/resetPassword/${id}&${newPassword}`, {}, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region Admin

    getAdmin = async () => {

        return await axios.get(`${this.BASE_URL}/admin`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getAdminById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/admin/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertAdmin = async (model: Admin) => {

        return await axios.post(`${this.BASE_URL}/admin`, model)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    authenticateAdmin = async (model: AuthenticateModel) => {

        return await axios.post(`${this.BASE_URL}/admin/login`, model)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    updateAdmin = async (model: Admin) => {

        return await axios.put(`${this.BASE_URL}/admin/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deleteAdmin = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/admin/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    resetPasswordAdmin = async (id: string, newPassword: string) => {

        return await axios.post(`${this.BASE_URL}/admin/resetPassword/${id}&${newPassword}`, {}, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region Alternative

    getAlternative = async () => {

        return await axios.get(`${this.BASE_URL}/alternative`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getAlternativeById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/alternative/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertAlternative = async (model: Alternative) => {

        return await axios.post(`${this.BASE_URL}/alternative`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    updateAlternative = async (model: Alternative) => {

        return await axios.put(`${this.BASE_URL}/alternative/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deleteAlternative = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/alternative/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion
    
    //#region ArmedForce

    getArmedForce = async () => {

        return await axios.get(`${this.BASE_URL}/armedForce`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getArmedForceById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/armedForce/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertArmedForce = async (model: ArmedForce) => {

        return await axios.post(`${this.BASE_URL}/armedForce`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    updateArmedForce = async (model: ArmedForce) => {

        return await axios.put(`${this.BASE_URL}/armedForce/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deleteArmedForce = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/armedForce/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region Contest

    getContest = async () => {

        return await axios.get(`${this.BASE_URL}/contest`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getContestById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/contest/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertContest = async (model: Contest) => {

        return await axios.post(`${this.BASE_URL}/contest`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    updateContest = async (model: Contest) => {

        return await axios.put(`${this.BASE_URL}/contest/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deleteContest = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/contest/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region ContestSubject

    getContestSubject = async () => {

        return await axios.get(`${this.BASE_URL}/contestSubject`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getContestSubjectById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/contestSubject/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertContestSubject = async (model: ContestSubject) => {

        return await axios.post(`${this.BASE_URL}/contestSubject`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    updateContestSubject = async (model: ContestSubject) => {

        return await axios.put(`${this.BASE_URL}/contestSubject/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deleteContestSubject = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/contestSubject/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region Coupon

    getCoupon = async () => {

        return await axios.get(`${this.BASE_URL}/coupon`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getCouponById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/coupon/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertCoupon = async (model: Coupon) => {

        return await axios.post(`${this.BASE_URL}/coupon`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    updateCoupon = async (model: Coupon) => {

        return await axios.put(`${this.BASE_URL}/coupon/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deleteCoupon = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/coupon/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region Patent

    getPatent = async () => {

        return await axios.get(`${this.BASE_URL}/patent`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getPatentById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/patent/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertPatent = async (model: Patent) => {

        return await axios.post(`${this.BASE_URL}/patent`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    updatePatent = async (model: Patent) => {

        return await axios.put(`${this.BASE_URL}/patent/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deletePatent = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/patent/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region Plan

    getPlan = async () => {

        return await axios.get(`${this.BASE_URL}/plan`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getPlanById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/plan/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertPlan = async (model: Plan) => {

        return await axios.post(`${this.BASE_URL}/plan`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    updatePlan = async (model: Plan) => {

        return await axios.put(`${this.BASE_URL}/plan/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deletePlan = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/plan/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region Question

    getQuestion = async () => {

        return await axios.get(`${this.BASE_URL}/question`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getQuestionById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/question/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertQuestion = async (model: Question) => {

        return await axios.post(`${this.BASE_URL}/question`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    updateQuestion = async (model: Question) => {

        return await axios.put(`${this.BASE_URL}/question/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deleteQuestion = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/question/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region QuestionAnswer

    getQuestionAnswer = async () => {

        return await axios.get(`${this.BASE_URL}/questionAnswer`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getQuestionAnswerById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/questionAnswer/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertQuestionAnswer = async (model: QuestionAnswer) => {

        return await axios.post(`${this.BASE_URL}/questionAnswer`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    updateQuestionAnswer = async (model: QuestionAnswer) => {

        return await axios.put(`${this.BASE_URL}/questionAnswer/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deleteQuestionAnswer = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/questionAnswer/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region QuestionText

    getQuestionText = async () => {

        return await axios.get(`${this.BASE_URL}/questionText`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getQuestionTextById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/questionText/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertQuestionText = async (model: QuestionText) => {

        return await axios.post(`${this.BASE_URL}/questionText`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    updateQuestionText = async (model: QuestionText) => {

        return await axios.put(`${this.BASE_URL}/questionText/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deleteQuestionText = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/questionText/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region Scholarity

    getScholarity = async () => {

        return await axios.get(`${this.BASE_URL}/scholarity`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getScholarityById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/scholarity/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertScholarity = async (model: Scholarity) => {

        return await axios.post(`${this.BASE_URL}/scholarity`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    updateScholarity = async (model: Scholarity) => {

        return await axios.put(`${this.BASE_URL}/scholarity/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deleteScholarity = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/scholarity/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region Shopping

    getShopping = async () => {

        return await axios.get(`${this.BASE_URL}/shopping`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getShoppingById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/shopping/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertShopping = async (model: Shopping) => {

        return await axios.post(`${this.BASE_URL}/shopping`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    updateShopping = async (model: Shopping) => {

        return await axios.put(`${this.BASE_URL}/shopping/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deleteShopping = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/shopping/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region Subject

    getSubject = async () => {

        return await axios.get(`${this.BASE_URL}/subject`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getSubjectById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/subject/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertSubject = async (model: Subject) => {

        return await axios.post(`${this.BASE_URL}/subject`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    updateSubject = async (model: Subject) => {

        return await axios.put(`${this.BASE_URL}/subject/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deleteSubject = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/subject/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region SubjectMatter

    getSubjectMatter = async () => {

        return await axios.get(`${this.BASE_URL}/subjectMatter`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getSubjectMatterById = async (id: string) => {

        return await axios.get(`${this.BASE_URL}/subjectMatter/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getSubjectMatterBySubjectId = async (subjectId: string) => {

        return await axios.get(`${this.BASE_URL}/subjectMatter/subject/${subjectId}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertSubjectMatter = async (model: SubjectMatter) => {

        return await axios.post(`${this.BASE_URL}/subjectMatter`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    updateSubjectMatter = async (model: SubjectMatter) => {

        return await axios.put(`${this.BASE_URL}/subjectMatter/${model.id}`, model, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    deleteSubjectMatter = async (id: string) => {

        return await axios.delete(`${this.BASE_URL}/subjectMatter/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

    //#region Image

    getImageByFilename = async (filename: string) => {

        return await axios.get(`${this.BASE_URL}/image/upload/${filename}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    getImageByBrowser = async (filename: string) => {

        return await axios.get(`${this.BASE_URL}/image/upload/browser/${filename}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    insertImage = async (model: File) => {

        var formData = new FormData();
        formData.append('file', model);

        return await axios.post(`${this.BASE_URL}/image/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${this.accessToken}`,
            }
        })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return Promise.reject(error.response.data);
            });
    }

    //#endregion

}