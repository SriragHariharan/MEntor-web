
const USER_SERVICE_BASE_URL =       "http://localhost:6001/api/user-service/v1"
//const PROFILE_SERVICE_BASE_URL =    "http://localhost:6001/api/profile-service/v1"
const INTERVIEW_SERVICE_BASE_URL =  "http://localhost:6004/api/interview-service/v1"
const WEBINAR_SERVICE_BASE_URL =    "http://localhost:6005/api/webinar-service/v1"
const PAYMENT_SERVICE_BASE_URL =    "http://localhost:6007/api/payment-service/v1"

console.log(process.env.DEV, " dev")

// Define your endpoints
const ENDPOINTS = {
    ADMIN_SESSION:      USER_SERVICE_BASE_URL + "/admin/session",
    LOGIN:              USER_SERVICE_BASE_URL + "/admin/login",
    USERS_COUNT:        USER_SERVICE_BASE_URL + "/admin/count/users",
    APPROVED_MENTORS:   USER_SERVICE_BASE_URL + "/admin/mentors",
    APPROVED_MENTEES:   USER_SERVICE_BASE_URL + "/admin/mentees",
    APPROVAL_PENDING_MENTORS: USER_SERVICE_BASE_URL + "/admin/mentors/approval",
    APPROVE_MENTOR:     USER_SERVICE_BASE_URL + "/admin/mentor/approve",
    BLOCK_MENTOR:       USER_SERVICE_BASE_URL + "/mentor/block",
    BLOCK_MENTEE:       USER_SERVICE_BASE_URL + "/mentee/block",
    TRANSACTIONS:       PAYMENT_SERVICE_BASE_URL + "/admin/transactions/",
    BANK_ACCOUNT:       PAYMENT_SERVICE_BASE_URL + "/admin/account/",
    COMPLETED_TRANSACTION: PAYMENT_SERVICE_BASE_URL +  "/admin/transaction/transfered/",
    TODAYS_WEBINARS:    WEBINAR_SERVICE_BASE_URL + "/admin/webinars/today",
    MEETINGS_COUNT:     INTERVIEW_SERVICE_BASE_URL + "/admin/interviews/count"
};

// Export the endpoints
export default ENDPOINTS;
