const express = require('express');
const asyncHandler = require('../../../../Commons/utils/asyncHandler');
const ensureAuth = require('../../middlewares/ensureAuth.js');
const ensureVerified = require('../../middlewares/ensureVerified.js');
const ContentsHandler = require('./handler.js');

/**
 * @swagger
 * /contents:
 *   post:
 *     summary: Tambah konten baru
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - platform
 *               - type
 *               - tone
 *               - language
 *               - input_prompt
 *             properties:
 *               platform:
 *                 type: string
 *                 example: "facebook"
 *               type:
 *                 type: string
 *                 example: "full"
 *               tone:
 *                 type: string
 *                 example: "formal"
 *               language:
 *                 type: string
 *                 example: "id"
 *               input_prompt:
 *                 type: string
 *                 example: "lorem ipsum dolor sit amet"
 *     responses:
 *       201:
 *         description: Konten berhasil dibuat.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "fail"
 *               message: "tidak dapat menambahkan konten karena properti yang dibutuhkan tidak ada"
 *
 * /contents/{id}:
 *   get:
 *     summary: Ambil detail konten
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID konten
 *     responses:
 *       200:
 *         description: Detail konten berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: Konten tidak ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "fail"
 *               message: "konten tidak ditemukan"
 */


const contentsRouter = (container) => {
  const router =  express.Router();
  const handler = new ContentsHandler(container);

  router.post('/', ensureAuth, ensureVerified(container), asyncHandler(handler.postContentHandler));
  router.get('/:id', ensureAuth, ensureVerified(container), asyncHandler(handler.getContentHandler));

  return router;
};

module.exports = contentsRouter;
