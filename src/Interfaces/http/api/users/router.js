const express = require('express');
const UsersHandler = require('./handler');
const asyncHandler = require('../../../../Commons/utils/asyncHandler');
const ensureAuth = require('../../middlewares/ensureAuth.js');
const ensureVerified = require('../../middlewares/ensureVerified.js');

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Daftar akun baru
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@mail.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: Akun berhasil terdaftar (OTP terkirim).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "fail"
 *               message: "email sudah dipakai"
 * /users/verify-otp:
 *   post:
 *     summary: Verifikasi OTP user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@mail.com
 *               code:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Akun berhasil terverifikasi.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               id: "user-999"
 *               email: "newuser@mail.com"
 *               is_verified: true
 *               created_at: "2025-09-13T15:00:00Z"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *       429:
 *         description: Too Many Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "fail"
 *               message: "anda telah mencapai batas maksimal percobaan"
 *       401:
 *         description: Authentication Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "fail"
 *               message: "otp yang anda masukkan salah"
 *       404:
 *         description: Not Found Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "fail"
 *               message: "kode otp tidak ditemukan"
 * /users/resend-otp:
 *   post:
 *     summary: Kirim ulang OTP user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@mail.com
 *     responses:
 *       200:
 *         description: OTP berhasil dikirim ulang.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "success"
 *               message: "kode otp berhasil dikirim ulang"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *       429:
 *         description: Too Many Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "fail"
 *               message: "sudah mencapai batas kirim otp, harap tunggu 1 menit!"
 * /users/profile/me:
 *   get:
 *     summary: Ambil detail profil user yang sedang login
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data profil user berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               id: "user-999"
 *               email: "user@mail.com"
 *               is_verified: true
 *               createdAt: "2025-09-13T15:00:00Z"
 *       401:
 *         description: Unauthorized / belum login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "fail"
 *               message: "token tidak valid atau kadaluarsa"
 *       403:
 *         description: User belum terverifikasi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "fail"
 *               message: "akun belum terverifikasi"
 */


const usersRouter = (container) => {
  const router =  express.Router();
  const handler = new UsersHandler(container);

  router.post('/', asyncHandler(handler.postUserHandler));
  router.post('/verify-otp', asyncHandler(handler.verifyUserOtpHandler));
  router.post('/resend-otp', asyncHandler(handler.resendUserOtpHandler));
  router.get('/profile/me', ensureAuth, ensureVerified(container), asyncHandler(handler.getUserDetailHandler));

  return router;
};

module.exports = usersRouter;
