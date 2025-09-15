/* eslint-disable camelcase */
class ContentsHandler {
  constructor(container) {
    this._generateContentUseCase = container.generateContentUseCase;
    this._getAllContentUseCase = container.getAllContentUseCase;
    this._getContentDetailUseCase = container.getContentDetailUseCase;
    this._deleteContentUseCase = container.deleteContentUseCase;

    // bind handler method
    this.postContentHandler = this.postContentHandler.bind(this);
    this.getContentHandler = this.getContentHandler.bind(this);
    this.getAllContentHandler = this.getAllContentHandler.bind(this);
    this.deleteContentHandler = this.deleteContentHandler.bind(this);
  }

  async postContentHandler(req, res) {
    const userId = req.user.id;
    const payload = req.body;
    const addedContent = await this._generateContentUseCase.execute({ user_id: userId, ...payload });
    return res.status(201).json({
      status: 'success',
      data: {
        addedContent
      },
    });
  }

  async getAllContentHandler(req, res) {
    const userId = req.user.id;
    const {
      limit,
      page,
      sort_by,
      order,
      platform,
      type,
      tone,
      language,
    } = req.query;

    const contents = await this._getAllContentUseCase.execute({
      user_id: userId,
      limit,
      page,
      sort_by,
      order,
      platform,
      type,
      tone,
      language,
    });

    return res.status(200).json({
      status: 'success',
      data: {
        contents
      },
    });
  }

  async getContentHandler(req, res) {
    const userId = req.user.id;
    const { id } = req.params;

    const detailContent = await this._getContentDetailUseCase.execute({ user_id: userId, content_id: id });
    return res.status(200).json({
      status: 'success',
      data: {
        detailContent
      },
    });
  }

  async deleteContentHandler(req, res) {
    const userId = req.user.id;
    const { id } = req.params;

    await this._deleteContentUseCase.execute({ user_id: userId, content_id: id });

    return res.status(200).json({
      status: 'success',
      message: 'konten berrhasil dihapus'
    });
  }



}

module.exports = ContentsHandler;
