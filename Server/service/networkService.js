const axios = require("axios");
const ping = require("ping");
const logger = require("../utils/logger");
const Check = require("../models/Check");

class NetworkService {
  constructor(db) {
    this.db = db;
    this.TYPE_PING = "ping";
    this.TYPE_HTTP = "http";
    this.SERVICE_NAME = "NetworkService";
  }

  /**
   * Measures the response time of an asynchronous operation.
   * @param {Function} operation - An asynchronous operation to measure.
   * @returns {Promise<{responseTime: number, response: any}>} An object containing the response time in milliseconds and the response from the operation.
   * @throws {Error} The error object from the operation, contains response time.
   */
  async measureResponseTime(operation) {
    const startTime = Date.now();
    try {
      const response = await operation();
      const endTime = Date.now();
      return { responseTime: endTime - startTime, response };
    } catch (error) {
      const endTime = Date.now();
      error.responseTime = endTime - startTime;
      throw error;
    }
  }

  /**
   * Handles the ping operation for a given job, measures its response time, and logs the result.
   * @param {Object} job - The job object containing data for the ping operation.
   * @returns {Promise<{boolean}} The result of logging and storing the check
   */
  async handlePing(job) {
    const operation = async () => {
      const response = await ping.promise.probe(job.data.url);
      return response;
    };

    try {
      const { responseTime, response } = await this.measureResponseTime(
        operation
      );
      const isAlive = response.alive;
      return await this.logAndStoreCheck(job, isAlive, responseTime);
    } catch (error) {
      return await this.logAndStoreCheck(job, false, error.responseTime, error);
    }
  }

  /**
   * Handles the http operation for a given job, measures its response time, and logs the result.
   * @param {Object} job - The job object containing data for the ping operation.
   * @returns {Promise<{boolean}} The result of logging and storing the check
   */
  async handleHttp(job) {
    const operation = async () => {
      const response = await axios.get(job.data.url);
      return response;
    };
    try {
      const { responseTime, response } = await this.measureResponseTime(
        operation
      );
      const isAlive = response.status >= 200 && response.status < 300;
      return await this.logAndStoreCheck(job, isAlive, responseTime);
    } catch (error) {
      return await this.logAndStoreCheck(job, false, error.responseTime, error);
    }
  }
  /**
   * Retrieves the status of a given job based on its type.
   * For unsupported job types, it logs an error and returns false.
   *
   * @param {Object} job - The job object containing data necessary for processing.
   * @returns {Promise<boolean>} The status of the job if it is supported and processed successfully, otherwise false.
   */
  async getStatus(job) {
    switch (job.data.type) {
      case this.TYPE_PING:
        return await this.handlePing(job);
      case this.TYPE_HTTP:
        return await this.handleHttp(job);
      default:
        logger.error(`Unsupported type: ${job.data.type}`, {
          service: this.SERVICE_NAME,
          jobId: job.id,
        });
        return false;
    }
  }

  /**
   * Logs and stores the result of a check for a specific job.
   * This function creates a new Check object with the job's details and the result of the check,
   * then attempts to save this object to the database. If the save operation is successful,
   * it returns the status of the inserted check. If an error occurs during the save operation,
   * it logs the error and returns false.
   *
   * @param {Object} job - The job object containing data necessary for the check.
   * @param {boolean} isAlive - The result of the check, indicating if the target is alive.
   * @param {number} responseTime - The response time measured during the check.
   * @param {Error} [error=null] - Optional error object if an error occurred during the check.
   * @returns {Promise<boolean>} The status of the inserted check if successful, otherwise false.
   */
  async logAndStoreCheck(job, isAlive, responseTime, error = null) {
    const check = new Check({
      monitorId: job.data._id,
      status: isAlive,
      responseTime,
      statusCode: 0,
      message: error ? error.message : "",
    });

    try {
      const insertedCheck = await check.save();
      return insertedCheck.status;
    } catch (error) {
      logger.error(`Error wrtiting check for ${job.id}`, {
        service: this.SERVICE_NAME,
        jobId: job.id,
        error: error,
      });
      return false;
    }
  }
}

module.exports = NetworkService;
