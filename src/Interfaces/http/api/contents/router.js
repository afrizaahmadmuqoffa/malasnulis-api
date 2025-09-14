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
 *                 example: "indonesia"
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
 * /contents/:
 *   get:
 *     summary: Ambil semua konten
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Jumlah data per halaman
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Halaman data
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [created_at, platform, type, tone, language]
 *           example: created_at
 *         description: Kolom untuk sorting
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           example: DESC
 *         description: Urutan sorting (ASC/DESC)
 *       - in: query
 *         name: platform
 *         schema:
 *           type: string
 *           example: facebook
 *         description: Filter berdasarkan platform
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           example: full
 *         description: Filter berdasarkan tipe konten
 *       - in: query
 *         name: tone
 *         schema:
 *           type: string
 *           example: formal
 *         description: Filter berdasarkan tone konten
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *           example: id
 *         description: Filter berdasarkan bahasa konten
 *     responses:
 *       200:
 *         description: Daftar konten berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Content'
 *       404:
 *         description: Belum ada konten.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "fail"
 *               message: "belum ada konten"
 *       401:
 *         description: Unauthorized (token tidak valid atau tidak ada).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "fail"
 *               message: "unauthorized"
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
 *
 * /contents/{id}:
 *   delete:
 *     summary: Hapus konten berdasarkan ID
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID konten yang akan dihapus
 *     responses:
 *       200:
 *         description: Konten berhasil dihapus.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponse'
 *             example:
 *               status: "success"
 *               message: "konten berhasil dihapus"
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
  router.get('/', ensureAuth, ensureVerified(container), asyncHandler(handler.getAllContentHandler));
  router.get('/:id', ensureAuth, ensureVerified(container), asyncHandler(handler.getContentHandler));
  router.delete('/:id', ensureAuth, ensureVerified(container), asyncHandler(handler.getContentHandler));

  return router;
};

module.exports = contentsRouter;
