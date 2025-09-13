/* eslint-disable camelcase */
const AddContent = require('../../Domains/contents/entities/AddContent');
const AddedContent = require('../../Domains/contents/entities/AddedContent');

class GenerateContentUseCase {
  constructor({ aiService, contentRepository }) {
    this._aiService = aiService;
    this._contentRepository = contentRepository;
  }

  async execute(useCasePayload) {
    const addContent = new AddContent(useCasePayload);
    const generatedContent = await this._aiService.generate(addContent);
    const addedContent = await this._contentRepository.addContent({ ...addContent, generated_content: generatedContent });

    return new AddedContent(addedContent);
  }
}

module.exports = GenerateContentUseCase;
