import axios from "axios";

/**
 * Base API URL
 */
const API_BASE = import.meta.env.API_BASE || "http://localhost:8000";

/**
 * Fetch all users from the API.
 *
 * @async
 * @function fetchUsers
 * @returns {Promise<Array>} List of users
 * @throws {Error} Throws "SERVER_ERROR" if request fails
 */
export async function fetchUsers() {
    try {
        const response = await axios.get(`${API_BASE}/users`);
        return response.data.utilisateurs.map(u => ({
            id: u[0],
            firstName: u[1],
            lastName: u[2],
            email: u[3],
            birthDate: u[4],
            zip: u[5],
            city: u[6]
        }));
    } catch (error) {
        throw new Error("SERVER_ERROR");
    }
}

/**
 * Create a new user via API.
 * Performs local email uniqueness check to simulate business validation.
 *
 * @async
 * @function createUser
 * @param {Object} person - User object to create
 * @param {Array<string>} existingEmails - List of already registered emails
 * @returns {Promise<Object>} Created user
 * @throws {Error} Throws "EMAIL_ALREADY_EXISTS" or "SERVER_ERROR"
 */
export async function createUser(person, existingEmails = []) {
    if (existingEmails.includes(person.email.toLowerCase())) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    try {
        const response = await axios.post(`${API_BASE}/users`, person);
        return response.data;
    } catch (error) {
        const status = error.response?.status;

        if (status === 400 && error.response.data?.message === "EMAIL_ALREADY_EXISTS") {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }

        if (status >= 500 && status < 600) {
            throw new Error("SERVER_ERROR");
        }

        throw new Error("SERVER_ERROR");
    }
}

/**
 * Delete a user via API.
 *
 * @async
 * @function deleteUser
 * @param {number} userId - ID of the user to delete
 * @returns {Promise<void>}
 * @throws {Error} Throws "USER_NOT_FOUND" or "SERVER_ERROR"
 */
export async function deleteUser(userId) {
    try {
        await axios.delete(`${API_BASE}/users/${userId}`);
    } catch (error) {
        const status = error.response?.status;

        if (status === 404) {
            throw new Error("USER_NOT_FOUND");
        }

        if (status >= 500 && status < 600) {
            throw new Error("SERVER_ERROR");
        }

        throw new Error("SERVER_ERROR");
    }
}