const express = require('express');
const ResetPasswordHandler = require('./handler.js');
const asyncHandler = require('../../../../Commons/utils/asyncHandler');


/**
 * @swagger
 * /reset-password/validate:
 *   get:
 *     summary: Validasi token reset password
 *     tags: [Reset Password]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token reset password yang dikirim via email
 *     responses:
 *       200:
 *         description: Token valid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "success"
 *               message: "token valid"
 *       400:
 *         description: Token invalid/expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "fail"
 *               message: "token tidak valid atau sudah kedaluwarsa"
 *
 * /reset-password/request:
 *   post:
 *     summary: Request reset password (kirim email berisi link reset)
 *     tags: [Reset Password]
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
 *         description: Email reset password berhasil dikirim.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "success"
 *               message: "link reset password berhasil dikirim ke email"
 *
 * /reset-password/confirm:
 *   post:
 *     summary: Konfirmasi reset password
 *     tags: [Reset Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 example: "abcdef123456"
 *               newPassword:
 *                 type: string
 *                 example: "newSecret123"
 *     responses:
 *       200:
 *         description: Password berhasil direset.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "success"
 *               message: "password berhasil diperbarui"
 *       400:
 *         description: Token invalid/expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "fail"
 *               message: "token reset tidak valid atau kedaluwarsa"
 */


const resetPasswordRouter = (container) => {
  const router =  express.Router();
  const handler = new ResetPasswordHandler(container);

  router.get('/validate', asyncHandler(handler.verifyResetTokenHandler));
  router.post('/request', asyncHandler(handler.resetPasswordRequestHandler));
  router.post('/confirm', asyncHandler(handler.resetPasswordConfirmHandler));

  return router;
};

module.exports = resetPasswordRouter;
